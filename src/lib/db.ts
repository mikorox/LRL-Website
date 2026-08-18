import "server-only";
import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

function createPool(): mysql.Pool {
  return mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 8,
    queueLimit: 0,
    // The DB is reached over the public internet rather than localhost,
    // so idle pooled connections can get silently dropped by a NAT/
    // firewall timeout between requests. Keepalive plus the retry below
    // stop that from surfacing as an unhandled render error.
    enableKeepAlive: true,
    keepAliveInitialDelay: 10_000,
    connectTimeout: 10_000,
  });
}

function getPool(): mysql.Pool {
  if (!pool) pool = createPool();
  return pool;
}

function isConnectionError(err: unknown): boolean {
  const code = (err as { code?: string })?.code;
  return (
    code === "PROTOCOL_CONNECTION_LOST" ||
    code === "ECONNRESET" ||
    code === "ETIMEDOUT" ||
    code === "ECONNREFUSED" ||
    code === "EPIPE"
  );
}

async function withRetry<T>(run: (p: mysql.Pool) => Promise<T>): Promise<T> {
  try {
    return await run(getPool());
  } catch (err) {
    if (!isConnectionError(err)) throw err;
    // Drop the whole pool (its other cached connections are likely
    // equally stale) and retry once against a fresh one.
    await pool?.end().catch(() => {});
    pool = createPool();
    return run(pool);
  }
}

type SqlParam = string | number | boolean | null;

export async function query<T>(sql: string, params: SqlParam[] = []): Promise<T> {
  const [rows] = await withRetry((p) => p.query(sql, params));
  return rows as T;
}

export async function execute(sql: string, params: SqlParam[] = []): Promise<void> {
  await withRetry((p) => p.execute(sql, params));
}

// Temporary diagnostic aid: Hostinger doesn't expose runtime console logs
// to us, but we do have direct DB access, so route caught errors here
// instead. Remove once the brand/franchise document upload bug is found.
export async function logDebug(
  context: string,
  err: unknown,
  extra?: Record<string, unknown>
): Promise<void> {
  try {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack || "" : "";
    await execute(
      "INSERT INTO debug_log (context, message, stack, extra) VALUES (?, ?, ?, ?)",
      [context, message, stack, extra ? JSON.stringify(extra) : null]
    );
  } catch {
    // best-effort only
  }
}

export const SESSION_COOKIE = "lrl_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

const encoder = new TextEncoder();

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "dev-insecure-secret-change-me";
}

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toBase64Url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_TTL_MS;
  const key = await getKey(getSecret());
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(String(expires)));
  return `${expires}.${toBase64Url(sig)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [expiresStr, sig] = token.split(".");
  if (!expiresStr || !sig) return false;
  const expires = Number(expiresStr);
  if (!expires || Number.isNaN(expires) || expires < Date.now()) return false;
  const key = await getKey(getSecret());
  const expected = await crypto.subtle.sign("HMAC", key, encoder.encode(expiresStr));
  return toBase64Url(expected) === sig;
}

// Generic salted hash for storing admin-set secrets (e.g. the franchise
// page password) in data/settings.json without keeping them in plaintext.
export async function hashSecret(value: string): Promise<string> {
  const key = await getKey(getSecret());
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(`secret:${value}`));
  return toBase64Url(sig);
}

export const FRANCHISE_COOKIE = "lrl_franchise_session";
const FRANCHISE_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

// The current password hash is baked into the signed token, so changing
// the franchise password in the admin panel immediately invalidates every
// previously-issued visitor session.
export async function createFranchiseSessionToken(passwordHash: string): Promise<string> {
  const expires = Date.now() + FRANCHISE_SESSION_TTL_MS;
  const payload = `${expires}.${passwordHash}`;
  const key = await getKey(getSecret());
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toBase64Url(sig)}`;
}

export async function verifyFranchiseSessionToken(
  token: string | undefined | null,
  currentPasswordHash: string
): Promise<boolean> {
  if (!token || !currentPasswordHash) return false;
  const [expiresStr, passwordHash, sig] = token.split(".");
  if (!expiresStr || !passwordHash || !sig) return false;
  const expires = Number(expiresStr);
  if (!expires || Number.isNaN(expires) || expires < Date.now()) return false;
  if (passwordHash !== currentPasswordHash) return false;
  const key = await getKey(getSecret());
  const expected = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`${expiresStr}.${passwordHash}`)
  );
  return toBase64Url(expected) === sig;
}

import { promises as fs } from "fs";
import path from "path";

// The repo-bundled copy. Some hosts rebuild the app by re-syncing this
// directory from git on every deploy, which would silently reset any
// content edited live (registrations, gallery uploads, etc.) back to
// whatever's committed. Setting LRL_DATA_DIR to an absolute path outside
// the git-managed source tree makes that the real read/write location
// instead, so redeploys can never touch it.
const SEED_DATA_DIR = path.join(process.cwd(), "data");
const DATA_DIR = process.env.LRL_DATA_DIR
  ? path.resolve(process.env.LRL_DATA_DIR)
  : SEED_DATA_DIR;

async function ensureSeeded(file: string): Promise<void> {
  if (DATA_DIR === SEED_DATA_DIR) return;
  const target = path.join(DATA_DIR, file);
  try {
    await fs.access(target);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.copyFile(path.join(SEED_DATA_DIR, file), target);
  }
}

async function readJson<T>(file: string): Promise<T> {
  await ensureSeeded(file);
  const raw = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(
    path.join(DATA_DIR, file),
    JSON.stringify(data, null, 2) + "\n",
    "utf-8"
  );
}

export function getCollection<T>(file: string): Promise<T[]> {
  return readJson<T[]>(file);
}

export function setCollection<T>(file: string, data: T[]): Promise<void> {
  return writeJson(file, data);
}

export function getDoc<T>(file: string): Promise<T> {
  return readJson<T>(file);
}

export function setDoc<T>(file: string, data: T): Promise<void> {
  return writeJson(file, data);
}

// Same rationale as LRL_DATA_DIR above: point this at a path outside the
// git-managed source tree so newly uploaded files survive redeploys.
// Files already committed under public/uploads keep being served
// statically by Next either way; only new uploads move here, served by
// the /uploads/[...path] route below.
const SEED_UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const UPLOADS_DIR = process.env.LRL_UPLOADS_DIR
  ? path.resolve(process.env.LRL_UPLOADS_DIR)
  : SEED_UPLOADS_DIR;

export function getUploadsDir(): string {
  return UPLOADS_DIR;
}

export async function saveUpload(file: File): Promise<string> {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const ext = path.extname(file.name) || "";
  const filename = `${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOADS_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

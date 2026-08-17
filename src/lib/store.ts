import { promises as fs } from "fs";
import path from "path";

// Some hosts rebuild the app by re-syncing the git source on every deploy,
// which would wipe newly uploaded files if they lived inside that
// directory. Setting LRL_UPLOADS_DIR to an absolute path outside the
// git-managed source tree makes that the real read/write location
// instead, so redeploys can never touch it. Files already committed
// under public/uploads keep being served statically by Next either way;
// only new uploads move here, served by the /uploads/[...path] route.
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

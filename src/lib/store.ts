import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function readJson<T>(file: string): Promise<T> {
  const raw = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(file: string, data: T): Promise<void> {
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

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export async function saveUpload(file: File): Promise<string> {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const ext = path.extname(file.name) || "";
  const filename = `${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOADS_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

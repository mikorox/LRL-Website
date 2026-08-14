"use client";

import Image from "next/image";
import { useState } from "react";

export function ImageUploadField({
  label,
  name,
  accept = "image/*",
  initialUrl = "",
  hint,
}: {
  label: string;
  name: string;
  accept?: string;
  initialUrl?: string;
  hint?: string;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [isVideo, setIsVideo] = useState(/\.(mp4|webm|mov)$/i.test(initialUrl));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      if (!res.ok) throw new Error("Upload failed");
      const data: { url: string } = await res.json();
      setUrl(data.url);
      setIsVideo(file.type.startsWith("video/"));
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
        {label}
      </label>

      {url &&
        (isVideo ? (
          <video
            src={url}
            className="mb-3 max-h-40 rounded-sm border border-navy-line"
            muted
            controls
          />
        ) : (
          <Image
            src={url}
            alt=""
            width={200}
            height={160}
            className="mb-3 max-h-40 w-auto rounded-sm border border-navy-line object-contain"
          />
        ))}

      <input type="hidden" name={name} value={url} />
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="w-full text-sm text-white/80 file:mr-4 file:rounded-sm file:border-0 file:bg-gold-light file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-widest file:text-navy-950 hover:file:bg-gold"
      />
      {uploading && <p className="mt-1 text-xs text-gold-light">Uploading&hellip;</p>}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      {hint && <p className="mt-1 text-xs text-white/40">{hint}</p>}
    </div>
  );
}

export function FileUploadField({
  label,
  name,
  accept,
  initialUrl = "",
  hint,
}: {
  label: string;
  name: string;
  accept?: string;
  initialUrl?: string;
  hint?: string;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      if (!res.ok) throw new Error("Upload failed");
      const data: { url: string } = await res.json();
      setUrl(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
        {label}
      </label>

      {url && (
        <p className="mb-2 text-xs text-white/60 truncate">
          Current file: <span className="text-gold-light">{url.split("/").pop()}</span>
        </p>
      )}

      <input type="hidden" name={name} value={url} />
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="w-full text-sm text-white/80 file:mr-4 file:rounded-sm file:border-0 file:bg-gold-light file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-widest file:text-navy-950 hover:file:bg-gold"
      />
      {uploading && <p className="mt-1 text-xs text-gold-light">Uploading&hellip;</p>}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      {hint && <p className="mt-1 text-xs text-white/40">{hint}</p>}
    </div>
  );
}

type UploadedFile = { id: string; url: string };

export function MultiImageUploadField({
  label,
  name,
  accept = "image/*",
  hint,
}: {
  label: string;
  name: string;
  accept?: string;
  hint?: string;
}) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState("");

  async function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;

    setUploading(true);
    setError("");
    setProgress({ done: 0, total: selected.length });

    const uploaded: UploadedFile[] = [];
    for (const file of selected) {
      try {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body });
        if (!res.ok) throw new Error("Upload failed");
        const data: { url: string } = await res.json();
        uploaded.push({ id: crypto.randomUUID(), url: data.url });
      } catch {
        setError(`Failed to upload "${file.name}". The rest were uploaded successfully.`);
      }
      setProgress((p) => ({ ...p, done: p.done + 1 }));
    }

    setFiles((prev) => [...prev, ...uploaded]);
    setUploading(false);
    e.target.value = "";
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
        {label}
      </label>

      {files.length > 0 && (
        <div className="mb-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
          {files.map((f) => (
            <div key={f.id} className="relative group">
              <input type="hidden" name={name} value={f.url} />
              <Image
                src={f.url}
                alt=""
                width={100}
                height={100}
                className="h-16 w-16 rounded-sm border border-navy-line object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(f.id)}
                className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove photo"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        type="file"
        accept={accept}
        multiple
        onChange={handleFilesChange}
        className="w-full text-sm text-white/80 file:mr-4 file:rounded-sm file:border-0 file:bg-gold-light file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-widest file:text-navy-950 hover:file:bg-gold"
      />
      {uploading && (
        <p className="mt-1 text-xs text-gold-light">
          Uploading {progress.done}/{progress.total}&hellip;
        </p>
      )}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      {hint && <p className="mt-1 text-xs text-white/40">{hint}</p>}
    </div>
  );
}

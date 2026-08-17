"use client";

import { useState } from "react";

const UPLOAD_ENDPOINT = "https://hub.eventistry.agency/lrlmedia/upload.php";
const UPLOAD_BASE = "https://hub.eventistry.agency/lrlmedia/";

export default function ExternalFileUploadField({
  label,
  name,
  hint,
  required,
  accept = "image/*",
}: {
  label: string;
  name: string;
  hint?: string;
  required?: boolean;
  accept?: string;
}) {
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
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
      const res = await fetch(UPLOAD_ENDPOINT, { method: "POST", body });
      const data: { message?: string; file?: string } = await res.json();
      if (!data.file) throw new Error(data.message || "Upload failed");
      setUrl(UPLOAD_BASE + data.file);
      setFileName(file.name);
    } catch {
      setError("Upload failed. Please try again.");
      setUrl("");
      setFileName("");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
        {label}
        {required && <span className="text-red-400"> *</span>}
      </label>
      {hint && <p className="mb-2 text-xs text-white/50">{hint}</p>}

      {url && (
        <div className="mb-3 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt=""
            className="h-16 w-16 rounded-sm object-cover border border-navy-line"
          />
          <span className="text-xs text-white/60 truncate">{fileName}</span>
        </div>
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
    </div>
  );
}

"use client";

import { useState } from "react";
import { TextField } from "@/components/admin/fields";
import { FileUploadField } from "@/components/admin/ImageUploadField";

export default function AddDocumentForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <form
      className="space-y-5 max-w-xl rounded-sm border border-dashed border-navy-line p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        if (!String(formData.get("fileUrl") || "")) {
          setError("Please choose a file and wait for the upload to finish before submitting.");
          return;
        }

        setPending(true);
        try {
          await action(formData);
          e.currentTarget.reset();
        } catch {
          setError("Something went wrong adding the document. Please try again.");
        } finally {
          setPending(false);
        }
      }}
    >
      <TextField label="Title" name="title" required />
      <TextField label="Description (optional)" name="description" />
      <FileUploadField label="File" name="fileUrl" hint="PDF, DOC, PPT, ZIP, etc." />

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center rounded-sm bg-gold-light px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors disabled:opacity-60"
      >
        {pending ? "Adding…" : "Add Document"}
      </button>
    </form>
  );
}

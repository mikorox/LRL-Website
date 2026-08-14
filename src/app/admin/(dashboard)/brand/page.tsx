import { getBrandDocuments } from "@/lib/data";
import { TextField } from "@/components/admin/fields";
import { FileUploadField } from "@/components/admin/ImageUploadField";
import { addBrandDocument, deleteBrandDocument } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBrandPage() {
  const documents = await getBrandDocuments();

  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-1">Brand Documents</h1>
      <p className="text-sm text-white/60 mb-8">
        Files available for download on the public{" "}
        <code className="text-white/80">/brand</code> page. This page is not
        linked from the main navigation.
      </p>

      <div className="space-y-3 mb-8 max-w-2xl">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between gap-4 rounded-sm border border-navy-line bg-navy-900 p-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{doc.title}</p>
              {doc.description && (
                <p className="text-xs text-white/50 truncate">{doc.description}</p>
              )}
              <p className="text-xs text-white/40 truncate">{doc.fileUrl}</p>
            </div>
            <form action={deleteBrandDocument}>
              <input type="hidden" name="id" value={doc.id} />
              <button
                type="submit"
                className="shrink-0 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
        {documents.length === 0 && (
          <p className="text-sm text-white/40">No documents added yet.</p>
        )}
      </div>

      <form
        action={addBrandDocument}
        className="space-y-5 max-w-xl rounded-sm border border-dashed border-navy-line p-5"
      >
        <TextField label="Title" name="title" required />
        <TextField label="Description (optional)" name="description" />
        <FileUploadField label="File" name="fileUrl" hint="PDF, DOC, PPT, ZIP, etc." />
        <button
          type="submit"
          className="inline-flex items-center rounded-sm bg-gold-light px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
        >
          Add Document
        </button>
      </form>
    </div>
  );
}

import { FileText, Download } from "lucide-react";
import type { BrandDocument } from "@/lib/data";

export default function DocumentList({ documents }: { documents: BrandDocument[] }) {
  if (documents.length === 0) {
    return <p className="text-white/60 text-sm">No documents available yet.</p>;
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <a
          key={doc.id}
          href={doc.fileUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 rounded-sm border border-navy-line bg-navy-900 px-6 py-5 hover:border-gold-light transition-colors"
        >
          <div className="flex items-center gap-4 min-w-0">
            <FileText strokeWidth={1.5} className="h-8 w-8 text-gold-light shrink-0" />
            <div className="min-w-0">
              <p className="font-semibold text-white group-hover:text-gold-light transition-colors truncate">
                {doc.title}
              </p>
              {doc.description && (
                <p className="mt-1 text-sm text-white/60">{doc.description}</p>
              )}
            </div>
          </div>
          <Download
            strokeWidth={1.5}
            className="h-5 w-5 text-white/50 group-hover:text-gold-light transition-colors shrink-0"
          />
        </a>
      ))}
    </div>
  );
}

import Image from "next/image";
import { getPartners } from "@/lib/data";
import type { PartnerEntry } from "@/lib/data";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { addPartner, deletePartner } from "./actions";

export const dynamic = "force-dynamic";

const TIERS: { key: "title" | "poweredBy" | "broadcast" | "associate"; label: string }[] = [
  { key: "title", label: "Title Partner" },
  { key: "poweredBy", label: "Powered By" },
  { key: "broadcast", label: "Broadcast Partner" },
  { key: "associate", label: "Associate Partners" },
];

export default async function AdminPartnersPage() {
  const partners = await getPartners();

  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-1">Partners</h1>
      <p className="text-sm text-white/60 mb-8">
        Manage sponsor logos by tier.
      </p>

      <div className="space-y-10">
        {TIERS.map((tier) => (
          <div key={tier.key}>
            <h2 className="font-accent text-xl text-gold-light mb-4">{tier.label}</h2>

            <div className="space-y-3 mb-4">
              {partners[tier.key].map((entry: PartnerEntry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between gap-4 rounded-sm border border-navy-line bg-navy-900 p-3"
                >
                  <div className="flex items-center gap-3">
                    {entry.logoUrl ? (
                      <Image src={entry.logoUrl} alt={entry.name} width={80} height={40} className="h-10 w-auto object-contain" />
                    ) : (
                      <div className="h-10 w-16 rounded-sm bg-navy-800 border border-navy-line" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white">{entry.name}</p>
                      {entry.url && <p className="text-xs text-white/50">{entry.url}</p>}
                    </div>
                  </div>
                  <form action={deletePartner}>
                    <input type="hidden" name="tier" value={tier.key} />
                    <input type="hidden" name="id" value={entry.id} />
                    <button
                      type="submit"
                      className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </form>
                </div>
              ))}
              {partners[tier.key].length === 0 && (
                <p className="text-sm text-white/40">No partners added yet.</p>
              )}
            </div>

            <form
              action={addPartner}
              className="flex flex-wrap items-end gap-3 rounded-sm border border-dashed border-navy-line p-4"
            >
              <input type="hidden" name="tier" value={tier.key} />
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
                  Name
                </label>
                <input
                  name="name"
                  required
                  className="rounded-sm border border-navy-line bg-navy-950 px-3 py-2 text-sm text-white focus:border-gold-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
                  Link (optional)
                </label>
                <input
                  name="url"
                  type="url"
                  placeholder="https://"
                  className="rounded-sm border border-navy-line bg-navy-950 px-3 py-2 text-sm text-white focus:border-gold-light focus:outline-none"
                />
              </div>
              <div>
                <ImageUploadField label="Logo" name="logoUrl" />
              </div>
              <button
                type="submit"
                className="inline-flex items-center rounded-sm bg-gold-light px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
              >
                Add
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

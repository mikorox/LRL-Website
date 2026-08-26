import Link from "next/link";
import { getRegistrations } from "@/lib/data";
import { updateRegistrationContact } from "../actions";

export const dynamic = "force-dynamic";

export default async function MissingContactPage() {
  const registrations = await getRegistrations();
  const missing = registrations.filter((r) => !r.email || !r.phone);

  return (
    <div>
      <Link
        href="/admin/registrations"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold mb-4"
      >
        &larr; Back to Registrations
      </Link>
      <h1 className="font-accent text-3xl text-white mb-1">
        Missing Contact Details
        <span className="ml-3 align-middle inline-flex items-center rounded-full bg-gold-light px-3 py-1 text-sm font-bold text-navy-950">
          {missing.length}
        </span>
      </h1>
      <p className="text-sm text-white/60 mb-6">
        Registrations submitted before Email and Phone were required. Fill
        these in as you track people down.
      </p>

      {missing.length === 0 ? (
        <p className="text-white/50 text-sm">
          Nothing missing &mdash; every registration has contact details.
        </p>
      ) : (
        <div className="space-y-3 max-w-3xl">
          {missing.map((r) => (
            <div
              key={r.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-sm border border-navy-line bg-navy-900 p-4"
            >
              {r.profilePictureUrl ? (
                <a href={r.profilePictureUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.profilePictureUrl}
                    alt=""
                    className="h-14 w-14 rounded-sm object-cover border border-navy-line"
                  />
                </a>
              ) : (
                <div className="h-14 w-14 shrink-0 rounded-sm bg-navy-800 border border-navy-line flex items-center justify-center text-[10px] text-white/30">
                  No Photo
                </div>
              )}

              <div className="shrink-0 sm:w-40">
                <p className="text-sm font-semibold text-white truncate">{r.name}</p>
                <p className="text-xs text-white/60">
                  {r.gender}
                  {r.age ? `, ${r.age}` : ""}
                </p>
                {r.nicPassportUrl ? (
                  <a
                    href={r.nicPassportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold"
                  >
                    View NIC/Passport
                  </a>
                ) : (
                  <span className="text-xs text-white/30">No NIC/Passport</span>
                )}
              </div>

              <form
                action={updateRegistrationContact}
                className="flex flex-1 flex-wrap items-end gap-3"
              >
                <input type="hidden" name="id" value={r.id} />
                <div className="flex-1 min-w-[180px]">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={r.email}
                    className="w-full rounded-sm border border-navy-line bg-navy-950 px-3 py-2 text-sm text-white focus:border-gold-light focus:outline-none"
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={r.phone}
                    className="w-full rounded-sm border border-navy-line bg-navy-950 px-3 py-2 text-sm text-white focus:border-gold-light focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-sm bg-gold-light px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
                >
                  Save
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

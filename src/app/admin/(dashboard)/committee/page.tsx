import Image from "next/image";
import Link from "next/link";
import { getCommittee } from "@/lib/data";
import { deleteCommitteeMember } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCommitteePage() {
  const committee = await getCommittee();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-accent text-3xl text-white">Technical Committee</h1>
        <Link
          href="/admin/committee/new"
          className="inline-flex items-center rounded-sm bg-gold-light px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
        >
          Add Member
        </Link>
      </div>

      <div className="space-y-3">
        {committee.length === 0 && <p className="text-white/50 text-sm">No members yet.</p>}
        {committee.map((m) => (
          <div
            key={m.id}
            className="flex items-center justify-between gap-4 rounded-sm border border-navy-line bg-navy-900 p-4"
          >
            <div className="flex items-center gap-4">
              {m.photoUrl ? (
                <Image
                  src={m.photoUrl}
                  alt={m.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <div className="h-11 w-11 rounded-full bg-navy-800 border border-navy-line" />
              )}
              <div>
                <p className="font-semibold text-white">{m.name}</p>
                <p className="text-sm text-white/60">{m.position}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/admin/committee/${m.id}`}
                className="text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold"
              >
                Edit
              </Link>
              <form action={deleteCommitteeMember}>
                <input type="hidden" name="id" value={m.id} />
                <button
                  type="submit"
                  className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

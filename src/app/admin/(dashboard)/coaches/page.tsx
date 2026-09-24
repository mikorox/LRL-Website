import Image from "next/image";
import Link from "next/link";
import { getCoaches } from "@/lib/data";
import { deleteCoach } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCoachesPage() {
  const coaches = await getCoaches();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-accent text-3xl text-white">Coaches</h1>
        <Link
          href="/admin/coaches/new"
          className="inline-flex items-center rounded-sm bg-gold-light px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
        >
          Add Coach
        </Link>
      </div>

      <div className="space-y-3">
        {coaches.length === 0 && <p className="text-white/50 text-sm">No coaches yet.</p>}
        {coaches.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between gap-4 rounded-sm border border-navy-line bg-navy-900 p-4"
          >
            <div className="flex items-center gap-4">
              {c.photoUrl ? (
                <Image
                  src={c.photoUrl}
                  alt={c.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <div className="h-11 w-11 rounded-full bg-navy-800 border border-navy-line" />
              )}
              <div>
                <p className="font-semibold text-white">{c.name}</p>
                <p className="text-sm text-white/60">{c.position}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/admin/coaches/${c.id}`}
                className="text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold"
              >
                Edit
              </Link>
              <form action={deleteCoach}>
                <input type="hidden" name="id" value={c.id} />
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

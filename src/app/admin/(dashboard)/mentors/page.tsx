import Image from "next/image";
import Link from "next/link";
import { getMentors } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminMentorsPage() {
  const mentors = await getMentors();

  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-1">Mentors</h1>
      <p className="text-sm text-white/60 mb-6">
        One mentor profile per franchise &mdash; edit each below.
      </p>

      <div className="space-y-3">
        {mentors.map((m) => (
          <Link
            key={m.id}
            href={`/admin/mentors/${m.id}`}
            className="flex items-center gap-4 rounded-sm border border-navy-line bg-navy-900 p-4 hover:border-gold-light transition-colors"
          >
            {m.photoUrl ? (
              <Image src={m.photoUrl} alt={m.name} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
            ) : (
              <div className="h-11 w-11 rounded-full bg-navy-800 border border-navy-line" />
            )}
            <div>
              <p className="text-xs uppercase tracking-widest text-gold-light">{m.team}</p>
              <p className="font-semibold text-white">{m.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

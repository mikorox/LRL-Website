import Link from "next/link";
import TeamCrest from "@/components/TeamCrest";
import { getTeams } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminTeamsPage() {
  const teams = await getTeams();

  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-1">Teams</h1>
      <p className="text-sm text-white/60 mb-6">
        The six franchises are fixed &mdash; edit each team&apos;s details below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teams.map((team) => (
          <Link
            key={team.slug}
            href={`/admin/teams/${team.slug}`}
            className="flex items-center gap-4 rounded-sm border border-navy-line bg-navy-900 p-4 hover:border-gold-light transition-colors"
          >
            <TeamCrest team={team} size={56} />
            <div>
              <p className="font-semibold text-white">{team.name}</p>
              <p className="text-sm text-white/60">{team.city}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

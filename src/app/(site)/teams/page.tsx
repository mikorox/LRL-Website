import Link from "next/link";
import TeamCrest from "@/components/TeamCrest";
import { getTeams } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function TeamsPage() {
  const teams = await getTeams();
  return (
    <div className="relative bg-black overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(2,19,41,0.7) 0%, transparent 60%)",
        }}
      />

      <section className="relative overflow-hidden bg-oar-fan">
        <div className="absolute inset-0 bg-navy-900" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/80 to-black" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="font-accent text-4xl sm:text-5xl md:text-6xl leading-[0.95] max-w-3xl">
            Meet the Franchises
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-base sm:text-lg">
            Six cities. Six identities. One champion. Discover the teams,
            owners, athletes, and identities that make up the inaugural Lanka
            Rowing League.
          </p>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-black to-navy-950">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team) => (
            <Link
              key={team.slug}
              href={`/teams/${team.slug}`}
              className="group relative flex flex-col items-center text-center gap-4 overflow-hidden rounded-sm border border-navy-line bg-navy-900 p-8 transition-colors hover:border-gold-light"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(160deg, ${team.colorPrimary} 0%, transparent 70%)`,
                }}
              />
              <div className="relative">
                <TeamCrest team={team} size={104} />
              </div>
              <h3 className="relative font-accent text-2xl">{team.name}</h3>
              <p className="relative text-sm text-white/70">{team.tagline}</p>
              <span className="relative mt-2 text-xs font-bold uppercase tracking-widest text-gold-light group-hover:text-gold transition-colors">
                View Team &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

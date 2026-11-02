import Image from "next/image";
import { CalendarClock } from "lucide-react";
import { getTeams, type Team } from "@/lib/data";
import { DAY_ONE, boatLabel, type Race } from "@/lib/race-schedule";

export const dynamic = "force-dynamic";

function TeamSide({ team, name, align }: { team?: Team; name: string; align: "left" | "right" }) {
  return (
    <div
      className={`flex min-w-0 flex-1 items-center gap-3 ${
        align === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      {team?.logo && (
        <span className="relative h-9 w-9 shrink-0">
          <Image src={team.logo} alt="" fill sizes="36px" className="object-contain" />
        </span>
      )}
      <span className="truncate text-sm font-semibold sm:text-base">{name}</span>
    </div>
  );
}

function RaceCard({ race, teams }: { race: Race; teams: Map<string, Team> }) {
  const home = teams.get(race.home);
  const away = teams.get(race.away);
  const boat = boatLabel(race.boat);
  return (
    <li
      className="relative overflow-hidden rounded-sm border border-navy-line"
      style={{
        background: `linear-gradient(90deg, ${home?.colorPrimary ?? "#021329"}40 0%, #021329 50%, ${
          away?.colorPrimary ?? "#021329"
        }40 100%)`,
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2 text-xs uppercase tracking-widest">
        <span className="text-white/50">Race {race.no}</span>
        <span className="text-gold-light">{boat.name}</span>
        <span className="font-bold text-white">{race.time}</span>
      </div>
      <div className="flex items-center gap-3 px-4 py-4">
        <TeamSide team={home} name={race.home} align="left" />
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-white/40">vs</span>
        <TeamSide team={away} name={race.away} align="right" />
      </div>
    </li>
  );
}

export default async function SchedulePage() {
  const teams = new Map((await getTeams()).map((t) => [t.name, t]));

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
            Championship Weekend
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-base sm:text-lg">
            19 &amp; 20 December 2026 at the Colombo Rowing Club. Head-to-head
            racing across four boat classes.
          </p>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-black to-navy-950">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-8">
              <h2 className="font-accent text-3xl sm:text-4xl text-gold-light">Day {DAY_ONE.day}</h2>
              <p className="text-white/60 uppercase tracking-widest text-sm">{DAY_ONE.date}</p>
            </div>
            <div className="space-y-12">
              {DAY_ONE.sessions.map((session) => (
                <div key={session.title}>
                  <h3 className="mb-4 flex flex-wrap items-baseline gap-3">
                    <span className="font-accent text-xl text-white">{session.title}</span>
                    <span className="text-xs uppercase tracking-widest text-white/50">
                      {session.stage} &middot; {session.races.length} races
                    </span>
                  </h3>
                  <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {session.races.map((race) => (
                      <RaceCard key={race.no} race={race} teams={teams} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs text-white/40">
              Boat classes: 1x single scull &middot; 2x double scull &middot; 2- pair &middot; 4+
              coxed four &middot; 4- coxless four. M = Men, W = Women.
            </p>
          </div>

          <div className="flex flex-col items-center text-center border-t border-navy-line pt-14">
            <CalendarClock strokeWidth={1} className="h-14 w-14 text-gold-light" />
            <p className="mt-4 font-accent text-2xl text-white">Day 2 &middot; 20 December 2026</p>
            <p className="mt-2 font-light text-sm uppercase tracking-widest text-white/60">
              Announcing Soon
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

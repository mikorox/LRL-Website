import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getCoaches } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CoachesPage() {
  const coaches = await getCoaches();
  return (
    <>
      <PageHero
        eyebrow="Technical Committee"
        title="Our Coaches"
        subtitle="The coaching staff behind the Lanka Rowing League, bringing decades of combined national and international rowing experience to every franchise."
      />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {coaches.map((coach) => (
            <div key={coach.id} className="text-center">
              <div className="mx-auto h-32 w-32 rounded-full bg-navy-800 border border-navy-line flex items-center justify-center overflow-hidden">
                {coach.photoUrl ? (
                  <Image
                    src={coach.photoUrl}
                    alt={coach.name}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-accent text-3xl text-gold-light">
                    {coach.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-semibold text-white">{coach.name}</h3>
              {coach.position && (
                <p className="mt-1 text-sm text-white/60">{coach.position}</p>
              )}
              <Link
                href={`/coaches/${coach.slug}`}
                className="mt-4 inline-flex items-center rounded-sm border border-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:border-gold-light hover:text-gold-light transition-colors"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

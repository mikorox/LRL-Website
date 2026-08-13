import Image from "next/image";
import PageHero from "@/components/PageHero";
import { getMentors } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function MentorsPage() {
  const mentors = await getMentors();
  return (
    <>
      <PageHero
        eyebrow="Mentors"
        title="Experience That Inspires"
        subtitle="Each franchise is supported by an experienced rowing mentor, providing guidance, leadership, and expertise both on and off the water."
      />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((m) => (
            <div key={m.id} className="rounded-sm border border-navy-line p-6">
              <div className="h-20 w-20 rounded-full bg-navy-800 border border-navy-line flex items-center justify-center mb-4 overflow-hidden">
                {m.photoUrl ? (
                  <Image
                    src={m.photoUrl}
                    alt={m.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-accent text-xl text-gold-light">
                    {m.team
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                )}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold-light">
                {m.team}
              </p>
              <h3 className="mt-1 font-semibold text-lg text-white">{m.name}</h3>
              <p className="text-sm text-white/60 mt-1">
                Former: {m.formerClub}
              </p>
              <p className="text-sm text-white/60">{m.achievements}</p>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

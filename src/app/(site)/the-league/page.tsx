import Image from "next/image";
import Link from "next/link";
import { getCommittee } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function TheLeaguePage() {
  const committee = await getCommittee();

  return (
    <div className="relative bg-black overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(2,19,41,0.7) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute -right-40 -top-24 w-[720px] h-[720px] opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: "url(/images/oar-fan-gold.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      <section className="relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="font-accent text-4xl sm:text-5xl md:text-6xl leading-[0.95] max-w-3xl">
            About the Lanka Rowing League
          </h1>
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-lg text-white/85 leading-relaxed">
          The Lanka Rowing League (LRL) is Sri Lanka&apos;s first
          franchise-based rowing competition.
        </p>
        <p className="mt-6 text-white/70 leading-relaxed">
          Bringing together the country&apos;s top male and female athletes,
          the league combines elite competition with professional
          franchises, fan engagement, and world-class event presentation to
          help shape the future of rowing in Sri Lanka.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Pillar title="Elite Competition" body="The country's top rowers, competing at the highest level in a new franchise format." />
          <Pillar title="Professional Franchises" body="Six city-based franchises, each with owners, managers, and dedicated squads." />
          <Pillar title="Fan Engagement" body="World-class event presentation bringing rowing to a wider Sri Lankan audience." />
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 border-t border-navy-line">
        <h2 className="font-accent text-3xl sm:text-4xl mb-3">Technical Committee</h2>
        <p className="text-white/70 leading-relaxed max-w-2xl mb-12">
          The Technical Committee ensures every aspect of the Lanka Rowing
          League is delivered to the highest standards of safety, fairness,
          and sporting integrity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {committee.map((member) => (
            <div key={member.id} className="text-center">
              <div className="mx-auto h-28 w-28 rounded-full bg-navy-900 border border-navy-line flex items-center justify-center overflow-hidden">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-accent text-2xl text-gold-light">
                    {member.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-semibold text-white">{member.name}</h3>
              {member.position && (
                <p className="mt-1 text-sm text-white/60">{member.position}</p>
              )}
              <Link
                href={`/technical-committee/${member.slug}`}
                className="mt-4 inline-flex items-center rounded-sm border border-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:border-gold-light hover:text-gold-light transition-colors"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Pillar({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-t border-gold-light pt-4">
      <h3 className="font-accent text-xl text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/65 leading-relaxed">{body}</p>
    </div>
  );
}

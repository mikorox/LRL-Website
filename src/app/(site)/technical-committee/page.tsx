import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getCommittee } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function TechnicalCommitteePage() {
  const committee = await getCommittee();
  return (
    <>
      <PageHero
        eyebrow="Technical Committee"
        title="Guiding the Competition"
        subtitle="The Technical Committee ensures every aspect of the Lanka Rowing League is delivered to the highest standards of safety, fairness, and sporting integrity."
      />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {committee.map((member) => (
            <Link
              key={member.id}
              href={`/technical-committee/${member.slug}`}
              className="group text-center"
            >
              <div className="mx-auto h-32 w-32 rounded-full bg-navy-800 border border-navy-line flex items-center justify-center overflow-hidden transition-colors group-hover:border-gold-light">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-accent text-3xl text-gold-light">
                    {member.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-semibold text-white group-hover:text-gold-light transition-colors">
                {member.name}
              </h3>
              {member.position && (
                <p className="text-sm text-white/60">{member.position}</p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

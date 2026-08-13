import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCommitteeMemberBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CommitteeMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = await getCommitteeMemberBySlug(slug);
  if (!member) notFound();

  const bioLines = member.bio
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-navy-900 bg-oar-fan border-b border-navy-line">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/technical-committee"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold transition-colors mb-8"
        >
          <span aria-hidden>&larr;</span> Back to Technical Committee
        </Link>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="h-40 w-40 shrink-0 rounded-full bg-navy-800 border border-navy-line flex items-center justify-center overflow-hidden">
            {member.photoUrl ? (
              <Image
                src={member.photoUrl}
                alt={member.name}
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-accent text-4xl text-gold-light">
                {member.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            )}
          </div>

          <div className="text-center sm:text-left">
            {member.position && (
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-light mb-2">
                {member.position}
              </p>
            )}
            <h1 className="font-accent text-4xl sm:text-5xl leading-[0.98] mb-6">
              {member.name}
            </h1>
            {bioLines.length > 1 ? (
              <ul className="space-y-2 text-white/75 max-w-xl list-disc list-inside marker:text-gold-light">
                {bioLines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-white/75 leading-relaxed max-w-xl">{member.bio}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

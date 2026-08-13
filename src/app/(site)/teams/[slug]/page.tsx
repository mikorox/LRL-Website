import { notFound } from "next/navigation";
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import TeamCrest from "@/components/TeamCrest";
import { getTeamBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = await getTeamBySlug(slug);
  if (!team) notFound();

  const socials = [
    { href: team.socials.instagram, label: "Instagram", Icon: FaInstagram },
    { href: team.socials.facebook, label: "Facebook", Icon: FaFacebook },
    { href: team.socials.youtube, label: "YouTube", Icon: FaYoutube },
    { href: team.socials.tiktok, label: "TikTok", Icon: FaTiktok },
  ].filter((s) => s.href);

  return (
    <>
      <section
        className="relative overflow-hidden border-b border-navy-line"
        style={{
          background: `linear-gradient(135deg, ${team.colorPrimary} 0%, #021329 65%)`,
        }}
      >
        {team.logo && (
          <div
            className="animate-flag-wave pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 h-72 w-72 sm:h-96 sm:w-96 opacity-[0.1]"
            style={{
              backgroundImage: `url(${team.logo})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          />
        )}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 flex flex-col sm:flex-row items-center sm:items-end gap-8">
          <TeamCrest team={team} size={140} />
          <div className="text-center sm:text-left">
            <h1 className="font-accent text-5xl sm:text-6xl">{team.name}</h1>
            <p className="mt-3 text-white/80 max-w-md">{team.tagline}</p>
            {socials.length > 0 && (
              <div className="mt-5 flex items-center justify-center sm:justify-start gap-4 text-white/80">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="hover:text-gold-light transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-14">
        <div>
          <h2 className="font-accent text-2xl text-gold-light mb-4">About the Team</h2>
          <p className="text-white/80 leading-relaxed max-w-3xl">{team.bio}</p>
        </div>

        <div>
          <h2 className="font-accent text-2xl text-gold-light mb-4">Squad</h2>
          {team.squad.length === 0 ? (
            <p className="text-white/60 text-sm">Squad announcement coming soon.</p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {team.squad.map((p) => (
                <li key={p.name} className="rounded-sm border border-navy-line p-4 text-sm">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-white/60">{p.role}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="font-accent text-2xl text-gold-light mb-4">Team Partners</h2>
          {team.partners.length === 0 ? (
            <p className="text-white/60 text-sm">Partner announcements coming soon.</p>
          ) : (
            <ul className="flex flex-wrap gap-4">
              {team.partners.map((p) => (
                <li key={p} className="rounded-sm border border-navy-line px-4 py-2 text-sm">
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

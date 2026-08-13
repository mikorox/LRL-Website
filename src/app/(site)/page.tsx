import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Sailboat, Trophy, type LucideIcon } from "lucide-react";
import Countdown from "@/components/Countdown";
import TeamCrest from "@/components/TeamCrest";
import { PartnerTierCard, PartnerLogo } from "@/components/PartnerCards";
import { getGalleryAlbums, getNews, getPartners, getSettings, getTeams } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [teams, news, settings, partners, albums] = await Promise.all([
    getTeams(),
    getNews(),
    getSettings(),
    getPartners(),
    getGalleryAlbums(),
  ]);

  const weekendLabel = new Date(settings.championshipDate).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "short", year: "numeric" }
  );

  const heroWeekendStart = new Date(settings.championshipDate);
  const heroWeekendEnd = new Date(heroWeekendStart.getTime() + 24 * 60 * 60 * 1000);
  const heroWeekendLabel = `${heroWeekendStart.getDate()} - ${heroWeekendEnd.getDate()} ${heroWeekendStart
    .toLocaleDateString("en-GB", { month: "short" })
    .toUpperCase()} ${heroWeekendStart.getFullYear()}`;

  const otherPartners = [...partners.broadcast, ...partners.associate];
  const featuredTiers = [
    { label: "Title Partner", entries: partners.title },
    { label: "Powered By", entries: partners.poweredBy },
  ].filter((t) => t.label === "Title Partner" || t.entries.length > 0);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative w-full min-h-[560px] sm:min-h-[520px] lg:min-h-[620px] overflow-hidden">
          {settings.heroMediaType === "video" && settings.heroMediaUrl ? (
            <video
              src={settings.heroMediaUrl}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : settings.heroMediaType === "image" && settings.heroMediaUrl ? (
            <Image
              src={settings.heroMediaUrl}
              alt=""
              fill
              priority
              className="object-cover"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(28,58,94,0.55),_transparent_60%)]" />
              <div
                className="absolute -right-24 -top-24 w-[640px] h-[640px] opacity-[0.14] pointer-events-none"
                style={{
                  backgroundImage: "url(/images/oar-fan.png)",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </>
          )}

          {/* Legibility gradients over the background media */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-transparent" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-0 sm:absolute sm:inset-0 sm:flex sm:items-center">
            <div className="max-w-xl sm:py-16">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-gold-light mb-4">
                {settings.tagline}
              </p>
              <h1 className="font-accent text-5xl sm:text-6xl md:text-7xl leading-[0.92]">
                {settings.heroLine1}
                <br />
                {settings.heroLine2}
              </h1>
              <div className="mt-6 h-1 w-20 bg-gold-light" />
              <p className="mt-6 max-w-lg text-white/80 text-base sm:text-lg leading-relaxed">
                {settings.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/the-league"
                  className="inline-flex items-center rounded-sm bg-gold-light px-6 py-3 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
                >
                  Discover the League
                </Link>
                <Link
                  href="/teams"
                  className="inline-flex items-center rounded-sm border border-white/40 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:border-gold-light hover:text-gold-light transition-colors"
                >
                  Meet the Teams
                </Link>
              </div>
            </div>

            {/* Floating championship weekend card */}
            <div className="mt-10 sm:mt-0 sm:absolute sm:left-auto sm:right-0 sm:bottom-20 lg:bottom-24 sm:w-[300px] rounded-sm border border-navy-line bg-navy-950/80 backdrop-blur-sm p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gold-light text-center">
                Championship Weekend
              </p>
              <p className="font-accent text-2xl mt-1 mb-5 text-center">{heroWeekendLabel}</p>
              <Countdown target={settings.championshipDate} />
              <Link
                href="/schedule"
                className="mt-6 block text-center rounded-sm border border-white/20 py-3 text-xs font-bold uppercase tracking-widest text-white hover:border-gold-light hover:text-gold-light transition-colors"
              >
                View Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Franchises + News */}
      <section className="relative z-10 -mt-10 sm:-mt-14 lg:-mt-16 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-sm border border-navy-line bg-navy-900 px-6 sm:px-10 py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12">
            <div>
              <h2 className="font-accent text-2xl sm:text-3xl text-gold-light">
                Six Franchises. One Champion.
              </h2>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
                {teams.map((team) => (
                  <Link
                    key={team.slug}
                    href={`/teams/${team.slug}`}
                    className="group relative flex flex-col items-center text-center gap-3 rounded-sm px-3 py-4"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 rounded-sm opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50"
                      style={{
                        background: `radial-gradient(circle at 50% 40%, ${team.colorPrimary} 0%, transparent 70%)`,
                      }}
                    />
                    <div className="relative transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                      <TeamCrest team={team} size={88} />
                    </div>
                    <span className="relative text-xs font-bold uppercase tracking-wider text-white/85 group-hover:text-gold-light transition-colors">
                      {team.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-accent text-2xl text-gold-light">Latest News</h2>
              </div>
              <ul className="space-y-5">
                {news.slice(0, 3).map((n) => (
                  <li key={n.id} className="border-b border-navy-line pb-5 last:border-0">
                    <Link href={`/news/${n.slug}`} className="group flex items-center gap-4">
                      {n.image ? (
                        <Image
                          src={n.image}
                          alt={n.title}
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-sm object-cover shrink-0"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-sm bg-navy-800 border border-navy-line shrink-0" />
                      )}
                      <div>
                        <p className="text-[11px] uppercase tracking-widest text-white/50">
                          {n.date}
                        </p>
                        <p className="mt-1 font-semibold text-white leading-snug group-hover:text-gold-light transition-colors">
                          {n.title}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
                {news.length === 0 && (
                  <li className="text-sm text-white/50">No news yet. Check back soon.</li>
                )}
              </ul>
              <Link
                href="/news"
                className="mt-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold transition-colors"
              >
                View All News <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoItem
            icon={CalendarDays}
            label="Championship Weekend"
            value={`${weekendLabel}, 1:00 PM onwards`}
          />
          <InfoItem icon={MapPin} label="Venue" value={settings.venue} />
          <InfoItem icon={Sailboat} label="Four Boat Classes" value="Head-to-head racing" />
          <InfoItem
            icon={Trophy}
            label="One Goal"
            value="To be crowned the inaugural champions"
          />
        </div>
      </section>

      {/* Registration CTA */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/registration-bg.jpg"
          alt=""
          fill
          className="object-cover object-[75%_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-64 sm:h-80 bg-gradient-to-b from-navy-950 via-navy-950/70 via-30% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 bg-gradient-to-t from-black via-black/60 via-25% to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-gold-light mb-4">
              Join the League
            </p>
            <h2 className="font-accent text-4xl sm:text-5xl leading-[0.95] mb-6">
              {settings.registrationHeading}
            </h2>
            <p className="max-w-md text-white/70 text-base sm:text-lg leading-relaxed mb-8">
              {settings.registrationSubtitle}
            </p>
            <Link
              href="/register"
              className="inline-flex items-center rounded-sm bg-gold-light px-8 py-4 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-accent text-2xl sm:text-3xl text-gold-light">
              From the Gallery
            </h2>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold transition-colors"
            >
              View Full Gallery <span aria-hidden>&rarr;</span>
            </Link>
          </div>

          {albums.length === 0 ? (
            <p className="text-white/50 text-sm">No albums published yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {albums.slice(0, 4).map((album) => (
                <Link
                  key={album.id}
                  href={`/gallery/${album.slug}`}
                  className="group rounded-sm overflow-hidden border border-white/15 hover:border-gold-light transition-colors"
                >
                  <div className="relative aspect-square bg-navy-950">
                    {album.coverImage ? (
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-white/30">
                        No Cover
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-black/40">
                    <p className="text-xs font-semibold text-white truncate group-hover:text-gold-light transition-colors">
                      {album.title}
                    </p>
                    <p className="text-[10px] text-white/50">
                      {album.photos.length} photo{album.photos.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Partners */}
      <section className="bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-light mb-16 text-center">
            Our Partners
          </p>

          {featuredTiers.length > 0 && (
            <div
              className={`grid gap-8 mx-auto mb-10 ${
                featuredTiers.length === 1
                  ? "grid-cols-1 max-w-xs"
                  : "grid-cols-1 sm:grid-cols-2 max-w-xl"
              }`}
            >
              {featuredTiers.map((tier) => (
                <PartnerTierCard key={tier.label} label={tier.label} entries={tier.entries} />
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {otherPartners.length > 0
              ? otherPartners.map((p) => <PartnerLogo key={p.id} entry={p} />)
              : Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex h-20 items-center justify-center rounded-sm border border-dashed border-white/15 text-[11px] uppercase tracking-widest text-white/40"
                  >
                    Partner
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="group rounded-sm border border-navy-line bg-navy-900 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-light hover:bg-gold-light hover:shadow-lg hover:shadow-black/30">
      <Icon
        strokeWidth={1}
        className="mx-auto mb-2 h-12 w-12 text-gold-light transition-all duration-300 group-hover:scale-110 group-hover:text-navy-950"
      />
      <p className="text-sm sm:text-base font-normal uppercase tracking-widest text-gold-light transition-colors duration-300 group-hover:text-navy-950">
        {label}
      </p>
      <p className="mt-1 text-sm text-white/80 transition-colors duration-300 group-hover:text-navy-950/80">
        {value}
      </p>
    </div>
  );
}


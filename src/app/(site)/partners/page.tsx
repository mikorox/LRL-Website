import { PartnerTierCard, PartnerLogo } from "@/components/PartnerCards";
import { getPartners } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const partners = await getPartners();

  const otherPartners = [...partners.broadcast, ...partners.associate];
  const featuredTiers = [
    { label: "Title Partner", entries: partners.title },
    { label: "Powered By", entries: partners.poweredBy },
  ].filter((t) => t.label === "Title Partner" || t.entries.length > 0);

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
            Our Partners
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-base sm:text-lg">
            Together with our partners, we&apos;re helping grow rowing in Sri
            Lanka and build the country&apos;s premier franchise sporting
            competition.
          </p>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-black to-navy-950">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
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
    </div>
  );
}

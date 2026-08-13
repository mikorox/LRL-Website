export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 bg-oar-fan border-b border-navy-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-light mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="font-accent text-4xl sm:text-5xl md:text-6xl leading-[0.95] max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-white/70 text-base sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

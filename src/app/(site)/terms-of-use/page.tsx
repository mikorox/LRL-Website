export default function TermsOfUsePage() {
  return (
    <div className="relative bg-black overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(2,19,41,0.7) 0%, transparent 60%)",
        }}
      />

      <section className="relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="font-accent text-4xl sm:text-5xl md:text-6xl leading-[0.95] max-w-3xl">
            Terms of Use
          </h1>
          <p className="mt-5 text-white/50 text-sm">Last updated: August 2026</p>
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <Section title="Acceptance of Terms">
          By accessing or using this website, you agree to be bound by these
          Terms of Use. If you do not agree to these terms, please do not use
          this website.
        </Section>

        <Section title="Use of the Website">
          This website is provided for information about the Lanka Rowing
          League, its franchises, events, and athlete registration. You agree
          to use this website only for lawful purposes and in a way that does
          not infringe the rights of, or restrict or inhibit the use of, this
          website by anyone else.
        </Section>

        <Section title="Athlete Registration">
          Submitting the athlete registration form does not guarantee
          selection to the official player pool or any franchise squad.
          Information provided during registration must be accurate to the
          best of your knowledge.
        </Section>

        <Section title="Intellectual Property">
          All content on this website, including logos, team crests, text,
          graphics, and images, is the property of the Lanka Rowing League or
          its partners and may not be reproduced without permission.
        </Section>

        <Section title="Third-Party Links">
          This website may contain links to third-party websites, including
          social media platforms and partner sites. We are not responsible
          for the content or privacy practices of those external sites.
        </Section>

        <Section title="Limitation of Liability">
          This website and its content are provided on an &quot;as is&quot;
          basis without warranties of any kind. The Lanka Rowing League shall
          not be liable for any damages arising from the use of, or
          inability to use, this website.
        </Section>

        <Section title="Changes to These Terms">
          We may update these Terms of Use from time to time. Continued use
          of the website after changes are posted constitutes acceptance of
          the revised terms.
        </Section>

        <Section title="Contact Us">
          If you have questions about these Terms of Use, please contact us
          at inquiry@lankarowingleague.com.
        </Section>
      </section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-accent text-2xl text-gold-light mb-3">{title}</h2>
      <p className="text-white/75 leading-relaxed">{children}</p>
    </div>
  );
}

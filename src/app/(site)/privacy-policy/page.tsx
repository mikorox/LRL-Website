export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-5 text-white/50 text-sm">Last updated: August 2026</p>
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <Section title="Introduction">
          The Lanka Rowing League (&quot;LRL&quot;, &quot;we&quot;, &quot;us&quot;) respects your
          privacy and is committed to protecting the personal information you
          share with us through this website, athlete registrations, and
          related communications.
        </Section>

        <Section title="Information We Collect">
          We may collect information you provide directly, such as your name,
          age, gender, weight, rowing preferences, and contact details when
          you register as an athlete or contact us. We may also collect basic
          technical information (such as browser type and pages visited) to
          help us understand how the site is used.
        </Section>

        <Section title="How We Use Your Information">
          We use the information we collect to process athlete registrations,
          run the player draft, communicate league updates, and improve the
          website. We do not sell your personal information to third
          parties.
        </Section>

        <Section title="Sharing of Information">
          We may share information with franchise owners, team management,
          and event partners as necessary to operate the league, or where
          required by law.
        </Section>

        <Section title="Data Retention">
          We retain personal information for as long as necessary to fulfil
          the purposes described in this policy, unless a longer retention
          period is required by law.
        </Section>

        <Section title="Your Rights">
          You may contact us at any time to ask what personal information we
          hold about you, to request corrections, or to request deletion of
          your information, subject to any legal or operational
          requirements.
        </Section>

        <Section title="Contact Us">
          If you have questions about this Privacy Policy, please contact us
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

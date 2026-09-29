import { getSettings } from "@/lib/data";
import RegisterForm from "./RegisterForm";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const settings = await getSettings();

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
            Your Journey Starts Here
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-base sm:text-lg">
            Think you have what it takes to compete in the Lanka Rowing
            League? Register below to join the official player pool and
            become eligible for the league&apos;s player draft.
          </p>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-black to-navy-950">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          {settings.registrationsOpen ? (
            <RegisterForm />
          ) : (
            <div className="rounded-sm border border-navy-line bg-navy-900 p-8 text-center">
              <h2 className="font-accent text-2xl text-gold-light">
                Registrations Are Closed
              </h2>
              <p className="mt-3 text-white/70">
                Registration for the Lanka Rowing League player pool is
                currently closed. Please check back later or follow our
                social channels for updates.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

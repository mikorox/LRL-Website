import PageHero from "@/components/PageHero";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero eyebrow="Contact" title="Get in Touch" />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 gap-12">
        <div>
          <h2 className="font-accent text-2xl text-gold-light mb-4">
            League Office
          </h2>
          <p className="text-white/70">{settings.contactEmail}</p>
          <p className="text-white/70">{settings.contactAddress}</p>

          <h2 className="font-accent text-2xl text-gold-light mt-10 mb-4">
            Follow the League
          </h2>
          <p className="text-white/70">
            Stay connected with the latest news, race updates,
            behind-the-scenes content, interviews, and highlights across all
            our social platforms.
          </p>
        </div>

        <form className="space-y-4">
          <Field label="Name" name="name" type="text" />
          <Field label="Email" name="email" type="email" />
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              className="w-full rounded-sm border border-navy-line bg-navy-900 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-gold-light focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center rounded-sm bg-gold-light px-6 py-3 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
          >
            Send Message
          </button>
        </form>
      </section>
    </>
  );
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="w-full rounded-sm border border-navy-line bg-navy-900 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-gold-light focus:outline-none"
      />
    </div>
  );
}

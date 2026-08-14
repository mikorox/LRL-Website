import { cookies } from "next/headers";
import { Lock } from "lucide-react";
import DocumentList from "@/components/DocumentList";
import { FRANCHISE_COOKIE, verifyFranchiseSessionToken } from "@/lib/auth";
import { getFranchiseDocuments, getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function FranchisePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const settings = await getSettings();
  const jar = await cookies();
  const token = jar.get(FRANCHISE_COOKIE)?.value;
  const unlocked = await verifyFranchiseSessionToken(
    token,
    settings.franchisePasswordHash
  );

  if (!unlocked) {
    return (
      <div className="relative bg-black overflow-hidden min-h-[70vh] flex items-center justify-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, rgba(2,19,41,0.7) 0%, transparent 60%)",
          }}
        />
        <div className="relative w-full max-w-sm px-4">
          <div className="flex flex-col items-center mb-6 text-center">
            <Lock strokeWidth={1.5} className="h-10 w-10 text-gold-light mb-4" />
            <h1 className="font-accent text-3xl text-white">Franchise Access</h1>
            <p className="mt-2 text-sm text-white/60">
              Enter the password to view franchise documents.
            </p>
          </div>

          <form
            action="/api/franchise/login"
            method="POST"
            className="space-y-4 rounded-sm border border-navy-line bg-navy-900 p-6"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                autoFocus
                required
                className="w-full rounded-sm border border-navy-line bg-navy-950 px-4 py-3 text-sm text-white focus:border-gold-light focus:outline-none"
              />
            </div>
            {error && (
              <p className="text-sm text-red-400">Incorrect password. Try again.</p>
            )}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-sm bg-gold-light px-6 py-3 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  const documents = await getFranchiseDocuments();

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
            Franchise Documents
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-base sm:text-lg">
            Resources and documentation for Lanka Rowing League franchises.
          </p>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-black to-navy-950">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <DocumentList documents={documents} />
        </div>
      </section>
    </div>
  );
}

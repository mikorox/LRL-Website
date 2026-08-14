import DocumentList from "@/components/DocumentList";
import { getBrandDocuments } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function BrandPage() {
  const documents = await getBrandDocuments();

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
            Brand Assets
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-base sm:text-lg">
            Logos, guidelines, and other Lanka Rowing League brand documents
            available for download.
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

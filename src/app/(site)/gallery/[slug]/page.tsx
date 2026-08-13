import Link from "next/link";
import { notFound } from "next/navigation";
import { getGalleryAlbumBySlug } from "@/lib/data";
import Lightbox from "@/components/Lightbox";

export const dynamic = "force-dynamic";

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = await getGalleryAlbumBySlug(slug);
  if (!album) notFound();

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
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold transition-colors mb-6"
          >
            <span aria-hidden>&larr;</span> Back to Gallery
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-light mb-3">
            {album.date}
          </p>
          <h1 className="font-accent text-4xl sm:text-5xl md:text-6xl leading-[0.95] max-w-3xl">
            {album.title}
          </h1>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-black to-navy-950">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          {album.photos.length === 0 ? (
            <p className="text-white/60 text-sm">No photos in this album yet.</p>
          ) : (
            <Lightbox photos={album.photos} title={album.title} />
          )}
        </div>
      </section>
    </div>
  );
}

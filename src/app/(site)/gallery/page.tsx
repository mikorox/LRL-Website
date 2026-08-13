import Image from "next/image";
import Link from "next/link";
import { getGalleryAlbums } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

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
            Relive the Action
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-base sm:text-lg">
            From thrilling races to unforgettable moments, explore photos
            from every Lanka Rowing League event.
          </p>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-black to-navy-950">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          {albums.length === 0 ? (
            <p className="text-white/60 text-sm">No albums published yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <Link
                  key={album.id}
                  href={`/gallery/${album.slug}`}
                  className="group rounded-sm border border-navy-line bg-navy-900 overflow-hidden hover:border-gold-light transition-colors"
                >
                  <div className="relative aspect-video bg-navy-950">
                    {album.coverImage ? (
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-widest text-white/30">
                        Coming Soon
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-widest text-gold-light">{album.date}</p>
                    <h2 className="mt-1 font-accent text-xl group-hover:text-gold-light transition-colors">
                      {album.title}
                    </h2>
                    <p className="mt-1 text-xs text-white/50">
                      {album.photos.length} photo{album.photos.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

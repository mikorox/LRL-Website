import Image from "next/image";
import Link from "next/link";
import { getGalleryAlbums } from "@/lib/data";
import { deleteAlbum } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-accent text-3xl text-white">Gallery</h1>
        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center rounded-sm bg-gold-light px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
        >
          Add Album
        </Link>
      </div>
      <p className="text-sm text-white/60 mb-6">
        Group photos into albums, one per event.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums.map((album) => (
          <div key={album.id} className="rounded-sm border border-navy-line bg-navy-900 overflow-hidden">
            <Link href={`/admin/gallery/${album.id}`} className="block">
              <div className="relative aspect-video bg-navy-950">
                {album.coverImage ? (
                  <Image src={album.coverImage} alt={album.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-widest text-white/30">
                    No Cover
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest text-white/50">{album.date}</p>
                <p className="font-semibold text-white">{album.title}</p>
                <p className="text-xs text-white/50 mt-1">
                  {album.photos.length} photo{album.photos.length === 1 ? "" : "s"}
                </p>
              </div>
            </Link>
            <div className="flex items-center justify-between px-4 pb-4">
              <Link
                href={`/admin/gallery/${album.id}`}
                className="text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold"
              >
                Manage Photos
              </Link>
              <form action={deleteAlbum}>
                <input type="hidden" name="id" value={album.id} />
                <button
                  type="submit"
                  className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {albums.length === 0 && (
          <p className="text-sm text-white/50 col-span-full">No albums yet.</p>
        )}
      </div>
    </div>
  );
}

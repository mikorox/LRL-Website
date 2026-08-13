import Image from "next/image";
import { notFound } from "next/navigation";
import { getGalleryAlbums } from "@/lib/data";
import { TextField, SubmitButton } from "@/components/admin/fields";
import { ImageUploadField, MultiImageUploadField } from "@/components/admin/ImageUploadField";
import { updateAlbum, addPhotos, deletePhoto } from "../actions";

export default async function EditAlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const albums = await getGalleryAlbums();
  const album = albums.find((a) => a.id === id);
  if (!album) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="font-accent text-3xl text-white mb-6">{album.title}</h1>

      <section className="mb-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
          Album Details
        </h2>
        <form action={updateAlbum} className="space-y-5 max-w-xl">
          <input type="hidden" name="id" value={album.id} />
          <TextField label="Event Title" name="title" defaultValue={album.title} required />
          <TextField label="Date" name="date" defaultValue={album.date} required />
          <ImageUploadField label="Cover Image" name="coverImage" initialUrl={album.coverImage} />
          <SubmitButton label="Save Details" />
        </form>
      </section>

      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
          Photos ({album.photos.length})
        </h2>

        <form
          action={addPhotos}
          className="rounded-sm border border-dashed border-navy-line p-4 mb-6 space-y-4"
        >
          <input type="hidden" name="albumId" value={album.id} />
          <MultiImageUploadField
            label="Photos"
            name="urls"
            hint="Select multiple photos at once, then save."
          />
          <button
            type="submit"
            className="inline-flex items-center rounded-sm bg-gold-light px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
          >
            Save Photos
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {album.photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className="relative aspect-square rounded-sm overflow-hidden border border-navy-line bg-navy-900">
                <Image src={photo.url} alt={photo.caption || album.title} fill className="object-cover" />
              </div>
              {photo.caption && <p className="mt-1 text-xs text-white/60 truncate">{photo.caption}</p>}
              <form action={deletePhoto} className="mt-1">
                <input type="hidden" name="albumId" value={album.id} />
                <input type="hidden" name="photoId" value={photo.id} />
                <button
                  type="submit"
                  className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
          {album.photos.length === 0 && (
            <p className="text-sm text-white/50 col-span-full">No photos in this album yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

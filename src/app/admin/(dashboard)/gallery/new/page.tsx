import { TextField, SubmitButton } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { createAlbum } from "../actions";

export default function NewAlbumPage() {
  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-6">Add Album</h1>
      <form action={createAlbum} className="space-y-5 max-w-xl">
        <TextField label="Event Title" name="title" placeholder="e.g. Player Auction Night" required />
        <TextField label="Date" name="date" placeholder="e.g. 24 Sep 2026" required />
        <ImageUploadField label="Cover Image" name="coverImage" />
        <SubmitButton label="Create Album" />
      </form>
    </div>
  );
}

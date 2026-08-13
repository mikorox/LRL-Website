import { TextField, TextAreaField, SubmitButton } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { createNews } from "../actions";

export default function NewNewsPage() {
  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-6">Add Article</h1>
      <form action={createNews} className="space-y-5 max-w-xl">
        <TextField label="Date" name="date" placeholder="e.g. 24 Sep 2026" required />
        <TextField label="Title" name="title" required />
        <TextAreaField
          label="Excerpt"
          name="excerpt"
          hint="Short summary shown in news lists and cards."
          required
        />
        <TextAreaField
          label="Article Content"
          name="content"
          rows={10}
          hint="The full article body. Leave a blank line between paragraphs."
        />
        <ImageUploadField label="Thumbnail Image" name="image" />
        <SubmitButton label="Publish Article" />
      </form>
    </div>
  );
}

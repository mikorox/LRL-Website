import { notFound } from "next/navigation";
import { getNews } from "@/lib/data";
import { TextField, TextAreaField, SubmitButton } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updateNews } from "../actions";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await getNews();
  const item = news.find((n) => n.id === id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-6">Edit Article</h1>
      <form action={updateNews} className="space-y-5 max-w-xl">
        <input type="hidden" name="id" value={item.id} />
        <TextField label="Date" name="date" defaultValue={item.date} required />
        <TextField label="Title" name="title" defaultValue={item.title} required />
        <TextAreaField
          label="Excerpt"
          name="excerpt"
          defaultValue={item.excerpt}
          hint="Short summary shown in news lists and cards."
          required
        />
        <TextAreaField
          label="Article Content"
          name="content"
          defaultValue={item.content}
          rows={10}
          hint="The full article body. Leave a blank line between paragraphs."
        />
        <ImageUploadField label="Thumbnail Image" name="image" initialUrl={item.image} />
        <SubmitButton label="Save Changes" />
      </form>
    </div>
  );
}

import { notFound } from "next/navigation";
import { getCoaches } from "@/lib/data";
import { TextField, TextAreaField, SubmitButton } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updateCoach } from "../actions";

export default async function EditCoachPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coaches = await getCoaches();
  const coach = coaches.find((c) => c.id === id);
  if (!coach) notFound();

  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-6">Edit Coach</h1>
      <form action={updateCoach} className="space-y-5 max-w-xl">
        <input type="hidden" name="id" value={coach.id} />
        <TextField label="Name" name="name" defaultValue={coach.name} required />
        <TextField label="Position" name="position" defaultValue={coach.position} required />
        <TextAreaField
          label="Bio"
          name="bio"
          defaultValue={coach.bio}
          rows={5}
          hint="Shown on their individual profile page."
        />
        <ImageUploadField label="Photo" name="photoUrl" initialUrl={coach.photoUrl} />
        <SubmitButton label="Save Changes" />
      </form>
    </div>
  );
}

import { notFound } from "next/navigation";
import { getMentors } from "@/lib/data";
import { TextField, TextAreaField, SubmitButton } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updateMentor } from "../actions";

export default async function EditMentorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mentors = await getMentors();
  const mentor = mentors.find((m) => m.id === id);
  if (!mentor) notFound();

  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-1">{mentor.team}</h1>
      <p className="text-sm text-white/60 mb-6">Mentor profile</p>
      <form action={updateMentor} className="space-y-5 max-w-xl">
        <input type="hidden" name="id" value={mentor.id} />
        <TextField label="Name" name="name" defaultValue={mentor.name} required />
        <TextField label="Former Club / Institution" name="formerClub" defaultValue={mentor.formerClub} />
        <TextField label="Rowing Achievements" name="achievements" defaultValue={mentor.achievements} />
        <TextAreaField label="Short Biography" name="bio" defaultValue={mentor.bio} rows={4} />
        <ImageUploadField label="Photo" name="photoUrl" initialUrl={mentor.photoUrl} />
        <SubmitButton label="Save Changes" />
      </form>
    </div>
  );
}

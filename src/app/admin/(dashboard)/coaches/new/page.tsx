import { TextField, TextAreaField, SubmitButton } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { createCoach } from "../actions";

export default function NewCoachPage() {
  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-6">Add Coach</h1>
      <form action={createCoach} className="space-y-5 max-w-xl">
        <TextField label="Name" name="name" required />
        <TextField label="Position" name="position" required />
        <TextAreaField
          label="Bio"
          name="bio"
          rows={5}
          hint="Shown on their individual profile page."
        />
        <ImageUploadField label="Photo" name="photoUrl" />
        <SubmitButton label="Add Coach" />
      </form>
    </div>
  );
}

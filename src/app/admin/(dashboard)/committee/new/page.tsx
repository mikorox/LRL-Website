import { TextField, TextAreaField, SubmitButton } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { createCommitteeMember } from "../actions";

export default function NewCommitteeMemberPage() {
  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-6">Add Committee Member</h1>
      <form action={createCommitteeMember} className="space-y-5 max-w-xl">
        <TextField label="Name" name="name" required />
        <TextField label="Position" name="position" required />
        <TextAreaField
          label="Bio"
          name="bio"
          rows={5}
          hint="Shown on their individual profile page."
        />
        <ImageUploadField label="Photo" name="photoUrl" />
        <SubmitButton label="Add Member" />
      </form>
    </div>
  );
}

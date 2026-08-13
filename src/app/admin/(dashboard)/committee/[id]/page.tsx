import { notFound } from "next/navigation";
import { getCommittee } from "@/lib/data";
import { TextField, TextAreaField, SubmitButton } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updateCommitteeMember } from "../actions";

export default async function EditCommitteeMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const committee = await getCommittee();
  const member = committee.find((m) => m.id === id);
  if (!member) notFound();

  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-6">Edit Committee Member</h1>
      <form action={updateCommitteeMember} className="space-y-5 max-w-xl">
        <input type="hidden" name="id" value={member.id} />
        <TextField label="Name" name="name" defaultValue={member.name} required />
        <TextField label="Position" name="position" defaultValue={member.position} required />
        <TextAreaField
          label="Bio"
          name="bio"
          defaultValue={member.bio}
          rows={5}
          hint="Shown on their individual profile page."
        />
        <ImageUploadField label="Photo" name="photoUrl" initialUrl={member.photoUrl} />
        <SubmitButton label="Save Changes" />
      </form>
    </div>
  );
}

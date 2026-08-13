import { notFound } from "next/navigation";
import { getTeamBySlug } from "@/lib/data";
import { TextField, TextAreaField, ColorField, SubmitButton } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updateTeam } from "../actions";

export default async function EditTeamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = await getTeamBySlug(slug);
  if (!team) notFound();

  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-6">{team.name}</h1>
      <form action={updateTeam} className="space-y-5 max-w-xl">
        <input type="hidden" name="slug" value={team.slug} />
        <ImageUploadField label="Team Logo" name="logo" initialUrl={team.logo} />
        <TextField label="Team Name" name="name" defaultValue={team.name} required />
        <TextField label="City" name="city" defaultValue={team.city} required />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorField label="Primary Color" name="colorPrimary" defaultValue={team.colorPrimary} />
          <ColorField label="Secondary Color" name="colorSecondary" defaultValue={team.colorSecondary} />
        </div>
        <TextField label="Tagline" name="tagline" defaultValue={team.tagline} />
        <TextAreaField
          label="Bio"
          name="bio"
          defaultValue={team.bio}
          rows={5}
          hint="Shown on the team's profile page."
        />
        <TextAreaField
          label="Squad"
          name="squad"
          defaultValue={team.squad.map((p) => `${p.name} | ${p.role}`).join("\n")}
          hint="One rower per line, formatted as: Name | Role"
          rows={6}
        />
        <TextAreaField
          label="Team Partners"
          name="partners"
          defaultValue={team.partners.join(", ")}
          hint="Comma-separated partner names"
          rows={2}
        />

        <div className="pt-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
            Social Links
          </h2>
          <div className="space-y-5">
            <TextField label="Instagram" name="instagram" defaultValue={team.socials.instagram} />
            <TextField label="Facebook" name="facebook" defaultValue={team.socials.facebook} />
            <TextField label="YouTube" name="youtube" defaultValue={team.socials.youtube} />
            <TextField label="TikTok" name="tiktok" defaultValue={team.socials.tiktok} />
          </div>
        </div>

        <SubmitButton label="Save Changes" />
      </form>
    </div>
  );
}

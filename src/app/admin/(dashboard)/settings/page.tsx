import { getSettings } from "@/lib/data";
import {
  TextField,
  TextAreaField,
  SelectField,
  SubmitButton,
} from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updateSettings } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  const championshipDateLocal = settings.championshipDate.slice(0, 16);

  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-6">Site Settings</h1>
      <form action={updateSettings} className="space-y-8 max-w-xl">
        <section className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/50">
            General
          </h2>
          <TextField label="Site Name" name="siteName" defaultValue={settings.siteName} required />
          <TextField label="Tagline" name="tagline" defaultValue={settings.tagline} />
        </section>

        <section className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/50">
            Homepage Hero
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField label="Hero Line 1" name="heroLine1" defaultValue={settings.heroLine1} />
            <TextField label="Hero Line 2" name="heroLine2" defaultValue={settings.heroLine2} />
          </div>
          <TextAreaField label="Hero Subtitle" name="heroSubtitle" defaultValue={settings.heroSubtitle} rows={3} />
        </section>

        <section className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/50">
            Hero Background
          </h2>

          <SelectField
            label="Background Type"
            name="heroMediaType"
            defaultValue={settings.heroMediaType}
            options={[
              { value: "none", label: "None (plain background)" },
              { value: "image", label: "Image" },
              { value: "video", label: "Video" },
            ]}
          />
          <ImageUploadField
            label="Upload Background"
            name="heroMediaUrl"
            accept="image/*,video/*"
            initialUrl={settings.heroMediaUrl}
            hint="Upload a photo or a short looping video. Ignored if type is set to None."
          />
        </section>

        <section className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/50">
            Registration Call-to-Action
          </h2>
          <TextField
            label="Heading"
            name="registrationHeading"
            defaultValue={settings.registrationHeading}
          />
          <TextAreaField
            label="Subtitle"
            name="registrationSubtitle"
            defaultValue={settings.registrationSubtitle}
            rows={3}
          />
        </section>

        <section className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/50">
            Championship Weekend
          </h2>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
              Date &amp; Time (Sri Lanka time)
            </label>
            <input
              type="datetime-local"
              name="championshipDate"
              defaultValue={championshipDateLocal}
              required
              className="w-full rounded-sm border border-navy-line bg-navy-950 px-4 py-3 text-sm text-white focus:border-gold-light focus:outline-none"
            />
          </div>
          <TextField label="Venue" name="venue" defaultValue={settings.venue} />
        </section>

        <section className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/50">
            Contact
          </h2>
          <TextField label="Contact Email" name="contactEmail" type="email" defaultValue={settings.contactEmail} />
          <TextField label="Contact Address" name="contactAddress" defaultValue={settings.contactAddress} />
        </section>

        <section className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/50">
            Social Links
          </h2>
          <TextField label="Instagram" name="instagram" defaultValue={settings.socials.instagram} />
          <TextField label="Facebook" name="facebook" defaultValue={settings.socials.facebook} />
          <TextField label="YouTube" name="youtube" defaultValue={settings.socials.youtube} />
          <TextField label="TikTok" name="tiktok" defaultValue={settings.socials.tiktok} />
        </section>

        <SubmitButton label="Save Settings" />
      </form>
    </div>
  );
}

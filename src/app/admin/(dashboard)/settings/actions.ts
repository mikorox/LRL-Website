"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import type { SiteSettings } from "@/lib/data";

export async function updateSettings(formData: FormData) {
  await requireAdmin();

  const heroMediaType = String(
    formData.get("heroMediaType") || "none"
  ) as SiteSettings["heroMediaType"];

  const heroMediaUrl =
    heroMediaType === "none" ? "" : String(formData.get("heroMediaUrl") || "");

  // franchise_password_hash is intentionally not touched here — it's
  // managed only from the Franchise Documents admin page.
  await execute(
    `UPDATE settings SET
       site_name=?, tagline=?, hero_line1=?, hero_line2=?, hero_subtitle=?,
       hero_media_type=?, hero_media_url=?, registration_heading=?, registration_subtitle=?,
       championship_date=?, venue=?, contact_email=?, contact_address=?,
       social_instagram=?, social_facebook=?, social_youtube=?, social_tiktok=?
     WHERE id=1`,
    [
      String(formData.get("siteName") || ""),
      String(formData.get("tagline") || ""),
      String(formData.get("heroLine1") || ""),
      String(formData.get("heroLine2") || ""),
      String(formData.get("heroSubtitle") || ""),
      heroMediaType,
      heroMediaUrl,
      String(formData.get("registrationHeading") || ""),
      String(formData.get("registrationSubtitle") || ""),
      `${String(formData.get("championshipDate") || "")}:00+05:30`,
      String(formData.get("venue") || ""),
      String(formData.get("contactEmail") || ""),
      String(formData.get("contactAddress") || ""),
      String(formData.get("instagram") || ""),
      String(formData.get("facebook") || ""),
      String(formData.get("youtube") || ""),
      String(formData.get("tiktok") || ""),
    ]
  );

  revalidatePath("/", "layout");
}

"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { setDoc } from "@/lib/store";
import type { SiteSettings } from "@/lib/data";

const FILE = "settings.json";

export async function updateSettings(formData: FormData) {
  await requireAdmin();

  const heroMediaType = String(
    formData.get("heroMediaType") || "none"
  ) as SiteSettings["heroMediaType"];

  const heroMediaUrl =
    heroMediaType === "none" ? "" : String(formData.get("heroMediaUrl") || "");

  const settings: SiteSettings = {
    siteName: String(formData.get("siteName") || ""),
    tagline: String(formData.get("tagline") || ""),
    heroLine1: String(formData.get("heroLine1") || ""),
    heroLine2: String(formData.get("heroLine2") || ""),
    heroSubtitle: String(formData.get("heroSubtitle") || ""),
    heroMediaType,
    heroMediaUrl,
    registrationHeading: String(formData.get("registrationHeading") || ""),
    registrationSubtitle: String(formData.get("registrationSubtitle") || ""),
    championshipDate: `${String(formData.get("championshipDate") || "")}:00+05:30`,
    venue: String(formData.get("venue") || ""),
    contactEmail: String(formData.get("contactEmail") || ""),
    contactAddress: String(formData.get("contactAddress") || ""),
    socials: {
      instagram: String(formData.get("instagram") || ""),
      facebook: String(formData.get("facebook") || ""),
      youtube: String(formData.get("youtube") || ""),
      tiktok: String(formData.get("tiktok") || ""),
    },
  };

  await setDoc(FILE, settings);
  revalidatePath("/", "layout");
}

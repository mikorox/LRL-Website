"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { query, execute } from "@/lib/db";
import type { Team } from "@/lib/data";

function parseLines(value: string): { name: string; role: string }[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, role] = line.split("|").map((s) => s.trim());
      return { name: name || "", role: role || "" };
    });
}

function parseList(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function updateTeam(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug"));

  const rows = await query<{ logo: string; color_primary: string; color_secondary: string }[]>(
    "SELECT logo, color_primary, color_secondary FROM teams WHERE slug = ? LIMIT 1",
    [slug]
  );
  if (!rows[0]) throw new Error("Not found");
  const existing = rows[0];

  const team: Omit<Team, "slug"> = {
    name: String(formData.get("name") || ""),
    city: String(formData.get("city") || ""),
    logo: String(formData.get("logo") || existing.logo),
    colorPrimary: String(formData.get("colorPrimary") || existing.color_primary),
    colorSecondary: String(formData.get("colorSecondary") || existing.color_secondary),
    tagline: String(formData.get("tagline") || ""),
    bio: String(formData.get("bio") || ""),
    socials: {
      instagram: String(formData.get("instagram") || ""),
      facebook: String(formData.get("facebook") || ""),
      youtube: String(formData.get("youtube") || ""),
      tiktok: String(formData.get("tiktok") || ""),
    },
    partners: parseList(String(formData.get("partners") || "")),
    squad: parseLines(String(formData.get("squad") || "")),
  };

  await execute(
    `UPDATE teams SET name=?, city=?, logo=?, color_primary=?, color_secondary=?, tagline=?, bio=?,
       social_instagram=?, social_facebook=?, social_youtube=?, social_tiktok=?, squad=?, partners=?
     WHERE slug=?`,
    [
      team.name, team.city, team.logo, team.colorPrimary, team.colorSecondary, team.tagline,
      team.bio, team.socials.instagram, team.socials.facebook, team.socials.youtube,
      team.socials.tiktok, JSON.stringify(team.squad), JSON.stringify(team.partners), slug,
    ]
  );

  revalidatePath("/teams");
  revalidatePath(`/teams/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin/teams");
  redirect("/admin/teams");
}

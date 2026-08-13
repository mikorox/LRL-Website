"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { getCollection, setCollection } from "@/lib/store";
import type { Team } from "@/lib/data";

const FILE = "teams.json";

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
  const teams = await getCollection<Team>(FILE);
  const idx = teams.findIndex((t) => t.slug === slug);
  if (idx === -1) throw new Error("Not found");

  teams[idx] = {
    ...teams[idx],
    name: String(formData.get("name") || ""),
    city: String(formData.get("city") || ""),
    logo: String(formData.get("logo") || teams[idx].logo),
    colorPrimary: String(formData.get("colorPrimary") || teams[idx].colorPrimary),
    colorSecondary: String(formData.get("colorSecondary") || teams[idx].colorSecondary),
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

  await setCollection(FILE, teams);
  revalidatePath("/teams");
  revalidatePath(`/teams/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin/teams");
  redirect("/admin/teams");
}

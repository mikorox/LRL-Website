"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { getCollection, setCollection } from "@/lib/store";
import type { Mentor } from "@/lib/data";

const FILE = "mentors.json";

export async function updateMentor(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const items = await getCollection<Mentor>(FILE);
  const idx = items.findIndex((m) => m.id === id);
  if (idx === -1) throw new Error("Not found");

  items[idx] = {
    ...items[idx],
    name: String(formData.get("name") || ""),
    formerClub: String(formData.get("formerClub") || ""),
    achievements: String(formData.get("achievements") || ""),
    bio: String(formData.get("bio") || ""),
    photoUrl: String(formData.get("photoUrl") || ""),
  };

  await setCollection(FILE, items);
  revalidatePath("/mentors");
  revalidatePath("/admin/mentors");
  redirect("/admin/mentors");
}

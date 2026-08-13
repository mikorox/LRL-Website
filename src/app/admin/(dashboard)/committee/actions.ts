"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { getCollection, setCollection } from "@/lib/store";
import { uniqueSlug } from "@/lib/slug";
import type { CommitteeMember } from "@/lib/data";

const FILE = "committee.json";

export async function createCommitteeMember(formData: FormData) {
  await requireAdmin();
  const items = await getCollection<CommitteeMember>(FILE);
  const name = String(formData.get("name") || "");
  const slug = uniqueSlug(name, items.map((m) => m.slug));
  items.push({
    id: crypto.randomUUID(),
    slug,
    name,
    position: String(formData.get("position") || ""),
    bio: String(formData.get("bio") || ""),
    photoUrl: String(formData.get("photoUrl") || ""),
  });
  await setCollection(FILE, items);
  revalidatePath("/technical-committee");
  revalidatePath("/the-league");
  revalidatePath("/admin/committee");
  redirect("/admin/committee");
}

export async function updateCommitteeMember(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const items = await getCollection<CommitteeMember>(FILE);
  const idx = items.findIndex((m) => m.id === id);
  if (idx === -1) throw new Error("Not found");
  items[idx] = {
    ...items[idx],
    name: String(formData.get("name") || ""),
    position: String(formData.get("position") || ""),
    bio: String(formData.get("bio") || ""),
    photoUrl: String(formData.get("photoUrl") || ""),
  };
  await setCollection(FILE, items);
  revalidatePath("/technical-committee");
  revalidatePath(`/technical-committee/${items[idx].slug}`);
  revalidatePath("/the-league");
  revalidatePath("/admin/committee");
  redirect("/admin/committee");
}

export async function deleteCommitteeMember(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const items = await getCollection<CommitteeMember>(FILE);
  await setCollection(FILE, items.filter((m) => m.id !== id));
  revalidatePath("/technical-committee");
  revalidatePath("/the-league");
  revalidatePath("/admin/committee");
}

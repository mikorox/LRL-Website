"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { query, execute } from "@/lib/db";
import { uniqueSlug } from "@/lib/slug";

export async function createCommitteeMember(formData: FormData) {
  await requireAdmin();
  const existingSlugs = await query<{ slug: string }[]>("SELECT slug FROM committee");
  const name = String(formData.get("name") || "");
  const slug = uniqueSlug(name, existingSlugs.map((s) => s.slug));

  await execute(
    `INSERT INTO committee (id, slug, name, position, bio, photo_url) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      crypto.randomUUID(), slug, name, String(formData.get("position") || ""),
      String(formData.get("bio") || ""), String(formData.get("photoUrl") || ""),
    ]
  );
  revalidatePath("/technical-committee");
  revalidatePath("/the-league");
  revalidatePath("/admin/committee");
  redirect("/admin/committee");
}

export async function updateCommitteeMember(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const rows = await query<{ slug: string }[]>(
    "SELECT slug FROM committee WHERE id = ? LIMIT 1",
    [id]
  );
  if (!rows[0]) throw new Error("Not found");

  await execute(
    `UPDATE committee SET name=?, position=?, bio=?, photo_url=? WHERE id=?`,
    [
      String(formData.get("name") || ""), String(formData.get("position") || ""),
      String(formData.get("bio") || ""), String(formData.get("photoUrl") || ""), id,
    ]
  );
  revalidatePath("/technical-committee");
  revalidatePath(`/technical-committee/${rows[0].slug}`);
  revalidatePath("/the-league");
  revalidatePath("/admin/committee");
  redirect("/admin/committee");
}

export async function deleteCommitteeMember(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await execute("DELETE FROM committee WHERE id = ?", [id]);
  revalidatePath("/technical-committee");
  revalidatePath("/the-league");
  revalidatePath("/admin/committee");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { query, execute } from "@/lib/db";
import { uniqueSlug } from "@/lib/slug";

export async function createCoach(formData: FormData) {
  await requireAdmin();
  const existingSlugs = await query<{ slug: string }[]>("SELECT slug FROM coaches");
  const name = String(formData.get("name") || "");
  const slug = uniqueSlug(name, existingSlugs.map((s) => s.slug));

  await execute(
    `INSERT INTO coaches (id, slug, name, position, bio, photo_url) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      crypto.randomUUID(), slug, name, String(formData.get("position") || ""),
      String(formData.get("bio") || ""), String(formData.get("photoUrl") || ""),
    ]
  );
  revalidatePath("/coaches");
  revalidatePath("/the-league");
  revalidatePath("/admin/coaches");
  redirect("/admin/coaches");
}

export async function updateCoach(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const rows = await query<{ slug: string }[]>(
    "SELECT slug FROM coaches WHERE id = ? LIMIT 1",
    [id]
  );
  if (!rows[0]) throw new Error("Not found");

  await execute(
    `UPDATE coaches SET name=?, position=?, bio=?, photo_url=? WHERE id=?`,
    [
      String(formData.get("name") || ""), String(formData.get("position") || ""),
      String(formData.get("bio") || ""), String(formData.get("photoUrl") || ""), id,
    ]
  );
  revalidatePath("/coaches");
  revalidatePath(`/coaches/${rows[0].slug}`);
  revalidatePath("/the-league");
  revalidatePath("/admin/coaches");
  redirect("/admin/coaches");
}

export async function deleteCoach(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await execute("DELETE FROM coaches WHERE id = ?", [id]);
  revalidatePath("/coaches");
  revalidatePath("/the-league");
  revalidatePath("/admin/coaches");
}

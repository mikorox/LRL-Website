"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { query, execute } from "@/lib/db";
import { uniqueSlug } from "@/lib/slug";

export async function createNews(formData: FormData) {
  await requireAdmin();
  const existingSlugs = await query<{ slug: string }[]>("SELECT slug FROM news");

  const title = String(formData.get("title") || "");
  const slug = uniqueSlug(title, existingSlugs.map((s) => s.slug));

  await execute(
    `INSERT INTO news (id, slug, date, title, excerpt, content, image) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      crypto.randomUUID(), slug, String(formData.get("date") || ""), title,
      String(formData.get("excerpt") || ""), String(formData.get("content") || ""),
      String(formData.get("image") || ""),
    ]
  );
  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function updateNews(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const rows = await query<{ slug: string }[]>("SELECT slug FROM news WHERE id = ? LIMIT 1", [id]);
  if (!rows[0]) throw new Error("Not found");

  await execute(
    `UPDATE news SET date=?, title=?, excerpt=?, content=?, image=? WHERE id=?`,
    [
      String(formData.get("date") || ""), String(formData.get("title") || ""),
      String(formData.get("excerpt") || ""), String(formData.get("content") || ""),
      String(formData.get("image") || ""), id,
    ]
  );
  revalidatePath("/news");
  revalidatePath(`/news/${rows[0].slug}`);
  revalidatePath("/");
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function deleteNews(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await execute("DELETE FROM news WHERE id = ?", [id]);
  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
}

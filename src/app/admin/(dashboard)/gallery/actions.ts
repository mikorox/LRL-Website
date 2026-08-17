"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { query, execute } from "@/lib/db";
import { uniqueSlug } from "@/lib/slug";

export async function createAlbum(formData: FormData) {
  await requireAdmin();
  const existingSlugs = await query<{ slug: string }[]>("SELECT slug FROM gallery_albums");
  const title = String(formData.get("title") || "");
  const slug = uniqueSlug(title, existingSlugs.map((s) => s.slug));
  const id = crypto.randomUUID();

  await execute(
    `INSERT INTO gallery_albums (id, slug, title, date, cover_image) VALUES (?, ?, ?, ?, ?)`,
    [id, slug, title, String(formData.get("date") || ""), String(formData.get("coverImage") || "")]
  );
  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/admin/gallery");
  redirect(`/admin/gallery/${id}`);
}

export async function updateAlbum(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const rows = await query<{ slug: string; cover_image: string }[]>(
    "SELECT slug, cover_image FROM gallery_albums WHERE id = ? LIMIT 1",
    [id]
  );
  if (!rows[0]) throw new Error("Not found");

  await execute(
    `UPDATE gallery_albums SET title=?, date=?, cover_image=? WHERE id=?`,
    [
      String(formData.get("title") || ""), String(formData.get("date") || ""),
      String(formData.get("coverImage") || rows[0].cover_image), id,
    ]
  );
  revalidatePath("/gallery");
  revalidatePath(`/gallery/${rows[0].slug}`);
  revalidatePath("/");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function deleteAlbum(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await execute("DELETE FROM gallery_albums WHERE id = ?", [id]);
  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

export async function addPhotos(formData: FormData) {
  await requireAdmin();
  const albumId = String(formData.get("albumId"));
  const urls = formData.getAll("urls").map(String).filter(Boolean);
  if (urls.length === 0) throw new Error("At least one photo is required");

  const rows = await query<{ slug: string }[]>(
    "SELECT slug FROM gallery_albums WHERE id = ? LIMIT 1",
    [albumId]
  );
  if (!rows[0]) throw new Error("Not found");

  for (const url of urls) {
    await execute(
      `INSERT INTO gallery_photos (id, album_id, url, caption) VALUES (?, ?, ?, '')`,
      [crypto.randomUUID(), albumId, url]
    );
  }

  revalidatePath("/gallery");
  revalidatePath(`/gallery/${rows[0].slug}`);
  revalidatePath(`/admin/gallery/${albumId}`);
}

export async function deletePhoto(formData: FormData) {
  await requireAdmin();
  const albumId = String(formData.get("albumId"));
  const photoId = String(formData.get("photoId"));

  const rows = await query<{ slug: string }[]>(
    "SELECT slug FROM gallery_albums WHERE id = ? LIMIT 1",
    [albumId]
  );
  if (!rows[0]) throw new Error("Not found");

  await execute("DELETE FROM gallery_photos WHERE id = ? AND album_id = ?", [photoId, albumId]);

  revalidatePath("/gallery");
  revalidatePath(`/gallery/${rows[0].slug}`);
  revalidatePath(`/admin/gallery/${albumId}`);
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { getCollection, setCollection } from "@/lib/store";
import { uniqueSlug } from "@/lib/slug";
import type { GalleryAlbum } from "@/lib/data";

const FILE = "galleries.json";

export async function createAlbum(formData: FormData) {
  await requireAdmin();
  const albums = await getCollection<GalleryAlbum>(FILE);

  const title = String(formData.get("title") || "");
  const slug = uniqueSlug(title, albums.map((a) => a.slug));

  const album: GalleryAlbum = {
    id: crypto.randomUUID(),
    slug,
    title,
    date: String(formData.get("date") || ""),
    coverImage: String(formData.get("coverImage") || ""),
    photos: [],
  };

  albums.unshift(album);
  await setCollection(FILE, albums);
  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/admin/gallery");
  redirect(`/admin/gallery/${album.id}`);
}

export async function updateAlbum(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const albums = await getCollection<GalleryAlbum>(FILE);
  const idx = albums.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error("Not found");

  albums[idx] = {
    ...albums[idx],
    title: String(formData.get("title") || ""),
    date: String(formData.get("date") || ""),
    coverImage: String(formData.get("coverImage") || albums[idx].coverImage),
  };

  await setCollection(FILE, albums);
  revalidatePath("/gallery");
  revalidatePath(`/gallery/${albums[idx].slug}`);
  revalidatePath("/");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function deleteAlbum(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const albums = await getCollection<GalleryAlbum>(FILE);
  await setCollection(FILE, albums.filter((a) => a.id !== id));
  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

export async function addPhotos(formData: FormData) {
  await requireAdmin();
  const albumId = String(formData.get("albumId"));
  const urls = formData.getAll("urls").map(String).filter(Boolean);
  if (urls.length === 0) throw new Error("At least one photo is required");

  const albums = await getCollection<GalleryAlbum>(FILE);
  const idx = albums.findIndex((a) => a.id === albumId);
  if (idx === -1) throw new Error("Not found");

  const newPhotos = urls.map((url) => ({
    id: crypto.randomUUID(),
    url,
    caption: "",
  }));
  albums[idx].photos = [...newPhotos, ...albums[idx].photos];

  await setCollection(FILE, albums);
  revalidatePath("/gallery");
  revalidatePath(`/gallery/${albums[idx].slug}`);
  revalidatePath(`/admin/gallery/${albumId}`);
}

export async function deletePhoto(formData: FormData) {
  await requireAdmin();
  const albumId = String(formData.get("albumId"));
  const photoId = String(formData.get("photoId"));

  const albums = await getCollection<GalleryAlbum>(FILE);
  const idx = albums.findIndex((a) => a.id === albumId);
  if (idx === -1) throw new Error("Not found");

  albums[idx].photos = albums[idx].photos.filter((p) => p.id !== photoId);

  await setCollection(FILE, albums);
  revalidatePath("/gallery");
  revalidatePath(`/gallery/${albums[idx].slug}`);
  revalidatePath(`/admin/gallery/${albumId}`);
}

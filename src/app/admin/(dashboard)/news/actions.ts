"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { getCollection, setCollection } from "@/lib/store";
import { uniqueSlug } from "@/lib/slug";
import type { NewsItem } from "@/lib/data";

const FILE = "news.json";

export async function createNews(formData: FormData) {
  await requireAdmin();
  const items = await getCollection<NewsItem>(FILE);

  const title = String(formData.get("title") || "");
  const slug = uniqueSlug(title, items.map((n) => n.slug));

  items.unshift({
    id: crypto.randomUUID(),
    slug,
    date: String(formData.get("date") || ""),
    title,
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    image: String(formData.get("image") || ""),
  });
  await setCollection(FILE, items);
  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function updateNews(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const items = await getCollection<NewsItem>(FILE);
  const idx = items.findIndex((n) => n.id === id);
  if (idx === -1) throw new Error("Not found");

  items[idx] = {
    ...items[idx],
    date: String(formData.get("date") || ""),
    title: String(formData.get("title") || ""),
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    image: String(formData.get("image") || ""),
  };
  await setCollection(FILE, items);
  revalidatePath("/news");
  revalidatePath(`/news/${items[idx].slug}`);
  revalidatePath("/");
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function deleteNews(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const items = await getCollection<NewsItem>(FILE);
  await setCollection(FILE, items.filter((n) => n.id !== id));
  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
}

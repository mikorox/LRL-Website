"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { getCollection, setCollection } from "@/lib/store";
import type { BrandDocument } from "@/lib/data";

const FILE = "brand-documents.json";

export async function addBrandDocument(formData: FormData) {
  await requireAdmin();
  const fileUrl = String(formData.get("fileUrl") || "");
  if (!fileUrl) throw new Error("A file is required");

  const documents = await getCollection<BrandDocument>(FILE);
  documents.unshift({
    id: crypto.randomUUID(),
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    fileUrl,
  });

  await setCollection(FILE, documents);
  revalidatePath("/brand");
  revalidatePath("/admin/brand");
}

export async function deleteBrandDocument(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const documents = await getCollection<BrandDocument>(FILE);
  await setCollection(FILE, documents.filter((d) => d.id !== id));
  revalidatePath("/brand");
  revalidatePath("/admin/brand");
}

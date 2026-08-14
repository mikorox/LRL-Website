"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { getCollection, setCollection, getDoc, setDoc } from "@/lib/store";
import { hashSecret } from "@/lib/auth";
import type { BrandDocument, SiteSettings } from "@/lib/data";

const FILE = "franchise-documents.json";

export async function addFranchiseDocument(formData: FormData) {
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
  revalidatePath("/franchise");
  revalidatePath("/admin/franchise");
}

export async function deleteFranchiseDocument(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const documents = await getCollection<BrandDocument>(FILE);
  await setCollection(FILE, documents.filter((d) => d.id !== id));
  revalidatePath("/franchise");
  revalidatePath("/admin/franchise");
}

export async function updateFranchisePassword(formData: FormData) {
  await requireAdmin();
  const password = String(formData.get("password") || "").trim();
  if (!password) return;

  const settings = await getDoc<SiteSettings>("settings.json");
  settings.franchisePasswordHash = await hashSecret(password);
  await setDoc("settings.json", settings);
  revalidatePath("/franchise");
  revalidatePath("/admin/franchise");
}

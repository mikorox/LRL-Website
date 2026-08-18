"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { execute, logDebug } from "@/lib/db";

export async function addBrandDocument(formData: FormData) {
  try {
    await requireAdmin();
    const fileUrl = String(formData.get("fileUrl") || "");
    if (!fileUrl) throw new Error("A file is required");

    await execute(
      `INSERT INTO brand_documents (id, title, description, file_url) VALUES (?, ?, ?, ?)`,
      [
        crypto.randomUUID(), String(formData.get("title") || ""),
        String(formData.get("description") || ""), fileUrl,
      ]
    );
    revalidatePath("/brand");
    revalidatePath("/admin/brand");
  } catch (err) {
    await logDebug("addBrandDocument", err, {
      title: String(formData.get("title") || ""),
      fileUrl: String(formData.get("fileUrl") || ""),
    });
    throw err;
  }
}

export async function deleteBrandDocument(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await execute("DELETE FROM brand_documents WHERE id = ?", [id]);
  revalidatePath("/brand");
  revalidatePath("/admin/brand");
}

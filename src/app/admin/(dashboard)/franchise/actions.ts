"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { execute } from "@/lib/db";
import { hashSecret } from "@/lib/auth";

export async function addFranchiseDocument(formData: FormData) {
  await requireAdmin();
  const fileUrl = String(formData.get("fileUrl") || "");
  if (!fileUrl) throw new Error("A file is required");

  await execute(
    `INSERT INTO franchise_documents (id, title, description, file_url) VALUES (?, ?, ?, ?)`,
    [
      crypto.randomUUID(), String(formData.get("title") || ""),
      String(formData.get("description") || ""), fileUrl,
    ]
  );
  revalidatePath("/franchise");
  revalidatePath("/admin/franchise");
}

export async function deleteFranchiseDocument(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await execute("DELETE FROM franchise_documents WHERE id = ?", [id]);
  revalidatePath("/franchise");
  revalidatePath("/admin/franchise");
}

export async function updateFranchisePassword(formData: FormData) {
  await requireAdmin();
  const password = String(formData.get("password") || "").trim();
  if (!password) return;

  const hash = await hashSecret(password);
  await execute("UPDATE settings SET franchise_password_hash = ? WHERE id = 1", [hash]);
  revalidatePath("/franchise");
  revalidatePath("/admin/franchise");
}

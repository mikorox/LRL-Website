"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { execute } from "@/lib/db";

export async function deleteRegistration(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await execute("DELETE FROM registrations WHERE id = ?", [id]);
  revalidatePath("/admin/registrations");
}

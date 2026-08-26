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

export async function updateRegistrationContact(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();

  await execute("UPDATE registrations SET email = ?, phone = ? WHERE id = ?", [
    email,
    phone,
    id,
  ]);
  revalidatePath("/admin/registrations");
  revalidatePath("/admin/registrations/missing-contact");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { execute } from "@/lib/db";

export async function updateMentor(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));

  await execute(
    `UPDATE mentors SET name=?, former_club=?, achievements=?, bio=?, photo_url=? WHERE id=?`,
    [
      String(formData.get("name") || ""), String(formData.get("formerClub") || ""),
      String(formData.get("achievements") || ""), String(formData.get("bio") || ""),
      String(formData.get("photoUrl") || ""), id,
    ]
  );
  revalidatePath("/mentors");
  revalidatePath("/admin/mentors");
  redirect("/admin/mentors");
}

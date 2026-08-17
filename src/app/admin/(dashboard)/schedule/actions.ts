"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { execute } from "@/lib/db";

export async function createFixture(formData: FormData) {
  await requireAdmin();
  await execute(
    `INSERT INTO schedule (id, date, time, fixture, boat_class) VALUES (?, ?, ?, ?, ?)`,
    [
      crypto.randomUUID(), String(formData.get("date") || ""), String(formData.get("time") || ""),
      String(formData.get("fixture") || ""), String(formData.get("boatClass") || ""),
    ]
  );
  revalidatePath("/schedule");
  revalidatePath("/");
  revalidatePath("/admin/schedule");
  redirect("/admin/schedule");
}

export async function updateFixture(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await execute(
    `UPDATE schedule SET date=?, time=?, fixture=?, boat_class=? WHERE id=?`,
    [
      String(formData.get("date") || ""), String(formData.get("time") || ""),
      String(formData.get("fixture") || ""), String(formData.get("boatClass") || ""), id,
    ]
  );
  revalidatePath("/schedule");
  revalidatePath("/");
  revalidatePath("/admin/schedule");
  redirect("/admin/schedule");
}

export async function deleteFixture(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await execute("DELETE FROM schedule WHERE id = ?", [id]);
  revalidatePath("/schedule");
  revalidatePath("/");
  revalidatePath("/admin/schedule");
}

"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";

export async function createRegistration(formData: FormData) {
  const name = String(formData.get("name") || "");
  if (!name) {
    throw new Error("Name is required");
  }

  await execute(
    `INSERT INTO registrations (id, submitted_at, name, age, gender, weight, side, discipline, role)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      crypto.randomUUID(),
      new Date().toISOString(),
      name,
      String(formData.get("age") || ""),
      String(formData.get("gender") || ""),
      String(formData.get("weight") || ""),
      String(formData.get("side") || ""),
      String(formData.get("discipline") || ""),
      String(formData.get("role") || ""),
    ]
  );
  revalidatePath("/admin/registrations");
}

"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";

export async function createRegistration(formData: FormData) {
  const name = String(formData.get("name") || "");
  if (!name) {
    throw new Error("Name is required");
  }
  const email = String(formData.get("email") || "");
  if (!email) {
    throw new Error("Email is required");
  }
  const phone = String(formData.get("phone") || "");
  if (!phone) {
    throw new Error("Phone number is required");
  }
  const roles = formData.getAll("role").map(String).filter(Boolean);
  if (roles.length === 0) {
    throw new Error("At least one role is required");
  }

  await execute(
    `INSERT INTO registrations
       (id, submitted_at, name, email, phone, age, gender, weight, side, discipline, role,
        profile_picture_url, nic_passport_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      crypto.randomUUID(),
      new Date().toISOString(),
      name,
      email,
      phone,
      String(formData.get("age") || ""),
      String(formData.get("gender") || ""),
      String(formData.get("weight") || ""),
      String(formData.get("side") || ""),
      String(formData.get("discipline") || ""),
      roles.join(", "),
      String(formData.get("profilePictureUrl") || ""),
      String(formData.get("nicPassportUrl") || ""),
    ]
  );
  revalidatePath("/admin/registrations");
}

"use server";

import { revalidatePath } from "next/cache";
import { getCollection, setCollection } from "@/lib/store";
import type { Registration } from "@/lib/data";

const FILE = "registrations.json";

export async function createRegistration(formData: FormData) {
  const registration: Registration = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    name: String(formData.get("name") || ""),
    age: String(formData.get("age") || ""),
    gender: String(formData.get("gender") || ""),
    weight: String(formData.get("weight") || ""),
    side: String(formData.get("side") || ""),
    discipline: String(formData.get("discipline") || ""),
    role: String(formData.get("role") || ""),
  };

  if (!registration.name) {
    throw new Error("Name is required");
  }

  const registrations = await getCollection<Registration>(FILE);
  registrations.unshift(registration);
  await setCollection(FILE, registrations);
  revalidatePath("/admin/registrations");
}

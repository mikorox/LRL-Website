"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { getCollection, setCollection } from "@/lib/store";
import type { Registration } from "@/lib/data";

const FILE = "registrations.json";

export async function deleteRegistration(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const items = await getCollection<Registration>(FILE);
  await setCollection(FILE, items.filter((r) => r.id !== id));
  revalidatePath("/admin/registrations");
}

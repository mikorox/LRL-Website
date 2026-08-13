"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { getCollection, setCollection } from "@/lib/store";
import type { ScheduleRow } from "@/lib/data";

const FILE = "schedule.json";

function fromForm(formData: FormData, id: string): ScheduleRow {
  return {
    id,
    date: String(formData.get("date") || ""),
    time: String(formData.get("time") || ""),
    fixture: String(formData.get("fixture") || ""),
    boatClass: String(formData.get("boatClass") || ""),
  };
}

export async function createFixture(formData: FormData) {
  await requireAdmin();
  const items = await getCollection<ScheduleRow>(FILE);
  items.push(fromForm(formData, crypto.randomUUID()));
  await setCollection(FILE, items);
  revalidatePath("/schedule");
  revalidatePath("/");
  revalidatePath("/admin/schedule");
  redirect("/admin/schedule");
}

export async function updateFixture(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const items = await getCollection<ScheduleRow>(FILE);
  const idx = items.findIndex((f) => f.id === id);
  if (idx === -1) throw new Error("Not found");
  items[idx] = fromForm(formData, id);
  await setCollection(FILE, items);
  revalidatePath("/schedule");
  revalidatePath("/");
  revalidatePath("/admin/schedule");
  redirect("/admin/schedule");
}

export async function deleteFixture(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const items = await getCollection<ScheduleRow>(FILE);
  await setCollection(FILE, items.filter((f) => f.id !== id));
  revalidatePath("/schedule");
  revalidatePath("/");
  revalidatePath("/admin/schedule");
}

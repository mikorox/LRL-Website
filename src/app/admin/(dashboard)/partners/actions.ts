"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { getDoc, setDoc } from "@/lib/store";
import type { PartnersDoc } from "@/lib/data";

const FILE = "partners.json";
const TIERS = ["title", "poweredBy", "broadcast", "associate"] as const;
type Tier = (typeof TIERS)[number];

function isTier(value: string): value is Tier {
  return (TIERS as readonly string[]).includes(value);
}

export async function addPartner(formData: FormData) {
  await requireAdmin();
  const tier = String(formData.get("tier"));
  if (!isTier(tier)) throw new Error("Invalid tier");

  const doc = await getDoc<PartnersDoc>(FILE);

  doc[tier].push({
    id: crypto.randomUUID(),
    name: String(formData.get("name") || ""),
    logoUrl: String(formData.get("logoUrl") || ""),
    url: String(formData.get("url") || ""),
  });

  await setDoc(FILE, doc);
  revalidatePath("/partners");
  revalidatePath("/");
  revalidatePath("/admin/partners");
}

export async function deletePartner(formData: FormData) {
  await requireAdmin();
  const tier = String(formData.get("tier"));
  const id = String(formData.get("id"));
  if (!isTier(tier)) throw new Error("Invalid tier");

  const doc = await getDoc<PartnersDoc>(FILE);
  doc[tier] = doc[tier].filter((p) => p.id !== id);

  await setDoc(FILE, doc);
  revalidatePath("/partners");
  revalidatePath("/");
  revalidatePath("/admin/partners");
}

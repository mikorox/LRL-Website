"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { execute } from "@/lib/db";

const TIERS = ["title", "poweredBy", "broadcast", "associate"] as const;
type Tier = (typeof TIERS)[number];

function isTier(value: string): value is Tier {
  return (TIERS as readonly string[]).includes(value);
}

export async function addPartner(formData: FormData) {
  await requireAdmin();
  const tier = String(formData.get("tier"));
  if (!isTier(tier)) throw new Error("Invalid tier");

  await execute(
    `INSERT INTO partners (id, tier, name, logo_url, url) VALUES (?, ?, ?, ?, ?)`,
    [
      crypto.randomUUID(), tier, String(formData.get("name") || ""),
      String(formData.get("logoUrl") || ""), String(formData.get("url") || ""),
    ]
  );
  revalidatePath("/partners");
  revalidatePath("/");
  revalidatePath("/admin/partners");
}

export async function deletePartner(formData: FormData) {
  await requireAdmin();
  const tier = String(formData.get("tier"));
  const id = String(formData.get("id"));
  if (!isTier(tier)) throw new Error("Invalid tier");

  await execute("DELETE FROM partners WHERE id = ? AND tier = ?", [id, tier]);
  revalidatePath("/partners");
  revalidatePath("/");
  revalidatePath("/admin/partners");
}

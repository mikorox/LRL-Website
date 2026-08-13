import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function requireAdmin(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);
  if (!valid) {
    throw new Error("Not authenticated");
  }
}

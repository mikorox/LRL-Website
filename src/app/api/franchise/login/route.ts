import { NextRequest, NextResponse } from "next/server";
import {
  FRANCHISE_COOKIE,
  createFranchiseSessionToken,
  hashSecret,
} from "@/lib/auth";
import { getSettings } from "@/lib/data";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const password = String(formData.get("password") || "");
  const settings = await getSettings();

  const candidateHash = password ? await hashSecret(password) : "";
  if (
    !settings.franchisePasswordHash ||
    candidateHash !== settings.franchisePasswordHash
  ) {
    const url = new URL("/franchise", req.url);
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url, { status: 303 });
  }

  const token = await createFranchiseSessionToken(settings.franchisePasswordHash);
  const url = new URL("/franchise", req.url);
  const res = NextResponse.redirect(url, { status: 303 });
  res.cookies.set(FRANCHISE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

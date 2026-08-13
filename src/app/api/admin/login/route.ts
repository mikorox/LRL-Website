import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("error", "1");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url, { status: 303 });
  }

  const token = await createSessionToken();
  const url = new URL(next, req.url);
  const res = NextResponse.redirect(url, { status: 303 });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}

import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { getRequestOrigin } from "@/lib/request-origin";

export async function POST(req: NextRequest) {
  const url = new URL("/admin/login", getRequestOrigin(req));
  const res = NextResponse.redirect(url, { status: 303 });
  res.cookies.delete(SESSION_COOKIE);
  return res;
}

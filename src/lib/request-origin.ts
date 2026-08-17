import type { NextRequest } from "next/server";

// Behind a reverse proxy, req.url / req.nextUrl can resolve to the
// internal bind address (e.g. 0.0.0.0:PORT) instead of the public
// domain if the proxy doesn't preserve the original Host header.
// Standard forwarding headers carry the real origin, so prefer those.
export function getRequestOrigin(req: NextRequest): string {
  const forwardedHost = req.headers.get("x-forwarded-host");
  const forwardedProto = req.headers.get("x-forwarded-proto");
  const host = forwardedHost || req.headers.get("host") || req.nextUrl.host;
  const proto = forwardedProto || req.nextUrl.protocol.replace(":", "");
  return `${proto}://${host}`;
}

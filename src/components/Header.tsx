"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import type { SiteSettings } from "@/lib/data";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/the-league", label: "League" },
  { href: "/teams", label: "Teams" },
  { href: "/schedule", label: "Schedule" },
  { href: "/gallery", label: "Gallery" },
  { href: "/partners", label: "Partners" },
];

export default function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const activeHref =
    NAV_LINKS.find((l) =>
      l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)
    )?.href ?? null;
  const targetHref = hoveredHref ?? activeHref;

  useEffect(() => {
    function measure() {
      const el = targetHref ? linkRefs.current.get(targetHref) : null;
      setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [targetHref]);

  const SOCIALS = [
    { href: settings.socials.instagram, label: "Instagram" },
    { href: settings.socials.facebook, label: "Facebook" },
    { href: settings.socials.youtube, label: "YouTube" },
    { href: settings.socials.tiktok, label: "TikTok" },
  ].filter((s) => s.href);

  return (
    <header className="sticky top-0 z-50 bg-navy-950/95 backdrop-blur border-b border-navy-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Lanka Rowing League"
              width={52}
              height={52}
              className="h-12 w-12 object-contain"
              priority
            />
            <span className="font-accent leading-none tracking-wide hidden sm:block">
              {(() => {
                const words = settings.siteName.toUpperCase().split(" ");
                return (
                  <>
                    <span className="block text-sm text-white">{words[0]}</span>
                    <span className="block text-sm text-white">
                      {words.slice(1).join(" ")}
                    </span>
                  </>
                );
              })()}
            </span>
          </Link>

          <nav
            className="relative hidden lg:flex items-center gap-7 pb-1"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    if (el) linkRefs.current.set(link.href, el);
                  }}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  className={`text-xs font-semibold tracking-widest uppercase transition-colors ${
                    active ? "text-gold-light" : "text-white/85 hover:text-gold-light"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div
              className="absolute bottom-0 h-0.5 bg-gold-light transition-all duration-300 ease-out"
              style={{
                left: indicator?.left ?? 0,
                width: indicator?.width ?? 0,
                opacity: indicator ? 1 : 0,
              }}
            />
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-3 text-white/80">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="hover:text-gold-light transition-colors"
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>
            <Link
              href="/register"
              className="ml-2 inline-flex items-center rounded-sm bg-gold-light px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
            >
              Register
            </Link>
          </div>

          <button
            className="lg:hidden inline-flex items-center justify-center rounded-sm border border-navy-line p-2 text-white"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-navy-line bg-navy-950">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-sm font-semibold uppercase tracking-widest text-white/90 hover:text-gold-light border-b border-navy-line/60 last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-sm bg-gold-light px-4 py-3 text-xs font-bold uppercase tracking-widest text-navy-950"
            >
              Register
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function SocialIcon({ label }: { label: string }) {
  const size = 18;
  switch (label) {
    case "Instagram":
      return <FaInstagram size={size} />;
    case "Facebook":
      return <FaFacebook size={size} />;
    case "YouTube":
      return <FaYoutube size={size} />;
    case "TikTok":
      return <FaTiktok size={size} />;
    default:
      return null;
  }
}

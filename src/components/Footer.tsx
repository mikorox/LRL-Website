import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/data";

const NAV_LINKS = [
  { href: "/the-league", label: "The League" },
  { href: "/teams", label: "Teams" },
  { href: "/schedule", label: "Schedule" },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/partners", label: "Partners" },
];

const RESOURCE_LINKS = [
  { href: "/technical-committee", label: "Technical Committee" },
  { href: "/register", label: "Athlete Registration" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({ settings }: { settings: SiteSettings }) {
  const weekendLabel = new Date(settings.championshipDate).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <footer className="border-t border-navy-line bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Image
              src="/images/logo.png"
              alt={settings.siteName}
              width={160}
              height={160}
              className="h-36 w-36 object-contain"
            />
            <p className="mt-4 text-sm text-white/60 max-w-xs">
              {settings.heroSubtitle}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-light mb-4">
              League
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-light mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-light mb-4">
              Championship Weekend
            </h4>
            <p className="text-sm text-white/70">{weekendLabel}</p>
            <p className="text-sm text-white/70">{settings.venue}</p>
            <p className="text-sm text-white/70 mt-3">{settings.contactEmail}</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-navy-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {settings.siteName}. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/50">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

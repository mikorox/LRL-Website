import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/schedule", label: "Schedule" },
  { href: "/admin/teams", label: "Teams" },
  { href: "/admin/registrations", label: "Registrations" },
  { href: "/admin/committee", label: "Technical Committee" },
  { href: "/admin/mentors", label: "Mentors" },
  { href: "/admin/partners", label: "Partners" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/settings", label: "Site Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-navy-950">
      <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-navy-line bg-navy-900 flex flex-col">
        <div className="flex items-center justify-between gap-3 px-5 py-4 lg:py-5 lg:border-b border-navy-line">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Lanka Rowing League"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <span className="font-accent text-sm leading-tight">
              LRL
              <br />
              ADMIN
            </span>
          </div>
          <Link
            href="/"
            target="_blank"
            className="lg:hidden text-xs text-white/50 hover:text-white transition-colors"
          >
            View Site &rarr;
          </Link>
        </div>
        <nav className="flex lg:flex-1 lg:flex-col overflow-x-auto lg:overflow-visible py-2 lg:py-4 border-t lg:border-t-0 border-navy-line">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 lg:shrink block px-4 lg:px-5 py-2.5 text-sm whitespace-nowrap text-white/75 hover:text-white hover:bg-navy-800 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block p-5 border-t border-navy-line space-y-3">
          <Link
            href="/"
            target="_blank"
            className="block text-xs text-white/50 hover:text-white transition-colors"
          >
            View Site &rarr;
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold transition-colors text-left"
            >
              Log Out
            </button>
          </form>
        </div>
        <div className="lg:hidden px-5 py-3 border-t border-navy-line">
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold transition-colors"
            >
              Log Out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-4 sm:p-8 lg:max-w-5xl overflow-x-hidden">{children}</main>
    </div>
  );
}

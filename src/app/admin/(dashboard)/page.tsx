import Link from "next/link";
import {
  getCommittee,
  getGalleryAlbums,
  getMentors,
  getNews,
  getPartners,
  getRegistrations,
  getSchedule,
  getTeams,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [teams, news, schedule, committee, mentors, albums, partners, registrations] =
    await Promise.all([
      getTeams(),
      getNews(),
      getSchedule(),
      getCommittee(),
      getMentors(),
      getGalleryAlbums(),
      getPartners(),
      getRegistrations(),
    ]);

  const partnerCount =
    partners.title.length +
    partners.poweredBy.length +
    partners.broadcast.length +
    partners.associate.length;

  const cards = [
    { label: "Teams", count: teams.length, href: "/admin/teams" },
    { label: "Player Registrations", count: registrations.length, href: "/admin/registrations" },
    { label: "News Articles", count: news.length, href: "/admin/news" },
    { label: "Schedule Fixtures", count: schedule.length, href: "/admin/schedule" },
    { label: "Committee Members", count: committee.length, href: "/admin/committee" },
    { label: "Mentors", count: mentors.length, href: "/admin/mentors" },
    { label: "Gallery Albums", count: albums.length, href: "/admin/gallery" },
    { label: "Partners", count: partnerCount, href: "/admin/partners" },
  ];

  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-1">Dashboard</h1>
      <p className="text-sm text-white/60 mb-8">
        Manage every part of the Lanka Rowing League site.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-sm border border-navy-line bg-navy-900 p-5 hover:border-gold-light transition-colors"
          >
            <p className="font-accent text-3xl text-gold-light">{c.count}</p>
            <p className="text-sm text-white/70 mt-1">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

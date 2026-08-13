import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getNews } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const news = await getNews();
  return (
    <>
      <PageHero eyebrow="News" title="Latest from the League" />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {news.length === 0 && (
            <p className="text-white/60 text-sm">No news yet. Check back soon.</p>
          )}
          {news.map((n) => (
            <Link
              key={n.id}
              href={`/news/${n.slug}`}
              className="group flex flex-col sm:flex-row gap-6 border-b border-navy-line pb-8 last:border-0"
            >
              {n.image ? (
                <Image
                  src={n.image}
                  alt={n.title}
                  width={220}
                  height={140}
                  className="w-full sm:w-56 h-40 sm:h-36 rounded-sm object-cover shrink-0"
                />
              ) : (
                <div className="w-full sm:w-56 h-40 sm:h-36 rounded-sm bg-navy-900 border border-navy-line shrink-0" />
              )}
              <div>
                <p className="text-xs uppercase tracking-widest text-gold-light">{n.date}</p>
                <h2 className="mt-2 font-accent text-2xl group-hover:text-gold-light transition-colors">
                  {n.title}
                </h2>
                <p className="mt-2 text-white/70 leading-relaxed">{n.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

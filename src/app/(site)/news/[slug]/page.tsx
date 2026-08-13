import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews, getNewsBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, allNews] = await Promise.all([
    getNewsBySlug(slug),
    getNews(),
  ]);
  if (!article) notFound();

  const paragraphs = article.content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const moreNews = allNews.filter((n) => n.id !== article.id).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-navy-line">
        <div className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[620px]">
          {article.image ? (
            <>
              <Image
                src={article.image}
                alt=""
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/20" />
            </>
          ) : (
            <div className="absolute inset-0 bg-navy-900 bg-oar-fan" />
          )}
          <div className="absolute inset-0 flex flex-col justify-between mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold transition-colors"
            >
              <span aria-hidden>&larr;</span> Back to News
            </Link>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-light mb-3">
                {article.date}
              </p>
              <h1 className="font-accent text-4xl sm:text-5xl leading-[0.98]">
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        {paragraphs.length > 0 ? (
          <div className="space-y-5 text-white/80 text-base sm:text-lg leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : (
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            {article.excerpt}
          </p>
        )}
      </section>

      {moreNews.length > 0 && (
        <section className="border-t border-navy-line">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="font-accent text-2xl text-gold-light mb-6">
              More News
            </h2>
            <ul className="space-y-5">
              {moreNews.map((n) => (
                <li key={n.id} className="border-b border-navy-line pb-5 last:border-0">
                  <Link href={`/news/${n.slug}`} className="flex items-center gap-4 group">
                    {n.image ? (
                      <Image
                        src={n.image}
                        alt={n.title}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-sm object-cover shrink-0"
                      />
                    ) : (
                      <div className="h-14 w-14 rounded-sm bg-navy-900 border border-navy-line shrink-0" />
                    )}
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-white/50">
                        {n.date}
                      </p>
                      <p className="mt-1 font-semibold text-white leading-snug group-hover:text-gold-light transition-colors">
                        {n.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

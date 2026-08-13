import Image from "next/image";
import Link from "next/link";
import { getNews } from "@/lib/data";
import { deleteNews } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const news = await getNews();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-accent text-3xl text-white">News</h1>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center rounded-sm bg-gold-light px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
        >
          Add Article
        </Link>
      </div>

      <div className="space-y-3">
        {news.length === 0 && <p className="text-white/50 text-sm">No articles yet.</p>}
        {news.map((n) => (
          <div
            key={n.id}
            className="flex items-center justify-between gap-4 rounded-sm border border-navy-line bg-navy-900 p-4"
          >
            <div className="flex items-center gap-4 min-w-0">
              {n.image ? (
                <Image
                  src={n.image}
                  alt={n.title}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-sm object-cover shrink-0"
                />
              ) : (
                <div className="h-14 w-14 rounded-sm bg-navy-800 border border-navy-line shrink-0" />
              )}
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">{n.date}</p>
                <p className="font-semibold text-white">{n.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/admin/news/${n.id}`}
                className="text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold"
              >
                Edit
              </Link>
              <form action={deleteNews}>
                <input type="hidden" name="id" value={n.id} />
                <button
                  type="submit"
                  className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

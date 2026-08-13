import Link from "next/link";
import { getSchedule } from "@/lib/data";
import { deleteFixture } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSchedulePage() {
  const schedule = await getSchedule();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-accent text-3xl text-white">Schedule</h1>
        <Link
          href="/admin/schedule/new"
          className="inline-flex items-center rounded-sm bg-gold-light px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
        >
          Add Fixture
        </Link>
      </div>

      <div className="space-y-3">
        {schedule.length === 0 && <p className="text-white/50 text-sm">No fixtures yet.</p>}
        {schedule.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between gap-4 rounded-sm border border-navy-line bg-navy-900 p-4"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50">
                {row.date} &middot; {row.time} &middot; {row.boatClass}
              </p>
              <p className="font-semibold text-white">{row.fixture}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/admin/schedule/${row.id}`}
                className="text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold"
              >
                Edit
              </Link>
              <form action={deleteFixture}>
                <input type="hidden" name="id" value={row.id} />
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

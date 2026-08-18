import { getRegistrations } from "@/lib/data";
import { deleteRegistration } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage() {
  const registrations = await getRegistrations();

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-accent text-3xl text-white">
          Player Registrations
          <span className="ml-3 align-middle inline-flex items-center rounded-full bg-gold-light px-3 py-1 text-sm font-bold text-navy-950">
            {registrations.length}
          </span>
        </h1>
        {registrations.length > 0 && (
          <a
            href="/api/admin/registrations/export"
            className="inline-flex items-center rounded-sm bg-gold-light px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
          >
            Export CSV
          </a>
        )}
      </div>
      <p className="text-sm text-white/60 mb-6">
        Submissions from the public athlete registration form.
      </p>

      {registrations.length === 0 ? (
        <p className="text-white/50 text-sm">No registrations yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-navy-line text-xs uppercase tracking-widest text-gold-light">
                <th className="py-3 pr-4">Submitted</th>
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Age</th>
                <th className="py-3 pr-4">Gender</th>
                <th className="py-3 pr-4">Weight</th>
                <th className="py-3 pr-4">Side</th>
                <th className="py-3 pr-4">Discipline</th>
                <th className="py-3 pr-4">Role</th>
                <th className="py-3 pr-4">Photo</th>
                <th className="py-3 pr-4">NIC / Passport</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} className="border-b border-navy-line/60">
                  <td className="py-3 pr-4 whitespace-nowrap text-white/60 text-xs">
                    {new Date(r.submittedAt).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 pr-4 font-semibold text-white whitespace-nowrap">{r.name}</td>
                  <td className="py-3 pr-4 text-white/80">{r.age}</td>
                  <td className="py-3 pr-4 text-white/80">{r.gender}</td>
                  <td className="py-3 pr-4 text-white/80">{r.weight}</td>
                  <td className="py-3 pr-4 text-white/80 whitespace-nowrap">{r.side}</td>
                  <td className="py-3 pr-4 text-white/80">{r.discipline}</td>
                  <td className="py-3 pr-4 text-white/80">{r.role}</td>
                  <td className="py-3 pr-4">
                    {r.profilePictureUrl ? (
                      <a href={r.profilePictureUrl} target="_blank" rel="noopener noreferrer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={r.profilePictureUrl}
                          alt=""
                          className="h-10 w-10 rounded-sm object-cover border border-navy-line"
                        />
                      </a>
                    ) : (
                      <span className="text-white/30 text-xs">&mdash;</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    {r.nicPassportUrl ? (
                      <a
                        href={r.nicPassportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-white/30 text-xs">&mdash;</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <form action={deleteRegistration}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        type="submit"
                        className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

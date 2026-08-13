import Image from "next/image";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Lanka Rowing League"
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
          />
          <h1 className="font-accent text-2xl text-white mt-4">Admin Login</h1>
          <p className="text-sm text-white/50 mt-1">Lanka Rowing League</p>
        </div>

        <form action="/api/admin/login" method="POST" className="space-y-4 rounded-sm border border-navy-line bg-navy-900 p-6">
          <input type="hidden" name="next" value={next || "/admin"} />
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              autoFocus
              required
              className="w-full rounded-sm border border-navy-line bg-navy-950 px-4 py-3 text-sm text-white focus:border-gold-light focus:outline-none"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400">Incorrect password. Try again.</p>
          )}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-sm bg-gold-light px-6 py-3 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

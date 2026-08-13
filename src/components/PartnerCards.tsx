import Image from "next/image";

type PartnerEntry = { id: string; name: string; logoUrl: string };

export function PartnerTierCard({
  label,
  entries,
}: {
  label: string;
  entries: PartnerEntry[];
}) {
  if (entries.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-sm border border-dashed border-white/15 text-[11px] uppercase tracking-widest text-white/40">
        {label}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {entries.map((e) => (
        <div
          key={e.id}
          className="flex flex-col items-center justify-center gap-3 rounded-sm border border-white/10 px-6 py-6 sm:px-8 w-full sm:w-auto sm:min-w-[200px]"
        >
          <div className="flex h-24 items-center justify-center">
            {e.logoUrl ? (
              <Image
                src={e.logoUrl}
                alt={e.name}
                width={160}
                height={96}
                className="max-h-24 w-auto object-contain"
              />
            ) : null}
          </div>
          <span className="text-sm font-light text-white/50 text-center">{e.name}</span>
        </div>
      ))}
    </div>
  );
}

export function PartnerLogo({ entry }: { entry: PartnerEntry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-sm border border-white/10 px-4 py-4">
      <div className="flex h-14 items-center justify-center">
        {entry.logoUrl ? (
          <Image
            src={entry.logoUrl}
            alt={entry.name}
            width={120}
            height={60}
            className="max-h-14 w-auto object-contain"
          />
        ) : null}
      </div>
      <span className="text-xs font-light text-white/50 text-center">{entry.name}</span>
    </div>
  );
}

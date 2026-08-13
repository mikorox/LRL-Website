"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs };
}

export default function Countdown({ target }: { target: string }) {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(
    null
  );

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: { label: string; value: number }[] = [
    { label: "Days", value: time?.days ?? 0 },
    { label: "Hrs", value: time?.hours ?? 0 },
    { label: "Mins", value: time?.mins ?? 0 },
    { label: "Secs", value: time?.secs ?? 0 },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex flex-col items-center justify-center rounded-sm bg-navy-950/80 border border-navy-line py-3"
        >
          <span
            key={time ? u.value : "pending"}
            className="font-accent text-2xl text-white tabular-nums animate-countdown-tick"
          >
            {time ? String(u.value).padStart(2, "0") : "--"}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-gold-light mt-1">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}

import Image from "next/image";
import type { Team } from "@/lib/data";

export default function TeamCrest({
  team,
  size = 96,
}: {
  team: Team;
  size?: number;
}) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      <Image
        src={team.logo}
        alt={`${team.name} logo`}
        fill
        sizes={`${size}px`}
        className="object-contain"
      />
    </div>
  );
}

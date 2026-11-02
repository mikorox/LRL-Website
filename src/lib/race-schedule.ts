// Official race schedule. Team names use the site's spelling
// (the printed schedule says "Sigiriya Lions"; the franchise is "Sigiri Lions").

export type Race = {
  no: number;
  time: string;
  boat: string; // e.g. "W 1x"
  home: string;
  away: string;
};

export type Session = {
  title: string;
  stage: string;
  races: Race[];
};

export type RaceDay = {
  day: number;
  date: string;
  sessions: Session[];
};

const r = (no: number, time: string, boat: string, home: string, away: string): Race => ({
  no, time, boat, home, away,
});

const KK = "Kandy Kings";
const GG = "Galle Galleons";
const MM = "Mirissa Mavericks";
const SL = "Sigiri Lions";
const TT = "Trinco Titans";
const CC = "Colombo Capitals";

export const DAY_ONE: RaceDay = {
  day: 1,
  date: "19 December 2026",
  sessions: [
    {
      title: "Session 1",
      stage: "Group Stages",
      races: [
        r(1, "12:00 PM", "W 1x", KK, GG),
        r(2, "12:05 PM", "W 2x", SL, TT),
        r(3, "12:20 PM", "M 2-", KK, GG),
        r(4, "12:25 PM", "M 4+", SL, TT),
        r(5, "12:45 PM", "W 2x", KK, GG),
        r(6, "12:50 PM", "W 1x", SL, TT),
        r(7, "1:10 PM", "M 1x", KK, GG),
        r(8, "1:15 PM", "M 2-", SL, TT),
        r(9, "1:30 PM", "M 4+", KK, GG),
        r(10, "1:35 PM", "M 1x", SL, TT),
        r(11, "2:00 PM", "W 1x", KK, MM),
        r(12, "2:05 PM", "W 2x", SL, CC),
        r(13, "2:20 PM", "M 2-", KK, MM),
        r(14, "2:25 PM", "M 4+", SL, CC),
        r(15, "2:45 PM", "W 2x", KK, MM),
        r(16, "2:50 PM", "W 1x", SL, CC),
        r(17, "3:10 PM", "M 1x", KK, MM),
        r(18, "3:15 PM", "M 2-", SL, CC),
        r(19, "3:30 PM", "M 4+", KK, MM),
      ],
    },
    {
      title: "Session 2",
      stage: "Group Stages",
      races: [
        r(20, "3:35 PM", "M 1x", SL, CC),
        r(21, "4:00 PM", "W 1x", GG, MM),
        r(22, "4:05 PM", "W 2x", TT, CC),
        r(23, "4:20 PM", "M 2-", GG, MM),
        r(24, "4:25 PM", "M 4-", TT, CC),
        r(25, "4:45 PM", "W 2x", GG, MM),
        r(26, "4:50 PM", "W 1x", TT, CC),
        r(27, "5:10 PM", "M 1x", GG, MM),
        r(28, "5:15 PM", "M 2-", TT, CC),
        r(29, "5:30 PM", "M 4+", GG, MM),
        r(30, "5:35 PM", "M 1x", TT, CC),
      ],
    },
  ],
};

const BOAT_NAMES: Record<string, string> = {
  "1x": "Single Scull",
  "2x": "Double Scull",
  "2-": "Pair",
  "4+": "Coxed Four",
  "4-": "Coxless Four",
};

export function boatLabel(boat: string): { gender: "M" | "W"; code: string; name: string } {
  const [g, code] = boat.split(" ");
  const gender = g === "W" ? "W" : "M";
  return {
    gender,
    code,
    name: `${gender === "W" ? "Women's" : "Men's"} ${BOAT_NAMES[code] ?? code}`,
  };
}

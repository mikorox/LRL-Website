import "server-only";

const BASE = process.env.LEAGUEHUB_API_URL || "https://leaguehub-api-production.up.railway.app";
const LEAGUE_ID = "d24bf327-cd57-4382-84ff-69bbfa033298"; // Lanka Rowing League
const REVALIDATE_SECONDS = 300;

export type SquadPlayer = { name: string; imageUrl: string };

type ApiList<T> = { data: T[] };
type ApiSeason = { id: string; name: string };
type ApiTeam = { id: string; name: string };
type ApiPlayer = { full_name: string; image_url: string | null };

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${process.env.LEAGUEHUB_TOKEN}` },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`LeagueHub ${path} responded ${res.status}`);
  return res.json() as Promise<T>;
}

const norm = (s: string) => s.trim().toLowerCase();

/**
 * Squad for a team from the LeagueHub API (latest season of the LRL),
 * matched by team name. Returns null when the API is unavailable or has
 * no such team, so callers can fall back to the squad stored in the DB.
 */
export async function getLeagueHubSquad(teamName: string): Promise<SquadPlayer[] | null> {
  if (!process.env.LEAGUEHUB_TOKEN) return null;
  try {
    const seasons = (await get<ApiList<ApiSeason>>(`/v1/leagues/${LEAGUE_ID}/seasons?limit=100`)).data;
    // Season names are years ("2026"); the highest is the current one.
    const season = [...seasons].sort((a, b) => b.name.localeCompare(a.name))[0];
    if (!season) return null;

    const teams = (await get<ApiList<ApiTeam>>(`/v1/seasons/${season.id}/teams?limit=100`)).data;
    const team = teams.find((t) => norm(t.name) === norm(teamName));
    if (!team) return null;

    const players = (await get<ApiList<ApiPlayer>>(`/v1/teams/${team.id}/players?limit=100`)).data;
    return players
      .map((p) => ({ name: p.full_name, imageUrl: p.image_url || "" }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.error("LeagueHub squad fetch failed", err);
    return null;
  }
}

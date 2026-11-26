import type { RobloxDataMap } from "./types";

export type RobloxGameStats = {
  placeId: string;
  universeId: string;
  name: string;
  playing: number;
  visits: number;
  favoritedCount: number;
};

/**
 * Extracts the numeric Place ID from a Roblox game URL.
 */
export function parseRobloxPlaceId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("roblox.com")) return null;
    const match = parsed.pathname.match(/\/games\/(\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * Formats large counts compactly (e.g. 16535 -> "16.5K").
 */
export function formatCompactCount(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return value.toLocaleString();
}

/**
 * Fetches live player count and visits for a Roblox experience via CORS-enabled RoProxy.
 */
export async function fetchRobloxGameStats(
  gameUrl: string,
  knownUniverseId?: string
): Promise<RobloxGameStats | null> {
  const placeId = parseRobloxPlaceId(gameUrl);
  if (!placeId) return null;

  try {
    let universeId = knownUniverseId;
    if (!universeId) {
      const uniRes = await fetch(
        `https://apis.roproxy.com/universes/v1/places/${placeId}/universe`
      );
      if (!uniRes.ok) return null;
      const uniData = await uniRes.json();
      universeId = uniData?.universeId ? String(uniData.universeId) : undefined;
    }
    if (!universeId) return null;

    const gameRes = await fetch(
      `https://games.roproxy.com/v1/games?universeIds=${universeId}`
    );
    if (!gameRes.ok) return null;
    const gameData = await gameRes.json();
    const item = gameData?.data?.[0];
    if (!item) return null;

    return {
      placeId,
      universeId,
      name: item.name || "",
      playing: typeof item.playing === "number" ? item.playing : 0,
      visits: typeof item.visits === "number" ? item.visits : 0,
      favoritedCount:
        typeof item.favoritedCount === "number" ? item.favoritedCount : 0,
    };
  } catch {
    return null;
  }
}

/**
 * Fetches the latest polled weekly & all-time peaks from data/roblox.json on GitHub.
 */
export async function fetchRobloxPeaks(
  repoSlug = "ejrad/resume"
): Promise<RobloxDataMap | null> {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${repoSlug}/main/data/roblox.json`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return (await res.json()) as RobloxDataMap;
  } catch {
    return null;
  }
}

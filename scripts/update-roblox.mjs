#!/usr/bin/env node
/**
 * Poll live Roblox player counts for any Roblox games in config/profile.json
 * and update weekly (7-day rolling) + all-time peaks in data/roblox.json.
 *
 *   npm run update:roblox
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROFILE_PATH = path.join(ROOT, "config/profile.json");
const CACHE_PATH = path.join(ROOT, "data/roblox.json");
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function loadJson(p, fallback = {}) {
  if (!existsSync(p)) return fallback;
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
}

function saveJson(p, data) {
  mkdirSync(path.dirname(p), { recursive: true });
  writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

function parsePlaceId(url) {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("roblox.com")) return null;
    const match = u.pathname.match(/\/games\/(\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

async function resolveUniverseId(placeId) {
  const res = await fetch(
    `https://apis.roblox.com/universes/v1/places/${placeId}/universe`
  );
  if (!res.ok) throw new Error(`Universe lookup failed (${res.status})`);
  const data = await res.json();
  return data?.universeId ? String(data.universeId) : null;
}

async function fetchGameStats(universeId) {
  const res = await fetch(
    `https://games.roblox.com/v1/games?universeIds=${universeId}`
  );
  if (!res.ok) throw new Error(`Game stats lookup failed (${res.status})`);
  const data = await res.json();
  return data?.data?.[0] || null;
}

async function main() {
  const profile = loadJson(PROFILE_PATH, {});
  const robloxData = loadJson(CACHE_PATH, {});
  const projects = Array.isArray(profile.projects) ? profile.projects : [];

  const now = new Date();
  const nowIso = now.toISOString();
  const cutoffMs = now.getTime() - SEVEN_DAYS_MS;

  let updated = 0;

  for (const project of projects) {
    const placeId = parsePlaceId(project.url);
    if (!placeId) continue;

    const universeId =
      project.robloxUniverseId || (await resolveUniverseId(placeId));
    if (!universeId) {
      console.warn(`[roblox] Could not resolve universeId for ${project.name}`);
      continue;
    }

    const stats = await fetchGameStats(universeId);
    if (!stats) {
      console.warn(`[roblox] No stats returned for universe ${universeId}`);
      continue;
    }

    const playing = typeof stats.playing === "number" ? stats.playing : 0;
    const visits = typeof stats.visits === "number" ? stats.visits : 0;

    const prev = robloxData[universeId] || {};
    const prevSamples = Array.isArray(prev.samples) ? prev.samples : [];
    const prunedSamples = prevSamples
      .filter((s) => s && typeof s.t === "string" && Date.parse(s.t) >= cutoffMs)
      .concat({ t: nowIso, p: playing });

    const weeklyPeak = prunedSamples.reduce(
      (max, s) => (typeof s.p === "number" && s.p > max ? s.p : max),
      0
    );
    const prevAllTime =
      typeof prev.allTimePeak === "number" ? prev.allTimePeak : 0;
    const allTimePeak = Math.max(prevAllTime, playing);
    const allTimePeakAt =
      playing >= prevAllTime || !prev.allTimePeakAt ? nowIso : prev.allTimePeakAt;

    robloxData[universeId] = {
      placeId,
      name: stats.name || project.name,
      allTimePeak,
      allTimePeakAt,
      weeklyPeak,
      lastPlaying: playing,
      lastVisits: visits,
      lastUpdated: nowIso,
      samples: prunedSamples,
    };

    updated += 1;
    console.log(
      `[roblox] ${stats.name}: ${playing} playing, 7d peak ${weeklyPeak}, all-time peak ${allTimePeak}`
    );
  }

  if (updated > 0) {
    saveJson(CACHE_PATH, robloxData);
  }
}

main().catch((err) => {
  console.error("[roblox] Update failed:", err);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * Refresh TryHackMe stats into data/thm.json and sync room art to public/rooms.
 *
 *   npm run update
 *   npm run update:demo
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  fetchBadgeStats,
  fetchCompletedRooms,
  isConfigured,
  materializeRoomImages,
  resolveUserHash,
  writeRoomCardSvg,
} from "./lib/thm.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROFILE_PATH = path.join(ROOT, "config/profile.json");
const CACHE_PATH = path.join(ROOT, "data/thm.json");
const DEMO_PATH = path.join(ROOT, "data/thm.demo.json");
const ASSETS_ROOMS = path.join(ROOT, "assets/rooms");
const PUBLIC_ROOMS = path.join(ROOT, "public/rooms");

function log(...a) {
  console.log("[resume]", ...a);
}

function loadJson(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}

function saveJson(p, data) {
  mkdirSync(path.dirname(p), { recursive: true });
  writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

function ensureDemoRoomAssets(rooms) {
  mkdirSync(ASSETS_ROOMS, { recursive: true });
  return rooms.map((room) => {
    const svgRel = `assets/rooms/${room.code}.svg`;
    const svgAbs = path.join(ROOT, svgRel);
    if (!existsSync(svgAbs)) writeRoomCardSvg(svgAbs, room);
    return { ...room, localImage: svgRel };
  });
}

function syncPublicRooms() {
  mkdirSync(PUBLIC_ROOMS, { recursive: true });
  if (!existsSync(ASSETS_ROOMS)) return;
  for (const name of readdirSync(ASSETS_ROOMS)) {
    cpSync(path.join(ASSETS_ROOMS, name), path.join(PUBLIC_ROOMS, name));
  }
  log("synced", readdirSync(PUBLIC_ROOMS).length, "room assets → public/rooms");
}

async function fetchLive(profile) {
  const thm = profile.tryhackme;
  const stats = thm.userPublicId
    ? await fetchBadgeStats(thm.userPublicId)
    : {
        streak: "unknown",
        rank: null,
        badges: null,
        completedRooms: null,
        level: null,
      };

  let recentRooms = [];
  try {
    const hash = await resolveUserHash(thm.username, thm.userHash);
    recentRooms = await fetchCompletedRooms(hash, {
      limit: profile.recentRoomsLimit || 6,
      pages: 1,
    });
    recentRooms = await materializeRoomImages(recentRooms, ASSETS_ROOMS);
  } catch (e) {
    log("rooms fetch skipped:", e.message);
  }

  return {
    live: true,
    username: thm.username,
    fetchedAt: new Date().toISOString(),
    stats: {
      streak: stats.streak,
      rank: stats.rank,
      badges: stats.badges,
      completedRooms: stats.completedRooms,
      level: stats.level,
      profileImage: stats.profileImage,
    },
    recentRooms,
  };
}

async function main() {
  const forceDemo = process.argv.includes("--demo");
  const profile = loadJson(PROFILE_PATH);

  let thm;
  if (forceDemo || !isConfigured(profile.tryhackme)) {
    log(forceDemo ? "demo mode" : "TryHackMe not configured — using demo cache");
    thm = loadJson(DEMO_PATH);
    thm.live = false;
    thm.recentRooms = ensureDemoRoomAssets(thm.recentRooms || []);
  } else {
    try {
      log("fetching TryHackMe for", profile.tryhackme.username);
      thm = await fetchLive(profile);
      if (!thm.recentRooms?.length && existsSync(CACHE_PATH)) {
        const prev = loadJson(CACHE_PATH);
        thm.recentRooms = prev.recentRooms || [];
        log("kept previous rooms (live rooms empty)");
      }
    } catch (e) {
      log("live fetch failed:", e.message);
      if (existsSync(CACHE_PATH)) {
        thm = loadJson(CACHE_PATH);
        thm.live = false;
        log("fell back to data/thm.json");
      } else {
        thm = loadJson(DEMO_PATH);
        thm.live = false;
        thm.recentRooms = ensureDemoRoomAssets(thm.recentRooms || []);
        log("fell back to demo data");
      }
    }
  }

  saveJson(CACHE_PATH, thm);
  syncPublicRooms();
  log("wrote data/thm.json");
  log("streak:", thm.stats?.streak, "| rooms:", (thm.recentRooms || []).length);
}

main().catch((err) => {
  console.error("[resume] fatal:", err);
  process.exit(1);
});

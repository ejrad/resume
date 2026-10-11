#!/usr/bin/env node
/**
 * Fetch TryHackMe public stats via Playwright (bypasses bot challenge).
 * Pulls every completed room into data/thm.json.
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { materializeRoomImages, writeRoomCardSvg } from "./lib/thm.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const profile = JSON.parse(readFileSync(path.join(ROOT, "config/profile.json"), "utf8"));
const username = profile.tryhackme?.username;
if (!username || username === "REPLACE_ME") {
  console.error("[thm] no username in config/profile.json");
  process.exit(1);
}

const ASSETS = path.join(ROOT, "assets/rooms");
const PUBLIC = path.join(ROOT, "public/rooms");

function log(...a) {
  console.log("[thm]", ...a);
}

const browser = await chromium.launch({
  headless: true,
  args: ["--disable-blink-features=AutomationControlled"],
});
const context = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
});
await context.addInitScript(() => {
  Object.defineProperty(navigator, "webdriver", { get: () => undefined });
});
const page = await context.newPage();
await page.goto(`https://tryhackme.com/p/${username}`, { waitUntil: "networkidle", timeout: 90000 });
try {
  await page.getByRole("button", { name: /Allow All/i }).click({ timeout: 2500 });
} catch {}

const payload = await page.evaluate(async (username) => {
  const headers = { Accept: "application/json" };
  const profileRes = await fetch(
    `https://tryhackme.com/api/v2/public-profile?username=${encodeURIComponent(username)}`,
    { credentials: "include", headers },
  );
  const profileJson = await profileRes.json();

  const docs = [];
  const pageSize = 50;
  for (let pageNum = 1; pageNum <= 40; pageNum++) {
    const roomsRes = await fetch(
      `https://tryhackme.com/api/v2/public-profile/completed-rooms?username=${encodeURIComponent(username)}&limit=${pageSize}&page=${pageNum}`,
      { credentials: "include", headers },
    );
    const roomsJson = await roomsRes.json();
    const batch = roomsJson?.data?.docs || [];
    if (!batch.length) break;
    docs.push(...batch);
    if (batch.length < pageSize) break;
  }

  return { profileJson, docs, profileStatus: profileRes.status };
}, username);

await browser.close();

if (payload.profileStatus !== 200) {
  console.error("[thm] public-profile HTTP", payload.profileStatus);
  process.exit(1);
}

const d = payload.profileJson?.data || {};
const docs = payload.docs || [];
log("fetched room docs:", docs.length, "| profile says", d.completedRoomsNumber);

const rooms = docs.map((room) => ({
  code: room.code,
  title: room.title || room.code,
  image: room.imageURL || room.image || null,
  url: `https://tryhackme.com/room/${room.code}`,
  difficulty: room.difficulty || null,
  completedAt: room.completed || room.completedAt || null,
}));

mkdirSync(ASSETS, { recursive: true });
const withImages = await materializeRoomImages(rooms, ASSETS);
for (const r of withImages) {
  if (!existsSync(path.join(ROOT, r.localImage))) writeRoomCardSvg(path.join(ROOT, r.localImage), r);
}

mkdirSync(PUBLIC, { recursive: true });
for (const name of readdirSync(ASSETS)) {
  cpSync(path.join(ASSETS, name), path.join(PUBLIC, name));
}

const level =
  d.level == null ? null : String(d.level).startsWith("[") ? String(d.level) : `[0x${Number(d.level).toString(16)}]`;

const thm = {
  live: true,
  username,
  fetchedAt: new Date().toISOString(),
  stats: {
    streak: d.streak == null ? "—" : `${d.streak} days`,
    rank: d.rank ?? null,
    badges: d.badgesNumber ?? null,
    completedRooms: d.completedRoomsNumber ?? withImages.length,
    level,
    profileImage: d.avatar ?? null,
  },
  rooms: withImages,
  recentRooms: withImages,
};

writeFileSync(path.join(ROOT, "data/thm.json"), JSON.stringify(thm, null, 2) + "\n");
log("wrote data/thm.json — streak", thm.stats.streak, "rooms", thm.rooms.length);

/**
 * TryHackMe public profile + completed rooms fetchers.
 * Modern public APIs accept username — userPublicId / userHash are optional.
 */

import { fetchJSON, fetchText, downloadBinary } from "./http.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

function pick(obj, keys) {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return null;
}

function normalizeWs(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

/** Parse streak/rank/etc from the public badge iframe HTML. */
export function parseBadgeHtml(html) {
  const details = [...html.matchAll(/class="[^"]*details-text[^"]*"[^>]*>([\s\S]*?)<\//gi)].map((m) =>
    normalizeWs(m[1].replace(/<[^>]+>/g, " "))
  );
  const ranks = [...html.matchAll(/class="[^"]*rank-title[^"]*"[^>]*>([\s\S]*?)<\//gi)].map((m) =>
    normalizeWs(m[1].replace(/<[^>]+>/g, " "))
  );
  const values = [...ranks, ...details].filter(Boolean);
  const pfp = html.match(/https:\/\/tryhackme-images\.s3\.amazonaws\.com\/user-avatars\/[^)\s"'<>]+/);

  let streak = values.find((v) => /\bday/i.test(v)) || null;
  let level = values.find((v) => /^\[0x/i.test(v)) || null;
  const nums = values.filter((v) => /^\d+$/.test(v)).map(Number);
  const streakLabeled = html.match(/Streak[^0-9]*(\d+\s*days?)/i);
  if (streakLabeled) streak = streakLabeled[1];

  return {
    rank: nums[0] ?? null,
    streak: streak || "0 days",
    badges: nums[1] ?? null,
    completedRooms: nums[2] ?? null,
    level: level || null,
    profileImage: pfp ? pfp[0] : null,
    rawValues: values,
  };
}

export async function fetchBadgeStats(userPublicId) {
  const url = `https://tryhackme.com/api/v2/badges/public-profile?userPublicId=${encodeURIComponent(userPublicId)}`;
  const html = await fetchText(url, { accept: "text/html" });
  return parseBadgeHtml(html);
}

export async function fetchPublicProfile(username) {
  const url = `https://tryhackme.com/api/v2/public-profile?username=${encodeURIComponent(username)}`;
  const data = await fetchJSON(url);
  const d = data?.data || data || {};
  const streakNum = d.streak;
  return {
    username: d.username || username,
    streak: streakNum == null ? "—" : String(streakNum).includes("day") ? String(streakNum) : `${streakNum} days`,
    rank: d.rank ?? null,
    badges: d.badgesNumber ?? d.badges ?? null,
    completedRooms: d.completedRoomsNumber ?? d.completedRooms ?? d.roomsCompleted ?? null,
    level: d.level != null ? (String(d.level).startsWith("[") ? String(d.level) : `[0x${Number(d.level).toString(16)}]`) : null,
    profileImage: d.avatar || d.profileImage || null,
    badgeImageURL: d.badgeImageURL || null,
    totalPoints: d.totalPoints ?? null,
    userPublicId: d.userPublicId || d.publicId || null,
    userHash: d.userId || d._id || d.id || null,
    raw: d,
  };
}

/** Fetch completed rooms by username (preferred) or legacy user hash. */
export async function fetchCompletedRooms({ username, userHash, limit = 6, pages = 1 } = {}) {
  const rooms = [];
  for (let page = 1; page <= pages; page++) {
    const qs = new URLSearchParams({
      limit: String(Math.max(limit, 16)),
      page: String(page),
    });
    if (username) qs.set("username", username);
    else if (userHash) qs.set("user", userHash);
    else throw new Error("username or userHash required");

    const url = `https://tryhackme.com/api/v2/public-profile/completed-rooms?${qs}`;
    const data = await fetchJSON(url);
    const docs = data?.data?.docs || data?.docs || [];
    if (!docs.length) break;
    rooms.push(...docs);
    if (rooms.length >= limit) break;
  }
  return rooms.slice(0, limit).map(normalizeRoom).filter(Boolean);
}

function normalizeRoom(room) {
  const code = pick(room, ["code", "roomCode"]) || null;
  if (!code) return null;
  const title = pick(room, ["title", "name", "roomName"]) || code;
  const image = pick(room, ["image", "imageURL", "img", "icon"]);
  return {
    code: String(code),
    title: String(title),
    image: image ? String(image) : null,
    url: `https://tryhackme.com/room/${code}`,
    difficulty: pick(room, ["difficulty"]) || null,
    completedAt: pick(room, ["completed", "completedAt", "dateCompleted", "timestamp"]) || null,
  };
}

export function writeRoomCardSvg(destPath, { title, code }) {
  mkdirSync(path.dirname(destPath), { recursive: true });
  const safeTitle = escapeXml(title).slice(0, 42);
  const safeCode = escapeXml(code);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200" role="img" aria-label="${safeTitle}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1220"/>
      <stop offset="100%" stop-color="#12263a"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1ba94c"/>
      <stop offset="100%" stop-color="#88cc14"/>
    </linearGradient>
  </defs>
  <rect width="320" height="200" rx="16" fill="url(#bg)"/>
  <rect x="0" y="0" width="320" height="6" fill="url(#accent)"/>
  <text x="20" y="48" fill="#88cc14" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="12" letter-spacing="2">TRYHACKME ROOM</text>
  <text x="20" y="96" fill="#f4f7fb" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="22" font-weight="700">${safeTitle}</text>
  <text x="20" y="168" fill="#8aa0b5" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="13">/${safeCode}</text>
  <circle cx="280" cy="160" r="18" fill="none" stroke="#88cc14" stroke-width="3"/>
  <path d="M272 160h16M280 152v16" stroke="#88cc14" stroke-width="3" stroke-linecap="round"/>
</svg>
`;
  writeFileSync(destPath, svg);
  return destPath;
}

function escapeXml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function materializeRoomImages(rooms, assetsDir) {
  mkdirSync(assetsDir, { recursive: true });
  const out = [];
  for (const room of rooms) {
    const base = path.join(assetsDir, room.code);
    let localRel = null;
    if (room.image) {
      try {
        const ext = /\.png($|\?)/i.test(room.image) ? ".png" : ".jpg";
        const dest = base + ext;
        await downloadBinary(room.image, dest);
        localRel = `assets/rooms/${room.code}${ext}`;
      } catch {
        // fall through
      }
    }
    if (!localRel) {
      const dest = base + ".svg";
      writeRoomCardSvg(dest, room);
      localRel = `assets/rooms/${room.code}.svg`;
    }
    out.push({ ...room, localImage: localRel });
  }
  return out;
}

export function isConfigured(thm) {
  return Boolean(thm?.username && thm.username !== "REPLACE_ME");
}

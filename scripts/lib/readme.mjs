/**
 * Assemble the live resume README from profile config + TryHackMe data.
 */

import { ctaWidget, galleryPageUrl, galleryUrl, infoWidget } from "./bettermarkdown.mjs";

function mdEscape(s) {
  return String(s ?? "").replace(/\|/g, "\\|");
}

function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function buildReadme({ profile, thm, generatedAt }) {
  const base = profile.betterMarkdownBase || "https://better-markdown-theta.vercel.app";
  const thmUser = profile.tryhackme?.username && profile.tryhackme.username !== "REPLACE_ME"
    ? profile.tryhackme.username
    : null;
  const thmProfileUrl = thmUser ? `https://tryhackme.com/p/${thmUser}` : "https://tryhackme.com";
  const githubUrl = profile.github ? `https://github.com/${profile.github}` : "";

  const streak = thm?.stats?.streak || "—";
  const rank = thm?.stats?.rank != null ? String(thm.stats.rank) : "—";
  const roomsDone = thm?.stats?.completedRooms != null ? String(thm.stats.completedRooms) : "—";
  const level = thm?.stats?.level || "—";
  const rooms = thm?.recentRooms || [];

  const widgetRow = [
    infoWidget(base, { title: "Streak", subtitle: String(streak), bg: "#12263a", fg: "#88cc14", width: 200, href: thmProfileUrl }),
    infoWidget(base, { title: "Rank", subtitle: `#${rank}`, bg: "#0d1117", fg: "#58a6ff", width: 200, href: thmProfileUrl }),
    infoWidget(base, { title: "Rooms", subtitle: roomsDone, bg: "#0d1117", fg: "#f0f6fc", width: 180, href: thmProfileUrl }),
    infoWidget(base, { title: "Level", subtitle: String(level), bg: "#0d1117", fg: "#ffa657", width: 180, href: thmProfileUrl }),
  ].join(" ");

  const absoluteImages = rooms.map((r) => {
    // Better Markdown gallery needs absolute URLs; for local assets we keep markdown table below.
    return r.image || null;
  }).filter(Boolean);

  let roomsGallery = "";
  if (absoluteImages.length) {
    const badge = galleryUrl(base, absoluteImages, {
      style: "badge",
      title: "Recently completed",
      subtitle: `${rooms.length} latest rooms`,
      height: 170,
    });
    const page = galleryPageUrl(base, absoluteImages);
    roomsGallery = `[![Recently completed rooms](${badge})](${page})\n`;
  }

  const roomCards = rooms.length
    ? rooms
        .map((r) => {
          const when = fmtDate(r.completedAt);
          const img = r.localImage || r.image;
          return `| <a href="${r.url}"><img src="${img}" alt="${mdEscape(r.title)}" width="160" /></a> | **[${mdEscape(r.title)}](${r.url})**<br/>\`${r.code}\`${when ? `<br/>${when}` : ""} |`;
        })
        .join("\n")
    : "| — | _No completed rooms yet. Finish a room on TryHackMe and the next sync will land here._ |";

  const experience = (profile.experience || [])
    .map((e) => {
      const bullets = (e.bullets || []).map((b) => `  - ${b}`).join("\n");
      return `**${e.title}** — ${e.org} · _${e.dates}_\n${bullets}`;
    })
    .join("\n\n");

  const projects = (profile.projects || [])
    .map((p) => `- **[${p.name}](${p.url})** — ${p.blurb}`)
    .join("\n");

  const skills = Object.entries(profile.skills || {})
    .map(([k, arr]) => `- **${k}:** ${(arr || []).join(" · ")}`)
    .join("\n");

  const education = (profile.education || [])
    .map((e) => `- **${e.school}** — ${e.detail} · _${e.dates}_`)
    .join("\n");

  const links = [
    githubUrl ? ctaWidget(base, { title: "GitHub", href: githubUrl, bg: "#238636" }) : "",
    thmUser ? ctaWidget(base, { title: "TryHackMe", href: thmProfileUrl, bg: "#1ba94c" }) : "",
    profile.linkedin ? ctaWidget(base, { title: "LinkedIn", href: profile.linkedin, bg: "#0a66c2" }) : "",
    profile.website ? ctaWidget(base, { title: "Website", href: profile.website, bg: "#8957e5" }) : "",
    profile.email ? ctaWidget(base, { title: "Email", href: `mailto:${profile.email}`, bg: "#21262d", width: 160 }) : "",
  ]
    .filter(Boolean)
    .join(" ");

  const syncNote = thm?.live
    ? `Live sync · last refreshed <kbd>${generatedAt}</kbd>`
    : `Using cached / demo TryHackMe data · set \`config/profile.json\` → \`tryhackme\` and re-run \`npm run update\``;

  const badgeImg = thmUser
    ? `<a href="${thmProfileUrl}"><img src="https://tryhackme-badges.s3.amazonaws.com/${thmUser}.png" alt="TryHackMe badge" /></a>`
    : "";

  return `<div align="center">

# ${profile.name}

${infoWidget(base, {
    title: profile.name,
    subtitle: profile.tagline || "Live resume",
    width: 420,
    height: 72,
    bg: "#0b1220",
    fg: "#f4f7fb",
  })}

${profile.location ? `_${profile.location}_` : ""}

${links}

</div>

---

## About

${profile.summary}

---

## Resume

### Experience

${experience || "_Add roles in \`config/profile.json\`._"}

### Projects

${projects || "_Add projects in \`config/profile.json\`._"}

### Skills

${skills || "_Add skills in \`config/profile.json\`._"}

### Education

${education || "_Add education in \`config/profile.json\`._"}

---

## TryHackMe

<div align="center">

${badgeImg}

${widgetRow}

</div>

${syncNote}

### Current streak

${infoWidget(base, {
    title: "Current streak",
    subtitle: String(streak),
    width: 320,
    height: 72,
    bg: "#12263a",
    fg: "#88cc14",
    href: thmProfileUrl,
  })}

Keep the fire going — the streak widget above refreshes on the GitHub Actions schedule.

### Recently completed rooms

${roomsGallery}
| Room | Details |
| :---: | --- |
${roomCards}

---

<div align="center">

${ctaWidget(base, {
    title: "Built with Better Markdown",
    href: "https://github.com/Cyborg-Taco/Better-Markdown",
    bg: "#21262d",
    width: 280,
  })}

<sub>Auto-updated by \`scripts/update.mjs\` · edit content in \`config/profile.json\`</sub>

</div>
`;
}

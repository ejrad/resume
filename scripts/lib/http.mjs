/**
 * Best-effort HTTP helpers for TryHackMe public endpoints.
 * Direct fetch first, then public relay proxies (shared runner IPs often get 429).
 */

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const PROXIES = [
  (u) => "https://api.allorigins.win/raw?url=" + encodeURIComponent(u),
  (u) => "https://corsproxy.io/?url=" + encodeURIComponent(u),
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function rawFetch(url, { accept = "application/json", timeoutMs = 25000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { Accept: accept, "User-Agent": UA },
      signal: ctrl.signal,
      redirect: "follow",
    });
    const text = await res.text();
    return { ok: res.ok, status: res.status, text, contentType: res.headers.get("content-type") || "" };
  } finally {
    clearTimeout(t);
  }
}

export async function fetchText(thmUrl, { accept = "text/html" } = {}) {
  const attempts = [];
  for (let i = 0; i < 3; i++) {
    attempts.push({ url: thmUrl, label: "direct", wait: i ? 1200 * i : 0 });
  }
  for (const mk of PROXIES) {
    attempts.push({ url: mk(thmUrl), label: "proxy", wait: 0 });
  }

  let last = "no attempts";
  for (const a of attempts) {
    if (a.wait) await sleep(a.wait);
    try {
      const res = await rawFetch(a.url, { accept });
      if (!res.ok) {
        last = `${a.label} HTTP ${res.status}`;
        continue;
      }
      if (/vercel security checkpoint|challenge/i.test(res.text)) {
        last = `${a.label} challenge page`;
        continue;
      }
      return res.text;
    } catch (e) {
      last = `${a.label} ${e.name === "AbortError" ? "timeout" : e.message}`;
    }
  }
  throw new Error(last);
}

export async function fetchJSON(thmUrl) {
  const text = await fetchText(thmUrl, { accept: "application/json" });
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("non-JSON response");
  }
}

export async function downloadBinary(url, destPath) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) throw new Error(`download HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 200) throw new Error("download too small");
  const { writeFileSync, mkdirSync } = await import("node:fs");
  const { dirname } = await import("node:path");
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, buf);
  return destPath;
}

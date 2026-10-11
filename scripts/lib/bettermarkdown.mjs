/**
 * Build Better Markdown widget + gallery URLs.
 * https://github.com/Cyborg-Taco/Better-Markdown
 */

function enc(value) {
  return encodeURIComponent(String(value ?? ""));
}

function b64url(value) {
  return Buffer.from(String(value), "utf8").toString("base64");
}

export function widgetUrl(base, params) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    q.set(k, String(v));
  }
  return `${base.replace(/\/$/, "")}/api/widget?${q.toString()}`;
}

export function galleryUrl(base, imageUrls, extras = {}) {
  const images = imageUrls.map((u) => b64url(u)).join(",");
  const q = new URLSearchParams({ images, ...Object.fromEntries(
    Object.entries(extras).map(([k, v]) => [k, String(v)])
  )});
  return `${base.replace(/\/$/, "")}/api/gallery?${q.toString()}`;
}

export function galleryPageUrl(base, imageUrls) {
  const images = imageUrls.map((u) => b64url(u)).join(",");
  return `${base.replace(/\/$/, "")}/gallery?images=${images}`;
}

export function infoWidget(base, { title, subtitle, bg = "#0d1117", fg = "#ffffff", width = 220, height = 64, href }) {
  const src = widgetUrl(base, {
    type: "card",
    title,
    subtitle,
    width,
    height,
    radius: 12,
    borderWidth: 1,
    borderColor: "#21262d",
    align: "left",
    bg,
    fg,
  });
  const alt = `${title}${subtitle ? ` — ${subtitle}` : ""}`;
  if (href) return `[![${alt}](${src})](${href})`;
  return `![${alt}](${src})`;
}

export function ctaWidget(base, { title, href, bg = "#238636", fg = "#ffffff", width = 180 }) {
  const src = widgetUrl(base, {
    type: "card",
    title,
    width,
    height: 48,
    radius: 10,
    borderWidth: 1,
    borderColor: "#1f2937",
    align: "center",
    bg,
    fg,
  });
  return `[![${title}](${src})](${href})`;
}

export { enc };

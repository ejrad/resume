/** Prefix a public asset for GitHub Pages (`/resume`) vs local dev. */
export function assetPath(path: string, basePath = "") {
  const prefix = basePath.replace(/\/$/, "");
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${prefix}${cleaned}`;
}

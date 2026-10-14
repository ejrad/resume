/** GitHub Pages base path. Override with NEXT_BASE_PATH (e.g. `/resume/frutiger`). */
export function getBasePath() {
  const fromEnv = process.env.NEXT_BASE_PATH;
  if (fromEnv != null && fromEnv !== "") {
    return fromEnv.replace(/\/$/, "") || "";
  }
  if (process.env.NODE_ENV === "production") return "/resume";
  return "";
}

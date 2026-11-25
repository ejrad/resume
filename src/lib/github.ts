export type CommitInfo = {
  sha: string;
  shortSha: string;
  message: string;
  date: string;
  timeAgo: string;
  url: string;
  authorName?: string;
};

/**
 * Parses owner and repo name from a GitHub URL
 */
export function parseGitHubRepo(url: string): { owner: string; repo: string } | null {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("github.com")) return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return { owner: parts[0], repo: parts[1] };
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Formats a timestamp into a compact relative duration
 */
export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (isNaN(diffSec) || diffSec < 0) return "recently";
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${Math.floor(diffMonths / 12)}y ago`;
}

/**
 * Fetches the latest commit metadata for a given GitHub repository URL
 */
export async function fetchLatestCommit(repoUrl: string): Promise<CommitInfo | null> {
  const repo = parseGitHubRepo(repoUrl);
  if (!repo) return null;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo.owner}/${repo.repo}/commits?per_page=1`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const commitData = data[0];
    const sha = commitData.sha || "";
    const shortSha = sha.slice(0, 7);
    const message = commitData.commit?.message?.split("\n")[0] || "";
    const date = commitData.commit?.author?.date || "";
    const url = commitData.html_url || repoUrl;
    const authorName = commitData.commit?.author?.name;

    return {
      sha,
      shortSha,
      message,
      date,
      timeAgo: date ? formatTimeAgo(date) : "",
      url,
      authorName,
    };
  } catch {
    return null;
  }
}

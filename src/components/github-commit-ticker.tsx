"use client";

import { useEffect, useState } from "react";
import { fetchLatestCommit, type CommitInfo } from "@/lib/github";

const commitCache = new Map<string, CommitInfo>();

export function GithubCommitTicker({ repoUrl }: { repoUrl: string }) {
  const [commit, setCommit] = useState<CommitInfo | null>(() => commitCache.get(repoUrl) || null);
  const [loading, setLoading] = useState(!commitCache.has(repoUrl));

  useEffect(() => {
    let isMounted = true;
    if (commitCache.has(repoUrl)) {
      setCommit(commitCache.get(repoUrl)!);
      setLoading(false);
      return;
    }

    fetchLatestCommit(repoUrl).then((info) => {
      if (!isMounted) return;
      if (info) {
        commitCache.set(repoUrl, info);
        setCommit(info);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [repoUrl]);

  if (loading) {
    return (
      <span className="aero-commit-ticker aero-commit-ticker-loading" aria-label="Loading latest commit">
        <span className="aero-pulse-dot" aria-hidden="true" />
        <span className="aero-ticker-text">Syncing commit...</span>
      </span>
    );
  }

  if (!commit) return null;

  return (
    <a
      href={commit.url}
      target="_blank"
      rel="noreferrer"
      className="aero-commit-ticker"
      title={`Latest commit: "${commit.message}" (${commit.sha})`}
    >
      <span className="aero-pulse-dot" aria-hidden="true" />
      <span className="aero-ticker-prefix">Commit</span>
      <code className="aero-ticker-sha">{commit.shortSha}</code>
      <span className="aero-ticker-time">· {commit.timeAgo}</span>
    </a>
  );
}

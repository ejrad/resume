"use client";

import { useEffect, useRef, useState } from "react";
import { fetchLatestCommit, type CommitInfo } from "@/lib/github";

const commitCache = new Map<string, CommitInfo>();

export function GithubCommitTicker({ repoUrl }: { repoUrl: string }) {
  const [commit, setCommit] = useState<CommitInfo | null>(() => commitCache.get(repoUrl) || null);
  const [loading, setLoading] = useState(!commitCache.has(repoUrl));
  const [isOverflowing, setIsOverflowing] = useState(false);

  const viewportRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

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

  useEffect(() => {
    const viewport = viewportRef.current;
    const measure = measureRef.current;
    if (!viewport || !measure || !commit) return;

    const checkOverflow = () => {
      setIsOverflowing(measure.scrollWidth > viewport.clientWidth + 1);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [commit]);

  if (loading) {
    return (
      <span className="aero-commit-ticker aero-commit-ticker-loading" aria-label="Loading latest commit">
        <span className="aero-pulse-dot" aria-hidden="true" />
        <span className="aero-ticker-text">Syncing latest commit...</span>
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
      title={`Latest commit (${commit.shortSha}): "${commit.message}"`}
    >
      <span className="aero-pulse-dot" aria-hidden="true" />
      <span ref={viewportRef} className="aero-ticker-viewport">
        <span
          className={`aero-ticker-track${isOverflowing ? " aero-ticker-track--scrolling" : ""}`}
        >
          <span ref={measureRef} className="aero-ticker-msg">
            {commit.message}
          </span>
          {isOverflowing ? (
            <span className="aero-ticker-msg" aria-hidden="true">
              {commit.message}
            </span>
          ) : null}
        </span>
      </span>
      {commit.timeAgo ? (
        <span className="aero-ticker-time">{commit.timeAgo}</span>
      ) : null}
    </a>
  );
}

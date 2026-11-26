"use client";

import { useEffect, useState } from "react";
import {
  fetchRobloxGameStats,
  formatCompactCount,
  type RobloxGameStats,
} from "@/lib/roblox";

const statsCache = new Map<string, RobloxGameStats>();

export function RobloxPlayerTicker({
  gameUrl,
  universeId,
}: {
  gameUrl: string;
  universeId?: string;
}) {
  const [stats, setStats] = useState<RobloxGameStats | null>(
    () => statsCache.get(gameUrl) || null
  );
  const [loading, setLoading] = useState(!statsCache.has(gameUrl));

  useEffect(() => {
    let isMounted = true;
    if (statsCache.has(gameUrl)) {
      setStats(statsCache.get(gameUrl)!);
      setLoading(false);
      return;
    }

    fetchRobloxGameStats(gameUrl, universeId).then((info) => {
      if (!isMounted) return;
      if (info) {
        statsCache.set(gameUrl, info);
        setStats(info);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [gameUrl, universeId]);

  if (loading) {
    return (
      <span
        className="aero-commit-ticker aero-commit-ticker-loading"
        aria-label="Loading live player count"
      >
        <span className="aero-pulse-dot" aria-hidden="true" />
        <span className="aero-ticker-msg">Syncing live players...</span>
      </span>
    );
  }

  if (!stats) return null;

  return (
    <a
      href={gameUrl}
      target="_blank"
      rel="noreferrer"
      className="aero-commit-ticker"
      title={`${stats.playing.toLocaleString()} playing now · ${stats.visits.toLocaleString()} total visits`}
    >
      <span className="aero-pulse-dot" aria-hidden="true" />
      <span className="aero-ticker-msg">
        {stats.playing.toLocaleString()} playing
      </span>
      <span className="aero-ticker-time">
        · {formatCompactCount(stats.visits)} visits
      </span>
    </a>
  );
}

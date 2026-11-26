"use client";

import { useEffect, useState } from "react";
import {
  fetchRobloxGameStats,
  fetchRobloxPeaks,
  formatCompactCount,
  type RobloxGameStats,
} from "@/lib/roblox";
import type { RobloxPeakRecord } from "@/lib/types";

const statsCache = new Map<string, RobloxGameStats>();

export function RobloxPlayerTicker({
  gameUrl,
  universeId,
  initialPeak,
  githubRepo = "ejrad/resume",
}: {
  gameUrl: string;
  universeId?: string;
  initialPeak?: RobloxPeakRecord;
  githubRepo?: string;
}) {
  const [stats, setStats] = useState<RobloxGameStats | null>(
    () => statsCache.get(gameUrl) || null
  );
  const [peakRecord, setPeakRecord] = useState<RobloxPeakRecord | undefined>(
    initialPeak
  );
  const [loading, setLoading] = useState(!statsCache.has(gameUrl));

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      statsCache.has(gameUrl)
        ? Promise.resolve(statsCache.get(gameUrl)!)
        : fetchRobloxGameStats(gameUrl, universeId),
      fetchRobloxPeaks(githubRepo),
    ]).then(([info, peaksMap]) => {
      if (!isMounted) return;
      if (info) {
        statsCache.set(gameUrl, info);
        setStats(info);
      }
      const key = info?.universeId || universeId;
      if (peaksMap && key && peaksMap[key]) {
        setPeakRecord(peaksMap[key]);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [gameUrl, universeId, githubRepo]);

  if (loading && !peakRecord) {
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

  const playing = stats?.playing ?? peakRecord?.lastPlaying;
  if (playing === undefined) return null;

  const weeklyHigh = Math.max(playing, peakRecord?.weeklyPeak ?? 0);
  const allTimeHigh = Math.max(playing, peakRecord?.allTimePeak ?? 0);
  const visits = stats?.visits ?? peakRecord?.lastVisits;

  return (
    <a
      href={gameUrl}
      target="_blank"
      rel="noreferrer"
      className="aero-commit-ticker"
      title={[
        `${playing.toLocaleString()} playing now`,
        `7-day high: ${weeklyHigh.toLocaleString()}`,
        `All-time high: ${allTimeHigh.toLocaleString()}`,
        visits !== undefined ? `${visits.toLocaleString()} total visits` : "",
      ]
        .filter(Boolean)
        .join(" · ")}
    >
      <span className="aero-pulse-dot" aria-hidden="true" />
      <span className="aero-ticker-msg">
        {playing.toLocaleString()} playing
      </span>
      <span className="aero-ticker-time">
        · 7d: {formatCompactCount(weeklyHigh)} · Peak:{" "}
        {formatCompactCount(allTimeHigh)}
      </span>
    </a>
  );
}

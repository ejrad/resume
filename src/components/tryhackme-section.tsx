"use client";

import { useEffect, useState } from "react";
import { roomImageSrc } from "@/lib/data";
import type { Profile, ThmData } from "@/lib/types";

export function TryHackMeSection({
  profile,
  thm,
  basePath = "",
}: {
  profile: Profile;
  thm: ThmData;
  basePath?: string;
}) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setPulse(true), 200);
    return () => window.clearTimeout(id);
  }, []);

  const thmUser =
    profile.tryhackme.username && profile.tryhackme.username !== "REPLACE_ME"
      ? profile.tryhackme.username
      : thm.username !== "demo"
        ? thm.username
        : null;

  const streak = thm.stats.streak || "—";
  const rooms = thm.rooms?.length ? thm.rooms : thm.recentRooms || [];

  return (
    <section id="tryhackme" className="relative overflow-hidden border-t border-[var(--ink-line)] bg-[var(--ink)] py-20 text-[var(--ink-fg)] sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--lime)] to-transparent opacity-70" />
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[var(--lime)]">
              TryHackMe
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
              Live practice trail
            </h2>
            <p className="mt-4 max-w-xl text-[var(--ink-muted)]">
              Streak and every completed room — refreshed from TryHackMe on a schedule.
            </p>
          </div>
          {thmUser ? (
            <a
              href={`https://tryhackme.com/p/${thmUser}`}
              target="_blank"
              rel="noreferrer"
              className="font-[family-name:var(--font-mono)] text-sm text-[var(--lime)] underline-offset-4 hover:underline"
            >
              @{thmUser} ↗
            </a>
          ) : (
            <p className="max-w-xs text-right text-sm text-[var(--ink-muted)]">
              Set your TryHackMe username in <code className="text-[var(--lime)]">config/profile.json</code>
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className={`streak-panel ${pulse ? "is-on" : ""} sm:col-span-2`}>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.22em] text-[var(--lime)]">
              Current streak
            </p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-5xl tracking-tight sm:text-6xl">
              {streak}
            </p>
            <p className="mt-3 text-[var(--ink-muted)]">Keep the chain unbroken.</p>
          </div>
          <div className="stat-panel">
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.22em] text-[var(--ink-muted)]">
              Snapshot
            </p>
            <dl className="mt-5 space-y-3 font-[family-name:var(--font-mono)] text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--ink-muted)]">Rank</dt>
                <dd>
                  {thm.stats.rank == null
                    ? "—"
                    : typeof thm.stats.rank === "number"
                      ? `#${thm.stats.rank}`
                      : String(thm.stats.rank)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--ink-muted)]">Rooms</dt>
                <dd>{thm.stats.completedRooms ?? rooms.length ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--ink-muted)]">Level</dt>
                <dd>{thm.stats.level ?? "—"}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-tight sm:text-3xl">
            Completed rooms
          </h3>
          <p className="mt-2 text-[var(--ink-muted)]">
            {rooms.length} rooms · hover a tile for the title
          </p>

          {rooms.length === 0 ? (
            <p className="mt-8 text-[var(--ink-muted)]">No rooms yet — complete one and the next sync will land here.</p>
          ) : (
            <ul className="room-grid mt-8">
              {rooms.map((room) => {
                const src = roomImageSrc(room, basePath);
                return (
                  <li key={room.code} className="room-tile">
                    <a
                      href={room.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={room.title}
                      onClick={(e) => {
                        // Drop sticky focus so the glass doesn't stay up after returning
                        (e.currentTarget as HTMLAnchorElement).blur();
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="room-tile-img" />
                      <span className="room-tile-glass">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" className="room-tile-frost" aria-hidden />
                        <span className="room-tile-glass-fill" aria-hidden />
                        <span className="room-tile-title">{room.title}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <p className="mt-10 font-[family-name:var(--font-mono)] text-xs text-[var(--ink-muted)]">
          {thm.live ? "Live sync" : "Demo / cached data"}
          {thm.fetchedAt ? ` · updated ${new Date(thm.fetchedAt).toUTCString()}` : ""}
        </p>
      </div>
    </section>
  );
}

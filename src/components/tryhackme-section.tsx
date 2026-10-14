"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
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
  const [openCode, setOpenCode] = useState<string | null>(null);

  // Clear sticky open after click → new tab → return
  useEffect(() => {
    const clear = () => setOpenCode(null);
    const onVis = () => {
      if (document.visibilityState === "visible") clear();
    };
    window.addEventListener("pageshow", clear);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pageshow", clear);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const thmUser =
    profile.tryhackme.username && profile.tryhackme.username !== "REPLACE_ME"
      ? profile.tryhackme.username
      : thm.username !== "demo"
        ? thm.username
        : null;

  const streak = thm.stats.streak || "—";
  const rooms = thm.rooms?.length ? thm.rooms : thm.recentRooms || [];
  const roomCount = thm.stats.completedRooms ?? rooms.length ?? "—";
  const rank =
    thm.stats.rank == null
      ? "—"
      : typeof thm.stats.rank === "number"
        ? `#${thm.stats.rank}`
        : String(thm.stats.rank);

  return (
    <section id="tryhackme" className="section thm-section">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-head">Practice</h2>
            <p className="section-note">Live TryHackMe streak and every completed room.</p>
          </div>
          {thmUser ? (
            <a
              href={`https://tryhackme.com/p/${thmUser}`}
              target="_blank"
              rel="noreferrer"
              className="thm-link"
            >
              @{thmUser}
            </a>
          ) : null}
        </div>
      </Reveal>

      <div className="thm-stats">
        <Reveal>
          <h3 className="section-head" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Current streak
          </h3>
          <p className="thm-total">{streak}</p>
          <p className="thm-total-caption">Days in a row on TryHackMe.</p>
        </Reveal>

        <Reveal delay={90}>
          <div className="thm-slip">
            <dl>
              <div className="row">
                <dt>Rank</dt>
                <dd>{rank}</dd>
              </div>
              <div className="row">
                <dt>Rooms</dt>
                <dd>{roomCount}</dd>
              </div>
              <div className="row">
                <dt>Level</dt>
                <dd>{thm.stats.level ?? "—"}</dd>
              </div>
            </dl>
            <div className="total-row">
              <span>Completed</span>
              <span>{roomCount}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="room-block">
        <Reveal>
          <h3 className="section-head" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Completed rooms
          </h3>
          <p className="section-note">{rooms.length} rooms from the live trail.</p>
        </Reveal>

        {rooms.length === 0 ? (
          <p className="section-note mt-8">No rooms yet — the next sync will land here.</p>
        ) : (
          <ul
            className="room-grid"
            onPointerLeave={() => setOpenCode(null)}
          >
            {rooms.map((room) => {
              const src = roomImageSrc(room, basePath);
              const isOpen = openCode === room.code;
              return (
                <li
                  key={room.code}
                  className={`room-tile${isOpen ? " is-open" : ""}`}
                  onPointerEnter={() => setOpenCode(room.code)}
                >
                  <a
                    href={room.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={room.title}
                    onPointerDown={() => setOpenCode(null)}
                    onClick={(e) => {
                      setOpenCode(null);
                      (e.currentTarget as HTMLAnchorElement).blur();
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="room-tile-img" draggable={false} />
                    <span className="room-tile-caption">{room.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        <p className="thm-total-caption mt-8">
          {thm.live ? "Live sync" : "Cached data"}
          {thm.fetchedAt ? ` · updated ${new Date(thm.fetchedAt).toUTCString()}` : ""}
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { roomImageSrc } from "@/lib/data";
import type { ThmRoom } from "@/lib/types";

/** Client-only grid so Next does not preload every room image on first paint. */
export function RoomGrid({
  rooms,
  basePath = "",
}: {
  rooms: ThmRoom[];
  basePath?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <p className="muted">Loading rooms…</p>;
  }

  if (rooms.length === 0) {
    return <p className="muted">No rooms yet — the next sync will land here.</p>;
  }

  return (
    <ul className="room-list">
      {rooms.map((room) => (
        <li key={room.code}>
          <a href={room.url} target="_blank" rel="noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={roomImageSrc(room, basePath)}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <span>{room.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

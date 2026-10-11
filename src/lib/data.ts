import profileJson from "../../config/profile.json";
import thmJson from "../../data/thm.json";
import type { Profile, ThmData, ThmRoom } from "./types";

export function getProfile(): Profile {
  return profileJson as Profile;
}

export function getThm(): ThmData {
  return thmJson as ThmData;
}

export function roomImageSrc(room: ThmRoom, basePath = "") {
  const prefix = basePath.replace(/\/$/, "");
  if (room.localImage) {
    const cleaned = room.localImage
      .replace(/^assets\/rooms\//, "rooms/")
      .replace(/^public\//, "")
      .replace(/^\//, "");
    return `${prefix}/${cleaned}`;
  }
  if (room.image) return room.image;
  return `${prefix}/rooms/${room.code}.svg`;
}

export function formatCompletedAt(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

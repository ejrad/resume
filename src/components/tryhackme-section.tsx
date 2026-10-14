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
    <section id="tryhackme" className="section">
      <div className="section-actions" style={{ justifyContent: "space-between" }}>
        <div>
          <h2>Practice</h2>
          <p className="section-note" style={{ marginBottom: 0 }}>
            TryHackMe streak and completed rooms.
          </p>
        </div>
        {thmUser ? (
          <a href={`https://tryhackme.com/p/${thmUser}`} target="_blank" rel="noreferrer">
            @{thmUser}
          </a>
        ) : null}
      </div>

      <ul className="thm-stats">
        <li>
          <dl>
            <dt>Streak</dt>
            <dd>{streak}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Rank</dt>
            <dd>{rank}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Rooms</dt>
            <dd>{roomCount}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Level</dt>
            <dd>{thm.stats.level ?? "—"}</dd>
          </dl>
        </li>
      </ul>

      <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.05rem" }}>Completed rooms</h3>
      {rooms.length === 0 ? (
        <p className="section-note">No rooms yet — the next sync will land here.</p>
      ) : (
        <ul className="room-list">
          {rooms.map((room) => (
            <li key={room.code}>
              <a href={room.url} target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={roomImageSrc(room, basePath)} alt="" draggable={false} />
                <span>{room.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <p className="section-note" style={{ marginTop: "1.25rem", marginBottom: 0 }}>
        {thm.live ? "Live sync" : "Cached data"}
        {thm.fetchedAt ? ` · updated ${new Date(thm.fetchedAt).toUTCString()}` : ""}
      </p>
    </section>
  );
}

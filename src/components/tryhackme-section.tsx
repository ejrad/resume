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
  const roomCount = thm.stats.completedRooms ?? rooms.length ?? 0;
  const rank =
    thm.stats.rank == null
      ? "—"
      : typeof thm.stats.rank === "number"
        ? `#${thm.stats.rank}`
        : String(thm.stats.rank);

  return (
    <section id="tryhackme" className="aero-band aero-band-thm">
      <div className="aero-band-inner">
        <div className="aero-section-head">
          <div>
            <p className="aero-eyebrow">Live trail</p>
            <h2>Practice</h2>
          </div>
          {thmUser ? (
            <a
              className="aero-btn aero-btn-leaf"
              href={`https://tryhackme.com/p/${thmUser}`}
              target="_blank"
              rel="noreferrer"
            >
              @{thmUser}
            </a>
          ) : null}
        </div>

        <div className="aero-glass" style={{ marginBottom: "1.5rem" }}>
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
        </div>

        <div className="aero-glass">
          <div className="aero-section-head" style={{ marginBottom: "1rem" }}>
            <div>
              <p className="aero-eyebrow">Completed rooms</p>
              <h2 style={{ fontSize: "1.45rem" }}>{rooms.length} rooms</h2>
            </div>
            <span className="sparkle" aria-hidden="true" />
          </div>

          {rooms.length === 0 ? (
            <p className="muted">No rooms yet — the next sync will land here.</p>
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

          <p className="thm-meta">
            {thm.live ? "Live sync" : "Cached data"}
            {thm.fetchedAt ? ` · updated ${new Date(thm.fetchedAt).toUTCString()}` : ""}
          </p>
        </div>
      </div>
    </section>
  );
}

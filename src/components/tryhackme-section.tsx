import { RoomGrid } from "@/components/room-grid";
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

        <div className="aero-window aero-window-delay-1" style={{ marginBottom: "1.5rem" }}>
          <div className="aero-titlebar">
            <span className="orb" aria-hidden="true" />
            <span>TryHackMe · Stats</span>
          </div>
          <div className="aero-window-body">
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
        </div>

        <div className="aero-window aero-window-delay-2">
          <div className="aero-titlebar">
            <span className="orb" aria-hidden="true" />
            <span>Completed rooms · {rooms.length}</span>
          </div>
          <div className="aero-window-body">
            <RoomGrid rooms={rooms} basePath={basePath} />
            <p className="thm-meta">
              {thm.live ? "Live sync" : "Cached data"}
              {thm.fetchedAt ? ` · updated ${new Date(thm.fetchedAt).toUTCString()}` : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

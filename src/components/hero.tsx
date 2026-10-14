"use client";

import type { Profile } from "@/lib/types";

export function Hero({
  profile,
  pdfPath,
}: {
  profile: Profile;
  pdfPath: string;
}) {
  const parts = profile.name.trim().split(/\s+/);
  const first = parts[0] ?? profile.name;
  const last = parts.slice(1).join(" ");

  return (
    <header className="hero">
      <div className="hero-panel hero-panel-ink">
        <nav className="hero-nav" aria-label="Sections">
          <a href="#resume">Resume</a>
          <a href="#tryhackme">Practice</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </nav>

        <div className="hero-main">
          <h1 className="hero-name">
            <span className="hero-name-line">
              <span>{first}</span>
            </span>
            {last ? (
              <span className="hero-name-line">
                <span>{last}</span>
              </span>
            ) : null}
          </h1>
        </div>
      </div>

      <div className="hero-panel hero-panel-accent">
        <p className="hero-support">Computer Science at James Madison University.</p>
        <a className="hero-action" href={pdfPath} download="ErnestRadayResume.pdf">
          Download resume
        </a>
      </div>
    </header>
  );
}

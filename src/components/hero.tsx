import type { Profile } from "@/lib/types";

export function Hero({
  profile,
  pdfPath,
}: {
  profile: Profile;
  pdfPath: string;
}) {
  return (
    <header className="aero-hero">
      <div className="aero-hero-bg" aria-hidden="true" />
      <div className="aero-hero-aurora" aria-hidden="true" />

      <div className="aero-nav">
        <span className="aero-brand-pill">Frutiger Aero · Live Resume</span>
        <nav className="aero-nav-links" aria-label="Sections">
          <a href="#resume">Resume</a>
          <a href="#tryhackme">Practice</a>
          <a href="#projects">Projects</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </nav>
      </div>

      <div className="aero-hero-main">
        <div className="aero-hero-card">
          <h1>{profile.name}</h1>
          <p className="lead">{profile.tagline}</p>
          <div className="aero-cta-row">
            <a className="aero-btn" href={pdfPath} download="ErnestRadayResume.pdf">
              Download resume
            </a>
            <a className="aero-btn aero-btn-leaf" href="#projects">
              Projects
            </a>
            <a className="aero-btn aero-btn-chrome" href="#tryhackme">
              Practice
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

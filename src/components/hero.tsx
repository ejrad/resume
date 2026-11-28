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
            <a className="aero-btn aero-btn-chrome" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

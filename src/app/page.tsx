import { Bubbles } from "@/components/bubbles";
import { Hero } from "@/components/hero";
import { ResumeDocument } from "@/components/resume-document";
import { TryHackMeSection } from "@/components/tryhackme-section";
import { assetPath } from "@/lib/assets";
import { getProfile, getThm } from "@/lib/data";

export default function Home() {
  const profile = getProfile();
  const thm = getThm();
  const basePath = process.env.NODE_ENV === "production" ? "/resume" : "";
  const pdfPath = assetPath(`/${profile.resumePdf || "ErnestRadayResume.pdf"}`, basePath);

  return (
    <div className="aero-page">
      <Bubbles />
      <main className="aero-content">
        <Hero profile={profile} pdfPath={pdfPath} />
        <ResumeDocument profile={profile} basePath={basePath} />
        <TryHackMeSection profile={profile} thm={thm} basePath={basePath} />
        <footer className="aero-band aero-band-footer">
          <div className="aero-band-inner">
            <p className="aero-eyebrow">Contact</p>
            <div className="aero-section-head">
              <h2>
                {profile.name}
                {profile.location ? ` · ${profile.location}` : ""}
              </h2>
            </div>
            <div className="aero-footer-card">
              <ul>
                {profile.email ? (
                  <li>
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </li>
                ) : null}
                {profile.github ? (
                  <li>
                    <a href={`https://github.com/${profile.github}`}>GitHub</a>
                  </li>
                ) : null}
                {profile.linkedin ? (
                  <li>
                    <a href={profile.linkedin}>LinkedIn</a>
                  </li>
                ) : null}
                {profile.tryhackme.username && profile.tryhackme.username !== "REPLACE_ME" ? (
                  <li>
                    <a href={`https://tryhackme.com/p/${profile.tryhackme.username}`}>TryHackMe</a>
                  </li>
                ) : null}
              </ul>
              <p className="aero-credit">
                Backgrounds are CC0 / public-domain photos from{" "}
                <a href={assetPath("/aero/ATTRIBUTION.md", basePath)}>Wikimedia Commons</a>
                — grass bubbles, Frutiger Aero art, skies, and water drops.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

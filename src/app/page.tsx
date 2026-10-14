import { Hero } from "@/components/hero";
import { ResumeDocument } from "@/components/resume-document";
import { TryHackMeSection } from "@/components/tryhackme-section";
import { getProfile, getThm } from "@/lib/data";

export default function Home() {
  const profile = getProfile();
  const thm = getThm();
  const basePath = process.env.NODE_ENV === "production" ? "/resume" : "";
  const prefix = basePath.replace(/\/$/, "");
  const pdfPath = `${prefix}/${profile.resumePdf || "ErnestRadayResume.pdf"}`;

  return (
    <main className="flex-1">
      <Hero profile={profile} pdfPath={pdfPath} />
      <ResumeDocument profile={profile} basePath={basePath} />
      <TryHackMeSection profile={profile} thm={thm} basePath={basePath} />
      <footer className="site-footer">
        <div className="footer-cols">
          <div>
            <h2>Contact</h2>
            <ul>
              {profile.email ? (
                <li>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
              ) : null}
              {profile.phone ? <li>{profile.phone}</li> : null}
              {profile.location ? <li>{profile.location}</li> : null}
            </ul>
          </div>
          <div>
            <h2>Links</h2>
            <ul>
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
              <li>
                <a href="#resume">Resume</a>
              </li>
              <li>
                <a href="#tryhackme">Practice</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>TryHackMe</h2>
            <ul>
              {profile.tryhackme.username && profile.tryhackme.username !== "REPLACE_ME" ? (
                <li>
                  <a href={`https://tryhackme.com/p/${profile.tryhackme.username}`}>
                    @{profile.tryhackme.username}
                  </a>
                </li>
              ) : null}
              <li>Auto-updated trail</li>
            </ul>
          </div>
          <div>
            <h2>Source</h2>
            <ul>
              <li>
                <a href="https://github.com/ejrad/resume">ejrad/resume</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="footer-mark">{profile.name}</p>
        <p className="footer-legal">
          {profile.name}
          {profile.citizen ? ` · ${profile.citizen}` : ""} ·{" "}
          <a href="https://github.com/ejrad/resume">source</a>
        </p>
      </footer>
    </main>
  );
}

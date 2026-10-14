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
    <main className="site">
      <Hero profile={profile} pdfPath={pdfPath} />
      <ResumeDocument profile={profile} basePath={basePath} />
      <TryHackMeSection profile={profile} thm={thm} basePath={basePath} />
      <footer className="site-footer">
        <p>
          {profile.name}
          {profile.location ? ` · ${profile.location}` : ""}
        </p>
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
      </footer>
    </main>
  );
}

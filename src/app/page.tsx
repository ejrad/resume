import { Hero } from "@/components/hero";
import { ResumeDocument } from "@/components/resume-document";
import { ResumeSection } from "@/components/resume-section";
import { TryHackMeSection } from "@/components/tryhackme-section";
import { getProfile, getThm } from "@/lib/data";

export default function Home() {
  const profile = getProfile();
  const thm = getThm();
  const basePath = process.env.NODE_ENV === "production" ? "/resume" : "";

  return (
    <main className="flex-1">
      <Hero profile={profile} />
      <ResumeDocument profile={profile} basePath={basePath} />
      <ResumeSection profile={profile} />
      <TryHackMeSection profile={profile} thm={thm} basePath={basePath} />
      <footer className="border-t border-[var(--paper-line)] bg-[var(--paper)] px-6 py-10 text-center font-[family-name:var(--font-mono)] text-xs text-[var(--paper-muted)] sm:px-10">
        {profile.name} · auto-updated TryHackMe trail ·{" "}
        <a className="underline decoration-[var(--lime-deep)]/50 underline-offset-4" href="https://github.com/ejrad/resume">
          source
        </a>
      </footer>
    </main>
  );
}

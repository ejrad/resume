import type { Profile } from "@/lib/types";

export function Hero({
  profile,
  pdfPath,
}: {
  profile: Profile;
  pdfPath: string;
}) {
  return (
    <header className="site-header">
      <div>
        <h1>{profile.name}</h1>
        <p>{profile.tagline}</p>
      </div>
      <nav aria-label="Sections">
        <a href="#resume">Resume</a>
        <a href="#tryhackme">Practice</a>
        <a href={pdfPath} download="ErnestRadayResume.pdf">
          Download PDF
        </a>
        {profile.email ? <a href={`mailto:${profile.email}`}>Email</a> : null}
      </nav>
    </header>
  );
}

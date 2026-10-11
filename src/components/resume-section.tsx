import type { Profile } from "@/lib/types";

export function ResumeSection({ profile }: { profile: Profile }) {
  return (
    <section id="resume" className="border-t border-[var(--paper-line)] bg-[#ebe6db] py-20 text-[var(--paper-ink)] sm:py-28">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
          Highlights
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          From the resume
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-[var(--paper-muted)]">{profile.summary}</p>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            <div>
              <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--teal)]">
                Experience
              </h3>
              <ul className="mt-5 space-y-8">
                {profile.experience.map((job) => (
                  <li key={`${job.org}-${job.title}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-xl font-semibold tracking-tight">
                        {job.title}
                        <span className="font-normal text-[var(--paper-muted)]"> — {job.org}</span>
                      </p>
                      <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--paper-muted)]">
                        {job.dates}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2 text-[var(--paper-muted)]">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--lime-deep)]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--teal)]">
                Projects
              </h3>
              <ul className="mt-5 space-y-5">
                {profile.projects.map((p) => (
                  <li key={p.name}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg font-semibold tracking-tight text-[var(--paper-ink)] underline decoration-[var(--lime-deep)]/40 underline-offset-4 transition hover:decoration-[var(--lime-deep)]"
                    >
                      {p.name}
                    </a>
                    <p className="mt-1 text-[var(--paper-muted)]">{p.blurb}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-10">
            <div>
              <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--teal)]">
                Skills
              </h3>
              <dl className="mt-5 space-y-5">
                {Object.entries(profile.skills).map(([group, items]) => (
                  <div key={group}>
                    <dt className="font-semibold">{group}</dt>
                    <dd className="mt-1 text-[var(--paper-muted)]">{items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--teal)]">
                Education
              </h3>
              <ul className="mt-5 space-y-4">
                {profile.education.map((ed) => (
                  <li key={ed.school}>
                    <p className="font-semibold">{ed.school}</p>
                    <p className="text-[var(--paper-muted)]">
                      {ed.detail} · {ed.dates}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--teal)]">
                Links
              </h3>
              <ul className="mt-5 space-y-2 text-[var(--paper-muted)]">
                {profile.location ? <li>{profile.location}</li> : null}
                {profile.phone ? <li>{profile.phone}</li> : null}
                {profile.email ? (
                  <li>
                    <a className="underline decoration-[var(--lime-deep)]/40 underline-offset-4" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                  </li>
                ) : null}
                {profile.linkedin ? (
                  <li>
                    <a className="underline decoration-[var(--lime-deep)]/40 underline-offset-4" href={profile.linkedin}>
                      linkedin.com/in/erad
                    </a>
                  </li>
                ) : null}
                {profile.github ? (
                  <li>
                    <a className="underline decoration-[var(--lime-deep)]/40 underline-offset-4" href={`https://github.com/${profile.github}`}>
                      github.com/{profile.github}
                    </a>
                  </li>
                ) : null}
                {profile.citizen ? <li>{profile.citizen}</li> : null}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

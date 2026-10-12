"use client";

import type { Profile } from "@/lib/types";

export function Hero({ profile }: { profile: Profile }) {
  const parts = profile.name.trim().split(/\s+/);
  const first = parts[0] ?? profile.name;
  const last = parts.slice(1).join(" ");

  return (
    <header className="hero-plane relative isolate flex min-h-[100svh] flex-col overflow-hidden text-[var(--ink-fg)]">
      <div className="hero-grid absolute inset-0 -z-10 opacity-50" aria-hidden />
      <div className="hero-glow hero-glow-drift absolute -left-24 top-[12%] -z-10 h-[28rem] w-[28rem] rounded-full blur-3xl" aria-hidden />
      <div className="hero-glow-2 hero-glow-drift-2 absolute -right-20 bottom-[8%] -z-10 h-[26rem] w-[26rem] rounded-full blur-3xl" aria-hidden />
      <div className="hero-name-ghost" aria-hidden>
        {first}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-20 sm:px-10">
        <p className="hero-kicker animate-rise font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.32em] text-[var(--lime)] sm:text-sm">
          Live resume
        </p>
        <h1 className="hero-name animate-rise-delay-1 mt-6 font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em]">
          <span className="hero-name-line">{first}</span>
          {last ? <span className="hero-name-line hero-name-line-last">{last}</span> : null}
        </h1>
      </div>

      <a href="#resume-pdf" className="hero-scroll" aria-label="Scroll to resume">
        <span className="hero-scroll-line" aria-hidden />
      </a>
    </header>
  );
}

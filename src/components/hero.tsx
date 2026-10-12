"use client";

import type { Profile } from "@/lib/types";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <header className="hero-plane relative isolate min-h-[100svh] overflow-hidden text-[var(--ink-fg)]">
      <div className="hero-grid absolute inset-0 -z-10 opacity-40" aria-hidden />
      <div className="hero-glow absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full blur-3xl" aria-hidden />
      <div className="hero-glow-2 absolute -right-16 bottom-0 -z-10 h-80 w-80 rounded-full blur-3xl" aria-hidden />

      <div className="mx-auto flex min-h-[100svh] max-w-5xl flex-col justify-end px-6 pb-16 pt-24 sm:px-10 sm:pb-20">
        <p className="animate-rise font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--lime)]">
          Live resume
        </p>
        <h1 className="animate-rise-delay-1 mt-5 font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          {profile.name}
        </h1>
      </div>
    </header>
  );
}

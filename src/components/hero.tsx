"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/types";

export function Hero({ profile }: { profile: Profile }) {
  const thmUser =
    profile.tryhackme.username && profile.tryhackme.username !== "REPLACE_ME"
      ? profile.tryhackme.username
      : null;

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
        <p className="animate-rise-delay-2 mt-6 max-w-xl text-lg text-[var(--ink-muted)] sm:text-xl">
          {profile.tagline}
        </p>
        <div className="animate-rise-delay-3 mt-10 flex flex-wrap gap-3">
          <a
            href="#resume-pdf"
            className={cn(buttonVariants({ size: "lg" }), "bg-[var(--lime)] text-[var(--ink)] hover:bg-[var(--lime-hot)]")}
          >
            View resume
          </a>
          <a
            href="#tryhackme"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-[var(--ink-line)] bg-transparent text-[var(--ink-fg)] hover:bg-white/5 hover:text-[var(--ink-fg)]",
            )}
          >
            TryHackMe live
          </a>
          <a
            href={profile.email ? `mailto:${profile.email}` : "#resume"}
            className={cn(
              buttonVariants({ size: "lg", variant: "ghost" }),
              "text-[var(--ink-muted)] hover:bg-white/5 hover:text-[var(--ink-fg)]",
            )}
          >
            Contact
          </a>
          {thmUser ? (
            <a
              href={`https://tryhackme.com/p/${thmUser}`}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: "lg", variant: "ghost" }),
                "text-[var(--ink-muted)] hover:bg-white/5 hover:text-[var(--ink-fg)]",
              )}
            >
              Open profile
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}

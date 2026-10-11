"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/types";

export function ResumeDocument({
  profile,
  basePath = "",
}: {
  profile: Profile;
  basePath?: string;
}) {
  const pdfPath = `${basePath.replace(/\/$/, "")}/${profile.resumePdf || "ErnestRadayResume.pdf"}`;

  return (
    <section
      id="resume-pdf"
      className="border-t border-[var(--paper-line)] bg-[var(--paper)] py-16 text-[var(--paper-ink)] sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[var(--teal)]">
              Resume
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
              Current resume
            </h2>
            <p className="mt-3 max-w-xl text-[var(--paper-muted)]">
              The PDF I send to employers — embedded here so you can read or download the same file.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={pdfPath}
              download="ErnestRadayResume.pdf"
              className={cn(buttonVariants({ size: "lg" }), "bg-[var(--ink)] text-[var(--ink-fg)] hover:bg-[var(--teal)]")}
            >
              Download PDF
            </a>
            <a
              href={pdfPath}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-[var(--paper-line)] text-[var(--paper-ink)]",
              )}
            >
              Open in tab
            </a>
          </div>
        </div>

        <div className="resume-frame mt-10 overflow-hidden border border-[var(--paper-line)] bg-[#ece8df] shadow-[0_24px_80px_-40px_rgba(20,32,31,0.55)]">
          <object
            data={`${pdfPath}#view=FitH`}
            type="application/pdf"
            className="h-[min(85vh,980px)] w-full"
            aria-label="Ernest Raday resume PDF"
          >
            <iframe
              src={`${pdfPath}#view=FitH`}
              title="Ernest Raday resume"
              className="h-[min(85vh,980px)] w-full border-0"
            />
            <p className="p-8 text-center text-[var(--paper-muted)]">
              PDF preview unavailable in this browser.{" "}
              <a className="underline decoration-[var(--lime-deep)] underline-offset-4" href={pdfPath}>
                Download ErnestRadayResume.pdf
              </a>
            </p>
          </object>
        </div>
      </div>
    </section>
  );
}

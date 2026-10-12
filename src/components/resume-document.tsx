"use client";

import dynamic from "next/dynamic";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/types";

const InlinePdf = dynamic(() => import("./inline-pdf").then((m) => m.InlinePdf), {
  ssr: false,
  loading: () => <p className="py-20 text-center text-[var(--paper-muted)]">Loading resume…</p>,
});

export function ResumeDocument({
  profile,
  basePath = "",
}: {
  profile: Profile;
  basePath?: string;
}) {
  const prefix = basePath.replace(/\/$/, "");
  const pdfPath = `${prefix}/${profile.resumePdf || "ErnestRadayResume.pdf"}`;
  const workerSrc = `${prefix}/pdf.worker.min.mjs`;

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
          </div>
          <a
            href={pdfPath}
            download="ErnestRadayResume.pdf"
            className={cn(buttonVariants({ size: "lg" }), "bg-[var(--ink)] text-[var(--ink-fg)] hover:bg-[var(--teal)]")}
          >
            Download PDF
          </a>
        </div>

        <div className="mt-10">
          <InlinePdf file={pdfPath} workerSrc={workerSrc} />
        </div>
      </div>
    </section>
  );
}

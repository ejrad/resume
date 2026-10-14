"use client";

import dynamic from "next/dynamic";
import type { Profile } from "@/lib/types";

const InlinePdf = dynamic(() => import("./inline-pdf").then((m) => m.InlinePdf), {
  ssr: false,
  loading: () => <p className="section-note">Loading resume…</p>,
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
    <section id="resume" className="section">
      <h2>Resume</h2>
      <p className="section-note">Inline PDF — select text here, or download the file.</p>
      <div className="section-actions">
        <a href={pdfPath} download="ErnestRadayResume.pdf">
          Download PDF
        </a>
      </div>
      <InlinePdf file={pdfPath} workerSrc={workerSrc} />
    </section>
  );
}

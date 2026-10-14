"use client";

import dynamic from "next/dynamic";
import type { Profile } from "@/lib/types";
import { Reveal } from "@/components/reveal";

const InlinePdf = dynamic(() => import("./inline-pdf").then((m) => m.InlinePdf), {
  ssr: false,
  loading: () => (
    <p className="py-24 text-center text-[length:var(--step-body)] text-[#6b6b6b]">
      Loading resume…
    </p>
  ),
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
    <section id="resume" className="section resume-section">
      <Reveal className="resume-top">
        <div>
          <h2 className="section-head">Resume</h2>
          <p className="section-note">Select text in the page, or download the PDF.</p>
        </div>
        <a className="resume-action" href={pdfPath} download="ErnestRadayResume.pdf">
          Download PDF
        </a>
      </Reveal>

      <Reveal className="resume-frame" delay={80}>
        <InlinePdf file={pdfPath} workerSrc={workerSrc} />
      </Reveal>
    </section>
  );
}

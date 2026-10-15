"use client";

import dynamic from "next/dynamic";
import type { Profile } from "@/lib/types";

const InlinePdf = dynamic(() => import("./inline-pdf").then((m) => m.InlinePdf), {
  ssr: false,
  loading: () => <p className="muted">Loading resume…</p>,
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
    <section id="resume" className="aero-band aero-band-resume">
      <div className="aero-band-inner">
        <div className="aero-section-head">
          <div>
            <p className="aero-eyebrow">Document</p>
            <h2>Resume</h2>
          </div>
        </div>

        <div className="aero-window">
          <div className="aero-titlebar">
            <span className="orb" aria-hidden="true" />
            <span>ErnestRadayResume.pdf</span>
          </div>
          <div className="aero-window-body">
            <div className="aero-window-actions">
              <a className="aero-btn" href={pdfPath} download="ErnestRadayResume.pdf">
                Download PDF
              </a>
              <a className="aero-btn aero-btn-chrome" href={pdfPath} target="_blank" rel="noreferrer">
                Open in tab
              </a>
            </div>
            <InlinePdf file={pdfPath} workerSrc={workerSrc} />
          </div>
        </div>
      </div>
    </section>
  );
}

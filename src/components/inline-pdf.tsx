"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

function preferLightPdf() {
  if (typeof window === "undefined") return true;
  const narrow = window.matchMedia("(max-width: 720px)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return narrow || reduce || coarse;
}

export function InlinePdf({ file, workerSrc }: { file: string; workerSrc: string }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(320);
  const [numPages, setNumPages] = useState(0);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [light, setLight] = useState(true);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isLight = preferLightPdf();
    setLight(isLight);
    // Auto-load on desktop; opt-in on phones to avoid Safari tab crashes.
    setEnabled(!isLight);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    setReady(true);
  }, [enabled, workerSrc]);

  const measure = useCallback(() => {
    if (!shellRef.current) return;
    const next = Math.min(Math.floor(shellRef.current.clientWidth), 800);
    setWidth(Math.max(next, 280));
  }, []);

  useEffect(() => {
    if (!enabled) return;
    measure();
    const el = shellRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [enabled, measure]);

  if (!enabled) {
    return (
      <div className="pdf-opt-in">
        <p className="muted">
          Inline PDF preview is heavy on phones. Open or download the file instead, or load a
          light preview here.
        </p>
        <div className="aero-window-actions">
          <a className="aero-btn" href={file} download="ErnestRadayResume.pdf">
            Download PDF
          </a>
          <a className="aero-btn aero-btn-chrome" href={file} target="_blank" rel="noreferrer">
            Open in tab
          </a>
          <button type="button" className="aero-btn aero-btn-leaf" onClick={() => setEnabled(true)}>
            Load preview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={shellRef}>
      {!ready ? (
        <p className="muted">Loading resume…</p>
      ) : failed ? (
        <p className="muted">
          Couldn’t render the PDF inline. <a href={file}>Download ErnestRadayResume.pdf</a>
        </p>
      ) : (
        <Document
          file={file}
          loading={<p className="muted">Loading resume…</p>}
          error={<p className="muted">Failed to load resume PDF.</p>}
          onLoadSuccess={({ numPages: n }) => {
            setNumPages(n);
            setFailed(false);
          }}
          onLoadError={() => setFailed(true)}
          className="resume-inline"
        >
          {Array.from({ length: numPages }, (_, i) => (
            <Page
              key={`page-${i + 1}`}
              pageNumber={i + 1}
              width={width}
              renderAnnotationLayer={false}
              renderTextLayer={!light}
              className="resume-page"
            />
          ))}
        </Document>
      )}
    </div>
  );
}

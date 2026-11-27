"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const emptySubscribe = () => () => {};

export function InlinePdf({ file, workerSrc }: { file: string; workerSrc: string }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);
  const [numPages, setNumPages] = useState(0);
  const [failed, setFailed] = useState(false);
  const [workerReady, setWorkerReady] = useState(false);

  const light = useSyncExternalStore(
    emptySubscribe,
    () =>
      window.matchMedia("(max-width: 720px)").matches ||
      window.matchMedia("(pointer: coarse)").matches,
    () => false
  );

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    const frame = requestAnimationFrame(() => setWorkerReady(true));
    return () => cancelAnimationFrame(frame);
  }, [workerSrc]);

  const measure = useCallback(() => {
    if (!shellRef.current) return;
    const next = Math.min(Math.floor(shellRef.current.clientWidth), 800);
    setWidth(Math.max(next, 280));
  }, []);

  useEffect(() => {
    measure();
    const el = shellRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <div ref={shellRef}>
      {!workerReady ? (
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

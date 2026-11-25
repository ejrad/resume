"use client";

import { useEffect, useState } from "react";

export type ScrollSectionItem = {
  id: string;
  label: string;
};

export function SectionScrollRail({
  sections,
}: {
  sections: ScrollSectionItem[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(nextProgress);

      const triggerY = window.innerHeight * 0.35;
      const atBottom =
        docHeight > 0 && scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 24;

      if (atBottom && sections.length > 0) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      let current: string | null = null;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom > 80) {
          current = section.id;
        }
      }
      setActiveId(current);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <aside className="aero-scroll-rail" aria-label="Page sections">
      <div className="aero-scroll-rail-inner">
        <ul className="aero-scroll-list">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li
                key={section.id}
                className={`aero-scroll-item${isActive ? " is-active" : ""}`}
              >
                <a href={`#${section.id}`} className="aero-scroll-link">
                  <span className="aero-scroll-label">{section.label}</span>
                  <span className="aero-scroll-orb" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
        <div className="aero-scroll-track" aria-hidden="true">
          <div
            className="aero-scroll-fill"
            style={{ height: `${Math.round(progress * 100)}%` }}
          />
          <span
            className="aero-scroll-thumb"
            style={{ top: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </aside>
  );
}

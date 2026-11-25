"use client";

import type { CSSProperties } from "react";

/** Decorative floating glass bubbles — Frutiger Aero signature motion. */
export function Bubbles() {
  const bubbles = [
    { x: "8%", s: 54, d: 16, delay: 0 },
    { x: "22%", s: 28, d: 11, delay: 2 },
    { x: "41%", s: 72, d: 19, delay: 4 },
    { x: "58%", s: 36, d: 13, delay: 1 },
    { x: "74%", s: 88, d: 22, delay: 6 },
    { x: "88%", s: 42, d: 15, delay: 3 },
    { x: "33%", s: 22, d: 10, delay: 8 },
    { x: "66%", s: 48, d: 17, delay: 5 },
  ];

  return (
    <div className="aero-bubbles" aria-hidden="true">
      {bubbles.map((b, i) => (
        <i
          key={i}
          style={
            {
              "--x": b.x,
              "--s": `${b.s}px`,
              "--d": `${b.d}s`,
              "--delay": `${b.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

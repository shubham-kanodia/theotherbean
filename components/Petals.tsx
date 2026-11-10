import type { CSSProperties } from "react";

// Deterministic petal field: [x %, delay s, duration s, drift px, size]
const PETALS: [number, number, number, number, number][] = [
  [58, 0, 9.5, -60, 1], [66, 1.4, 11, 40, 0.8], [74, 3.1, 8.5, -30, 1.1], [82, 0.6, 10, 70, 0.9],
  [90, 2.2, 9, -50, 0.85], [62, 4.8, 12, 30, 1], [70, 6.1, 9.8, -80, 0.75], [78, 2.9, 10.6, 50, 1.05],
  [86, 5.3, 8.8, -40, 0.9], [94, 1.1, 11.4, 20, 0.8], [54, 7.2, 10.2, 60, 0.95], [98, 3.8, 9.4, -70, 1],
  [68, 8.6, 11.8, -20, 0.7], [84, 6.9, 9.1, 80, 0.85],
];

/** Blossom petals drifting down over the hero. Density is controlled by the root's data-ch via CSS. */
export default function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map(([x, delay, dur, drift, s], i) => (
        <svg
          key={i}
          className="petal"
          viewBox="-4 -9 8 18"
          width={12 * s}
          height={26 * s}
          style={{ "--x": `${x}%`, "--delay": `${-delay}s`, "--dur": `${dur}s`, "--drift": `${drift}px` } as CSSProperties}
        >
          <ellipse rx="2.5" ry="7.5" fill="#FFFFFF" stroke="#D5D0C2" strokeWidth=".5" />
        </svg>
      ))}
    </div>
  );
}

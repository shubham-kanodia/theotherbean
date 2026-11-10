import type { BeanPalette } from "@/lib/chapters";

const BEANS: [number, number, number][] = [
  [150, 200, -20], [218, 168, 15], [284, 214, -35], [346, 164, 25], [404, 212, -10], [186, 252, 30],
  [254, 276, -15], [322, 266, 40], [388, 272, -30], [300, 118, 5], [236, 108, -40], [368, 108, -25],
];

/** Twelve green beans on the drying yard; recoloured parchment → gold → roast. */
export default function Beans({ fill, edge, crease, style }: BeanPalette & { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 520 360" width="100%" height="100%" aria-hidden="true" style={{ display: "block", ...style }}>
      <g style={{ transition: "fill .9s ease, stroke .9s ease" }} fill={fill} stroke={edge} strokeWidth="1.5">
        {BEANS.map(([x, y, r]) => (
          <ellipse key={`${x}${y}`} rx="36" ry="23" transform={`translate(${x} ${y}) rotate(${r})`} />
        ))}
      </g>
      <g style={{ transition: "stroke .9s ease" }} fill="none" stroke={crease} strokeWidth="2.5" strokeLinecap="round">
        {BEANS.map(([x, y, r]) => (
          <path key={`${x}${y}`} d="M-27 0C-13-7 13 7 27 0" transform={`translate(${x} ${y}) rotate(${r})`} />
        ))}
      </g>
    </svg>
  );
}

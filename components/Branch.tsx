import { useId, type CSSProperties } from "react";

export type BranchProps = {
  /** Cherry colour (hex). Blossom chapter still passes the green so the hidden clusters are ready. */
  cherry?: string;
  edge?: string;
  /** 1 = blossoms shown, cherries hidden. */
  bloom?: 0 | 1;
  /** Cherry cluster scale, .5 to 1.2 */
  size?: number;
  className?: string;
  style?: CSSProperties;
};

function shade(hex: string) {
  const n = hex.replace("#", "");
  const h = n.length === 3 ? n.split("").map((c) => c + c).join("") : n;
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  const mix = (c: number, t: number, k: number) => Math.round(c + (t - c) * k);
  const rgb = (R: number, G: number, B: number) => `rgb(${R},${G},${B})`;
  return {
    hi: rgb(mix(r, 255, 0.4), mix(g, 255, 0.4), mix(b, 255, 0.4)),
    mid: rgb(r, g, b),
    lo: rgb(mix(r, 0, 0.32), mix(g, 0, 0.32), mix(b, 0, 0.32)),
  };
}

const fade: CSSProperties = { transition: "stop-color .9s ease" };
const NODES: [number, number][] = [[92, 280], [180, 245], [282, 198], [394, 143]];
const CLUSTER_ROT = ["rotate(20)", "rotate(130)", "rotate(250) scale(1.05)", "rotate(-70) scale(.92)"];
const BLOOM_ROT = ["rotate(-30)", "rotate(80)", "rotate(200)", "rotate(-120) scale(.9)"];

type Grad = "lg" | "lu" | "ly";
function Leaf({ t, grad = "lg", id }: { t: string; grad?: Grad; id: (k: string) => string }) {
  return (
    <g transform={t}>
      <path d="M-9 0L2 0" stroke="#5B4332" strokeWidth="2.2" />
      <use href={`#${id("lf")}`} fill={`url(#${id(grad)})`} />
      <use href={`#${id("vn")}`} />
    </g>
  );
}

/** A single robusta branch, drawn once. Scrolling recolours it. */
export default function Branch({ cherry = "#D9463A", edge = "#5A1A14", bloom = 0, size = 1, className, style }: BranchProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (k: string) => `${k}-${uid}`;
  const { hi, mid, lo } = shade(cherry);
  const cop = 1 - bloom;
  const clusterStyle: CSSProperties = {
    opacity: cop,
    transform: `scale(${size})`,
    transformBox: "fill-box",
    transformOrigin: "center",
    transition: "opacity 1s ease, transform 1.2s ease",
  };
  const bloomStyle: CSSProperties = { opacity: bloom, transition: "opacity 1s ease" };

  return (
    <svg
      viewBox="0 0 520 360"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A single robusta branch: large glossy leaves and tight clusters of cherries at every node"
      className={className}
      style={{ display: "block", overflow: "visible", ...style }}
    >
      <defs>
        <linearGradient id={id("lg")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3F7343" /><stop offset=".5" stopColor="#2E5C35" />
          <stop offset=".5" stopColor="#1F4128" /><stop offset="1" stopColor="#173320" />
        </linearGradient>
        <linearGradient id={id("lu")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7FA06A" /><stop offset=".5" stopColor="#6B8E5A" />
          <stop offset=".5" stopColor="#587A4A" /><stop offset="1" stopColor="#4C6B40" />
        </linearGradient>
        <linearGradient id={id("ly")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8FA55A" /><stop offset=".5" stopColor="#7A944E" />
          <stop offset=".5" stopColor="#637B3E" /><stop offset="1" stopColor="#556B36" />
        </linearGradient>
        <radialGradient id={id("cg")} cx=".36" cy=".3" r=".8">
          <stop offset="0" stopColor={hi} style={fade} />
          <stop offset=".5" stopColor={mid} style={fade} />
          <stop offset="1" stopColor={lo} style={fade} />
        </radialGradient>
        <path id={id("lf")} d="M0 0C10-22 30-38 52-40C66-41 72-34 86-28C98-23 112-12 124 0C112 12 98 24 86 28C72 33 64 42 50 40C30 38 10 22 0 0Z" />
        <g id={id("vn")} fill="none" stroke="#C5D4A8" strokeLinecap="round">
          <path d="M4 0Q60-1 118 0" strokeWidth="1.5" opacity=".7" />
          <g strokeWidth=".9" opacity=".42">
            <path d="M16 0q12-12 26-19" /><path d="M32 0q12-14 28-21" /><path d="M50 0q12-14 28-19" />
            <path d="M68 0q12-12 26-15" /><path d="M86 0q10-8 20-10" /><path d="M16 0q12 12 26 19" />
            <path d="M32 0q12 14 28 21" /><path d="M50 0q12 14 28 19" /><path d="M68 0q12 12 26 15" />
            <path d="M86 0q10 8 20 10" />
          </g>
        </g>
        <g id={id("ch")}>
          <circle r="8" fill={`url(#${id("cg")})`} stroke={edge} strokeWidth=".8" style={{ transition: "stroke .9s ease" }} />
          <circle cy="-4.6" r="1.3" fill={edge} opacity=".5" style={{ transition: "fill .9s ease" }} />
        </g>
        <g id={id("clu")}>
          <g opacity=".92">
            {[[-21.4, 6], [18.2, -8.4], [8.6, 17.7], [-18.3, -17.5], [13.7, 8.3], [22.7, 13.1], [-2.1, -5.2], [29.3, -3], [13.6, -19.2], [-5.7, 11.9]].map(([x, y]) => (
              <use key={`${x},${y}`} href={`#${id("ch")}`} transform={`translate(${x} ${y})`} />
            ))}
          </g>
          {[[8.5, -11], [4.7, 3.1], [-15, -5.3], [-1.5, -20.9], [-14.7, 15.5], [-1.2, 20.6], [-8.9, -14.8], [21, 1.8], [-11.6, 3.8]].map(([x, y]) => (
            <use key={`${x},${y}`} href={`#${id("ch")}`} transform={`translate(${x} ${y})`} />
          ))}
          <use href={`#${id("ch")}`} transform="translate(1 -2) scale(1.08)" />
          <use href={`#${id("ch")}`} transform="translate(-9 8) scale(1.05)" />
          <use href={`#${id("ch")}`} transform="translate(10 6) scale(1.05)" />
        </g>
        <g id={id("fl")}>
          <g fill="#FFFFFF" stroke="#D5D0C2" strokeWidth=".5">
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} rx="2.5" ry="7.5" cy="-6.5" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r="1.9" fill="#E6C65A" />
        </g>
        <g id={id("blo")}>
          <g fill="#F4F1E6" stroke="#CFC9B6" strokeWidth=".5">
            <ellipse rx="2.6" ry="6" transform="translate(14 15.4) rotate(142)" />
            <ellipse rx="2.6" ry="6" transform="translate(-9.7 24.5) rotate(198)" />
            <ellipse rx="2.6" ry="6" transform="translate(31.5 .6) rotate(91)" />
            <ellipse rx="2.6" ry="6" transform="translate(-13.8 19.1) rotate(212)" />
            <ellipse rx="2.6" ry="6" transform="translate(12 -22.2) rotate(25)" />
            <ellipse rx="2.6" ry="6" transform="translate(-26 -8) rotate(110)" />
          </g>
          {[
            "translate(-17.1 -14.1) rotate(57) scale(1.15)", "translate(-1.8 -23.9) rotate(2) scale(1)",
            "translate(20.2 -6.4) rotate(65) scale(.9)", "translate(-11.7 2) rotate(39) scale(1.05)",
            "translate(11.2 .8) rotate(20) scale(1.15)", "translate(1 -8.3) rotate(57) scale(.9)",
            "translate(-6.7 -5.2) scale(1.1)", "translate(2.8 9.2) rotate(71) scale(1.12)",
            "translate(-7.1 24) rotate(39) scale(1.05)", "translate(8 23.3) rotate(50) scale(1.15)",
            "translate(10.3 -6.9) rotate(26) scale(.9)", "translate(-22 10) rotate(12) scale(.95)",
          ].map((t) => (
            <use key={t} href={`#${id("fl")}`} transform={t} />
          ))}
        </g>
      </defs>

      {/* leaves behind the stem */}
      <g>
        <Leaf id={id} t="translate(92 280) rotate(-138) translate(8 0) scale(.95)" />
        <Leaf id={id} t="translate(180 245) rotate(-118) translate(8 0)" />
        <Leaf id={id} t="translate(282 198) rotate(-108) translate(8 0) scale(1.05)" />
        <Leaf id={id} t="translate(394 143) rotate(-100) translate(8 0) scale(.9)" />
        <Leaf id={id} t="translate(500 89) rotate(-150) translate(6 0) scale(.55)" grad="ly" />
      </g>
      {/* stem */}
      <path d="M18 297C140 266 262 204 500 87L500 91C262 212 140 276 18 308Z" fill="#5B4332" />
      <path d="M18 297C140 266 262 204 500 87" fill="none" stroke="#8A6A52" strokeWidth="1.2" opacity=".7" />
      <path d="M18 308C140 276 262 212 500 91" fill="none" stroke="#3B2719" strokeWidth="1.2" opacity=".7" />
      {/* leaves in front */}
      <g>
        <Leaf id={id} t="translate(92 280) rotate(38) translate(8 0)" />
        <Leaf id={id} t="translate(180 245) rotate(58) translate(8 0) scale(.9)" />
        <Leaf id={id} t="translate(282 198) rotate(66) translate(8 0) scale(.95)" grad="lu" />
        <Leaf id={id} t="translate(394 143) rotate(74) translate(8 0) scale(.85)" />
        <Leaf id={id} t="translate(500 89) rotate(95) translate(6 0) scale(.5)" grad="ly" />
      </g>
      {/* clusters + blossoms at each node */}
      <g>
        {NODES.map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <g style={clusterStyle}><use href={`#${id("clu")}`} transform={CLUSTER_ROT[i]} /></g>
            <g style={bloomStyle}><use href={`#${id("blo")}`} transform={BLOOM_ROT[i]} /></g>
          </g>
        ))}
      </g>
    </svg>
  );
}

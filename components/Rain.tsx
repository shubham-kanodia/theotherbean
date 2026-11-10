const A = "M48 320l-4.7 26 M149 183l-3.8 21 M142 21l-3.7 21 M27 47l-5.1 29 M227 63l-5.0 28 M174 467l-4.3 24 M113 474l-5.6 32 M235 146l-3.7 21 M38 155l-4.0 23 M107 267l-5.8 33 M23 104l-3.8 21 M118 375l-4.0 22 M211 278l-5.9 33 M258 229l-6.5 37 M271 398l-5.8 33 M130 86l-3.6 20 M23 381l-4.0 22 M73 195l-4.0 23 M31 217l-6.6 37 M242 469l-4.8 27 M23 435l-5.9 34 M98 133l-3.9 22 M237 333l-7.0 40 M14 269l-6.1 34";
const B = "M10 169l-2.4 14 M143 35l-2.8 16 M217 483l-3.5 20 M76 23l-1.8 10 M78 67l-3.1 18 M249 413l-2.4 14 M45 465l-2.1 12 M193 48l-2.7 15 M189 218l-1.7 10 M256 323l-1.7 10 M236 232l-1.7 10 M153 468l-2.3 13 M40 268l-2.1 12 M34 84l-2.1 12 M59 160l-1.7 10 M209 148l-2.2 12 M153 97l-3.0 17 M256 56l-2.5 14 M121 249l-3.2 18 M268 173l-2.9 17 M195 318l-3.2 18 M24 376l-1.8 10 M48 226l-2.5 14 M263 491l-2.1 12 M162 269l-2.0 12 M182 359l-3.1 17 M110 165l-3.3 19 M18 419l-2.8 16 M229 284l-1.8 10 M73 377l-1.9 11 M244 103l-1.8 10 M256 12l-3.5 20 M164 181l-3.5 20 M126 377l-3.0 17 M76 327l-3.5 20 M116 209l-3.1 17 M79 491l-1.7 10 M140 320l-1.8 10 M109 114l-2.7 15 M19 33l-1.9 11";

/**
 * Two layers of falling rain, fixed over the viewport.
 * Opacity and colour come from CSS variables set per chapter on the root: --rain1, --rain2, --rain-color.
 */
export default function Rain() {
  return (
    <svg className="rain" aria-hidden="true">
      <defs>
        <pattern id="rainA" width="276" height="520" patternUnits="userSpaceOnUse">
          <path d={A} fill="none" style={{ stroke: "var(--rain-color)" }} strokeWidth="1.4" strokeLinecap="round" />
        </pattern>
        <pattern id="rainB" width="276" height="520" patternUnits="userSpaceOnUse">
          <path d={B} fill="none" style={{ stroke: "var(--rain-color)" }} strokeWidth="1" strokeLinecap="round" opacity=".6" />
        </pattern>
      </defs>
      <g className="rf rfB" style={{ opacity: "var(--rain2)" }}>
        <rect x="-500" y="-1700" width="4600" height="4800" fill="url(#rainB)" />
      </g>
      <g className="rf rfA" style={{ opacity: "var(--rain1)" }}>
        <rect x="-500" y="-1700" width="4600" height="4800" fill="url(#rainA)" />
      </g>
    </svg>
  );
}

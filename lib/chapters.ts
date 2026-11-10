export type BeanPalette = { fill: string; edge: string; crease: string };
export type StageKind = "branch" | "beans" | "none";

export type Chapter = {
  /** Mono eyebrow, e.g. "01 / March / Blossom showers" */
  eyebrow: string;
  /** Heading lines (rendered with <br> between them). */
  heading: string[];
  /** Large lead paragraph (hero only). `**text**` renders bold. */
  lead?: string;
  body?: string;
  /** Italic pull-quote. */
  quote?: string;
  /** Process steps row. */
  steps?: string[];
  /** Trailing mono line with a link into the shop. */
  link?: { prefix: string; label: string; href: string };
  /** Heading size variant. */
  size?: "hero" | "default" | "big";

  // palette + stage
  bg: string;
  fg: string;
  cherry: string;
  edge: string;
  bloom: 0 | 1;
  csize: number;
  rain1: number;
  rain2: number;
  rainColor: string;
  stage: StageKind;
  bean: BeanPalette;
};

export const BEANS = {
  parchment: { fill: "#F4EEDF", edge: "#B8A98A", crease: "#B8A98A" },
  gold: { fill: "#EBD58F", edge: "#9E7F2E", crease: "#9E7F2E" },
  roast: { fill: "#231209", edge: "#231209", crease: "#7A5438" },
} satisfies Record<string, BeanPalette>;

export const chapters: Chapter[] = [
  {
    eyebrow: "01 / March / Blossom showers",
    heading: ["Other to the world.", "Home to India."],
    lead: "Roughly **70%** of the coffee India grows is robusta.",
    body: "The first rain. Within days the hills flower white and smell of jasmine, for about three days.",
    size: "hero",
    bg: "#F7F4EC", fg: "#1F1B16", cherry: "#4F7F26", edge: "#2E5316", bloom: 1, csize: 0.6,
    rain1: 0.3, rain2: 0.55, rainColor: "rgba(86,100,116,.55)", stage: "branch", bean: BEANS.parchment,
  },
  {
    eyebrow: "02 / April / Backing showers",
    heading: ["The second rain sets the fruit."],
    body: "Petals fall. Tiny green cherries appear along the branch.",
    quote: "Everything after this is waiting.",
    bg: "#96A85F", fg: "#16200C", cherry: "#4F7F26", edge: "#2E5316", bloom: 0, csize: 0.72,
    rain1: 0.45, rain2: 0.7, rainColor: "rgba(255,255,255,.62)", stage: "branch", bean: BEANS.parchment,
  },
  {
    eyebrow: "03 / June to September / The monsoon",
    heading: ["The Western Ghats are where the monsoon lands first."],
    body: "For four months the page is rain. The cherries fatten under a canopy of jackfruit and silver oak, and the gauge climbs.",
    bg: "#3E5345", fg: "#EEF0E8", cherry: "#6E9A3C", edge: "#2E5316", bloom: 0, csize: 0.92,
    rain1: 1, rain2: 1, rainColor: "rgba(255,255,255,.66)", stage: "branch", bean: BEANS.parchment,
  },
  {
    eyebrow: "04 / November to January / The dry months",
    heading: ["The rain stops. The clusters turn red."],
    body: "Picked by hand. Ripe only.",
    bg: "#A8332A", fg: "#FBEDE6", cherry: "#D9463A", edge: "#5A1A14", bloom: 0, csize: 1,
    rain1: 0, rain2: 0, rainColor: "rgba(255,255,255,.5)", stage: "branch", bean: BEANS.parchment,
  },
  {
    eyebrow: "05 / February / Washing",
    heading: ["Most of the world sun-dries robusta and hopes. India washes it."],
    steps: ["Pulped", "Fermented", "Rinsed", "Raked into lines on the drying yard"],
    link: { prefix: "Chapter one of three coffees", label: "Washed", href: "#shop" },
    bg: "#E8DCC2", fg: "#2C2416", cherry: "#D9463A", edge: "#5A1A14", bloom: 0, csize: 1,
    rain1: 0, rain2: 0, rainColor: "rgba(86,100,116,.5)", stage: "beans", bean: BEANS.parchment,
  },
  {
    eyebrow: "06 / June, again / Monsooning",
    heading: ["Some of it goes to the coast."],
    body: "It sits in open warehouses in the monsoon wind for weeks, until it swells and turns pale gold.",
    quote: "The one coffee process anywhere that uses the monsoon as an ingredient.",
    link: { prefix: "Chapter three of three coffees", label: "Monsooned", href: "#shop" },
    bg: "#D4B264", fg: "#2B2008", cherry: "#D9463A", edge: "#5A1A14", bloom: 0, csize: 1,
    rain1: 0.6, rain2: 0.8, rainColor: "rgba(255,255,255,.62)", stage: "beans", bean: BEANS.gold,
  },
  {
    eyebrow: "07 / The roast",
    heading: ["Brown. Finally."],
    size: "big",
    bg: "#46291A", fg: "#F3E8DA", cherry: "#D9463A", edge: "#5A1A14", bloom: 0, csize: 1,
    rain1: 0, rain2: 0, rainColor: "rgba(255,255,255,.5)", stage: "beans", bean: BEANS.roast,
  },
  {
    eyebrow: "08 / The cup",
    heading: ["A crema you can stand a spoon in."],
    body: "Three coffees. Three chapters of the same year.",
    bg: "#C9A373", fg: "#2E1A0D", cherry: "#D9463A", edge: "#5A1A14", bloom: 0, csize: 1,
    rain1: 0, rain2: 0, rainColor: "rgba(255,255,255,.5)", stage: "none", bean: BEANS.roast,
  },
];

/** Cumulative share of the season's rain at each chapter boundary (0..1). */
export const RAIN_CURVE = [0, 0.017, 0.067, 0.817, 0.85, 0.867, 0.95, 0.975, 1];

/** Fraction of total rainfall for a page scroll progress p in [0,1]. */
export function rainFraction(p: number): number {
  const n = RAIN_CURVE.length - 1;
  const seg = Math.min(n - 1, Math.floor(p * n));
  const t = p * n - seg;
  return RAIN_CURVE[seg] + (RAIN_CURVE[seg + 1] - RAIN_CURVE[seg]) * t;
}

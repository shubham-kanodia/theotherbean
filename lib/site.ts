export const site = {
  name: "The Other Bean",
  url: "https://theotherbean.in",
  tagline: "Other to the world. Home to India.",
  description:
    "Roughly 70% of the coffee India grows is robusta. One year of it, told by the rain. Washed, Cherry and Monsooned robusta from the Western Ghats.",
  nav: [
    { label: "The year", href: "#year" },
    { label: "Shop", href: "#shop" },
  ],
  footerLine: "The Other Bean · Robusta · Western Ghats · Washed, Cherry, Monsooned",
  footerQuote: ["Every cherry carries two.", "Meet the other one."],
  /** Total season rainfall shown on the gauge, in inches. */
  gaugeTotal: 120,
} as const;

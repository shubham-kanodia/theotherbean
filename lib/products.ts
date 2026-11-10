export type Product = {
  slug: string;
  /** Short colour name used as the tile tag. */
  tag: string;
  name: string;
  tile: { bg: string; fg: string; border?: boolean };
  blurb: string;
  /** Replace with the real price, e.g. "₹650". */
  price: string;
  weight: string;
};

export const products: Product[] = [
  {
    slug: "washed",
    tag: "Parchment",
    name: "Washed",
    tile: { bg: "#E8DCC2", fg: "#2C2416", border: true },
    blurb: "Pulped, fermented, rinsed, raked. Clean, bright, a little cocoa.",
    price: "[YOUR PRICE]",
    weight: "250 g",
  },
  {
    slug: "cherry",
    tag: "Red",
    name: "Cherry",
    tile: { bg: "#A8332A", fg: "#FBEDE6" },
    blurb: "The natural. Dried whole in the fruit. Heavy, sweet, dried-fig.",
    price: "[YOUR PRICE]",
    weight: "250 g",
  },
  {
    slug: "monsooned",
    tag: "Gold",
    name: "Monsooned",
    tile: { bg: "#D4B264", fg: "#2B2008" },
    blurb: "Swollen in the monsoon wind. Soft, low-acid, old-wood and spice.",
    price: "[YOUR PRICE]",
    weight: "250 g",
  },
];

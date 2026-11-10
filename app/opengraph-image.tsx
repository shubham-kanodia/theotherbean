import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function fraunces(): ArrayBuffer | null {
  try {
    const buf = readFileSync(join(process.cwd(), "assets/fonts/Fraunces-Light.ttf"));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } catch {
    return null;
  }
}

export default async function Image() {
  const font = fraunces();
  const family = font ? "Fraunces" : "serif";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          background: "#F7F4EC", color: "#1F1B16", padding: "64px 72px", fontFamily: family, fontWeight: 300,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 36 }}>
          <span>The</span>
          <svg width="44" height="44" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="#C8352B" stroke="#5A1A14" strokeWidth="3" />
            <circle cx="50" cy="50" r="34" fill="#F2D9C4" />
            <ellipse cx="38" cy="50" rx="12" ry="19" transform="rotate(-10 38 50)" fill="#3B2314" />
            <ellipse cx="62" cy="50" rx="12" ry="19" transform="rotate(10 62 50)" fill="none" stroke="#3B2314" strokeWidth="4" />
          </svg>
          <span style={{ fontWeight: 600, letterSpacing: "0.06em" }}>THER</span>
          <span>Bean</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, lineHeight: 1.02, letterSpacing: "-0.015em" }}>Other to the world.</div>
          <div style={{ fontSize: 104, lineHeight: 1.02, letterSpacing: "-0.015em" }}>Home to India.</div>
          <div style={{ marginTop: 36, fontSize: 34, opacity: 0.8 }}>Roughly 70% of the coffee India grows is robusta.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, opacity: 0.6, letterSpacing: "0.1em" }}>
          <span>ROBUSTA · WESTERN GHATS</span>
          <span>WASHED · CHERRY · MONSOONED</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Fraunces", data: font, weight: 300, style: "normal" }] : undefined,
    },
  );
}

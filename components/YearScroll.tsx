"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { chapters, rainFraction } from "@/lib/chapters";
import Rain from "./Rain";
import Stage from "./Stage";
import Petals from "./Petals";
import RainGauge from "./RainGauge";

/**
 * Owns the scroll state for the one-page year: which chapter is active (ch) and overall progress (p).
 * Palette and rain go onto the root as inline style + CSS variables so the colour changes are CSS transitions.
 */
export default function YearScroll({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ch, setCh] = useState(0);
  const [p, setP] = useState(0);
  const stateRef = useRef({ ch: 0, p: 0 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;

    const tick = () => {
      raf = 0;
      const vh = window.innerHeight || 800;
      const r = root.getBoundingClientRect();
      const prog = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
      let next = 0;
      const mid = vh * 0.5;
      root.querySelectorAll<HTMLElement>("[data-ch]").forEach((s, i) => {
        if (s.getBoundingClientRect().top <= mid) next = i;
      });
      root.style.setProperty("--sy", String(window.scrollY));
      const cur = stateRef.current;
      if (next !== cur.ch) { cur.ch = next; setCh(next); }
      if (Math.abs(prog - cur.p) > 0.002) { cur.p = prog; setP(prog); }
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(tick); };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    tick();

    // Cursor parallax for the hero, lerped. Skipped on touch and for reduced motion.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    let pointerRaf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const lerp = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      root.style.setProperty("--px", cx.toFixed(3));
      root.style.setProperty("--py", cy.toFixed(3));
      pointerRaf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(lerp) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!pointerRaf) pointerRaf = requestAnimationFrame(lerp);
    };
    if (!reduce && !touch) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
      if (pointerRaf) cancelAnimationFrame(pointerRaf);
    };
  }, []);

  const s = chapters[ch] ?? chapters[0];
  const style = {
    backgroundColor: s.bg,
    color: s.fg,
    "--rain1": s.rain1,
    "--rain2": s.rain2,
    "--rain-color": s.rainColor,
  } as CSSProperties;

  return (
    <div ref={rootRef} id="year-root" className="year" data-ch={ch} style={style}>
      <Rain />
      <Stage ch={ch} />
      <Petals />
      <RainGauge fraction={rainFraction(p)} />
      {children}
    </div>
  );
}

"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { chapters } from "@/lib/chapters";
import Branch from "./Branch";
import Beans from "./Beans";

type Pose = { x: number; y: number; r: number; s: number };
const W0 = 520, H0 = 360;

/** Poses are centres + rotation + scale of a 520×360 box, in viewport px. */
function poses(W: number, H: number) {
  const mobile = W <= 760;
  const w = mobile ? 0.64 * W : Math.min(520, 0.38 * W);
  const s = w / W0;
  const h = H0 * s;
  const standard: Pose = mobile
    ? { x: W + 0.08 * W - w / 2, y: H - 10 - h / 2, r: 0, s }
    : { x: W - 0.07 * W - w / 2, y: H / 2, r: 0, s };
  // Hero B's placement on the 1440×900 board, scaled to the viewport.
  const hero: Pose = mobile
    ? { x: 0.76 * W, y: 0.8 * H, r: -40, s: Math.max(0.85, (1.6 * W) / 700) }
    : { x: 0.72 * W, y: 0.76 * H, r: -40, s: Math.max(1.2, Math.min((2.2 * W) / 1440, (2.2 * H) / 820)) };
  const depth: Pose = mobile
    ? { x: 0.3 * W, y: 0.9 * H, r: -22, s: 0.7 }
    : { x: 0.52 * W, y: 0.3 * H, r: -22, s: Math.max(0.9, Math.min((1.5 * W) / 1440, (1.5 * H) / 820)) };
  return { standard, hero, depth, mobile };
}

const tf = ({ x, y, r, s }: Pose) => `translate(${(x - W0 / 2).toFixed(1)}px, ${(y - H0 / 2).toFixed(1)}px) rotate(${r}deg) scale(${s.toFixed(3)})`;

/** The fixed stage: one branch (plus a faint one behind it in the hero), then the beans. */
export default function Stage({ ch }: { ch: number }) {
  const [vp, setVp] = useState({ W: 1440, H: 900 });
  useEffect(() => {
    const read = () => setVp({ W: window.innerWidth, H: window.innerHeight });
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  const s = chapters[ch] ?? chapters[0];
  const { standard, hero, depth, mobile } = poses(vp.W, vp.H);
  const isHero = ch === 0;
  const branchPose = isHero ? hero : standard;

  const box: CSSProperties = { position: "absolute", left: 0, top: 0, width: W0, height: H0, transformOrigin: "center" };

  return (
    <div className="stage-par" aria-hidden="true">
      <div
        className="stage-layer stage-depth"
        style={{ ...box, transform: tf(depth), opacity: isHero && !mobile ? 0.32 : 0 }}
      >
        <Branch cherry={s.cherry} edge={s.edge} bloom={1} size={0.55} />
      </div>
      <div
        className="stage-layer stage-branch"
        style={{ ...box, transform: tf(branchPose), opacity: s.stage === "branch" ? 1 : 0 }}
      >
        <Branch cherry={s.cherry} edge={s.edge} bloom={s.bloom} size={s.csize} />
      </div>
      <div
        className="stage-layer stage-beans"
        style={{ ...box, transform: tf(standard), opacity: s.stage === "beans" ? 1 : 0 }}
      >
        <Beans {...s.bean} />
      </div>
    </div>
  );
}

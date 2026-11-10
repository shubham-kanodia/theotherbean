import { site } from "@/lib/site";

export default function RainGauge({ fraction }: { fraction: number }) {
  const total = site.gaugeTotal;
  const inches = Math.round(fraction * total);
  return (
    <div className="gauge" aria-live="polite">
      <div className="mono gauge__title">Rain gauge</div>
      <div className="gauge__tube" role="img" aria-label={`Rain gauge showing ${inches} of ${total} inches so far this season`}>
        <div className="gauge__fill" style={{ height: `${(fraction * 100).toFixed(1)}%` }} />
        <div className="gauge__tick" style={{ top: "25%" }} />
        <div className="gauge__tick" style={{ top: "50%" }} />
        <div className="gauge__tick" style={{ top: "75%" }} />
      </div>
      <div className="mono gauge__label">{inches} in / {total}</div>
    </div>
  );
}

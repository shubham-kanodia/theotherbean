import type { ReactNode } from "react";
import type { Chapter as ChapterData } from "@/lib/chapters";

/** Renders `**bold**` spans inside a copy string. */
function inline(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

function lines(parts: string[]): ReactNode[] {
  return parts.flatMap((l, i) => (i ? [<br key={`br${i}`} />, l] : [l]));
}

type Props = { index: number; data: ChapterData; id?: string; className?: string; children?: ReactNode };

export default function Chapter({ index, data, id, className, children }: Props) {
  const size = data.size ?? "default";
  const Heading = size === "hero" ? "h1" : "h2";
  return (
    <section id={id} data-ch={index} className={`ch ch--${size}${className ? ` ${className}` : ""}`}>
      <p className="mono eyebrow">{data.eyebrow}</p>
      <Heading className="heading">{lines(data.heading)}</Heading>
      {data.lead && <p className="lead">{inline(data.lead)}</p>}
      {data.body && <p className="body">{data.body}</p>}
      {data.steps && (
        <div className="steps mono">
          {data.steps.flatMap((st, i) => (i ? [<span key={`a${i}`} aria-hidden="true">→</span>, <span key={st}>{st}</span>] : [<span key={st}>{st}</span>]))}
        </div>
      )}
      {data.quote && <p className="quote">{data.quote}</p>}
      {data.link && (
        <p className="mono linkline">
          {data.link.prefix}: <a href={data.link.href}>{data.link.label}</a>
        </p>
      )}
      {children}
    </section>
  );
}

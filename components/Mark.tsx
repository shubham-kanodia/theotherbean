type Props = { size?: number; className?: string; label?: string; reversed?: boolean };

/** The O of the wordmark: a cherry cut open, two beans inside, one filled in. */
export default function Mark({ size = 26, className, label, reversed }: Props) {
  const ring = reversed ? "#F3E8DA" : "#5A1A14";
  const a11y = label ? { role: "img" as const, "aria-label": label } : { "aria-hidden": true };
  if (size <= 20) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={className} {...a11y}>
        <circle cx="50" cy="50" r="46" fill="#C8352B" />
        <circle cx="50" cy="50" r="32" fill="#F2D9C4" />
        <ellipse cx="38" cy="50" rx="13" ry="20" fill="#3B2314" />
        <ellipse cx="62" cy="50" rx="13" ry="20" fill="none" stroke="#3B2314" strokeWidth="6" />
      </svg>
    );
  }
  if (size <= 32) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={className} {...a11y}>
        <circle cx="50" cy="50" r="46" fill="#C8352B" stroke={ring} strokeWidth="3" />
        <circle cx="50" cy="50" r="34" fill="#F2D9C4" />
        <ellipse cx="38" cy="50" rx="12" ry="19" transform="rotate(-10 38 50)" fill="#3B2314" />
        <ellipse cx="62" cy="50" rx="12" ry="19" transform="rotate(10 62 50)" fill="none" stroke="#3B2314" strokeWidth="4" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} {...a11y}>
      <circle cx="50" cy="50" r="46" fill="#C8352B" stroke={ring} strokeWidth="3" />
      <circle cx="50" cy="50" r="34" fill="#F2D9C4" />
      <ellipse cx="38" cy="50" rx="12" ry="19" transform="rotate(-10 38 50)" fill="#3B2314" />
      <path d="M38 33V67" stroke="#F2D9C4" strokeWidth="2.5" transform="rotate(-10 38 50)" />
      <ellipse cx="62" cy="50" rx="12" ry="19" transform="rotate(10 62 50)" fill="none" stroke="#3B2314" strokeWidth="3" />
      <path d="M62 33V67" stroke="#3B2314" strokeWidth="2.5" transform="rotate(10 62 50)" />
    </svg>
  );
}

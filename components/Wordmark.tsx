import Mark from "./Mark";

type Props = { size?: "nav" | "footer" };

/** "The ⊙THER Bean" — the cherry mark is the O. */
export default function Wordmark({ size = "nav" }: Props) {
  const mark = size === "nav" ? 26 : 34;
  return (
    <span className={`lockup lockup--${size}`}>
      <span className="lockup__light">The</span>
      <span className="lockup__word">
        <Mark size={mark} label="O" />
        <span>THER</span>
      </span>
      <span className="lockup__light">Bean</span>
    </span>
  );
}

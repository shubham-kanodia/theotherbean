import { site } from "@/lib/site";
import Wordmark from "./Wordmark";

export default function Header() {
  return (
    <header className="header">
      <a href="#year" className="header__brand" aria-label={`${site.name} — back to the top`}>
        <Wordmark />
      </a>
      <nav className="mono header__nav" aria-label="Primary">
        {site.nav.map((n) => (
          <a key={n.href} href={n.href}>{n.label}</a>
        ))}
      </nav>
    </header>
  );
}

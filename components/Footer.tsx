import { site } from "@/lib/site";
import Mark from "./Mark";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__lead">
        <Mark size={72} label={`${site.name} mark`} />
        <p className="footer__quote">
          {site.footerQuote[0]}<br />{site.footerQuote[1]}
        </p>
      </div>
      <p className="mono footer__line">{site.footerLine}</p>
    </footer>
  );
}

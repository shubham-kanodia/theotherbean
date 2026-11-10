import { chapters } from "@/lib/chapters";
import YearScroll from "@/components/YearScroll";
import Header from "@/components/Header";
import Chapter from "@/components/Chapter";
import Shop from "@/components/Shop";
import Footer from "@/components/Footer";

export default function Home() {
  const last = chapters.length - 1;
  return (
    <YearScroll>
      <Header />
      <main className="main">
        {chapters.map((c, i) =>
          i === last ? (
            <Chapter key={i} index={i} data={c} id="shop" className="ch--shop">
              <Shop />
            </Chapter>
          ) : (
            <Chapter key={i} index={i} data={c} id={i === 0 ? "year" : undefined} />
          ),
        )}
        <Footer />
      </main>
    </YearScroll>
  );
}

import { products } from "@/lib/products";

export default function Shop() {
  return (
    <div className="shop">
      {products.map((p) => (
        <article key={p.slug} className="product">
          <div
            className={`product__tile${p.tile.border ? " product__tile--bordered" : ""}`}
            style={{ background: p.tile.bg, color: p.tile.fg }}
          >
            <span className="mono product__tag">{p.tag}</span>
            <span className="product__name">{p.name}</span>
          </div>
          <p className="product__blurb">{p.blurb}</p>
          <div className="product__row">
            <span className="mono product__price">{p.price} / {p.weight}</span>
            <button type="button" className="btn" aria-label={`Add ${p.name} to cart`}>Add to cart</button>
          </div>
        </article>
      ))}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../anim/Reveal";
import AddToCartButton from "../cart/AddToCartButton";
import { getCatalog } from "../../utils/catalog";

export default async function FeaturedProducts() {
  const { products } = await getCatalog().catch(() => ({ products: [] }));
  const featured = products.slice(0, 8);

  if (featured.length === 0) return null;

  return (
    <section className="featured section" id="featured">
      <div className="wrap">
        <div className="featured-head">
          <div>
            <p className="eyebrow">Best of the range</p>
            <h2>
              A few of our <em>favourites.</em>
            </h2>
          </div>
        </div>

        <Reveal className="product-grid" stagger scroll y={20}>
          {featured.map((p, i) => (
            <article className="product-card" key={p.slug}>
              <div className="frame-wrap">
                <Link href={`/shop/${p.slug}`} className="frame">
                  <Image
                    src={p.image || "/file.svg"}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1080px) 33vw, 25vw"
                  />
                  <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cta-mini">
                    <ArrowUpRight size={17} />
                  </span>
                </Link>
                <AddToCartButton product={p} />
              </div>
              <div className="product-meta">
                <div>
                  <span className="cat">{p.category}</span>
                  <h3>
                    <Link href={`/shop/${p.slug}`}>{p.name}</Link>
                  </h3>
                </div>
                <span className="price">{p.priceLabel}</span>
              </div>
            </article>
          ))}
        </Reveal>

        <div className="featured-foot">
          <Link href="/shop" className="btn btn-orange">
            Shop all products <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

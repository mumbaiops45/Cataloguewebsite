import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Reveal from "../../components/anim/Reveal";
import { products, getProduct, getRelatedProducts } from "../../lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="pdp wrap section-sm">
      <div className="breadcrumb">
        <Link href="/shop">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.categorySlug}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="pdp-grid">
        <Reveal className="pdp-media">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1080px) 100vw, 55vw"
          />
        </Reveal>

        <div className="pdp-info">
          <p className="cat">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="price">{product.priceLabel}</p>
          <p>{product.description}</p>

          <div className="pdp-actions">
            <a href="mailto:selfesteem.disabled@gmail.com?subject=Order%20enquiry" className="btn btn-orange">
              Enquire to order <ArrowUpRight size={16} />
            </a>
            <Link href="/shop" className="btn btn-ghost">
              <ArrowLeft size={16} /> Back to shop
            </Link>
          </div>

          <div className="pdp-note">
            Handmade to order by differently-abled artisans at SEFD, Airoli.
            Slight variation in colour and finish is the mark of a piece made by
            hand. Bulk &amp; corporate gifting welcome.
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section style={{ marginTop: "clamp(64px, 10vw, 130px)" }}>
          <p className="eyebrow">More from {product.category}</p>
          <Reveal className="product-grid" stagger scroll={false} y={20} style={{ marginTop: 32 }}>
            {related.map((p, i) => (
              <article className="product-card" key={p.slug}>
                <Link href={`/shop/${p.slug}`} className="frame">
                  <Image src={p.image} alt={p.name} fill sizes="25vw" />
                  <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cta-mini">
                    <ArrowUpRight size={17} />
                  </span>
                </Link>
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
        </section>
      )}
    </div>
  );
}

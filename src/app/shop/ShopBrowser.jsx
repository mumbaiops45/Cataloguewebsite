"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import { products, categories } from "../lib/products";

const SORTS = {
  featured: { label: "Featured", fn: (a, b) => a.id - b.id },
  "price-asc": { label: "Price · low to high", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price · high to low", fn: (a, b) => b.price - a.price },
  name: { label: "A – Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

export default function ShopBrowser() {
  const params = useSearchParams();
  const initial = params.get("category") || "all";

  const [cat, setCat] = useState(initial);
  const [sort, setSort] = useState("featured");

  const pick = (next) => {
    setCat(next);
    const url =
      next === "all" ? "/shop" : `/shop?category=${next}`;
    window.history.replaceState(null, "", url);
  };

  const list = useMemo(() => {
    const filtered =
      cat === "all"
        ? products
        : products.filter((p) => p.categorySlug === cat);
    return [...filtered].sort(SORTS[sort].fn);
  }, [cat, sort]);

  return (
    <>
      <div className="shop-tools">
        <div className="wrap shop-tools-inner">
          <div className="filters">
            <button
              className={`filter ${cat === "all" ? "active" : ""}`}
              onClick={() => pick("all")}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                className={`filter ${cat === c.slug ? "active" : ""}`}
                onClick={() => pick(c.slug)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span className="shop-count">{list.length} items</span>
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
            >
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <section className="wrap section-sm">
        <Reveal className="product-grid" stagger scroll={false} y={20} key={cat + sort}>
          {list.map((p, i) => (
            <article className="product-card" key={p.slug}>
              <Link href={`/shop/${p.slug}`} className="frame">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1080px) 33vw, 25vw"
                />
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

          {list.length === 0 && (
            <p className="shop-empty">Nothing here yet — try another category.</p>
          )}
        </Reveal>
      </section>
    </>
  );
}

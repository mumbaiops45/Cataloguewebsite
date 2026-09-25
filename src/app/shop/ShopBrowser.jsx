"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import AddToCartButton from "../components/cart/AddToCartButton";

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price · low to high", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price · high to low", fn: (a, b) => b.price - a.price },
  name: { label: "A – Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

const PAGE_SIZE = 12;

export default function ShopBrowser({ initialCategories = [], initialProducts = [], searchIds = null }) {
  const params = useSearchParams();
  const initial = params.get("category") || "all";

  const [categories] = useState(initialCategories);
  const [products] = useState(initialProducts);
  const [cat, setCat] = useState(initial);
  const [sort, setSort] = useState("featured");
  const q = params.get("q") || "";
  const [page, setPage] = useState(1);

  const pick = (next) => {
    setCat(next);
    setPage(1);
    // keep the search query when switching category
    const qs = new URLSearchParams();
    if (next !== "all") qs.set("category", next);
    if (q) qs.set("q", q);
    const str = qs.toString();
    window.history.replaceState(null, "", str ? `/shop?${str}` : "/shop");
  };

  const list = useMemo(() => {
    // the server ran the keyword search against the backend; fall back to a
    // local name match if it didn't (e.g. the search request failed)
    const matchIds = q && searchIds ? new Set(searchIds) : null;
    const needle = q.trim().toLowerCase();
    const filtered = products.filter((p) => {
      if (cat !== "all" && p.categorySlug !== cat) return false;
      if (matchIds) return matchIds.has(String(p.id));
      if (needle && !p.name.toLowerCase().includes(needle)) return false;
      return true;
    });
    return [...filtered].sort(SORTS[sort].fn);
  }, [cat, sort, q, searchIds, products]);

  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageList = useMemo(
    () => list.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [list, currentPage]
  );

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
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
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
        {q && (
          <div className="shop-search-bar">
            <span>
              {list.length} result{list.length === 1 ? "" : "s"} for <b>“{q}”</b>
            </span>
            <Link href={cat === "all" ? "/shop" : `/shop?category=${cat}`} className="shop-search-clear">
              <X size={14} /> Clear search
            </Link>
          </div>
        )}
        <Reveal className="product-grid" stagger scroll={false} y={20} key={q + cat + sort + currentPage}>
          {pageList.map((p, i) => (
            <article className="product-card" key={p.slug}>
              <div className="frame-wrap">
                <Link href={`/shop/${p.slug}`} className="frame">
                  <Image
                    src={p.image || "/file.svg"}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1080px) 33vw, 25vw"
                  />
                  <span className="idx">{String((currentPage - 1) * PAGE_SIZE + i + 1).padStart(2, "0")}</span>
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

          {list.length === 0 && (
            <p className="shop-empty">
              {q ? `No products match “${q}”. Try another word.` : "Nothing here yet — try another category."}
            </p>
          )}
        </Reveal>

        {totalPages > 1 && (
          <nav className="shop-pagination" aria-label="Product pages">
            <button
              className="filter"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`filter ${n === currentPage ? "active" : ""}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              className="filter"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </nav>
        )}
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2, Package } from "lucide-react";
import { getProducts } from "../../router/product.router";
import { getProductMedia } from "../../router/productMedia.router";

const LIMIT = 6;
const fmtPrice = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

// Live "matching products" dropdown shown under a search input.
// Debounced — hits GET /api/product?keyword= 250ms after typing stops.
export default function SearchSuggest({ query, visible, onPick }) {
  const q = query.trim();
  const [state, setState] = useState({ q: "", items: [], loading: false });

  useEffect(() => {
    if (q.length < 2) return;
    let alive = true;
    const t = setTimeout(async () => {
      setState((s) => ({ ...s, loading: true }));
      try {
        const products = (await getProducts({ keyword: q, limit: LIMIT }))
          .filter((p) => p.isActive !== false)
          .slice(0, LIMIT);
        const items = await Promise.all(
          products.map(async (p) => {
            const media = await getProductMedia(p._id);
            const primary = media.find((m) => m.isPrimary) || media[0];
            return { id: p._id, slug: p.slug, name: p.name, price: p.price, image: primary?.url || "" };
          })
        );
        if (alive) setState({ q, items, loading: false });
      } catch {
        if (alive) setState({ q, items: [], loading: false });
      }
    }, 250);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [q]);

  if (!visible || q.length < 2) return null;
  const stale = state.q !== q;
  const loading = state.loading || stale;

  return (
    <div className="search-suggest" role="listbox">
      {loading && !state.items.length ? (
        <div className="search-suggest-empty">
          <Loader2 size={15} className="spin" /> Searching…
        </div>
      ) : !state.items.length ? (
        <div className="search-suggest-empty">No products match “{q}”</div>
      ) : (
        <>
          <div className="search-suggest-head">
            <span>Product</span>
            <span>Price</span>
          </div>
          {state.items.map((p) => (
            <Link
              key={p.id}
              href={`/shop/${p.slug}`}
              className="search-suggest-row"
              role="option"
              aria-selected="false"
              onClick={onPick}
            >
              <span className="search-suggest-thumb">
                {p.image ? (
                  <Image src={p.image} alt="" fill sizes="40px" style={{ objectFit: "cover" }} />
                ) : (
                  <Package size={16} />
                )}
              </span>
              <span className="search-suggest-name">{p.name}</span>
              <span className="search-suggest-price">{fmtPrice(p.price)}</span>
            </Link>
          ))}
          <Link
            href={`/shop?q=${encodeURIComponent(q)}`}
            className="search-suggest-all"
            onClick={onPick}
          >
            View all results for “{q}” <ArrowRight size={14} />
          </Link>
        </>
      )}
    </div>
  );
}

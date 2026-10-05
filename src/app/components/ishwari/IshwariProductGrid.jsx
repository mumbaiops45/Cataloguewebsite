"use client";

import Image from "../ui/SmartImage";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../anim/Reveal";
import AddToCartButton from "../cart/AddToCartButton";

const PAGE_SIZE = 15; // 3 full rows of 5

// Ishwari products from the backend (category "ishwari"), paginated.
export default function IshwariProductGrid({ products = [] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageList = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const go = (n) => {
    setPage(n);
    document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!products.length) {
    return <p className="shop-empty">No Ishwari products yet — check back soon.</p>;
  }

  return (
    <>
      <Reveal className="product-grid" stagger scroll={false} y={20} key={currentPage}>
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
      </Reveal>

      {totalPages > 1 && (
        <nav className="shop-pagination" aria-label="Ishwari product pages">
          <button className="filter" onClick={() => go(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} className={`filter ${n === currentPage ? "active" : ""}`} onClick={() => go(n)}>
              {n}
            </button>
          ))}
          <button
            className="filter"
            onClick={() => go(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      )}
    </>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ShoppingBag, Zap } from "lucide-react";
import Reveal from "../anim/Reveal";
import { useCart } from "../cart/CartContext";
import { ishwariCatalogue } from "../../lib/site";

export default function IshwariProductGrid() {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(null);

  const toProduct = (p) => ({
    id: `ishwari-${p.slug}`,
    name: p.name,
    price: p.price,
    image: p.img,
  });

  const handleAdd = (p) => {
    addItem(toProduct(p));
    setAdded(p.slug);
    window.setTimeout(() => setAdded((cur) => (cur === p.slug ? null : cur)), 1600);
  };

  const handleBuyNow = (p) => {
    addItem(toProduct(p));
    router.push("/cart");
  };

  return (
    <Reveal className="product-grid" stagger scroll y={20}>
      {ishwariCatalogue.map((p, i) => (
        <article className="product-card" key={p.slug}>
          <div className="frame">
            <Image
              src={p.img}
              alt={p.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1080px) 33vw, 25vw"
            />
            <span className="idx">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <div className="product-meta">
            <div>
              <span className="cat">Ishwari</span>
              <h3>{p.name}</h3>
            </div>
            <span className="price">{p.priceLabel}/-</span>
          </div>
          <div className="product-actions">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => handleAdd(p)}
            >
              {added === p.slug ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : (
                <>
                  <ShoppingBag size={14} /> Add to Cart
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-orange btn-sm"
              onClick={() => handleBuyNow(p)}
            >
              <Zap size={14} /> Buy Now
            </button>
          </div>
        </article>
      ))}
    </Reveal>
  );
}

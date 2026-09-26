"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Truck } from "lucide-react";
import { useShippingStore } from "../../store/shippingStore";

const fmt = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const ROTATE_MS = 4000;

// one short line per shipping slab, e.g. "Orders ₹0 – ₹499 · Shipping ₹60"
const slabLine = (r) => {
  const open = r.maxOrderValue === undefined || r.maxOrderValue === null;
  const range = open ? `${fmt(r.minOrderValue)} & above` : `${fmt(r.minOrderValue)} – ${fmt(r.maxOrderValue)}`;
  if (r.shippingFee === 0) {
    return r.minOrderValue > 0 ? `Free shipping on orders of ${fmt(r.minOrderValue)} & above` : `Free shipping on orders ${range}`;
  }
  return `Orders ${range} · Shipping ${fmt(r.shippingFee)}`;
};

export default function AnnounceBar() {
  const rates = useShippingStore((s) => s.rates);
  const [index, setIndex] = useState(0);

  const lines = rates.map(slabLine);
  const count = lines.length + 1; // tagline + one line per slab

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(id);
  }, [count]);

  const current = index % count;

  return (
    <div className="announce">
      <div className="wrap announce-inner">
        <span className="announce-msg" key={current} aria-live="polite">
          {current === 0 ? (
            <>
              <b>Beyond charity</b> — a life with self esteem &amp; dignity
            </>
          ) : (
            <>
              <Truck size={13} className="announce-icon" />
              {lines[current - 1]}
            </>
          )}
        </span>
        <Link href="/shop" className="desktop-only">
          Shop the range <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  );
}

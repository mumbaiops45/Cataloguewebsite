"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import SplitHeading from "../components/anim/SplitHeading";
import { useCart } from "../components/cart/CartContext";
import { contact } from "../lib/site";

export default function CartPage() {
  const { items, setQty, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <section className="section" style={{ paddingTop: "clamp(120px, 11vw, 160px)" }}>
        <div className="wrap" style={{ textAlign: "center", maxWidth: 560 }}>
          <ShoppingBag size={34} style={{ margin: "0 auto 20px", color: "var(--orange-deep)" }} />
          <SplitHeading as="h1" className="display-3">
            Your cart is empty.
          </SplitHeading>
          <p className="lead" style={{ margin: "20px auto 32px" }}>
            Browse the range and add a few pieces — every purchase becomes a
            wage, a skill and a life with dignity.
          </p>
          <Link href="/ishwari" className="btn btn-orange">
            Shop Ishwari <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  const subtotalLabel = `₹${subtotal.toLocaleString("en-IN")}`;

  const orderBody = items
    .map((it) => `• ${it.name} × ${it.qty} — ₹${(it.price * it.qty).toLocaleString("en-IN")}`)
    .join("%0D%0A");
  const mailHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    "Order enquiry — Blessings by SEFD"
  )}&body=${encodeURIComponent("Hi SEFD, I'd like to order:\n\n")}${orderBody}${encodeURIComponent(
    `\n\nSubtotal: ${subtotalLabel}\n\nName:\nDelivery address:\nPhone:`
  )}`;

  return (
    <section className="section" style={{ paddingTop: "clamp(140px, 18vw, 190px)" }}>
      <div className="wrap">
        <SplitHeading as="h1" className="display-3">
          Your cart
        </SplitHeading>

        <div className="cart-list" style={{ marginTop: 40 }}>
          {items.map((it) => (
            <div className="cart-row" key={it.id}>
              <div className="cart-row-media">
                <Image src={it.image} alt={it.name} fill sizes="96px" style={{ objectFit: "contain" }} />
              </div>
              <div className="cart-row-info">
                <h3>{it.name}</h3>
                <span className="price">₹{it.price.toLocaleString("en-IN")}</span>
              </div>
              <div className="qty-stepper">
                <button type="button" onClick={() => setQty(it.id, it.qty - 1)} aria-label="Decrease quantity">
                  <Minus size={14} />
                </button>
                <span>{it.qty}</span>
                <button type="button" onClick={() => setQty(it.id, it.qty + 1)} aria-label="Increase quantity">
                  <Plus size={14} />
                </button>
              </div>
              <div className="cart-row-total">
                ₹{(it.price * it.qty).toLocaleString("en-IN")}
              </div>
              <button
                type="button"
                className="cart-remove"
                onClick={() => removeItem(it.id)}
                aria-label={`Remove ${it.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div>
            <span>Subtotal</span>
            <b>{subtotalLabel}</b>
          </div>
          <p>
            Online payment is on the way. Send this order to SEFD by email and
            we&apos;ll confirm stock, delivery and payment.
          </p>
          <a href={mailHref} className="btn btn-orange">
            Send order enquiry <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

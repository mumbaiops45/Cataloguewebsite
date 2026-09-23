"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, MapPin, User2, ShoppingBag } from "lucide-react";
import SplitHeading from "../components/anim/SplitHeading";
import { useCartStore } from "../store/cartStore";
import { contact } from "../lib/site";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

export default function CheckoutPage() {
  const rawItems = useCartStore((s) => s.items);
  const catalogMap = useCartStore((s) => s.catalogMap);
  const [form, setForm] = useState(emptyForm);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const items = rawItems.map((it) => ({ ...it, product: catalogMap.get(it.productId) }));
  const subtotal = items.reduce((n, it) => n + it.quantity * (it.product?.price || 0), 0);

  if (items.length === 0) {
    return (
      <section className="checkout section">
        <div className="wrap" style={{ textAlign: "center", maxWidth: 560 }}>
          <ShoppingBag size={34} style={{ margin: "0 auto 20px", color: "var(--orange-deep)" }} />
          <SplitHeading as="h1" className="display-3">
            Your cart is empty.
          </SplitHeading>
          <p className="lead" style={{ margin: "20px auto 32px" }}>
            Add a few pieces to the cart before checking out.
          </p>
          <Link href="/shop" className="btn btn-orange">
            Shop the range <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  const shipping = subtotal >= 999 ? 0 : 79;
  const total = subtotal + shipping;
  const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;

  const orderBody = items
    .map((it) => `• ${it.product?.name || "Product"} × ${it.quantity} — ${fmt((it.product?.price || 0) * it.quantity)}`)
    .join("%0D%0A");
  const mailHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    "New order — Blessings by SEFD"
  )}&body=${encodeURIComponent("Hi SEFD, please confirm this order:\n\n")}${orderBody}${encodeURIComponent(
    `\n\nSubtotal: ${fmt(subtotal)}\nShipping: ${shipping === 0 ? "Free" : fmt(shipping)}\nTotal: ${fmt(total)}\n\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n` +
      `Address: ${form.address1} ${form.address2}, ${form.city}, ${form.state} - ${form.pincode}\n` +
      `Notes: ${form.notes}`
  )}`;

  return (
    <section className="checkout section">
      <div className="wrap">
        <SplitHeading as="h1" className="display-3">
          Checkout
        </SplitHeading>

        <div className="checkout-grid" style={{ marginTop: 40 }}>
          <div>
            <div className="checkout-card">
              <h2>
                <span className="step-no">1</span>
                <User2 size={17} /> Contact details
              </h2>
              <div className="checkout-fields">
                <div className="field">
                  <label>Full name</label>
                  <input value={form.name} onChange={set("name")} placeholder="Your name" />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input value={form.phone} onChange={set("phone")} placeholder="10-digit mobile number" />
                </div>
                <div className="field full">
                  <label>Email</label>
                  <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
                </div>
              </div>
            </div>

            <div className="checkout-card">
              <h2>
                <span className="step-no">2</span>
                <MapPin size={17} /> Delivery address
              </h2>
              <div className="checkout-fields">
                <div className="field full">
                  <label>Address line 1</label>
                  <input value={form.address1} onChange={set("address1")} placeholder="Flat, house no., building" />
                </div>
                <div className="field full">
                  <label>Address line 2</label>
                  <input value={form.address2} onChange={set("address2")} placeholder="Area, street, landmark" />
                </div>
                <div className="field">
                  <label>City</label>
                  <input value={form.city} onChange={set("city")} placeholder="City" />
                </div>
                <div className="field">
                  <label>State</label>
                  <input value={form.state} onChange={set("state")} placeholder="State" />
                </div>
                <div className="field">
                  <label>Pincode</label>
                  <input value={form.pincode} onChange={set("pincode")} placeholder="400708" />
                </div>
                <div className="field full">
                  <label>Order notes (optional)</label>
                  <textarea rows={3} value={form.notes} onChange={set("notes")} placeholder="Gift wrap, delivery instructions…" />
                </div>
              </div>
            </div>
          </div>

          <aside className="checkout-summary">
            <h2>Order summary</h2>
            <div className="checkout-items">
              {items.map((it) => (
                <div className="checkout-item" key={it.productId}>
                  <div className="checkout-item-media">
                    {it.product?.image && (
                      <Image src={it.product.image} alt={it.product.name} fill sizes="52px" style={{ objectFit: "contain" }} />
                    )}
                  </div>
                  <div className="checkout-item-info">
                    <b>{it.product?.name || "Product"}</b>
                    <span>Qty {it.quantity}</span>
                  </div>
                  <div className="checkout-item-price">{fmt((it.product?.price || 0) * it.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="checkout-totals">
              <div>
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div>
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : fmt(shipping)}</span>
              </div>
              <div className="grand">
                <span>Total</span>
                <b>{fmt(total)}</b>
              </div>
            </div>

            <a href={mailHref} className="btn btn-tertiary">
              Place order <ArrowUpRight size={16} />
            </a>
            <p className="checkout-note">
              Online payment is on the way — placing an order sends your
              details to SEFD by email for confirmation and delivery.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

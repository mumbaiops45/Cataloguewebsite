"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import SplitHeading from "../components/anim/SplitHeading";
import { useCartStore } from "../store/cartStore";
import { useAuth } from "../components/auth/AuthContext";
import { useLoginModal } from "../components/auth/LoginModalContext";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const catalogMap = useCartStore((s) => s.catalogMap);
  const loading = useCartStore((s) => s.loading);
  const hasFetched = useCartStore((s) => s.hasFetched);
  const fetchCart = useCartStore((s) => s.fetchCart);
  const incrementItem = useCartStore((s) => s.incrementItem);
  const decrementItem = useCartStore((s) => s.decrementItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const { user, ready } = useAuth();
  const { open: openLogin } = useLoginModal();

  useEffect(() => {
    if (user && !hasFetched) fetchCart();
  }, [user, hasFetched, fetchCart]);

  const rows = items.map((it) => ({ ...it, product: catalogMap.get(it.productId) }));
  const subtotal = rows.reduce((n, it) => n + it.quantity * (it.product?.price || 0), 0);

  if (ready && !user) {
    return (
      <section className="section top-offset">
        <div className="wrap" style={{ textAlign: "center", maxWidth: 560 }}>
          <ShoppingBag size={34} style={{ margin: "0 auto 20px", color: "var(--orange-deep)" }} />
          <SplitHeading as="h1" className="display-3">
            Log in to see your cart.
          </SplitHeading>
          <p className="lead" style={{ margin: "20px auto 32px" }}>
            Your cart is saved to your account — log in to view and manage it.
          </p>
          <button type="button" className="btn btn-orange" onClick={openLogin}>
            Log in
          </button>
        </div>
      </section>
    );
  }

  if (loading && !hasFetched) {
    return (
      <section className="section top-offset">
        <div className="wrap" style={{ textAlign: "center" }}>
          <p className="lead">Loading your cart…</p>
        </div>
      </section>
    );
  }

  if (rows.length === 0) {
    return (
      <section className="section top-offset">
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

  return (
    <section className="section top-offset-lg">
      <div className="wrap">
        <div className="cart-page-head">
          <SplitHeading as="h1" className="display-3">
            Your cart
          </SplitHeading>
          <button type="button" className="cart-drawer-clear" onClick={clearCart}>
            Clear cart
          </button>
        </div>

        <div className="cart-layout">
        <div className="cart-list">
          {rows.map((it) => (
            <div className="cart-row" key={it.productId}>
              <div className="cart-row-media">
                {it.product?.image ? (
                  <Image src={it.product.image} alt={it.product.name} fill sizes="96px" style={{ objectFit: "contain" }} />
                ) : (
                  <ShoppingBag size={24} />
                )}
              </div>
              <div className="cart-row-info">
                <h3>{it.product?.name || "Product"}</h3>
                <span className="price">₹{Number(it.product?.price || 0).toLocaleString("en-IN")}</span>
              </div>
              <div className="qty-stepper">
                <button
                  type="button"
                  onClick={() => decrementItem(it.productId)}
                  disabled={it.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span>{it.quantity}</span>
                <button type="button" onClick={() => incrementItem(it.productId)} aria-label="Increase quantity">
                  <Plus size={14} />
                </button>
              </div>
              <div className="cart-row-total">
                ₹{(it.quantity * (it.product?.price || 0)).toLocaleString("en-IN")}
              </div>
              <button
                type="button"
                className="cart-remove"
                onClick={() => removeItem(it.productId)}
                aria-label={`Remove ${it.product?.name || "item"}`}
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
            Shipping is added at checkout. Pay securely online via UPI, cards,
            net banking or wallets.
          </p>
          <Link href="/checkout" className="btn btn-tertiary">
            Proceed to checkout <ArrowUpRight size={16} />
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore, selectCartCount } from "../../store/cartStore";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const catalogMap = useCartStore((s) => s.catalogMap);
  const loading = useCartStore((s) => s.loading);
  const incrementItem = useCartStore((s) => s.incrementItem);
  const decrementItem = useCartStore((s) => s.decrementItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const count = useCartStore(selectCartCount);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeDrawer]);

  if (!isOpen) return null;

  const rows = items.map((it) => ({ ...it, product: catalogMap.get(it.productId) }));
  const subtotal = rows.reduce((n, it) => n + it.quantity * (it.product?.price || 0), 0);

  return (
    <div className="cart-drawer-overlay" onMouseDown={closeDrawer}>
      <aside
        className="cart-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="cart-drawer-head">
          <h2>
            <ShoppingBag size={18} /> Your cart {count > 0 && <span>({count})</span>}
          </h2>
          <div className="cart-drawer-head-actions">
            {rows.length > 0 && (
              <button type="button" className="cart-drawer-clear" onClick={clearCart}>
                Clear cart
              </button>
            )}
            <button
              type="button"
              className="cart-drawer-close"
              onClick={closeDrawer}
              ref={closeBtnRef}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="cart-drawer-empty">
            <ShoppingBag size={30} />
            <p>{loading ? "Loading your cart…" : "Your cart is empty."}</p>
            <Link href="/shop" className="btn btn-orange" onClick={closeDrawer}>
              Shop the range <ArrowUpRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-drawer-list">
              {rows.map((it) => (
                <div className="cart-drawer-row" key={it.productId}>
                  <div className="cart-row-media">
                    {it.product?.image ? (
                      <Image src={it.product.image} alt={it.product.name} fill sizes="64px" style={{ objectFit: "contain" }} />
                    ) : (
                      <ShoppingBag size={20} />
                    )}
                  </div>
                  <div className="cart-drawer-row-info">
                    <h3>{it.product?.name || "Product"}</h3>
                    <span className="price">₹{Number(it.product?.price || 0).toLocaleString("en-IN")}</span>
                    <div className="qty-stepper">
                      <button
                        type="button"
                        onClick={() => decrementItem(it.productId)}
                        disabled={it.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span>{it.quantity}</span>
                      <button
                        type="button"
                        onClick={() => incrementItem(it.productId)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
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

            <div className="cart-drawer-foot">
              <div className="cart-drawer-subtotal">
                <span>Subtotal</span>
                <b>₹{subtotal.toLocaleString("en-IN")}</b>
              </div>
              <Link href="/cart" className="btn btn-ghost" onClick={closeDrawer}>
                View cart
              </Link>
              <Link href="/checkout" className="btn btn-orange" onClick={closeDrawer}>
                Buy now <ArrowUpRight size={16} />
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Zap } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useAuth } from "../../components/auth/AuthContext";
import { useLoginModal } from "../../components/auth/LoginModalContext";

export default function ProductActions({ product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const { user } = useAuth();
  const { open: openLogin } = useLoginModal();
  const router = useRouter();
  const stock = Math.max(0, Number(product.stock) || 0);
  const outOfStock = stock === 0;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [pending, setPending] = useState(false);

  const handleAdd = async () => {
    if (!user) {
      openLogin();
      return;
    }
    setPending(true);
    try {
      await addToCart(product, qty);
      setAdded(true);
      openDrawer();
      setTimeout(() => setAdded(false), 1800);
    } catch {
      // error surfaced via the cart store; nothing more to do here
    } finally {
      setPending(false);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      openLogin();
      return;
    }
    setPending(true);
    try {
      await addToCart(product, qty);
      router.push("/checkout");
    } catch {
      // error surfaced via the cart store; nothing more to do here
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <div className="pdp-qty">
        <span>Quantity</span>
        <div className="qty-stepper">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={outOfStock || qty <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span>{outOfStock ? 0 : qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(stock, q + 1))}
            disabled={outOfStock || qty >= stock}
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
        <em className={`pdp-stock ${outOfStock ? "out" : ""}`}>
          {outOfStock ? "Out of stock" : `${stock} in stock`}
        </em>
      </div>

      <div className="pdp-actions">
        <button type="button" className="btn btn-tertiary" onClick={handleAdd} disabled={pending || outOfStock}>
          <ShoppingBag size={16} /> {added ? "Added ✓" : "Add to cart"}
        </button>
        <button type="button" className="btn btn-orange" onClick={handleBuyNow} disabled={pending || outOfStock}>
          <Zap size={16} /> Buy now
        </button>
      </div>
    </>
  );
}

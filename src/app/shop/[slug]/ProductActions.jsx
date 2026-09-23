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
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
            <Minus size={14} />
          </button>
          <span>{qty}</span>
          <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="pdp-actions">
        <button type="button" className="btn btn-tertiary" onClick={handleAdd} disabled={pending}>
          <ShoppingBag size={16} /> {added ? "Added ✓" : "Add to cart"}
        </button>
        <button type="button" className="btn btn-orange" onClick={handleBuyNow} disabled={pending}>
          <Zap size={16} /> Buy now
        </button>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Zap } from "lucide-react";
import { useCart } from "../../components/cart/CartContext";

export default function ProductActions({ product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    router.push("/checkout");
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
        <button type="button" className="btn btn-tertiary" onClick={handleAdd}>
          <ShoppingBag size={16} /> {added ? "Added ✓" : "Add to cart"}
        </button>
        <button type="button" className="btn btn-orange" onClick={handleBuyNow}>
          <Zap size={16} /> Buy now
        </button>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { Check, Loader2, ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useAuth } from "../auth/AuthContext";
import { useLoginModal } from "../auth/LoginModalContext";

// Quick "add to cart" overlay used on product cards across the site
// (shop grid, featured products, related products). Stops the click from
// bubbling to the card's own link so it doesn't also navigate to the PDP.
export default function AddToCartButton({ product, className = "" }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const { user } = useAuth();
  const { open: openLogin } = useLoginModal();
  const [pending, setPending] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (pending) return;
    if (!user) {
      openLogin();
      return;
    }
    setPending(true);
    try {
      await addToCart(product, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1400);
    } catch {
      // error already surfaced via the cart store's toast
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      className={`quick-add-btn ${className}`.trim()}
      onClick={handleClick}
      disabled={pending}
      aria-label={`Add ${product.name} to cart`}
      title="Add to cart"
    >
      {pending ? (
        <Loader2 size={16} className="spin" />
      ) : added ? (
        <Check size={17} />
      ) : (
        <ShoppingBag size={16} />
      )}
    </button>
  );
}

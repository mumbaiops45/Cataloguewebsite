"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "blessings-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // ignore corrupt storage
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable — cart just won't persist
    }
  }, [items, ready]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, qty: it.qty + qty } : it
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
  };

  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const setQty = (id, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((it) => it.id !== id)
        : prev.map((it) => (it.id === id ? { ...it, qty } : it))
    );

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((n, it) => n + it.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((n, it) => n + it.qty * it.price, 0),
    [items]
  );

  const value = { items, addItem, removeItem, setQty, clear, count, subtotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

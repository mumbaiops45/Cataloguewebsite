"use client";

import { create } from "zustand";
import { getCatalog } from "../utils/catalog";
import {
  createCart,
  getCart,
  updateCartQty,
  deleteCartItem,
  clearCartApi,
} from "../router/cart.router";
import { toast } from "./toastStore";

// Cart items come back from the API as { product: <id or populated doc>, quantity }.
// We keep just { productId, quantity } in state and resolve product details
// (name/price/image) from the shop catalogue, cached in catalogMap.
function normalizeItems(cart) {
  if (!cart?.items) return [];
  return cart.items
    .map((it) => ({
      productId: typeof it.product === "object" && it.product !== null ? it.product._id : String(it.product),
      quantity: it.quantity,
    }))
    .filter((it) => it.productId && it.quantity > 0);
}

export const useCartStore = create((set, get) => ({
  items: [],
  catalogMap: new Map(),
  catalogLoading: false,
  isOpen: false,
  loading: false,
  hasFetched: false,

  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),

  ensureCatalog: async () => {
    if (get().catalogMap.size > 0 || get().catalogLoading) return;
    set({ catalogLoading: true });
    try {
      const { products } = await getCatalog();
      set({ catalogMap: new Map(products.map((p) => [p.id, p])), catalogLoading: false });
    } catch {
      set({ catalogLoading: false });
    }
  },

  fetchCart: async () => {
    set({ loading: true });
    try {
      const cart = await getCart();
      set({ items: normalizeItems(cart), loading: false, hasFetched: true });
      get().ensureCatalog();
    } catch (err) {
      set({ loading: false, hasFetched: true });
      toast.error(err.message || "Couldn't load your cart.");
    }
  },

  // Add-to-cart only ever calls the create endpoint (per backend contract it
  // always adds exactly 1 unit) — for qty > 1 we call it that many times.
  addToCart: async (product, qty = 1) => {
    const prevItems = get().items;
    const prevCatalog = get().catalogMap;

    const existing = prevItems.find((it) => it.productId === product.id);
    const nextItems = existing
      ? prevItems.map((it) => (it.productId === product.id ? { ...it, quantity: it.quantity + qty } : it))
      : [...prevItems, { productId: product.id, quantity: qty }];

    const nextCatalog = new Map(prevCatalog);
    nextCatalog.set(product.id, product);

    set({ items: nextItems, catalogMap: nextCatalog, hasFetched: true });

    try {
      for (let i = 0; i < qty; i += 1) {
        await createCart(product.id);
      }
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      set({ items: prevItems, catalogMap: prevCatalog });
      toast.error(err.message || "Couldn't add that to your cart.");
      throw err;
    }
  },

  incrementItem: async (productId) => {
    const prevItems = get().items;
    set({
      items: prevItems.map((it) => (it.productId === productId ? { ...it, quantity: it.quantity + 1 } : it)),
    });
    try {
      await updateCartQty(productId, 1);
    } catch (err) {
      set({ items: prevItems });
      toast.error(err.message || "Couldn't update the quantity.");
    }
  },

  decrementItem: async (productId) => {
    const prevItems = get().items;
    const current = prevItems.find((it) => it.productId === productId);
    if (!current || current.quantity <= 1) return;
    set({
      items: prevItems.map((it) => (it.productId === productId ? { ...it, quantity: it.quantity - 1 } : it)),
    });
    try {
      await updateCartQty(productId, -1);
    } catch (err) {
      set({ items: prevItems });
      toast.error(err.message || "Couldn't update the quantity.");
    }
  },

  removeItem: async (productId) => {
    const prevItems = get().items;
    const name = get().catalogMap.get(productId)?.name || "Item";
    set({ items: prevItems.filter((it) => it.productId !== productId) });
    try {
      await deleteCartItem(productId);
      toast.info(`${name} removed from cart`);
    } catch (err) {
      set({ items: prevItems });
      toast.error(err.message || "Couldn't remove that item.");
    }
  },

  clearCart: async () => {
    const prevItems = get().items;
    if (prevItems.length === 0) return;
    set({ items: [] });
    try {
      await clearCartApi();
      toast.info("Cart cleared");
    } catch (err) {
      set({ items: prevItems });
      toast.error(err.message || "Couldn't clear your cart.");
    }
  },

  reset: () => set({ items: [], catalogMap: new Map(), hasFetched: false, isOpen: false }),
}));

export const selectCartCount = (state) => state.items.reduce((n, it) => n + it.quantity, 0);

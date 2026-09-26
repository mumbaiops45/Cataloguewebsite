import { create } from "zustand";
import { getShippingRates } from "../router/shipping.router";

export const useShippingStore = create((set, get) => ({
  rates: [],
  loaded: false,
  loading: false,
  fetchRates: async () => {
    if (get().loading) return;
    set({ loading: true });
    try {
      set({ rates: await getShippingRates(), loaded: true });
    } catch {
      // endpoint needs a logged-in user; guests just don't see slabs
      set({ rates: [], loaded: true });
    } finally {
      set({ loading: false });
    }
  },
  reset: () => set({ rates: [], loaded: false }),
}));

// same matching rule the backend uses when it creates the order
export const findShippingRate = (subtotal, rates) =>
  rates.find(
    (r) =>
      r.minOrderValue <= subtotal &&
      (r.maxOrderValue === undefined || r.maxOrderValue === null || r.maxOrderValue >= subtotal)
  ) || null;

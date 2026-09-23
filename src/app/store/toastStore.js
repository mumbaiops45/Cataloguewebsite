"use client";

import { create } from "zustand";

let idCounter = 0;

export const useToastStore = create((set, get) => ({
  toasts: [],
  addToast: (message, type = "info", duration = 3200) => {
    const id = ++idCounter;
    set({ toasts: [...get().toasts, { id, message, type }] });
    if (duration > 0) {
      setTimeout(() => get().removeToast(id), duration);
    }
    return id;
  },
  removeToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));

// Fire-and-forget helper for use outside components (e.g. inside other
// zustand stores), where hooks aren't available.
export const toast = {
  success: (message) => useToastStore.getState().addToast(message, "success"),
  error: (message) => useToastStore.getState().addToast(message, "error"),
  info: (message) => useToastStore.getState().addToast(message, "info"),
};

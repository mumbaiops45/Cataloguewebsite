"use client";

import { createContext, useContext, useMemo, useState } from "react";

const AccountDrawerContext = createContext(null);

export function AccountDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return (
    <AccountDrawerContext.Provider value={value}>
      {children}
    </AccountDrawerContext.Provider>
  );
}

export function useAccountDrawer() {
  const ctx = useContext(AccountDrawerContext);
  if (!ctx) throw new Error("useAccountDrawer must be used within AccountDrawerProvider");
  return ctx;
}

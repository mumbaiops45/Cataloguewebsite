"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, LayoutDashboard, LogOut, MapPin, Package, User } from "lucide-react";
import { useAccountDrawer } from "./AccountDrawerContext";
import { useAuth } from "./AuthContext";

export default function AccountDrawer() {
  const { isOpen, close } = useAccountDrawer();
  const { user, logout } = useAuth();
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  if (!isOpen || !user) return null;

  // Already on /account: a client-side hash link doesn't fire `hashchange`,
  // so the page wouldn't switch tabs — set the hash directly instead.
  const goTab = (e, tab) => {
    close();
    if (window.location.pathname === "/account") {
      e.preventDefault();
      window.location.hash = tab;
    }
  };

  const handleLogout = () => {
    logout();
    close();
  };

  return (
    <div className="account-drawer-overlay" onMouseDown={close}>
      <aside
        className="account-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Your account"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="account-drawer-close"
          onClick={close}
          ref={closeBtnRef}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="account-drawer-head">
          <span className="account-drawer-avatar">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt="" />
            ) : (
              <User size={20} />
            )}
          </span>
          <div>
            <p className="eyebrow">Account</p>
            <h2>{user.name || "Hi there"}</h2>
            {user.email && <span className="account-drawer-email">{user.email}</span>}
          </div>
        </div>

        <nav className="account-drawer-nav">
          <Link href="/account#profile" className="account-drawer-link" onClick={(e) => goTab(e, "profile")}>
            <LayoutDashboard size={17} /> My account
          </Link>
          <Link href="/account#orders" className="account-drawer-link" onClick={(e) => goTab(e, "orders")}>
            <Package size={17} /> My orders
          </Link>
          <Link href="/account#addresses" className="account-drawer-link" onClick={(e) => goTab(e, "addresses")}>
            <MapPin size={17} /> Addresses
          </Link>
        </nav>

        <button type="button" className="account-drawer-logout" onClick={handleLogout}>
          <LogOut size={16} /> Log out
        </button>
      </aside>
    </div>
  );
}

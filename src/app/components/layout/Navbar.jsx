"use client";

import Image from "../ui/SmartImage";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingBag, User, Search, ChevronDown, ChevronRight, Tag } from "lucide-react";
import { contact, nav } from "../../lib/site";
import { useCartStore, selectCartCount } from "../../store/cartStore";
import { useShippingStore } from "../../store/shippingStore";
import AnnounceBar from "./AnnounceBar";
import SearchSuggest from "./SearchSuggest";
import { useAuth } from "../auth/AuthContext";
import { useLoginModal } from "../auth/LoginModalContext";
import { useAccountDrawer } from "../auth/AccountDrawerContext";

export default function Navbar({ categories = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const count = useCartStore(selectCartCount);
  const openCartDrawer = useCartStore((s) => s.openDrawer);
  const fetchCart = useCartStore((s) => s.fetchCart);
  const resetCart = useCartStore((s) => s.reset);
  const fetchShipping = useShippingStore((s) => s.fetchRates);
  const resetShipping = useShippingStore((s) => s.reset);
  const { user } = useAuth();
  const { open: openLogin } = useLoginModal();
  const { open: openAccount } = useAccountDrawer();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [query, setQuery] = useState("");
  const catRef = useRef(null);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const closeSuggest = () => {
    setSuggestOpen(false);
    setQuery("");
  };

  // ✕ in the search box: empty the text and the suggestions, keep the cursor there
  const clearSearch = (e) => {
    setQuery("");
    setSuggestOpen(false);
    e.currentTarget.closest("form")?.querySelector("input")?.focus();
  };

  // Close the product suggestions on outside click.
  useEffect(() => {
    if (!suggestOpen) return;
    const onDown = (e) => {
      const inside = [searchRef, mobileSearchRef].some((r) => r.current?.contains(e.target));
      if (!inside) setSuggestOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [suggestOpen]);

  // Publish the full (unscrolled) header height as --nav-h so the home banner
  // starts right below the navbar on every screen size. Only measured at the
  // top of the page — scrolling collapses the announce bar.
  useEffect(() => {
    const header = document.querySelector(".nav");
    if (!header) return;
    const measure = () => {
      if (window.scrollY > 4) return;
      document.documentElement.style.setProperty("--nav-h", `${Math.round(header.offsetHeight)}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      e.currentTarget.querySelector("input")?.focus();
      return;
    }
    setOpen(false);
    setSuggestOpen(false);
    router.push(`/shop?q=${encodeURIComponent(q)}`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setCatOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (user) {
      fetchCart();
      fetchShipping();
    } else {
      resetCart();
      resetShipping();
    }
  }, [user, fetchCart, resetCart, fetchShipping, resetShipping]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!catOpen) return;
    const onDown = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setCatOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [catOpen]);

  // Product search box — the desktop navbar and the phone search row share it.
  const renderSearch = (className, ref) => (
    <form className={className} onSubmit={submitSearch} role="search" ref={ref}>
      <button type="submit" className="search-submit" aria-label="Search">
        <Search size={16} />
      </button>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSuggestOpen(true);
        }}
        onFocus={() => setSuggestOpen(true)}
        onKeyDown={(e) => e.key === "Escape" && setSuggestOpen(false)}
        placeholder="Search products…"
        maxLength={60}
        aria-label="Search products"
        autoComplete="off"
      />
      {query && (
        <button type="button" className="search-clear" onClick={clearSearch} aria-label="Clear search">
          <X size={14} />
        </button>
      )}
      <SearchSuggest query={query} visible={suggestOpen} onPick={closeSuggest} />
    </form>
  );

  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <AnnounceBar />

        <div className="wrap nav-bar">
          <Link href="/" className="brand" aria-label="Blessings by SEFD — home">
            <span className="brand-mark">
              <Image
                src="/logo/logo-1.webp"
                alt=""
                fill
                sizes="92px"
                style={{ objectFit: "contain" }}
                priority
              />
            </span>
          </Link>

          {renderSearch("nav-search desktop-only", searchRef)}

          <div className="nav-actions">
            <button
              type="button"
              className={`nav-login ${user ? "" : "is-guest"}`.trim()}
              onClick={user ? openAccount : openLogin}
              aria-label={user ? "Your account" : "Log in"}
            >
              {user ? (
                <>
                  <span className="nav-login-avatar">
                    {user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.image} alt="" className="nav-login-img" />
                    ) : (
                      <User size={15} strokeWidth={2.5} />
                    )}
                  </span>
                  <span className="nav-login-name">{user.name?.split(" ")[0] || "Account"}</span>
                </>
              ) : (
                <User size={18} strokeWidth={2.5} />
              )}
            </button>
            <button type="button" className="cart-btn" aria-label="Cart" onClick={openCartDrawer}>
              <span className="cart-icon">
                <ShoppingBag size={16} strokeWidth={2.5} />
                {count > 0 && <span className="cart-count">{count}</span>}
              </span>
            </button>
            <button
              className="burger"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Phones: search always visible in its own row under the logo bar */}
        <div className="nav-search-row mobile-only">
          <div className="wrap">{renderSearch("nav-search", mobileSearchRef)}</div>
        </div>

        <div className="nav-utility desktop-only">
          <div className="wrap nav-utility-inner">
            <div className="nav-cat" ref={catRef}>
              <button
                type="button"
                className={`nav-cat-trigger ${catOpen ? "is-open" : ""}`}
                onClick={() => setCatOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={catOpen}
              >
                <Menu size={15} />
                All Categories
                <ChevronDown size={14} />
              </button>
              <div className={`nav-cat-panel ${catOpen ? "open" : ""}`} role="menu">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/shop?category=${c.slug}`}
                    className="nav-cat-item"
                    role="menuitem"
                    onClick={() => setCatOpen(false)}
                  >
                    <span className="nav-cat-thumb">
                      {c.image ? (
                        <Image src={c.image} alt="" fill sizes="28px" style={{ objectFit: "cover" }} />
                      ) : (
                        <Tag size={15} />
                      )}
                    </span>
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <nav className="nav-links nav-links-utility">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className={`mobile-panel ${open ? "open" : ""}`}>
        <div className="mobile-links">
          <form className="mobile-search" onSubmit={submitSearch} role="search">
            <button type="submit" className="search-submit" aria-label="Search">
              <Search size={17} />
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              maxLength={60}
              aria-label="Search products"
              autoComplete="off"
            />
            {query && (
              <button type="button" className="search-clear" onClick={clearSearch} aria-label="Clear search">
                <X size={15} />
              </button>
            )}
          </form>
          <SearchSuggest
            query={query}
            visible={open}
            onPick={() => {
              setOpen(false);
              setQuery("");
            }}
          />
          {categories.length > 0 && (
            <>
              <div className="mobile-cat-label">Shop by category</div>
              <div className="mobile-cat-grid">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/shop?category=${c.slug}`} className="mobile-cat-card" onClick={() => setOpen(false)}>
                    <span className="mobile-cat-thumb">
                      {c.image ? (
                        <Image src={c.image} alt="" fill sizes="34px" style={{ objectFit: "cover" }} />
                      ) : (
                        <Tag size={15} />
                      )}
                    </span>
                    <span className="mobile-cat-name">{c.name}</span>
                  </Link>
                ))}
              </div>
            </>
          )}

          <div className="mobile-cat-label">Menu</div>
          <nav className="mobile-nav">
            {[{ name: "Home", href: "/" }, ...nav].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {item.name}
                <ChevronRight size={16} />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="mobile-login-btn"
            onClick={() => {
              setOpen(false);
              if (user) openAccount();
              else openLogin();
            }}
          >
            <User size={16} />
            {user ? `My account (${user.name?.split(" ")[0] || "account"})` : "Log in"}
          </button>
        </div>
        <div className="mobile-foot">
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={contact.emailHref}>{contact.email}</a>
        </div>
      </div>
    </>
  );
}

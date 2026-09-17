"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingBag, ArrowUpRight, User, Search, ChevronDown, Tag } from "lucide-react";
import { nav } from "../../lib/site";
import { categories } from "../../lib/products";
import { useCart } from "../cart/CartContext";
import { useLoginModal } from "../auth/LoginModalContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const { open: openLogin } = useLoginModal();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [query, setQuery] = useState("");
  const catRef = useRef(null);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
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

  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="announce">
          <div className="wrap announce-inner">
            <span>
              <b>Beyond charity</b> — a life with self esteem &amp; dignity
            </span>
            <Link href="/shop" className="desktop-only">
              Shop the range <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

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

          <form className="nav-search desktop-only" onSubmit={submitSearch} role="search">
            <Search size={16} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
            />
          </form>

          <div className="nav-actions">
            <button
              type="button"
              className="nav-login"
              onClick={openLogin}
            >
              <User size={16} />
              <span className="desktop-only">Log in</span>
            </button>
            <Link href="/cart" className="cart-btn" aria-label="Cart">
              <ShoppingBag size={16} />
              <span className="cart-text desktop-only">Cart</span>
              <span className="cart-count">{count}</span>
            </Link>
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
                    <Tag size={15} />
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
            <Search size={17} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
            />
          </form>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <div className="mobile-cat-label">Shop by category</div>
          <div className="mobile-cat-row">
            {categories.map((c) => (
              <Link key={c.slug} href={`/shop?category=${c.slug}`} className="mobile-cat-chip">
                {c.name}
              </Link>
            ))}
          </div>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
            >
              {item.name}
            </Link>
          ))}
          <button
            type="button"
            className="mobile-login-btn"
            onClick={() => {
              setOpen(false);
              openLogin();
            }}
          >
            Log in
          </button>
        </div>
        <div className="mobile-foot">
          <a href="tel:+918779171635">+91 8779171635</a>
          <a href="mailto:selfesteem.disabled@gmail.com">
            selfesteem.disabled@gmail.com
          </a>
        </div>
      </div>
    </>
  );
}

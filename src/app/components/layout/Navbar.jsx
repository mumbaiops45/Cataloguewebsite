"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, ArrowUpRight, User } from "lucide-react";
import { nav } from "../../lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const banner = document.querySelector(".hero, .page-head");
      setScrolled(y > 70);
      setOverDark(!!banner && y < banner.offsetHeight - 70);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`nav ${scrolled ? "scrolled" : ""} ${
          overDark ? "over-dark" : ""
        }`}
      >
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
            <span className="brand-mark">✦</span>
            <span className="brand-text">
              <span className="brand-name">Blessings</span>
              <span className="brand-sub">by SEFD</span>
            </span>
          </Link>

          <nav className="nav-links">
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

          <div className="nav-actions">
            <Link
              href="/login"
              className={`nav-login ${isActive("/login") ? "active" : ""}`}
            >
              <User size={16} />
              <span className="desktop-only">Log in</span>
            </Link>
            <Link href="/cart" className="cart-btn" aria-label="Cart">
              <ShoppingBag size={16} />
              <span className="cart-text desktop-only">Cart</span>
              <span className="cart-count">0</span>
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
      </header>

      <div className={`mobile-panel ${open ? "open" : ""}`}>
        <div className="mobile-links">
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/login"
            className={isActive("/login") ? "active" : ""}
          >
            Log in
          </Link>
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

"use client";

import Link from "next/link";

// Footer links always open the page at the top. The route-change reset in
// SmoothScroll doesn't fire when the link points at the page you're already
// on (e.g. "All products" while on /shop), so jump to the top on click too.
export default function FooterLink({ onClick, ...props }) {
  return (
    <Link
      {...props}
      scroll={false}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }}
    />
  );
}

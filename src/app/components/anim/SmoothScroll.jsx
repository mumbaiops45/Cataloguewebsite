"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ScrollTrigger, prefersReducedMotion } from "./gsap";

// Jump to the very top without the CSS smooth-scroll animation.
const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });

/**
 * Every page opens at the top — on link clicks, query changes
 * (/shop?category=…) and browser Back/Forward. The browser's own scroll
 * restoration is turned off, and the reset runs again after the page
 * content has streamed in, so a late-loading page can't land mid-content.
 */
function ScrollReset() {
  const pathname = usePathname();
  const search = useSearchParams().toString();

  useEffect(() => {
    if (window.location.hash) return; // let #anchor links scroll to their target
    // Hold the page at the top while it finishes streaming in and images,
    // fonts and Next's own scroll handling settle — a single reset can run
    // too early and leave the page mid-content. Stops as soon as the visitor
    // scrolls themselves.
    let raf = 0;
    let stopped = false;
    const start = performance.now();
    const stop = () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };
    const pin = () => {
      if (stopped) return;
      if (window.scrollY !== 0) toTop();
      if (performance.now() - start < 1500) raf = requestAnimationFrame(pin);
    };
    pin();
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 300);
    const userEvents = ["wheel", "touchstart", "keydown", "mousedown"];
    userEvents.forEach((ev) => window.addEventListener(ev, stop, { passive: true, once: true }));
    return () => {
      stop();
      clearTimeout(refresh);
      userEvents.forEach((ev) => window.removeEventListener(ev, stop));
    };
  }, [pathname, search]);

  return null;
}

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    // Back/Forward: browsers may restore the old position after navigation.
    const onPop = () => requestAnimationFrame(toTop);
    window.addEventListener("popstate", onPop);

    // Any internal link click (header, footer, cards…) jumps to the top right
    // away, so the next page never appears at the old scroll position while
    // it loads.
    const onClick = (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[href]");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      // buttons inside a card link (quick add to cart) don't navigate
      const btn = e.target.closest("button");
      if (btn && a.contains(btn)) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash) return;
      toTop();
    };
    // capture phase: Next's <Link> calls preventDefault() during bubbling
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document?.fonts?.ready) document.fonts.ready.then(refresh);
    const t = setTimeout(refresh, 800);
    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <ScrollReset />
      </Suspense>
      {children}
    </>
  );
}

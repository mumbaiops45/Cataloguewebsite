"use client";

import { Suspense, useEffect, useLayoutEffect } from "react";
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

  // Runs before the new page is painted, so it never shows at the old scroll
  // position — and the old page doesn't jump to the top while the new one
  // is still loading.
  useLayoutEffect(() => {
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
    return () => window.removeEventListener("popstate", onPop);
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

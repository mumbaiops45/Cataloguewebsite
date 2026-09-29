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
    toTop();
    const raf = requestAnimationFrame(toTop);
    const t1 = setTimeout(toTop, 60);
    const t2 = setTimeout(() => {
      toTop();
      ScrollTrigger.refresh();
    }, 250);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
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

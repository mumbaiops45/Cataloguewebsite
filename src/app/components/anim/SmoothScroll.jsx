"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Native scrolling (no ScrollSmoother — it proved fragile with Next's
 * hydration and left content hidden). We just keep ScrollTrigger healthy:
 * scroll to top on route change and refresh once assets settle.
 */
export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

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

  return children;
}

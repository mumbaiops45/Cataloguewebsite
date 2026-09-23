"use client";

import { useEffect } from "react";

// SmoothScroll resets scroll on pathname change, but that fires once, while
// this route's loading.js (a much shorter skeleton) is still showing — by
// the time the real, taller content streams in and replaces it, pathname
// hasn't changed again, so nothing resets the scroll a second time and the
// page can land mid-content instead of at the top. Mounting fresh with the
// real content (a new React mount, not just a pathname change) fixes that.
export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

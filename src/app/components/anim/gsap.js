"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once. Safe to import from multiple client modules.
if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };

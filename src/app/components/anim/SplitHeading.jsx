"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Heading with a restrained entrance — a short fade and a small rise.
 * No per-line splitting or typewriter effect; nothing jumps.
 */
export default function SplitHeading({
  as: Tag = "h2",
  children,
  className = "",
  delay = 0,
  scroll = false,
  start = "top 82%",
  style,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      gsap.from(el, {
        autoAlpha: 0,
        y: 16,
        duration: 0.7,
        ease: "power2.out",
        delay,
        // never leave the heading hidden if the trigger doesn't fire
        immediateRender: !scroll,
        scrollTrigger: scroll
          ? { trigger: el, start, once: true }
          : undefined,
      });
    },
    { scope: ref, dependencies: [] }
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

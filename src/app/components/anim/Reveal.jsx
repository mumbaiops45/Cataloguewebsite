"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Scroll-triggered reveal. Children fade + rise into place, optionally
 * staggered across direct children.
 *
 *   <Reveal>           single block
 *   <Reveal stagger>   animates each direct child in sequence
 */
export default function Reveal({
  children,
  as: Tag = "div",
  stagger = false,
  scroll = true,
  y = 20,
  duration = 0.7,
  delay = 0,
  start = "top 85%",
  className,
  ...rest
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      const targets = stagger ? el.children : el;

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power2.out",
        stagger: stagger ? { amount: typeof stagger === "number" ? stagger : 0.4 } : 0,
        // with scroll triggers, don't pre-hide — if the trigger never fires
        // (broken JS, fast route change) the content must still be visible
        immediateRender: !scroll,
        scrollTrigger: scroll ? { trigger: el, start, once: true } : undefined,
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

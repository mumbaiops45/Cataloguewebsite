"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

export default function Counter({
  to,
  from = 0,
  duration = 2,
  prefix = "",
  suffix = "",
  className,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      const obj = { val: from };
      const render = () =>
        (el.textContent = prefix + Math.round(obj.val).toLocaleString("en-IN") + suffix);

      render();

      if (prefersReducedMotion()) {
        obj.val = to;
        render();
        return;
      }

      // Fire the count-up imperatively from onEnter rather than binding it as
      // the ScrollTrigger's own animation — a later ScrollTrigger.refresh()
      // (SmoothScroll calls this on load/font-ready) reverts and re-applies
      // trigger-bound animations to remeasure positions, which would yank an
      // already-completed count back to its start value. once:true still
      // stops it from re-firing (and reversing) on scroll-back.
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: to,
            duration,
            ease: "power2.out",
            onUpdate: render,
          });
        },
      });
    },
    { scope: ref, dependencies: [to] }
  );

  return <span ref={ref} className={className} />;
}

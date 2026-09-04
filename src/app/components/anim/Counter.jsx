"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "./gsap";

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

      gsap.to(obj, {
        val: to,
        duration,
        ease: "power2.out",
        onUpdate: render,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    },
    { scope: ref, dependencies: [to] }
  );

  return <span ref={ref} className={className} />;
}

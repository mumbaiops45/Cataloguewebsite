"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Seamless infinite marquee. Renders the child list twice; the track slides
 * by exactly one copy's width and loops. Positive speed → leftward,
 * negative → rightward. `speed` is roughly px/second.
 */
export default function Marquee({ children, speed = 60, className = "" }) {
  const track = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = track.current;

      let tween;
      const build = () => {
        tween?.kill();
        const dist = el.scrollWidth / 2;
        if (!dist) return;
        const duration = dist / Math.abs(speed);
        tween =
          speed >= 0
            ? gsap.fromTo(
                el,
                { x: 0 },
                { x: -dist, duration, ease: "none", repeat: -1 }
              )
            : gsap.fromTo(
                el,
                { x: -dist },
                { x: 0, duration, ease: "none", repeat: -1 }
              );
      };

      build();
      const ro = new ResizeObserver(build);
      ro.observe(el);

      return () => {
        ro.disconnect();
        tween?.kill();
      };
    },
    { scope: track }
  );

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track" ref={track}>
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

"use client";

import BannerImage from "./BannerImage";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../anim/gsap";
import BannerTitle, { BannerCount, BannerCta } from "./BannerTitle";
import useBanners from "./useBanners";

// Hero slider — fully driven by `Hero` banners from the backend.
export default function Hero({ banners: initial = [] }) {
  const banners = useBanners(initial, "hero");
  const root = useRef(null);
  const [current, setCurrent] = useState(0);
  const total = banners.length;

  useGSAP(
    () => {
      if (!total) return;
      const el = root.current;
      const slideEls = gsap.utils.toArray(".hero-slide", el);
      const imgs = gsap.utils.toArray(".hero-slide .banner-img", el);
      const dots = gsap.utils.toArray(".hero-dot", el);
      const reduce = prefersReducedMotion();

      let idx = 0;
      let timer = null;

      const show = (n) => {
        slideEls.forEach((s, i) => {
          gsap.to(s, {
            autoAlpha: i === n ? 1 : 0,
            duration: reduce ? 0 : 1.4,
            ease: "power2.inOut",
          });
          dots[i]?.classList.toggle("active", i === n);
        });
        if (!reduce && imgs[n]) {
          gsap.fromTo(imgs[n], { scale: 1.14 }, { scale: 1, duration: 7, ease: "none" });
        }
        idx = n;
        setCurrent(n);
      };

      // Auto-scroll only when there's more than one banner.
      const restart = () => {
        clearInterval(timer);
        if (slideEls.length > 1) {
          timer = setInterval(() => show((idx + 1) % slideEls.length), 6000);
        }
      };

      show(0);
      restart();

      const onDot = dots.map((d, i) => {
        const fn = () => {
          show(i);
          restart();
        };
        d.addEventListener("click", fn);
        return fn;
      });

      return () => {
        clearInterval(timer);
        dots.forEach((d, i) => d.removeEventListener("click", onDot[i]));
      };
    },
    { scope: root, dependencies: [total], revertOnUpdate: true }
  );

  if (!total) return null;
  const active = banners[current] || banners[0];

  return (
    <section className="hero" ref={root}>
      <div className="hero-slides">
        {banners.map((b, i) => (
          <div className="hero-slide" key={b._id} style={{ opacity: i === 0 ? 1 : 0 }}>
            <BannerImage banner={b} priority={i === 0} />
          </div>
        ))}
      </div>
      <div className="hero-scrim" />

      <div className="wrap hero-inner">
        <div className="hero-copy" key={active._id}>
          <BannerTitle banner={active} as="h1" className="hero-h1 hero-line" />
          {active.description && (
            <p className="hero-sub" style={{ color: active.descriptionColor || "#ffffff" }}>
              {active.description}
            </p>
          )}
          {active.ctaText && active.ctaUrl && (
            <div className="hero-cta">
              <BannerCta banner={active} />
            </div>
          )}
        </div>

        {total > 1 && (
          <div className="hero-dots">
            {banners.map((b, i) => (
              <button
                key={b._id}
                className={`hero-dot ${i === 0 ? "active" : ""}`}
                aria-label={`Show slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <BannerCount current={current} total={total} />
    </section>
  );
}

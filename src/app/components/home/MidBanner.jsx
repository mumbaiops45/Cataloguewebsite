"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "../anim/Reveal";
import BannerTitle, { BannerCount, BannerCta } from "./BannerTitle";
import useBanners from "./useBanners";

// Middle banner slider — fully driven by `MIDDLE_BANNER` banners from the backend.
export default function MidBanner({ banners: initial = [] }) {
  const banners = useBanners(initial, "middle");
  const [current, setCurrent] = useState(0);
  const total = banners.length;

  // Auto-scroll only when there's more than one banner. Depends on `current`
  // so a manual dot click resets the timer.
  useEffect(() => {
    if (total < 2) return;
    const t = setTimeout(() => setCurrent((c) => (c + 1) % total), 6000);
    return () => clearTimeout(t);
  }, [total, current]);

  if (!total) return null;
  const active = banners[current] || banners[0];

  return (
    <section className="mid-banner">
      {banners.map((b, i) => (
        <div key={b._id} className={`mid-banner-slide ${i === current ? "active" : ""}`}>
          <Image
            className="banner-img"
            src={b.url}
            alt={[b.title1, b.title2].filter(Boolean).join(" ") || "SEFD banner"}
            fill
            sizes="100vw"
          />
        </div>
      ))}
      <div className="mid-banner-scrim" />
      <div className="wrap">
        <Reveal className="mid-banner-inner">
          <div className="mid-banner-copy" key={active._id}>
            <BannerTitle banner={active} as="h2" />
            {active.description && (
              <p className="sub" style={{ color: active.descriptionColor || "#ffffff" }}>
                {active.description}
              </p>
            )}
            <BannerCta banner={active} />
          </div>
        </Reveal>
      </div>

      {total > 1 && (
        <div className="mid-banner-dots">
          {banners.map((b, i) => (
            <button
              key={b._id}
              className={`hero-dot ${i === current ? "active" : ""}`}
              aria-label={`Show banner ${i + 1}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}

      <BannerCount current={current} total={total} />
    </section>
  );
}

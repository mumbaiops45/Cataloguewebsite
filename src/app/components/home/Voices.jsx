"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../anim/gsap";
import { testimonials } from "../../lib/site";
import Reveal from "../anim/Reveal";

export default function Voices() {
  const root = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      const slides = gsap.utils.toArray(".voice-slide", el);
      const dots = gsap.utils.toArray(".voice-dot", el);
      const reduce = prefersReducedMotion();

      let i = 0;
      const go = (n) => {
        slides.forEach((s, k) => {
          gsap.to(s, {
            autoAlpha: k === n ? 1 : 0,
            duration: reduce ? 0 : 0.6,
            ease: "power2.out",
          });
          dots[k]?.classList.toggle("active", k === n);
        });
        i = n;
      };
      go(0);

      dots.forEach((d, k) => d.addEventListener("click", () => go(k)));

      if (reduce) return;
      const t = setInterval(() => go((i + 1) % slides.length), 6500);
      return () => clearInterval(t);
    },
    { scope: root }
  );

  return (
    <section className="voices section" id="voices" ref={root}>
      <div className="wrap">
        <Reveal as="p" className="eyebrow center" style={{ margin: "0 auto" }}>
          In our words
        </Reveal>

        <Reveal className="voice-stage" y={16} delay={0.1}>
          <span className="voice-quote" aria-hidden="true">
            &ldquo;
          </span>
          {testimonials.map((t, k) => (
            <blockquote
              className="voice-slide"
              key={t.name}
              style={{ opacity: k === 0 ? 1 : 0 }}
            >
              <p>{t.quote}</p>
              <footer>
                <b>{t.name}</b>
                <span>{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </Reveal>

        <div className="voice-dots">
          {testimonials.map((t, k) => (
            <button
              key={t.name}
              className={`voice-dot ${k === 0 ? "active" : ""}`}
              aria-label={`Quote ${k + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

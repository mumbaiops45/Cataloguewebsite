"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "../anim/gsap";

const SLIDES = [
  {
    src: "/homepage/homepage1.jpg",
    alt: "An artist at an SEFD exhibition painting a canvas with their foot",
  },
  {
    src: "/homepage/homepage4.jpg",
    alt: "Beneficiaries decorating festival lamps together in the SEFD workshop",
  },
  {
    src: "/homepage/homepage2.jpg",
    alt: "A young artist painting at a public SEFD workshop",
  },
];

const WORDS = ["overlooked.", "underestimated.", "counted out.", "passed over."];

export default function Hero() {
  const root = useRef(null);
  const word = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      const slides = gsap.utils.toArray(".hero-slide", el);
      const imgs = gsap.utils.toArray(".hero-slide img", el);
      const dots = gsap.utils.toArray(".hero-dot", el);
      const reduce = prefersReducedMotion();

      let idx = 0;
      const show = (n) => {
        slides.forEach((s, i) => {
          gsap.to(s, {
            autoAlpha: i === n ? 1 : 0,
            duration: reduce ? 0 : 1.4,
            ease: "power2.inOut",
          });
          dots[i]?.classList.toggle("active", i === n);
        });
        if (!reduce) {
          gsap.fromTo(
            imgs[n],
            { scale: 1.14 },
            { scale: 1, duration: 7, ease: "none" }
          );
        }
        idx = n;
      };
      show(0);

      let w = 0;
      const swapWord = () => {
        w = (w + 1) % WORDS.length;
        if (reduce) {
          word.current.textContent = WORDS[w];
          return;
        }
        gsap
          .timeline()
          .to(word.current, {
            autoAlpha: 0,
            y: -8,
            duration: 0.32,
            ease: "power1.in",
          })
          .add(() => {
            word.current.textContent = WORDS[w];
          })
          .set(word.current, { y: 8 })
          .to(word.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: "power2.out",
          });
      };

      if (!reduce) {
        gsap.from(
          el.querySelectorAll(
            ".hero-eyebrow, .hero-line, .hero-sub, .hero-cta, .hero-meta > div, .hero-dots, .hero-scroll"
          ),
          {
            autoAlpha: 0,
            y: 26,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.07,
            delay: 0.25,
          }
        );
      }

      dots.forEach((d, i) => d.addEventListener("click", () => show(i)));

      if (reduce) return;
      const slideTimer = setInterval(
        () => show((idx + 1) % slides.length),
        6000
      );
      const wordTimer = setInterval(swapWord, 4200);
      return () => {
        clearInterval(slideTimer);
        clearInterval(wordTimer);
      };
    },
    { scope: root }
  );

  return (
    <section className="hero" ref={root}>
      <div className="hero-slides">
        {SLIDES.map((s, i) => (
          <div className="hero-slide" key={s.src} style={{ opacity: i === 0 ? 1 : 0 }}>
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      <div className="hero-scrim" />

      <div className="wrap hero-inner">
        <p className="eyebrow hero-eyebrow" style={{ color: "var(--orange-soft)" }}>
          Blessings by SEFD
        </p>

        <h1 className="hero-h1">
          <span className="hero-line">Handmade by hands</span>
          <span className="hero-line">
            the world{" "}
            <span className="hero-word-wrap">
              <span className="hero-word" ref={word}>
                overlooked.
              </span>
            </span>
          </span>
        </h1>

        <p className="hero-sub">
          Warli art, jute, cotton and Ishwari divine offerings — crafted by
          differently-abled artisans. Every purchase becomes a wage, a skill and
          a life with dignity.
        </p>

        <div className="hero-cta">
          <Link href="/shop" className="btn btn-orange">
            Shop the range <ArrowUpRight size={16} />
          </Link>
          <Link
            href="/about"
            className="btn btn-ghost"
            style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}
          >
            Our story
          </Link>
        </div>

        <dl className="hero-meta">
          <div>
            <dt>2011</dt>
            <dd>Founded in Navi Mumbai</dd>
          </div>
          <div>
            <dt>200+</dt>
            <dd>Artisans in gainful work</dd>
          </div>
          <div>
            <dt>20+</dt>
            <dd>Partner NGOs</dd>
          </div>
        </dl>

        <div className="hero-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              className={`hero-dot ${i === 0 ? "active" : ""}`}
              aria-label={`Show slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="hero-scroll">
        Scroll
        <span />
      </div>
    </section>
  );
}

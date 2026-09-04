"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../anim/gsap";
import SplitHeading from "../anim/SplitHeading";

const cards = [
  {
    name: "Warli Art",
    href: "/shop?category=warli-art",
    tag: "Painted on wood",
    copy: "Coasters, desk sets, trays and boxes in tribal linework.",
    img: "/products/warli-art/page-03-06.jpeg",
  },
  {
    name: "Jute Bags",
    href: "/shop?category=jute",
    tag: "Natural & reusable",
    copy: "Block-printed totes, Ganesha bags and slings.",
    img: "/products/jute/page-07-02.png",
  },
  {
    name: "Cotton Bags",
    href: "/shop?category=cotton",
    tag: "Handloom & brocade",
    copy: "Slings, potlis and clutches from recycled saree fabric.",
    img: "/products/cotton/page-08-06.png",
  },
  {
    name: "File & Stationery",
    href: "/shop?category=file-notepad",
    tag: "For the desk",
    copy: "Cloth and jute folders, binders and notepads.",
    img: "/products/file-notepad/page-10-03.jpeg",
  },
  {
    name: "Ishwari",
    href: "/ishwari",
    tag: "Divine offerings",
    copy: "Torans, gudhi vastra and décor from temple sarees.",
    img: "/products/cotton/page-09-01.png",
  },
];

export default function Collections() {
  const section = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || window.innerWidth < 760) return;

      const el = track.current;
      const distance = () => el.scrollWidth - window.innerWidth + 80;

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: () => "+=" + distance(),
        pin: true,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
    },
    { scope: section }
  );

  return (
    <section className="collections section" ref={section}>
      <div className="wrap collections-head">
        <div>
          <p className="eyebrow">The range</p>
          <SplitHeading as="h2" scroll className="display-2">
            Five collections,
            <br />
            <em>one purpose.</em>
          </SplitHeading>
        </div>
        <Link
          href="/shop"
          className="link-underline"
          style={{ color: "#fff" }}
        >
          View all products <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="htrack-viewport">
        <div className="htrack" ref={track}>
          {cards.map((c) => (
            <Link href={c.href} key={c.name} className="collection-card">
              <Image src={c.img} alt={c.name} fill sizes="460px" />
              <div className="veil" />
              <div className="meta">
                <div>
                  <span>{c.tag}</span>
                  <h3>{c.name}</h3>
                  <p>{c.copy}</p>
                </div>
                <span className="arrow">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="wrap htrack-hint">Scroll to explore →</div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
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
  const [active, setActive] = useState(0);
  const current = cards[active];

  return (
    <section className="collections section" id="collections">
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

      <div className="wrap collections-showcase">
        <ul className="collections-tabs" role="tablist">
          {cards.map((c, i) => (
            <li key={c.name}>
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                className={
                  "collections-tab" + (i === active ? " is-active" : "")
                }
                onClick={() => setActive(i)}
              >
                <span className="collections-tab-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="collections-tab-name">{c.name}</span>
                <ArrowUpRight size={16} className="collections-tab-arrow" />
              </button>
            </li>
          ))}
        </ul>

        <div className="collections-stage-media" key={current.name}>
          <Image
            src={current.img}
            alt={current.name}
            fill
            sizes="(max-width: 759px) 60vw, 380px"
            quality={90}
            priority
          />
        </div>

        <div className="collections-stage-meta" key={current.name + "-meta"}>
          <span>{current.tag}</span>
          <h3>{current.name}</h3>
          <p>{current.copy}</p>
          <Link href={current.href} className="collections-stage-cta">
            Shop {current.name} <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

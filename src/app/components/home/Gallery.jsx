"use client";

import Image from "next/image";
import Marquee from "../anim/Marquee";
import Reveal from "../anim/Reveal";
import SplitHeading from "../anim/SplitHeading";

const ROW_A = [
  { src: "/homepage/homepage2.jpg", alt: "A young artist painting" },
  { src: "/products/warli-art/page-03-06.jpeg", alt: "Hand-painted Warli serving tray" },
  { src: "/products/jute/page-07-02.png", alt: "Jute bag with a painted tree of life" },
  { src: "/homepage/homepage4.jpg", alt: "Diya-painting workshop" },
  { src: "/products/cotton/page-09-01.png", alt: "Festive silk potli bags" },
  { src: "/products/warli-art/page-04-05.png", alt: "Round Warli coaster set" },
];

const ROW_B = [
  { src: "/products/cotton/page-08-06.png", alt: "Black paisley cotton handbag" },
  { src: "/homepage/homepage1.jpg", alt: "An artist painting with their foot" },
  { src: "/products/file-notepad/page-10-03.jpeg", alt: "Warli-tree jute folder" },
  { src: "/products/jute/page-06-04.jpeg", alt: "Ganesha jute bag" },
  { src: "/products/warli-art/page-02-03.jpeg", alt: "Warli coaster and holder" },
  { src: "/products/jute/page-07-01.png", alt: "Jute bag with Warli dancers" },
];

function Row({ items, speed }) {
  return (
    <Marquee speed={speed} className="gallery-row">
      {items.map((it) => (
        <figure className="gallery-item" key={it.src + speed}>
          <Image src={it.src} alt={it.alt} fill sizes="340px" />
        </figure>
      ))}
    </Marquee>
  );
}

export default function Gallery() {
  return (
    <section className="gallery section-sm">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">The workshop &amp; the work</p>
        </Reveal>
        <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 14 }}>
          Made by hand, <span className="italic-accent">every single one.</span>
        </SplitHeading>
      </div>

      <div className="gallery-rows">
        <Row items={ROW_A} speed={38} />
        <Row items={ROW_B} speed={-30} />
      </div>
    </section>
  );
}

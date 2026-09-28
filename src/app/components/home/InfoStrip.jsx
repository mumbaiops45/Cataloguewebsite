import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../anim/Reveal";
import SplitHeading from "../anim/SplitHeading";

// Short "get to know us" cards after the middle banner — each links to its page.
const CARDS = [
  { href: "/about", img: "/photos/meal-2.png", title: "About SEFD", text: "A nonprofit since 2011, empowering the differently abled through skills and livelihood." },
  { href: "/workshops", img: "/workshop/blockprinting.png", title: "Workshops", text: "Crochet, block printing, tie & dye, diya and fluid painting — taught hands-on." },
  { href: "/sanyukta", img: "/photos/sanyukta-1.png", title: "Sanyukta", text: "Empowering mothers of differently abled children. 5 projects completed." },
  { href: "/fog", img: "/impact/corporategifitingsolutons.png", title: "Friends of Gods", text: "Rs. 3,000/year membership that keeps our artisans gainfully occupied." },
  { href: "/gods-champs", img: "/photos/gods-champs.png", title: "GODS Champs", text: "Beneficiaries selling products and earning incentives with their parents." },
  { href: "/blessings", img: "/products/jute/page-06-03.jpeg", title: "Blessings", text: "All our products, sold under one brand — premium, handmade, meaningful." },
];

const FACTS = [
  ["2011", "Established"],
  ["12", "Full-time employees"],
  ["50%+", "Staff differently abled"],
  ["20+", "Partner NGOs"],
];

export default function InfoStrip() {
  return (
    <section className="section info-strip">
      <div className="wrap">
        <p className="eyebrow">Get to know us</p>
        <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
          More than a store — a <em>movement.</em>
        </SplitHeading>

        <Reveal className="info-facts" stagger style={{ marginTop: 32 }}>
          {FACTS.map(([n, label]) => (
            <div key={label}>
              <b>{n}</b>
              <span>{label}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="info-cards" stagger style={{ marginTop: 36 }}>
          {CARDS.map((c) => (
            <Link href={c.href} className="info-card" key={c.href}>
              <span className="info-card-img">
                <Image src={c.img} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" />
              </span>
              <span className="info-card-body">
                <b>
                  {c.title} <ArrowUpRight size={15} />
                </b>
                <span>{c.text}</span>
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../anim/Reveal";

export default function MidBanner() {
  return (
    <section className="mid-banner">
      <Image
        src="/homepage/homepage5.png"
        alt="SEFD artisans at work"
        fill
        sizes="100vw"
      />
      <div className="mid-banner-scrim" />
      <div className="wrap">
        <Reveal className="mid-banner-inner">
          <p className="eyebrow">Corporate &amp; bulk gifting</p>
          <h2>
            Give a gift that <em>gives back.</em>
          </h2>
          <p className="sub">
            Festive hampers, employee gifting and bulk orders — customised and
            handcrafted by SEFD artisans for your company or celebration.
          </p>
          <Link href="/contact" className="btn btn-orange">
            Enquire now <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

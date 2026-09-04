"use client";

import Marquee from "../anim/Marquee";
import { partners } from "../../lib/site";

export default function Partners() {
  return (
    <section className="partners">
      <p className="label">
        Trusted by corporates &amp; institutions across Mumbai
      </p>
      <Marquee speed={45}>
        {partners.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </Marquee>
    </section>
  );
}

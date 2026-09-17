import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../anim/Reveal";

export default function Intro() {
  return (
    <section className="intro">
      <div className="wrap intro-grid">
        <Reveal className="intro-media">
          <Image
            src="/homepage/homepage2.jpg"
            alt="An artisan hand-painting a product at SEFD"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
            style={{ objectFit: "cover" }}
          />
        </Reveal>
        <Reveal className="intro-content">
          <p className="eyebrow">Who we are</p>
          <h2>
            Handmade by artisans with <em>disabilities.</em>
          </h2>
          <p>
            Blessings is the retail brand of the Self Esteem Foundation for
            Disabled (SEFD) — every Warli art piece, jute bag, cotton bag and
            notepad folder here is handcrafted by differently-abled artisans.
            Your purchase becomes their wage, their skill and their dignity.
          </p>
          <Link href="/about" className="link-underline">
            Read our story <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

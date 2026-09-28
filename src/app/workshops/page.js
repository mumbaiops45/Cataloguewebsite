import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Droplets, Flame, Paintbrush, Scissors, Spool, Stamp } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";
import { workshops, workshopGallery } from "../lib/site";

export const metadata = {
  title: "Workshops & Skill Development",
  description:
    "Crochet, thread insertion, fluid painting, stencil painting, block printing, tie & dye and diya painting — SEFD's hands-on skill development workshops.",
};

const workshopIcons = {
  "Warli & Stencil Painting": Paintbrush,
  "Block Printing": Stamp,
  "Tie & Dye": Droplets,
  Crochet: Spool,
  "Fluid & Diya Painting": Flame,
  "Thread Insertion & Stitching": Scissors,
};

export default function WorkshopsPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="eyebrow">Workshops · Skill development</p>
          <SplitHeading as="h1">
            Workshop &amp; skill development <em>activities.</em>
          </SplitHeading>
          <p>
            Hands-on training in crafts that turn into saleable products — so
            every skill learned becomes a source of livelihood.
          </p>
        </div>
      </header>

      <section className="section-sm" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <p className="eyebrow">In pictures</p>
          <Reveal className="workshop-gallery" stagger style={{ marginTop: 28 }}>
            {workshopGallery.map((g) => (
              <figure className={`gitem gitem-${g.slot}`} key={g.slot}>
                <div className="gitem-media">
                  {g.images.map((src) => (
                    <div className="gitem-img" key={src}>
                      <Image src={src} alt={g.caption} fill sizes="(max-width: 1080px) 50vw, 20vw" />
                    </div>
                  ))}
                </div>
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">What we teach</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Crafts, taught hands-on.
          </SplitHeading>
          <Reveal className="value-grid" stagger style={{ marginTop: 44 }}>
            {workshops.map((w) => {
              const Icon = workshopIcons[w.name];
              return (
                <div className="value" key={w.name}>
                  {Icon && <Icon size={22} style={{ color: "var(--orange-deep)" }} />}
                  <h3>{w.name}</h3>
                  <p>{w.note}</p>
                </div>
              );
            })}
          </Reveal>
          <Reveal style={{ marginTop: 40 }}>
            <Link href="/contact" className="btn">
              Book a workshop <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

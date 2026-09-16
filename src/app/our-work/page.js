import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  Droplets,
  Flame,
  Gift,
  Paintbrush,
  Scissors,
  Spool,
  Stamp,
  Users2,
} from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";
import { workshops, workshopGallery, projects } from "../lib/site";

export const metadata = {
  title: "Our Work",
  description:
    "Workshops and skill development, the Sanyukta project, GODS Champs and Friends of GODS — how SEFD turns training into livelihood.",
};

const workshopIcons = {
  "Warli & Stencil Painting": Paintbrush,
  "Block Printing": Stamp,
  "Tie & Dye": Droplets,
  Crochet: Spool,
  "Fluid & Diya Painting": Flame,
  "Thread Insertion & Stitching": Scissors,
};

const projectIcons = {
  Sanyukta: Users2,
  "GODS Champs": Award,
  "Friends of GODS (FOG)": Gift,
};

const orders = [
  "3,100 jute pouches — Madhupushma natural skincare, Pune",
  "465 sanitary-napkin pouches — Vishv Foods & Beverages LLP",
  "200 cloth bags — Friends of GODS member order",
  "150 cloth bags — P.N. Doshi Women's College, Chembur",
  "35 coin pouches — bulk customer order",
];

export default function OurWorkPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="eyebrow">Workshops · Projects · Programs</p>
          <SplitHeading as="h1">
            Training that ends in a <em>wage.</em>
          </SplitHeading>
          <p>
            Skill development is only the start. Every workshop feeds a product
            line, every product line feeds an order, and every order feeds a
            stipend.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Workshops &amp; skill development</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Six crafts, taught hands-on.
          </SplitHeading>
          <Reveal className="value-grid" stagger style={{ marginTop: 44 }}>
            {workshops.map((w) => {
              const Icon = workshopIcons[w.name];
              return (
                <div className="value" key={w.name}>
                  {Icon && <Icon size={22} style={{ color: "var(--orange-deep)" }} />}
                  <h3 style={{ marginTop: Icon ? undefined : 0 }}>{w.name}</h3>
                  <p>{w.note}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      <section className="section-sm" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <p className="eyebrow">In pictures</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Workshop &amp; Skill Development Activities
          </SplitHeading>

          <Reveal className="workshop-gallery" stagger style={{ marginTop: 44 }}>
            {workshopGallery.map((g) => (
              <figure className={`gitem gitem-${g.slot}`} key={g.slot}>
                <div className="gitem-media">
                  {g.images.map((src) => (
                    <div className="gitem-img" key={src}>
                      <Image
                        src={src}
                        alt={g.caption}
                        fill
                        sizes="(max-width: 1080px) 50vw, 20vw"
                      />
                    </div>
                  ))}
                </div>
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <p className="eyebrow">Projects &amp; programs</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Where the work goes.
          </SplitHeading>

          <div className="project-list" style={{ marginTop: 44 }}>
            {projects.map((p) => {
              const Icon = projectIcons[p.title];
              return (
                <Reveal className="project" key={p.title}>
                  <div className="project-title">
                    {Icon && (
                      <span className="project-icon">
                        <Icon size={20} />
                      </span>
                    )}
                    <h3>{p.title}</h3>
                  </div>
                  <div>
                    <p className="tag">{p.tagline}</p>
                    <p>{p.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ textAlign: "center" }}>
          <p className="eyebrow center">Orders completed</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Real orders. Real deadlines.
          </SplitHeading>

          <Reveal className="order-grid" stagger style={{ marginTop: 44 }}>
            {orders.map((o, i) => {
              const [qty, rest] = o.split(" — ");
              return (
                <div className="order-card" key={o}>
                  <span className="order-n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <b>{qty}</b>
                    {rest && <p>{rest}</p>}
                  </div>
                </div>
              );
            })}
          </Reveal>

          <Reveal style={{ marginTop: 36 }}>
            <Link href="/shop" className="btn">
              Commission an order <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

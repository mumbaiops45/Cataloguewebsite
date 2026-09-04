import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";
import { workshops, projects } from "../lib/site";

export const metadata = {
  title: "Our Work",
  description:
    "Workshops and skill development, the Sanyukta project, GODS Champs and Friends of GODS — how SEFD turns training into livelihood.",
};

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
            {workshops.map((w) => (
              <div className="value" key={w.name}>
                <h3 style={{ marginTop: 0 }}>{w.name}</h3>
                <p>{w.note}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-sm">
        <div className="wrap">
          <Reveal className="wide-figure">
            <Image
              src="/homepage/homepage4.jpg"
              alt="A crochet and diya-painting workshop in progress at SEFD"
              width={1600}
              height={686}
            />
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
            {projects.map((p) => (
              <Reveal className="project" key={p.title}>
                <h3>{p.title}</h3>
                <div>
                  <p className="tag">{p.tagline}</p>
                  <p>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap prose-grid">
          <p className="eyebrow">Orders completed</p>
          <div>
            <SplitHeading as="h2" scroll>
              Real orders. Real deadlines.
            </SplitHeading>
            <Reveal>
              <ul style={{ marginTop: 22, listStyle: "none" }}>
                {[
                  "3,100 jute pouches — Madhupushma natural skincare, Pune",
                  "465 sanitary-napkin pouches — Vishv Foods & Beverages LLP",
                  "200 cloth bags — Friends of GODS member order",
                  "150 cloth bags — P.N. Doshi Women's College, Chembur",
                  "35 coin pouches — bulk customer order",
                ].map((o) => (
                  <li
                    key={o}
                    style={{
                      padding: "14px 0",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {o}
                  </li>
                ))}
              </ul>
              <Link href="/shop" className="btn" style={{ marginTop: 28 }}>
                Commission an order <ArrowUpRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

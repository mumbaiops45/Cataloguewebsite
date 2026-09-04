import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";
import Counter from "../components/anim/Counter";
import { impactStats, partners, awards } from "../lib/site";

export const metadata = {
  title: "Impact",
  description:
    "200+ people with disabilities in gainful employment, 700 Friends of GODS members, 50+ corporate orders a year, awards and recognition.",
};

export default function ImpactPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="eyebrow">The difference, measured</p>
          <SplitHeading as="h1">
            Every product is a <em>data point</em> for dignity.
          </SplitHeading>
          <p>
            SEFD supports more than 200 people with disabilities and the
            disadvantaged section through gainful employment and a decent source
            of livelihood.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <Reveal className="stat-grid" stagger>
            {impactStats.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat-n">
                  {s.plain ? s.value : <Counter to={s.value} suffix={s.suffix} />}
                </span>
                <p>{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-sm" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <p className="eyebrow">Awards &amp; recognition</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Recognised for the work.
          </SplitHeading>
          <Reveal className="award-grid" stagger style={{ marginTop: 40 }}>
            {awards.map((a) => (
              <div className="award" key={a.title}>
                <b>{a.title}</b>
                <span>{a.by}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Corporate &amp; institutional partners</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Employee engagement, internships, exhibitions, orders.
          </SplitHeading>
          <Reveal className="pill-row" stagger style={{ marginTop: 40 }}>
            {partners.map((p) => (
              <span className="pill" key={p}>
                {p}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="cta section">
        <div className="wrap">
          <SplitHeading as="h2" scroll>
            Add your organisation
            <br />
            to the <em>list.</em>
          </SplitHeading>
          <Reveal>
            <p>
              Run an employee engagement program, place a corporate gifting
              order, or host an exhibition at your office.
            </p>
            <Link href="/contact" className="btn btn-light">
              Talk to us <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";

export const metadata = {
  title: "Our Story",
  description:
    "The Self Esteem Foundation for Disabled is a Section 8 non-profit, established in 2011 by the MBA Foundation — beyond charity, a life with self esteem and dignity.",
};

const values = [
  { k: "Vision", h: "An inclusive community", t: "A strong network that builds positive attitude, professional training, opportunities and employment for persons with disabilities." },
  { k: "Mission", h: "Self esteem & dignity", t: "A life with self esteem and dignity for persons with disabilities — through skill, saleable products and a sustainable livelihood." },
  { k: "Method", h: "Beyond charity", t: "We create awareness of capability, provide training, and market the work through exhibitions, gifting and bulk orders." },
];

export default function AboutPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="eyebrow">Self Esteem Foundation for Disabled</p>
          <SplitHeading as="h1">
            Beyond charity — a life with <em>self esteem.</em>
          </SplitHeading>
          <p>
            SEFD is a social enterprise and a non-profit registered under Section
            25 of the Companies Act, 1956 (now Section 8), established on 9 April
            2011 with the purpose statement of the MBA Foundation.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap prose-grid">
          <p className="eyebrow">About SEFD</p>
          <div>
            <SplitHeading as="h2" scroll>
              A social inclusion project
              <br />
              disguised as a craft studio.
            </SplitHeading>
            <Reveal>
              <p style={{ marginTop: 22 }}>
                SEFD is committed to empowering the differently-abled and
                marginalised community by promoting self-sustenance — through
                skill development, making saleable products, and marketing them
                for a sustainable livelihood.
              </p>
              <p>
                Our primary focus is to create awareness about the capabilities
                of persons with disabilities and to provide meaningful employment
                through direct placements, corporate partnerships, exhibitions,
                corporate gifting and bulk product orders. Every product is
                handcrafted by our beneficiaries with the support of trainers,
                volunteers and paraputs.
              </p>
              <p>
                SEFD has 12 full-time employees and 2 trainees — of which 6
                employees and 2 trainees are differently-abled. More than 50% of
                our staff is differently-abled.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="wrap">
          <Reveal className="wide-figure">
            <Image
              src="/homepage/homepage1.jpg"
              alt="An artist painting at an SEFD exhibition"
              width={1600}
              height={686}
            />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <p className="eyebrow">What guides us</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Vision, mission, method.
          </SplitHeading>
          <Reveal className="value-grid" stagger style={{ marginTop: 44 }}>
            {values.map((v) => (
              <div className="value" key={v.k}>
                <span className="k">{v.k}</span>
                <h3>{v.h}</h3>
                <p>{v.t}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap prose-grid">
          <p className="eyebrow">Our partner</p>
          <div>
            <SplitHeading as="h2" scroll>
              G.O.D.S — MBA Foundation
            </SplitHeading>
            <Reveal>
              <p style={{ marginTop: 22 }}>
                SEFD is proudly associated with the MBA Foundation, our founder
                associate partner, and collaborates with over 20 other NGOs from
                the disability sector and marginalised communities who send us
                products for sale. We also provide complete fooding services to
                the residential beneficiaries of the MBA Foundation at subsidised
                rates through our Nutritious Meal Support Program.
              </p>
              <Link href="/our-work" className="btn" style={{ marginTop: 28 }}>
                See our work <ArrowUpRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

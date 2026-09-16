import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Eye, Target, TrendingUp, UtensilsCrossed, Users } from "lucide-react";
import { FaBuilding, FaGraduationCap, FaPeopleGroup } from "react-icons/fa6";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";
import { esteemedClients, leadership, partnerNgos, pillars, projects } from "../lib/site";

export const metadata = {
  title: "Our Story",
  description:
    "The Self Esteem Foundation for Disabled is a Section 8 non-profit, established in 2011 by the MBA Foundation — beyond charity, a life with self esteem and dignity.",
};

const values = [
  { k: "Vision", h: "An inclusive community", t: "A strong network that builds positive attitude, professional training, opportunities and employment for persons with disabilities.", icon: Eye },
  { k: "Mission", h: "Self esteem & dignity", t: "A life with self esteem and dignity for persons with disabilities — through skill, saleable products and a sustainable livelihood.", icon: Target },
  { k: "Method", h: "Beyond charity", t: "We create awareness of capability, provide training, and market the work through exhibitions, gifting and bulk orders.", icon: TrendingUp },
];

const objectives = [
  "Spread awareness of the capabilities of differently-abled persons.",
  "Provide the training necessary to make saleable products for self-sustenance and a livelihood.",
  "Work towards mainstreaming the community by sensitising society to the importance of inclusiveness and empathy.",
  "Promote and market the products made by differently-abled and marginalised communities.",
];

export default function AboutPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="eyebrow">Self Esteem Foundation for Disabled</p>
          <SplitHeading as="h1">
            Beyond charity a life with <em>self esteem.</em>
          </SplitHeading>
          <p>
            SEFD is a social enterprise and a non-profit registered under Section
            25 of the Companies Act, 1956 (now Section 8), established on 9 April
            2011 with the purpose statement of the MBA Foundation.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap prose-block center">
          <p className="eyebrow center">About SEFD</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
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
              SEFD actively works towards the social inclusion of persons with
              disabilities by fostering confidence, independence and equal
              opportunities — enabling them to become valued and productive
              members of society.
            </p>
            <ul className="chip-list">
              {pillars.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Reveal>
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
                <v.icon size={22} style={{ color: "var(--orange-deep)" }} />
                <span className="k">{v.k}</span>
                <h3>{v.h}</h3>
                <p>{v.t}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Leadership</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Guided since day one.
          </SplitHeading>
          <Reveal className="leadership-grid" stagger style={{ marginTop: 44 }}>
            <div className="leadership-chair">
              <span className="k">{leadership.chairman.role}</span>
              <h3>{leadership.chairman.name}</h3>
            </div>
            {leadership.directors.map((d) => (
              <div className="leadership-card" key={d}>
                <span className="k">Director</span>
                <h3>{d}</h3>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Strategic objectives</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            How we get there.
          </SplitHeading>
          <Reveal className="objective-list" stagger style={{ marginTop: 44 }}>
            {objectives.map((o, i) => (
              <div className="objective" key={o}>
                <span className="objective-n">{String(i + 1).padStart(2, "0")}</span>
                <p>{o}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <p className="eyebrow">Projects &amp; programs</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Where the story goes next.
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
            <Reveal className="project">
              <h3>Ishwari</h3>
              <div>
                <p className="tag">Divine Offerings</p>
                <p>
                  Exquisite gifting merchandise recycled and curated from
                  sarees offered to goddesses in temples during the festive
                  season — a special brand by SEFD.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal className="btn-row" style={{ marginTop: 28 }}>
            <Link href="/our-work" className="btn">
              See our work <ArrowUpRight size={16} />
            </Link>
            <Link href="/ishwari" className="btn btn-ghost">
              Explore Ishwari <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="info-highlight-grid" stagger>
            <div className="info-highlight">
              <span className="info-highlight-icon">
                <UtensilsCrossed size={20} />
              </span>
              <h3>Complete Fooding Services</h3>
              <p>
                We provide complete fooding services to the residential
                beneficiaries of the MBA Foundation at subsidised rates,
                through our Nutritious Meal Support Program.
              </p>
            </div>
            <div className="info-highlight">
              <span className="info-highlight-icon">
                <Users size={20} />
              </span>
              <h3>Our team</h3>
              <p>
                SEFD has 12 full-time employees and 2 trainees — of which 6
                employees and 2 trainees are differently-abled.{" "}
                <b style={{ color: "var(--orange-deep)" }}>
                  More than 50% of our staff is differently-abled.
                </b>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Trusted by</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Our esteemed <em>clients.</em>
          </SplitHeading>
          <Reveal className="clients-grid" stagger style={{ marginTop: 44 }}>
            <div className="clients-card">
              <span className="clients-icon">
                <FaBuilding size={18} />
              </span>
              <span className="k">Corporate clients</span>
              <div className="clients-tags">
                {esteemedClients.corporate.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>
            <div className="clients-card">
              <span className="clients-icon">
                <FaGraduationCap size={18} />
              </span>
              <span className="k">Institutional clients</span>
              <div className="clients-tags">
                {esteemedClients.institutional.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>
            <div className="clients-card">
              <span className="clients-icon">
                <FaPeopleGroup size={18} />
              </span>
              <span className="k">Social institutions</span>
              <div className="clients-tags">
                {esteemedClients.social.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper)" }}>
        <div className="wrap prose-block center">
          <p className="eyebrow center">Our partner</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            G.O.D.S — MBA Foundation
          </SplitHeading>
          <Reveal>
            <p style={{ marginTop: 22 }}>
              SEFD is proudly associated with the MBA Foundation, our founder
              associate partner, and collaborates with over 20 other NGOs from
              the disability sector and marginalised communities who send us
              products for sale.
            </p>
            <ul className="chip-list">
              {partnerNgos.map((n) => (
                <li key={n}>{n}</li>
              ))}
              <li>and other partner NGOs</li>
            </ul>
            <Link href="/our-work" className="btn" style={{ marginTop: 28 }}>
              See our work <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

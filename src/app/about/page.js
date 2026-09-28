import Image from "next/image";
import { HandHeart, Lightbulb, Target, UsersRound, UtensilsCrossed } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";
import BrochureInfo from "../components/home/BrochureInfo";

export const metadata = {
  title: "About SEFD",
  description:
    "SEFD is a nonprofit company under section 25 of the Companies Act 1956, established in 2011 — empowering the differently able and marginalized community.",
};

const blocks = [
  {
    Icon: UsersRound,
    paras: [
      "SEFD is a nonprofit company under section 25 of companies act 1956 established in 2011.",
      "SEFD is committed to empower the differently able and marginalized community by promoting self sustenance, by the way of skill development, making saleable products, promoting and marketing them for a sustainable livelihood.",
    ],
  },
  {
    Icon: Target,
    paras: [
      "Our primary focus is to create awareness about the capabilities of persons with disabilities and provide meaningful employment through direct placements, corporate partnerships, exhibitions, corporate gifting, and bulk product orders. Every product is handcrafted by our beneficiaries with the support of trainers, volunteers, and paraputs, ensuring that the proceeds contribute towards their stipend, skill enhancement, and continuous development.",
    ],
  },
  {
    Icon: HandHeart,
    paras: [
      "SEFD actively works towards the social inclusion of persons with disabilities by fostering confidence, independence, and equal opportunities, enabling them to become valued and productive members of society.",
    ],
  },
];

const pillars = [
  { Icon: UsersRound, label: "Empowering abilities" },
  { Icon: Lightbulb, label: "Creating opportunities" },
  { Icon: HandHeart, label: "Building self esteem" },
  { Icon: Target, label: "Promoting inclusion" },
];

export default function AboutPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="eyebrow">About</p>
          <SplitHeading as="h1">
            About <em>SEFD.</em>
          </SplitHeading>
        </div>
      </header>

      <section className="section">
        <div className="wrap info-split">
          <div className="about-blocks">
            {blocks.map(({ Icon, paras }, i) => (
              <Reveal className="about-block" key={i}>
                <span className="about-block-icon">
                  <Icon size={24} />
                </span>
                <div>
                  {paras.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="about-side">
            <Reveal className="info-contact">
              <p className="eyebrow">
                <UtensilsCrossed size={14} /> Complete fooding services
              </p>
              <p>
                We provide complete fooding services to the residential
                beneficiaries of <b>MBA Foundation at subsidized rates.</b>
              </p>
              <div className="info-photo">
                <Image
                  src="/photos/meal-thali.png"
                  alt="Beneficiaries at SEFD"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
              </div>
              <b>Nutritious Meal Support Program</b>
            </Reveal>

            <Reveal className="info-contact">
              <p className="eyebrow">Our team</p>
              <p>
                SEFD has 12 full time employees and 2 trainees, of which 6
                employees and 2 trainees are differently able.
              </p>
              <b style={{ color: "var(--orange-deep)" }}>
                More than 50% of SEFD staff is differently able.
              </b>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <Reveal className="about-pillars" stagger>
            {pillars.map(({ Icon, label }) => (
              <div key={label}>
                <span className="about-block-icon">
                  <Icon size={22} />
                </span>
                <b>{label}</b>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <BrochureInfo />
    </>
  );
}

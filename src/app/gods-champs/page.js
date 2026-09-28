import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Store } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";

export const metadata = {
  title: "GODS Champs (Champions)",
  description:
    "GODS Champs — an SEFD initiative empowering differently abled beneficiaries to become confident, independent and socially inclusive through entrepreneurship.",
};

const objectives = [
  "Empower differently abled individuals with skills and confidence",
  "Promote entrepreneurship and self-sustenance",
  "Encourage social inclusion and community participation",
  "Create avenues for earning and recognition",
  "Build a supportive and empathetic society",
];

export default function GodsChampsPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="eyebrow">Empowering differently abled beneficiaries</p>
          <SplitHeading as="h1">
            GODS Champs <em>(Champions).</em>
          </SplitHeading>
          <p>
            GODS Champs (Champions) is a heartfelt initiative by Self Esteem
            Foundation For Disabled (SEFD) that empowers differently abled
            beneficiaries to become confident, independent, and socially
            inclusive through entrepreneurship and community participation.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap info-split">
          <Reveal>
            <div className="info-callout">
              <Store size={22} />
              GODS champions are encouraged to sell the products with the help of
              parents and earn attractive incentives.
            </div>
            <p className="eyebrow" style={{ marginTop: 32 }}>Our objectives</p>
            <ul className="info-checks" style={{ marginTop: 20 }}>
              {objectives.map((o) => (
                <li key={o}>
                  <CheckCircle2 size={18} /> {o}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="info-photo">
            <Image
              src="/photos/gods-champs.png"
              alt="GODS Champs beneficiaries celebrating together"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-sm" style={{ background: "var(--paper)" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <p className="info-quote">
              As GODS Champs, we don&apos;t see disabilities; we see champions in
              the making. Together, let&apos;s build a more inclusive and empowered
              tomorrow.
            </p>
            <Link href="/shop" className="btn" style={{ marginTop: 24 }}>
              Shop their products <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

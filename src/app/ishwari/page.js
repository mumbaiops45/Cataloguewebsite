import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";
import IshwariProductGrid from "../components/ishwari/IshwariProductGrid";
import { sefdAbout, ishwariAbout } from "../lib/site";

export const metadata = {
  title: "Ishwari — Divine Offerings",
  description:
    "Ishwari is a special brand by SEFD — exquisite gifting merchandise recycled and curated from sarees offered to goddesses in temples during the festive season.",
};

const traits = [
  { k: "Recycled", t: "Sarees offered to goddesses in temples, reimagined beautifully." },
  { k: "Handcrafted", t: "Made by differently-abled and disadvantaged beneficiaries." },
  { k: "Blessed", t: "Creations for gifting with purpose — every purchase a livelihood." },
];

export default function IshwariPage() {
  return (
    <>
      <header className="page-head" style={{ background: "var(--maroon)" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--orange-soft)" }}>
            A special brand by SEFD
          </p>
          <SplitHeading as="h1">
            Ishwari — <em>Divine Offerings</em>
          </SplitHeading>
          <p>
            Crafted with devotion. Blessed with purpose. During auspicious
            festivals, temples receive thousands of sarees draped over their
            deities. Ishwari rescues that fabric and curates it into exquisite
            gifting you will be happy to possess as a blessing.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap prose-grid">
          <div className="ishwari-intro-badge">
            <p className="eyebrow">About SEFD</p>
            <div className="ishwari-logo-card">
              <Image
                src="/products/catalogue/Ishwari.png"
                alt="Ishwari — Divine Offerings"
                width={607}
                height={169}
              />
            </div>
            <ul className="ishwari-traits">
              {traits.map((v) => (
                <li key={v.k}>
                  <span className="k">{v.k}</span>
                  <p>{v.t}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SplitHeading as="h2" scroll>
              Beyond charity —
              <br />
              a life with self esteem.
            </SplitHeading>
            <Reveal>
              <p style={{ marginTop: 22 }}>{sefdAbout}</p>
              <p>{ishwariAbout}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="catalogue">
        <div className="wrap">
          <p className="eyebrow">Shop the range</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Product Catalogue
          </SplitHeading>
          <p className="lead" style={{ marginTop: 18, maxWidth: "56ch" }}>
            Every Ishwari piece, in stock and ready to gift. Add what you love
            to your cart, or buy it now — proceeds go straight to the artisans
            who made it.
          </p>

          <div style={{ marginTop: 44 }}>
            <IshwariProductGrid />
          </div>
        </div>
      </section>

      <section className="cta section">
        <div className="wrap">
          <SplitHeading as="h2" scroll>
            Gift a blessing.
          </SplitHeading>
          <Reveal>
            <p>
              Ishwari pieces are made to order. Write to us for the current
              lookbook, festival timelines and bulk gifting.
            </p>
            <Link href="/contact" className="btn btn-light">
              Contact SEFD <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

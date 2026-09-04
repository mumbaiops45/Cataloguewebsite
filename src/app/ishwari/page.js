import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";
import { ishwariItems, ishwariImages } from "../lib/site";

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
          <p className="eyebrow">The idea</p>
          <div>
            <SplitHeading as="h2" scroll>
              Soft-launched on 7 March 2026,
              <br />
              on Women&apos;s Day.
            </SplitHeading>
            <Reveal>
              <p style={{ marginTop: 22 }}>
                Ishwari sits under the Self Esteem Foundation for Disabled. The
                range is recycled and curated from sarees offered to goddesses in
                the temple during the auspicious festive season — turned, by the
                hands of our artisans, into torans, gudhi vastra, cushion covers,
                bags, purses and table linen.
              </p>
              <p>
                We are absolutely certain you will be happy to possess these
                products as blessings, and to gift them to your family and
                friends. Every purchase supports inclusion, dignity and
                self-reliance.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <Reveal className="value-grid" stagger>
            {traits.map((v) => (
              <div className="value" key={v.k}>
                <span className="k">{v.k}</span>
                <p>{v.t}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">The offerings</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            The Ishwari price list
          </SplitHeading>

          <Reveal
            className="ishwari-list"
            stagger
            style={{ marginTop: 40, color: "var(--ink)" }}
          >
            {ishwariItems.map((it) => (
              <li
                key={it.name}
                style={{ borderColor: "var(--line)", color: "var(--ink)" }}
              >
                <span>{it.name}</span>
                <b style={{ color: "var(--orange-deep)" }}>{it.price}</b>
              </li>
            ))}
          </Reveal>

          <Reveal style={{ marginTop: 44 }}>
            <div className="catalogue-strip">
              {ishwariImages.map((src, i) => (
                <figure key={src}>
                  <Image
                    src={src}
                    alt={`Ishwari recycled-saree craft ${i + 1}`}
                    width={480}
                    height={600}
                  />
                </figure>
              ))}
            </div>
          </Reveal>
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

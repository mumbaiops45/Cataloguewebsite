import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../anim/Reveal";
import SplitHeading from "../anim/SplitHeading";

const pills = [
  "Warli & stencil painting",
  "Block printing",
  "Tie & dye",
  "Crochet",
  "Machine stitching",
];

export default function Story() {
  return (
    <section className="story section">
      <div className="wrap story-grid">
        <Reveal className="story-figure">
          <div className="img-a">
            <Image
              src="/homepage/homepage4.jpg"
              alt="Beneficiaries decorating diyas together in an SEFD workshop"
              width={900}
              height={1125}
            />
          </div>
          <div className="img-b">
            <Image
              src="/homepage/homepage2.jpg"
              alt="A young artist painting at a public workshop"
              width={500}
              height={500}
            />
          </div>
          <span className="badge">Since 2011 · Section 8 non-profit</span>
        </Reveal>

        <div className="story-body">
          <p className="eyebrow">Who makes Blessings</p>
          <SplitHeading as="h2" scroll className="display-3">
            A workshop where a disability is <em>not the story.</em>
          </SplitHeading>
          <Reveal>
            <p className="lead">
              SEFD is a social enterprise of the MBA Foundation. More than half
              of our own team is differently-abled. Alongside trainers,
              volunteers and paraputs, our artisans learn a craft, make a
              saleable product, and earn a wage that funds their independence.
            </p>
            <div className="pill-row">
              {pills.map((p) => (
                <span className="pill" key={p}>
                  {p}
                </span>
              ))}
            </div>
            <Link href="/our-work" className="btn">
              See how it&apos;s made <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

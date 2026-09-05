import Image from "next/image";
import Reveal from "../anim/Reveal";
import SplitHeading from "../anim/SplitHeading";

/**
 * "How it's made" — each step carries a photo of the work in progress.
 *
 * TODO: replace `img` with dedicated SEFD process photos when available —
 *   step 1: an artisan drawing / Warli painting
 *   step 2: block-printing, cutting and stitching bags & purses
 *   step 3: the finished range at an exhibition / being handed over
 * Drop the files in /public/homepage/ and update the paths below.
 */
const steps = [
  {
    k: "01",
    title: "Drawing & painting",
    body: "Beneficiaries train in Warli art, stencil and fluid painting with dedicated trainers — the linework that goes onto wood, cloth and bags.",
    img: "/homepage/homepage2.jpg",
    alt: "An SEFD artisan painting by hand",
  },
  {
    k: "02",
    title: "Printing & stitching",
    body: "Recycled sarees, jute and cotton are block-printed, cut and machine-stitched into bags, purses, folders and table linen in our Airoli workshop.",
    img: "/homepage/homepage4.jpg",
    alt: "Artisans making products together in the SEFD workshop",
  },
  {
    k: "03",
    title: "To market, with dignity",
    body: "The finished range travels to exhibitions, corporate gifting and bulk orders — and the proceeds become stipends, skills and independence.",
    img: "/homepage/homepage1.jpg",
    alt: "SEFD's work on show at a public exhibition",
  },
];

export default function Process() {
  return (
    <section className="process section" id="process">
      <div className="wrap">
        <div className="process-head">
          <div>
            <p className="eyebrow">How it&apos;s made</p>
            <SplitHeading as="h2" scroll className="display-2">
              From the training bench <em>to your table.</em>
            </SplitHeading>
          </div>
        </div>

        <Reveal className="steps" stagger>
          {steps.map((s) => (
            <article className="step" key={s.k}>
              <div className="step-media">
                <Image src={s.img} alt={s.alt} fill sizes="(max-width: 900px) 100vw, 33vw" />
                <span className="step-k">{s.k}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

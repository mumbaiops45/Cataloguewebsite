import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";
import { awardsGallery } from "../lib/site";

export const metadata = {
  title: "Awards & Recognition",
  description:
    "Rotary Social Impact Award, Viksit Bharat Mahila Udyojika Sammelan, Navi Mumbai Municipal Corporation's Women Achiever honour and more — SEFD's wall of recognition.",
};

const featured = awardsGallery.find((a) => a.featured);
const rest = awardsGallery.filter((a) => !a.featured);

export default function AwardsPage() {
  return (
    <>
      <header className="page-head" style={{ background: "var(--maroon)" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--orange-soft)" }}>
            Wall of honour
          </p>
          <SplitHeading as="h1">
            Awards &amp; <em>recognition.</em>
          </SplitHeading>
          <p>
            Every honour belongs to the artisans first — proof that dignity and
            good work travel further than charity ever could.
          </p>
        </div>
      </header>

      {featured && (
        <section className="section-sm">
          <div className="wrap">
            <Reveal className="award-feature">
              <div className="award-feature-media">
                {featured.images.map((src) => (
                  <div className="award-feature-img" key={src}>
                    <Image src={src} alt={featured.title} fill sizes="(max-width: 900px) 100vw, 50vw" />
                  </div>
                ))}
              </div>
              <div className="award-feature-info">
                <span className="award-badge">
                  <Award size={13} /> Featured honour
                </span>
                <h2>{featured.title}</h2>
                <p className="by">
                  {featured.by} · {featured.when}
                </p>
                <p>{featured.note}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">More recognition</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Seen, and celebrated.
          </SplitHeading>

          <Reveal className="award-photo-grid" stagger style={{ marginTop: 44 }}>
            {rest.map((a) => (
              <article className="award-photo-card" key={a.title}>
                <div className="award-photo-media">
                  <Image src={a.images[0]} alt={a.title} fill sizes="(max-width: 900px) 50vw, 25vw" />
                </div>
                <div className="award-photo-body">
                  <h3>{a.title}</h3>
                  <p className="by">
                    {a.by}
                    {a.when ? ` · ${a.when}` : ""}
                  </p>
                  <p>{a.note}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="cta section">
        <div className="wrap">
          <SplitHeading as="h2" scroll>
            Every award is a shared one.
          </SplitHeading>
          <Reveal>
            <p>
              These honours are earned by our artisans, trainers and partners
              together. See the numbers behind the recognition.
            </p>
            <Link href="/impact" className="btn btn-light">
              See our impact <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

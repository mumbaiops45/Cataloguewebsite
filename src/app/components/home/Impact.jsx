import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../anim/Reveal";
import SplitHeading from "../anim/SplitHeading";
import Counter from "../anim/Counter";
import { impactStats } from "../../lib/site";

export default function Impact() {
  return (
    <section className="impact section">
      <div className="wrap">
        <div className="impact-head">
          <div>
            <p className="eyebrow">The difference</p>
            <SplitHeading as="h2" scroll className="display-3">
              Numbers that mean a <em>livelihood.</em>
            </SplitHeading>
          </div>
          <Reveal>
            <p>
              SEFD supports more than 200 people with disabilities and the
              disadvantaged community through gainful employment and a decent
              source of livelihood.
            </p>
            <Link href="/impact" className="link-underline">
              Full impact <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>

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
  );
}

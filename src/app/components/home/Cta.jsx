import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../anim/Reveal";
import SplitHeading from "../anim/SplitHeading";

export default function Cta() {
  return (
    <section className="cta section">
      <div className="wrap">
        <SplitHeading as="h2" scroll>
          Buy a gift.
          <br />
          Give a <em>livelihood.</em>
        </SplitHeading>
        <Reveal>
          <p>
            Shop the range, commission a corporate order, or join Friends of GODS
            for ₹3,000 a year. Every rupee keeps a differently-abled artisan
            gainfully at work.
          </p>
          <Link href="/shop" className="btn btn-light">
            Start shopping <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../anim/Reveal";
import SplitHeading from "../anim/SplitHeading";
import { ishwariImages, ishwariItems } from "../../lib/site";

export default function Ishwari() {
  return (
    <section className="ishwari section" id="ishwari">
      <div className="wrap ishwari-grid">
        <div>
          <p className="eyebrow" style={{ color: "var(--orange-soft)" }}>
            Ishwari — Divine Offerings
          </p>
          <SplitHeading as="h2" scroll>
            Sarees offered to the goddess,
            <br />
            <span className="script">reborn as blessings.</span>
          </SplitHeading>
          <Reveal>
            <p>
              During the festive season, temples receive thousands of sarees
              draped over the deities. Ishwari rescues that fabric and, in the
              hands of our artisans, curates it into torans, gudhi vastra,
              cushion covers, bags and table linen — exquisite gifting you can
              keep as a blessing.
            </p>
            <ul className="ishwari-list">
              {ishwariItems.slice(0, 10).map((it) => (
                <li key={it.name}>
                  <span>{it.name}</span>
                  <b>{it.price}</b>
                </li>
              ))}
            </ul>
            <Link href="/ishwari" className="btn btn-orange">
              Explore Ishwari <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>

        <Reveal className="ishwari-figs" stagger>
          {ishwariImages.map((src, i) => (
            <div key={src}>
              <Image
                src={src}
                alt={`Ishwari recycled-saree craft ${i + 1}`}
                width={480}
                height={640}
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

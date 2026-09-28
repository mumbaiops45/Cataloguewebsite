import Image from "next/image";
import Link from "next/link";
import { Award, ArrowUpRight, Leaf, Recycle, Scissors, Users2 } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";

export const metadata = {
  title: "Sanyukta Project",
  description:
    "Sanyukta — empowering mothers of differently abled children and differently abled youngsters. 5 impactful projects completed.",
};

const highlights = [
  { Icon: Users2, title: "Empowered mothers & differently abled youth" },
  { Icon: Scissors, title: "Skill development & advanced training" },
  { Icon: Leaf, title: "Eco-friendly jute & cloth craftsmanship excellence" },
  { Icon: Recycle, title: "Sustainable products for a better tomorrow" },
  { Icon: Award, title: "Certificates & enhanced livelihood opportunities" },
];

const orders = [
  ["35 Coin Pouches", "Bulk order of customer"],
  ["200 Cloth Bags", "Order of our FOG member"],
  ["3100 Jute Pouches", "For Madhupushma natural skincare products from Pune"],
  ["465 Sanitary Napkin Pouches", "For Vishv Foods and Beverages LLP"],
  ["150 Cloth Bags", "For Smt. P.N. Doshi Women's College, Vivekanand Business School, Chembur"],
];

const gallery = [
  "/photos/sanyukta-1.png",
  "/photos/sanyukta-2.png",
  "/photos/sanyukta-3.png",
  "/products/catalogue/clothbag.png",
  "/products/catalogue/knotbag.png",
  "/products/catalogue/shoulderbag.png",
  "/products/catalogue/moneypurse.png",
];

export default function SanyuktaPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="eyebrow">Sanyukta · Empower Woman, Empower Family</p>
          <SplitHeading as="h1">
            Empowering lives. Creating sustainable <em>futures.</em>
          </SplitHeading>
          <p>
            For empowerment of mothers of differently abled children and
            differently abled youngsters. Under Sanyukta, we have successfully
            completed 5 impactful projects.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Key highlights &amp; impact</p>
          <Reveal className="value-grid" stagger style={{ marginTop: 28 }}>
            {highlights.map(({ Icon, title }) => (
              <div className="value" key={title}>
                <Icon size={22} style={{ color: "var(--orange-deep)" }} />
                <h3>{title}</h3>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper)" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <p className="eyebrow center">Orders successfully completed</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            5 projects. Countless lives <em>empowered.</em>
          </SplitHeading>
          <Reveal className="order-grid" stagger style={{ marginTop: 44 }}>
            {orders.map(([qty, rest], i) => (
              <div className="order-card" key={qty + rest}>
                <span className="order-n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <b>{qty}</b>
                  <p>{rest}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Made under Sanyukta</p>
          <Reveal className="info-gallery" stagger style={{ marginTop: 28 }}>
            {gallery.map((src) => (
              <div className="info-gallery-img" key={src}>
                <Image src={src} alt="Sanyukta handmade product" fill sizes="(max-width: 640px) 50vw, 16vw" />
              </div>
            ))}
          </Reveal>
          <Reveal style={{ marginTop: 40, textAlign: "center" }}>
            <p className="info-quote">Together, we create impact that lasts.</p>
            <Link href="/contact" className="btn" style={{ marginTop: 20 }}>
              Place a bulk order <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

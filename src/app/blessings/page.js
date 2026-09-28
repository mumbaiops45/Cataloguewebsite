import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gift, HeartHandshake, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";
import { contact } from "../lib/site";

export const metadata = {
  title: "Blessings — GODs Gifts",
  description:
    "All SEFD products are sold under the brand Blessings — premium quality, handcrafted with care by differently-abled beneficiaries.",
};

const promises = [
  { Icon: ShieldCheck, title: "Premium quality" },
  { Icon: HeartHandshake, title: "Handcrafted with care by differently-abled beneficiaries" },
  { Icon: Gift, title: "Perfect for gifting, decor & everyday use" },
];

const gallery = [
  "/products/jute/page-06-03.jpeg",
  "/products/warli-art/page-02-01.jpeg",
  "/products/cotton/page-08-01.jpeg",
  "/products/jute/page-07-05.jpeg",
  "/products/file-notepad/page-10-02.jpeg",
  "/products/warli-art/page-03-01.jpeg",
];

export default function BlessingsPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="eyebrow">Quality products. Meaningful impact.</p>
          <SplitHeading as="h1">
            All our products are sold under <em>“Blessings”.</em>
          </SplitHeading>
          <p>
            Every purchase you make supports our beneficiaries, creates
            employment and transforms lives.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <Reveal className="value-grid" stagger>
            {promises.map(({ Icon, title }) => (
              <div className="value" key={title}>
                <Icon size={22} style={{ color: "var(--orange-deep)" }} />
                <h3>{title}</h3>
              </div>
            ))}
          </Reveal>
          <Reveal className="info-gallery" stagger style={{ marginTop: 44 }}>
            {gallery.map((src) => (
              <div className="info-gallery-img" key={src}>
                <Image src={src} alt="Blessings handmade product" fill sizes="(max-width: 640px) 50vw, 16vw" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper)" }}>
        <div className="wrap info-split">
          <Reveal>
            <p className="eyebrow">Blessings store</p>
            <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
              Now sold <em>online.</em>
            </SplitHeading>
            <p style={{ marginTop: 16 }}>
              All our products are available for sale online under the Blessings
              brand — for better marketing and a wider reach. Together, we create
              opportunities. Together, we build an inclusive tomorrow.
            </p>
            <Link href="/shop" className="btn btn-orange" style={{ marginTop: 24 }}>
              Visit the store <ArrowUpRight size={16} />
            </Link>
          </Reveal>

          <Reveal className="info-contact">
            <p className="eyebrow">Get in touch</p>
            <b>Self Esteem Foundation for Disabled (SEFD)</b>
            <a href={contact.phoneHref}>
              <Phone size={16} /> {contact.phone}
            </a>
            <a href={contact.emailHref}>
              <Mail size={16} /> {contact.email}
            </a>
            <p>
              <MapPin size={16} /> {contact.address}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

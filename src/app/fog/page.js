import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Cookie,
  Gift,
  Handshake,
  Package,
  Scissors,
  SprayCan,
  Truck,
  Users2,
} from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";
import { contact } from "../lib/site";

export const metadata = {
  title: "FOG — Friends of Gods Scheme",
  description:
    "Beyond charity, a life with self esteem and dignity. Join the Friends of Gods (FOG) scheme — Rs. 3,000 per year annual membership.",
};

const why = [
  "Your contribution helps keep differently-abled individuals gainfully occupied.",
  "Proceeds from sales are distributed as stipends and salaries.",
  "Be part of a movement that builds self-esteem, dignity and independence.",
  "A small contribution by you creates a big difference in many lives.",
];

const range = [
  { Icon: SprayCan, title: "Cleaning Products", body: "Disinfectants, liquid soaps, hand wash, etc." },
  {
    Icon: Scissors,
    title: "Stitched Items",
    body: "Customizable jute and cloth bags, file folders, saree & shirt covers, aprons, table mats, table napkins & more. We now offer bags with tie-dye and hand block printed designs.",
  },
  {
    Icon: Cookie,
    title: "Food Items",
    body: "Freshly made dry snacks (laddoos, chivda, mathri, chakli, shankarpara), chocolates, pickles and squashes.",
  },
  {
    Icon: Gift,
    title: "Gifting & Festive Items",
    body: "Warli painted wooden items, diyas, perfumed & regular candles, door hangings, rangolis and agarbattis, gift envelopes, fancy paper bags, greeting cards etc.",
  },
];

const involve = [
  { Icon: Users2, body: "To become a member or for further queries, contact us through the telephone numbers and email address below." },
  { Icon: Handshake, body: "We encourage all existing members to recommend and introduce new members to help grow our network." },
  { Icon: Package, body: "Let us join hands and build an ever-expanding chain of support through the Friends of Gods' Club." },
];

export default function FogPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="eyebrow">FOG · Friends of Gods scheme</p>
          <SplitHeading as="h1">
            Beyond charity, a life with self esteem and <em>dignity.</em>
          </SplitHeading>
          <p>
            Self Esteem Foundation for Disabled (SEFD) is dedicated to empowering
            differently-abled and disadvantaged individuals — fostering an
            inclusive society by promoting positive attitudes, providing
            professional training, creating opportunities and ensuring
            employment. SEFD is proudly associated with the MBA Foundation and
            collaborates with over 20 other NGOs to promote and market their
            products.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap info-split">
          <Reveal>
            <p className="eyebrow">Why join FOG?</p>
            <ul className="info-checks" style={{ marginTop: 20 }}>
              {why.map((w) => (
                <li key={w}>
                  <CheckCircle2 size={18} /> {w}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="info-price">
            <p className="eyebrow">Membership contribution</p>
            <b className="info-price-n">Rs. 3,000/-</b>
            <span>per year as an annual membership</span>
            <p>
              <Gift size={16} /> Includes selected products and minimum delivery
              charges, delivered in 2 or 3 installments.
            </p>
            <p>
              <Truck size={16} /> For residences elsewhere in India, products
              worth Rs. 3,000/- are delivered with actual courier charges
              (excluding cleaning and snack items).
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <p className="eyebrow">Our product range</p>
          <Reveal className="value-grid" stagger style={{ marginTop: 28 }}>
            {range.map(({ Icon, title, body }) => (
              <div className="value" key={title}>
                <Icon size={22} style={{ color: "var(--orange-deep)" }} />
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">How to get involved</p>
          <Reveal className="value-grid" stagger style={{ marginTop: 28 }}>
            {involve.map(({ Icon, body }) => (
              <div className="value" key={body}>
                <Icon size={22} style={{ color: "var(--orange-deep)" }} />
                <p>{body}</p>
              </div>
            ))}
          </Reveal>
          <Reveal style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href={contact.phoneHref} className="btn btn-orange">
              Call {contact.phone}
            </a>
            <Link href="/contact" className="btn">
              Become a member <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

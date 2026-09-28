import { CheckCircle2 } from "lucide-react";
import Reveal from "../anim/Reveal";
import SplitHeading from "../anim/SplitHeading";

// Content from the SEFD brochure — mission, vision, leadership, objectives,
// what we do, clients and NGO partners. Shown on the About page.
const directors = ["Mrs. Meenal Mandlik", "Mrs. Meenakshi B", "Mr Amit Dholakia", "Mr Prakash Chawla"];

const objectives = [
  "Spread awareness of their capabilities (different abilities).",
  "Promote and market products made & services provided by them.",
  "Provide them with necessary training & job opportunities.",
  "Explore avenues to mainstream them — towards self sustenance & a life with dignity.",
];

const whatWeDo = [
  "Partner with NGOs who train the differently able and help them make saleable products as part of fruitful employment for their beneficiaries.",
  "Conduct awareness programs and workshops on issues related to people with disabilities — training, job opportunities, adaptations, access — towards their inclusion in society.",
  "Organize orientation programs & exhibitions of products made by partner NGOs in corporate houses, societies and institutions.",
  "Conduct internship programs on “Social Marketing” for college students.",
];

const clients = [
  ["Corporate clients", "Kamani Foods, L&T, ESSAR Group, Axis Bank, GODREJ, SBI, HIRANANDANI GROUP … (to name a few)"],
  ["Institutional clients", "Vivekanand College of Management, S M Shetty School & College, Hiranandani Foundation School"],
  ["Social institutions", "Rotary & Inner Wheel Clubs, Lions Club, Klub Nostalgia"],
];

const ngos = [
  "MBA Foundation (Airoli)",
  "Jagruti Palak Sanstha (Thane)",
  "Snehalaya (Thane)",
  "Kruti Foundation",
  "Adivasi Warli Kala Kendra (Jawhar, Thane)",
  "Aarohan",
  "Gurudev Bahuudeshiya Samajik Sanstha",
];

export default function BrochureInfo() {
  return (
    <>
      <section className="section">
        <div className="wrap info-split">
          <Reveal>
            <p className="eyebrow">Incorporated on 9th April 2011</p>
            <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
              Mission &amp; <em>vision.</em>
            </SplitHeading>
            <p style={{ marginTop: 20 }}>
              <b>Mission:</b> A life with self esteem &amp; dignity for persons with
              disabilities.
            </p>
            <p style={{ marginTop: 12 }}>
              <b>Vision:</b> A strong network to develop +ve attitude, professional
              training, opportunities &amp; employment, towards an inclusive
              community.
            </p>
          </Reveal>
          <Reveal className="info-contact">
            <p className="eyebrow">Leadership</p>
            <b>Late C R Balasubramanian — Chairman</b>
            <p>Directors of Self Esteem Foundation for Disabled:</p>
            <ul className="info-checks">
              {directors.map((d) => (
                <li key={d}>
                  <CheckCircle2 size={18} /> {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper)" }}>
        <div className="wrap info-split">
          <Reveal>
            <p className="eyebrow">Strategic objectives</p>
            <ul className="info-checks" style={{ marginTop: 20 }}>
              {objectives.map((o) => (
                <li key={o}>
                  <CheckCircle2 size={18} /> {o}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <p className="eyebrow">What do we do</p>
            <ul className="info-checks" style={{ marginTop: 20 }}>
              {whatWeDo.map((w) => (
                <li key={w}>
                  <CheckCircle2 size={18} /> {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap info-split">
          <Reveal>
            <p className="eyebrow">Our esteemed clients</p>
            <ul className="info-checks" style={{ marginTop: 20 }}>
              {clients.map(([k, v]) => (
                <li key={k}>
                  <CheckCircle2 size={18} />
                  <span>
                    <b>{k}</b> — {v}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <p className="eyebrow">Our esteemed NGO partners</p>
            <ul className="info-checks" style={{ marginTop: 20 }}>
              {ngos.map((n) => (
                <li key={n}>
                  <CheckCircle2 size={18} /> {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

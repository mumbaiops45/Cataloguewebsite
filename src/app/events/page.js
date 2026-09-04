import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";

export const metadata = {
  title: "Events",
  description:
    "Exhibitions, women-entrepreneur conferences, the Ishwari brand launch and awareness walks — where you can meet SEFD and shop in person.",
};

const events = [
  { date: "7 March 2026", title: "Ishwari brand soft-launch", where: "SEFD, Airoli · on Women's Day" },
  { date: "28 Feb 2025", title: "Viksit Bharat Mahila Udyojika Sammelan", where: "World Trade Centre, Mumbai · AWSIDC collaboration" },
  { date: "Mar 2024", title: "Tales of Loom — Handloom Festival", where: "World Trade Centre, Mumbai" },
  { date: "30 Apr 2024", title: "Rotary Social Impact Awards", where: "Rotary Club of Bombay Pier" },
  { date: "Ongoing", title: "Corporate exhibitions & employee engagement", where: "Hiranandani Hospital, Maersk, Lionbridge, Aurionpro & more" },
  { date: "Ongoing", title: "Awareness walks & school showcases", where: "Navi Mumbai" },
];

export default function EventsPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="eyebrow">Meet us in person</p>
          <SplitHeading as="h1">
            Where to find <em>Blessings.</em>
          </SplitHeading>
          <p>
            We exhibit through the year at corporate offices, colleges and craft
            festivals. Want us at your event? We bring the full range and the
            artisans behind it.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="project-list">
            {events.map((e) => (
              <Reveal className="project" key={e.title}>
                <h3 style={{ fontSize: "1.4rem" }}>{e.date}</h3>
                <div>
                  <p className="tag">{e.title}</p>
                  <p>{e.where}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ marginTop: 48 }}>
            <Link href="/contact" className="btn btn-orange">
              Invite SEFD to your event <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

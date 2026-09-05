import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";

export const metadata = {
  title: "Events",
  description:
    "Exhibitions, women-entrepreneur conferences, the Ishwari brand launch and awareness walks — where you can meet SEFD and shop in person.",
};

const events = [
  {
    date: "7 March 2026",
    title: "Ishwari brand soft-launch",
    where: "SEFD, Airoli · on Women's Day",
    img: "/events/image5.png",
  },
  {
    date: "28 Feb 2025",
    title: "Viksit Bharat Mahila Udyojika Sammelan",
    where: "World Trade Centre, Mumbai · AWSIDC collaboration",
    img: "/events/image2.png",
  },
  {
    date: "Mar 2024",
    title: "Tales of Loom — Handloom Festival",
    where: "World Trade Centre, Mumbai",
    img: "/events/image4.png",
  },
  {
    date: "30 Apr 2024",
    title: "Rotary Social Impact Awards",
    where: "Rotary Club of Bombay Pier",
  },
  {
    date: "Ongoing",
    title: "Corporate exhibitions & employee engagement",
    where: "Hiranandani Hospital, Maersk, Lionbridge, Aurionpro & more",
    img: "/events/image1.png",
  },
  {
    date: "Ongoing",
    title: "Annual celebration & talent showcase",
    where: "GODS Champs take the stage for staff, families and supporters",
    img: "/events/image3.png",
  },
  {
    date: "Ongoing",
    title: "Awareness walks & school showcases",
    where: "Navi Mumbai",
  },
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

      <section className="section-sm">
        <div className="wrap">
          <Reveal className="event-hero">
            <Image
              src="/events/image3.png"
              alt="GODS Champs performing on stage at SEFD's annual celebration"
              fill
              priority
              sizes="(max-width: 1080px) 100vw, 1200px"
            />
            <div className="event-hero-scrim" />
            <div className="event-hero-caption">
              <span>Annual celebration</span>
              <h2>Champions on stage, every single year.</h2>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">On the calendar</p>
          <SplitHeading as="h2" scroll className="display-3" style={{ marginTop: 16 }}>
            Recent &amp; ongoing events
          </SplitHeading>

          <div className="event-list" style={{ marginTop: 48 }}>
            {events.map((e) =>
              e.img ? (
                <Reveal className="event-row" key={e.title} y={24}>
                  <div className="event-media">
                    <Image
                      src={e.img}
                      alt={e.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 320px"
                    />
                  </div>
                  <div className="event-content">
                    <span className="event-date">
                      <Calendar size={12} /> {e.date}
                    </span>
                    <h3>{e.title}</h3>
                    <p>
                      <MapPin size={14} /> {e.where}
                    </p>
                  </div>
                </Reveal>
              ) : (
                <Reveal className="project" key={e.title} y={24}>
                  <h3 style={{ fontSize: "1.4rem" }}>{e.date}</h3>
                  <div>
                    <p className="tag">{e.title}</p>
                    <p>{e.where}</p>
                  </div>
                </Reveal>
              )
            )}
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

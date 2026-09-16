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
    w: 355,
    h: 531,
  },
  {
    date: "28 Feb 2025",
    title: "Viksit Bharat Mahila Udyojika Sammelan",
    where: "World Trade Centre, Mumbai · AWSIDC collaboration",
    img: "/events/image2.png",
    w: 727,
    h: 388,
  },
  {
    date: "Mar 2024",
    title: "Tales of Loom — Handloom Festival",
    where: "World Trade Centre, Mumbai",
    img: "/events/image4.png",
    w: 355,
    h: 497,
  },
  {
    date: "Ongoing",
    title: "Corporate exhibitions & employee engagement",
    where: "Hiranandani Hospital, Maersk, Lionbridge, Aurionpro & more",
    img: "/events/image1.png",
    w: 582,
    h: 388,
  },
  {
    date: "Ongoing",
    title: "Annual celebration & talent showcase",
    where: "GODS Champs take the stage for staff, families and supporters",
    img: "/events/image3.png",
    w: 586,
    h: 302,
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

          <Reveal className="event-tiles" stagger style={{ marginTop: 48 }}>
            {events.map((e) => (
              <div className="event-tile" key={e.title}>
                <Image
                  src={e.img}
                  alt={e.title}
                  width={e.w}
                  height={e.h}
                  sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="event-tile-scrim" />
                <div className="event-tile-content">
                  <span className="event-tile-date">
                    <Calendar size={11} /> {e.date}
                  </span>
                  <h3>{e.title}</h3>
                  <p>
                    <MapPin size={13} /> {e.where}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

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

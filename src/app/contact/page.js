import { Phone, Mail, MapPin, Globe } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import SplitHeading from "../components/anim/SplitHeading";
import ContactForm from "./ContactForm";
import { contact } from "../lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Reach the Self Esteem Foundation for Disabled — Gods' Abode, Sector 17, Airoli, Navi Mumbai. For orders, gifting, memberships and visits.",
};

export default function ContactPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="eyebrow">Get in touch</p>
          <SplitHeading as="h1">
            Let&apos;s make something <em>together.</em>
          </SplitHeading>
          <p>
            For product orders, corporate gifting, Friends of GODS membership,
            employee engagement programs or a visit to the workshop.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap contact-grid">
          <Reveal>
            <p className="eyebrow">Reach us</p>
            <div className="contact-lines" style={{ marginTop: 20 }}>
              <a href={contact.phoneHref}>
                <Phone size={17} />
                <span>
                  {contact.phone}
                  <br />
                  {contact.phoneAlt} · {contact.landline}
                </span>
              </a>
              <a href={contact.emailHref}>
                <Mail size={17} />
                {contact.email}
              </a>
              <a href={contact.website} target="_blank" rel="noopener noreferrer">
                <Globe size={17} />
                enabling-disabled.org
              </a>
              <p>
                <MapPin size={17} />
                {contact.address}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <p className="eyebrow">Send a message</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

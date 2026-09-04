import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { contact, nav } from "../../lib/site";
import FooterNewsletter from "./FooterNewsletter";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <h2>
            Beyond <em>charity.</em>
          </h2>
          <p>
            Blessings is the retail brand of the Self Esteem Foundation for
            Disabled. Every product is handcrafted by differently-abled artisans
            — the proceeds fund their stipend, training and continued
            development.
          </p>
          <Link href="/shop" className="btn btn-orange">
            Shop with purpose <ArrowUpRight size={16} />
          </Link>
          <div className="socials">
            <a href={contact.website} target="_blank" rel="noopener noreferrer">
              WEB
            </a>
            <a href="#" aria-label="Instagram">
              IG
            </a>
            <a href="#" aria-label="LinkedIn">
              IN
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Shop</h3>
          <Link href="/shop">All products</Link>
          <Link href="/shop?category=warli-art">Warli Art</Link>
          <Link href="/shop?category=jute">Jute Bags</Link>
          <Link href="/shop?category=cotton">Cotton Bags</Link>
          <Link href="/ishwari">Ishwari</Link>
        </div>

        <div className="footer-col">
          <h3>Foundation</h3>
          {nav
            .filter((i) => i.href !== "/shop" && i.href !== "/ishwari")
            .map((i) => (
              <Link key={i.href} href={i.href}>
                {i.name}
              </Link>
            ))}
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h3>Get in touch</h3>
          <a href={contact.phoneHref}>
            <Phone size={15} />
            {contact.phone}
          </a>
          <a href={contact.emailHref}>
            <Mail size={15} />
            {contact.email}
          </a>
          <address>
            <MapPin size={15} />
            {contact.address}
          </address>
        </div>
      </div>

      <div className="wrap">
        <FooterNewsletter />
      </div>

      <div className="footer-bottom">
        <div className="wrap footer-bottom-inner">
          <span>
            © {new Date().getFullYear()} Self Esteem Foundation for Disabled
          </span>
          <span className="footer-credit">
            Designed &amp; developed by{" "}
            <a
              href="https://nakshatranamahacreations.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nakshatra Namaha Creations
              <ArrowUpRight size={13} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

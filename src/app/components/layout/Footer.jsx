import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight, Globe } from "lucide-react";
import { contact, nav } from "../../lib/site";
import FooterNewsletter from "./FooterNewsletter";

function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z" />
    </svg>
  );
}

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
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="social-website"
              aria-label="Website"
            >
              <Globe size={16} />
            </a>
            <a href="#" className="social-instagram" aria-label="Instagram">
              <InstagramIcon width={16} height={16} />
            </a>
            <a href="#" className="social-linkedin" aria-label="LinkedIn">
              <LinkedinIcon width={16} height={16} />
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

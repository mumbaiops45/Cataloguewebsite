"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, Phone } from "lucide-react";
import { contact } from "../../lib/site";

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.34 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.14c-.24.68-1.4 1.3-1.93 1.35-.5.06-1.13.08-1.83-.11a15.1 15.1 0 0 1-1.66-.61c-2.92-1.26-4.82-4.2-4.97-4.4-.15-.19-1.19-1.58-1.19-3.01s.74-2.14 1-2.43c.26-.29.57-.36.76-.36h.55c.18 0 .42-.03.65.5.25.58.85 2.02.93 2.16.08.15.13.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.15.15-.31.32-.13.63.18.31.8 1.31 1.71 2.12 1.18 1.05 2.17 1.38 2.48 1.53.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.2-.31.41-.26.68-.16.28.1 1.76.83 2.06.98.31.15.51.23.58.35.08.13.08.72-.16 1.4z" />
    </svg>
  );
}

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="floating-actions">
      <a
        href={`https://wa.me/${contact.phoneHref.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fab fab-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon width={24} height={24} />
      </a>
      <Link href="/contact" className="fab fab-contact" aria-label="Contact us">
        <Phone size={20} />
      </Link>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fab fab-top ${showTop ? "visible" : ""}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}

import "./globals.css";

import { Fraunces, Inter } from "next/font/google";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SmoothScroll from "./components/anim/SmoothScroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const SITE_URL = "https://enabling-disabled.org";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Blessings by SEFD — Handcrafted with dignity",
    template: "%s — Blessings by SEFD",
  },
  description:
    "Blessings is the retail brand of the Self Esteem Foundation for Disabled. Every product — Warli art, jute, cotton, Ishwari divine offerings — is handmade by differently-abled artisans. Beyond charity: a life with self esteem and dignity.",
  keywords: [
    "SEFD",
    "Self Esteem Foundation for Disabled",
    "Ishwari",
    "handmade crafts India",
    "Warli art",
    "jute bags",
    "corporate gifting NGO",
    "disability employment",
  ],
  openGraph: {
    title: "Blessings by SEFD — Handcrafted with dignity",
    description:
      "Handmade products by differently-abled artisans. Every purchase creates meaningful work.",
    url: SITE_URL,
    siteName: "Blessings by SEFD",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <Navbar />

        <SmoothScroll>
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

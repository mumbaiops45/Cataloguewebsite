import "./globals.css";

import { Rubik } from "next/font/google";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SmoothScroll from "./components/anim/SmoothScroll";
import CartDrawer from "./components/cart/CartDrawer";
import ToastHost from "./components/layout/ToastHost";
import { AuthProvider } from "./components/auth/AuthContext";
import { LoginModalProvider } from "./components/auth/LoginModalContext";
import LoginModal from "./components/auth/LoginModal";
import { AccountDrawerProvider } from "./components/auth/AccountDrawerContext";
import AccountDrawer from "./components/auth/AccountDrawer";
import { getCategoryList } from "./utils/catalog";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
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

export default async function RootLayout({ children }) {
  const categories = await getCategoryList().catch(() => []);

  return (
    <html lang="en" className={rubik.variable}>
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <AuthProvider>
          <LoginModalProvider>
            <AccountDrawerProvider>
              <Navbar categories={categories} />

              <SmoothScroll>
                <main id="main" >{children}</main>
                <Footer />
              </SmoothScroll>

              <LoginModal />
              <AccountDrawer />
              <CartDrawer />
              <ToastHost />
            </AccountDrawerProvider>
          </LoginModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

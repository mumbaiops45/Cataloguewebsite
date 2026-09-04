import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import SplitHeading from "../components/anim/SplitHeading";

export const metadata = {
  title: "Cart",
  description: "Your Blessings cart.",
};

export default function CartPage() {
  return (
    <section className="section" style={{ paddingTop: "clamp(150px, 20vw, 220px)" }}>
      <div className="wrap" style={{ textAlign: "center", maxWidth: 560 }}>
        <ShoppingBag size={34} style={{ margin: "0 auto 20px", color: "var(--orange-deep)" }} />
        <SplitHeading as="h1" className="display-3">
          Your cart is empty.
        </SplitHeading>
        <p className="lead" style={{ margin: "20px auto 32px" }}>
          Online checkout is on the way. For now, browse the range and enquire —
          we&apos;ll confirm stock, pricing and delivery by email.
        </p>
        <Link href="/shop" className="btn btn-orange">
          Browse the shop <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}

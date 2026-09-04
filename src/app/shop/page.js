import { Suspense } from "react";
import SplitHeading from "../components/anim/SplitHeading";
import ShopBrowser from "./ShopBrowser";
import { products } from "../lib/products";

export const metadata = {
  title: "Shop",
  description:
    "Every Blessings product is handmade by differently-abled artisans — Warli art, jute bags, cotton slings and file & stationery. Shop with purpose.",
};

export default function ShopPage() {
  return (
    <div className="shop-page">
      <header className="page-head">
        <div className="wrap">
          <p className="eyebrow">The collection · {products.length} products</p>
          <SplitHeading as="h1">
            Shop with <em>purpose.</em>
          </SplitHeading>
          <p>
            Handmade in Navi Mumbai from recycled sarees, jute and wood. Choose a
            category, pick a piece, and put a wage in an artisan&apos;s hands.
          </p>
        </div>
      </header>

      <Suspense fallback={<div className="wrap section-sm">Loading products…</div>}>
        <ShopBrowser />
      </Suspense>
    </div>
  );
}

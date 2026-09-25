import { Suspense } from "react";
import SplitHeading from "../components/anim/SplitHeading";
import ShopBrowser from "./ShopBrowser";
import { getCatalog } from "../utils/catalog";
import { getProducts } from "../router/product.router";

export const metadata = {
  title: "Shop",
  description:
    "Every Blessings product is handmade by differently-abled artisans — Warli art, jute bags, cotton slings and file & stationery. Shop with purpose.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage({ searchParams }) {
  const { q } = await searchParams;
  const keyword = typeof q === "string" ? q.trim() : "";

  const [{ categories, products }, matches] = await Promise.all([
    getCatalog().catch(() => ({ categories: [], products: [] })),
    // the backend matches names with a case-insensitive regex; null = no search
    keyword ? getProducts({ keyword }).catch(() => []) : null,
  ]);
  const searchIds = matches ? matches.map((p) => String(p._id)) : null;

  return (
    <div className="shop-page">
      <header className="page-head">
        <div className="wrap">
      
          <SplitHeading as="h1">
            Shop with <em>purpose.</em>
          </SplitHeading>
         
        </div>
      </header>

      <Suspense fallback={<div className="wrap section-sm">Loading products…</div>}>
        <ShopBrowser initialCategories={categories} initialProducts={products} searchIds={searchIds} />
      </Suspense>
    </div>
  );
}

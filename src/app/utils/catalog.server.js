import { cache } from "react";
import { unstable_cache } from "next/cache";
import {
  getCatalog as fetchCatalog,
  getCategoryList as fetchCategoryList,
  getFeaturedProducts as fetchFeaturedProducts,
} from "./catalog";
import { getBanners as fetchBanners } from "../router/banner.router";

// Server-side cache for the storefront's backend reads. The full catalog
// takes one request per product (for its images), so without this every
// shop / product page view hit the backend ~50 times. Results are shared
// across visitors and refreshed at most every REVALIDATE seconds, so admin
// changes (stock, prices, new products, banners) show up within a minute.
const REVALIDATE = 60;
const opts = { revalidate: REVALIDATE, tags: ["catalog"] };

// unstable_cache shares across requests; react cache() dedupes within one
// render (layout + page + generateMetadata ask for the same data).
export const getCategoryList = cache(unstable_cache(fetchCategoryList, ["category-list"], opts));
export const getCatalog = cache(unstable_cache(fetchCatalog, ["catalog"], opts));
export const getFeaturedProducts = cache(unstable_cache(fetchFeaturedProducts, ["featured-products"], opts));
export const getBanners = cache(unstable_cache(fetchBanners, ["banners"], opts));

export { getProductFromList, getRelatedFromList } from "./catalog";

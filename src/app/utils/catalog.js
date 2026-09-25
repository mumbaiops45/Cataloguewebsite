import { cache } from "react";
import { getCategories } from "../router/category.router";
import { getProducts } from "../router/product.router";
import { getProductMedia } from "../router/productMedia.router";

const fmtPrice = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

function shapeCategory(c) {
  return {
    id: c._id,
    slug: c.slug,
    name: c.name,
    image: c.image || "",
    description: c.description || "",
  };
}

async function shapeProduct(p, categoryBySlugId) {
  const categoryId = typeof p.category === "object" && p.category !== null ? p.category._id : p.category;
  const category = categoryBySlugId.get(String(categoryId));

  const media = await getProductMedia(p._id);
  const primary = media.find((m) => m.isPrimary) || media[0];

  return {
    id: p._id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    priceLabel: fmtPrice(p.price),
    stock: p.stock,
    category: category?.name || "Uncategorised",
    categorySlug: category?.slug || "",
    description: p.shortDescription || "",
    longDescription: p.longDescription || "",
    image: primary?.url || "",
    images: media.map((m) => m.url).filter(Boolean),
  };
}

// Lightweight — categories only (no product/media fetch). Used by the
// Navbar, which just needs the name/slug/image for the menu.
// cache() dedupes calls within one server request (layout + page share it).
export const getCategoryList = cache(async () => {
  const rawCategories = await getCategories();
  return rawCategories.filter((c) => c.isActive !== false).map(shapeCategory);
});

// Fetches categories + products + (per product) primary media, and shapes
// everything into the fields the storefront UI already expects
// (slug, name, price, priceLabel, category, categorySlug, image, description).
export const getCatalog = cache(async () => {
  const [categories, rawProducts] = await Promise.all([getCategoryList(), getProducts()]);
  const categoryById = new Map(categories.map((c) => [String(c.id), c]));

  const activeRawProducts = rawProducts.filter((p) => p.isActive !== false);
  const products = await Promise.all(activeRawProducts.map((p) => shapeProduct(p, categoryById)));

  return { categories, products };
});

// Home page only shows a handful — fetch just those (and only their media)
// instead of the whole catalog.
export const getFeaturedProducts = cache(async (count = 8) => {
  const [categories, rawProducts] = await Promise.all([
    getCategoryList(),
    getProducts({ limit: count * 2 }),
  ]);
  const categoryById = new Map(categories.map((c) => [String(c.id), c]));

  const active = rawProducts.filter((p) => p.isActive !== false).slice(0, count);
  return Promise.all(active.map((p) => shapeProduct(p, categoryById)));
});

export function getProductFromList(products, slug) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedFromList(products, product, count = 4) {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, count);
}

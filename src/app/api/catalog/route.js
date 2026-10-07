import { getCatalog } from "../../utils/catalog.server";

// One request for the whole (server-cached) catalog. The cart uses it to show
// product names, prices and images, instead of the browser calling the
// backend once per product.
export async function GET() {
  const { products } = await getCatalog().catch(() => ({ products: [] }));
  return Response.json({ products });
}

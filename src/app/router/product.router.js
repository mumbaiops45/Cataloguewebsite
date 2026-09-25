import api from "../utils/axios";

// Public — GET /api/product needs no token. The backend paginates (default
// limit 10), so ask for everything; the shop filters by category client-side.
// Pass a category id to have the backend filter instead, or a keyword to
// have it match product names (case-insensitive regex).
export const getProducts = ({ keyword, category, page, limit = 1000 } = {}) =>
  api
    .get("/product", { params: { keyword: keyword || undefined, category, page, limit } })
    .then((r) => r.data.data.product || []);

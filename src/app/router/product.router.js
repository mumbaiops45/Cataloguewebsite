import api from "../utils/axios";

// Public — GET /api/product needs no token. The backend paginates (default
// limit 10), so ask for everything; the shop filters by category client-side.
// Pass a category id to have the backend filter instead.
export const getProducts = ({ category, page, limit = 1000 } = {}) =>
  api
    .get("/product", { params: { category, page, limit } })
    .then((r) => r.data.data.product || []);

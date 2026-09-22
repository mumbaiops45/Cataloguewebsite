import api from "../utils/axios";

// Public — GET /api/productMedia/:productId needs no token.
export const getProductMedia = (productId) =>
  api
    .get(`/productMedia/${productId}`)
    .then((r) => r.data.data.productMedia || [])
    .catch(() => []);

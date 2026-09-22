import api from "../utils/axios";

// Public — GET /api/product needs no token.
export const getProducts = () => api.get("/product").then((r) => r.data.data.product || []);

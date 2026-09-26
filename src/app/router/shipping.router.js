import api from "../utils/axios";

// GET /shipping is paginated server-side; ask for enough to get every slab
export const getShippingRates = () =>
  api.get("/shipping", { params: { page: 1, limit: 100 } }).then((r) => {
    const list = r.data?.data?.shipping ?? [];
    return Array.isArray(list) ? [...list].sort((a, b) => a.minOrderValue - b.minOrderValue) : [];
  });

import api from "../utils/axios";

// Public — GET /api/category needs no token.
export const getCategories = () => api.get("/category").then((r) => r.data.data.category || []);

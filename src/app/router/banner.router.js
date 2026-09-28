import api from "../utils/axios";

// GET /api/Banner — returns every banner (Hero + MIDDLE_BANNER).
export const getBanners = () => api.get("/Banner").then((r) => r.data.data.banner || []);

// Active banners of one type, sorted by their `order`.
export const splitBanners = (banners) => {
  const pick = (type) =>
    banners
      .filter((b) => b.type === type && b.isActive !== false && b.url)
      .sort((a, b) => a.order - b.order);
  return { hero: pick("Hero"), middle: pick("MIDDLE_BANNER") };
};

import api from "../utils/axios";

// The backend's create/get responses nest the cart under data.cart, while
// update/delete nest it under data.cart1 — normalise both to the same shape.
const unwrap = (res) => {
  const data = res.data?.data || {};
  return data.cart || data.cart1 || null;
};

export const createCart = (productId) =>
  api.post("/cart", { product: productId }).then(unwrap);

export const getCart = () => api.get("/cart").then(unwrap);

export const updateCartQty = (productId, quantity) =>
  api.put(`/cart/${productId}`, { quantity }).then(unwrap);

export const deleteCartItem = (productId) =>
  api.delete(`/cart/${productId}`).then(unwrap);

export const clearCartApi = () => api.delete("/cart").then(unwrap);

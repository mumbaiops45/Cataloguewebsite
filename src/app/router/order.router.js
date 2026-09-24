import api from "../utils/axios";

export const createOrder = (AddressId) => api.post("/order", { AddressId }).then((r) => r.data.data.order);
export const getOrders = ({ page = 1, limit = 50 } = {}) =>
  api.get("/order", { params: { page, limit } }).then((r) => r.data.data.order || []);
export const cancelOrder = (orderId) => api.put(`/order/${orderId}/cancel`).then((r) => r.data.data.order1);

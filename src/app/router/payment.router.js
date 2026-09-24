import api from "../utils/axios";

export const createPayment = (orderId) =>
  api.post("/payment/create", { orderId }).then((r) => r.data.data.razorpayOrder);
export const verifyPayment = (body) => api.post("/payment/verify", body).then((r) => r.data.data.order);

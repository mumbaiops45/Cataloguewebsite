import api from "../utils/axios";

export const getAddresses = () => api.get("/address").then((r) => r.data.data.address || []);
export const createAddress = (body) => api.post("/address", body).then((r) => r.data.data.address);
export const updateAddress = (id, body) => api.put(`/address/${id}`, body).then((r) => r.data.data.address);
export const deleteAddress = (id) => api.delete(`/address/${id}`).then((r) => r.data.data.address);

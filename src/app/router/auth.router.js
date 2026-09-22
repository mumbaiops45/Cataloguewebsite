import api from "../utils/axios";

export const registerCustomer = ({ name, email, phone, password }) =>
  api.post("/auth/register", { name, email, phone, password }).then((r) => r.data.data);

export const loginCustomer = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data.data);

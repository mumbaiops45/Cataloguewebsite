import axios from "axios";

// Base URL for the current backend (auth / category / product / productMedia).
// Override in .env.local if the backend runs elsewhere.
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");

const TOKEN_KEY = "blessings-token";

export function getToken() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // storage unavailable — session just won't persist
  }
}

// Timeout so a slow/asleep backend can't hang page renders indefinitely.
const api = axios.create({ baseURL: API_URL, timeout: 15000 });

// Attach the bearer token to every request when we're in the browser and
// a token is stored. Public GET endpoints (category/product/productMedia)
// simply ignore the header server-side.
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Surface the backend's own error message instead of the raw axios one.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export default api;

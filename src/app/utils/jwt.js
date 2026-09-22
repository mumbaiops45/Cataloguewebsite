// Minimal JWT payload decoder — the backend only returns a bearer token
// (no /me endpoint), so the id/role in the token payload is all we get
// back from the server about who's logged in.
export function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = typeof window === "undefined"
      ? Buffer.from(base64, "base64").toString("utf8")
      : decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
            .join("")
        );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

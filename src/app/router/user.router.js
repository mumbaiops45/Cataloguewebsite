import api from "../utils/axios";

// GET /api/user/profile — the logged-in user's own profile (name, phone, image…).
export const getMyProfile = () => api.get("/user/profile").then((r) => r.data.data.user);

// PUT /api/user — logged-in user updates their own name / phone / image.
// Sent as multipart so the optional image file goes in the "image" field.
export const updateMyProfile = ({ name, phone, imageFile }) => {
  const form = new FormData();
  if (name !== undefined) form.append("name", name);
  if (phone !== undefined) form.append("phone", phone);
  if (imageFile) form.append("image", imageFile);
  return api.put("/user", form).then((r) => r.data.data.user);
};

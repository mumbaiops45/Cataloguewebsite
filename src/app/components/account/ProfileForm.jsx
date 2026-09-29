"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { toast } from "../../store/toastStore";
import { firstError, only, rules } from "../../utils/validate";

// Edit own profile: photo, name, phone. Email is read-only.
export default function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef(null);

  const preview = useMemo(() => (imageFile ? URL.createObjectURL(imageFile) : ""), [imageFile]);
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const avatar = preview || user.image;
  const initial = (name || user.email || "?").trim().charAt(0).toUpperCase();

  const [errors, setErrors] = useState({});

  // Only real images, max 5 MB.
  const pickImage = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((er) => ({ ...er, image: "Please choose an image file (JPG, PNG or WEBP)." }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((er) => ({ ...er, image: "The image must be smaller than 5 MB." }));
      return;
    }
    setErrors((er) => ({ ...er, image: "" }));
    setImageFile(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = { name: rules.name(name), phone: rules.phone(phone) };
    setErrors(next);
    if (firstError(next)) return;
    setSaving(true);
    try {
      await updateProfile({ name: name.trim(), phone: phone.trim(), imageFile });
      setImageFile(null);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="acct-card profile-form" onSubmit={onSubmit}>
      <div className="profile-photo">
        <button
          type="button"
          className="profile-avatar"
          onClick={() => fileRef.current?.click()}
          aria-label="Change profile photo"
        >
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="Profile photo" />
          ) : (
            <span>{initial}</span>
          )}
          <i className="profile-avatar-cam">
            <Camera size={15} />
          </i>
        </button>
        <div>
          <b>Profile photo</b>
          <small>JPG or PNG. Click the photo to change it.</small>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => pickImage(e.target.files?.[0])}
        />
      </div>
      {errors.image && (
        <small className="field-error" role="alert" style={{ marginTop: -12, marginBottom: 16 }}>
          {errors.image}
        </small>
      )}

      <div className="acct-fields">
        <div className="field">
          <label htmlFor="pf-name">Name</label>
          <input
            id="pf-name"
            value={name}
            maxLength={50}
            aria-invalid={!!errors.name}
            onChange={(e) => {
              setName(only.letters(e.target.value));
              setErrors((er) => ({ ...er, name: "" }));
            }}
          />
          {errors.name && (
            <small className="field-error" role="alert">
              {errors.name}
            </small>
          )}
        </div>
        <div className="field">
          <label htmlFor="pf-phone">Phone</label>
          <input
            id="pf-phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={phone}
            aria-invalid={!!errors.phone}
            onChange={(e) => {
              setPhone(only.digits(e.target.value, 10));
              setErrors((er) => ({ ...er, phone: "" }));
            }}
            placeholder="10-digit mobile number"
          />
          {errors.phone && (
            <small className="field-error" role="alert">
              {errors.phone}
            </small>
          )}
        </div>
        <div className="field">
          <label htmlFor="pf-email">Email</label>
          <input id="pf-email" value={user.email || ""} readOnly />
        </div>
      </div>

      <button type="submit" className="btn btn-orange profile-save" disabled={saving}>
        {saving ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { toast } from "../../store/toastStore";

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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name is required");
    if (phone && !/^\d{10}$/.test(phone.trim())) return toast.error("Enter a valid 10-digit phone number");
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
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </div>

      <div className="acct-fields">
        <div className="field">
          <label htmlFor="pf-name">Name</label>
          <input id="pf-name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="pf-phone">Phone</label>
          <input
            id="pf-phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            placeholder="10-digit mobile number"
          />
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

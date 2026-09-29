"use client";

import { useEffect, useState } from "react";
import { Check, MapPin, Pencil, Plus, Star, Trash2, X } from "lucide-react";
import { createAddress, deleteAddress, getAddresses, updateAddress } from "../../router/address.router";
import { toast } from "../../store/toastStore";
import { firstError, only, rules } from "../../utils/validate";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  landmark: "",
  isDefault: false,
};

const validate = (f) => ({
  name: rules.name(f.name, "full name"),
  phone: rules.phone(f.phone),
  email: rules.email(f.email, { required: false }),
  address: rules.text(f.address, "address", { min: 5, max: 200 }),
  landmark: f.landmark.trim().length > 100 ? "The landmark must be under 100 characters." : "",
  city: rules.place(f.city, "city"),
  state: rules.place(f.state, "state"),
  pincode: rules.pincode(f.pincode),
  country: rules.place(f.country, "country"),
});

// What each field allows to be typed.
const filters = {
  name: only.letters,
  phone: (v) => only.digits(v, 10),
  email: only.noSpaces,
  city: only.letters,
  state: only.letters,
  country: only.letters,
  pincode: (v) => only.digits(v, 6),
};

export default function AddressManager({ selectable = false, selectedId = null, onSelect, onChange, layout = "grid" }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | address._id
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const pickDefault = (list, preferId) => {
    if (!selectable || !onSelect) return;
    const next =
      list.find((a) => a._id === preferId) ||
      list.find((a) => a._id === selectedId) ||
      list.find((a) => a.isDefault) ||
      list[0];
    onSelect(next ? next._id : null);
  };

  const refresh = async (preferId) => {
    const list = await getAddresses();
    setAddresses(list);
    onChange?.(list);
    pickDefault(list, preferId);
    return list;
  };

  useEffect(() => {
    let cancelled = false;
    getAddresses()
      .then((list) => {
        if (cancelled) return;
        setAddresses(list);
        onChange?.(list);
        if (selectable && onSelect) {
          const next = list.find((a) => a.isDefault) || list[0];
          onSelect(next ? next._id : null);
        }
        if (list.length === 0) setEditing("new");
      })
      .catch((e) => toast.error(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (key) => (e) => {
    const value = filters[key] ? filters[key](e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setFieldErrors((fe) => ({ ...fe, [key]: "" }));
  };

  // One labelled input with its own error message underneath.
  const field = (key, label, props = {}) => (
    <div className={`field ${props.full ? "full" : ""}`}>
      <label htmlFor={`addr-${key}`}>{label}</label>
      <input
        id={`addr-${key}`}
        value={form[key]}
        onChange={set(key)}
        aria-invalid={!!fieldErrors[key]}
        placeholder={props.placeholder}
        inputMode={props.inputMode}
        maxLength={props.maxLength}
      />
      {fieldErrors[key] && (
        <small className="field-error" role="alert">
          {fieldErrors[key]}
        </small>
      )}
    </div>
  );

  const startNew = () => {
    setForm({ ...emptyForm, isDefault: addresses.length === 0 });
    setFieldErrors({});
    setError("");
    setEditing("new");
  };

  const startEdit = (a) => {
    setForm({ ...emptyForm, ...a, email: a.email || "", landmark: a.landmark || "" });
    setFieldErrors({});
    setError("");
    setEditing(a._id);
  };

  const save = async (e) => {
    e.preventDefault();
    const errors = validate(form);
    setFieldErrors(errors);
    if (firstError(errors)) {
      setError("");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const body = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
        country: form.country.trim(),
        landmark: form.landmark.trim(),
        isDefault: !!form.isDefault,
      };
      const saved = editing === "new" ? await createAddress(body) : await updateAddress(editing, body);
      // the backend doesn't unset other defaults, so do it here
      if (body.isDefault) {
        const others = addresses.filter((a) => a._id !== saved._id && a.isDefault);
        await Promise.all(others.map((a) => updateAddress(a._id, { isDefault: false })));
      }
      await refresh(saved._id);
      setEditing(null);
      toast.success(editing === "new" ? "Address added" : "Address updated");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (a) => {
    try {
      await deleteAddress(a._id);
      await refresh();
      toast.info("Address deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const makeDefault = async (a) => {
    try {
      await Promise.all([
        updateAddress(a._id, { isDefault: true }),
        ...addresses.filter((x) => x._id !== a._id && x.isDefault).map((x) => updateAddress(x._id, { isDefault: false })),
      ]);
      await refresh(a._id);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p className="auth-note">Loading addresses…</p>;

  return (
    <div className="addr">
      {addresses.length > 0 && layout === "table" && (
        <div className="addr-table-wrap">
          <table className="addr-table">
            <thead>
              <tr>
                {selectable && <th aria-label="Select" />}
                <th>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {addresses.map((a) => {
                const active = selectable && selectedId === a._id;
                return (
                  <tr
                    key={a._id}
                    className={`${active ? "is-selected" : ""} ${selectable ? "is-selectable" : ""}`}
                    onClick={selectable ? () => onSelect?.(a._id) : undefined}
                  >
                    {selectable && (
                      <td className="addr-table-radio">
                        <input
                          type="radio"
                          name="delivery-address"
                          checked={active}
                          onChange={() => onSelect?.(a._id)}
                          aria-label={`Deliver to ${a.name}`}
                        />
                      </td>
                    )}
                    <td className="addr-table-name">
                      <b>{a.name}</b>
                      {a.isDefault && <span className="addr-badge">Default</span>}
                    </td>
                    <td className="addr-table-addr">
                      {a.address}
                      {a.landmark ? `, ${a.landmark}` : ""}
                      <br />
                      {a.city}, {a.state} - {a.pincode}, {a.country}
                    </td>
                    <td className="addr-table-contact">
                      {a.phone}
                      {a.email && (
                        <>
                          <br />
                          {a.email}
                        </>
                      )}
                    </td>
                    <td className="addr-table-actions" onClick={(e) => e.stopPropagation()}>
                      <div className="addr-actions">
                        <button type="button" onClick={() => startEdit(a)}>
                          <Pencil size={13} /> Edit
                        </button>
                        <button type="button" onClick={() => remove(a)}>
                          <Trash2 size={13} /> Delete
                        </button>
                        {!a.isDefault && (
                          <button type="button" onClick={() => makeDefault(a)}>
                            <Star size={13} /> Make default
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {addresses.length > 0 && layout !== "table" && (
        <div className="addr-list">
          {addresses.map((a) => {
            const active = selectable && selectedId === a._id;
            return (
              <div
                key={a._id}
                className={`addr-card ${active ? "is-selected" : ""} ${selectable ? "is-selectable" : ""}`}
                onClick={selectable ? () => onSelect?.(a._id) : undefined}
              >
                <div className="addr-card-head">
                  <b>
                    <MapPin size={15} /> {a.name}
                  </b>
                  {a.isDefault && <span className="addr-badge">Default</span>}
                  {active && (
                    <span className="addr-check">
                      <Check size={13} />
                    </span>
                  )}
                </div>
                <p>
                  {a.address}
                  {a.landmark ? `, ${a.landmark}` : ""}
                  <br />
                  {a.city}, {a.state} - {a.pincode}, {a.country}
                  <br />
                  {a.phone}
                  {a.email ? ` · ${a.email}` : ""}
                </p>
                <div className="addr-actions" onClick={(e) => e.stopPropagation()}>
                  <button type="button" onClick={() => startEdit(a)}>
                    <Pencil size={13} /> Edit
                  </button>
                  <button type="button" onClick={() => remove(a)}>
                    <Trash2 size={13} /> Delete
                  </button>
                  {!a.isDefault && (
                    <button type="button" onClick={() => makeDefault(a)}>
                      <Star size={13} /> Make default
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editing ? (
        <form className="addr-form" onSubmit={save} noValidate>
          <h3>{editing === "new" ? "Add a new address" : "Edit address"}</h3>
          <div className="checkout-fields">
            {field("name", "Full name", { placeholder: "Full name", maxLength: 50 })}
            {field("phone", "Phone", { placeholder: "10-digit mobile number", inputMode: "numeric", maxLength: 10 })}
            {field("email", "Email (optional)", { placeholder: "you@example.com", full: true })}
            {field("address", "Address", { placeholder: "Flat, house no., building, street", full: true, maxLength: 200 })}
            {field("landmark", "Landmark (optional)", { placeholder: "Near…", full: true, maxLength: 100 })}
            {field("city", "City", { placeholder: "City", maxLength: 50 })}
            {field("state", "State", { placeholder: "State", maxLength: 50 })}
            {field("pincode", "Pincode", { placeholder: "400708", inputMode: "numeric", maxLength: 6 })}
            {field("country", "Country", { maxLength: 50 })}
          </div>
          <label className="check" style={{ marginTop: 12 }}>
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
            />
            Make this my default address
          </label>
          {error && (
            <p className="auth-note auth-error" role="alert">
              {error}
            </p>
          )}
          <div className="addr-form-actions">
            <button type="submit" className="btn btn-orange btn-sm" disabled={saving}>
              <Check size={14} /> {saving ? "Saving…" : "Save address"}
            </button>
            {addresses.length > 0 && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}>
                <X size={14} /> Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <button type="button" className="btn btn-ghost btn-sm" onClick={startNew}>
          <Plus size={14} /> Add new address
        </button>
      )}
    </div>
  );
}

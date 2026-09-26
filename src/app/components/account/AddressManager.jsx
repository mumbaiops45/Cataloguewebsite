"use client";

import { useEffect, useState } from "react";
import { Check, MapPin, Pencil, Plus, Star, Trash2, X } from "lucide-react";
import { createAddress, deleteAddress, getAddresses, updateAddress } from "../../router/address.router";
import { toast } from "../../store/toastStore";

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

function validate(f) {
  if (!f.name.trim()) return "Please enter the full name.";
  if (!/^\d{10}$/.test(f.phone.trim())) return "Please enter a valid 10-digit phone number.";
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) return "Please enter a valid email.";
  if (!f.address.trim()) return "Please enter the address.";
  if (!f.city.trim()) return "Please enter the city.";
  if (!f.state.trim()) return "Please enter the state.";
  if (!/^\d{6}$/.test(f.pincode.trim())) return "Please enter a valid 6-digit pincode.";
  if (!f.country.trim()) return "Please enter the country.";
  return "";
}

export default function AddressManager({ selectable = false, selectedId = null, onSelect, onChange, layout = "grid" }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | address._id
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
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

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const startNew = () => {
    setForm({ ...emptyForm, isDefault: addresses.length === 0 });
    setError("");
    setEditing("new");
  };

  const startEdit = (a) => {
    setForm({ ...emptyForm, ...a, email: a.email || "", landmark: a.landmark || "" });
    setError("");
    setEditing(a._id);
  };

  const save = async (e) => {
    e.preventDefault();
    const msg = validate(form);
    if (msg) {
      setError(msg);
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
            <div className="field">
              <label>Full name</label>
              <input value={form.name} onChange={set("name")} placeholder="Full name" />
            </div>
            <div className="field">
              <label>Phone</label>
              <input value={form.phone} onChange={set("phone")} placeholder="10-digit mobile number" inputMode="numeric" />
            </div>
            <div className="field full">
              <label>Email (optional)</label>
              <input value={form.email} onChange={set("email")} placeholder="you@example.com" />
            </div>
            <div className="field full">
              <label>Address</label>
              <input value={form.address} onChange={set("address")} placeholder="Flat, house no., building, street" />
            </div>
            <div className="field full">
              <label>Landmark (optional)</label>
              <input value={form.landmark} onChange={set("landmark")} placeholder="Near…" />
            </div>
            <div className="field">
              <label>City</label>
              <input value={form.city} onChange={set("city")} placeholder="City" />
            </div>
            <div className="field">
              <label>State</label>
              <input value={form.state} onChange={set("state")} placeholder="State" />
            </div>
            <div className="field">
              <label>Pincode</label>
              <input value={form.pincode} onChange={set("pincode")} placeholder="400708" inputMode="numeric" />
            </div>
            <div className="field">
              <label>Country</label>
              <input value={form.country} onChange={set("country")} />
            </div>
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

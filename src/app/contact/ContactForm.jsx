"use client";

import { useState } from "react";
import { contact } from "../lib/site";

const emptyForm = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Please enter a valid email address.";
    if (!form.message.trim()) return "Please tell us how we can help.";
    return "";
  };

  const onSubmit = (e) => {
    const validationError = validate();
    if (validationError) {
      e.preventDefault();
      setError(validationError);
      return;
    }
    setError("");
  };

  return (
    <form
      style={{ marginTop: 20 }}
      action={contact.emailHref}
      method="post"
      encType="text/plain"
      noValidate
      onSubmit={onSubmit}
    >
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" value={form.name} onChange={set("name")} />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={set("email")} />
      </div>
      <div className="field">
        <label htmlFor="message">How can we help?</label>
        <textarea id="message" name="message" rows={5} value={form.message} onChange={set("message")} />
      </div>

      {error && (
        <p className="auth-note auth-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-orange">
        Send enquiry
      </button>
    </form>
  );
}

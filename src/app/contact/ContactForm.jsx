"use client";

import { useState } from "react";
import { contact } from "../lib/site";
import { firstError, only, rules } from "../utils/validate";

const emptyForm = { name: "", email: "", message: "" };
const filters = { name: only.letters, email: only.noSpaces, message: (v) => v };

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: filters[key](e.target.value) }));
    setErrors((er) => ({ ...er, [key]: "" }));
  };

  const onSubmit = (e) => {
    const next = {
      name: rules.name(form.name),
      email: rules.email(form.email),
      message: rules.text(form.message, "message", { min: 10, max: 1000 }),
    };
    setErrors(next);
    if (firstError(next)) e.preventDefault();
  };

  const err = (key) =>
    errors[key] ? (
      <small className="field-error" role="alert">
        {errors[key]}
      </small>
    ) : null;

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
        <input
          id="name"
          name="name"
          type="text"
          maxLength={50}
          value={form.name}
          onChange={set("name")}
          aria-invalid={!!errors.name}
        />
        {err("name")}
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={set("email")}
          aria-invalid={!!errors.email}
        />
        {err("email")}
      </div>
      <div className="field">
        <label htmlFor="message">How can we help?</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={1000}
          value={form.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
        />
        {err("message")}
      </div>

      <button type="submit" className="btn btn-orange">
        Send enquiry
      </button>
    </form>
  );
}

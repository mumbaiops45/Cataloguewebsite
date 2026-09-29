"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import { contact } from "../lib/site";
import { useAuth } from "../components/auth/AuthContext";
import { firstError, only, rules } from "../utils/validate";
import { useLoginModal } from "../components/auth/LoginModalContext";

const emptyForm = { name: "", email: "", phone: "", password: "" };

export default function LoginForm() {
  const { user, login, register, logout } = useAuth();
  const { close } = useLoginModal();
  const router = useRouter();

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter what can be typed per field, and clear that field's error.
  const filters = { name: only.letters, phone: (v) => only.digits(v, 10), email: only.noSpaces, password: (v) => v };
  const set = (key) => (e) => {
    const value = filters[key](e.target.value);
    setForm((f) => ({ ...f, [key]: value }));
    setFieldErrors((fe) => ({ ...fe, [key]: "" }));
  };
  const fieldError = (key) =>
    fieldErrors[key] ? (
      <small className="field-error" role="alert">
        {fieldErrors[key]}
      </small>
    ) : null;

  const switchMode = (next) => {
    setError("");
    setFieldErrors({});
    setNotice("");
    setMode(next);
  };

  const validate = () => {
    const register = mode === "register";
    const errors = {
      name: register ? rules.name(form.name, "full name") : "",
      email: rules.email(form.email),
      phone: register ? rules.phone(form.phone) : "",
      password: rules.password(form.password, { strict: register }),
    };
    setFieldErrors(errors);
    return firstError(errors);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setNotice("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
        close();
        router.push("/");
      } else {
        // Registration doesn't log the customer in — switch to the login
        // form, prefilled, so they can sign in with the account just made.
        await register(form);
        setForm((f) => ({ ...emptyForm, email: f.email }));
        setMode("login");
        setNotice("Account created — log in below.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <Reveal className="auth-card" scroll={false}>
        <p className="eyebrow">Account</p>
        <h1>Hi, {user.name?.split(" ")[0] || "there"}</h1>
        <p className="auth-note">
          You&apos;re logged in{user.email ? ` as ${user.email}` : ""}.
        </p>
        <button type="button" className="btn btn-orange auth-submit" onClick={logout}>
          Log out
        </button>
      </Reveal>
    );
  }

  return (
    <Reveal className="auth-card" scroll={false}>
      <p className="eyebrow">Account</p>
      <h1>{mode === "login" ? "Log in" : "Create your account"}</h1>

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        {mode === "register" && (
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              onChange={set("name")}
              maxLength={50}
              aria-invalid={!!fieldErrors.name}
            />
            {fieldError("name")}
          </div>
        )}

        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={set("email")}
            aria-invalid={!!fieldErrors.email}
          />
          {fieldError("email")}
        </div>

        {mode === "register" && (
          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={set("phone")}
              inputMode="numeric"
              maxLength={10}
              aria-invalid={!!fieldErrors.phone}
            />
            {fieldError("phone")}
          </div>
        )}

        <div className="field">
          <label htmlFor="password">Password</label>
          <div className="input-affix">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              placeholder="••••••••"
              value={form.password}
              onChange={set("password")}
            />
            <button
              type="button"
              className="affix-btn"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {mode === "register" && !fieldErrors.password && (
            <small className="field-hint">At least 8 characters, with a letter and a number.</small>
          )}
          {fieldError("password")}
        </div>

        {mode === "login" && (
          <div className="auth-row">
            <label className="check">
              <input type="checkbox" name="remember" />
              Remember me
            </label>
            <a href={`${contact.emailHref}?subject=Password%20help`}>
              Forgot password?
            </a>
          </div>
        )}

        {notice && <p className="auth-note">{notice}</p>}
        {error && !Object.values(fieldErrors).some(Boolean) && (
          <p className="auth-note auth-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-orange auth-submit" disabled={loading}>
          {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      <p className="auth-alt">
        {mode === "login" ? (
          <>
            New to Blessings?{" "}
            <button type="button" onClick={() => switchMode("register")}>
              Create an account
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button type="button" onClick={() => switchMode("login")}>
              Log in
            </button>
          </>
        )}
      </p>
    </Reveal>
  );
}

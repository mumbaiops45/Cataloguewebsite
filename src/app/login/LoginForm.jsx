"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Reveal from "../components/anim/Reveal";
import { useAuth } from "../components/auth/AuthContext";
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
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const switchMode = (next) => {
    setError("");
    setNotice("");
    setMode(next);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
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

      <form className="auth-form" onSubmit={onSubmit}>
        {mode === "register" && (
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Your name"
              value={form.name}
              onChange={set("name")}
            />
          </div>
        )}

        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={form.email}
            onChange={set("email")}
          />
        </div>

        {mode === "register" && (
          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={set("phone")}
            />
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
              required
              minLength={mode === "register" ? 8 : undefined}
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
        </div>

        {mode === "login" && (
          <div className="auth-row">
            <label className="check">
              <input type="checkbox" name="remember" />
              Remember me
            </label>
            <a href="mailto:selfesteem.disabled@gmail.com?subject=Password%20help">
              Forgot password?
            </a>
          </div>
        )}

        {notice && <p className="auth-note">{notice}</p>}
        {error && (
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

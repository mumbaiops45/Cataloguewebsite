"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Reveal from "../components/anim/Reveal";

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(null); // null | "sent"

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus("sent");
  };

  return (
    <Reveal className="auth-card" scroll={false}>
      <p className="eyebrow">Account</p>
      <h1>Log in</h1>

      {status === "sent" ? (
        <div className="auth-note">
          Online accounts aren&apos;t live just yet. Email{" "}
          <a href="mailto:selfesteem.disabled@gmail.com">
            selfesteem.disabled@gmail.com
          </a>{" "}
          or call <a href="tel:+918779171635">+91 8779171635</a> and we&apos;ll
          set you up and take your order directly.
        </div>
      ) : (
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="input-affix">
              <input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••"
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

          <div className="auth-row">
            <label className="check">
              <input type="checkbox" name="remember" />
              Remember me
            </label>
            <a href="mailto:selfesteem.disabled@gmail.com?subject=Password%20help">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-orange auth-submit">
            Log in
          </button>
        </form>
      )}

      <p className="auth-alt">
        New to Blessings? <Link href="/contact">Create an account</Link>
      </p>
    </Reveal>
  );
}

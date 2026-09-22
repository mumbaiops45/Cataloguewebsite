"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginCustomer, registerCustomer } from "../../router/auth.router";
import { getToken, setToken } from "../../utils/axios";
import { decodeJwt } from "../../utils/jwt";

const AuthContext = createContext(null);
const PROFILE_KEY = "blessings-profile";

function readProfile() {
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeProfile(profile) {
  try {
    if (profile) window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    else window.localStorage.removeItem(PROFILE_KEY);
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = getToken();
      if (token) {
        const decoded = decodeJwt(token);
        if (decoded && !cancelled) {
          setUser({ id: decoded._id, role: decoded.role, ...readProfile() });
        } else if (!decoded) {
          setToken(null);
        }
      }
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // The backend only returns { token } on login (no user payload), so we
  // keep the entered email + whatever name we already know locally.
  const login = async (email, password) => {
    const data = await loginCustomer(email, password);
    setToken(data.token);
    const decoded = decodeJwt(data.token);
    const profile = { email, name: readProfile()?.email === email ? readProfile()?.name : undefined };
    writeProfile(profile);
    const nextUser = { id: decoded?._id, role: decoded?.role, ...profile };
    setUser(nextUser);
    return nextUser;
  };

  // Registration does NOT return a token — the customer has to log in
  // right after. We just hand back the created account.
  const register = async (fields) => {
    const data = await registerCustomer(fields);
    writeProfile({ name: data.user.name, email: data.user.email });
    return data.user;
  };

  const logout = () => {
    setToken(null);
    writeProfile(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, ready, login, register, logout }), [user, ready]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

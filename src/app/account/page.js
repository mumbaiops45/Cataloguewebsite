"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, MapPin, Package, Settings, User2 } from "lucide-react";
import AddressManager from "../components/account/AddressManager";
import OrdersList from "../components/account/OrdersList";
import { useAuth } from "../components/auth/AuthContext";

const NAV = [
  { id: "orders", label: "My orders", Icon: Package },
  { id: "settings", label: "Settings", Icon: Settings },
];

const SETTINGS_TABS = [
  { id: "profile", label: "Profile", Icon: User2 },
  { id: "addresses", label: "Addresses", Icon: MapPin },
];

// #orders | #settings | #profile | #addresses → [section, settings tab]
const readHash = () => {
  const h = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
  if (h === "profile" || h === "addresses") return ["settings", h];
  if (h === "settings") return ["settings", "profile"];
  return ["orders", "profile"];
};

export default function AccountPage() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();
  const [section, setSection] = useState("orders");
  const [settingsTab, setSettingsTab] = useState("profile");

  useEffect(() => {
    if (ready && !user) router.replace("/");
  }, [ready, user, router]);

  useEffect(() => {
    const sync = () => {
      const [s, t] = readHash();
      setSection(s);
      setSettingsTab(t);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const go = (s, t = settingsTab) => {
    setSection(s);
    setSettingsTab(t);
    window.history.replaceState(null, "", `#${s === "settings" ? t : s}`);
  };

  if (!user) return null;

  const initial = (user.name || user.email || "?").trim().charAt(0).toUpperCase();

  return (
    <section className="acct top-offset">
      <div className="wrap acct-shell">
        <aside className="acct-side">
          <div className="acct-side-brand">
            <span className="acct-avatar acct-avatar-orange">{initial}</span>
            <div>
              <b>{user.name || "My account"}</b>
              <small>Customer panel</small>
            </div>
          </div>

          <nav className="acct-nav">
            {NAV.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                className={`acct-nav-item ${section === id ? "active" : ""}`}
                onClick={() => go(id)}
              >
                <Icon size={18} /> {label}
              </button>
            ))}
          </nav>

          <div className="acct-side-foot">
            <small>{user.email}</small>
            <button type="button" className="acct-logout" onClick={logout}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        </aside>

        <div className="acct-main">
          <div className="acct-body">
            {section === "orders" && <OrdersList />}

            {section === "settings" && (
              <>
                <div className="acct-head">
                  <h1 className="acct-title">Settings</h1>
                </div>

                <div className="acct-subtabs" role="tablist">
                  {SETTINGS_TABS.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={settingsTab === id}
                      className={`acct-subtab ${settingsTab === id ? "active" : ""}`}
                      onClick={() => go("settings", id)}
                    >
                      <Icon size={15} /> {label}
                    </button>
                  ))}
                </div>

                {settingsTab === "profile" && (
                  <div className="acct-card">
                    <div className="acct-fields">
                      <div className="field">
                        <label>Name</label>
                        <input value={user.name || ""} readOnly />
                      </div>
                      <div className="field">
                        <label>Email</label>
                        <input value={user.email || ""} readOnly />
                      </div>
                    </div>
                  </div>
                )}

                {settingsTab === "addresses" && (
                  <div className="acct-card">
                    <AddressManager />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

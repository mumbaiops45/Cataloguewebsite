"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, MapPin, Package, User2 } from "lucide-react";
import SplitHeading from "../components/anim/SplitHeading";
import AddressManager from "../components/account/AddressManager";
import OrdersList from "../components/account/OrdersList";
import { useAuth } from "../components/auth/AuthContext";

const TABS = [
  { id: "profile", label: "Profile", Icon: User2 },
  { id: "orders", label: "My orders", Icon: Package },
  { id: "addresses", label: "Addresses", Icon: MapPin },
];

const tabFromHash = () => {
  const h = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
  return TABS.some((t) => t.id === h) ? h : "profile";
};

export default function AccountPage() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    if (ready && !user) router.replace("/");
  }, [ready, user, router]);

  useEffect(() => {
    const sync = () => setTab(tabFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const go = (id) => {
    setTab(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  if (!user) return null;

  return (
    <section className="checkout section top-offset-lg">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <SplitHeading as="h1" className="display-3">
          My account
        </SplitHeading>

        <div className="acct-tabs" role="tablist">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={`acct-tab ${tab === id ? "active" : ""}`}
              onClick={() => go(id)}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {tab === "profile" && (
          <div className="checkout-card">
            <h2>
              <User2 size={17} /> Profile
            </h2>
            <div className="checkout-fields">
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

        {tab === "orders" && (
          <div className="checkout-card">
            <h2>
              <Package size={17} /> My orders
            </h2>
            <OrdersList />
          </div>
        )}

        {tab === "addresses" && (
          <div className="checkout-card">
            <h2>
              <MapPin size={17} /> Saved addresses
            </h2>
            <AddressManager />
          </div>
        )}

        <button type="button" className="btn btn-orange" onClick={logout} style={{ marginTop: 8 }}>
          <LogOut size={16} /> Log out
        </button>
      </div>
    </section>
  );
}

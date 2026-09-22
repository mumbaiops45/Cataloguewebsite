"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Package, User2 } from "lucide-react";
import SplitHeading from "../components/anim/SplitHeading";
import { useAuth } from "../components/auth/AuthContext";

export default function AccountPage() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/");
  }, [ready, user, router]);

  if (!user) return null;

  return (
    <section className="checkout section top-offset-lg">
      <div className="wrap" style={{ maxWidth: 640 }}>
        <SplitHeading as="h1" className="display-3">
          My account
        </SplitHeading>

        <div className="checkout-card" style={{ marginTop: 32 }}>
          <h2>
            <span className="step-no">1</span>
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

        <div className="checkout-card">
          <h2>
            <span className="step-no">2</span>
            <Package size={17} /> Orders
          </h2>
          <p className="auth-note">
            Order history isn&apos;t connected yet — check back soon.
          </p>
        </div>

        <button type="button" className="btn btn-orange" onClick={logout} style={{ marginTop: 8 }}>
          <LogOut size={16} /> Log out
        </button>
      </div>
    </section>
  );
}

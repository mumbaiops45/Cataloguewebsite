"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { cancelOrder, getOrders } from "../../router/order.router";
import { payForOrder } from "../../utils/razorpay";
import { toast } from "../../store/toastStore";

const fmt = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const label = (s) => s.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
const CANCELLABLE = ["PENDING_PAYMENT", "CONFIRMED"];

export default function OrdersList() {
  const [orders, setOrders] = useState(null);
  const [busy, setBusy] = useState(null);

  const load = async () => setOrders(await getOrders({ limit: 50 }));

  useEffect(() => {
    let cancelled = false;
    getOrders({ limit: 50 })
      .then((o) => !cancelled && setOrders(o))
      .catch((e) => {
        toast.error(e.message);
        if (!cancelled) setOrders([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const pay = async (o) => {
    setBusy(o._id);
    try {
      await payForOrder({
        orderId: o._id,
        prefill: { name: o.shippingAddress?.name, email: o.shippingAddress?.email, contact: o.shippingAddress?.phone },
      });
      toast.success("Payment successful");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(null);
      load().catch(() => {});
    }
  };

  const cancel = async (o) => {
    setBusy(o._id);
    try {
      await cancelOrder(o._id);
      toast.info("Order cancelled");
      await load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(null);
    }
  };

  if (orders === null) return <p className="auth-note">Loading your orders…</p>;

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <Package size={30} />
        <p>You haven&apos;t placed any orders yet.</p>
        <Link href="/shop" className="btn btn-orange btn-sm">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="orders">
      {orders.map((o) => (
        <article className="order-box" key={o._id}>
          <header className="order-box-head">
            <div>
              <b>Order #{o._id.slice(-8).toUpperCase()}</b>
              <span>{new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>
            <div className="order-box-tags">
              <span className={`order-tag st-${o.status}`}>{label(o.status)}</span>
              <span className={`order-tag pay-${o.paymentStatus}`}>{label(o.paymentStatus)}</span>
            </div>
          </header>

          <ul className="order-box-items">
            {o.items.map((it, i) => (
              <li key={`${it.product}-${i}`}>
                <span>
                  {it.name} <em>× {it.quantity}</em>
                </span>
                <b>{fmt(it.price * it.quantity)}</b>
              </li>
            ))}
          </ul>

          <div className="order-box-foot">
            <p className="order-box-addr">
              Ship to: {o.shippingAddress?.name}, {o.shippingAddress?.address}, {o.shippingAddress?.city},{" "}
              {o.shippingAddress?.state} - {o.shippingAddress?.pincode}
            </p>
            <div className="order-box-totals">
              <span>Subtotal {fmt(o.subTotal)}</span>
              <span>Shipping {fmt(o.shippingFee)}</span>
              <b>Total {fmt(o.total)}</b>
            </div>
          </div>

          {(o.status === "PENDING_PAYMENT" || CANCELLABLE.includes(o.status)) && (
            <div className="order-box-actions">
              {o.status === "PENDING_PAYMENT" && o.paymentStatus === "UNPAID" && (
                <button type="button" className="btn btn-orange btn-sm" disabled={busy === o._id} onClick={() => pay(o)}>
                  {busy === o._id ? "Please wait…" : "Pay now"}
                </button>
              )}
              {CANCELLABLE.includes(o.status) && (
                <button type="button" className="btn btn-ghost btn-sm" disabled={busy === o._id} onClick={() => cancel(o)}>
                  Cancel order
                </button>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

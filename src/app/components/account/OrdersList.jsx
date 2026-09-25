"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Package } from "lucide-react";
import { cancelOrder, getOrders } from "../../router/order.router";
import { payForOrder } from "../../utils/razorpay";
import { toast } from "../../store/toastStore";

const fmt = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const label = (s) => s.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
const CANCELLABLE = ["PENDING_PAYMENT", "CONFIRMED"];
const ORDER_STATUSES = ["PENDING_PAYMENT", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
const PAYMENT_STATUSES = ["UNPAID", "PAID", "FAILED", "REFUNDED"];
const PAGE_SIZE = 10;

export default function OrdersList() {
  const [orders, setOrders] = useState(null);
  const [busy, setBusy] = useState(null);
  const [status, setStatus] = useState("");
  const [payStatus, setPayStatus] = useState("");
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);

  const load = async () => setOrders(await getOrders({ limit: 100 }));

  useEffect(() => {
    let cancelled = false;
    getOrders({ limit: 100 })
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

  const filtered = (orders || []).filter(
    (o) => (!status || o.status === status) && (!payStatus || o.paymentStatus === payStatus)
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageList = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const head = (
    <div className="acct-head">
      <h1 className="acct-title">My orders</h1>
      <div className="acct-filters">
        <select
          className="acct-select"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          aria-label="Filter by order status"
        >
          <option value="">All order status</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {label(s)}
            </option>
          ))}
        </select>
        <select
          className="acct-select"
          value={payStatus}
          onChange={(e) => {
            setPayStatus(e.target.value);
            setPage(1);
          }}
          aria-label="Filter by payment status"
        >
          <option value="">All payment status</option>
          {PAYMENT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {label(s)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const pager = (
    <nav className="acct-pager" aria-label="Order pages">
      <button type="button" disabled={current <= 1} onClick={() => setPage(current - 1)}>
        Prev
      </button>
      <span>Page {current}</span>
      <button type="button" disabled={current >= totalPages} onClick={() => setPage(current + 1)}>
        Next
      </button>
    </nav>
  );

  if (orders === null) {
    return (
      <>
        {head}
        <div className="acct-empty">Loading your orders…</div>
      </>
    );
  }

  if (filtered.length === 0) {
    return (
      <>
        {head}
        <div className="acct-empty">
          <Package size={30} />
          <p>{orders.length === 0 ? "You haven’t placed any orders yet." : "No orders found."}</p>
          {orders.length === 0 && (
            <Link href="/shop" className="btn btn-orange btn-sm">
              Start shopping
            </Link>
          )}
        </div>
        {pager}
      </>
    );
  }

  const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <>
      {head}
      <div className="otable-wrap">
        <table className="otable">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
              <th aria-label="Details" />
            </tr>
          </thead>
          <tbody>
            {pageList.map((o) => {
              const isOpen = openId === o._id;
              const qty = o.items.reduce((n, it) => n + it.quantity, 0);
              return (
                <Fragment key={o._id}>
                  <tr
                    className={`otable-row ${isOpen ? "open" : ""}`}
                    onClick={() => setOpenId(isOpen ? null : o._id)}
                    aria-expanded={isOpen}
                  >
                    <td className="otable-id">{o._id}</td>
                    <td>{fmtDate(o.createdAt)}</td>
                    <td>{qty}</td>
                    <td className="otable-total">{fmt(o.total)}</td>
                    <td>
                      <span className={`order-tag st-${o.status}`}>{label(o.status)}</span>
                    </td>
                    <td>
                      <span className={`order-tag pay-${o.paymentStatus}`}>{label(o.paymentStatus)}</span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      {o.status === "PENDING_PAYMENT" && o.paymentStatus === "UNPAID" ? (
                        <button
                          type="button"
                          className="otable-pay"
                          disabled={busy === o._id}
                          onClick={() => pay(o)}
                        >
                          {busy === o._id ? "Wait…" : `Pay ${fmt(o.total)}`}
                        </button>
                      ) : (
                        <span className="otable-dash">—</span>
                      )}
                    </td>
                    <td className="otable-chev">
                      <ChevronDown size={16} />
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="otable-detail">
                      <td colSpan={8}>
                        <div className="order-box">
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
                            <div className="order-ship">
                              <h4>Ship to</h4>
                              <dl className="order-kv">
                                {[
                                  ["Name", o.shippingAddress?.name],
                                  ["Phone", o.shippingAddress?.phone],
                                  ["Email", o.shippingAddress?.email],
                                  ["Address", o.shippingAddress?.address],
                                  ["Landmark", o.shippingAddress?.landmark],
                                  ["City", o.shippingAddress?.city],
                                  ["State", o.shippingAddress?.state],
                                  ["Pincode", o.shippingAddress?.pincode],
                                  ["Country", o.shippingAddress?.country],
                                ]
                                  .filter(([, v]) => v)
                                  .map(([k, v]) => (
                                    <div key={k}>
                                      <dt>{k}:</dt>
                                      <dd>{v}</dd>
                                    </div>
                                  ))}
                              </dl>
                            </div>
                            <dl className="order-sum">
                              <div>
                                <dt>Subtotal:</dt>
                                <dd>{fmt(o.subTotal)}</dd>
                              </div>
                              <div>
                                <dt>Shipping:</dt>
                                <dd>{fmt(o.shippingFee)}</dd>
                              </div>
                              <div className="order-sum-total">
                                <dt>Total:</dt>
                                <dd>{fmt(o.total)}</dd>
                              </div>
                            </dl>
                          </div>

                          {CANCELLABLE.includes(o.status) && (
                            <div className="order-box-actions">
                              {o.status === "PENDING_PAYMENT" && o.paymentStatus === "UNPAID" && (
                                <button
                                  type="button"
                                  className="btn btn-orange btn-sm"
                                  disabled={busy === o._id}
                                  onClick={() => pay(o)}
                                >
                                  {busy === o._id ? "Please wait…" : "Pay now"}
                                </button>
                              )}
                              <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                disabled={busy === o._id}
                                onClick={() => cancel(o)}
                              >
                                Cancel order
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {pager}
    </>
  );
}

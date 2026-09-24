import { createPayment, verifyPayment } from "../router/payment.router";

function loadScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

// Opens Razorpay for an existing PENDING_PAYMENT order. Resolves once the
// payment is verified by the backend, rejects on failure or dismissal.
export async function payForOrder({ orderId, prefill }) {
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  if (!key) throw new Error("Payments aren't configured yet (missing Razorpay key).");
  if (!(await loadScript())) throw new Error("Couldn't load Razorpay. Check your connection.");

  const rp = await createPayment(orderId);

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key,
      amount: rp.amount,
      currency: rp.currency,
      order_id: rp.id,
      name: "Blessings by SEFD",
      description: "Handmade with dignity",
      prefill,
      theme: { color: "#221a5e" },
      handler: async (res) => {
        try {
          await verifyPayment(res);
          resolve();
        } catch (e) {
          reject(e);
        }
      },
      modal: { ondismiss: () => reject(new Error("Payment cancelled")) },
    });
    rzp.on("payment.failed", (r) => reject(new Error(r.error?.description || "Payment failed")));
    rzp.open();
  });
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, MapPin, ShoppingBag, CreditCard } from "lucide-react";
import SplitHeading from "../components/anim/SplitHeading";
import AddressManager from "../components/account/AddressManager";
import { useCartStore } from "../store/cartStore";
import { useAuth } from "../components/auth/AuthContext";
import { useLoginModal } from "../components/auth/LoginModalContext";
import { createOrder } from "../router/order.router";
import { getAddresses } from "../router/address.router";
import { payForOrder } from "../utils/razorpay";
import { toast } from "../store/toastStore";

// matches the flat shipping fee the backend applies to every order
const SHIPPING_FEE = 60;
const fmt = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function CheckoutPage() {
  const router = useRouter();
  const { user, ready } = useAuth();
  const { open: openLogin } = useLoginModal();
  const rawItems = useCartStore((s) => s.items);
  const catalogMap = useCartStore((s) => s.catalogMap);
  const hasFetched = useCartStore((s) => s.hasFetched);
  const fetchCart = useCartStore((s) => s.fetchCart);
  const [addressId, setAddressId] = useState(null);
  const [paying, setPaying] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const selectedAddress = addresses.find((a) => a._id === addressId);

  const selectAddress = (id) => {
    setAddressId(id);
    setConfirmed(false);
  };

  useEffect(() => {
    if (user && !hasFetched) fetchCart();
  }, [user, hasFetched, fetchCart]);

  const items = rawItems.map((it) => ({ ...it, product: catalogMap.get(it.productId) }));
  const subtotal = items.reduce((n, it) => n + it.quantity * (it.product?.price || 0), 0);
  const total = subtotal + SHIPPING_FEE;

  if (ready && !user) {
    return (
      <section className="checkout section top-offset">
        <div className="wrap" style={{ textAlign: "center", maxWidth: 560 }}>
          <ShoppingBag size={34} style={{ margin: "0 auto 20px", color: "var(--orange-deep)" }} />
          <SplitHeading as="h1" className="display-3">
            Log in to check out.
          </SplitHeading>
          <p className="lead" style={{ margin: "20px auto 32px" }}>
            Your cart and addresses are saved to your account.
          </p>
          <button type="button" className="btn btn-orange" onClick={openLogin}>
            Log in
          </button>
        </div>
      </section>
    );
  }

  if (!user) return null;

  if (items.length === 0) {
    return (
      <section className="checkout section">
        <div className="wrap" style={{ textAlign: "center", maxWidth: 560 }}>
          <ShoppingBag size={34} style={{ margin: "0 auto 20px", color: "var(--orange-deep)" }} />
          <SplitHeading as="h1" className="display-3">
            Your cart is empty.
          </SplitHeading>
          <p className="lead" style={{ margin: "20px auto 32px" }}>
            Add a few pieces to the cart before checking out.
          </p>
          <Link href="/shop" className="btn btn-orange">
            Shop the range <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  const pay = async () => {
    if (!addressId) {
      toast.error("Please select or add a delivery address.");
      return;
    }
    // paying straight from the table counts as confirming the selected row
    setConfirmed(true);
    setPaying(true);
    let order;
    try {
      order = await createOrder(addressId);
    } catch (e) {
      toast.error(e.message);
      setPaying(false);
      return;
    }
    // the backend empties the cart when the order is created
    useCartStore.setState({ items: [] });

    try {
      const addr = (await getAddresses()).find((a) => a._id === addressId);
      await payForOrder({
        orderId: order._id,
        prefill: { name: addr?.name, email: addr?.email, contact: addr?.phone },
      });
      toast.success("Payment successful — your order is confirmed!");
    } catch (e) {
      toast.error(`${e.message}. Your order is saved — you can pay from My Orders.`);
    }
    router.push("/account#orders");
  };

  return (
    <section className="checkout section">
      <div className="wrap">
        <SplitHeading as="h1" className="display-3">
          Checkout
        </SplitHeading>

        <div className="checkout-grid" style={{ marginTop: 40 }}>
          <div>
            <div className="checkout-card">
              <h2>
                <span className="step-no">1</span>
                <MapPin size={17} /> Delivery address
                {confirmed && (
                  <button type="button" className="checkout-change" onClick={() => setConfirmed(false)}>
                    Change
                  </button>
                )}
              </h2>
              {confirmed && selectedAddress && (
                <p className="checkout-chosen">
                  <b>{selectedAddress.name}</b>
                  <br />
                  {selectedAddress.address}
                  {selectedAddress.landmark ? `, ${selectedAddress.landmark}` : ""}, {selectedAddress.city},{" "}
                  {selectedAddress.state} - {selectedAddress.pincode}
                  <br />
                  {selectedAddress.phone}
                </p>
              )}
              {/* stays mounted while collapsed so the selection survives "Change" */}
              <div hidden={confirmed}>
                <AddressManager
                  layout="table"
                  selectable
                  selectedId={addressId}
                  onSelect={selectAddress}
                  onChange={setAddresses}
                />
                {selectedAddress && (
                  <button type="button" className="btn btn-orange checkout-continue" onClick={() => setConfirmed(true)}>
                    Deliver to this address <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <aside className="checkout-summary">
            <h2>Order summary</h2>
            <div className="checkout-items">
              {items.map((it) => (
                <div className="checkout-item" key={it.productId}>
                  <div className="checkout-item-media">
                    {it.product?.image && (
                      <Image src={it.product.image} alt={it.product.name} fill sizes="52px" style={{ objectFit: "contain" }} />
                    )}
                  </div>
                  <div className="checkout-item-info">
                    <b>{it.product?.name || "Product"}</b>
                    <span>Qty {it.quantity}</span>
                  </div>
                  <div className="checkout-item-price">{fmt((it.product?.price || 0) * it.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="checkout-totals">
              <div>
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div>
                <span>Shipping</span>
                <span>{fmt(SHIPPING_FEE)}</span>
              </div>
              <div className="grand">
                <span>Total</span>
                <b>{fmt(total)}</b>
              </div>
            </div>

            <button type="button" className="btn btn-tertiary" onClick={pay} disabled={paying}>
              <CreditCard size={16} /> {paying ? "Please wait…" : `Pay ${fmt(total)}`}
            </button>
            {!addressId && <p className="checkout-note">Add a delivery address to continue.</p>}
            <p className="checkout-note">Secure online payment via Razorpay (UPI, cards, net banking, wallets).</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  MapPin,
  Tag,
  ShoppingBag,
  Smartphone,
  Banknote,
  Globe,
  ChevronRight,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useUserStore } from "@/lib/store/userStore";
import { formatPrice, getEstimatedDeliveryDate } from "@/lib/utils";
import { Order, Address } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    appliedCoupon,
    getSubtotal,
    getDiscount,
    getShippingFee,
    getTotal,
    clearCart,
  } = useCartStore();

  const { savedAddresses, addOrder, addAddress } = useUserStore();

  // Multi-step state: 1 = Shipping, 2 = Payment, 3 = Review
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [fullName, setFullName] = useState(savedAddresses[0]?.fullName || "");
  const [phone, setPhone] = useState(savedAddresses[0]?.phone || "");
  const [email, setEmail] = useState(savedAddresses[0]?.email || "");
  const [addressLine1, setAddressLine1] = useState(savedAddresses[0]?.addressLine1 || "");
  const [addressLine2, setAddressLine2] = useState(savedAddresses[0]?.addressLine2 || "");
  const [landmark, setLandmark] = useState(savedAddresses[0]?.landmark || "");
  const [pincode, setPincode] = useState(savedAddresses[0]?.pincode || "");
  const [city, setCity] = useState(savedAddresses[0]?.city || "");
  const [state, setState] = useState(savedAddresses[0]?.state || "");
  const [saveThisAddress, setSaveThisAddress] = useState(true);

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod" | "stripe">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shippingFee = getShippingFee();
  const total = getTotal();

  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 6);
    setPincode(clean);

    if (clean.length === 6) {
      if (clean.startsWith("56")) {
        setCity("Bengaluru");
        setState("Karnataka");
      } else if (clean.startsWith("11")) {
        setCity("New Delhi");
        setState("Delhi");
      } else if (clean.startsWith("40")) {
        setCity("Mumbai");
        setState("Maharashtra");
      } else if (clean.startsWith("60")) {
        setCity("Chennai");
        setState("Tamil Nadu");
      } else if (clean.startsWith("70")) {
        setCity("Kolkata");
        setState("West Bengal");
      } else if (clean.startsWith("50")) {
        setCity("Hyderabad");
        setState("Telangana");
      } else {
        setCity("Metro Hub");
        setState("India");
      }
    }
  };

  const handleApplySavedAddress = (addr: Address) => {
    setFullName(addr.fullName);
    setPhone(addr.phone);
    setEmail(addr.email);
    setAddressLine1(addr.addressLine1);
    setAddressLine2(addr.addressLine2 || "");
    setLandmark(addr.landmark || "");
    setPincode(addr.pincode);
    setCity(addr.city);
    setState(addr.state);
  };

  const validateShipping = () => {
    if (!fullName || !phone || !email || !addressLine1 || !pincode || !city) {
      setErrorMsg("Please fill out all required shipping address fields.");
      return false;
    }
    if (phone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const handleNextToPayment = () => {
    if (validateShipping()) {
      setCurrentStep(2);
    }
  };

  const handleNextToReview = () => {
    setCurrentStep(3);
  };

  const handleFinalPlaceOrder = () => {
    if (!validateShipping()) {
      setCurrentStep(1);
      return;
    }

    setIsProcessing(true);

    const shippingAddress: Address = {
      fullName,
      phone,
      email,
      addressLine1,
      addressLine2,
      landmark,
      pincode,
      city,
      state,
    };

    if (saveThisAddress) {
      addAddress(shippingAddress);
    }

    const orderNumber = `DC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      items: [...items],
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending_cod" : "paid",
      orderStatus: "confirmed",
      trackingNumber: `BD-${Math.floor(100000000 + Math.random() * 900000000)}IN`,
      carrier: "Bluedart Air Express",
      subtotal,
      shippingFee,
      discount,
      total,
      couponCode: appliedCoupon?.code,
      estimatedDelivery: getEstimatedDeliveryDate(3),
    };

    setTimeout(() => {
      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      router.push(`/order-confirmation?orderNumber=${orderNumber}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[var(--bg-primary)]">
        <h1 className="text-xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
          No items in bag
        </h1>
        <Link
          href="/shop"
          className="mt-6 px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest"
        >
          Explore Drops →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Progress Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              Express Checkout
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Secure Encrypted Portal • 15-Day Free Doorstep Trial
            </p>
          </div>

          {/* Stepper Progress Bar */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                currentStep >= 1 ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-surface)] text-[var(--text-muted)]"
              }`}
            >
              <span>1. Shipping</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <button
              type="button"
              onClick={() => (validateShipping() ? setCurrentStep(2) : null)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                currentStep >= 2 ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-surface)] text-[var(--text-muted)]"
              }`}
            >
              <span>2. Payment</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <button
              type="button"
              onClick={() => (validateShipping() ? setCurrentStep(3) : null)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                currentStep === 3 ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-surface)] text-[var(--text-muted)]"
              }`}
            >
              <span>3. Review</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--accent-primary)]" />
                    <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--text-primary)]">
                      Shipping Destination
                    </h3>
                  </div>
                  {savedAddresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleApplySavedAddress(savedAddresses[0])}
                      className="text-[11px] text-[var(--accent-primary)] font-bold hover:underline"
                    >
                      Autofill Saved Address
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[var(--text-secondary)] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Varma"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[var(--text-secondary)] mb-1">
                      Mobile Number (for Courier updates) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent-primary)]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-[var(--text-secondary)] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-[var(--text-secondary)] mb-1">
                    Flat / House No. / Building / Street *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="Flat 402, Skyline Residency, 12th Main"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[var(--text-secondary)] mb-1">
                      Area / Landmark
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Near Indiranagar Metro"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[var(--text-secondary)] mb-1">
                      6-Digit Postal Code (Pincode) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      placeholder="560038"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent-primary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[var(--text-secondary)] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[var(--text-secondary)] mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextToPayment}
                  className="w-full py-4 rounded-2xl bg-[var(--accent-primary)] text-white font-black text-xs uppercase tracking-widest hover:bg-[var(--accent-primary-hover)] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Continue to Payment Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[var(--accent-primary)]" />
                    <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--text-primary)]">
                      Select Payment Gateway
                    </h3>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-[11px] text-[var(--accent-primary)] font-bold hover:underline"
                  >
                    ← Edit Address
                  </button>
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod("razorpay")}
                    className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "razorpay"
                        ? "bg-[var(--bg-secondary)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20"
                        : "bg-[var(--bg-surface)] border-[var(--border-subtle)]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "razorpay"}
                        onChange={() => setPaymentMethod("razorpay")}
                        className="mt-1 text-[var(--accent-primary)]"
                      />
                      <div>
                        <div className="font-bold text-sm text-[var(--text-primary)]">
                          Razorpay (Instant UPI, Cards & NetBanking)
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                          Google Pay, PhonePe, Paytm, QR, Visa, Mastercard, RuPay.
                        </p>
                      </div>
                    </div>
                    <Smartphone className="w-5 h-5 text-[var(--accent-primary)] shrink-0" />
                  </label>

                  <label
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "bg-[var(--bg-secondary)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20"
                        : "bg-[var(--bg-surface)] border-[var(--border-subtle)]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="mt-1 text-[var(--accent-primary)]"
                      />
                      <div>
                        <div className="font-bold text-sm text-[var(--text-primary)]">
                          Cash on Delivery (COD)
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                          Pay cash or scan courier UPI QR at your doorstep upon arrival.
                        </p>
                      </div>
                    </div>
                    <Banknote className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
                  </label>

                  <label
                    onClick={() => setPaymentMethod("stripe")}
                    className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "stripe"
                        ? "bg-[var(--bg-secondary)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20"
                        : "bg-[var(--bg-surface)] border-[var(--border-subtle)]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "stripe"}
                        onChange={() => setPaymentMethod("stripe")}
                        className="mt-1 text-[var(--accent-primary)]"
                      />
                      <div>
                        <div className="font-bold text-sm text-[var(--text-primary)]">
                          Stripe International
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                          For global international cards & Apple Pay.
                        </p>
                      </div>
                    </div>
                    <Globe className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleNextToReview}
                  className="w-full py-4 rounded-2xl bg-[var(--accent-primary)] text-white font-black text-xs uppercase tracking-widest hover:bg-[var(--accent-primary-hover)] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Review & Confirm Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 3: Review & Final Confirmation */}
            {currentStep === 3 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--text-primary)]">
                    Review Order Details
                  </h3>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-[11px] text-[var(--accent-primary)] font-bold hover:underline"
                  >
                    ← Edit Details
                  </button>
                </div>

                {/* Shipping & Payment Recap */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Deliver To</div>
                    <div className="font-bold text-[var(--text-primary)] mt-0.5">{fullName}</div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">{addressLine1}, {city} ({pincode})</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Payment Gateway</div>
                    <div className="font-bold text-[var(--accent-primary)] mt-0.5 uppercase">{paymentMethod}</div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">100% Encrypted SSL</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinalPlaceOrder}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      <span>Confirming Order...</span>
                    </span>
                  ) : (
                    <>
                      <span>Place Order ({formatPrice(total)})</span>
                      <ArrowRight className="w-4 h-4 text-[var(--accent-primary)]" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24 p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-5 shadow-xl">
              <h3 className="font-black text-xs uppercase tracking-widest text-[var(--text-primary)] pb-3 border-b border-[var(--border-subtle)]">
                Bag Summary ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>

              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-[var(--border-subtle)]">
                {items.map((it) => (
                  <div key={it.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img
                      src={it.image}
                      alt={it.name}
                      className="w-14 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-[var(--text-primary)] truncate">{it.name}</div>
                      <div className="text-[11px] text-[var(--text-secondary)]">Size: {it.size} • {it.color} • Qty: {it.quantity}</div>
                      <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">{formatPrice(it.price * it.quantity)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-2 text-xs pt-3 border-t border-[var(--border-subtle)] text-[var(--text-secondary)]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[var(--text-primary)]">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Courier</span>
                  <span className="font-semibold text-[var(--text-primary)]">
                    {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[var(--text-primary)] pt-3 border-t border-[var(--border-subtle)]">
                  <span>Total</span>
                  <span className="text-xl text-[var(--accent-primary)]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

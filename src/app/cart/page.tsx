"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { VALID_COUPONS } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getShippingFee,
    getTotal,
    getFreeShippingProgress,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shippingFee = getShippingFee();
  const total = getTotal();
  const { amountNeeded, percent, isFree } = getFreeShippingProgress();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");

    const found = VALID_COUPONS.find(
      (c) => c.code.toUpperCase() === couponInput.trim().toUpperCase()
    );

    if (!found) {
      setCouponError("Invalid coupon code. Try DEPLOY10 or FIRSTDROP");
      return;
    }

    if (subtotal < found.minOrderAmount) {
      setCouponError(`Min order of ${formatPrice(found.minOrderAmount)} required for ${found.code}`);
      return;
    }

    applyCoupon(found);
    setCouponInput("");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[var(--bg-primary)]">
        <div className="w-20 h-20 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)] mb-4">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[var(--text-primary)]">
          Your Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-sm">
          You haven't added any original streetwear artifacts yet.
        </p>
        <Link
          href="/shop"
          className="mt-8 px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-md"
        >
          Explore All Drops →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-primary)]">
            Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Review your selected silhouettes and apply drop discounts.
          </p>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 text-[var(--text-primary)]">
              <Truck className="w-4 h-4 text-[var(--accent-terra)]" />
              <span>
                {isFree ? (
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    🎉 You unlocked FREE Express Shipping!
                  </strong>
                ) : (
                  <span>
                    Add <strong className="text-[var(--accent-terra)]">{formatPrice(amountNeeded)}</strong> more to unlock FREE Express Shipping
                  </span>
                )}
              </span>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">{percent}%</span>
          </div>
          <div className="w-full bg-[var(--bg-secondary)] h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFree ? "bg-emerald-500" : "bg-[var(--accent-terra)]"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Items Column */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-bold text-sm sm:text-base text-[var(--text-primary)] hover:text-[var(--accent-terra)] transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                      <span className="px-2 py-0.5 rounded bg-[var(--bg-secondary)] font-bold text-[var(--text-primary)]">
                        Size: {item.size}
                      </span>
                      <span>Color: {item.color}</span>
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      {item.fabric}
                    </div>
                  </div>
                </div>

                {/* Price & Quantity Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[var(--border-subtle)]">
                  <div className="font-bold text-base text-[var(--text-primary)]">
                    {formatPrice(item.price * item.quantity)}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[var(--border-strong)] rounded-lg bg-[var(--bg-surface)]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[var(--text-primary)] min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30"
                        aria-label="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-[var(--text-muted)] hover:text-rose-500 transition-colors"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-5">
              <h3 className="font-bold text-sm uppercase tracking-widest text-[var(--text-primary)] pb-3 border-b border-[var(--border-subtle)]">
                Order Summary
              </h3>

              {/* Coupon Box */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-bold text-emerald-800 dark:text-emerald-300">
                        {appliedCoupon.code} (-{formatPrice(discount)})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Coupon (e.g. DEPLOY10)"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] uppercase tracking-wider text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-terra)]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold hover:opacity-90"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-rose-500">{couponError}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs pt-3 border-t border-[var(--border-subtle)] text-[var(--text-secondary)]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[var(--text-primary)]">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-semibold text-[var(--text-primary)]">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[10px]">
                        FREE
                      </span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[var(--text-primary)] pt-3 border-t border-[var(--border-subtle)]">
                  <span>Total</span>
                  <span className="text-lg text-[var(--accent-terra)]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full py-4 px-6 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[var(--accent-terra)] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Points */}
            <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-2 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Encrypted Razorpay & Stripe Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[var(--accent-terra)]" />
                <span>15-Day Free Doorstep Size Exchanges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

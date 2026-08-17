"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Check,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { PRODUCTS, VALID_COUPONS } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
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
    addItem,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shippingFee = getShippingFee();
  const total = getTotal();
  const { amountNeeded, percent, isFree } = getFreeShippingProgress();

  // Pick 1 cross-sell artifact that is not already in cart
  const crossSellProduct = PRODUCTS.find(
    (p) => !items.some((item) => item.productId === p.id)
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess(false);

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
    setCouponSuccess(true);
    setCouponInput("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--bg-surface)] shadow-2xl flex flex-col justify-between border-l border-[var(--border-subtle)]">
          {/* Header */}
          <div className="p-5 border-b border-[var(--border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[var(--accent-terra)]" />
              <h2 className="font-bold text-sm tracking-wider uppercase text-[var(--text-primary)]">
                Your Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[var(--bg-secondary)] px-5 py-3 border-b border-[var(--border-subtle)]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
                <Truck className="w-3.5 h-3.5 text-[var(--accent-terra)] shrink-0" />
                <span>
                  {isFree ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      🎉 You unlocked FREE Express Shipping!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-[var(--accent-terra)]">{formatPrice(amountNeeded)}</strong> more for FREE Shipping
                    </span>
                  )}
                </span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">{percent}%</span>
            </div>
            <div className="w-full bg-[var(--border-subtle)] h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isFree ? "bg-emerald-500" : "bg-[var(--accent-terra)]"
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)] mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-xs leading-relaxed">
                  Explore our original-design heavyweight silhouettes and find your fit.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all shadow-xs"
                >
                  Explore Drops →
                </Link>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3.5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3.5 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] relative group"
                    >
                      {/* Image Preview */}
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="w-20 h-24 rounded-lg overflow-hidden bg-zinc-900 shrink-0 relative"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={closeCart}
                              className="font-bold text-xs text-[var(--text-primary)] truncate hover:text-[var(--accent-terra)] transition-colors"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[var(--text-muted)] hover:text-rose-500 transition-colors p-0.5"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Size & Color Badges */}
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                              Size: {item.size}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)] truncate max-w-[120px]">
                              {item.color}
                            </span>
                          </div>
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border-subtle)]">
                          <div className="font-bold text-xs text-[var(--text-primary)]">
                            {formatPrice(item.price * item.quantity)}
                          </div>

                          <div className="flex items-center border border-[var(--border-strong)] rounded-md bg-[var(--bg-surface)]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-[11px] font-semibold text-[var(--text-primary)] min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.maxStock}
                              className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Box */}
                <div className="pt-2">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                          Coupon <strong>{appliedCoupon.code}</strong> applied (-{formatPrice(discount)})
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-rose-600 hover:underline font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => {
                              setCouponInput(e.target.value);
                              setCouponError("");
                            }}
                            placeholder="Discount code (e.g. DEPLOY10)"
                            className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] uppercase tracking-wider focus:outline-none focus:border-[var(--accent-terra)]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-semibold hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-rose-500 font-medium">{couponError}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Quick Add Cross-sell Recommendation */}
                {crossSellProduct && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-surface)] border border-[var(--border-subtle)]">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[var(--accent-terra)] mb-2">
                      <Sparkles className="w-3 h-3" />
                      <span>Complete Your Drop Setup</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={crossSellProduct.images[0]}
                          alt={crossSellProduct.name}
                          className="w-10 h-10 rounded-md object-cover shrink-0"
                        />
                        <div className="truncate">
                          <div className="text-xs font-bold text-[var(--text-primary)] truncate">
                            {crossSellProduct.name}
                          </div>
                          <div className="text-[11px] text-[var(--text-muted)]">
                            {formatPrice(crossSellProduct.price)}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          addItem(
                            crossSellProduct,
                            crossSellProduct.sizes[0],
                            crossSellProduct.colors[0].name
                          )
                        }
                        className="px-3 py-1.5 rounded-md bg-[var(--text-primary)] text-[var(--bg-primary)] text-[11px] font-semibold hover:opacity-90 transition-all shrink-0"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer & Direct Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
              {/* Calculations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[var(--text-primary)]">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-[var(--text-primary)]">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 uppercase font-bold text-[10px]">
                        FREE
                      </span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[var(--text-primary)] pt-2 border-t border-[var(--border-subtle)]">
                  <span>Total Amount</span>
                  <span className="text-base text-[var(--accent-terra)]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3.5 px-4 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[var(--accent-terra)] group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Trust Guarantee */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-[var(--text-muted)] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Razorpay & Stripe 256-bit SSL
                </span>
                <span>•</span>
                <span>COD Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

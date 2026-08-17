"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  Sparkles,
  Truck,
  Trash2,
  Plus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useUserStore } from "@/lib/store/userStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses" | "sizeProfile">("orders");

  const { orders, savedAddresses, sizeProfile, removeAddress, setDefaultAddress } = useUserStore();
  const { items: wishlistItems, removeFromWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="min-h-screen py-12 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
          <div>
            <span className="artifact-badge text-[10px]">DEPLOY Roster Member</span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-primary)] mt-1">
              My Account
            </h1>
            <p className="text-xs text-[var(--text-secondary)]">
              Manage your orders, saved addresses, and tailored streetwear size profile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/track-order"
              className="px-4 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:border-[var(--accent-terra)] transition-colors flex items-center gap-2"
            >
              <Truck className="w-3.5 h-3.5 text-[var(--accent-terra)]" />
              <span>Track Live Order</span>
            </Link>
          </div>
        </div>

        {/* Tabbed Navigation */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "orders"
                ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "wishlist"
                ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlistItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "addresses"
                ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({savedAddresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("sizeProfile")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "sizeProfile"
                ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[var(--accent-terra)]" />
            <span>Smart Size Profile</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* 1. Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="py-16 text-center rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8">
                  <Package className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3" />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--text-primary)]">
                    No orders placed yet
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-xs mx-auto">
                    When you order original DEPLOY silhouettes, they will appear here with live tracking.
                  </p>
                  <Link
                    href="/shop"
                    className="mt-6 inline-block px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest"
                  >
                    Shop Drops →
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--border-subtle)] gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[var(--text-primary)]">
                            Order {order.orderNumber}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase">
                            {order.orderStatus}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                          Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="font-bold text-sm text-[var(--text-primary)]">
                          {formatPrice(order.total)}
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)]">
                          Tracking: <strong className="font-mono">{order.trackingNumber}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={it.image}
                              alt={it.name}
                              className="w-14 h-16 object-cover rounded-xl"
                            />
                            <div>
                              <Link
                                href={`/product/${it.slug}`}
                                className="font-bold text-xs text-[var(--text-primary)] hover:text-[var(--accent-terra)]"
                              >
                                {it.name}
                              </Link>
                              <div className="text-[11px] text-[var(--text-secondary)]">
                                Size: {it.size} • {it.color} • Qty: {it.quantity}
                              </div>
                            </div>
                          </div>
                          <div className="font-bold text-xs text-[var(--text-primary)]">
                            {formatPrice(it.price * it.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 2. Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div>
              {wishlistItems.length === 0 ? (
                <div className="py-16 text-center rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8">
                  <Heart className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3" />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--text-primary)]">
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-xs mx-auto">
                    Save silhouettes you're eyeing for upcoming drops.
                  </p>
                  <Link
                    href="/shop"
                    className="mt-6 inline-block px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest"
                  >
                    Browse Catalog →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3"
                    >
                      <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-zinc-900">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <Link
                          href={`/product/${product.slug}`}
                          className="font-bold text-xs sm:text-sm text-[var(--text-primary)] hover:text-[var(--accent-terra)] line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <div className="text-xs font-bold text-[var(--text-primary)] mt-1">
                          {formatPrice(product.price)}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          addItem(product, product.sizes[0], product.colors[0].name)
                        }
                        className="w-full py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {savedAddresses.map((addr, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl bg-[var(--bg-surface)] border transition-all space-y-3 ${
                    addr.isDefault
                      ? "border-[var(--accent-terra)] ring-2 ring-[var(--accent-terra)]/20"
                      : "border-[var(--border-subtle)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[var(--text-primary)]">
                      {addr.fullName}
                    </span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 rounded bg-[var(--accent-terra)]/15 text-[var(--accent-terra)] text-[10px] font-bold uppercase">
                        Default
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {addr.addressLine1}
                    {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}
                    <br />
                    {addr.landmark ? `Near: ${addr.landmark}, ` : ""}
                    {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                    <br />
                    Phone: {addr.phone}
                  </p>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                    {!addr.isDefault ? (
                      <button
                        onClick={() => setDefaultAddress(idx)}
                        className="text-[var(--accent-terra)] font-semibold hover:underline"
                      >
                        Set as Default
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-600 font-medium">✓ Default Address</span>
                    )}

                    <button
                      onClick={() => removeAddress(idx)}
                      className="text-[var(--text-muted)] hover:text-rose-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. Smart Size Profile Tab */}
          {activeTab === "sizeProfile" && (
            <div className="max-w-2xl p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[var(--accent-terra)]/15 text-[var(--accent-terra)]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base uppercase tracking-wider text-[var(--text-primary)]">
                    Smart Size Profile
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Your saved measurements automatically recommend the best streetwear size on all product pages.
                  </p>
                </div>
              </div>

              {sizeProfile ? (
                <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Height</div>
                      <div className="text-base font-bold text-[var(--text-primary)] mt-0.5">
                        {sizeProfile.heightCm} cm
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Weight</div>
                      <div className="text-base font-bold text-[var(--text-primary)] mt-0.5">
                        {sizeProfile.weightKg} kg
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Drape Preference</div>
                      <div className="text-base font-bold text-[var(--text-primary)] mt-0.5 capitalize">
                        {sizeProfile.fitPreference}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] text-center">
                    <div className="text-xs text-[var(--text-secondary)]">Your Recommended Size:</div>
                    <div className="text-3xl font-black text-[var(--accent-terra)] mt-1">
                      Size {sizeProfile.recommendedSize}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                      ✓ {sizeProfile.confidenceScore}% Confidence Match
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-center space-y-3">
                  <p className="text-xs text-[var(--text-secondary)]">
                    You haven't set up your size profile yet. Open any product page and click "Find My Fit" to calibrate.
                  </p>
                  <Link
                    href="/shop"
                    className="inline-block px-5 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-wider"
                  >
                    Find My Fit on Shop →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

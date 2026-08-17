"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, ArrowRight } from "lucide-react";
import { useUserStore } from "@/lib/store/userStore";
import { formatPrice } from "@/lib/utils";

export default function TrackOrderPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const orders = useUserStore((state) => state.orders);

  const foundOrder = orders.find(
    (o) =>
      o.orderNumber.toLowerCase() === query.trim().toLowerCase() ||
      o.trackingNumber.toLowerCase() === query.trim().toLowerCase()
  ) || (searched && query.trim().length > 3 ? orders[0] : null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
  };

  return (
    <div className="min-h-screen py-16 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="artifact-badge artifact-badge-accent text-[10px]">
            Live Courier Sync
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
            Enter your DEPLOY Order ID (e.g. <strong>DP-2026-98214</strong>) or courier tracking number below.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleTrack} className="flex gap-2 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearched(false);
              }}
              placeholder="Enter Order ID (e.g. DP-2026-98214)..."
              className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono uppercase tracking-wider text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-terra)] shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-md shrink-0"
          >
            Track
          </button>
        </form>

        {/* Result Tracking Card */}
        {searched && foundOrder ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--border-subtle)] gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[var(--text-primary)]">
                    Order {foundOrder.orderNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase">
                    In Transit
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Courier: <strong>{foundOrder.carrier}</strong> • AWB: <span className="font-mono">{foundOrder.trackingNumber}</span>
                </p>
              </div>

              <div className="text-left sm:text-right text-xs">
                <span className="text-[var(--text-muted)]">Estimated Delivery:</span>
                <div className="font-bold text-sm text-[var(--accent-terra)]">
                  {foundOrder.estimatedDelivery}
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-emerald-500 space-y-1">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                  ✓
                </div>
                <div className="font-bold text-xs text-[var(--text-primary)]">
                  Order Verified & Prepped
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Tirupur Craft Studio • Fabric quality check passed
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-[var(--accent-terra)] space-y-1">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[var(--accent-terra)] text-white flex items-center justify-center text-[10px] animate-pulse">
                  •
                </div>
                <div className="font-bold text-xs text-[var(--accent-terra)]">
                  In Transit — Regional Sorting Hub
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Dispatched via Bluedart Air Express • Out for linehaul
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-[var(--border-subtle)] space-y-1 opacity-40">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-strong)]" />
                <div className="font-semibold text-xs text-[var(--text-primary)]">
                  Out for Doorstep Delivery
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Final delivery hub assignment
                </p>
              </div>
            </div>

            {/* Destination Address Info */}
            <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-start gap-3 text-xs">
              <MapPin className="w-4 h-4 text-[var(--accent-terra)] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[var(--text-primary)]">
                  Delivery Destination
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  {foundOrder.shippingAddress.fullName}, {foundOrder.shippingAddress.addressLine1},{" "}
                  {foundOrder.shippingAddress.city} - {foundOrder.shippingAddress.pincode}
                </div>
              </div>
            </div>
          </div>
        ) : searched ? (
          <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center space-y-2">
            <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--text-primary)]">
              No matching active order found
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
              Please double check your Order ID from your confirmation email or WhatsApp notification.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

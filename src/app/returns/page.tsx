"use client";

import { useState } from "react";
import { RotateCcw, CheckCircle2, ShieldCheck, Truck, ArrowRight, Package } from "lucide-react";

export default function ReturnsPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [reason, setReason] = useState("size_too_large");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-16 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="artifact-badge artifact-badge-accent text-[10px]">
            Hassle-Free Policy
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            15-Day Returns & Exchanges
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
            Doorstep pickup across India. If your original silhouette isn't fitting exactly how you envisioned, we will exchange it for free.
          </p>
        </div>

        {/* 3 Step Wizard Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
            <div className="text-xs font-bold uppercase text-[var(--accent-terra)]">Step 01</div>
            <h4 className="font-bold text-xs text-[var(--text-primary)]">Submit Request</h4>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Enter your Order Number and preferred replacement size below.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
            <div className="text-xs font-bold uppercase text-[var(--accent-terra)]">Step 02</div>
            <h4 className="font-bold text-xs text-[var(--text-primary)]">Doorstep Pickup</h4>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Our courier partner arrives at your address to inspect & pick up the unworn garment.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
            <div className="text-xs font-bold uppercase text-[var(--accent-terra)]">Step 03</div>
            <h4 className="font-bold text-xs text-[var(--text-primary)]">Fast Replacement</h4>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Your new size is dispatched immediately with zero extra shipping fees.
            </p>
          </div>
        </div>

        {/* Request Form */}
        <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[var(--border-subtle)]">
            <RotateCcw className="w-5 h-5 text-[var(--accent-terra)]" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--text-primary)]">
              Initiate Exchange or Return
            </h3>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300">
                Exchange Request Logged for {orderNumber}
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 max-w-sm mx-auto">
                Our logistics concierge will contact you via WhatsApp with your pickup AWB within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[var(--text-secondary)] mb-1">
                  DEPLOY Order Number *
                </label>
                <input
                  type="text"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. DP-2026-98214"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] font-mono uppercase text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-terra)]"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--text-secondary)] mb-1">
                  Reason for Exchange
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none"
                >
                  <option value="size_too_large">Size runs larger than expected (Need smaller size)</option>
                  <option value="size_too_small">Size runs smaller than expected (Need larger size)</option>
                  <option value="color_exchange">Prefer a different colorway</option>
                  <option value="store_credit">Return for store credit / refund</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-md"
              >
                Submit Exchange Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

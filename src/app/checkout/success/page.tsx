"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useUserStore } from "@/lib/store/userStore";
import { formatPrice } from "@/lib/utils";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "DC-2026-98214";
  const orders = useUserStore((state) => state.orders);
  const currentOrder = orders.find((o) => o.orderNumber === orderNumber) || orders[0];

  const [whatsappUpdates, setWhatsappUpdates] = useState(true);

  useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C46238", "#5F6651", "#D4A373", "#111113"],
      });
    } catch (e) {
      // Fallback
    }
  }, []);

  return (
    <div className="min-h-screen py-16 bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Success Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="artifact-badge artifact-badge-accent text-[10px]">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--text-primary)]">
              Thank You For Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Order Reference: <strong className="font-mono text-[var(--text-primary)]">{orderNumber}</strong>
            </p>
          </div>

          <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
            We’ve received your order. Our Tirupur studio is prepping your original heavyweight silhouettes for dispatch.
          </p>

          {/* WhatsApp Updates Box */}
          <div className="pt-4 max-w-md mx-auto">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] cursor-pointer">
              <span className="flex items-center gap-2 font-medium">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Receive live shipping updates on WhatsApp</span>
              </span>
              <input
                type="checkbox"
                checked={whatsappUpdates}
                onChange={(e) => setWhatsappUpdates(e.target.checked)}
                className="rounded text-emerald-600"
              />
            </label>
          </div>
        </div>

        {/* Live Timeline Tracker Stage */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--text-primary)]">
                Studio Timeline
              </h3>
              <p className="text-[11px] text-[var(--text-muted)]">
                Estimated Delivery: <strong>{currentOrder?.estimatedDelivery || "Thu, 14 Aug"}</strong>
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[10px] font-mono font-bold text-[var(--accent-terra)]">
              {currentOrder?.carrier || "Bluedart Express"}
            </span>
          </div>

          {/* Stepper Progress */}
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto font-bold">
                ✓
              </div>
              <div className="font-bold text-[var(--text-primary)]">Confirmed</div>
              <div className="text-[10px] text-[var(--text-muted)]">Just now</div>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-terra)] text-white flex items-center justify-center mx-auto font-bold animate-pulse">
                2
              </div>
              <div className="font-bold text-[var(--accent-terra)]">Fabric Prep</div>
              <div className="text-[10px] text-[var(--text-muted)]">In Progress</div>
            </div>

            <div className="space-y-1.5 opacity-40">
              <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-[var(--text-muted)] flex items-center justify-center mx-auto font-bold">
                3
              </div>
              <div className="font-semibold text-[var(--text-primary)]">Shipped</div>
              <div className="text-[10px] text-[var(--text-muted)]">Courier Hub</div>
            </div>

            <div className="space-y-1.5 opacity-40">
              <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-[var(--text-muted)] flex items-center justify-center mx-auto font-bold">
                4
              </div>
              <div className="font-semibold text-[var(--text-primary)]">Delivered</div>
              <div className="text-[10px] text-[var(--text-muted)]">Doorstep</div>
            </div>
          </div>
        </div>

        {/* Order Details Breakdown */}
        {currentOrder && (
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4 text-xs">
            <h3 className="font-bold uppercase tracking-widest text-[var(--text-primary)] pb-2 border-b border-[var(--border-subtle)]">
              Items Summary
            </h3>

            <div className="space-y-3">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <div className="font-bold text-[var(--text-primary)]">{item.name}</div>
                      <div className="text-[11px] text-[var(--text-secondary)]">
                        Size: {item.size} • {item.color} • Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-[var(--text-primary)]">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-between font-black text-sm text-[var(--text-primary)]">
              <span>Total Paid ({currentOrder.paymentMethod.toUpperCase()})</span>
              <span className="text-[var(--accent-terra)]">{formatPrice(currentOrder.total)}</span>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/track-order"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all text-center"
          >
            Track Order Status
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--bg-surface)] transition-all text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center text-xs">Loading order...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

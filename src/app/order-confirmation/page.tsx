"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  MessageCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useUserStore } from "@/lib/store/userStore";
import { formatPrice } from "@/lib/utils";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "DC-2026-98214";
  const orders = useUserStore((state) => state.orders);
  const currentOrder = orders.find((o) => o.orderNumber === orderNumber) || orders[0];

  const [whatsappUpdates, setWhatsappUpdates] = useState(true);

  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#FF3B00", "#F5F5F0", "#17171A", "#CCFF00"],
      });
    } catch (e) {}
  }, []);

  return (
    <div className="min-h-screen py-16 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="tagline-pill tagline-pill-accent text-[10px]">
              CONFIRMED DROP
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-primary)]">
              Order Confirmed
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono">
              Reference: <strong className="text-[var(--text-primary)]">{orderNumber}</strong>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
            Your original streetwear pieces are being prepped at our Tirupur studio. You will receive an SMS and WhatsApp confirmation with live tracking.
          </p>

          {/* WhatsApp Updates Box */}
          <div className="pt-4 max-w-md mx-auto">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] cursor-pointer">
              <span className="flex items-center gap-2 font-medium">
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>Receive live delivery dispatch alerts on WhatsApp</span>
              </span>
              <input
                type="checkbox"
                checked={whatsappUpdates}
                onChange={(e) => setWhatsappUpdates(e.target.checked)}
                className="rounded text-[var(--accent-primary)]"
              />
            </label>
          </div>
        </div>

        {/* What Happens Next Steps */}
        <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6">
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--text-primary)] pb-3 border-b border-[var(--border-subtle)]">
            What Happens Next
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-xs font-black text-[var(--accent-primary)]">01. FABRIC PREP</div>
              <h4 className="font-bold text-xs text-[var(--text-primary)]">Studio Inspection</h4>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Garments undergo double-needle inspection and bio-wash anti-shrink quality check.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-black text-[var(--accent-primary)]">02. EXPRESS DISPATCH</div>
              <h4 className="font-bold text-xs text-[var(--text-primary)]">Air Courier Hand-Off</h4>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Dispatched via Bluedart / Delhivery Air with live AWB tracking link sent to your phone.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-black text-[var(--accent-primary)]">03. DOORSTEP ARRIVAL</div>
              <h4 className="font-bold text-xs text-[var(--text-primary)]">Delivery & 15-Day Trial</h4>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Delivered in 2–4 days. 15-day free doorstep exchange if fit isn't spot on.
              </p>
            </div>
          </div>
        </div>

        {/* Order Details Breakdown */}
        {currentOrder && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <span className="font-black uppercase tracking-widest text-[var(--text-primary)]">
                Items Summary
              </span>
              <span className="font-mono text-[var(--text-muted)]">
                Carrier: {currentOrder.carrier || "Bluedart Air"}
              </span>
            </div>

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
              <span>Total ({currentOrder.paymentMethod.toUpperCase()})</span>
              <span className="text-[var(--accent-primary)]">{formatPrice(currentOrder.total)}</span>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/track-order"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all text-center"
          >
            Track Order Live
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--bg-surface)] transition-all text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center text-xs">Loading order...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}

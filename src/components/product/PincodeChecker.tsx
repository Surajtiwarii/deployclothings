"use client";

import { useState } from "react";
import { Truck, MapPin, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { getEstimatedDeliveryDate } from "@/lib/utils";

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<{
    valid: boolean;
    city?: string;
    deliveryDate?: string;
    codAvailable?: boolean;
  } | null>(null);
  const [error, setError] = useState("");

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(pincode.trim())) {
      setError("Please enter a valid 6-digit Indian postal code.");
      setResult(null);
      return;
    }

    // Mock realistic Indian logistics resolution
    const pin = pincode.trim();
    let city = "Metro Zone";
    let days = 3;

    if (pin.startsWith("56")) {
      city = "Bengaluru, Karnataka";
      days = 2;
    } else if (pin.startsWith("11")) {
      city = "Delhi NCR";
      days = 3;
    } else if (pin.startsWith("40")) {
      city = "Mumbai, Maharashtra";
      days = 3;
    } else if (pin.startsWith("60")) {
      city = "Chennai, Tamil Nadu";
      days = 2;
    } else if (pin.startsWith("70")) {
      city = "Kolkata, West Bengal";
      days = 4;
    } else {
      city = "India Delivery Hub";
      days = 4;
    }

    setResult({
      valid: true,
      city,
      deliveryDate: getEstimatedDeliveryDate(days),
      codAvailable: true,
    });
  };

  return (
    <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
        <Truck className="w-4 h-4 text-[var(--accent-terra)]" />
        <span>Delivery & COD Availability</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, ""));
              setError("");
            }}
            placeholder="Enter 6-digit Pincode..."
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] font-mono focus:outline-none focus:border-[var(--accent-terra)]"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold hover:opacity-90 transition-all shrink-0"
        >
          Check
        </button>
      </form>

      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}

      {result && (
        <div className="pt-2 space-y-2 text-xs animate-fade-in border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>
              Express Delivery by <strong>{result.deliveryDate}</strong> to {result.city}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
            <span>• Cash on Delivery (COD) Eligible</span>
            <span>• Free Shipping on ₹1,999+</span>
          </div>
        </div>
      )}
    </div>
  );
}

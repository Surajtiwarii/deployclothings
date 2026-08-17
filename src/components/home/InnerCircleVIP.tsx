"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Shield } from "lucide-react";

export default function InnerCircleVIP() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] relative overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-8 sm:p-14 text-center shadow-lg space-y-6 relative overflow-hidden">
          
          {/* Subtle Ambient Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-primary)]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent-primary)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN THE INNER CIRCLE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)] leading-tight">
            NEVER MISS A DROP.
          </h2>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
            Limited micro-batches sell out in hours. Gain 2-hour early access, private VIP archive sales, and an instant ₹300 voucher code.
          </p>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 max-w-md mx-auto text-center space-y-2 animate-fade-in">
              <div className="flex items-center justify-center gap-2 text-emerald-700 font-black text-xs uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're in the DEPLOY Circle</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Use code <strong className="text-[var(--text-primary)] font-mono bg-white px-2 py-1 rounded border border-[var(--border-subtle)]">DEPLOY10</strong> at checkout for 10% off.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full px-5 py-3.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--bg-surface)] transition-all"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 shrink-0"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 pt-4 text-[11px] text-[var(--text-muted)] font-mono">
            <span>✓ Zero Spam Guarantee</span>
            <span>•</span>
            <span>✓ One-Click Unsubscribe</span>
          </div>
        </div>
      </div>
    </section>
  );
}

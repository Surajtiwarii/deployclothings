"use client";

import { Sparkles, Shirt, Truck, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative pt-5 sm:pt-7 pb-8 sm:pb-12 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors overflow-hidden select-none">
      
      {/* Background Ambient Radial Glow & Architectural Blueprint Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.02] dark:opacity-[0.04] overflow-hidden">
        <span className="font-black text-[20vw] tracking-tighter uppercase select-none leading-none">
          DEPLOY
        </span>
      </div>

      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[220px] bg-[var(--accent-primary)]/10 blur-[110px] rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 z-10">
        
        {/* Top Manifesto Header */}
        <div className="text-center space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--accent-primary)] shadow-xs">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>The DEPLOY Manifesto</span>
          </div>

          <div className="space-y-1.5 max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.08] text-[var(--text-primary)]">
              Built for the next generation of Indian streetwear
            </h1>
            
            <p className="text-sm sm:text-lg font-bold tracking-tight text-[var(--accent-primary)] font-mono">
              "DEPLOY is not just clothing. It is a mindset."
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed font-sans">
            We create oversized tees and hoodies that combine premium fabrics, clean design, and Indian street culture. Every drop is made to feel effortless, wearable, and bold.
          </p>
        </div>

        {/* Minimalist Industrial Spec Strip (Compact) */}
        <div className="border-t border-b border-[var(--border-subtle)] py-3.5 sm:py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-center">
            
            {/* Spec 1: 150+ Sold */}
            <div className="space-y-0.5">
              <div className="text-sm sm:text-base font-black font-mono text-[var(--accent-primary)]">
                150+ Sold
              </div>
              <div className="text-[10px] text-[var(--text-secondary)] font-mono">
                T-Shirts Delivered
              </div>
            </div>

            {/* Spec 2 */}
            <div className="space-y-0.5">
              <div className="text-sm sm:text-base font-black font-mono text-[var(--text-primary)]">
                Premium Cotton
              </div>
              <div className="text-[10px] text-[var(--text-secondary)] font-mono">
                100% Combed
              </div>
            </div>

            {/* Spec 3 */}
            <div className="space-y-0.5">
              <div className="text-sm sm:text-base font-black font-mono text-[var(--text-primary)]">
                Made In India
              </div>
              <div className="text-[10px] text-[var(--text-secondary)] font-mono">
                Crafted locally
              </div>
            </div>

            {/* Spec 4 */}
            <div className="space-y-0.5">
              <div className="text-sm sm:text-base font-black font-mono text-[var(--text-primary)]">
                Crafted Locally
              </div>
              <div className="text-[10px] text-[var(--text-secondary)] font-mono">
                Effortless & Bold
              </div>
            </div>

          </div>
        </div>

        {/* Why Choose Us Section (Compact Grid) */}
        <div className="space-y-3 pt-1">
          <div className="text-center sm:text-left">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-[var(--text-primary)]">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            
            {/* Card 1: Premium Fabric */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#111116] border border-[var(--border-subtle)] dark:border-white/10 flex flex-col items-start gap-2 shadow-xs hover:border-[var(--accent-primary)]/50 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center">
                <Shirt className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] dark:text-white">
                  Premium Fabric
                </h3>
                <p className="text-[10px] text-[var(--text-secondary)] dark:text-zinc-400 font-mono mt-0.5 leading-snug">
                  240 GSM heavyweight cotton
                </p>
              </div>
            </div>

            {/* Card 2: Clean Design */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#111116] border border-[var(--border-subtle)] dark:border-white/10 flex flex-col items-start gap-2 shadow-xs hover:border-[var(--accent-primary)]/50 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] dark:text-white">
                  Clean Design
                </h3>
                <p className="text-[10px] text-[var(--text-secondary)] dark:text-zinc-400 font-mono mt-0.5 leading-snug">
                  Minimal & timeless graphics
                </p>
              </div>
            </div>

            {/* Card 3: Fast Shipping */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#111116] border border-[var(--border-subtle)] dark:border-white/10 flex flex-col items-start gap-2 shadow-xs hover:border-[var(--accent-primary)]/50 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] dark:text-white">
                  Fast Shipping
                </h3>
                <p className="text-[10px] text-[var(--text-secondary)] dark:text-zinc-400 font-mono mt-0.5 leading-snug">
                  Dispatch in 24–48 hrs
                </p>
              </div>
            </div>

            {/* Card 4: Easy Exchange */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#111116] border border-[var(--border-subtle)] dark:border-white/10 flex flex-col items-start gap-2 shadow-xs hover:border-[var(--accent-primary)]/50 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] dark:text-white">
                  Easy Exchange
                </h3>
                <p className="text-[10px] text-[var(--text-secondary)] dark:text-zinc-400 font-mono mt-0.5 leading-snug">
                  14-day size exchange
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

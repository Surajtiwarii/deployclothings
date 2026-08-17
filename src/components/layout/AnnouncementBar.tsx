"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { useUserStore } from "@/lib/store/userStore";

const ANNOUNCEMENTS = [
  {
    icon: Truck,
    text: "FREE EXPRESS SHIPPING ON ALL ORDERS OVER ₹1,999",
    highlight: "FREE SHIPPING",
    link: "/shop",
  },
  {
    icon: Sparkles,
    text: "NEW DROP: PARKER 400 GSM & SPIDER 380 GSM HOODIES NOW LIVE",
    highlight: "EXPLORE DROP",
    link: "/category/hoodies",
  },
  {
    icon: ShieldCheck,
    text: "100% ORIGINAL DESIGNS • 15-DAY HASSLE-FREE EXCHANGES • COD AVAILABLE",
    highlight: "LEARN MORE",
    link: "/about",
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const theme = useUserStore((state) => state.theme);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const isDark = mounted ? theme === "dark" : true;
  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  return (
    <aside
      aria-label="Announcement"
      className={`text-[10px] sm:text-[11px] py-1 px-4 border-b relative overflow-hidden z-40 transition-colors ${
        isDark
          ? "bg-[#040406] text-zinc-300 border-white/[0.08]"
          : "bg-zinc-900 text-zinc-100 border-zinc-800"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <Link
          href={current.link}
          className="group inline-flex items-center gap-2 tracking-wider font-semibold text-[10px] sm:text-[11px] transition-opacity duration-300 hover:text-[var(--accent-primary)]"
        >
          <Icon className="w-3 h-3 text-[var(--accent-primary)] shrink-0 animate-pulse" />
          <span className="truncate max-w-[280px] sm:max-w-none">{current.text}</span>
          <ArrowRight className="w-2.5 h-2.5 text-[var(--bg-primary)]/60 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      {/* Visual Dot Indicators */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1.5">
        {ANNOUNCEMENTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-[var(--accent-primary)] w-4" : "bg-[var(--bg-primary)]/30"
            }`}
          />
        ))}
      </div>
    </aside>
  );
}

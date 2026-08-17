"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  RotateCcw,
  Truck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Mail,
  Lock,
} from "lucide-react";
import { InstagramIcon, TwitterIcon } from "@/components/ui/Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#0E0E10] text-[#E4E4E7] pt-16 pb-12 border-t border-[#222227] mt-auto">
      {/* Brand Trust Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#222227]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#1C1C21] text-[var(--accent-primary)] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                Original Designs
              </h4>
              <p className="text-[11px] sm:text-xs text-[#9D9DA8] mt-1 leading-relaxed">
                Zero generic licenses. Every cut & drape is engineered in-house.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#1C1C21] text-[var(--accent-primary)] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                Heavyweight GSM
              </h4>
              <p className="text-[11px] sm:text-xs text-[#9D9DA8] mt-1 leading-relaxed">
                260–320 GSM combed cotton fabrics that hold their structure wash after wash.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#1C1C21] text-[var(--accent-primary)] shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                15-Day Free Exchange
              </h4>
              <p className="text-[11px] sm:text-xs text-[#9D9DA8] mt-1 leading-relaxed">
                Hassle-free doorstep exchanges if the size or fit isn't spot on.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#1C1C21] text-[var(--accent-primary)] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                COD & Express Shipping
              </h4>
              <p className="text-[11px] sm:text-xs text-[#9D9DA8] mt-1 leading-relaxed">
                Fast delivery across 19,000+ Indian pincodes via Bluedart & Delhivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-white text-black flex items-center justify-center font-bold text-xs">
              DP
            </div>
            <span className="font-bold tracking-widest text-lg uppercase text-white">
              DEPLOY
            </span>
          </div>
          <p className="text-xs text-[#A3A3B0] leading-relaxed max-w-sm">
            DEPLOY is an original streetwear studio based in India. Ready to wear, ready to deploy. We design heavyweight architectural silhouettes with zero pop-culture gimmicks, prioritizing fabric density, drape, and enduring construction.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#1C1C21] flex items-center justify-center text-[#A3A3B0] hover:text-white hover:bg-[#282830] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#1C1C21] flex items-center justify-center text-[#A3A3B0] hover:text-white hover:bg-[#282830] transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:concierge@deployclothings.com"
              className="w-8 h-8 rounded-full bg-[#1C1C21] flex items-center justify-center text-[#A3A3B0] hover:text-white hover:bg-[#282830] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">
            Collections
          </h4>
          <ul className="space-y-2 text-xs text-[#A3A3B0]">
            <li>
              <Link href="/category/hoodies" className="hover:text-white transition-colors">
                Heavyweight Hoodies
              </Link>
            </li>
            <li>
              <Link href="/category/graphic-tees" className="hover:text-white transition-colors">
                Graphic & Motorsport
              </Link>
            </li>
            <li>
              <Link href="/category/oversized-fits" className="hover:text-white transition-colors">
                Oversized Drop-Shoulder
              </Link>
            </li>
            <li>
              <Link href="/category/heavyweight-tees" className="hover:text-white transition-colors">
                Heavyweight Boxy Tees
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-[var(--accent-primary)] font-semibold transition-colors">
                View All Drops →
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">
            Customer Care
          </h4>
          <ul className="space-y-2 text-xs text-[#A3A3B0]">
            <li>
              <Link href="/track-order" className="hover:text-white transition-colors">
                Track Live Order
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-white transition-colors">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-white transition-colors">
                Shipping & FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Concierge Contact
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-white transition-colors">
                My Size Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* VIP Newsletter Column */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">
            Join The DEPLOY Roster
          </h4>
          <p className="text-xs text-[#A3A3B0] leading-relaxed">
            Get early VIP drop access 1 hour before public release + instant ₹300 voucher code on your first order.
          </p>

          {subscribed ? (
            <div className="p-3.5 rounded-lg bg-[#162B1E] border border-[#285936] text-[#6EE7B7] text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>You're in! Use coupon <strong>DEPLOY10</strong> at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#19191E] border border-[#2B2B33] text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-[var(--accent-primary)] hover:opacity-90 text-white font-semibold text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="pt-2 flex items-center gap-2 text-[10px] text-[#71717A]">
            <Lock className="w-3 h-3 text-[#A3A3B0]" />
            <span>Zero spam. Unsubscribe anytime with 1 click.</span>
          </div>
        </div>
      </div>

      {/* Bottom Payment Gateways & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#222227] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71717A]">
        <div>
          © {new Date().getFullYear()} DEPLOY Studio. Ready to Wear, Ready to Deploy. All rights reserved.
        </div>
        
        {/* Payment Badges */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase font-semibold text-[#A3A3B0]">
            Secured By:
          </span>
          <span className="px-2 py-0.5 rounded bg-[#1C1C21] border border-[#2B2B33] text-[10px] font-bold text-[#E4E4E7]">
            RAZORPAY
          </span>
          <span className="px-2 py-0.5 rounded bg-[#1C1C21] border border-[#2B2B33] text-[10px] font-bold text-[#E4E4E7]">
            UPI / GPAY
          </span>
          <span className="px-2 py-0.5 rounded bg-[#1C1C21] border border-[#2B2B33] text-[10px] font-bold text-[#E4E4E7]">
            VISA / MC
          </span>
          <span className="px-2 py-0.5 rounded bg-[#1C1C21] border border-[#2B2B33] text-[10px] font-bold text-[#E4E4E7]">
            STRIPE
          </span>
        </div>
      </div>
    </footer>
  );
}

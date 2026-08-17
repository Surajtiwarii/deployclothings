"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Crown,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Flame,
  Truck,
  Globe,
} from "lucide-react";

interface HeroSlide {
  id: string;
  isOfferSlide?: boolean;
  pillText?: string;
  pillColor?: string;
  pillDotColor?: string;
  title: string;
  subtitle: string;
  tagline?: string;
  image: string;
  productSlug: string;
  accentGlow: string;
  primaryCtaText: string;
  price?: number;
  compareAtPrice?: number;
  discountBadge?: string;
  description?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "gymdari",
    isOfferSlide: true,
    pillText: "NEW ARRIVAL",
    pillColor: "border-purple-400/40 bg-purple-500/15 text-purple-300",
    pillDotColor: "bg-purple-400",
    title: "GYMएDARI",
    subtitle: "ANGELIC REBELLION",
    tagline: "BOLD FRONT TYPOGRAPHY • WINGED GUARDIAN BACK ART",
    image: "/Gymadari T-Shirt HeroBanner.jpg",
    productSlug: "/shop",
    accentGlow: "rgba(168, 85, 247, 0.35)",
    primaryCtaText: "Claim ₹459 Debut Drop",
  },
  {
    id: "spider-hoodie",
    isOfferSlide: false,
    title: "NEW",
    subtitle: "COLLECTION",
    tagline: "READY TO WEAR, READY TO DEPLOY",
    image: "/Spider white Hoodie HeroBanner.png",
    productSlug: "/product/spider-white-hoodie",
    accentGlow: "rgba(123, 130, 196, 0.35)",
    primaryCtaText: "SHOP NOW",
    price: 799,
    compareAtPrice: 1499,
    discountBadge: "Save 47%",
    description: "PREMIUM STREETWEAR",
  },
  {
    id: "porsche",
    isOfferSlide: false,
    pillText: "LIMITED MOTORSPORT DROP",
    pillColor: "border-amber-400/40 bg-amber-500/15 text-amber-300",
    pillDotColor: "bg-amber-400",
    title: "PORSCHE 911",
    subtitle: "TURBO MOTORSPORT",
    tagline: "RETRO SPEED EDITION",
    image: "/Porche 911 T-Shirt HeroBanner.png",
    productSlug: "/product/porsche-911-t-shirt",
    accentGlow: "rgba(245, 158, 11, 0.35)",
    primaryCtaText: "Shop 911 Drop • ₹649",
    price: 649,
    compareAtPrice: 1499,
    discountBadge: "Save 57%",
    description: "High-octane motorsport tribute engineered with structured stay-flat collar and iconic artwork.",
  },
  {
    id: "believe",
    isOfferSlide: false,
    pillText: "SIGNATURE DROP",
    pillColor: "border-zinc-400/40 bg-zinc-500/15 text-zinc-300",
    pillDotColor: "bg-zinc-400",
    title: "TIMELESS FASHION",
    subtitle: "FOR THE MODERN ERA",
    tagline: "ICONIC SILHOUETTES • ZERO-SHRINK COMBED COTTON",
    image: "/Believe T-Shirt HeroBanner.jpg",
    productSlug: "/shop",
    accentGlow: "rgba(255, 255, 255, 0.25)",
    primaryCtaText: "SHOP NOW",
    price: 599,
    compareAtPrice: 799,
    discountBadge: "Save 25%",
    description: "We sell exclusive, sophisticated, and contemporary outfits for men.",
  },
];

const TICKER_ITEMS = [
  { icon: ShieldCheck, text: '1.25" Anti-Sag Reinforced Collars' },
  { icon: Truck, text: "Free Express Shipping Across India" },
  { icon: RotateCcw, text: "15-Day Free Doorstep Trial & Returns" },
  { icon: Sparkles, text: "Cash On Delivery (COD) Available" },
  { icon: Flame, text: "High-Definition Zero-Crack HD Prints" },
  { icon: ShieldCheck, text: "Pre-Shrunk Structured Boxy Fit" },
];

const AUTO_PLAY_INTERVAL = 6500; // 6.5 seconds continuous auto-play

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);

  const currentSlide = HERO_SLIDES[currentIndex];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Continuous Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [nextSlide]);

  // Mobile Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative w-full bg-[#08080a] text-white overflow-hidden select-none">
      {/* Main Hero Showcase Container with Proportional Responsive Height */}
      <div
        className="relative w-full min-h-[540px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[700px] xl:min-h-[760px] flex items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Images with Crossfade */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const isLightSlide = slide.id === "spider-hoodie";
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={`${slide.title} ${slide.subtitle} Streetwear Banner`}
                className="w-full h-full object-cover object-[75%_65%] sm:object-[72%_60%] md:object-[center_65%] lg:object-[center_60%]"
              />

              {/* Dynamic Gradient Scrim */}
              {isLightSlide ? (
                <>
                  {/* Soft light scrim on mobile for readability, pure transparent on larger screens */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e8e4dc]/70 via-[#e8e4dc]/30 to-transparent w-full sm:w-[60%] md:w-[48%] pointer-events-none" />
                </>
              ) : (
                <>
              {/* Dynamic Gradient Scrim on Left: Darker behind text, transparent over models */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 sm:via-black/60 md:via-black/45 to-transparent w-full sm:w-[72%] lg:w-[60%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />
                </>
              )}
            </div>
          );
        })}

        {/* Compact, Well-Proportioned Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-14 w-full">
          <div className="max-w-md sm:max-w-lg lg:max-w-xl space-y-4 sm:space-y-4.5">
            
            {currentSlide.id === "spider-hoodie" ? (
              /* Custom Spider / New Collection Banner Layout matching exact design */
              <div className="relative space-y-3.5 sm:space-y-4.5 select-none">
                {/* Giant Faint Background Watermark Typography "NEW" */}
                <div
                  className="absolute -top-12 sm:-top-20 md:-top-28 lg:-top-32 -left-6 sm:-left-10 lg:-left-12 select-none pointer-events-none -z-10 overflow-hidden leading-none opacity-25 md:opacity-30"
                  aria-hidden="true"
                >
                  <span className="text-[130px] sm:text-[180px] md:text-[230px] lg:text-[280px] font-black tracking-tighter text-[#A4A9B8] font-sans">
                    NEW
                  </span>
                </div>

                {/* Top Tagline */}
                <p className="text-xs sm:text-[13px] md:text-sm font-mono font-bold tracking-[0.24em] text-[#111116] uppercase">
                  {currentSlide.tagline || "READY TO WEAR, READY TO DEPLOY"}
                </p>

                {/* Big NEW COLLECTION Title */}
                <div className="space-y-0 leading-none">
                  <div className="flex items-center gap-2.5 sm:gap-3.5">
                    <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-black uppercase tracking-tight text-[#111116] leading-none">
                      {currentSlide.title}
                    </span>
                    {/* 4-point sparkle star in exact periwinkle indigo color */}
                    <svg
                      className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-13 lg:h-13 text-[#5860A2] shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                    </svg>
                  </div>
                  <div className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-black uppercase tracking-tight text-[#5860A2] leading-none pt-1">
                    {currentSlide.subtitle}
                  </div>
                </div>

                {/* Divider Line & Subtitle */}
                <div className="space-y-2 pt-1">
                  <div className="w-12 h-[2.5px] bg-[#111116]" />
                  <p className="text-xs sm:text-[13px] md:text-sm font-mono font-bold tracking-[0.22em] text-[#111116] uppercase">
                    {currentSlide.description || "PREMIUM STREETWEAR"}
                  </p>
                </div>

                {/* Price Display */}
                {currentSlide.price && (
                  <div className="flex items-baseline flex-wrap gap-x-2.5 gap-y-1 pt-0.5">
                    {currentSlide.compareAtPrice && (
                      <span className="text-[#656877] line-through decoration-red-500/80 decoration-2 font-bold text-lg sm:text-xl font-mono">
                        ₹{currentSlide.compareAtPrice}
                      </span>
                    )}
                    <span className="text-[#111116] font-black text-2xl sm:text-3xl font-mono">
                      ₹{currentSlide.price}
                    </span>
                    {currentSlide.discountBadge && (
                      <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider border font-mono bg-[#5860A2]/15 text-[#30376d] border-[#5860A2]/30">
                        {currentSlide.discountBadge}
                      </span>
                    )}
                  </div>
                )}

                {/* Action CTA Button */}
                <div className="pt-2 sm:pt-3">
                  <Link
                    href={currentSlide.productSlug}
                    className="w-auto px-6 sm:px-7 py-3 bg-[#0d0e13] hover:bg-white text-white hover:text-black border border-white/30 hover:border-white rounded-none font-mono font-bold text-xs sm:text-sm uppercase tracking-[0.14em] transition-all duration-300 shadow-xl inline-flex items-center justify-center gap-2 group"
                  >
                    <span>{currentSlide.primaryCtaText}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                  </Link>
                </div>

                {/* Bottom Deploy Mode Badge */}
                <div className="pt-3 sm:pt-4 flex items-center gap-3 text-[#111116]">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#111116] shrink-0 stroke-[1.8]" />
                  <div className="text-[11px] sm:text-xs font-mono leading-tight tracking-wider uppercase">
                    <div className="font-extrabold text-[#111116]">DEPLOY MODE: ON</div>
                    <div className="font-semibold text-[#454752]">BUILT TO MOVE.</div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Pill Badge if present */}
                {currentSlide.pillText && (
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase shadow-xs backdrop-blur-md ${currentSlide.pillColor}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full animate-pulse ${currentSlide.pillDotColor}`}
                    />
                    <span>{currentSlide.pillText}</span>
                  </div>
                )}

                {/* Top Brand Title & Subtitle Block */}
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] drop-shadow-md text-white">
                    <span>{currentSlide.title}</span>
                    <span className={`block font-light tracking-wide text-zinc-200 mt-1 ${currentSlide.id === "believe" ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white" : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"}`}>
                      {currentSlide.subtitle}
                    </span>
                  </h1>

                  {currentSlide.tagline && (
                    <p className="text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase text-zinc-300 pt-1">
                      {currentSlide.tagline}
                    </p>
                  )}
                </div>

                {/* Custom Offer / Hook Section */}
                {currentSlide.isOfferSlide ? (
                  /* Gymdari Debut Offer Block */
                  <div className="space-y-2.5 pt-1">
                    {/* Offer Headline */}
                    <div className="space-y-1">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight flex items-baseline flex-wrap gap-x-2.5 gap-y-1">
                        <span>Only</span>
                        <span className="text-zinc-400 line-through decoration-red-500/80 decoration-2 font-bold text-xl sm:text-2xl md:text-3xl">
                          ₹599
                        </span>
                        <span className="text-[#a78bfa] font-black text-2xl sm:text-3xl md:text-4xl inline-flex items-center gap-1.5">
                          ₹459
                          <Crown className="inline-block w-6 h-6 sm:w-7 sm:h-7 text-[#a78bfa] stroke-[2.2] animate-pulse" />
                        </span>
                      </div>

                      <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-white">
                        for the first{" "}
                        <span className="text-[#a78bfa] relative inline-block">
                          50 buyers.
                          {/* Curve Underline */}
                          <svg
                            className="absolute -bottom-1 left-0 w-full text-[#a78bfa] overflow-visible"
                            height="6"
                            viewBox="0 0 100 6"
                            fill="none"
                            preserveAspectRatio="none"
                          >
                            <path
                              d="M1 4C30 1 70 1 99 4"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </div>

                      {/* Subtitle */}
                      <p className="text-xs sm:text-sm text-zinc-200 max-w-md leading-relaxed font-normal pt-1.5">
                        Grab the debut drop before it&apos;s gone —{" "}
                        <strong className="text-white font-semibold">only 50 units</strong> at this price, one per buyer.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Product / Category Price Block (Porsche & Timeless Fashion) */
                  <div className="space-y-2.5 pt-1">
                    {/* Price Hook */}
                    {currentSlide.price && (
                      <div className="flex items-baseline flex-wrap gap-x-2.5 gap-y-1">
                        {currentSlide.compareAtPrice && (
                          <span className="text-zinc-400 line-through decoration-red-500/80 decoration-2 font-bold text-xl sm:text-2xl md:text-3xl font-mono">
                            ₹{currentSlide.compareAtPrice}
                          </span>
                        )}
                        <span className="text-white font-black text-2xl sm:text-3xl md:text-4xl font-mono">
                          ₹{currentSlide.price}
                        </span>
                        {currentSlide.discountBadge && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border font-mono ${
                            currentSlide.id === "porsche"
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                              : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          }`}>
                            {currentSlide.discountBadge}
                          </span>
                        )}
                      </div>
                    )}

                    {currentSlide.description && (
                      <p className="text-xs sm:text-sm text-zinc-300 max-w-md leading-relaxed font-mono">
                        {currentSlide.description}
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-1 flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  <Link
                    href={currentSlide.productSlug}
                    className="w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black hover:bg-black hover:text-white border-2 border-white hover:border-white font-mono font-bold text-[11px] sm:text-xs uppercase tracking-[0.12em] transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2 group"
                  >
                    <span>{currentSlide.primaryCtaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </>
            )}

          </div>
        </div>

        {/* Compact Previous & Next Arrow Navigation */}
        <button
          onClick={prevSlide}
          aria-label="Previous banner"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 shadow-md group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next banner"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 shadow-md group"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-sm">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? "w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

      </div>

      {/* Infinite Scrolling Ticker Strip Below Hero */}
      <div className="relative border-t border-b border-white/10 bg-[#0e0e12] py-3 overflow-hidden select-none">
        {/* Subtle Edge Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-[#0e0e12] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-[#0e0e12] to-transparent z-10" />

        <div className="animate-marquee flex items-center gap-8 sm:gap-12">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-medium whitespace-nowrap shrink-0 hover:text-white transition-colors"
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-primary)] shrink-0" />
                <span>{item.text}</span>
                <span className="text-zinc-600 ml-4 sm:ml-6">•</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

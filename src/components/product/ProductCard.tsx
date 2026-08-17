"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Check, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, size, product.colors[0].name);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div
      className="group relative flex flex-col rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden luxury-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image Container with Instant Front -> Back / Lifestyle Hover Swap */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-[var(--bg-secondary)]">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={hovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
          />
        </Link>

        {/* GSM / Drop Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/80 text-white text-[10px] font-mono font-bold tracking-widest backdrop-blur-md border border-white/10">
            {product.gsm} GSM
          </span>
          {product.isNewDrop && (
            <span className="px-2.5 py-1 rounded-full bg-[var(--accent-primary)] text-white text-[9px] font-bold tracking-widest uppercase">
              NEW DROP
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Wishlist"
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            isWishlisted
              ? "bg-[var(--accent-primary)] text-white shadow-lg"
              : "bg-black/60 text-white/70 hover:text-white hover:bg-black/90"
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-transform ${
              isWishlisted ? "fill-white" : ""
            }`}
          />
        </button>

        {/* Quick Add Size Bar (Reveals on Hover) */}
        <div className="absolute inset-x-3 bottom-3 z-10 transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hidden sm:block">
          <div className="p-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="text-[9px] uppercase tracking-[0.2em] font-black text-white/60 text-center mb-1.5">
              Quick Add Size
            </div>
            <div className="flex items-center justify-center gap-1">
              {product.sizes.map((sz) => {
                const stock = product.stockCount[sz] ?? 10;
                const isOut = stock === 0;
                return (
                  <button
                    key={sz}
                    disabled={isOut}
                    onClick={(e) => handleQuickAdd(sz, e)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded transition-all ${
                      isOut
                        ? "opacity-25 cursor-not-allowed line-through text-white/40"
                        : "bg-white/10 text-white hover:bg-[var(--accent-primary)] hover:text-white border border-white/10"
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Success Added Feedback Overlay */}
        {justAdded && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center text-white font-black text-xs uppercase tracking-widest gap-2 z-20 animate-fade-in">
            <Check className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Added To Cart</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-2.5">
        <div>
          {/* Punchy All-Caps Tagline */}
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--accent-primary)] font-bold">
            {product.tagline || "ENGINEERED STREETWEAR"}
          </div>

          {/* Product Title (Short, Bold) */}
          <Link
            href={`/product/${product.slug}`}
            className="block mt-1 font-black text-sm sm:text-base uppercase tracking-tight text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
          >
            {product.name}
          </Link>

          {/* Fabric & Fit spec */}
          <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1 mt-0.5 font-medium">
            {product.fabric}
          </p>
        </div>

        {/* Price & Mobile Add */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-black text-sm sm:text-base text-[var(--text-primary)]">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[var(--text-muted)] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="sm:hidden p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
            aria-label="View product"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

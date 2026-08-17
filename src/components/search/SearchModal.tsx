"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles, Tag, TrendingUp } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRENDING_TAGS = [
  "Parker 400 GSM Hoodie",
  "Porsche 911 T-Shirt",
  "Spider White Hoodie",
  "Batman Regular Fit",
  "Different Black Hoodie",
  "Heavyweight French Terry",
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts: Product[] = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.fit.toLowerCase().includes(q) ||
          p.designStory.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[var(--bg-surface)] rounded-2xl shadow-2xl border border-[var(--border-subtle)] overflow-hidden z-10 transition-all">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center gap-3">
          <Search className="w-5 h-5 text-[var(--accent-terra)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search original drops, GSM weight, silhouettes, fabrics..."
            className="w-full bg-transparent text-sm sm:text-base text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block text-[10px] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] px-2 py-0.5 rounded font-mono text-[var(--text-muted)]">
              ESC
            </kbd>
          )}
        </div>

        {/* Search Results / Trending Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === "" ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-[var(--accent-terra)]" />
                  <span>Trending Artifacts & Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-terra)] transition-colors flex items-center gap-1.5"
                    >
                      <Tag className="w-3 h-3 text-[var(--accent-terra)]" />
                      <span>{tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Featured Drops preview */}
              <div className="pt-3 border-t border-[var(--border-subtle)]">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                  Featured Drops
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PRODUCTS.slice(0, 2).map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/product/${prod.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all group"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-14 object-cover rounded-lg shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--accent-terra)] transition-colors">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)]">
                          {prod.fabric}
                        </div>
                        <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">
                          {formatPrice(prod.price)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-10 text-center">
              <Sparkles className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                No original silhouettes found for "{query}"
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Try searching for "280 GSM", "Mockneck", "Acid Wash", or "Boxy".
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Found {filteredProducts.length} Matching Artifacts
              </div>
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-terra)] transition-all group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-16 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--accent-terra)] border border-[var(--border-subtle)]">
                          {product.gsm} GSM
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] truncate">
                          {product.fit}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] truncate mt-1 group-hover:text-[var(--accent-terra)] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[var(--text-muted)] truncate">
                        {product.fabric}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <div className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                      {formatPrice(product.price)}
                    </div>
                    {product.compareAtPrice && (
                      <div className="text-[10px] text-[var(--text-muted)] line-through">
                        {formatPrice(product.compareAtPrice)}
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--accent-terra)] mt-1 group-hover:translate-x-1 transition-transform">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
          <span>Press ESC to close</span>
          <Link
            href="/shop"
            onClick={onClose}
            className="text-[var(--accent-terra)] font-semibold hover:underline"
          >
            Browse All Drops →
          </Link>
        </div>
      </div>
    </div>
  );
}

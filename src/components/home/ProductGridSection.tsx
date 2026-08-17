"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Flame } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function ProductGridSection() {
  const [activeTab, setActiveTab] = useState<"all" | "new" | "bestseller" | "heavyweight">("all");

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeTab === "new") return product.isNewDrop;
    if (activeTab === "bestseller") return product.isBestseller;
    if (activeTab === "heavyweight") return product.gsm >= 280;
    return true;
  });

  return (
    <section className="py-20 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--accent-terra)] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Original Design Roster</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--text-primary)]">
              Latest Streetwear Drops
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "all"
                  ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              All Drops ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "new"
                  ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              New Drops
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "bestseller"
                  ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Bestsellers
            </button>
            <button
              onClick={() => setActiveTab("heavyweight")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "heavyweight"
                  ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              280+ GSM Only
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 3} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-md group"
          >
            <span>Explore Complete Catalog</span>
            <ArrowRight className="w-4 h-4 text-[var(--accent-terra)] group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

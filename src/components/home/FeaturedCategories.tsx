"use client";

import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { CATEGORIES_CONFIG } from "@/data/products";

export default function FeaturedCategories() {
  return (
    <section className="py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--accent-terra)] mb-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Architectural Silhouettes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--text-primary)]">
              Curated Collections
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-terra)] transition-colors group"
          >
            <span>Explore All Drops</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_CONFIG.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="group relative h-96 rounded-2xl overflow-hidden bg-zinc-900 border border-[var(--border-subtle)] card-hover-elevate"
            >
              {/* Background Image with Zoom on Hover */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-all duration-700 opacity-80 group-hover:opacity-90"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Top Item Count Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="artifact-badge bg-black/60 text-white backdrop-blur-md border-white/20 text-[10px]">
                  {cat.itemCount}
                </span>
              </div>

              {/* Bottom Content Info */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 space-y-1.5 text-white">
                <h3 className="font-bold text-lg sm:text-xl uppercase tracking-wider group-hover:text-[var(--accent-primary)] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-normal">
                  {cat.description}
                </p>
                <div className="pt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] group-hover:translate-x-1 transition-transform">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

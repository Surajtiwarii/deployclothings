"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, X, Heart } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";
import { formatPrice } from "@/lib/utils";

const COMMUNITY_POSTS = [
  {
    id: "ugc-1",
    handle: "@varun.fits",
    city: "Mumbai, MH",
    image: "/Parker Hoodie.png",
    caption: "The Parker 400 GSM Street Hoodie in Maroon is hands down the best heavyweight hoodie in my rotation. Hood structure is unmatched.",
    taggedProduct: {
      name: "Parker Street Hoodie (400 GSM)",
      price: 1499,
      slug: "parker-hoodie",
      image: "/Parker Hoodie.png",
    },
  },
  {
    id: "ugc-2",
    handle: "@riya_street",
    city: "Bengaluru, KA",
    image: "/Spider White Hoodie.png",
    caption: "Spider White 380 GSM Hoodie. The dense brushed fleece and clean drop shoulders look so elevated.",
    taggedProduct: {
      name: "Spider White Hoodie (380 GSM)",
      price: 1399,
      slug: "spider-white-hoodie",
      image: "/Spider White Hoodie.png",
    },
  },
  {
    id: "ugc-3",
    handle: "@karan_studio",
    city: "New Delhi, DL",
    image: "/Porche 911 T-Shirt.png",
    caption: "Porsche 911 Graphic Tee in 280 GSM combed cotton. The motorsport graphics and stay-flat collar elevate everything.",
    taggedProduct: {
      name: "Porsche 911 T-Shirt (280 GSM)",
      price: 649,
      slug: "porsche-911-t-shirt",
      image: "/Porche 911 T-Shirt.png",
    },
  },
  {
    id: "ugc-4",
    handle: "@ananya.visuals",
    city: "Pune, MH",
    image: "/Different Black Hoodie.png",
    caption: "The 'Different' Black Hoodie in 380 GSM French terry. Incredible textured combed cotton handfeel.",
    taggedProduct: {
      name: "Different Black Hoodie (380 GSM)",
      price: 1299,
      slug: "different-black-hoodie",
      image: "/Different Black Hoodie.png",
    },
  },
];

export default function CommunityUGC() {
  const [selectedPost, setSelectedPost] = useState<(typeof COMMUNITY_POSTS)[0] | null>(null);

  return (
    <section className="py-20 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--accent-terra)] mb-1.5">
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Community Styled</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--text-primary)]">
              #DEPLOYInTheWild
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-terra)] transition-colors group"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Tag @deployclothing to get featured</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 4-Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {COMMUNITY_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 cursor-pointer border border-[var(--border-subtle)] card-hover-elevate"
            >
              <img
                src={post.image}
                alt={post.handle}
                className="w-full h-full object-cover group-hover:scale-108 transition-all duration-500"
              />

              {/* Hover Overlay with Instagram Tag */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{post.handle}</span>
                  <InstagramIcon className="w-4 h-4 text-[var(--accent-primary)]" />
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-primary)]">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop This Look</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UGC Modal Preview */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setSelectedPost(null)}
          />

          <div className="relative w-full max-w-3xl bg-[var(--bg-surface)] rounded-2xl shadow-2xl border border-[var(--border-subtle)] overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12">
            {/* Image Column */}
            <div className="md:col-span-6 bg-zinc-950 relative aspect-square md:aspect-auto">
              <img
                src={selectedPost.image}
                alt={selectedPost.handle}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Column */}
            <div className="md:col-span-6 p-6 flex flex-col justify-between space-y-6 text-[var(--text-primary)]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center font-bold text-xs">
                      {selectedPost.handle.slice(1, 3).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{selectedPost.handle}</h4>
                      <p className="text-[11px] text-[var(--text-muted)]">{selectedPost.city}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-4">
                  "{selectedPost.caption}"
                </p>
              </div>

              {/* Tagged Product Box */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] mb-2">
                  Tagged Silhouette
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={selectedPost.taggedProduct.image}
                      alt={selectedPost.taggedProduct.name}
                      className="w-12 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-[var(--text-primary)] truncate">
                        {selectedPost.taggedProduct.name}
                      </div>
                      <div className="text-xs font-semibold text-[var(--accent-terra)] mt-0.5">
                        {formatPrice(selectedPost.taggedProduct.price)}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/product/${selectedPost.taggedProduct.slug}`}
                    onClick={() => setSelectedPost(null)}
                    className="px-3.5 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold hover:opacity-90 transition-all shrink-0 flex items-center gap-1.5"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

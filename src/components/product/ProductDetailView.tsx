"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Ruler,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Truck,
  Check,
  Flame,
  ChevronDown,
  ArrowRight,
  Share2,
} from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useUserStore } from "@/lib/store/userStore";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import ProductGallery from "@/components/product/ProductGallery";
import SizeChartModal from "@/components/product/SizeChartModal";
import SmartSizeAdvisorModal from "@/components/product/SmartSizeAdvisorModal";
import PincodeChecker from "@/components/product/PincodeChecker";
import CustomerReviews from "@/components/product/CustomerReviews";
import ProductCard from "@/components/product/ProductCard";

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [smartSizeOpen, setSmartSizeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "fabric" | "shipping">("description");
  const [copiedLink, setCopiedLink] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const addRecentlyViewed = useUserStore((state) => state.addRecentlyViewed);
  const isWishlisted = isInWishlist(product.id);

  useEffect(() => {
    addRecentlyViewed(product);
  }, [product, addRecentlyViewed]);

  const activeStock = product.stockCount[selectedSize] ?? 10;
  const isLowStock = activeStock > 0 && activeStock <= 3;
  const isOutOfStock = activeStock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addItem(product, selectedSize, selectedColor, quantity);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen py-10 bg-[var(--bg-primary)] pb-28 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] uppercase tracking-wider font-mono">
          <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[var(--text-primary)]">Shop</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="hover:text-[var(--text-primary)]">
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Multi-Image Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Buying Stage */}
          <div className="lg:col-span-5 space-y-6 text-[var(--text-primary)]">
            {/* Top Badges & Share */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black text-white border border-white/10 font-mono text-[10px] font-bold tracking-widest">
                  {product.gsm} GSM HEAVYWEIGHT
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-[var(--text-secondary)] border border-white/10 text-[10px] uppercase font-bold tracking-wider">
                  {product.fit}
                </span>
              </div>
              <button
                onClick={handleShare}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors font-mono"
                title="Share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? "Copied!" : "Share"}</span>
              </button>
            </div>

            {/* Headline & Punchy Tagline */}
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--accent-primary)] font-bold mb-1">
                {product.tagline || "ABSOLUTE. DARK. UNRIVALLED."}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-primary)]">
                {product.name}
              </h1>
            </div>

            {/* Pricing Strip */}
            <div className="flex items-baseline gap-3 py-3 border-y border-[var(--border-subtle)]">
              <span className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-sm text-[var(--text-muted)] line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-800">
                    SAVE {discountPercent}%
                  </span>
                </>
              )}
              <span className="text-[11px] text-[var(--text-muted)] ml-auto font-mono">
                Taxes included
              </span>
            </div>

            {/* Design Origin Narrative */}
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono font-bold tracking-widest text-[var(--accent-primary)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Original Design Artifact</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {product.designStory}
              </p>
            </div>

            {/* Color Selector */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-2 font-mono">
                Color: <strong className="text-[var(--text-primary)]">{selectedColor}</strong>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                      selectedColor === c.name
                        ? "bg-[var(--bg-secondary)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20"
                        : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector + Modal Triggers */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2 font-mono">
                <span>Select Size</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSmartSizeOpen(true)}
                    className="text-[11px] text-[var(--accent-primary)] font-bold hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Find My Fit</span>
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setSizeChartOpen(true)}
                    className="text-[11px] text-[var(--text-secondary)] font-semibold hover:text-[var(--text-primary)] flex items-center gap-1"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Guide</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => {
                  const stock = product.stockCount[sz] ?? 10;
                  const isOut = stock === 0;
                  return (
                    <button
                      key={sz}
                      disabled={isOut}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3 text-xs font-black rounded-xl border transition-all ${
                        isOut
                          ? "opacity-25 cursor-not-allowed line-through bg-[var(--bg-secondary)] border-[var(--border-subtle)]"
                          : selectedSize === sz
                          ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] shadow-lg scale-95"
                          : "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              {/* Stock Indicator */}
              <div className="mt-2.5 text-xs">
                {isOutOfStock ? (
                  <span className="text-rose-500 font-bold">Sold Out in Size {selectedSize}</span>
                ) : isLowStock ? (
                  <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold">
                    <Flame className="w-3.5 h-3.5 animate-pulse" />
                    Only {activeStock} left in Size {selectedSize}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    In Stock • Dispatches in 24 hours
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider font-mono">Quantity:</span>
              <div className="flex items-center rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm font-bold text-[var(--text-secondary)] hover:text-white"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-bold font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="px-3 py-1.5 text-sm font-bold text-[var(--text-secondary)] hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Primary Add to Cart & Buy Now Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 py-4 px-6 rounded-2xl bg-[#f5f5f0] text-black font-black text-xs uppercase tracking-[0.16em] hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-2xl disabled:opacity-40"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isOutOfStock ? "Sold Out" : "Add to Cart"}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Wishlist"
                  className={`p-4 rounded-2xl border transition-all ${
                    isWishlisted
                      ? "bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]"
                      : "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-white" : ""}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-4 px-6 rounded-2xl bg-[var(--accent-primary)] text-white font-black text-xs uppercase tracking-[0.16em] hover:bg-[var(--accent-primary-hover)] transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <span>Instant Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Delivery Pincode Checker */}
            <PincodeChecker />

            {/* Expandable Tabs: Description, Fabric & Care, Shipping & Returns */}
            <div className="border-t border-[var(--border-subtle)] pt-6 space-y-4">
              <div className="flex border-b border-[var(--border-subtle)]">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all relative ${
                    activeTab === "description"
                      ? "text-[var(--text-primary)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("fabric")}
                  className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all relative ${
                    activeTab === "fabric"
                      ? "text-[var(--text-primary)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  Fabric & Care
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all relative ${
                    activeTab === "shipping"
                      ? "text-[var(--text-primary)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  Shipping & Returns
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-relaxed">
                {activeTab === "description" && (
                  <div className="space-y-2">
                    <p className="text-[var(--text-primary)] font-medium">{product.designStory}</p>
                    <ul className="list-disc pl-5 space-y-1 pt-2">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "fabric" && (
                  <div className="space-y-2">
                    <p className="font-bold text-[var(--text-primary)]">{product.fabric}</p>
                    <p>{product.originNote}</p>
                    <div className="pt-2 font-mono text-[11px] text-[var(--text-muted)]">
                      Care: Machine wash cold inside out • Hang dry in shade • Warm iron on reverse
                    </div>
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className="space-y-2">
                    <p className="font-bold text-[var(--text-primary)]">Free Express Delivery on ₹1,999+</p>
                    <p>Standard delivery in 2–4 business days via Bluedart / Delhivery Air.</p>
                    <p className="text-[var(--accent-primary)] font-semibold pt-1">
                      15-day hassle-free doorstep size exchanges and COD available across all Indian pincodes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <CustomerReviews
          reviews={product.reviews}
          rating={product.rating}
          reviewCount={product.reviewCount}
          productName={product.name}
        />

        {/* "You May Also Like" Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-8 pt-6 border-t border-[var(--border-subtle)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[var(--text-primary)]">
                  You May Also Like
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Complementary original heavyweight artifacts
                </p>
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)] hover:underline"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom "Add to Cart" Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-black/90 backdrop-blur-md border-t border-[var(--border-subtle)] flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-mono">
            {selectedSize} • {selectedColor}
          </div>
          <div className="font-black text-sm text-[var(--text-primary)]">
            {formatPrice(product.price)}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex-1 py-3 px-4 rounded-xl bg-[var(--accent-primary)] text-white font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-40"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{isOutOfStock ? "Sold Out" : "Add to Cart"}</span>
        </button>
      </div>

      {/* Modals */}
      <SizeChartModal
        isOpen={sizeChartOpen}
        onClose={() => setSizeChartOpen(false)}
        sizeChart={product.sizeChart}
        fitType={product.fit}
      />

      <SmartSizeAdvisorModal
        isOpen={smartSizeOpen}
        onClose={() => setSmartSizeOpen(false)}
        onSelectSize={(sz) => setSelectedSize(sz)}
        productName={product.name}
      />
    </div>
  );
}

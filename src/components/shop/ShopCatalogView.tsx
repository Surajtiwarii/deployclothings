"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  X,
  SlidersHorizontal,
  LayoutGrid,
  Grid3X3,
  ChevronDown,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Product, ProductCategory } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/utils";

type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

interface ShopCatalogViewProps {
  initialProducts: Product[];
  categoryFilter?: ProductCategory;
  categoryTitle?: string;
  categoryDescription?: string;
}

const ALL_SIZES = ["S", "M", "L", "XL", "XXL"];
const ALL_FITS = [
  "Classic Regular Fit",
  "Structured Boxy Fit",
  "Boxy Drop-Shoulder Fit",
  "Oversized Streetwear Fit",
  "Oversized Drop-Shoulder",
];
const ALL_GSM = [240, 280, 380, 400];
const ALL_COLORS = [
  { name: "Black", hex: "#0c0c0e" },
  { name: "White", hex: "#f8f8f6" },
  { name: "Maroon", hex: "#631d27" },
  { name: "Charcoal", hex: "#2a2a2e" },
  { name: "Slate", hex: "#24252a" },
];

export default function ShopCatalogView({
  initialProducts,
  categoryFilter,
  categoryTitle,
  categoryDescription,
}: ShopCatalogViewProps) {
  // Filter States
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [selectedGsm, setSelectedGsm] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(4500);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  
  // UI states
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category check
      if (categoryFilter && product.category !== categoryFilter) return false;

      // Size check
      if (
        selectedSizes.length > 0 &&
        !product.sizes.some((sz) => selectedSizes.includes(sz))
      ) {
        return false;
      }

      // Fit check
      if (selectedFits.length > 0 && !selectedFits.includes(product.fit)) {
        return false;
      }

      // GSM check
      if (selectedGsm.length > 0 && !selectedGsm.includes(product.gsm)) {
        return false;
      }

      // Color check
      if (
        selectedColors.length > 0 &&
        !product.colors.some((c) =>
          selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase()))
        )
      ) {
        return false;
      }

      // Price check
      if (product.price > maxPrice) return false;

      // In stock check
      if (onlyInStock && !product.inStock) return false;

      return true;
    });
  }, [
    initialProducts,
    categoryFilter,
    selectedSizes,
    selectedFits,
    selectedGsm,
    selectedColors,
    maxPrice,
    onlyInStock,
  ]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") list.sort((a, b) => (b.isNewDrop ? 1 : 0) - (a.isNewDrop ? 1 : 0));
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [filteredProducts, sortBy]);

  const activeFilterCount =
    selectedSizes.length +
    selectedFits.length +
    selectedGsm.length +
    selectedColors.length +
    (onlyInStock ? 1 : 0) +
    (maxPrice < 4500 ? 1 : 0);

  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedFits([]);
    setSelectedGsm([]);
    setSelectedColors([]);
    setMaxPrice(4500);
    setOnlyInStock(false);
  };

  const toggleSize = (sz: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]
    );
  };

  const toggleFit = (fit: string) => {
    setSelectedFits((prev) =>
      prev.includes(fit) ? prev.filter((f) => f !== fit) : [...prev, fit]
    );
  };

  const toggleGsm = (gsm: number) => {
    setSelectedGsm((prev) =>
      prev.includes(gsm) ? prev.filter((g) => g !== gsm) : [...prev, gsm]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  return (
    <div className="min-h-screen py-10 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
            <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[var(--text-primary)]">Shop</Link>
            {categoryTitle && (
              <>
                <span>/</span>
                <span className="text-[var(--text-primary)] font-medium">{categoryTitle}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-primary)]">
            {categoryTitle || "All Original Drops"}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            {categoryDescription ||
              "Explore our complete catalog of heavyweight 260–320 GSM streetwear t-shirt silhouettes, combed cotton boxy tees, mineral acid patinas, and structured mocknecks."}
          </p>
        </div>

        {/* Toolbar: Filters toggle, Count, Grid density, Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] mb-8">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--accent-terra)]" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            <span className="text-xs font-semibold text-[var(--text-secondary)]">
              Showing <strong className="text-[var(--text-primary)]">{sortedProducts.length}</strong> Artifacts
            </span>
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center gap-4">
            {/* Grid Density Switcher (Desktop) */}
            <div className="hidden md:flex items-center gap-1 bg-[var(--bg-secondary)] p-1 rounded-xl border border-[var(--border-subtle)]">
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridCols === 2 ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs" : "text-[var(--text-muted)]"
                }`}
                title="2 Columns"
                aria-label="2 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridCols === 3 ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs" : "text-[var(--text-muted)]"
                }`}
                title="3 Columns"
                aria-label="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none px-4 py-2 pr-9 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-terra)] cursor-pointer"
              >
                <option value="featured">Featured Drops</option>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-[var(--text-muted)] font-medium mr-1">
              Active Filters:
            </span>
            {selectedSizes.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)]"
              >
                Size: {s}
                <button onClick={() => toggleSize(s)} className="text-[var(--text-muted)] hover:text-rose-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedFits.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)]"
              >
                {f}
                <button onClick={() => toggleFit(f)} className="text-[var(--text-muted)] hover:text-rose-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedGsm.map((g) => (
              <span
                key={g}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)]"
              >
                {g} GSM
                <button onClick={() => toggleGsm(g)} className="text-[var(--text-muted)] hover:text-rose-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedColors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)]"
              >
                Color: {c}
                <button onClick={() => toggleColor(c)} className="text-[var(--text-muted)] hover:text-rose-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-[var(--accent-terra)] hover:underline ml-2"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Main Content Layout (Sidebar + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--text-primary)]">
                  Filter Artifacts
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[var(--accent-terra)] font-semibold hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Size Selector */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                  Size
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {ALL_SIZES.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        selectedSizes.includes(sz)
                          ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] shadow-xs"
                          : "bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* GSM Density */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                  Fabric Weight (GSM)
                </h4>
                <div className="space-y-2">
                  {ALL_GSM.map((gsm) => (
                    <label
                      key={gsm}
                      className="flex items-center gap-2.5 text-xs text-[var(--text-primary)] cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedGsm.includes(gsm)}
                        onChange={() => toggleGsm(gsm)}
                        className="rounded border-[var(--border-strong)] text-[var(--accent-terra)] focus:ring-[var(--accent-terra)] w-4 h-4"
                      />
                      <span>{gsm} GSM {gsm >= 300 ? "• Heavyweight" : ""}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fit Silhouette */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                  Fit Silhouette
                </h4>
                <div className="space-y-2">
                  {ALL_FITS.map((fit) => (
                    <label
                      key={fit}
                      className="flex items-center gap-2.5 text-xs text-[var(--text-primary)] cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFits.includes(fit)}
                        onChange={() => toggleFit(fit)}
                        className="rounded border-[var(--border-strong)] text-[var(--accent-terra)] focus:ring-[var(--accent-terra)] w-4 h-4"
                      />
                      <span>{fit}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                  Colorway
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ALL_COLORS.map((col) => {
                    const isSelected = selectedColors.includes(col.name);
                    return (
                      <button
                        key={col.name}
                        onClick={() => toggleColor(col.name)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]"
                            : "bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white/20"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[var(--text-secondary)] mb-2">
                  <span>Max Price</span>
                  <span className="text-[var(--text-primary)]">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="1400"
                  max="4500"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[var(--accent-terra)] cursor-pointer"
                />
              </div>

              {/* In Stock Toggle */}
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <label className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] cursor-pointer">
                  <span>In-Stock Only</span>
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="rounded border-[var(--border-strong)] text-[var(--accent-terra)] focus:ring-[var(--accent-terra)] w-4 h-4"
                  />
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {sortedProducts.length === 0 ? (
              <div className="py-24 text-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8">
                <Sparkles className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
                <h3 className="text-base font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  No silhouettes match your current filters
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 max-w-sm mx-auto">
                  Try widening your price range or clearing selected GSM weights and sizes.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  gridCols === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-[var(--bg-surface)] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-[var(--text-primary)]">
                    Filters
                  </h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 rounded-full text-[var(--text-muted)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                    Size
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {ALL_SIZES.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => toggleSize(sz)}
                        className={`py-2 text-xs font-bold rounded-lg border ${
                          selectedSizes.includes(sz)
                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]"
                            : "bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border-subtle)]"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* GSM */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                    Fabric GSM
                  </h4>
                  <div className="space-y-2">
                    {ALL_GSM.map((gsm) => (
                      <label key={gsm} className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                        <input
                          type="checkbox"
                          checked={selectedGsm.includes(gsm)}
                          onChange={() => toggleGsm(gsm)}
                          className="rounded text-[var(--accent-terra)]"
                        />
                        <span>{gsm} GSM</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Colors */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                    Colorway
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ALL_COLORS.map((col) => {
                      const isSelected = selectedColors.includes(col.name);
                      return (
                        <button
                          key={col.name}
                          onClick={() => toggleColor(col.name)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium ${
                            isSelected
                              ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]"
                              : "bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border-subtle)]"
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-white/20"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span>{col.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Apply / Close Button */}
              <div className="pt-6 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-widest"
                >
                  Apply Filters ({sortedProducts.length} items)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

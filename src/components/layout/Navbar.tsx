"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useUserStore } from "@/lib/store/userStore";

interface NavbarProps {
  onOpenSearch: () => void;
}

const CATEGORY_ITEMS = [
  { name: "Hoodies", href: "/category/hoodies" },
  { name: "Graphic Tees", href: "/category/graphic-tees" },
  { name: "Oversized", href: "/category/oversized-fits" },
  { name: "Heavyweight", href: "/category/heavyweight-tees" },
];

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(true);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cartItemCount = useCartStore((state) => state.getItemCount());
  const openCart = useCartStore((state) => state.openCart);
  const wishlistCount = useWishlistStore((state) => state.getCount());
  const { theme, setTheme } = useUserStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDesktopDropdownOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDesktopDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDesktopDropdownOpen(false);
    }, 150);
  };

  const isDark = mounted ? theme === "dark" : true;
  const isCategoryActive = pathname.startsWith("/category/");

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 ${
          isDark
            ? isScrolled
              ? "bg-[#09090c]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-md text-white"
              : "bg-[#09090c] border-b border-white/[0.06] text-white"
            : isScrolled
              ? "bg-white/95 backdrop-blur-xl border-b border-zinc-200/90 shadow-sm text-zinc-900"
              : "bg-[#fbfbf9] border-b border-zinc-200 text-zinc-900"
        } ${isScrolled ? "py-2" : "py-2.5 sm:py-3"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* 1. Left Side: Menu Items (Desktop) & Mobile Drawer Toggle */}
          <div className="flex items-center gap-3 flex-1 justify-start">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className={`p-1.5 rounded-md border lg:hidden transition-colors ${
                isDark
                  ? "bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-white"
                  : "bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800"
              }`}
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Desktop Navigation Menu Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {/* Home */}
              <Link
                href="/"
                className={`text-xs sm:text-[13px] font-semibold transition-all duration-150 relative py-1 ${
                  pathname === "/"
                    ? isDark
                      ? "text-white font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]"
                      : "text-black font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]"
                    : isDark
                      ? "text-zinc-300 hover:text-white"
                      : "text-zinc-600 hover:text-black"
                }`}
              >
                Home
              </Link>

              {/* Shop */}
              <Link
                href="/shop"
                className={`text-xs sm:text-[13px] font-semibold transition-all duration-150 relative py-1 ${
                  pathname === "/shop"
                    ? isDark
                      ? "text-white font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]"
                      : "text-black font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]"
                    : isDark
                      ? "text-zinc-300 hover:text-white"
                      : "text-zinc-600 hover:text-black"
                }`}
              >
                Shop
              </Link>

              {/* Categories Dropdown Menu Item */}
              <div
                className="relative py-1"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={() => setDesktopDropdownOpen((prev) => !prev)}
                  className={`text-xs sm:text-[13px] font-semibold transition-all duration-150 flex items-center gap-1.5 relative cursor-pointer ${
                    isCategoryActive
                      ? isDark
                        ? "text-white font-bold after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]"
                        : "text-black font-bold after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]"
                      : isDark
                        ? "text-zinc-300 hover:text-white"
                        : "text-zinc-600 hover:text-black"
                  }`}
                  aria-expanded={desktopDropdownOpen}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      desktopDropdownOpen ? "rotate-180 text-[var(--accent-primary)]" : "opacity-70"
                    }`}
                  />
                </button>

                {/* Dropdown Flyout Panel */}
                {desktopDropdownOpen && (
                  <div
                    className="absolute left-0 top-full pt-2.5 w-64 sm:w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    <div
                      className={`p-2 sm:p-2.5 rounded-2xl shadow-2xl border backdrop-blur-2xl transition-all ${
                        isDark
                          ? "bg-[#111116]/95 border-white/10 text-white shadow-black/80"
                          : "bg-white/95 border-zinc-200 text-zinc-900 shadow-xl"
                      }`}
                    >
                      <div className="space-y-1">
                        {CATEGORY_ITEMS.map((item) => {
                          const isCurrent = pathname === item.href;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setDesktopDropdownOpen(false)}
                              className={`flex items-center justify-between px-4 py-2.5 sm:py-3 rounded-xl text-[13px] sm:text-sm font-medium transition-all ${
                                isCurrent
                                  ? isDark
                                    ? "bg-white/10 text-white font-bold"
                                    : "bg-zinc-100 text-black font-bold"
                                  : isDark
                                    ? "hover:bg-white/[0.08] text-zinc-200 hover:text-white"
                                    : "hover:bg-zinc-100 text-zinc-800 hover:text-black"
                              }`}
                            >
                              <span>{item.name}</span>
                              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 transition-all" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* About */}
              <Link
                href="/about"
                className={`text-xs sm:text-[13px] font-semibold transition-all duration-150 relative py-1 ${
                  pathname === "/about"
                    ? isDark
                      ? "text-white font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]"
                      : "text-black font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]"
                    : isDark
                      ? "text-zinc-300 hover:text-white"
                      : "text-zinc-600 hover:text-black"
                }`}
              >
                About
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={`text-xs sm:text-[13px] font-semibold transition-all duration-150 relative py-1 ${
                  pathname === "/contact"
                    ? isDark
                      ? "text-white font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]"
                      : "text-black font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]"
                    : isDark
                      ? "text-zinc-300 hover:text-white"
                      : "text-zinc-600 hover:text-black"
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* 2. Center: Brand Logo (Centered) */}
          <div className="flex items-center justify-center shrink-0">
            <Link
              href="/"
              className="flex items-center justify-center select-none"
            >
              <span
                className={`font-brand-logo font-bold text-2xl sm:text-[26px] md:text-3xl leading-none ${
                  isDark ? "text-white" : "text-zinc-950"
                }`}
              >
                Deploy
              </span>
            </Link>
          </div>

          {/* 3. Right Side: Action Icons */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 flex-1">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
                isDark
                  ? "bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-zinc-300 hover:text-white"
                  : "bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-700 hover:text-black"
              }`}
              title="Search drops (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
                isDark
                  ? "bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-zinc-300 hover:text-white"
                  : "bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-700 hover:text-black"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-zinc-800" />
              )}
            </button>

            {/* Wishlist */}
            <Link
              href="/account#wishlist"
              aria-label="Wishlist"
              className={`relative w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
                isDark
                  ? "bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-zinc-300 hover:text-white"
                  : "bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-700 hover:text-black"
              }`}
              title="Wishlist"
            >
              <Heart className="w-3.5 h-3.5" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[var(--accent-primary)] text-white text-[8px] font-bold flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              aria-label="Account"
              className={`w-8 h-8 rounded-lg border hidden sm:flex items-center justify-center transition-colors ${
                isDark
                  ? "bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-zinc-300 hover:text-white"
                  : "bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-700 hover:text-black"
              }`}
              title="Account"
            >
              <User className="w-3.5 h-3.5" />
            </Link>

            {/* Cart Button */}
            <button
              onClick={openCart}
              aria-label="Open cart"
              className={`flex items-center gap-1.5 h-8 px-3 rounded-lg font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xs ml-0.5 group cursor-pointer ${
                isDark
                  ? "bg-white text-black hover:bg-[var(--accent-primary)] hover:text-white"
                  : "bg-zinc-900 text-white hover:bg-[var(--accent-primary)]"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[var(--accent-primary)] group-hover:text-white transition-colors" />
              <span>Cart</span>
              {mounted && (
                <span
                  className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold transition-colors ${
                    isDark
                      ? "bg-black text-white group-hover:bg-white group-hover:text-black"
                      : "bg-zinc-800 text-white group-hover:bg-white group-hover:text-black"
                  }`}
                >
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            className={`fixed inset-y-0 left-0 w-[85%] max-w-xs p-5 shadow-2xl flex flex-col justify-between overflow-y-auto border-r transition-colors ${
              isDark
                ? "bg-[#0c0c10] text-white border-white/10"
                : "bg-white text-zinc-900 border-zinc-200"
            }`}
          >
            <div>
              <div
                className={`flex items-center justify-between pb-4 border-b ${
                  isDark ? "border-white/10" : "border-zinc-200"
                }`}
              >
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-brand-logo font-bold text-xl ${
                    isDark ? "text-white" : "text-zinc-950"
                  }`}
                >
                  Deploy
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDark
                      ? "bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white"
                      : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-black"
                  }`}
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="mt-5 space-y-1">
                {/* Home */}
                <Link
                  href="/"
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === "/"
                      ? isDark
                        ? "bg-white/10 text-white font-bold"
                        : "bg-zinc-100 text-black font-bold"
                      : isDark
                        ? "text-zinc-200 hover:bg-white/10 hover:text-white"
                        : "text-zinc-800 hover:bg-zinc-100 hover:text-black"
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 ${
                      isDark ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  />
                </Link>

                {/* Shop */}
                <Link
                  href="/shop"
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === "/shop"
                      ? isDark
                        ? "bg-white/10 text-white font-bold"
                        : "bg-zinc-100 text-black font-bold"
                      : isDark
                        ? "text-zinc-200 hover:bg-white/10 hover:text-white"
                        : "text-zinc-800 hover:bg-zinc-100 hover:text-black"
                  }`}
                >
                  <span>Shop All</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 ${
                      isDark ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  />
                </Link>

                {/* Categories Accordion */}
                <div className="pt-1">
                  <button
                    onClick={() => setMobileCategoriesOpen((prev) => !prev)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                      isCategoryActive
                        ? isDark
                          ? "bg-white/10 text-white"
                          : "bg-zinc-100 text-black"
                        : isDark
                          ? "text-zinc-200 hover:bg-white/10 hover:text-white"
                          : "text-zinc-800 hover:bg-zinc-100 hover:text-black"
                    }`}
                  >
                    <span>Categories</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        mobileCategoriesOpen ? "rotate-180 text-[var(--accent-primary)]" : "text-zinc-500"
                      }`}
                    />
                  </button>

                  {mobileCategoriesOpen && (
                    <div
                      className={`ml-3 pl-3 my-1.5 space-y-1 border-l ${
                        isDark ? "border-white/10" : "border-zinc-200"
                      }`}
                    >
                      {CATEGORY_ITEMS.map((item) => {
                        const isCurrent = pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-colors ${
                              isCurrent
                                ? isDark
                                  ? "text-[var(--accent-primary)] font-bold bg-white/[0.08]"
                                  : "text-[var(--accent-primary)] font-bold bg-zinc-100"
                                : isDark
                                  ? "text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                                  : "text-zinc-700 hover:text-black hover:bg-zinc-100"
                            }`}
                          >
                            <span>{item.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* About */}
                <Link
                  href="/about"
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === "/about"
                      ? isDark
                        ? "bg-white/10 text-white font-bold"
                        : "bg-zinc-100 text-black font-bold"
                      : isDark
                        ? "text-zinc-200 hover:bg-white/10 hover:text-white"
                        : "text-zinc-800 hover:bg-zinc-100 hover:text-black"
                  }`}
                >
                  <span>About</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 ${
                      isDark ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  />
                </Link>

                {/* Contact */}
                <Link
                  href="/contact"
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === "/contact"
                      ? isDark
                        ? "bg-white/10 text-white font-bold"
                        : "bg-zinc-100 text-black font-bold"
                      : isDark
                        ? "text-zinc-200 hover:bg-white/10 hover:text-white"
                        : "text-zinc-800 hover:bg-zinc-100 hover:text-black"
                  }`}
                >
                  <span>Contact</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 ${
                      isDark ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  />
                </Link>
              </div>

              {/* Quick Links */}
              <div
                className={`mt-6 pt-4 border-t space-y-1 ${
                  isDark ? "border-white/10" : "border-zinc-200"
                }`}
              >
                <Link
                  href="/shop"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isDark
                      ? "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                      : "text-zinc-600 hover:text-black hover:bg-zinc-100"
                  }`}
                >
                  <span>Shop All Drops</span>
                  <ArrowRight
                    className={`w-3 h-3 ${
                      isDark ? "text-zinc-600" : "text-zinc-400"
                    }`}
                  />
                </Link>
                <Link
                  href="/track-order"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isDark
                      ? "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                      : "text-zinc-600 hover:text-black hover:bg-zinc-100"
                  }`}
                >
                  <span>Track Live Order</span>
                  <ArrowRight
                    className={`w-3 h-3 ${
                      isDark ? "text-zinc-600" : "text-zinc-400"
                    }`}
                  />
                </Link>
              </div>
            </div>

            <div
              className={`pt-4 border-t text-[10px] font-mono ${
                isDark
                  ? "border-white/10 text-zinc-500"
                  : "border-zinc-200 text-zinc-500"
              }`}
            >
              100% Original Heavyweight Streetwear • Tirupur, India
            </div>
          </div>
        </div>
      )}
    </>
  );
}

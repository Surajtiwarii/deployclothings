"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, Address, Order, SizeRecommendationProfile } from "@/types";

interface UserState {
  recentlyViewed: Product[];
  savedAddresses: Address[];
  orders: Order[];
  sizeProfile: SizeRecommendationProfile | null;
  theme: "light" | "dark" | "system";

  // Actions
  addRecentlyViewed: (product: Product) => void;
  addAddress: (address: Address) => void;
  removeAddress: (index: number) => void;
  setDefaultAddress: (index: number) => void;
  addOrder: (order: Order) => void;
  setSizeProfile: (profile: SizeRecommendationProfile) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      recentlyViewed: [],
      savedAddresses: [
        {
          fullName: "Alex Varma",
          phone: "+91 98765 43210",
          email: "alex.varma@example.com",
          addressLine1: "Flat 402, Skyline Residency, 12th Main",
          addressLine2: "Indiranagar 100ft Road",
          landmark: "Near Metro Station",
          pincode: "560038",
          city: "Bengaluru",
          state: "Karnataka",
          isDefault: true,
        },
      ],
      orders: [
        {
          id: "ord-98214",
          orderNumber: "BR-2026-98214",
          createdAt: "2026-08-06T14:32:00Z",
          items: [
            {
              id: "prod-different-hoodie-L-Obsidian Black",
              productId: "prod-different-hoodie",
              slug: "different-black-hoodie",
              name: "Different Black Hoodie (380 GSM)",
              price: 1299,
              image: "/Different Black Hoodie.png",
              size: "L",
              color: "Obsidian Black",
              quantity: 1,
              fabric: "100% Heavyweight French Terry Cotton (380 GSM)",
              maxStock: 8,
            },
          ],
          shippingAddress: {
            fullName: "Alex Varma",
            phone: "+91 98765 43210",
            email: "alex.varma@example.com",
            addressLine1: "Flat 402, Skyline Residency, 12th Main",
            addressLine2: "Indiranagar",
            pincode: "560038",
            city: "Bengaluru",
            state: "Karnataka",
          },
          paymentMethod: "razorpay",
          paymentStatus: "paid",
          orderStatus: "shipped",
          trackingNumber: "BD-884920194IN",
          carrier: "Bluedart Express",
          subtotal: 1899,
          shippingFee: 0,
          discount: 0,
          total: 1899,
          estimatedDelivery: "12 Aug 2026",
        },
      ],
      sizeProfile: null,
      theme: "light",

      addRecentlyViewed: (product) => {
        const current = get().recentlyViewed.filter((item) => item.id !== product.id);
        set({ recentlyViewed: [product, ...current].slice(0, 8) });
      },

      addAddress: (address) => {
        const addresses = [...get().savedAddresses];
        if (address.isDefault) {
          addresses.forEach((a) => (a.isDefault = false));
        }
        set({ savedAddresses: [...addresses, address] });
      },

      removeAddress: (index) => {
        set((state) => ({
          savedAddresses: state.savedAddresses.filter((_, i) => i !== index),
        }));
      },

      setDefaultAddress: (index) => {
        set((state) => ({
          savedAddresses: state.savedAddresses.map((addr, i) => ({
            ...addr,
            isDefault: i === index,
          })),
        }));
      },

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      setSizeProfile: (profile) => {
        set({ sizeProfile: profile });
      },

      setTheme: (theme) => {
        set({ theme });
        if (typeof document !== "undefined") {
          const root = document.documentElement;
          if (theme === "dark") {
            root.classList.add("dark");
            root.setAttribute("data-theme", "dark");
          } else if (theme === "light") {
            root.classList.remove("dark");
            root.setAttribute("data-theme", "light");
          } else {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (isDark) {
              root.classList.add("dark");
              root.setAttribute("data-theme", "dark");
            } else {
              root.classList.remove("dark");
              root.setAttribute("data-theme", "light");
            }
          }
        }
      },
    }),
    {
      name: "deploy-user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

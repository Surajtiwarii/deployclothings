export type ProductCategory =
  | "heavyweight-tees"
  | "oversized-fits"
  | "hoodies"
  | "graphic-tees"
  | "acid-wash-vintage"
  | "mockneck-structural";

export interface ColorOption {
  name: string;
  hex: string;
  imageIndex?: number;
}

export interface SizeChartEntry {
  size: string;
  chestCm: number;
  chestInches: number;
  lengthCm: number;
  lengthInches: number;
  shoulderCm: number;
  shoulderInches: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  fitFeedback: "Runs True to Size" | "Runs Slightly Large" | "Perfect Oversized Fit";
  heightWeight?: string;
  userImage?: string;
  purchasedSize?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  categoryName: string;
  fit: string;
  fabric: string;
  gsm: number;
  designStory: string;
  originNote: string;
  details: string[];
  sizes: string[];
  colors: ColorOption[];
  images: string[];
  isNewDrop: boolean;
  isBestseller: boolean;
  inStock: boolean;
  stockCount: Record<string, number>;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  careInstructions: string[];
  sizeChart: SizeChartEntry[];
}

export interface CartItem {
  id: string; // Unique key = `${productId}-${size}-${color}`
  productId: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  fabric: string;
  maxStock: number;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount: number;
  description: string;
}

export interface Address {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  pincode: string;
  city: string;
  state: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: "razorpay" | "cod" | "stripe";
  paymentStatus: "paid" | "pending_cod" | "failed";
  orderStatus:
    | "confirmed"
    | "fabric_prep"
    | "quality_check"
    | "shipped"
    | "out_for_delivery"
    | "delivered";
  trackingNumber: string;
  carrier: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  couponCode?: string;
  estimatedDelivery: string;
}

export interface SizeRecommendationProfile {
  heightCm: number;
  weightKg: number;
  fitPreference: "regular" | "oversized" | "boxy";
  recommendedSize: string;
  confidenceScore: number;
}

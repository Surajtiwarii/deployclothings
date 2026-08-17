import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Indian Rupee currency with standard formatting (e.g. ₹1,999)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Calculate estimated delivery date from current time (e.g. "Thu, 14 Aug")
 */
export function getEstimatedDeliveryDate(daysToAdd: number = 4): string {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, length: number = 60): string {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
}

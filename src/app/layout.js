import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
import "./globals.css";
import AppWrapper from "@/components/layout/AppWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata = {
  title: "DEPLOY — Ready to Wear, Ready to Deploy | Heavyweight Streetwear",
  description:
    "DEPLOY: Original-design premium streetwear t-shirt studio. Ready to wear, ready to deploy. 280–380 GSM combed cotton silhouettes, zero licensing, structured boxy drapes, and sustainable Tirupur craftsmanship.",
  keywords: [
    "deploy clothing",
    "deploy streetwear",
    "ready to wear ready to deploy",
    "heavyweight tee",
    "280 gsm t-shirt",
    "300 gsm oversized tee",
    "streetwear india",
    "boxy t-shirt",
    "oversized tee",
    "original streetwear",
  ],
  manifest: "/manifest.json",
  themeColor: "#FBFBF9",
  openGraph: {
    title: "DEPLOY — Ready to Wear, Ready to Deploy",
    description:
      "Heavyweight 280–380 GSM combed cotton streetwear silhouettes engineered with minimal, warm luxury aesthetics.",
    url: "https://deployclothings.com",
    siteName: "DEPLOY",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}

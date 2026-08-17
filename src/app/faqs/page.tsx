"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

const FAQ_SECTIONS = [
  {
    category: "Fabric & Heavyweight GSM",
    items: [
      {
        q: "What does 280 GSM vs 380 GSM mean?",
        a: "GSM stands for Grams per Square Meter — it measures the weight and density of the fabric. Standard commercial T-shirts are flimsy 140–160 GSM. DEPLOY tees are 280–380 GSM, giving them an architectural, structured drape that doesn't cling to the body and maintains shape across dozens of wash cycles.",
      },
      {
        q: "Will the ribbed collar sag or 'bacon' over time?",
        a: "No. We engineer our collars with a 1.25-inch double-needle ribbed knit infused with a 5% high-recovery elastane core. This guarantees that your collar stays crisp and tight around the neck wash after wash.",
      },
    ],
  },
  {
    category: "Shipping, COD & Delivery",
    items: [
      {
        q: "How fast is express delivery in India?",
        a: "We ship all orders from our Tirupur fulfillment hub via Bluedart and Delhivery Express. Metro cities (Bengaluru, Mumbai, Delhi NCR, Chennai) typically receive delivery in 2–3 business days. Non-metros take 3–5 business days.",
      },
      {
        q: "Is Cash on Delivery (COD) available?",
        a: "Yes! Cash on Delivery is available across 19,000+ Indian pincodes with zero advance fee. You can pay via cash or scan the delivery agent's UPI QR code at your doorstep.",
      },
      {
        q: "What are the shipping charges?",
        a: "All orders above ₹1,999 receive FREE Express Courier Shipping. Orders below ₹1,999 carry a flat express courier fee of ₹149.",
      },
    ],
  },
  {
    category: "15-Day Returns & Exchanges",
    items: [
      {
        q: "What is your return & size exchange policy?",
        a: "We offer a 15-day hassle-free doorstep exchange policy. If the size or fit isn't right, you can request an exchange from your account dashboard and our courier partner will pick up the piece from your doorstep.",
      },
      {
        q: "How do I choose the right size for a boxy streetwear look?",
        a: "Our silhouettes are designed with an intended relaxed drop-shoulder fit. If you want the intended streetwear drape, choose your standard size. Use our interactive 'Find My Fit' tool on any product page for a tailored calculation based on your height and weight.",
      },
    ],
  },
];

export default function FaqsPage() {
  const [openItem, setOpenItem] = useState<string | null>("0-0");

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <div className="min-h-screen py-16 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="artifact-badge text-[10px]">DEPLOY Knowledgebase</span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
            Everything you need to know about our fabric craftsmanship, shipping speeds, and 15-day exchanges.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-8">
          {FAQ_SECTIONS.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--accent-terra)] px-1">
                {sec.category}
              </h3>
              <div className="space-y-2.5">
                {sec.items.map((item, iIdx) => {
                  const key = `${sIdx}-${iIdx}`;
                  const isOpen = openItem === key;
                  return (
                    <div
                      key={iIdx}
                      className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[var(--text-primary)] hover:text-[var(--accent-terra)] transition-colors gap-4"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[var(--accent-terra)]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]/50 pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

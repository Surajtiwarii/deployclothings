"use client";

import { useState } from "react";
import { X, Ruler, Sparkles } from "lucide-react";
import { SizeChartEntry } from "@/types";

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  sizeChart: SizeChartEntry[];
  fitType: string;
}

export default function SizeChartModal({
  isOpen,
  onClose,
  sizeChart,
  fitType,
}: SizeChartModalProps) {
  const [unit, setUnit] = useState<"cm" | "in">("cm");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[var(--bg-surface)] rounded-2xl shadow-2xl border border-[var(--border-subtle)] overflow-hidden z-10 p-6 space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-[var(--accent-terra)]" />
            <div>
              <h3 className="font-bold text-sm sm:text-base uppercase tracking-wider text-[var(--text-primary)]">
                Garment Size & Measurement Guide
              </h3>
              <p className="text-[11px] text-[var(--text-muted)]">
                Silhouette: <strong>{fitType}</strong> (Pre-shrunk dimensions)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Switcher */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-secondary)] font-medium">
            Switch measurement units:
          </span>
          <div className="inline-flex rounded-lg bg-[var(--bg-secondary)] p-1 border border-[var(--border-subtle)]">
            <button
              onClick={() => setUnit("cm")}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                unit === "cm"
                  ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Centimeters (CM)
            </button>
            <button
              onClick={() => setUnit("in")}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                unit === "in"
                  ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Inches (IN)
            </button>
          </div>
        </div>

        {/* Measurements Table */}
        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--bg-secondary)] text-[var(--text-primary)] font-bold uppercase tracking-wider border-b border-[var(--border-subtle)]">
              <tr>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Chest / Bust</th>
                <th className="py-3 px-4">Length (HSP to Hem)</th>
                <th className="py-3 px-4">Shoulder Drop</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
              {sizeChart.map((row) => (
                <tr key={row.size} className="hover:bg-[var(--bg-secondary)]/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-[var(--text-primary)]">{row.size}</td>
                  <td className="py-3 px-4">
                    {unit === "cm" ? `${row.chestCm} cm` : `${row.chestInches} in`}
                  </td>
                  <td className="py-3 px-4">
                    {unit === "cm" ? `${row.lengthCm} cm` : `${row.lengthInches} in`}
                  </td>
                  <td className="py-3 px-4">
                    {unit === "cm" ? `${row.shoulderCm} cm` : `${row.shoulderInches} in`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Guidelines & Pro-Tip */}
        <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs space-y-2 text-[var(--text-secondary)]">
          <div className="flex items-center gap-2 font-bold text-[var(--text-primary)] uppercase text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-terra)]" />
            <span>Streetwear Sizing Recommendation</span>
          </div>
          <p className="leading-relaxed">
            Our silhouettes are engineered with a relaxed drop shoulder and structured boxy body. If you prefer a tailored fit, choose one size smaller than your usual high-street size. For the intended streetwear drape, choose your true size.
          </p>
        </div>
      </div>
    </div>
  );
}

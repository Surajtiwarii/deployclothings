"use client";

import { useState } from "react";
import { X, Sparkles, Check, CheckCircle2 } from "lucide-react";
import { useUserStore } from "@/lib/store/userStore";

interface SmartSizeAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize: (size: string) => void;
  productName: string;
}

export default function SmartSizeAdvisorModal({
  isOpen,
  onClose,
  onSelectSize,
  productName,
}: SmartSizeAdvisorModalProps) {
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(70);
  const [fitPreference, setFitPreference] = useState<"tailored" | "regular" | "oversized">("regular");
  const [calculated, setCalculated] = useState(false);

  const setSizeProfile = useUserStore((state) => state.setSizeProfile);

  if (!isOpen) return null;

  // Algorithm for streetwear size estimation
  const calculateRecommendation = () => {
    let baseScore = (weightKg / (heightCm / 100)) - 10;
    let size = "M";

    if (heightCm < 165) {
      size = weightKg < 60 ? "XS" : "S";
    } else if (heightCm <= 173) {
      size = weightKg < 65 ? "S" : "M";
    } else if (heightCm <= 180) {
      size = weightKg < 76 ? "M" : "L";
    } else if (heightCm <= 188) {
      size = weightKg < 88 ? "L" : "XL";
    } else {
      size = weightKg < 98 ? "XL" : "XXL";
    }

    // Adjust for fit preference
    if (fitPreference === "oversized") {
      const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
      const currentIdx = sizes.indexOf(size);
      if (currentIdx < sizes.length - 1) size = sizes[currentIdx + 1];
    } else if (fitPreference === "tailored") {
      const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
      const currentIdx = sizes.indexOf(size);
      if (currentIdx > 0) size = sizes[currentIdx - 1];
    }

    return {
      size,
      confidence: 94,
    };
  };

  const { size: recommendedSize, confidence } = calculateRecommendation();

  const handleApply = () => {
    setSizeProfile({
      heightCm,
      weightKg,
      fitPreference: fitPreference === "tailored" ? "regular" : fitPreference,
      recommendedSize,
      confidenceScore: confidence,
    });
    onSelectSize(recommendedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[var(--bg-surface)] rounded-2xl shadow-2xl border border-[var(--border-subtle)] overflow-hidden z-10 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[var(--accent-terra)]/15 text-[var(--accent-terra)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--text-primary)]">
                Smart Size Recommendation Engine
              </h3>
              <p className="text-[11px] text-[var(--text-muted)]">
                Tailored for {productName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Sliders */}
        <div className="space-y-4 text-xs">
          {/* Height */}
          <div>
            <div className="flex justify-between font-bold text-[var(--text-secondary)] mb-1.5">
              <span>Height</span>
              <span className="text-[var(--text-primary)]">
                {heightCm} cm ({Math.floor(heightCm / 30.48)}'
                {Math.round((heightCm % 30.48) / 2.54)}")
              </span>
            </div>
            <input
              type="range"
              min="150"
              max="205"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full accent-[var(--accent-terra)] cursor-pointer"
            />
          </div>

          {/* Weight */}
          <div>
            <div className="flex justify-between font-bold text-[var(--text-secondary)] mb-1.5">
              <span>Weight</span>
              <span className="text-[var(--text-primary)]">{weightKg} kg</span>
            </div>
            <input
              type="range"
              min="45"
              max="125"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-[var(--accent-terra)] cursor-pointer"
            />
          </div>

          {/* Fit Preference */}
          <div>
            <span className="block font-bold text-[var(--text-secondary)] mb-2">
              Preferred Streetwear Drape
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFitPreference("tailored")}
                className={`py-2 px-3 rounded-lg border text-center transition-all ${
                  fitPreference === "tailored"
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] font-bold shadow-xs"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-subtle)]"
                }`}
              >
                Fitted
              </button>
              <button
                type="button"
                onClick={() => setFitPreference("regular")}
                className={`py-2 px-3 rounded-lg border text-center transition-all ${
                  fitPreference === "regular"
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] font-bold shadow-xs"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-subtle)]"
                }`}
              >
                Relaxed Boxy
              </button>
              <button
                type="button"
                onClick={() => setFitPreference("oversized")}
                className={`py-2 px-3 rounded-lg border text-center transition-all ${
                  fitPreference === "oversized"
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] font-bold shadow-xs"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-subtle)]"
                }`}
              >
                Super Oversized
              </button>
            </div>
          </div>
        </div>

        {/* Calculated Result Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--accent-terra)]/10 to-transparent border border-[var(--accent-terra)]/30 text-center space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-terra)]">
            Recommended Fit
          </div>
          <div className="text-4xl font-black text-[var(--text-primary)]">
            Size {recommendedSize}
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Based on your {heightCm}cm / {weightKg}kg profile for an ideal {fitPreference} drape.
          </p>
        </div>

        {/* Apply CTA */}
        <button
          onClick={handleApply}
          className="w-full py-3.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Apply Size {recommendedSize} & Save Profile</span>
        </button>
      </div>
    </div>
  );
}

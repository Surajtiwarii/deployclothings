"use client";

import { useState } from "react";
import { Star, CheckCircle2, ThumbsUp, Plus, X, MessageSquare } from "lucide-react";
import { Review } from "@/types";

interface CustomerReviewsProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  productName: string;
}

export default function CustomerReviews({
  reviews: initialReviews,
  rating,
  reviewCount,
  productName,
}: CustomerReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [modalOpen, setModalOpen] = useState(false);

  // New review form states
  const [name, setName] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [heightWeight, setHeightWeight] = useState("");
  const [sizePurchased, setSizePurchased] = useState("M");

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title || !comment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: name,
      rating: userRating,
      date: "Just now",
      title,
      comment,
      verified: true,
      fitFeedback: "Perfect Oversized Fit",
      heightWeight: heightWeight || '5\'10" • 72kg',
      purchasedSize: sizePurchased,
    };

    setReviews([newRev, ...reviews]);
    setModalOpen(false);
    setName("");
    setTitle("");
    setComment("");
  };

  return (
    <section className="py-12 border-t border-[var(--border-subtle)] space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[var(--text-primary)]">
            Verified Customer Reviews ({reviews.length})
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? "fill-amber-500" : "fill-transparent"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">
              {rating.toFixed(1)} out of 5.0
            </span>
            <span className="text-xs text-[var(--text-muted)]">• 100% Verified Buyers</span>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Fit Satisfaction Strip */}
      <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-[var(--text-primary)] font-medium">
            <strong>94% of customers</strong> report this silhouette fits as intended for a structured boxy drape.
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)]">
          <span>Runs Small (3%)</span>
          <span>•</span>
          <span className="font-bold text-[var(--text-primary)]">True to Size / Oversized (94%)</span>
          <span>•</span>
          <span>Runs Large (3%)</span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                    {rev.author}
                  </span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Owner
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)] mt-1">
                  {rev.heightWeight && <span>Height/Weight: {rev.heightWeight}</span>}
                  {rev.purchasedSize && <span>• Purchased: Size {rev.purchasedSize}</span>}
                  <span>• {rev.date}</span>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
            </div>

            <h4 className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">
              "{rev.title}"
            </h4>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-[var(--bg-surface)] rounded-2xl shadow-2xl border border-[var(--border-subtle)] overflow-hidden z-10 p-6 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--text-primary)]">
                  Review Your Artifact
                </h3>
                <p className="text-[11px] text-[var(--text-muted)]">{productName}</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[var(--text-secondary)] mb-1">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setUserRating(st)}
                      className="p-1 text-amber-500"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          st <= userRating ? "fill-amber-500" : "fill-transparent"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-[var(--text-secondary)] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Siddharth R."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-terra)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[var(--text-secondary)] mb-1">
                    Your Height & Weight
                  </label>
                  <input
                    type="text"
                    value={heightWeight}
                    onChange={(e) => setHeightWeight(e.target.value)}
                    placeholder={'e.g. 5\'11" • 75kg'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-terra)]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[var(--text-secondary)] mb-1">
                    Purchased Size
                  </label>
                  <select
                    value={sizePurchased}
                    onChange={(e) => setSizePurchased(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[var(--text-secondary)] mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Incredible heavyweight drape"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-terra)]"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--text-secondary)] mb-1">
                  Your Detailed Review
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details about the fabric density, collar fit, wash experience, and silhouette..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-terra)]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

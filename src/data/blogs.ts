export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "why-gsm-density-defines-modern-streetwear",
    title: "Why Fabric GSM Weight Matters More Than Any Brand Logo",
    excerpt:
      "Understanding the mathematics of fabric density, single jersey knits, and why 280+ GSM creates the definitive boxy drape.",
    content: `
# Why Fabric GSM Weight Matters More Than Any Brand Logo

In the fast-paced world of streetwear, logos come and go, but the silhouette of a garment is eternal. If you have ever wondered why some oversized t-shirts hang like architectural sculptures while others look like deflated bedsheets, the answer comes down to three letters: **GSM** (Grams per Square Meter).

---

## What is GSM?

GSM measures the weight of one square meter of fabric. Most mass-market fast-fashion brands use 140 to 160 GSM single jersey. Why? Because lighter fabric requires less raw cotton yarn, knits faster on circular machines, and drastically reduces shipping freight costs.

However, 160 GSM fabric has fundamental structural flaws:
1. **It clings** to the torso rather than maintaining its own independent geometry.
2. **The ribbing weakens**, causing the dreaded 'bacon collar' after a few washes.
3. **It reveals transparency** under bright daylight.

---

## The DEPLOY Standard: 280–380 GSM

At DEPLOY, we set our baseline at **280 GSM** for classic boxy tees, progressing to **300 GSM** for mineral acid tones and **320 GSM** for structured thermal waffle tees.

When cotton yarns are combed and spun at high density:
- The fabric holds a distinct **drop-shoulder boxy drape**.
- The collar ribbing is infused with elastane to stay crisp through 100+ wash cycles.
- The garment feels reassuringly heavy and tactile from the moment you put it on.

---

## The Verdict

Great streetwear doesn't require loud licensed cartoon graphics. Ready to wear, ready to deploy. It requires engineering, fabric density, and timeless silhouette design.
    `,
    author: "DEPLOY Design Team",
    date: "Aug 8, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
    tags: ["Fabric Engineering", "GSM Weight", "Streetwear Design"],
  },
  {
    id: "blog-2",
    slug: "how-to-style-boxy-oversized-tees",
    title: "The Proportions of Boxy Streetwear: A Silhouette Guide",
    excerpt:
      "How to balance wide-leg trousers, cargo pants, and structured heavyweight tees without looking unkempt.",
    content: `
# The Proportions of Boxy Streetwear: A Silhouette Guide

Oversized streetwear is often misunderstood as simply buying two sizes too large. But true oversized styling is an intentional game of proportions, hem breaks, and shoulder drops.

---

## 1. The Rule of Balance

When wearing a wide, structured 280 GSM boxy tee, avoid tight skinny jeans. Skinny jeans create a disproportionate top-heavy inverted triangle. Instead, pair your heavy tee with:
- **Wide-leg pleated trousers** for a minimal Scandinavian/Tokyo look.
- **Structured cargo artifacts** with subtle ankle taper.
- **Heavyweight canvas shorts** with a 6–7 inch inseam.

---

## 2. Shoulder Seam Placement

A properly drafted drop-shoulder silhouette features seam lines placed 2 to 3 inches past the natural acromion (shoulder bone). This creates a relaxed drape without pulling the armholes down to the ribcage.

---

## 3. The 1.25-Inch Collar Anchor

A tight, high-density ribbed collar frames the neck and anchors the entire outfit. It gives an oversized tee an intentionally sharp, tailored look rather than a sloppy pajama feel.
    `,
    author: "Studio Editorial",
    date: "Aug 5, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85",
    tags: ["Styling Guide", "Streetwear", "Silhouettes"],
  },
];

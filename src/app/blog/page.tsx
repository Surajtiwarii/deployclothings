import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogs";

export const metadata = {
  title: "DEPLOY Editorial — Streetwear Design & Fabric Architecture",
  description:
    "Explore in-depth articles on GSM fabric weights, drop-shoulder silhouettes, and the engineering behind original streetwear. Ready to wear, ready to deploy.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen py-16 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="artifact-badge artifact-badge-accent text-[10px]">
            DEPLOY Editorial
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Streetwear Journal & Craft Notes
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
            Design essays, fabric science, and styling guides from our Bangalore studio.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden card-hover-elevate flex flex-col justify-between"
            >
              <div>
                <Link href={`/blog/${post.slug}`} className="block relative aspect-16/10 overflow-hidden bg-zinc-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)]">
                    <span className="font-bold text-[var(--accent-terra)]">{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-terra)] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[var(--border-subtle)] mt-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent-terra)] group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

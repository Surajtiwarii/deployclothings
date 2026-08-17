import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogs";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);
  if (!post) return { title: "Post Not Found — DEPLOY" };

  return {
    title: `${post.title} — DEPLOY Editorial`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen py-16 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal</span>
        </Link>

        {/* Title Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="artifact-badge text-[10px]">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] pt-2 border-b border-[var(--border-subtle)] pb-6">
            <span className="flex items-center gap-1.5 font-medium text-[var(--text-primary)]">
              <User className="w-3.5 h-3.5 text-[var(--accent-terra)]" />
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden bg-zinc-900 border border-[var(--border-subtle)] shadow-xl aspect-16/9">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed space-y-6">
          <p className="text-sm sm:text-base text-[var(--text-primary)] font-medium leading-relaxed">
            {post.excerpt}
          </p>
          <div className="whitespace-pre-line leading-relaxed">
            {post.content}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center space-y-4 mt-12">
          <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--text-primary)]">
            Experience Our Heavyweight Silhouettes
          </h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
            Try our 280 GSM Monolith boxy tees and 300 GSM Vortex oversized silhouettes.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-md"
          >
            Explore The Roster →
          </Link>
        </div>
      </article>
    </div>
  );
}

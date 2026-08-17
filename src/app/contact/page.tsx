"use client";

import { useState } from "react";
import {
  Mail,
  MessageCircle,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

const INQUIRY_TOPICS = [
  "Order & Shipping",
  "Size & Fit Advice",
  "Exchange / Return",
  "Collab & Press",
  "General Query"
];

const FAQS = [
  {
    q: "How long does shipping take across India?",
    a: "Orders are dispatched from our studio within 24–48 hours. Metro cities receive delivery in 2–3 days; rest of India takes 4–5 business days via Bluedart / Delhivery Express."
  },
  {
    q: "How does the 14-day doorstep exchange work?",
    a: "If the size doesn't fit exactly as you like, message us on WhatsApp or email. Our courier partner will pick up the piece from your doorstep and deliver your new size free of charge."
  },
  {
    q: "Is Cash on Delivery (COD) available?",
    a: "Yes! We offer COD across 19,000+ pin codes in India with zero advance payment requirements."
  },
  {
    q: "What fabric GSM do your drops use?",
    a: "Our oversized tees range from 180 GSM to 240 GSM heavy combed cotton, and winter drop hoodies use 380–420 GSM fleece for the quintessential structured boxy drape."
  }
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("Order & Shipping");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center pt-4 sm:pt-6 pb-8 sm:pb-12 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors overflow-hidden select-none">
      
      {/* Background Ambient Radial Glow & Architectural Blueprint Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.02] dark:opacity-[0.04] overflow-hidden">
        <span className="font-black text-[22vw] tracking-tighter uppercase select-none leading-none">
          DEPLOY
        </span>
      </div>

      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-[var(--accent-primary)]/10 blur-[130px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        
        {/* Full-Width 2-Column Balanced Layout with Vertical Center Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Header, Direct Channels, FAQ Accordion (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Header Block */}
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--accent-primary)] shadow-xs">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>Studio Concierge</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)] leading-[1.05]">
                Get In Touch
              </h1>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                Questions regarding fit, custom sizing, delivery dispatch, or drops? Reach out directly via WhatsApp, email, or send us a message.
              </p>
            </div>

            {/* Direct Contact Cards (2 Rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/919876543210?text=Hi%20DEPLOY%20Team%2C%20I%20need%20assistance"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#111116] border border-[var(--border-subtle)] dark:border-white/10 hover:border-emerald-500/60 transition-all flex items-center justify-between gap-3 shadow-xs hover:shadow-md"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] dark:text-white group-hover:text-emerald-400 transition-colors truncate">
                        WhatsApp Concierge
                      </h2>
                      <span className="text-[9px] font-mono font-bold uppercase text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        Instant
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] dark:text-zinc-400 font-mono truncate mt-0.5">
                      +91 98765 43210 • Fast reply
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Email Card */}
              <a
                href="mailto:concierge@deployclothings.com"
                className="group p-4 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#111116] border border-[var(--border-subtle)] dark:border-white/10 hover:border-[var(--accent-primary)]/60 transition-all flex items-center justify-between gap-3 shadow-xs hover:shadow-md"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] dark:text-white group-hover:text-[var(--accent-primary)] transition-colors truncate">
                        Email Support
                      </h2>
                      <span className="text-[9px] font-mono text-[var(--text-muted)] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded">
                        ~24h
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] dark:text-zinc-400 font-mono truncate mt-0.5">
                      support.deploycloths@gmail.com
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--accent-primary)] shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>

            </div>

            {/* Quick FAQs Accordion */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#111116] border border-[var(--border-subtle)] dark:border-white/10 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)] dark:border-white/10">
                <HelpCircle className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--text-primary)] dark:text-white font-mono">
                  Quick Questions (FAQ)
                </h3>
              </div>

              <div className="space-y-2">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[var(--border-subtle)] dark:border-white/5 bg-[var(--bg-secondary)]/50 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-2.5 sm:p-3 text-left flex items-center justify-between gap-2 text-xs font-bold text-[var(--text-primary)] dark:text-zinc-200 hover:text-[var(--accent-primary)]"
                    >
                      <span className="leading-snug">{faq.q}</span>
                      <ChevronDown
                        className={`w-3 h-3 shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180 text-[var(--accent-primary)]" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-3 pb-3 text-[11px] text-[var(--text-secondary)] dark:text-zinc-400 font-sans leading-relaxed border-t border-[var(--border-subtle)] dark:border-white/5 pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 100% Satisfaction Guarantee */}
            <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] dark:border-white/5 flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-[11px]">
                <span className="font-bold text-[var(--text-primary)] dark:text-white">
                  100% Satisfaction:
                </span>{" "}
                <span className="text-[var(--text-secondary)] dark:text-zinc-400 font-mono">
                  14-day doorstep size exchange across India.
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Studio Dispatch Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-7 rounded-3xl bg-[var(--bg-surface)] dark:bg-[#111116] border border-[var(--border-subtle)] dark:border-white/10 shadow-xl space-y-5">
              
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[var(--text-primary)] dark:text-white">
                  Send A Direct Message
                </h2>
                <p className="text-xs text-[var(--text-secondary)] dark:text-zinc-400 font-mono">
                  Fill out the form below and our studio team will get back to you promptly.
                </p>
              </div>

              {sent ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-black text-base text-[var(--text-primary)] dark:text-white">
                    Message Dispatched Successfully
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] dark:text-zinc-400 max-w-sm mx-auto font-mono">
                    Thank you, <span className="font-bold text-[var(--text-primary)] dark:text-white">{name}</span>. Our concierge team will contact you at <span className="font-bold text-[var(--text-primary)] dark:text-white">{email}</span> within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setName("");
                      setEmail("");
                      setPhone("");
                      setMessage("");
                    }}
                    className="mt-3 px-5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] font-mono text-xs font-bold uppercase tracking-wider hover:border-[var(--accent-primary)] transition-all"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Topic Select Chips */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Select Inquiry Topic *
                    </label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {INQUIRY_TOPICS.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setSelectedTopic(topic)}
                          className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                            selectedTopic === topic
                              ? "bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold shadow-xs"
                              : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aryan Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-xs focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aryan@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-xs focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp (Optional) */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Phone / WhatsApp Number (For Direct Resolution)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210 (Optional)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-xs focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your questions, order details, size advice requirements, or suggestions..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-xs focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-primary)] hover:text-white font-mono font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-lg group"
                  >
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Dispatch Message</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

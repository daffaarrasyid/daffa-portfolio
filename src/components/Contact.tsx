"use client";

import { useEffect, useState } from "react";
import { PERSONAL_INFO } from "@/lib/data";
import { Mail, ArrowUpRight, Copy, Check, ArrowUp } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Jakarta",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="pt-24 md:pt-36 pb-12 border-t border-[var(--card-border)] bg-[var(--bg-secondary)]/50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[var(--card-border)] mb-14 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-orange)] font-bold">06</span>
            <span>// INITIATE COLLABORATION</span>
          </div>
          <div>GET IN TOUCH</div>
        </div>

        {/* Big Editorial Headline */}
        <div className="max-w-4xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-orange)]">
            Open for Select Engagements
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-medium text-[var(--text-primary)] mt-3 tracking-tight leading-[1.05]">
            Have an idea? Let&apos;s build something <span className="italic font-light text-[var(--accent-orange)]">exceptional</span> together.
          </h2>
        </div>

        {/* Action Bar: Direct Email Copy & Mailto */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="group px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-mono uppercase tracking-wider font-semibold flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email Directly</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>

          <button
            onClick={copyEmail}
            className="px-6 py-4 rounded-full border border-[var(--card-border)] bg-[var(--bg-card)] text-[var(--text-primary)] text-sm font-mono uppercase tracking-wider font-medium flex items-center gap-2 hover:border-[var(--text-primary)] transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[var(--text-muted)]" />
                <span>Copy: {PERSONAL_INFO.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 pt-12 border-t border-[var(--card-border)]">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--bg-card)] hover:border-[var(--text-primary)] transition-all flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 fill-current text-[var(--text-primary)]" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <div>
                <div className="text-sm font-mono font-medium text-[var(--text-primary)]">
                  GitHub
                </div>
                <div className="text-xs text-[var(--text-muted)] font-mono">
                  Open Source & Repos
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-orange)] transition-colors" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--bg-card)] hover:border-[var(--text-primary)] transition-all flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 fill-current text-[var(--text-primary)]" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <div>
                <div className="text-sm font-mono font-medium text-[var(--text-primary)]">
                  LinkedIn
                </div>
                <div className="text-xs text-[var(--text-muted)] font-mono">
                  Professional Network
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-orange)] transition-colors" />
          </a>

          <a
            href={PERSONAL_INFO.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--bg-card)] hover:border-[var(--text-primary)] transition-all flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 fill-current text-[var(--text-primary)]" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <div>
                <div className="text-sm font-mono font-medium text-[var(--text-primary)]">
                  X / Twitter
                </div>
                <div className="text-xs text-[var(--text-muted)] font-mono">
                  Thoughts & Creative Code
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-orange)] transition-colors" />
          </a>
        </div>

        {/* Bottom Colophon / Specs */}
        <div className="mt-16 pt-8 border-t border-[var(--card-border)] flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[var(--text-muted)] uppercase">
          {/* Studio Credits */}
          <div className="flex items-center gap-4">
            <span>© 2024 M. DAFFA AR-RASYID</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">ALL RIGHTS RESERVED</span>
          </div>

          {/* Live Jakarta Clock */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>JAKARTA, ID: {time || "00:00:00"} WIB</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

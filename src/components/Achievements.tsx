"use client";

import { ACHIEVEMENTS } from "@/lib/data";
import { Award, Trophy, BookOpen, Star, CheckCircle2 } from "lucide-react";

export default function Achievements() {
  const getIcon = (type: string) => {
    if (type.includes("Competition") || type.includes("Hackathon")) {
      return <Trophy className="w-4 h-4 text-amber-500" />;
    }
    if (type.includes("Research")) {
      return <BookOpen className="w-4 h-4 text-sky-500" />;
    }
    if (type.includes("Design")) {
      return <Star className="w-4 h-4 text-[var(--accent-orange)]" />;
    }
    return <Award className="w-4 h-4 text-emerald-500" />;
  };

  return (
    <section
      id="achievements"
      className="py-24 md:py-36 border-t border-[var(--card-border)] relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[var(--card-border)] mb-14 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-orange)] font-bold">05</span>
            <span>// RECOGNITIONS & HONORS</span>
          </div>
          <div>5+ VERIFIED MILESTONES</div>
        </div>

        {/* Section Title */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-orange)]">
            Accolades & Research
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-medium text-[var(--text-primary)] mt-1">
            Proven Milestones
          </h2>
        </div>

        {/* Studio Ledger List */}
        <div className="space-y-4">
          {ACHIEVEMENTS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-card)] hover:border-[var(--text-primary)] transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Column: Number & Metadata */}
              <div className="flex items-start md:items-center gap-4 md:w-1/4">
                <span className="text-sm font-mono text-[var(--text-muted)] group-hover:text-[var(--accent-orange)] transition-colors">
                  0{idx + 1}
                </span>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getIcon(item.type)}
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                      {item.type}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-semibold text-[var(--text-primary)]">
                    {item.year}
                  </div>
                </div>
              </div>

              {/* Center Column: Title & Issuer */}
              <div className="md:w-1/2 space-y-1">
                <h3 className="text-lg md:text-xl font-sans font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-orange)] transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-[var(--text-secondary)]">
                  {item.issuer}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              {/* Right Column: Status Verification Chip */}
              <div className="md:w-1/4 flex md:justify-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--badge-bg)] text-[11px] font-mono text-[var(--text-secondary)] border border-[var(--card-border)]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>Verified Honor</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

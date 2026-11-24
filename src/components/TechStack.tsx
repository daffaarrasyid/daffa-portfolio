"use client";

import { useState } from "react";
import TechStackCanvas from "./TechStackCanvas";
import { TECH_STACK } from "@/lib/data";
import { Code, Cpu, Terminal, Sparkles } from "lucide-react";

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<"web" | "aiml" | "tools">("web");

  return (
    <section
      id="tech-stack"
      className="py-24 md:py-36 border-t border-[var(--card-border)] relative z-20 bg-[var(--bg-primary)]/90 backdrop-blur-[2px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[var(--card-border)] mb-14 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-orange)] font-bold">03</span>
            <span>// TECHNICAL ARSENAL</span>
          </div>
          <div>INTERACTIVE 3D ECOSYSTEM</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 3D Interactive Sphere */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            <div className="w-full text-center lg:text-left mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-orange)] flex items-center justify-center lg:justify-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Spatial Orbit</span>
              </span>
              <h2 className="text-3xl md:text-4xl font-sans font-medium text-[var(--text-primary)] mt-1">
                Connected Competencies
              </h2>
            </div>

            {/* Canvas Container */}
            <div className="w-full relative rounded-2xl border border-[var(--card-border)] bg-[var(--bg-card)]/50 p-2 overflow-hidden shadow-inner">
              <TechStackCanvas />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--card-border)] text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider pointer-events-none shadow-sm whitespace-nowrap">
                Drag to spin · 18 core technologies
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Detailed Capability Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            {/* Category Filter Tabs */}
            <div className="flex p-1.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-card)] gap-2">
              <button
                onClick={() => setActiveTab("web")}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  activeTab === "web"
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Web Architecture</span>
              </button>

              <button
                onClick={() => setActiveTab("aiml")}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  activeTab === "aiml"
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>AI & Machine Learning</span>
              </button>

              <button
                onClick={() => setActiveTab("tools")}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  activeTab === "tools"
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Systems & Tools</span>
              </button>
            </div>

            {/* List of skills for active tab */}
            <div className="space-y-3">
              {TECH_STACK[activeTab].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--bg-card)] hover:border-[var(--accent-orange)] transition-all duration-200 group flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-sans font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-orange)] transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--text-secondary)] border border-[var(--card-border)]">
                        {item.level}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] font-mono">
                      {item.desc}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--accent-orange)] group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

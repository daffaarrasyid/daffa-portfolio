"use client";

import { useState, useRef } from "react";
import { PROJECTS, ProjectItem } from "@/lib/data";
import { ArrowUpRight, ExternalLink, Sparkles, Layers } from "lucide-react";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Website" | "AI/ML" | "Mobile">("All");

  const filteredProjects = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="py-24 md:py-36 border-t border-[var(--card-border)] relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[var(--card-border)] mb-14 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-orange)] font-bold">04</span>
            <span>// SELECTED WORKS</span>
          </div>
          <div>CLASSIFIED ARCHIVES</div>
        </div>

        {/* Filter Controls & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-orange)]">
              Engineered Deployments
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-medium text-[var(--text-primary)] mt-1">
              Featured Projects
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 border border-[var(--card-border)] p-1.5 rounded-full bg-[var(--bg-card)]">
            {(["All", "Website", "AI/ML", "Mobile"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-[var(--card-border)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--text-primary)] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              {/* Visual Showcase Card Banner */}
              <div className="relative h-56 sm:h-64 p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-card)] border-b border-[var(--card-border)]">
                {/* Visual Ambient Glow */}
                <div
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                  style={{ backgroundColor: project.accentColor }}
                />

                {/* Top Bar inside banner */}
                <div className="relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                  <span>PROJECT / {project.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full border border-[var(--card-border)] bg-[var(--bg-card)]/80 text-[var(--text-primary)]">
                    {project.category}
                  </span>
                </div>

                {/* Center Graphic Mockup Element */}
                <div className="relative z-10 flex items-center justify-center my-auto">
                  <div className="w-full max-w-xs p-4 rounded-xl border border-[var(--card-border)] bg-[var(--bg-card)]/90 backdrop-blur-md shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="w-2 h-2 rounded-full bg-yellow-400" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-mono text-[var(--text-muted)] ml-auto">
                        {project.year}
                      </span>
                    </div>
                    <div className="h-14 flex items-center justify-center text-sm font-mono font-bold tracking-tight text-[var(--text-primary)]">
                      {project.title}
                    </div>
                  </div>
                </div>

                {/* Bottom Metrics Pill */}
                {project.metrics && (
                  <div className="relative z-10 text-[11px] font-mono text-[var(--accent-orange)] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{project.metrics}</span>
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-sans font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-orange)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--card-border)]">
                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--badge-bg)] text-[var(--text-secondary)] border border-[var(--card-border)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-mono uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs font-mono uppercase tracking-wider hover:border-[var(--text-primary)] transition-all"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL_INFO } from "@/lib/data";
import { Code2, Cpu, Globe, Layers } from "lucide-react";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Paragraph lines scrub animation
      if (textRef.current) {
        const words = textRef.current.querySelectorAll(".reveal-word");
        gsap.fromTo(
          words,
          { opacity: 0.15, y: 5 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "bottom 55%",
              scrub: 0.7,
            },
          }
        );
      }

      // Feature items subtle stagger
      const cards = containerRef.current?.querySelectorAll(".about-spec-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const bioWords = (
    "I am a software engineer and creative technologist based in Jakarta, Indonesia. " +
    "My journey began with deep curiosity for algorithmic logic, which soon evolved into building scalable fullstack systems and pioneering machine learning applications. " +
    "Over the years, I have architected high-throughput AI pipelines, engineered buttery-smooth interactive web platforms, and designed digital solutions that prioritize clarity, human ergonomics, and engineering rigor."
  ).split(" ");

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 md:py-36 border-t border-[var(--card-border)] relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[var(--card-border)] mb-14 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-orange)] font-bold">01</span>
            <span>// ABOUT & BACKGROUND</span>
          </div>
          <div>BIOGRAPHY & PHILOSOPHY</div>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Quick Specs & Meta */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-orange)]">
                The Architect
              </span>
              <h2 className="text-3xl md:text-4xl font-sans font-medium text-[var(--text-primary)] mt-2">
                Merging logic with sensory web design.
              </h2>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="about-spec-card p-4 rounded-xl border border-[var(--card-border)] bg-[var(--bg-card)]">
                <div className="text-[var(--text-muted)] uppercase">Academic Background</div>
                <div className="text-[var(--text-primary)] font-semibold mt-1">
                  Computer Science & Software Engineering
                </div>
              </div>

              <div className="about-spec-card p-4 rounded-xl border border-[var(--card-border)] bg-[var(--bg-card)]">
                <div className="text-[var(--text-muted)] uppercase">Core Expertise</div>
                <div className="text-[var(--text-primary)] font-semibold mt-1">
                  AI/ML Pipelines · GSAP WebGL Frontend · Fullstack Next.js
                </div>
              </div>

              <div className="about-spec-card p-4 rounded-xl border border-[var(--card-border)] bg-[var(--bg-card)]">
                <div className="text-[var(--text-muted)] uppercase">Philosophy</div>
                <div className="text-[var(--text-primary)] font-semibold mt-1">
                  &ldquo;Tactile simplicity built upon uncompromised speed.&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scroll-scrubbed text reveal */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div
              ref={textRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-sans font-normal leading-[1.35] tracking-tight text-[var(--text-primary)]"
            >
              {bioWords.map((word, idx) => (
                <span
                  key={idx}
                  className="reveal-word inline-block mr-[0.3em] transition-colors"
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Quick Metrics Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-16 mt-16 border-t border-[var(--card-border)]">
              <div>
                <div className="text-3xl md:text-4xl font-mono font-medium text-[var(--text-primary)]">
                  3+
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase mt-1">
                  Years Crafting
                </div>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-mono font-medium text-[var(--text-primary)]">
                  15+
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase mt-1">
                  Shipped Systems
                </div>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-mono font-medium text-[var(--accent-orange)]">
                  &lt;80ms
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase mt-1">
                  Avg Inference
                </div>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-mono font-medium text-[var(--text-primary)]">
                  5+
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase mt-1">
                  Tech Awards
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

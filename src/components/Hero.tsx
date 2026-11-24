"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowDownRight } from "lucide-react";
import Lanyard from "./Lanyard";

export default function Hero({ ready }: { ready: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Headline lines reveal
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".hero-line-inner");
        tl.fromTo(
          lines,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.12 }
        );
      }

      // 3D Lanyard fade & scale in
      tl.fromTo(
        canvasWrapperRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.3, ease: "expo.out" },
        "-=0.9"
      );

      // Subtext and CTA
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.8"
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [ready]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-28 pb-12 md:pt-36 md:pb-16 flex flex-col justify-between overflow-hidden"
    >
      {/* Hanging Lanyard Stage: Spans full width across the entire hero, layer above text (z-30, below navbar z-50) */}
      <div
        ref={canvasWrapperRef}
        className="absolute inset-0 w-full h-full z-30 pointer-events-none overflow-visible"
      >
        {/* Soft background glow */}
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--accent-orange)]/15 blur-3xl pointer-events-none" />

        <div className="w-full h-full pointer-events-auto">
          <Lanyard
            frontImage="/foto_daffa.jpg"
            backImage="/foto_daffa.jpg"
            cardColor="#141416"
            strapColor="#ff4d00"
            orientation="portrait"
            finish="glossy"
            metal="graphite"
            size={0.50}
            strapLength={0.32}
            anchor="right"
            className="w-full h-full cursor-grab active:cursor-grabbing"
          />
        </div>

        {/* Tactile hint badge */}
        <div className="absolute bottom-8 right-8 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)]/85 backdrop-blur-md border border-[var(--card-border)] text-[10px] text-[var(--text-muted)] uppercase tracking-wider pointer-events-none shadow-sm hidden sm:block">
          Grab & Swing 3D Badge anywhere
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 my-auto">
        {/* Main Grid: Headline & Layout Space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
          {/* Left Column: Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.05]"
            >
              <div className="overflow-hidden py-1">
                <span className="hero-line-inner inline-block">Hello! I&apos;m</span>
              </div>
              <div className="overflow-hidden py-1">
                <span className="hero-line-inner inline-block text-[var(--text-primary)]">
                  Muhammad Daffa
                </span>
              </div>
              <div className="overflow-hidden py-1">
                <span className="hero-line-inner inline-block text-[var(--accent-orange)] font-light italic">
                  Ar-Rasyid.
                </span>
              </div>
            </h1>

            {/* Subtitle / Bio */}
            <p
              ref={subtextRef}
              className="mt-6 md:mt-8 text-base md:text-xl text-[var(--text-secondary)] max-w-xl font-normal leading-relaxed"
            >
              Creative Developer & AI/Web Engineer building tactile digital
              products with precision typography, spatial Three.js visuals, and
              scalable modern architecture.
            </p>

            {/* Call to Actions */}
            <div
              ref={ctaRef}
              className="mt-8 md:mt-10 flex flex-wrap items-center gap-4 relative z-20"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="group px-7 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs md:text-sm uppercase tracking-wider font-semibold flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={() => scrollToSection("about")}
                className="px-6 py-3.5 rounded-full border border-[var(--card-border)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs md:text-sm uppercase tracking-wider font-medium hover:border-[var(--text-primary)] transition-all cursor-pointer"
              >
                Read Biography
              </button>
            </div>
          </div>

          {/* Right Column: Visual clearance for 3D Lanyard */}
          <div className="lg:col-span-5 h-[360px] sm:h-[440px] lg:h-[500px] pointer-events-none" />
        </div>
      </div>

      {/* Centered Bottom Scroll Indicator with bouncing arrow */}
      <div className="w-full pt-6 pb-2 flex flex-col items-center justify-center text-xs tracking-widest text-[var(--text-muted)] uppercase relative z-10 select-none">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-2.5 cursor-pointer group hover:text-[var(--text-primary)] transition-colors"
        >
          <span className="text-[11px] font-medium tracking-[0.22em] text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
            SCROLL TO DISCOVER
          </span>
          <div className="w-8 h-8 rounded-full border border-[var(--card-border)] bg-[var(--bg-card)]/80 backdrop-blur-sm flex items-center justify-center text-[var(--text-primary)] group-hover:border-[var(--accent-orange)] group-hover:text-[var(--accent-orange)] transition-all animate-bounce shadow-sm">
            <ArrowDown className="w-4 h-4" />
          </div>
        </button>
      </div>
    </section>
  );
}

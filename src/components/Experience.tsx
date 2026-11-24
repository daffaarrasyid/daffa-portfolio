"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Briefcase, Calendar, MapPin } from "lucide-react";
import { EXPERIENCES } from "@/lib/data";

const STEP_ANGLE = 26; // degrees between items on the radial arc
const ARC_RADIUS = 440; // massive compass radius matching user request ("Ukuran kompasnya kurang besar")
const CENTER_X = -30; // center X of dial off-screen on the left edge
const CENTER_Y = 380; // center Y of dial in SVG

export default function Experience({ ready = true }: { ready?: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const compassWrapperRef = useRef<HTMLDivElement>(null);
  const wheelGroupRef = useRef<SVGGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const totalItems = EXPERIENCES.length;

  const updateContent = useCallback((index: number) => {
    if (contentRef.current) {
      const titleEl = contentRef.current.querySelector(".exp-title");
      const metaEl = contentRef.current.querySelector(".exp-meta");
      const descEl = contentRef.current.querySelector(".exp-desc");
      const tagsEl = contentRef.current.querySelector(".exp-tags");

      gsap.fromTo(
        [titleEl, metaEl, descEl, tagsEl],
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    }
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalItems) return;
      setActiveIdx(index);
      activeIdxRef.current = index;

      if (timelineRef.current && timelineRef.current.scrollTrigger) {
        const st = timelineRef.current.scrollTrigger;
        // Chapter progress spans between 0.15 and 0.85
        const progressTarget = 0.15 + (index / (totalItems - 1)) * 0.7;
        const targetScroll = st.start + progressTarget * (st.end - st.start);
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      } else {
        if (wheelGroupRef.current) {
          gsap.to(wheelGroupRef.current, {
            rotation: -index * STEP_ANGLE,
            transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
            duration: 0.8,
            ease: "expo.out",
          });
        }
        updateContent(index);
      }
    },
    [totalItems, updateContent]
  );

  useEffect(() => {
    if (!ready) return;
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const maxRotation = -(totalItems - 1) * STEP_ANGLE;

    // Orchestrated Pinned Timeline:
    // 0.00 -> 0.15: Entrance (Compass slides in from the left to right, content fades in)
    // 0.15 -> 0.85: Pinned Dial Rotation (Continuous analog scrub through chapters 01..04)
    // 0.85 -> 1.00: Exit (Compass slides out to the left and disappears, content fades out)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${totalItems * 900}`,
        pin: true,
        scrub: 0.8, // Buttery smooth 0.8s lag smoothing
        anticipatePin: 1,
        snap: {
          snapTo: (p) => {
            if (p < 0.15) return 0.15;
            if (p > 0.85) return 0.85;
            // Snap to chapters in the 0.15..0.85 range
            const normalized = (p - 0.15) / 0.7;
            const snapped = Math.round(normalized * (totalItems - 1)) / (totalItems - 1);
            return 0.15 + snapped * 0.7;
          },
          duration: { min: 0.2, max: 0.5 },
          ease: "power2.out",
        },
        onUpdate: (self) => {
          const p = self.progress;
          if (p >= 0.12 && p <= 0.88) {
            const normalized = Math.min(1, Math.max(0, (p - 0.15) / 0.7));
            const targetIndex = Math.min(
              totalItems - 1,
              Math.round(normalized * (totalItems - 1))
            );
            if (targetIndex !== activeIdxRef.current) {
              activeIdxRef.current = targetIndex;
              setActiveIdx(targetIndex);
              updateContent(targetIndex);
            }
          }
        },
      },
    });

    // 1. Entrance: Compass glides in from left to right
    if (compassWrapperRef.current) {
      tl.fromTo(
        compassWrapperRef.current,
        { x: -550, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
        0
      );
    }
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
        0.3
      );
    }

    // 2. Active Scrubbing: Compass wheel rotates across chapters
    if (wheelGroupRef.current) {
      tl.fromTo(
        wheelGroupRef.current,
        { rotation: 0 },
        {
          rotation: maxRotation,
          transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
          ease: "none",
          duration: 4.5,
        },
        1.2
      );
    }

    // 3. Exit: Compass glides out to the left and disappears
    if (compassWrapperRef.current) {
      tl.to(
        compassWrapperRef.current,
        { x: -650, opacity: 0, duration: 1.2, ease: "power2.in" },
        5.7
      );
    }
    if (contentRef.current) {
      tl.to(
        contentRef.current,
        { y: -35, opacity: 0, duration: 0.9, ease: "power2.in" },
        5.8
      );
    }

    timelineRef.current = tl;

    // Refresh triggers to ensure perfect coordinate measurement
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      tl.kill();
      timelineRef.current = null;
    };
  }, [ready, totalItems, updateContent]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        goToIndex(Math.min(totalItems - 1, activeIdx + 1));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        goToIndex(Math.max(0, activeIdx - 1));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIdx, goToIndex, totalItems]);

  const activeExp = EXPERIENCES[activeIdx] || EXPERIENCES[0];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col justify-between py-6 md:py-10 px-6 sm:px-10 lg:px-16 select-none z-10 bg-[var(--bg-primary)]/85 backdrop-blur-[2px]"
    >
      {/* Top Section Metadata Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--card-border)] text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] w-full">
        <div className="flex items-center gap-2">
          <span className="text-[#ff4d2e] font-bold">02</span>
          <span>// CAREER DISCOVERY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>RADIAL COMPASS STAGE</span>
        </div>
      </div>

      {/* Main Full-Viewport Compass & Narrative Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto w-full">
        {/* Left Column: Massive Compass Dial (Radius 440px, protruding from Left Screen Edge) */}
        <div
          ref={compassWrapperRef}
          className="lg:col-span-6 relative flex items-center justify-start h-[420px] sm:h-[520px] lg:h-[620px] -ml-8 sm:-ml-12 lg:-ml-16 will-change-transform"
        >
          <svg
            viewBox="0 0 640 760"
            className="w-full max-w-[640px] h-full overflow-visible text-[var(--text-primary)]"
          >
            <defs>
              {/* Active Badge Drop Shadow */}
              <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#ff4d2e" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Static Outer Caliper Ring */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r={ARC_RADIUS}
              fill="none"
              stroke="var(--card-border)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />

            {/* Rotatable Compass Dial Group with Caliper Ticks & Numbered Badges */}
            <g ref={wheelGroupRef} className="will-change-transform">
              {/* Precision Caliper Ticks around the circle arc (100 ticks) */}
              {Array.from({ length: 100 }).map((_, i) => {
                const angleDeg = -85 + i * 1.7;
                const rad = (angleDeg * Math.PI) / 180;
                const isMajor = i % 5 === 0;
                const tickLen = isMajor ? 26 : 13;

                const x1 = CENTER_X + (ARC_RADIUS - tickLen) * Math.cos(rad);
                const y1 = CENTER_Y + (ARC_RADIUS - tickLen) * Math.sin(rad);
                const x2 = CENTER_X + ARC_RADIUS * Math.cos(rad);
                const y2 = CENTER_Y + ARC_RADIUS * Math.sin(rad);

                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth={isMajor ? "1.8" : "0.8"}
                    opacity={isMajor ? "0.45" : "0.18"}
                  />
                );
              })}

              {/* Number Badges [01, 02, 03, 04] in warm coral squircles along the arc */}
              {EXPERIENCES.map((_, idx) => {
                const angleDeg = idx * STEP_ANGLE;
                const rad = (angleDeg * Math.PI) / 180;
                const bx = CENTER_X + (ARC_RADIUS + 44) * Math.cos(rad);
                const by = CENTER_Y + (ARC_RADIUS + 44) * Math.sin(rad);
                const isActive = activeIdx === idx;
                const badgeNum = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

                return (
                  <g
                    key={idx}
                    onClick={() => goToIndex(idx)}
                    className="cursor-pointer transition-transform duration-300 group"
                    transform={`translate(${bx}, ${by}) rotate(${angleDeg})`}
                    filter={isActive ? "url(#badgeShadow)" : undefined}
                  >
                    {/* Badge Card Rounded Rect - Large squircle */}
                    <rect
                      x="-32"
                      y="-26"
                      width="64"
                      height="52"
                      rx="18"
                      fill={isActive ? "#ff4d2e" : "#ff7052"}
                      fillOpacity={isActive ? "1" : "0.8"}
                      stroke="#ffffff"
                      strokeWidth={isActive ? "2.5" : "1.2"}
                      className="transition-all duration-300 group-hover:scale-105"
                    />

                    {/* Number Text */}
                    <text
                      x="0"
                      y="7"
                      textAnchor="middle"
                      fill="#ffffff"
                      className="text-lg font-bold tracking-tight select-none pointer-events-none"
                    >
                      {badgeNum}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Static Solid Horizontal Needle System (Matching nicecrate.com) */}
            <g className="pointer-events-none">
              {/* Main horizontal caliper beam from left edge to the arc ring */}
              <line
                x1="-100"
                y1={CENTER_Y}
                x2={CENTER_X + ARC_RADIUS}
                y2={CENTER_Y}
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-80"
              />

              {/* Red target circular ring pin right on the caliper circle */}
              <circle
                cx={CENTER_X + ARC_RADIUS}
                cy={CENTER_Y}
                r={7}
                fill="none"
                stroke="#ff4d2e"
                strokeWidth="2.5"
              />
              <circle
                cx={CENTER_X + ARC_RADIUS}
                cy={CENTER_Y}
                r={3}
                fill="#ff4d2e"
              />

              {/* Red extension tick pointing directly into the active badge */}
              <line
                x1={CENTER_X + ARC_RADIUS}
                y1={CENTER_Y}
                x2={CENTER_X + ARC_RADIUS + 28}
                y2={CENTER_Y}
                stroke="#ff4d2e"
                strokeWidth="2.5"
              />

              {/* Orange indicator arrow pointer along the arc at the active badge */}
              <polygon
                points={`${CENTER_X + ARC_RADIUS + 8},${CENTER_Y - 28} ${CENTER_X + ARC_RADIUS + 20},${CENTER_Y - 6} ${CENTER_X + ARC_RADIUS - 4},${CENTER_Y - 6}`}
                fill="#ff4d2e"
                className="filter drop-shadow(0 2px 4px rgba(255,77,46,0.4))"
              />
            </g>
          </svg>
        </div>

        {/* Right Column: Editorial Narrative & Career Detail (Matching nicecrate.com) */}
        <div ref={contentRef} className="lg:col-span-6 flex flex-col justify-center py-4 will-change-transform">
          {/* Chapter Pill & Category */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-md bg-[#18181b] dark:bg-white text-white dark:text-[#18181b] text-[11px] font-bold uppercase tracking-wider shadow-sm">
              CHAPTER 0{activeIdx + 1}
            </span>
            <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
              {activeExp.category || activeExp.period}
            </span>
          </div>

          {/* Big Editorial Headline with Purple Dot (Matching nicecrate.com) */}
          <h3 className="exp-title text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.12] flex items-baseline gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#9747ff] inline-block shrink-0 -translate-y-0.5 shadow-sm" />
            <span>{activeExp.role}</span>
          </h3>

          {/* Company & Location Metadata */}
          <div className="exp-meta mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)] font-medium">
            <span className="inline-flex items-center gap-1.5 text-[var(--text-primary)] font-semibold">
              <Briefcase className="w-4 h-4 text-[#ff4d2e]" />
              <span>{activeExp.company}</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[var(--text-muted)]" />
              <span>{activeExp.location}</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{activeExp.year}</span>
            </span>
          </div>

          {/* Narrative Story Description */}
          <p className="exp-desc mt-6 text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-xl">
            {activeExp.description}
          </p>

          {/* Skills & Technologies Tags */}
          <div className="exp-tags mt-8 flex flex-wrap gap-2">
            {activeExp.skills.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--badge-bg)] text-[var(--text-primary)] border border-[var(--card-border)] hover:border-[#ff4d2e] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Timeline Stepper: [01] [02] [03] [04] with UP NEXT */}
      <div className="pt-3 border-t border-[var(--card-border)] flex flex-wrap items-center justify-between gap-4 w-full">
        {/* Stepper Pills */}
        <div className="flex items-center gap-2">
          {EXPERIENCES.map((_, idx) => {
            const isActive = activeIdx === idx;
            const isPast = idx < activeIdx;
            const stepNum = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
            return (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                className={`w-9 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#ff4d2e] text-white shadow-md scale-105"
                    : isPast
                    ? "bg-[#18181b] dark:bg-white text-white dark:text-[#18181b] shadow-sm"
                    : "bg-[var(--bg-card)] border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]"
                }`}
              >
                {stepNum}
              </button>
            );
          })}
        </div>

        {/* Up Next & Prev/Next Controls */}
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
          {activeIdx < totalItems - 1 ? (
            <button
              onClick={() => goToIndex(activeIdx + 1)}
              className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[#ff4d2e] transition-colors cursor-pointer mr-2"
            >
              <span>UP NEXT</span>
              <span>→</span>
              <span className="font-semibold text-[var(--text-primary)] max-w-[140px] truncate">
                {EXPERIENCES[activeIdx + 1].company}
              </span>
            </button>
          ) : null}

          <button
            onClick={() => goToIndex(Math.max(0, activeIdx - 1))}
            disabled={activeIdx === 0}
            className="px-3 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--bg-card)] hover:border-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>
          <button
            onClick={() => goToIndex(Math.min(totalItems - 1, activeIdx + 1))}
            disabled={activeIdx === totalItems - 1}
            className="px-3.5 py-1.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

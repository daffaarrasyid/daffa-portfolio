"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("You");
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    // Only on pointer devices (desktop mouse/trackpad)
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    // Use GSAP quickTo for zero-garbage 120fps motion tracking
    const xTo = gsap.quickTo(cursorEl, "x", { duration: 0.12, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorEl, "y", { duration: 0.12, ease: "power3.out" });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to(cursorEl, { opacity: 1, duration: 0.2 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      gsap.to(cursorEl, { scale: 0.88, duration: 0.15, ease: "back.out(2)" });

      // Click ripple effect
      if (rippleRef.current) {
        gsap.fromTo(
          rippleRef.current,
          { scale: 0.4, opacity: 0.8 },
          { scale: 2.2, opacity: 0, duration: 0.45, ease: "power2.out" }
        );
      }
    };

    const onMouseUp = () => {
      setIsMouseDown(false);
      gsap.to(cursorEl, { scale: 1, duration: 0.25, ease: "back.out(3)" });
    };

    const onMouseLeave = () => {
      isVisible = false;
      gsap.to(cursorEl, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    // Interactive element detection for contextual FigJam tag feedback
    const attachHoverHandlers = () => {
      const interactives = document.querySelectorAll<HTMLElement>(
        "a, button, input, textarea, [role='button'], canvas"
      );

      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovered(true);
          const isCanvas = el.tagName.toLowerCase() === "canvas";
          const isButton = el.tagName.toLowerCase() === "button" || el.getAttribute("role") === "button";
          const isLink = el.tagName.toLowerCase() === "a";

          if (isCanvas) {
            setCursorText("Drag");
            gsap.to(tagRef.current, { backgroundColor: "#ff4d00", duration: 0.2 });
          } else if (isButton || isLink) {
            setCursorText("Click");
            gsap.to(tagRef.current, { backgroundColor: "#ff4d00", duration: 0.2 });
          }
        });

        el.addEventListener("mouseleave", () => {
          setIsHovered(false);
          setCursorText("You");
          gsap.to(tagRef.current, { backgroundColor: "#9747ff", duration: 0.2 });
        });
      });
    };

    attachHoverHandlers();
    const observer = new MutationObserver(attachHoverHandlers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none opacity-0 will-change-transform select-none hidden md:block"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      {/* Click ripple animation */}
      <div
        ref={rippleRef}
        className="absolute -top-4 -left-4 w-8 h-8 rounded-full border-2 border-[#ff4d2e] opacity-0 pointer-events-none"
      />

      {/* FigJam Iconic Arrow Pointer - Enlarged for distinct presence */}
      <svg
        className="w-6 h-6 -rotate-[15deg] drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 2L20.5 10.5L12 13L8 21.5L3 2Z"
          fill="#9747ff"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      {/* FigJam User Name Tag Pill - Enlarged and high-contrast */}
      <div
        ref={tagRef}
        className="absolute left-4 top-4 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white tracking-wide shadow-lg whitespace-nowrap transition-transform duration-200"
        style={{
          backgroundColor: isHovered ? "#ff4d2e" : "#9747ff",
          transform: isMouseDown ? "scale(0.92)" : "scale(1)",
        }}
      >
        <span>{cursorText}</span>
      </div>
    </div>
  );
}

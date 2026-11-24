"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const hasFinishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        onComplete: () => {
          setIsFinished(true);
          onCompleteRef.current?.();
        },
      });
    } else {
      setIsFinished(true);
      onCompleteRef.current?.();
    }
  }, []);

  useEffect(() => {
    const counterObj = { val: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          finish();
        },
      });

      tl.to(counterObj, {
        val: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          setProgress(Math.floor(counterObj.val));
        },
      });

      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: -15,
          duration: 0.35,
          ease: "power2.in",
        },
        "-=0.25"
      );

      tl.to(
        counterRef.current,
        {
          scale: 0.92,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        },
        "-=0.3"
      );
    }, containerRef);

    // Guaranteed fallback: auto-complete after 2.4s even if timeline is delayed
    const autoExitTimer = setTimeout(() => {
      finish();
    }, 2400);

    return () => {
      clearTimeout(autoExitTimer);
      ctx.revert();
    };
  }, [finish]);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      onClick={finish}
      title="Click anywhere to skip"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0e0e11] p-8 md:p-14 text-[#ededed] select-none cursor-pointer"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#ff4d00] animate-pulse"></span>
          <span>Daffa Studio v2.4</span>
        </div>
        <div>Creative Dev & AI</div>
      </div>

      {/* Center Counter */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div ref={textRef} className="text-xs md:text-sm tracking-widest text-neutral-400 mb-4 uppercase">
          Initializing Environment
        </div>
        <div className="overflow-hidden">
          <h1
            ref={counterRef}
            className="text-7xl md:text-9xl font-light tracking-tighter"
          >
            {progress < 10 ? `0${progress}` : progress}
            <span className="text-3xl md:text-4xl text-[#ff4d00] font-normal ml-1">
              %
            </span>
          </h1>
        </div>
        {/* Progress Bar Line */}
        <div className="w-48 md:w-64 h-[2px] bg-neutral-800 mt-6 overflow-hidden rounded-full">
          <div
            ref={progressLineRef}
            className="h-full bg-[#ff4d00] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between text-xs text-neutral-500 uppercase tracking-wider">
        <span>© 2024 M. DAFFA AR-RASYID</span>
        <span className="text-neutral-600 hover:text-neutral-400 transition-colors">
          Click anywhere to skip
        </span>
      </div>
    </div>
  );
}

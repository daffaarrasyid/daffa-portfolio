"use client";

import { useEffect, useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";
import gsap from "gsap";
import PillNav from "./PillNav";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Projects", href: "#projects" },
  { label: "Awards", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextDark = !isDark;
    const x = e.clientX;
    const y = e.clientY;

    if (toggleBtnRef.current) {
      gsap.fromTo(
        toggleBtnRef.current,
        { scale: 0.85, rotate: isDark ? -20 : 20 },
        { scale: 1, rotate: 0, duration: 0.5, ease: "back.out(2)" }
      );
    }

    if (
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches
    ) {
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as any).startViewTransition(() => {
        setIsDark(nextDark);
        if (nextDark) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 550,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setIsDark(nextDark);
      if (nextDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  };

  const handleNavClick = (item: { href?: string }, index: number, event: React.MouseEvent) => {
    if (item.href?.startsWith("#")) {
      event.preventDefault();
      const id = item.href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const LogoIcon = (
    <div className="w-full h-full flex items-center justify-center font-bold text-xs tracking-tighter text-[#ff4d00]">
      DA
    </div>
  );

  return (
    <header className="fixed top-4 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none">
      {/* Pill Nav Component from React Bits */}
      <div className="pointer-events-auto">
        <PillNav
          logo={LogoIcon}
          logoAlt="Daffa Studio"
          logoHref="#"
          items={NAV_ITEMS}
          theme={isDark ? "dark" : "light"}
          itemStyle="pill"
          hoverEffect="fill"
          indicator="dot"
          layout="split"
          surface="glass"
          size="md"
          onItemClick={handleNavClick}
        />
      </div>

      {/* Floating Right Actions: Status Badge & Theme Toggle */}
      <div className="flex items-center gap-2.5 pointer-events-auto">

        <button
          ref={toggleBtnRef}
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--card-border)] bg-[var(--bg-card)]/90 backdrop-blur-md text-[var(--text-primary)] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 text-neutral-800 transition-transform hover:-rotate-12" />
          )}
        </button>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import DotGrid from "@/components/DotGrid";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SmoothScroll>
      {/* Nice Crate inspired loading curtain reveal */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Global Interactive React Bits DotGrid (WebGL2 springy jelly & click shockwaves) */}
      <DotGrid
        dotSize={2}
        gap={10}
        baseColor="#9e9e9a"
        activeColor="#ff4d2e"
        proximity={130}
        shockRadius={300}
        shockStrength={4.5}
        opacity={0.6}
        mouseInteraction={true}
        clickShock={true}
      />

      {/* Studio interactive magnetic cursor */}
      <CustomCursor />

      {/* Floating studio navbar with light/dark transition toggle */}
      <Navbar />

      {/* Core Portfolio Sections */}
      <main className="relative">
        <Hero ready={isLoaded} />
        <About />
        <Experience ready={isLoaded} />
        <TechStack />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </SmoothScroll>
  );
}

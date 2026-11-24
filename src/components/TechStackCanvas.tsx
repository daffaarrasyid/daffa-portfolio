"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const SKILLS_LIST = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "PyTorch",
  "GSAP",
  "Three.js",
  "FastAPI",
  "TensorFlow",
  "Docker",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Git",
  "Figma",
  "OpenCV",
  "HuggingFace",
];

export default function TechStackCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check WebGL availability
    const checkWebGL = () => {
      try {
        const c = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) return;

    let isMounted = true;
    let animId: number;

    const width = mount.clientWidth || 400;
    const height = mount.clientHeight || 480;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 7.5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("Failed to initialize WebGLRenderer in TechStackCanvas:", e);
      return;
    }

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(animId);
    };
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost);

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Subtle inner glowing sphere mesh
    const innerSphereGeo = new THREE.SphereGeometry(2.2, 24, 24);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0xff4d00,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    sphereGroup.add(innerSphere);

    // Create 3D Text Sprites using Canvas textures
    const count = SKILLS_LIST.length;
    const radius = 3.0;

    const createTextCanvas = (text: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 256, 64);
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.roundRect?.(4, 4, 248, 56, 8);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 77, 0, 0.6)";
        ctx.lineWidth = 2;
        ctx.roundRect?.(4, 4, 248, 56, 8);
        ctx.stroke();

        ctx.font = 'bold 24px "Inter Tight", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 128, 32);
      }
      return canvas;
    };

    const textSprites: THREE.Sprite[] = [];

    // Distribute skills evenly on a sphere (Fibonacci lattice)
    const phi = Math.PI * (Math.sqrt(5) - 1); // Golden ratio

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const canvas = createTextCanvas(SKILLS_LIST[i]);
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;

      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
      });

      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(x * radius, y * radius, z * radius);
      sprite.scale.set(1.6, 0.4, 1);

      sphereGroup.add(sprite);
      textSprites.push(sprite);
    }

    // Connect points with subtle lines
    const linePositions: number[] = [];
    for (let i = 0; i < textSprites.length; i++) {
      for (let j = i + 1; j < textSprites.length; j++) {
        const dist = textSprites[i].position.distanceTo(textSprites[j].position);
        if (dist < 2.5) {
          linePositions.push(
            textSprites[i].position.x,
            textSprites[i].position.y,
            textSprites[i].position.z,
            textSprites[j].position.x,
            textSprites[j].position.y,
            textSprites[j].position.z
          );
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    lineGeo.computeBoundingSphere();

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.15,
    });
    const constellationLines = new THREE.LineSegments(lineGeo, lineMat);
    sphereGroup.add(constellationLines);

    // Mouse drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotSpeedX = 0;
    let rotSpeedY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      rotSpeedY = deltaX * 0.005;
      rotSpeedX = deltaY * 0.005;

      sphereGroup.rotation.y += rotSpeedY;
      sphereGroup.rotation.x += rotSpeedX;

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    dom.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // ResizeObserver for reliable dimension handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(mount);

    // Animation Loop
    const animate = () => {
      if (!isMounted) return;
      animId = requestAnimationFrame(animate);

      try {
        if (!isDragging) {
          // Natural continuous rotation
          sphereGroup.rotation.y += 0.003;
          sphereGroup.rotation.x += 0.001;

          // Inertia dampening
          rotSpeedX *= 0.95;
          rotSpeedY *= 0.95;
          sphereGroup.rotation.x += rotSpeedX;
          sphereGroup.rotation.y += rotSpeedY;
        }

        renderer.render(scene, camera);
      } catch (err) {
        console.warn("TechStackCanvas WebGL render error, pausing loop:", err);
        cancelAnimationFrame(animId);
      }
    };

    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      dom.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      dom.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      if (renderer) {
        renderer.domElement.removeEventListener("webglcontextlost", handleContextLost);
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      textSprites.forEach((s) => {
        s.material.map?.dispose();
        s.material.dispose();
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[400px] sm:h-[480px] lg:h-[520px] cursor-grab active:cursor-grabbing relative flex items-center justify-center select-none"
    />
  );
}

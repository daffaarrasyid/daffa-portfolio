"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
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
    const height = mount.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    // Renderer
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
      console.warn("Failed to initialize WebGLRenderer:", e);
      return;
    }

    // Context lost handling
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(animId);
    };
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost);

    // Group for objects
    const group = new THREE.Group();
    scene.add(group);

    // Central Studio Geometric Object (Torus Knot with sleek metallic/glass aesthetic)
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.38, 128, 32, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const knotMesh = new THREE.Mesh(geometry, material);
    group.add(knotMesh);

    // Subtle Outer Wireframe Ring
    const wireframeGeo = new THREE.TorusKnotGeometry(1.22, 0.39, 64, 16, 2, 3);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xff4d00,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    group.add(wireframeMesh);

    // Orbiting Particles
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.4 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeo.computeBoundingSphere();

    const particleMat = new THREE.PointsMaterial({
      color: 0xff4d00,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff4d00, 4, 15);
    pointLight1.position.set(4, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00d2ff, 3, 15);
    pointLight2.position.set(-4, -3, 2);
    scene.add(pointLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Handle Theme Change
    const updateThemeMaterials = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        material.color.setHex(0xe5e7eb);
        material.roughness = 0.2;
        material.metalness = 0.9;
        wireframeMat.opacity = 0.35;
        ambientLight.intensity = 1.0;
      } else {
        material.color.setHex(0x18181b);
        material.roughness = 0.15;
        material.metalness = 0.8;
        wireframeMat.opacity = 0.2;
        ambientLight.intensity = 1.4;
      }
    };

    updateThemeMaterials();
    const observer = new MutationObserver(updateThemeMaterials);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

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
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isMounted) return;
      animId = requestAnimationFrame(animate);

      try {
        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse lerp
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        // Group rotation
        knotMesh.rotation.x = elapsedTime * 0.25 + mouseY;
        knotMesh.rotation.y = elapsedTime * 0.35 + mouseX;
        wireframeMesh.rotation.x = knotMesh.rotation.x;
        wireframeMesh.rotation.y = knotMesh.rotation.y;

        // Floating bobbing
        group.position.y = Math.sin(elapsedTime * 1.2) * 0.12;

        // Orbit particles
        particles.rotation.y = -elapsedTime * 0.1;
        particles.rotation.x = elapsedTime * 0.05;

        renderer.render(scene, camera);
      } catch (err) {
        console.warn("HeroCanvas WebGL render error, pausing loop:", err);
        cancelAnimationFrame(animId);
      }
    };

    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      if (renderer) {
        renderer.domElement.removeEventListener("webglcontextlost", handleContextLost);
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      geometry.dispose();
      material.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[380px] sm:h-[450px] lg:h-[550px] cursor-grab active:cursor-grabbing flex items-center justify-center relative select-none"
    />
  );
}

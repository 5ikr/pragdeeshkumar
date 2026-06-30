"use client";

import { useRef, useEffect, useState } from "react";
import ClickSpark from "@/components/ClickSpark";
import { TwistingRibbon } from "@/components/ui/twisting-ribbon";
import GradualBlur from "../components/ui/GradualBlur";

interface Particle {
  width: number;
  height: number;
  left: number;
  top: number;
  opacity: number;
  duration: number;
  delay: number;
  variant: number;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 18 });
  const [particles, setParticles] = useState<Particle[]>([]);

  const letters = ["P", "O", "R", "T", "F", "O", "L", "I", "O"];

  // Generate particles only on the client, after mount, to avoid
  // hydration mismatches caused by Math.random() differing between
  // server and client renders.
  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 15 }, (_, i) => ({
      width: 2 + Math.random() * 3,
      height: 2 + Math.random() * 3,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.15 + Math.random() * 0.25,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 5,
      variant: i % 3,
    }));
    setParticles(generated);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lettersRef.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const letterX = rect.left + rect.width / 2;
        const letterY = rect.top + rect.height / 2;

        const distX = e.clientX - letterX;
        const distY = e.clientY - letterY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        const maxDist = 220;
        const strength = Math.max(0, 1 - distance / maxDist);

        const moveX = -distX * strength * 0.35;
        const moveY = -distY * strength * 0.35;
        const rotate = (distX / maxDist) * strength * 12;
        const scale = 1 + strength * 0.25;

        el.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(${scale})`;
      });

      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;
      setMousePos((prev) => ({
        x: prev.x + (xPercent - prev.x) * 0.05,
        y: prev.y + (yPercent - prev.y) * 0.05,
      }));
    };

    const handleMouseLeave = () => {
      lettersRef.current.forEach((el) => {
        if (el) el.style.transform = "translate(0px, 0px) rotate(0deg) scale(1)";
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { capture: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove, { capture: true });
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <ClickSpark
      sparkColor="#E1DCC9"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
    >
      <div
        ref={containerRef}
        className="relative w-full h-[100vh] bg-black overflow-hidden"
      >
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 z-50 pointer-events-none opacity-[0.35] mix-blend-overlay animate-grain"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch' result='noise'/%3E%3CfeColorMatrix in='noise' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 22 -10'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "100px 100px",
          }}
        />

        {/* Ambient drifting particles (client-generated to avoid hydration mismatch) */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#E1DCC9] pointer-events-none"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: p.opacity,
              animation: `float-${p.variant} ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Cursor-reactive breathing glow */}
        <div
          className="absolute w-[300px] h-[150px] sm:w-[400px] sm:h-[200px] md:w-[600px] md:h-[300px] pointer-events-none rounded-full opacity-40 blur-[80px] sm:blur-[100px] md:blur-[120px] transition-[left,top] duration-700 ease-out animate-pulse-slow"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 40%)",
          }}
        />

        {/* Ribbon with built-in right-to-left reveal */}
        <TwistingRibbon
          segments={400}
          waveSpeed={0.018}
          waveAmplitude={1}
          twistCycles={6}
          className="absolute inset-0 w-full h-full overflow-hidden z-20"
        />

        <div className="main-area w-full h-full flex items-center justify-center px-4">
          <div className="texxt text-white flex flex-col text-center">
            <div className="texxxt mb-3 sm:mb-5">
              <div className="portfolio text-4xl sm:text-6xl md:text-9xl lg:text-[150px] xl:text-[200px] leading-none">
                {letters.map((char, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      lettersRef.current[i] = el;
                    }}
                    className={`relative inline-block transform transition-transform duration-300 ease-out ${i % 2 === 0 ? "z-0" : "z-40"
                      }`}
                    style={{ willChange: "transform" }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="reveal-it absolute text-white/50 bottom-2 sm:bottom-4 text-xs sm:text-sm animate-pulse-slow">
            "Reveal it"
          </div>
        </div>
      </div>
    </ClickSpark>
  );
}

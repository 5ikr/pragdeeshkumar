"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import Image from "next/image";

// ── Word-by-word scroll reveal ─────────────────────────────────────────
function RevealText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [12, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.3em] will-change-transform"
    >
      {children}
    </motion.span>
  );
}

// ── Apple-style pill button ────────────────────────────────────────────
function AppleButton({ label = "View Projects" }: { label?: string }) {
  return (
    <motion.a
      href="#projects"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#E1DCC9] text-black font-medium text-sm sm:text-base overflow-hidden shadow-[0_0_0_1px_rgba(225,220,201,0.3),0_8px_24px_-8px_rgba(225,220,201,0.5)]"
    >
      <span className="relative z-10">{label}</span>
      <motion.span
        className="relative z-10"
        initial={{ x: 0 }}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        →
      </motion.span>
      {/* glossy sheen sweep on hover, classic Apple CTA feel */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </motion.a>
  );
}

export default function About() {
  return (
    <section className="relative w-full bg-black text-[#E1DCC9] overflow-hidden px-6 sm:px-12 lg:px-24 py-24 sm:py-32">
      {/* faint grid texture for depth, consistent with hero's grain motif */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#E1DCC9 1px, transparent 1px), linear-gradient(90deg, #E1DCC9 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block text-xs sm:text-sm uppercase tracking-[0.25em] text-[#E1DCC9]/50 mb-6"
        >
          About
        </motion.span>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] mb-12"
        >
          Pragdeesh
          <span className="text-[#E1DCC9]/40">.</span>
        </motion.h1>

        {/* Pic + intro row */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-[#E1DCC9]/15"
          >
            <Image
              src="/my-photo.jpg"
              alt="Pragdeesh"
              fill
              className="object-cover grayscale contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>

          <div>
            <RevealText
              text="I build interfaces that feel alive — motion-driven, detail-obsessed, and a little experimental. Three years deep in code, I care less about following trends and more about why something feels good to use."
              className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug text-[#E1DCC9]/90"
            />
          </div>
        </div>

        {/* About the team */}
        <div className="border-t border-[#E1DCC9]/10 pt-16 mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block text-xs sm:text-sm uppercase tracking-[0.25em] text-[#E1DCC9]/50 mb-6"
          >
            The Team
          </motion.span>

          <RevealText
            text="Behind every build is a small group of people who care way too much about pixels, performance, and the little transitions nobody asks for but everybody notices. We design, prototype, and ship — together, fast, and without unnecessary meetings."
            className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-[#E1DCC9]/80 max-w-3xl"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
            {["Design", "Frontend", "Motion", "Strategy"].map((role, i) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-[#E1DCC9]/10 rounded-xl px-4 py-5 text-center"
              >
                <span className="text-sm sm:text-base text-[#E1DCC9]/70">
                  {role}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-center gap-6 border-t border-[#E1DCC9]/10 pt-16"
        >
          <p className="text-lg sm:text-xl text-[#E1DCC9]/60 max-w-md">
            Curious what we've been building lately?
          </p>
          <AppleButton label="View Projects" />
        </motion.div>
      </div>
    </section>
  );
}

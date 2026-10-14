import React, { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useFinePointer } from "../../hooks/useFinePointer";

export function HeroArt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();

  // Mouse parallax motion values (normalized -1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax translation: max 12px, smoothed with soft spring
  const springConfig = { stiffness: 120, damping: 25 };
  const smoothX = useSpring(useTransform(mouseX, [-1, 1], [-12, 12]), springConfig);
  const smoothY = useSpring(useTransform(mouseY, [-1, 1], [-12, 12]), springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isFinePointer || prefersReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const heroArtSrc = `${import.meta.env.BASE_URL}hero/hero-art.webp`;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none"
    >
      {/* 6s Breathing Radial Cyan Glow behind art */}
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? { opacity: 0.5 }
            : { opacity: [0.35, 0.65, 0.35] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-4 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.25)_0%,rgba(56,189,248,0.06)_45%,transparent_75%)] pointer-events-none blur-2xl"
      />

      {/* Floating and Parallaying Art Container with Radial Edge Mask */}
      <motion.div
        style={
          isFinePointer && !prefersReducedMotion
            ? { x: smoothX, y: smoothY }
            : undefined
        }
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [-6, 6, -6],
              }
        }
        transition={{
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative w-full h-full flex items-center justify-center [mask-image:radial-gradient(circle_at_center,black_45%,transparent_80%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_45%,transparent_80%)]"
      >
        {!imageError ? (
          <img
            src={heroArtSrc}
            alt=""
            aria-hidden="true"
            width={600}
            height={600}
            fetchPriority="high"
            loading="eager"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain filter drop-shadow-[0_0_40px_rgba(56,189,248,0.35)]"
          />
        ) : (
          /* CSS-Only Graceful Fallback if image fails to load */
          <div
            aria-hidden="true"
            className="w-4/5 h-4/5 rounded-full relative flex items-center justify-center bg-[#0B0C10] border border-[#1E2430]"
          >
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(56,189,248,0.4)_0deg,transparent_90deg,rgba(56,189,248,0.6)_180deg,transparent_270deg,rgba(56,189,248,0.4)_360deg)] animate-spin [animation-duration:20s]" />
            <div className="w-3/4 h-3/4 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.5)_0%,rgba(18,20,28,0.9)_60%,transparent_100%)] blur-md" />
            <div className="w-1/2 h-1/2 rounded-full border border-[#38BDF8]/40 shadow-[0_0_30px_rgba(56,189,248,0.5)]" />
          </div>
        )}
      </motion.div>

      {/* Decorative Cyan HUD Orbit Elements */}
      <div
        aria-hidden="true"
        className="hidden sm:block absolute inset-2 rounded-full border border-[#1E2430]/60 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="hidden sm:block absolute inset-12 rounded-full border border-[#38BDF8]/10 pointer-events-none border-dashed"
      />

      {/* 6 CSS Particles (hidden on mobile and under reduced motion) */}
      {!prefersReducedMotion && (
        <div aria-hidden="true" className="hidden md:block pointer-events-none absolute inset-0">
          {[
            { top: "18%", left: "22%", delay: "0s", duration: "4s" },
            { top: "25%", right: "20%", delay: "1.2s", duration: "5s" },
            { bottom: "28%", left: "15%", delay: "2.1s", duration: "4.5s" },
            { bottom: "20%", right: "24%", delay: "0.8s", duration: "6s" },
            { top: "50%", left: "10%", delay: "1.5s", duration: "5.2s" },
            { top: "45%", right: "12%", delay: "3s", duration: "4.8s" },
          ].map((pt, i) => (
            <span
              key={i}
              style={{
                top: pt.top,
                left: pt.left,
                right: pt.right,
                bottom: pt.bottom,
                animationDelay: pt.delay,
                animationDuration: pt.duration,
              }}
              className="absolute w-1 h-1 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8] animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  );
}

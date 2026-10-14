import { motion, useReducedMotion } from "motion/react";

export interface MonogramProps {
  className?: string;
  size?: number;
}

export function Monogram({ className = "", size = 36 }: MonogramProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.5))",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative inline-flex items-center justify-center shrink-0 cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      aria-label="Ojas Pal Monogram (OP)"
    >
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Rounded-square structural border */}
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          rx="8"
          fill="#12141C"
          stroke="#1E2430"
          strokeWidth="1.5"
          className="transition-colors duration-200 group-hover:stroke-[#38BDF8]/40"
        />

        {/* Ring O */}
        <motion.circle
          cx="14"
          cy="18"
          r="6.5"
          stroke="currentColor"
          strokeWidth="2"
          initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* P Stem sharing stroke */}
        <motion.path
          d="M20.5 11.5V24.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* P Loop */}
        <motion.path
          d="M20.5 11.5H24.5C26.5 11.5 28 13 28 15C28 17 26.5 18.5 24.5 18.5H20.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.0, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Luminescent Cyan Dot */}
        <circle cx="28" cy="24.5" r="1.5" fill="#38BDF8" />
      </svg>
    </motion.div>
  );
}

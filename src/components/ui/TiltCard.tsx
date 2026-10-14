import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useFinePointer } from "../../hooks/useFinePointer";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  enableGlow?: boolean;
}

export function TiltCard({
  children,
  className = "",
  enableGlow = true,
  ...props
}: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Normalized pointer offset (-0.5 to 0.5)
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isFinePointer || prefersReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    px.set(x);
    py.set(y);
  };

  const handlePointerEnter = () => {
    if (isFinePointer && !prefersReducedMotion) {
      setIsHovered(true);
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    px.set(0);
    py.set(0);
  };

  const canTilt = isFinePointer && !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      style={{ perspective: 1000 }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`group ${className}`}
      {...props}
    >
      <motion.div
        style={
          canTilt
            ? {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
        animate={
          canTilt && isHovered
            ? {
                scale: 1.015,
                boxShadow: enableGlow
                  ? "0 0 0 1px rgba(56, 189, 248, 0.25), 0 20px 60px -20px rgba(56, 189, 248, 0.40)"
                  : undefined,
              }
            : {
                scale: 1,
                boxShadow: "0 0 0 1px transparent, 0 10px 30px -10px rgba(0, 0, 0, 0.5)",
              }
        }
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`relative w-full h-full rounded-[20px] transition-colors duration-300 ${
          isHovered ? "border-[#38BDF8]/40" : "border-[#1E2430]"
        } ${!isFinePointer ? "border-t-[#38BDF8]/30" : ""}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

import React from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { useFinePointer } from "../../hooks/useFinePointer";

export interface SpotlightSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightSurface({
  children,
  className = "",
  spotlightColor = "rgba(56, 189, 248, 0.08)",
  ...props
}: SpotlightSurfaceProps) {
  const isFinePointer = useFinePointer();
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);

  const sx = useSpring(mx, { stiffness: 300, damping: 30 });
  const sy = useSpring(my, { stiffness: 300, damping: 30 });

  const bg = useMotionTemplate`radial-gradient(600px circle at ${sx}px ${sy}px, ${spotlightColor}, transparent 40%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isFinePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const handlePointerLeave = () => {
    mx.set(-1000);
    my.set(-1000);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {isFinePointer && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{ background: bg }}
        />
      )}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

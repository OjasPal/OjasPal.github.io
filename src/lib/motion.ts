import type { Transition, Variants } from "motion/react";

/**
 * Standard tactile spring for button presses, hover lifts, and icon micro-interactions.
 */
export const tactileSpring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

/**
 * Softer spring for subtle parallax and mouse tracking.
 */
export const softSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 25,
};

/**
 * Reveal entrance variants: fade and rise from y: 20 to 0.
 */
export const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Container stagger animation variants.
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

/**
 * Skill badge item variants for staggered reveal.
 */
export const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

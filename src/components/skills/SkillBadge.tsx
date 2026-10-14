import { motion } from "motion/react";
import { tactileSpring, badgeVariants } from "../../lib/motion";

export interface SkillBadgeProps {
  name: string;
}

export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.div
      variants={badgeVariants}
      whileHover={{ y: -2 }}
      transition={tactileSpring}
      className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#12141C] border border-[#1E2430] hover:border-[#38BDF8]/50 hover:bg-[#1A1E29] transition-colors duration-200 cursor-default select-none shadow-sm"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] group-hover:shadow-[0_0_8px_#38BDF8] transition-shadow duration-200" />
      <span className="text-xs sm:text-sm font-medium text-[#F2F4F8] tracking-tight">
        {name}
      </span>
    </motion.div>
  );
}

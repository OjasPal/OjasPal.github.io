import { motion } from "motion/react";
import { profile } from "../../data/profile";
import { Reveal } from "../ui/Reveal";

export function ProofStrip() {
  return (
    <Reveal delay={0.2} className="w-full mt-12 sm:mt-16 lg:mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {profile.proofStats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col justify-between p-5 rounded-2xl bg-[#12141C]/80 backdrop-blur-md border border-[#1E2430] hover:border-[#38BDF8]/40 transition-colors"
          >
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#38BDF8] tracking-tight tabular-nums">
                {stat.value}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#8A90A0] leading-snug">
              {stat.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </Reveal>
  );
}

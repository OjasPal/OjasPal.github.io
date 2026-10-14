import { motion } from "motion/react";
import { skillCategories } from "../../data/skills";
import { SkillBadge } from "./SkillBadge";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";
import { staggerContainerVariants } from "../../lib/motion";

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      title="Technical Capabilities"
      subtitle="The frameworks, models, cloud platforms, and tooling I use across the full data-to-deployment cycle."
    >
      <div className="space-y-6 sm:space-y-8">
        {skillCategories.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.08}>
            <div className="rounded-2xl bg-[#12141C]/60 border border-[#1E2430] p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-12 hover:border-[#38BDF8]/30 transition-colors">
              {/* Left Column: Mono Category Label */}
              <div className="md:w-56 shrink-0">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                  0{index + 1}
                </span>
                <h3 className="text-base sm:text-lg font-display font-semibold text-[#F2F4F8] mt-1">
                  {group.category}
                </h3>
              </div>

              {/* Right Column: Flowing Badges */}
              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2.5 sm:gap-3 flex-1"
              >
                {group.items.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

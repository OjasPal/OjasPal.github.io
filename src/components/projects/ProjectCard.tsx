import { useState } from "react";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../../data/projects";
import { hasCaseStudy } from "../../data/caseStudies";
import { ProjectLinks } from "./ProjectLinks";
import { TiltCard } from "../ui/TiltCard";
import { SpotlightSurface } from "../ui/SpotlightSurface";

export interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const disclosureId = `project-details-${project.slug}`;
  const imageSrc = project.image
    ? `${import.meta.env.BASE_URL}${project.image.replace(/^\//, "")}`
    : null;

  return (
    <TiltCard className="h-full">
      <SpotlightSurface className="h-full rounded-[20px] bg-[#12141C] border border-[#1E2430] p-6 sm:p-8 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Cover Media Frame (16:10 ratio) */}
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#0B0C10] border border-[#1E2430]">
            {imageSrc && !imageError ? (
              <img
                src={imageSrc}
                alt={`Screenshot of the ${project.title} interface`}
                loading="lazy"
                width={800}
                height={500}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
              />
            ) : (
              /* Intentional styled placeholder panel */
              <div
                aria-hidden="true"
                className="w-full h-full relative flex flex-col items-center justify-center p-6 text-center hero-grid bg-[#0B0C10]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#12141C] border border-[#1E2430] flex items-center justify-center mb-3 text-[#38BDF8]">
                  <span className="font-mono text-base font-bold">
                    {project.index}
                  </span>
                </div>
                <p className="font-display font-semibold text-sm text-[#F2F4F8]">
                  {project.title}
                </p>
                <p className="font-mono text-[11px] text-[#8A90A0] mt-1 uppercase tracking-wider">
                  Screenshot coming soon
                </p>
              </div>
            )}

            {/* Subtle floating highlight tag over media */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#0B0C10]/80 backdrop-blur-md border border-[#1E2430] text-[11px] font-mono text-[#38BDF8]">
              {project.period}
            </div>
          </div>

          {/* Header Metadata: Index & Title */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs font-bold text-[#38BDF8]">
                {project.index}
              </span>
              <span className="text-[#1E2430]">·</span>
              <span className="font-mono text-xs text-[#8A90A0]">
                {project.period}
              </span>
            </div>

            <h3
              className={`${
                featured
                  ? "text-2xl sm:text-3xl font-bold"
                  : "text-xl sm:text-2xl font-semibold"
              } font-display text-[#F2F4F8] tracking-tight`}
            >
              {project.title}
            </h3>

            <p className="mt-2 text-sm sm:text-base text-[#8A90A0] leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Highlight Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{project.highlight}</span>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-[#0B0C10] border border-[#1E2430] text-[11px] font-mono text-[#8A90A0]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Optional Note */}
          {project.note && (
            <div className="p-3 rounded-lg bg-[#0B0C10]/60 border border-[#1E2430]/60 text-xs text-[#8A90A0] italic">
              {project.note}
            </div>
          )}

          {/* Technical Details: Dedicated Case Study Link or Inline Dropdown */}
          {hasCaseStudy(project.slug) ? (
            <div className="border-t border-[#1E2430] pt-4">
              <a
                href={`#/projects/${project.slug}`}
                aria-label={`View technical case study for ${project.title}`}
                className="group w-full flex items-center justify-between py-2.5 px-4 rounded-xl border border-[#38BDF8]/40 bg-[#12141C] text-[#F2F4F8] hover:bg-[#38BDF8] hover:text-[#0B0C10] hover:border-[#38BDF8] text-xs font-mono font-semibold transition-all duration-200 cursor-pointer"
              >
                <span>View technical details</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8] group-hover:text-[#0B0C10] group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          ) : (
            <div className="border-t border-[#1E2430] pt-4">
              <button
                type="button"
                onClick={() => setDetailsOpen(!detailsOpen)}
                aria-expanded={detailsOpen}
                aria-controls={disclosureId}
                className="w-full flex items-center justify-between py-2 text-xs font-mono font-medium text-[#8A90A0] hover:text-[#38BDF8] transition-colors cursor-pointer"
              >
                <span>{detailsOpen ? "Hide technical details" : "Show technical details"}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    detailsOpen ? "rotate-180 text-[#38BDF8]" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {detailsOpen && (
                  <motion.div
                    id={disclosureId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-3 space-y-2.5 text-xs text-[#8A90A0] leading-relaxed list-disc list-inside">
                      {project.bullets.map((bullet, idx) => (
                        <li key={idx} className="marker:text-[#38BDF8]">
                          <span className="text-[#F2F4F8]/90">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Action Button Row */}
        <div className="mt-6 pt-4 border-t border-[#1E2430]">
          <ProjectLinks title={project.title} links={project.links} />
        </div>
      </SpotlightSurface>
    </TiltCard>
  );
}

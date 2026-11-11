import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";

const SHOW_GITHUB_LINK_ON_ALL_PROJECTS = true;

export function AllProjects() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const originalTitle = document.title;
    document.title = "All Projects | Ojas Pal";

    const heading = document.getElementById("all-projects-heading");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.classList.add("outline-none");
      heading.focus({ preventScroll: true });
    }

    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <Section
      id="all-projects"
      index="01"
      title="All Projects"
      subtitle="Every project in one place, each with a technical deep dive."
    >
      <div className="space-y-8 sm:space-y-10">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#1E2430]">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#8A90A0] hover:text-[#38BDF8] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to featured projects</span>
          </a>

          <span className="font-mono text-xs text-[#8A90A0]">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <Reveal key={project.slug} delay={idx * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {SHOW_GITHUB_LINK_ON_ALL_PROJECTS && (
          <div className="pt-2">
            <a
              href="https://github.com/OjasPal?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A90A0] hover:text-[#38BDF8] transition-colors"
            >
              <span>More repositories on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </Section>
  );
}

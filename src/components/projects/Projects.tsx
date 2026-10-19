import { projects } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";
import { MoreProjectsTile } from "./MoreProjectsTile";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";

export function Projects() {
  const [featuredProject, ...remainingProjects] = projects;

  return (
    <Section
      id="projects"
      index="01"
      title="Featured Engineering Projects"
      subtitle="Selected Generative AI and Machine Learning applications built with strict retrieval grounding, secure cloud serving, and measured performance."
    >
      <div className="space-y-8 sm:space-y-10">
        {/* Featured Project: Full Width */}
        {featuredProject && (
          <Reveal>
            <ProjectCard project={featuredProject} featured={true} />
          </Reveal>
        )}

        {/* 2-Column Balanced Grid for Remaining 4 Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {remainingProjects.map((project, idx) => (
            <Reveal key={project.slug} delay={idx * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* Fifth Non-Project Tile: More on GitHub */}
        <Reveal delay={0.3}>
          <MoreProjectsTile />
        </Reveal>
      </div>
    </Section>
  );
}

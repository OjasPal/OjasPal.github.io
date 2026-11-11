import { ArrowRight, Layers } from "lucide-react";
import { projects, FEATURED_PROJECT_COUNT } from "../../data/projects";
import { SpotlightSurface } from "../ui/SpotlightSurface";

export function MoreProjectsTile() {
  const remainingCount = projects.length - FEATURED_PROJECT_COUNT;

  return (
    <a
      href="#/projects"
      aria-label={`View all ${projects.length} projects`}
      className="group block w-full rounded-[20px] overflow-hidden transition-all duration-300"
    >
      <SpotlightSurface className="p-6 sm:p-8 rounded-[20px] bg-[#12141C] border border-[#1E2430] group-hover:border-[#38BDF8]/40 transition-colors">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0C10] border border-[#1E2430] flex items-center justify-center text-[#F2F4F8] group-hover:text-[#38BDF8] group-hover:border-[#38BDF8]/40 transition-colors shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-[#8A90A0] uppercase">
                  ALL PROJECTS
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-display font-semibold text-[#F2F4F8] group-hover:text-[#38BDF8] transition-colors">
                View more projects
              </h3>
              <p className="text-xs sm:text-sm text-[#8A90A0] mt-0.5">
                {remainingCount} more{" "}
                {remainingCount === 1 ? "project" : "projects"} with full
                technical details.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B0C10] border border-[#1E2430] group-hover:border-[#38BDF8]/40 text-xs font-mono text-[#F2F4F8] group-hover:text-[#38BDF8] transition-colors shrink-0">
            <span>Browse all {projects.length}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>
      </SpotlightSurface>
    </a>
  );
}

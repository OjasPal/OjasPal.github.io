import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "../hero/Hero";
import { SpotlightSurface } from "../ui/SpotlightSurface";

export function MoreProjectsTile() {
  return (
    <a
      href="https://github.com/OjasPal?tab=repositories"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Explore more repositories on Ojas Pal's GitHub (opens in a new tab)"
      className="group block w-full rounded-[20px] overflow-hidden transition-all duration-300"
    >
      <SpotlightSurface className="p-6 sm:p-8 rounded-[20px] bg-[#12141C] border border-[#1E2430] group-hover:border-[#38BDF8]/40 transition-colors">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0C10] border border-[#1E2430] flex items-center justify-center text-[#F2F4F8] group-hover:text-[#38BDF8] group-hover:border-[#38BDF8]/40 transition-colors shrink-0">
              <GitHubIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-[#38BDF8] font-bold">
                  06
                </span>
                <span className="text-[#1E2430]">·</span>
                <span className="font-mono text-xs text-[#8A90A0] uppercase">
                  Open Source
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-display font-semibold text-[#F2F4F8] group-hover:text-[#38BDF8] transition-colors">
                More repositories and experiments on GitHub
              </h3>
              <p className="text-xs sm:text-sm text-[#8A90A0] mt-0.5">
                Explore data pipelines, Jupyter experiments, and utility scripts on @OjasPal
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B0C10] border border-[#1E2430] group-hover:border-[#38BDF8]/40 text-xs font-mono text-[#F2F4F8] group-hover:text-[#38BDF8] transition-colors shrink-0">
            <span>github.com/OjasPal</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </SpotlightSurface>
    </a>
  );
}

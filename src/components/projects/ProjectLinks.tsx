import { ArrowUpRight, Play } from "lucide-react";
import { GitHubIcon } from "../hero/Hero";

export interface ProjectLinksProps {
  title: string;
  links: {
    live: string | null;
    code: string | null;
    video: string | null;
  };
}

export function ProjectLinks({ title, links }: ProjectLinksProps) {
  const hasAnyLink = links.live || links.code || links.video;
  if (!hasAnyLink) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      {links.live && (
        <a
          href={links.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open live demo of ${title} (opens in a new tab)`}
          className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border border-[#38BDF8]/60 text-[#F2F4F8] hover:text-[#0B0C10] hover:bg-[#38BDF8] hover:border-[#38BDF8] text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
        >
          <span>Live demo</span>
          <ArrowUpRight className="w-4 h-4 text-[#38BDF8] group-hover:text-[#0B0C10] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      )}

      {links.code && (
        <a
          href={links.code}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View source code of ${title} on GitHub (opens in a new tab)`}
          className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border border-[#1E2430] bg-[#12141C] text-[#F2F4F8] hover:border-[#38BDF8]/40 hover:text-[#38BDF8] text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer"
        >
          <GitHubIcon className="w-4 h-4 text-[#8A90A0] group-hover:text-[#38BDF8] transition-colors" />
          <span>Code</span>
        </a>
      )}

      {links.video && (
        <a
          href={links.video}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch demo video of ${title} (opens in a new tab)`}
          className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border border-[#1E2430] bg-[#12141C] text-[#F2F4F8] hover:border-[#38BDF8]/40 hover:text-[#38BDF8] text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer"
        >
          <Play className="w-4 h-4 text-[#8A90A0] group-hover:text-[#38BDF8] transition-colors" />
          <span>Demo video</span>
        </a>
      )}
    </div>
  );
}

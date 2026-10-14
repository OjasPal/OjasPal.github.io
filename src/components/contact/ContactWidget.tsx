import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { profile } from "../../data/profile";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { GitHubIcon, LinkedInIcon } from "../hero/Hero";
import { SpotlightSurface } from "../ui/SpotlightSurface";
import { TiltCard } from "../ui/TiltCard";

export function ContactWidget() {
  const { copied, copy, feedback } = useCopyToClipboard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
      {/* 1. Email Widget with Mailto and Copy Button */}
      <TiltCard className="h-full">
        <SpotlightSurface className="h-full rounded-[20px] bg-[#12141C] border border-[#1E2430] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#0B0C10] border border-[#1E2430] flex items-center justify-center text-[#38BDF8] mb-6">
              <Mail className="w-6 h-6" />
            </div>

            <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] font-semibold">
              Direct Inquiries
            </span>
            <h3 className="text-xl font-display font-semibold text-[#F2F4F8] mt-1 mb-2">
              Email
            </h3>
            <p className="text-xs sm:text-sm text-[#8A90A0] leading-relaxed break-all font-mono">
              {profile.email}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-[#1E2430] flex items-center gap-3">
            <a
              href={`mailto:${profile.email}?subject=Project%20inquiry`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#38BDF8] text-[#0B0C10] font-semibold text-xs sm:text-sm hover:bg-[#38BDF8]/90 transition-colors"
            >
              <span>Compose</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => copy(profile.email)}
              aria-label="Copy email address to clipboard"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#0B0C10] border border-[#1E2430] text-[#F2F4F8] hover:border-[#38BDF8]/50 hover:text-[#38BDF8] text-xs font-mono transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#8A90A0]" />
                  <span>Copy</span>
                </>
              )}
            </button>

            {/* Screen reader announcement */}
            <span className="sr-only" role="status" aria-live="polite">
              {feedback}
            </span>
          </div>
        </SpotlightSurface>
      </TiltCard>

      {/* 2. LinkedIn Widget */}
      <TiltCard className="h-full">
        <SpotlightSurface className="h-full rounded-[20px] bg-[#12141C] border border-[#1E2430] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#0B0C10] border border-[#1E2430] flex items-center justify-center text-[#38BDF8] mb-6">
              <LinkedInIcon className="w-6 h-6" />
            </div>

            <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] font-semibold">
              Professional Network
            </span>
            <h3 className="text-xl font-display font-semibold text-[#F2F4F8] mt-1 mb-2">
              LinkedIn
            </h3>
            <p className="text-xs sm:text-sm text-[#8A90A0] leading-relaxed font-mono">
              linkedin.com/in/ojas-pal
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-[#1E2430]">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Ojas Pal on LinkedIn (opens in a new tab)"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#12141C] border border-[#1E2430] hover:border-[#38BDF8]/50 hover:text-[#38BDF8] hover:bg-[#1A1E29] text-[#F2F4F8] font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="w-4 h-4 text-[#8A90A0]" />
            </a>
          </div>
        </SpotlightSurface>
      </TiltCard>

      {/* 3. GitHub Widget */}
      <TiltCard className="h-full">
        <SpotlightSurface className="h-full rounded-[20px] bg-[#12141C] border border-[#1E2430] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#0B0C10] border border-[#1E2430] flex items-center justify-center text-[#38BDF8] mb-6">
              <GitHubIcon className="w-6 h-6" />
            </div>

            <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] font-semibold">
              Code & Architectures
            </span>
            <h3 className="text-xl font-display font-semibold text-[#F2F4F8] mt-1 mb-2">
              GitHub
            </h3>
            <p className="text-xs sm:text-sm text-[#8A90A0] leading-relaxed font-mono">
              github.com/OjasPal
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-[#1E2430]">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Ojas Pal's code repositories on GitHub (opens in a new tab)"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#12141C] border border-[#1E2430] hover:border-[#38BDF8]/50 hover:text-[#38BDF8] hover:bg-[#1A1E29] text-[#F2F4F8] font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>Follow on GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-[#8A90A0]" />
            </a>
          </div>
        </SpotlightSurface>
      </TiltCard>
    </div>
  );
}

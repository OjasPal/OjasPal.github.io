import { motion } from "motion/react";
import { ArrowDown, FileText } from "lucide-react";
import { profile } from "../../data/profile";
import { HeroArt } from "./HeroArt";
import { ProofStrip } from "./ProofStrip";
import { Reveal } from "../ui/Reveal";

// Inline brand SVGs as specified in Section 4
export function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.63 1.63 0 1 0 0 3.25 1.63 1.63 0 0 0 0-3.25z" />
    </svg>
  );
}

interface HeroProps {
  onOpenResumeModal?: () => void;
}

export function Hero({ onOpenResumeModal }: HeroProps) {
  return (
    <section
      id="hero"
      aria-label="Hero Overview"
      className="relative pt-12 sm:pt-20 lg:pt-28 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Background Faint 64px Grid Motif */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hero-grid pointer-events-none opacity-40"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: 7/12 Split Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#12141C] border border-[#1E2430]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                <span className="font-mono text-xs font-semibold tracking-wider text-[#F2F4F8] uppercase">
                  {profile.hero.eyebrow}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-bold uppercase tracking-tight text-[#F2F4F8] leading-[0.95] text-balance">
                Building practical{" "}
                <span className="text-[#38BDF8] drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]">
                  Generative AI
                </span>{" "}
                applications.
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="font-mono text-xs sm:text-sm tracking-[0.14em] uppercase text-[#8A90A0]">
                {profile.hero.roleLine}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg text-[#8A90A0] max-w-[65ch] leading-relaxed">
                {profile.hero.paragraph}
              </p>
            </Reveal>

            {/* Calls to Action */}
            <Reveal delay={0.25} className="w-full pt-2">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-xl bg-[#38BDF8] text-[#0B0C10] font-semibold text-sm hover:bg-[#38BDF8]/90 shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all cursor-pointer group"
                >
                  <span>Explore projects</span>
                  <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                </a>

                <button
                  type="button"
                  onClick={onOpenResumeModal}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-xl bg-[#12141C] text-[#F2F4F8] border border-[#1E2430] hover:border-[#38BDF8]/40 hover:bg-[#1A1E29] text-sm font-semibold transition-all cursor-pointer group"
                >
                  <FileText className="w-4 h-4 text-[#8A90A0] group-hover:text-[#38BDF8] transition-colors" />
                  <span>View resume</span>
                </button>

                {/* Understated GitHub & LinkedIn Links */}
                <div className="flex items-center gap-4 pl-2">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ojas Pal on GitHub (opens in a new tab)"
                    className="inline-flex items-center gap-1.5 text-xs text-[#8A90A0] hover:text-[#F2F4F8] transition-colors py-2"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    <span className="font-mono">GitHub</span>
                  </a>

                  <span className="text-[#1E2430]">/</span>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ojas Pal on LinkedIn (opens in a new tab)"
                    className="inline-flex items-center gap-1.5 text-xs text-[#8A90A0] hover:text-[#F2F4F8] transition-colors py-2"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                    <span className="font-mono">LinkedIn</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 5/12 Split Spatial Hero Art */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroArt />
          </div>
        </div>

        {/* Hero Proof Strip */}
        <ProofStrip />
      </div>
    </section>
  );
}

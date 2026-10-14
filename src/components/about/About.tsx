import { Mail } from "lucide-react";
import { HelpCards } from "./HelpCards";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";

export function About() {
  return (
    <Section
      id="about"
      index="03"
      title="Background & Engineering Focus"
      subtitle="Full-cycle Generative AI development: data preprocessing, retrieval, fine-tuning, and production-style cloud serving."
    >
      <div className="space-y-12 sm:space-y-16">
        {/* Two Editorial Paragraphs & Action Button */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8 space-y-5 text-base sm:text-lg text-[#8A90A0] leading-relaxed">
              <p>
                I'm Ojas, a third-year B.Tech student in AI & Data Science at USAR,
                GGSIPU. I like the whole path from data to deployment:
                preprocessing, retrieval, fine-tuning and serving models in
                production-style setups on Google Cloud.
              </p>
              <p>
                Recent work includes a RAG chatbot over a 637-page medical
                encyclopedia, an authenticated AI journal with semantic search,
                eleven models in one live Streamlit app, and a human-preference
                prediction model. I'm looking for AI/ML internships where I can
                keep shipping, and I take on select freelance projects.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start gap-4 p-6 rounded-2xl bg-[#12141C] border border-[#1E2430]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8]">
                Open for Collaboration
              </span>
              <p className="text-xs sm:text-sm text-[#8A90A0] leading-normal">
                Seeking AI/ML internship roles and available for select Gen AI client projects.
              </p>
              <a
                href="mailto:ojaspal.dev@gmail.com?subject=Project%20inquiry"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#38BDF8] text-[#0B0C10] font-semibold text-xs sm:text-sm hover:bg-[#38BDF8]/90 shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Start a conversation</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Where I Can Help Subheading & Cards */}
        <div>
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                Where I can help
              </span>
              <div className="h-[1px] flex-1 bg-[#1E2430]" />
            </div>
          </Reveal>

          <HelpCards />
        </div>
      </div>
    </Section>
  );
}

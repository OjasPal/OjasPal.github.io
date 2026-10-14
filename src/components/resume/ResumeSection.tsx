import { useState } from "react";
import { FileText, Download, ExternalLink, Eye } from "lucide-react";
import { profile } from "../../data/profile";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";
import { ResumeModal } from "./ResumeModal";
import { SpotlightSurface } from "../ui/SpotlightSurface";
import { TiltCard } from "../ui/TiltCard";
import { useFinePointer } from "../../hooks/useFinePointer";

export function ResumeSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const isFinePointer = useFinePointer();

  const resumeSrc = `${import.meta.env.BASE_URL}${profile.resumeFile.replace(/^\//, "")}`;

  const handleViewResume = () => {
    if (!isFinePointer || window.innerWidth < 768) {
      window.open(resumeSrc, "_blank", "noopener,noreferrer");
    } else {
      setModalOpen(true);
    }
  };

  return (
    <Section
      id="resume"
      index="05"
      title="Curriculum Vitae"
      subtitle="Comprehensive breakdown of RAG architectures, model fine-tuning benchmarks, and academic milestones."
    >
      <Reveal>
        <TiltCard>
          <SpotlightSurface className="rounded-[20px] bg-[#12141C] border border-[#1E2430] p-8 sm:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#0B0C10] border border-[#1E2430] flex items-center justify-center text-[#38BDF8] shrink-0 mt-1">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs text-[#38BDF8] font-semibold">
                      DOCUMENT
                    </span>
                    <span className="text-[#1E2430]">·</span>
                    <span className="font-mono text-xs text-[#8A90A0]">
                      One page · PDF
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F2F4F8]">
                    Ojas Pal — Resume
                  </h3>
                  <p className="text-sm text-[#8A90A0] mt-1.5 max-w-lg leading-relaxed">
                    Verified summary of RAG development, Google Cloud deployments, ML-DL portfolio benchmarks, and education.
                  </p>
                </div>
              </div>

              {/* Three Specific Actions */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleViewResume}
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#38BDF8] text-[#0B0C10] font-semibold text-xs sm:text-sm hover:bg-[#38BDF8]/90 shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>View resume</span>
                </button>

                <a
                  href={resumeSrc}
                  download="Ojas_Pal_Resume.pdf"
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#12141C] text-[#F2F4F8] border border-[#1E2430] hover:border-[#38BDF8]/50 hover:bg-[#1A1E29] text-xs sm:text-sm font-semibold transition-colors"
                >
                  <Download className="w-4 h-4 text-[#8A90A0]" />
                  <span>Download PDF</span>
                </a>

                <a
                  href={resumeSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-[#12141C] text-[#8A90A0] border border-[#1E2430] hover:border-[#38BDF8]/40 hover:text-[#F2F4F8] text-xs sm:text-sm font-medium transition-colors"
                  aria-label="Open resume PDF directly in a new browser tab"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in new tab</span>
                </a>
              </div>
            </div>
          </SpotlightSurface>
        </TiltCard>
      </Reveal>

      {/* Accessible Resume Modal */}
      <ResumeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Section>
  );
}

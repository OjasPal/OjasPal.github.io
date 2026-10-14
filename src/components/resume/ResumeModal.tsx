import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Download, FileText } from "lucide-react";
import { profile } from "../../data/profile";

export interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const resumeSrc = `${import.meta.env.BASE_URL}${profile.resumeFile.replace(/^\//, "")}`;

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.focus();

      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", handleKeyDown);
        triggerRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0C10]/85 backdrop-blur-md"
          />

          {/* Modal Content Panel */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-4xl h-[88vh] bg-[#12141C] border border-[#1E2430] rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2430] bg-[#0B0C10]/80">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#12141C] border border-[#1E2430] flex items-center justify-center text-[#38BDF8]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    id="resume-dialog-title"
                    className="font-display font-semibold text-sm sm:text-base text-[#F2F4F8]"
                  >
                    Ojas Pal — Resume
                  </h3>
                  <p className="text-[11px] font-mono text-[#8A90A0]">
                    One page · PDF document
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={resumeSrc}
                  download="Ojas_Pal_Resume.pdf"
                  className="p-2 rounded-lg border border-[#1E2430] bg-[#12141C] text-[#8A90A0] hover:text-[#38BDF8] hover:border-[#38BDF8]/40 transition-colors"
                  aria-label="Download resume PDF"
                >
                  <Download className="w-4 h-4" />
                </a>

                <a
                  href={resumeSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-[#1E2430] bg-[#12141C] text-[#8A90A0] hover:text-[#38BDF8] hover:border-[#38BDF8]/40 transition-colors"
                  aria-label="Open resume PDF in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="p-2 rounded-lg border border-[#1E2430] bg-[#12141C] text-[#8A90A0] hover:text-[#F2F4F8] hover:border-[#38BDF8]/40 transition-colors cursor-pointer"
                  aria-label="Close resume preview dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: PDF iframe viewer with visible fallback */}
            <div className="flex-1 bg-[#0B0C10] relative overflow-hidden flex flex-col">
              <iframe
                src={`${resumeSrc}#view=FitH`}
                title="Ojas Pal Resume PDF Preview"
                className="w-full flex-1 border-0"
              />

              {/* Fallback bar below or if preview does not load */}
              <div className="py-2.5 px-6 bg-[#12141C] border-t border-[#1E2430] flex items-center justify-between text-xs text-[#8A90A0]">
                <span>If the preview does not load in your browser:</span>
                <a
                  href={resumeSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#38BDF8] hover:underline font-medium inline-flex items-center gap-1"
                >
                  <span>Open PDF in new tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

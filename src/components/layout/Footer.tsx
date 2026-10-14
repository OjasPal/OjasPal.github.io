import { ArrowUp } from "lucide-react";
import { Monogram } from "./Monogram";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#1E2430] bg-[#0B0C10] py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Monogram size={32} />
            <div>
              <p className="text-sm font-medium text-[#F2F4F8]">
                © 2026 Ojas Pal
              </p>
              <p className="text-xs text-[#8A90A0]">
                Generative AI & Data Science
              </p>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#12141C] border border-[#1E2430] hover:border-[#38BDF8]/40 hover:text-[#38BDF8] text-xs font-mono text-[#8A90A0] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

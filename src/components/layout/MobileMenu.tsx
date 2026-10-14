import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import { Monogram } from "./Monogram";

export interface NavItem {
  id: string;
  number: string;
  label: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  activeId: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  items,
  activeId,
}: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Close on Esc key & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    firstFocusableRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#0B0C10]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8"
        >
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b border-[#1E2430] pb-6">
            <div className="flex items-center gap-3">
              <Monogram size={32} />
              <span className="font-display font-bold tracking-tight text-lg text-[#F2F4F8]">
                OJAS PAL
              </span>
            </div>
            <button
              ref={firstFocusableRef}
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2.5 rounded-xl border border-[#1E2430] bg-[#12141C] text-[#F2F4F8] hover:text-[#38BDF8] hover:border-[#38BDF8]/40 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links List */}
          <nav className="flex flex-col gap-6 my-auto py-8">
            {items.map((item, index) => {
              const isActive = activeId === item.id;
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={onClose}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.25 }}
                  className={`group flex items-center justify-between text-2xl sm:text-3xl font-display font-semibold transition-colors ${
                    isActive ? "text-[#38BDF8]" : "text-[#F2F4F8] hover:text-[#38BDF8]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#38BDF8] tracking-widest">
                      {item.number}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 ${
                      isActive ? "text-[#38BDF8]" : "text-[#8A90A0]"
                    }`}
                  />
                </motion.a>
              );
            })}
          </nav>

          {/* Bottom Action */}
          <div className="pt-6 border-t border-[#1E2430]">
            <a
              href="#contact"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#38BDF8] text-[#0B0C10] font-semibold text-base transition-colors hover:bg-[#38BDF8]/90"
            >
              <span>Let's talk</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

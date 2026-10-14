import React from "react";
import { Reveal } from "../ui/Reveal";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({
  id,
  index,
  title,
  subtitle,
  children,
  className = "",
  ...props
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`py-20 sm:py-28 lg:py-36 relative ${className}`}
      {...props}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#38BDF8]">
              {index}
            </span>
            <div className="w-8 h-[1px] bg-[#1E2430]" />
            <span className="font-mono text-xs tracking-wider uppercase text-[#8A90A0]">
              Chapter
            </span>
          </div>

          <h2
            id={headingId}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#F2F4F8] text-balance"
          >
            {title}
          </h2>

          {subtitle && (
            <p className="mt-3 text-base sm:text-lg text-[#8A90A0] max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </Reveal>

        {children}
      </div>
    </section>
  );
}

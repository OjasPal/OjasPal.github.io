import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  Layers,
  Sparkles,
  ExternalLink,
  Code2,
} from "lucide-react";
import { CaseStudy, getAdjacentCaseStudies } from "../../data/caseStudies";
import { ArchitectureMap } from "./ArchitectureMap";
import { ProjectLinks } from "../projects/ProjectLinks";
import { SpotlightSurface } from "../ui/SpotlightSurface";

export interface CaseStudyViewProps {
  caseStudy: CaseStudy;
  onBackToProjects: () => void;
}

export function CaseStudyView({
  caseStudy,
  onBackToProjects,
}: CaseStudyViewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [appendixOpen, setAppendixOpen] = useState(false);
  const [activeTocId, setActiveTocId] = useState<string>("overview");

  const tableOfContents = [
    { id: "overview", label: "Overview" },
    { id: "what-i-did", label: "What I Did" },
    { id: "architecture", label: "Architecture" },
    { id: "decisions", label: "Key Decisions" },
    { id: "problems", label: "Problems Solved" },
    { id: "security", label: "Security & Rules" },
    { id: "limitations", label: "Limitations" },
    ...(caseStudy.subProjects
      ? [{ id: "subprojects", label: "Observatory Catalog" }]
      : []),
    { id: "appendix", label: "Technical Appendix" },
  ];

  // Reading progress line
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 30,
    restDelta: 0.001,
  });

  // Adjacent project links
  const { prev, next } = getAdjacentCaseStudies(caseStudy.slug);

  // Scroll to top and set document title on route entry
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const originalTitle = document.title;
    document.title = `${caseStudy.title} — Technical Case Study | Ojas Pal`;

    // Accessibility: shift focus to page heading
    headingRef.current?.focus();

    return () => {
      document.title = originalTitle;
    };
  }, [caseStudy.title, caseStudy.slug]);

  // Track active TOC section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = tableOfContents.length - 1; i >= 0; i--) {
        const item = tableOfContents[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveTocId(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tableOfContents]);

  const imageSrc = `${import.meta.env.BASE_URL}${caseStudy.image.replace(/^\//, "")}`;

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#F2F4F8]">
      {/* 1. Slim Top Bar with Reading Progress */}
      <div className="sticky top-0 z-40 bg-[#12141C]/85 backdrop-blur-md border-b border-[#1E2430]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToProjects}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#8A90A0] hover:text-[#38BDF8] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>

          <div className="flex items-center gap-2 max-w-[50%] truncate">
            <span className="font-mono text-xs text-[#38BDF8] font-bold">
              {caseStudy.index}
            </span>
            <span className="text-[#1E2430]">/</span>
            <span className="text-xs sm:text-sm font-display font-semibold text-[#F2F4F8] truncate">
              {caseStudy.title}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="font-mono text-[11px] text-[#8A90A0] uppercase tracking-wider">
              Technical Case Study
            </span>
          </div>
        </div>

        {/* 2px Thin Cyan Reading-Progress Line */}
        <motion.div
          aria-hidden="true"
          className="h-[2px] bg-gradient-to-r from-[#38BDF8] via-[#38BDF8] to-cyan-300 origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Mobile / Tablet Horizontal Scrollable In-Page Chips */}
        <nav
          aria-label="Table of contents"
          className="lg:hidden flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#1E2430] no-scrollbar text-xs font-mono"
        >
          {tableOfContents.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTocId === item.id
                  ? "bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30 font-semibold"
                  : "bg-[#12141C] text-[#8A90A0] border border-[#1E2430]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 relative">
          {/* Main Case Study Article Column */}
          <article className="lg:col-span-9 space-y-16 sm:space-y-24">
            {/* Hero Section */}
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
                  PROJECT {caseStudy.index}
                </span>
                <span className="font-mono text-xs text-[#8A90A0]">
                  {caseStudy.period}
                </span>
                <span className="text-[#1E2430]">·</span>
                <span className="font-mono text-xs text-[#8A90A0]">
                  {caseStudy.domainTag}
                </span>
              </div>

              <h1
                ref={headingRef}
                tabIndex={-1}
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#F2F4F8] outline-none"
              >
                {caseStudy.title}
              </h1>

              <p className="text-lg sm:text-xl text-[#8A90A0] max-w-3xl leading-relaxed">
                {caseStudy.tagline}
              </p>

              {caseStudy.eventContext && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#12141C] border border-[#1E2430] text-xs font-mono text-[#8A90A0]">
                  <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{caseStudy.eventContext}</span>
                </div>
              )}

              {/* Collaborator Credit (e.g. EvalAI) */}
              {caseStudy.collaborator && (
                <div className="p-4 rounded-xl bg-[#12141C] border border-[#1E2430] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#38BDF8] block mb-0.5">
                      Collaborator Credit
                    </span>
                    <p className="text-xs text-[#8A90A0]">
                      {caseStudy.collaborator.roleNote}
                    </p>
                  </div>
                  <a
                    href={caseStudy.collaborator.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1E2430] bg-[#0B0C10] hover:border-[#38BDF8]/40 hover:text-[#38BDF8] text-xs font-mono shrink-0 text-[#F2F4F8] transition-colors"
                  >
                    <span>{caseStudy.collaborator.name}</span>
                    <ExternalLink className="w-3 h-3 text-[#8A90A0]" />
                  </a>
                </div>
              )}

              {/* Verified Headline Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {caseStudy.headlineMetrics.map((metric, idx) => (
                  <SpotlightSurface
                    key={idx}
                    className="p-5 rounded-xl bg-[#12141C] border border-[#1E2430]"
                  >
                    <span className="block font-display text-2xl sm:text-3xl font-bold text-[#38BDF8] mb-1">
                      {metric.value}
                    </span>
                    <span className="block font-mono text-xs font-semibold text-[#F2F4F8] uppercase tracking-wider mb-1">
                      {metric.label}
                    </span>
                    <p className="text-xs text-[#8A90A0] leading-relaxed">
                      {metric.context}
                    </p>
                  </SpotlightSurface>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div className="pt-2">
                <ProjectLinks title={caseStudy.title} links={caseStudy.links} />
              </div>

              {/* Cover Image Frame (16:10 format matching all projects) */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#0B0C10] border border-[#1E2430] mt-8">
                <img
                  src={imageSrc}
                  alt={`Interface preview of ${caseStudy.title}`}
                  className="w-full h-full object-cover object-top"
                  width={1200}
                  height={750}
                />
              </div>
            </header>

            {/* Section 1: Overview */}
            <section id="overview" className="space-y-6 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#1E2430]">
                <span className="font-mono text-xs font-bold text-[#38BDF8]">
                  01
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F2F4F8]">
                  Overview & Problem Statement
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-[#12141C] border border-[#1E2430] space-y-3">
                  <span className="block font-mono text-xs uppercase tracking-wider text-[#38BDF8]">
                    The Core Challenge
                  </span>
                  <p className="text-sm text-[#8A90A0] leading-relaxed">
                    {caseStudy.problemStatement}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[#12141C] border border-[#1E2430] space-y-3">
                  <span className="block font-mono text-xs uppercase tracking-wider text-[#38BDF8]">
                    What Was Built
                  </span>
                  <p className="text-sm text-[#8A90A0] leading-relaxed">
                    {caseStudy.plainDescription}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: What I Did (Editorial Layout) */}
            <section id="what-i-did" className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-[#1E2430]">
                <span className="font-mono text-xs font-bold text-[#38BDF8]">
                  02
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F2F4F8]">
                  What I Did
                </h2>
              </div>

              <p className="text-xs font-mono text-[#8A90A0] italic">
                {caseStudy.whatIDid.wordingNote}
              </p>

              <div className="space-y-4">
                {caseStudy.whatIDid.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#12141C] border border-[#1E2430] flex items-start gap-4"
                  >
                    <span className="font-mono text-xs text-[#38BDF8] font-bold shrink-0 mt-0.5">
                      [{String(idx + 1).padStart(2, "0")}]
                    </span>
                    <p className="text-sm text-[#F2F4F8]/90 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Architecture & System Flow */}
            <section id="architecture" className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-[#1E2430]">
                <span className="font-mono text-xs font-bold text-[#38BDF8]">
                  03
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F2F4F8]">
                  How It Works: Architecture
                </h2>
              </div>

              <p className="text-sm text-[#8A90A0] leading-relaxed">
                {caseStudy.architecture.summary}
              </p>

              {caseStudy.architecture.trustBoundaryDescription && (
                <div className="p-4 rounded-xl bg-[#12141C] border border-[#38BDF8]/20 flex items-start gap-3">
                  <ShieldAlert className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#8A90A0] leading-relaxed">
                    <span className="text-[#F2F4F8] font-medium">
                      Boundary Specification:{" "}
                    </span>
                    {caseStudy.architecture.trustBoundaryDescription}
                  </p>
                </div>
              )}

              {/* Data-Driven Interactive Architecture Map */}
              <ArchitectureMap
                nodes={caseStudy.architecture.nodes}
                edges={caseStudy.architecture.edges}
              />
            </section>

            {/* Section 4: Engineering Decisions */}
            <section id="decisions" className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-[#1E2430]">
                <span className="font-mono text-xs font-bold text-[#38BDF8]">
                  04
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F2F4F8]">
                  Engineering Decisions & Rationale
                </h2>
              </div>

              <div className="space-y-6">
                {caseStudy.decisions.map((decision, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-[#12141C] border border-[#1E2430] space-y-4"
                  >
                    <div>
                      <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider font-semibold block mb-1">
                        Context: {decision.context}
                      </span>
                      <h3 className="font-display font-bold text-base text-[#F2F4F8] mb-1">
                        Chosen Solution: {decision.choice}
                      </h3>
                      {decision.alternatives.length > 0 && (
                        <p className="text-xs font-mono text-[#8A90A0]">
                          Alternative considered: {decision.alternatives.join(", ")}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs leading-relaxed">
                      <div className="p-3 rounded-lg bg-[#0B0C10] border border-[#1E2430]">
                        <span className="font-mono text-[11px] text-[#38BDF8] block mb-1 font-semibold uppercase">
                          Technical Rationale
                        </span>
                        <p className="text-[#8A90A0]">{decision.rationale}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-[#0B0C10] border border-[#1E2430]">
                        <span className="font-mono text-[11px] text-[#8A90A0] block mb-1 font-semibold uppercase">
                          Engineering Trade-off
                        </span>
                        <p className="text-[#8A90A0]">{decision.tradeOff}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Problems Solved */}
            <section id="problems" className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-[#1E2430]">
                <span className="font-mono text-xs font-bold text-[#38BDF8]">
                  05
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F2F4F8]">
                  Production Problems Solved
                </h2>
              </div>

              <div className="space-y-4">
                {caseStudy.problemsSolved.map((prob, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-[#12141C] border border-[#1E2430] space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                      <h3 className="font-display font-bold text-base text-[#F2F4F8]">
                        {prob.issue}
                      </h3>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm">
                      <p className="text-[#8A90A0] leading-relaxed">
                        <span className="font-mono text-xs text-[#F2F4F8] font-semibold">
                          Root Cause:{" "}
                        </span>
                        {prob.rootCause}
                      </p>
                      <p className="text-[#8A90A0] leading-relaxed">
                        <span className="font-mono text-xs text-[#38BDF8] font-semibold">
                          Resolution:{" "}
                        </span>
                        {prob.resolution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: Security and Quality */}
            <section id="security" className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-[#1E2430]">
                <span className="font-mono text-xs font-bold text-[#38BDF8]">
                  06
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F2F4F8]">
                  Security Architecture & Quality Standards
                </h2>
              </div>

              <p className="text-sm text-[#8A90A0] leading-relaxed">
                {caseStudy.securityAndQuality.summary}
              </p>

              <div className="grid grid-cols-1 gap-3">
                {caseStudy.securityAndQuality.rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#12141C] border border-[#1E2430] flex items-start gap-3"
                  >
                    <span className="font-mono text-xs text-[#38BDF8] font-semibold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <p className="text-xs sm:text-sm text-[#8A90A0] leading-relaxed">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7: Limitations and Next Steps */}
            <section id="limitations" className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-[#1E2430]">
                <span className="font-mono text-xs font-bold text-[#38BDF8]">
                  07
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F2F4F8]">
                  Limitations & Engineering Boundaries
                </h2>
              </div>

              <div className="p-6 rounded-xl bg-[#12141C] border border-[#1E2430] space-y-4">
                <p className="text-xs font-mono text-[#8A90A0]">
                  Documented constraints observed directly in the implementation:
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-[#8A90A0] leading-relaxed list-disc list-inside">
                  {caseStudy.limitations.map((limit, idx) => (
                    <li key={idx} className="marker:text-[#38BDF8]">
                      <span>{limit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Conditional Sub-Projects Table (Model Observatory for ML-DL Portfolio) */}
            {caseStudy.subProjects && (
              <section id="subprojects" className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-[#1E2430]">
                  <span className="font-mono text-xs font-bold text-[#38BDF8]">
                    08
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F2F4F8]">
                    Model Observatory Catalog (11 Projects)
                  </h2>
                </div>

                <p className="text-sm text-[#8A90A0] leading-relaxed">
                  Eleven applied machine learning and deep learning applications unified in the Streamlit cloud deployment:
                </p>

                <div className="rounded-xl border border-[#1E2430] bg-[#12141C] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-[#1E2430] text-[#8A90A0] bg-[#0B0C10]/60">
                          <th className="py-3 px-4">#</th>
                          <th className="py-3 px-4">Project</th>
                          <th className="py-3 px-4">Domain</th>
                          <th className="py-3 px-4">Technical Approach</th>
                          <th className="py-3 px-4 text-right">Interactive Demo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1E2430]/60">
                        {caseStudy.subProjects.map((sub) => (
                          <tr
                            key={sub.index}
                            className="text-[#8A90A0] hover:bg-[#151822] transition-colors"
                          >
                            <td className="py-3 px-4 text-[#38BDF8] font-bold">
                              {sub.index}
                            </td>
                            <td className="py-3 px-4 text-[#F2F4F8] font-semibold">
                              {sub.title}
                            </td>
                            <td className="py-3 px-4 text-[#8A90A0]">{sub.domain}</td>
                            <td className="py-3 px-4 text-[11px] text-[#8A90A0] max-w-xs">
                              {sub.approach}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <a
                                href={sub.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[#38BDF8] hover:underline"
                              >
                                <span>Live Demo</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}

            {/* Technical Appendix (Collapsed by default) */}
            <section id="appendix" className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-[#1E2430]">
                <span className="font-mono text-xs font-bold text-[#38BDF8]">
                  {caseStudy.subProjects ? "09" : "08"}
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F2F4F8]">
                  Technical Appendix
                </h2>
              </div>

              <div className="rounded-xl border border-[#1E2430] bg-[#12141C] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setAppendixOpen(!appendixOpen)}
                  aria-expanded={appendixOpen}
                  className="w-full p-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#151822] transition-colors"
                >
                  <div>
                    <h3 className="font-display font-bold text-base text-[#F2F4F8]">
                      Runtime Constants, Models & Verified Source References
                    </h3>
                    <p className="text-xs font-mono text-[#8A90A0] mt-1">
                      {appendixOpen ? "Click to collapse" : "Click to expand verified parameters"}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8A90A0] transition-transform duration-200 ${
                      appendixOpen ? "rotate-180 text-[#38BDF8]" : ""
                    }`}
                  />
                </button>

                {appendixOpen && (
                  <div className="p-6 border-t border-[#1E2430] space-y-8 bg-[#0B0C10]">
                    {/* Constants Table */}
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] mb-3">
                        Verified Runtime Constants
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs font-mono">
                          <thead>
                            <tr className="border-b border-[#1E2430] text-[#8A90A0]">
                              <th className="pb-2">Parameter</th>
                              <th className="pb-2">Value</th>
                              <th className="pb-2">Scope</th>
                              <th className="pb-2">Details</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#1E2430]/60">
                            {caseStudy.appendix.constants.map((c, idx) => (
                              <tr key={idx} className="text-[#8A90A0]">
                                <td className="py-2.5 text-[#F2F4F8] font-semibold">
                                  {c.parameter}
                                </td>
                                <td className="py-2.5 text-[#38BDF8]">
                                  {c.value}
                                </td>
                                <td className="py-2.5">{c.scope}</td>
                                <td className="py-2.5 text-[11px]">{c.notes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Models & IAM Roles if present */}
                    {(caseStudy.appendix.models || caseStudy.appendix.iamRoles) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#1E2430]">
                        {caseStudy.appendix.models && (
                          <div>
                            <h4 className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] mb-3">
                              Model Hierarchy
                            </h4>
                            <div className="space-y-2 text-xs">
                              {caseStudy.appendix.models.map((m, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 rounded bg-[#12141C] border border-[#1E2430]"
                                >
                                  <div className="font-mono text-[#F2F4F8] mb-1">
                                    Primary:{" "}
                                    <span className="text-[#38BDF8]">{m.primary}</span>
                                  </div>
                                  {m.fallback && (
                                    <div className="font-mono text-[#8A90A0] mb-2">
                                      Fallback:{" "}
                                      <span className="text-[#F2F4F8]">{m.fallback}</span>
                                    </div>
                                  )}
                                  <p className="text-[11px] text-[#8A90A0]">{m.role}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {caseStudy.appendix.iamRoles && (
                          <div>
                            <h4 className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] mb-3">
                              Assigned IAM Roles
                            </h4>
                            <div className="space-y-2 text-xs">
                              {caseStudy.appendix.iamRoles.map((r, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 rounded bg-[#12141C] border border-[#1E2430]"
                                >
                                  <div className="font-mono text-[#38BDF8] text-[11px] font-semibold mb-1">
                                    {r.role}
                                  </div>
                                  <p className="text-[11px] text-[#8A90A0]">{r.purpose}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Source Code Direct Links */}
                    <div className="pt-4 border-t border-[#1E2430]">
                      <span className="font-mono text-xs text-[#8A90A0] block mb-2 uppercase">
                        Verified Source Code References
                      </span>
                      <div className="flex flex-wrap gap-2.5">
                        {caseStudy.appendix.sourceReferences.map((ref, idx) => (
                          <a
                            key={idx}
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1E2430] bg-[#12141C] text-xs font-mono text-[#F2F4F8] hover:border-[#38BDF8]/40 hover:text-[#38BDF8] transition-colors"
                          >
                            <Code2 className="w-3.5 h-3.5" />
                            <span>{ref.label}</span>
                            <ExternalLink className="w-3 h-3 text-[#8A90A0]" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Bottom Navigation: Previous / Next Projects & Return */}
            <div className="pt-10 border-t border-[#1E2430] space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prev ? (
                  <a
                    href={`#/projects/${prev.slug}`}
                    className="group p-4 rounded-xl border border-[#1E2430] bg-[#12141C] hover:border-[#38BDF8]/40 hover:bg-[#151822] transition-all flex flex-col justify-between"
                  >
                    <span className="text-[11px] font-mono text-[#8A90A0] flex items-center gap-1 group-hover:text-[#38BDF8] transition-colors">
                      <ArrowLeft className="w-3 h-3" />
                      <span>Previous Case Study</span>
                    </span>
                    <span className="font-display font-semibold text-sm text-[#F2F4F8] mt-1">
                      {prev.index} · {prev.title}
                    </span>
                  </a>
                ) : (
                  <div />
                )}

                {next ? (
                  <a
                    href={`#/projects/${next.slug}`}
                    className="group p-4 rounded-xl border border-[#1E2430] bg-[#12141C] hover:border-[#38BDF8]/40 hover:bg-[#151822] transition-all flex flex-col justify-between sm:text-right"
                  >
                    <span className="text-[11px] font-mono text-[#8A90A0] flex items-center justify-start sm:justify-end gap-1 group-hover:text-[#38BDF8] transition-colors">
                      <span>Next Case Study</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="font-display font-semibold text-sm text-[#F2F4F8] mt-1">
                      {next.index} · {next.title}
                    </span>
                  </a>
                ) : (
                  <div />
                )}
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={onBackToProjects}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#38BDF8]/60 text-[#F2F4F8] hover:bg-[#38BDF8] hover:text-[#0B0C10] transition-colors text-sm font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to All Projects</span>
                </button>
              </div>
            </div>
          </article>

          {/* Desktop Right Rail: Sticky Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <div className="p-5 rounded-2xl bg-[#12141C] border border-[#1E2430]">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1E2430]">
                  <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span className="font-mono text-xs font-semibold text-[#F2F4F8] uppercase tracking-wider">
                    Contents
                  </span>
                </div>

                <nav aria-label="Article sections" className="space-y-1.5">
                  {tableOfContents.map((item) => {
                    const isActive = activeTocId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-xs py-1.5 px-2 rounded-md font-mono transition-colors ${
                          isActive
                            ? "bg-[#38BDF8]/10 text-[#38BDF8] font-semibold border-l-2 border-[#38BDF8]"
                            : "text-[#8A90A0] hover:text-[#F2F4F8] hover:bg-[#151822]"
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </nav>

                <div className="mt-6 pt-4 border-t border-[#1E2430]">
                  <button
                    type="button"
                    onClick={onBackToProjects}
                    className="w-full py-2 px-3 rounded-lg text-xs font-mono font-medium text-center text-[#8A90A0] hover:text-[#38BDF8] border border-[#1E2430] hover:border-[#38BDF8]/40 transition-colors cursor-pointer"
                  >
                    ← All Projects
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { ArrowRight, ShieldCheck, ExternalLink, ChevronDown, Layers } from "lucide-react";
import { ArchitectureNode, ArchitectureEdge } from "../../data/caseStudies";

export interface ArchitectureMapProps {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export function ArchitectureMap({ nodes, edges }: ArchitectureMapProps) {
  const lanes = Array.from(new Set(nodes.map((n) => n.lane)));
  const initialId = nodes.find((n) => n.isTrustBoundaryGate)?.id || nodes[0]?.id || "";

  const [selectedNodeId, setSelectedNodeId] = useState<string>(initialId);
  const [expandedMobileNodeId, setExpandedMobileNodeId] = useState<string | null>(initialId);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const gridColsClass =
    lanes.length === 2
      ? "grid-cols-2"
      : lanes.length === 4
      ? "grid-cols-4"
      : "grid-cols-3";

  return (
    <div className="w-full rounded-2xl bg-[#12141C] border border-[#1E2430] p-4 sm:p-6 lg:p-8">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E2430]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-[#38BDF8]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#8A90A0]">
              System Pipeline & Architecture Flow
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8A90A0]">
            Select any architecture node to inspect its responsibility, verified inputs, outputs, and cloud configuration.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
            <span className="text-[#F2F4F8]">Active Selection</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-dashed border-[#38BDF8] text-[#38BDF8] flex items-center justify-center text-[9px] font-bold">
              !
            </span>
            <span className="text-[#8A90A0]">Key Gate</span>
          </div>
        </div>
      </div>

      {/* Desktop View: Multi-Lane Flow */}
      <div className="hidden lg:block pt-6">
        <div className={`grid ${gridColsClass} gap-6 relative`}>
          {lanes.map((lane) => {
            const laneNodes = nodes.filter((node) => node.lane === lane);
            const hasGate = laneNodes.some((n) => n.isTrustBoundaryGate);

            return (
              <div
                key={lane}
                className={`relative rounded-xl p-4 transition-colors ${
                  hasGate
                    ? "bg-[#0B0C10]/60 border border-[#38BDF8]/20"
                    : "bg-[#0B0C10]/30 border border-[#1E2430]/60"
                }`}
              >
                {/* Lane Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E2430]">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F2F4F8]">
                    {lane}
                  </span>
                  {hasGate && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
                      <ShieldCheck className="w-3 h-3" />
                      Key Gate Lane
                    </span>
                  )}
                </div>

                {/* Nodes in this lane */}
                <div className="space-y-4">
                  {laneNodes.map((node) => {
                    const isSelected = selectedNodeId === node.id;

                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeId(node.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedNodeId(node.id);
                          }
                        }}
                        aria-pressed={isSelected}
                        aria-label={`Inspect ${node.label} node`}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer outline-none relative group ${
                          isSelected
                            ? "bg-[#1A1E29] border-[#38BDF8] shadow-[0_0_16px_rgba(56,189,248,0.2)]"
                            : "bg-[#12141C] border-[#1E2430] hover:border-[#38BDF8]/40 hover:bg-[#151822]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span
                            className={`font-display font-semibold text-sm transition-colors ${
                              isSelected ? "text-[#38BDF8]" : "text-[#F2F4F8] group-hover:text-[#38BDF8]"
                            }`}
                          >
                            {node.label}
                          </span>
                          {node.isTrustBoundaryGate && (
                            <span
                              title="Auth & Security Enforcement Boundary"
                              className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40"
                            >
                              GATE
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#8A90A0] line-clamp-2 leading-relaxed">
                          {node.responsibility}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-[#1E2430]/60">
                          {node.technologies.slice(0, 2).map((tech) => (
                            <span
                              key={tech}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono text-[#8A90A0] bg-[#0B0C10] border border-[#1E2430]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Detailed Inspector */}
        <div className="mt-6 rounded-xl bg-[#0B0C10] border border-[#1E2430] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2430]">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#38BDF8] font-bold">
                  ACTIVE NODE
                </span>
                <span className="text-[#1E2430]">·</span>
                <span className="font-mono text-xs text-[#8A90A0]">
                  Lane: {selectedNode.lane}
                </span>
                {selectedNode.isTrustBoundaryGate && (
                  <>
                    <span className="text-[#1E2430]">·</span>
                    <span className="text-xs font-mono text-[#38BDF8] flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Cryptographic Trust Gate
                    </span>
                  </>
                )}
              </div>
              <h4 className="text-xl font-display font-bold text-[#F2F4F8] mt-1">
                {selectedNode.label}
              </h4>
            </div>

            {selectedNode.sourceLink && (
              <a
                href={selectedNode.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1E2430] bg-[#12141C] text-[#8A90A0] hover:text-[#38BDF8] hover:border-[#38BDF8]/40 text-xs font-mono transition-colors shrink-0"
              >
                <span>View server.js</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
            <div>
              <span className="block font-mono text-xs text-[#8A90A0] uppercase tracking-wider mb-2">
                Core Responsibility
              </span>
              <p className="text-sm text-[#F2F4F8] leading-relaxed">
                {selectedNode.responsibility}
              </p>
              <p className="text-xs text-[#8A90A0] mt-3 leading-relaxed">
                {selectedNode.details}
              </p>
            </div>

            <div>
              <span className="block font-mono text-xs text-[#8A90A0] uppercase tracking-wider mb-2">
                Verified Inputs & Outputs
              </span>
              <div className="space-y-3">
                {selectedNode.inputs && (
                  <div>
                    <span className="text-[11px] font-mono text-[#38BDF8] block mb-1">
                      INPUT:
                    </span>
                    <ul className="text-xs text-[#8A90A0] space-y-1 list-disc list-inside">
                      {selectedNode.inputs.map((inItem, idx) => (
                        <li key={idx} className="marker:text-[#38BDF8]">
                          {inItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedNode.outputs && (
                  <div>
                    <span className="text-[11px] font-mono text-[#38BDF8] block mb-1">
                      OUTPUT:
                    </span>
                    <ul className="text-xs text-[#8A90A0] space-y-1 list-disc list-inside">
                      {selectedNode.outputs.map((outItem, idx) => (
                        <li key={idx} className="marker:text-[#38BDF8]">
                          {outItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div>
              <span className="block font-mono text-xs text-[#8A90A0] uppercase tracking-wider mb-2">
                Technologies & Enforcements
              </span>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedNode.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded bg-[#12141C] border border-[#1E2430] text-xs font-mono text-[#F2F4F8]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Data Flow Edges from this Node */}
              <div>
                <span className="text-[11px] font-mono text-[#8A90A0] block mb-1.5 uppercase">
                  Downstream Data Connections:
                </span>
                <div className="space-y-1.5">
                  {edges
                    .filter((e) => e.from === selectedNode.id)
                    .map((edge, idx) => {
                      const target = nodes.find((n) => n.id === edge.to);
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs font-mono text-[#8A90A0]"
                        >
                          <ArrowRight className="w-3 h-3 text-[#38BDF8] shrink-0" />
                          <span className="text-[#F2F4F8]">{target?.label}</span>
                          <span className="text-[#8A90A0]">({edge.label})</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet View: Vertical Stack with Expandable Nodes */}
      <div className="lg:hidden pt-4 space-y-3">
        {nodes.map((node, index) => {
          const isExpanded = expandedMobileNodeId === node.id;

          return (
            <div
              key={node.id}
              className={`rounded-xl border transition-all ${
                isExpanded
                  ? "bg-[#1A1E29] border-[#38BDF8]/60"
                  : "bg-[#0B0C10] border-[#1E2430]"
              }`}
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedMobileNodeId(isExpanded ? null : node.id)
                }
                aria-expanded={isExpanded}
                className="w-full p-4 flex items-center justify-between gap-3 text-left cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-[#38BDF8] font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[#1E2430]">·</span>
                    <span className="font-mono text-[11px] text-[#8A90A0]">
                      {node.lane}
                    </span>
                    {node.isTrustBoundaryGate && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#38BDF8]/20 text-[#38BDF8]">
                        TRUST GATE
                      </span>
                    )}
                  </div>
                  <h4 className="font-display font-semibold text-sm text-[#F2F4F8]">
                    {node.label}
                  </h4>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-[#8A90A0] transition-transform duration-200 shrink-0 ${
                    isExpanded ? "rotate-180 text-[#38BDF8]" : ""
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-[#1E2430]/60 space-y-3">
                  <p className="text-xs text-[#8A90A0] leading-relaxed">
                    {node.responsibility}
                  </p>
                  <p className="text-xs text-[#8A90A0]/90 leading-relaxed">
                    {node.details}
                  </p>

                  <div className="pt-2">
                    <span className="block font-mono text-[11px] text-[#38BDF8] uppercase mb-1">
                      Technologies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {node.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-[#12141C] border border-[#1E2430] text-[11px] font-mono text-[#F2F4F8]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {node.sourceLink && (
                    <div className="pt-2">
                      <a
                        href={node.sourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#38BDF8] hover:underline"
                      >
                        <span>View server.js source</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

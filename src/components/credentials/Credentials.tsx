import { GraduationCap, Users, Award } from "lucide-react";
import { certifications, timeline } from "../../data/credentials";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";

export function Credentials() {
  return (
    <Section
      id="experience"
      index="04"
      title="Education & Certifications"
      subtitle="Academic foundation in AI & Data Science alongside industry-certified programs."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column (7 cols): Education & GDG Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <Reveal>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                Trajectory
              </span>
              <div className="h-[1px] flex-1 bg-[#1E2430]" />
            </div>
          </Reveal>

          <div className="relative pl-6 sm:pl-8 border-l border-[#1E2430] space-y-10">
            {timeline.map((item, idx) => {
              const isEducation = item.type === "education";
              const Icon = isEducation ? GraduationCap : Users;

              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="relative">
                    {/* Timeline Node */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#12141C] border border-[#38BDF8] flex items-center justify-center text-[#38BDF8]">
                      <Icon className="w-3 h-3" />
                    </div>

                    <div className="p-6 rounded-2xl bg-[#12141C] border border-[#1E2430] hover:border-[#38BDF8]/40 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-semibold text-[#38BDF8]">
                          {item.period || item.status}
                        </span>
                        {item.status && (
                          <span className="px-2 py-0.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-[11px] font-mono font-medium">
                            {item.status}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-display font-semibold text-[#F2F4F8]">
                        {item.title}
                      </h3>

                      <p className="text-sm text-[#8A90A0] mt-1">
                        {item.organization}
                        {item.location ? ` · ${item.location}` : ""}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): Static Certification Cards */}
        <div className="lg:col-span-5 space-y-6">
          <Reveal>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                Certifications
              </span>
              <div className="h-[1px] flex-1 bg-[#1E2430]" />
            </div>
          </Reveal>

          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <Reveal key={idx} delay={0.2 + idx * 0.1}>
                <div className="p-6 rounded-2xl bg-[#12141C] border border-[#1E2430] hover:border-[#38BDF8]/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0B0C10] border border-[#1E2430] flex items-center justify-center text-[#38BDF8] shrink-0 mt-0.5">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-display font-semibold text-[#F2F4F8] leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-mono text-[#8A90A0] mt-1.5">
                        Issuer: {cert.issuer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

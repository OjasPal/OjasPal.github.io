import { Layers, ShieldCheck, MonitorPlay } from "lucide-react";
import { SpotlightSurface } from "../ui/SpotlightSurface";
import { TiltCard } from "../ui/TiltCard";

const helpTopics = [
  {
    icon: Layers,
    title: "RAG chatbots over your documents",
    description:
      "Chunking, embeddings, vector search, and grounded answers, like the Medical RAG Chatbot grounded in 637 pages.",
    reference: "Medical RAG Chatbot",
  },
  {
    icon: ShieldCheck,
    title: "LLM apps with auth and cloud deployment",
    description:
      "Secured REST APIs with token verification, IAM roles, and serverless containers deployed on Google Cloud Run, like Personal Gemini Journal.",
    reference: "Personal Gemini Journal",
  },
  {
    icon: MonitorPlay,
    title: "ML models in a usable interface",
    description:
      "Model training, evaluation metrics, and low-latency interactive serving through Streamlit or FastAPI, like ML-DL Portfolio and EvalAI.",
    reference: "ML-DL Portfolio & EvalAI",
  },
];

export function HelpCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-6">
      {helpTopics.map((item, idx) => {
        const Icon = item.icon;
        return (
          <TiltCard key={idx} className="h-full">
            <SpotlightSurface className="h-full rounded-[20px] bg-[#12141C] border border-[#1E2430] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0B0C10] border border-[#1E2430] flex items-center justify-center text-[#38BDF8] mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-semibold text-[#F2F4F8] mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8A90A0] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1E2430]/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                <span className="font-mono text-[11px] text-[#8A90A0]">
                  Reference: {item.reference}
                </span>
              </div>
            </SpotlightSurface>
          </TiltCard>
        );
      })}
    </div>
  );
}

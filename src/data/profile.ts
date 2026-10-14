export interface Profile {
  name: string;
  shortBrand: string;
  email: string;
  github: string;
  linkedin: string;
  resumeFile: string;
  summary: string;
  education: {
    institution: string;
    degree: string;
    period: string;
  };
  role: {
    title: string;
    organization: string;
    status: string;
  };
  hero: {
    eyebrow: string;
    roleLine: string;
    paragraph: string;
  };
  proofStats: Array<{
    value: string;
    caption: string;
  }>;
}

export const profile: Profile = {
  name: "Ojas Pal",
  shortBrand: "OP",
  email: "ojaspal.dev@gmail.com",
  github: "https://github.com/OjasPal",
  linkedin: "https://www.linkedin.com/in/ojas-pal/",
  resumeFile: "/resume/Ojas_Pal_Resume.pdf",
  summary:
    "AI & Data Science undergraduate specializing in building RAG pipelines and deploying LLM applications on Google Cloud. Experienced across the full data-to-deployment cycle: data preprocessing, vector search, model fine-tuning and serving. Focused on shipping reliable, production-style GenAI systems.",
  education: {
    institution: "University School of Automation and Robotics (USAR), GGSIPU East Campus, Delhi",
    degree: "B.Tech in Artificial Intelligence & Data Science",
    period: "2024 to 2028",
  },
  role: {
    title: "AI/ML Coordinator",
    organization: "GDG on Campus USAR",
    status: "Current",
  },
  hero: {
    eyebrow: "OJAS PAL",
    roleLine: "Generative AI · RAG · Google Cloud",
    paragraph:
      "I build RAG pipelines and deploy LLM applications on Google Cloud, from data preprocessing and vector search to fine-tuning and serving. Third-year B.Tech, AI & Data Science. Seeking AI/ML internships, and open to freelance projects.",
  },
  proofStats: [
    {
      value: "93.6%",
      caption: "validation accuracy, 46-breed image classifier",
    },
    {
      value: "<45 ms",
      caption: "top-2 vector lookups on Pinecone",
    },
    {
      value: "25 to 30 ms",
      caption: "CPU inference on Streamlit Cloud",
    },
  ],
};

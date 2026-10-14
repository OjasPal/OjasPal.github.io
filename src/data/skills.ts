export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Python", "C++", "JavaScript"],
  },
  {
    category: "Generative AI",
    items: [
      "LangChain",
      "RAG",
      "Groq API",
      "Gemini API",
      "Ollama",
      "HuggingFace",
      "RoBERTa",
    ],
  },
  {
    category: "ML & Deep Learning",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "Pandas"],
  },
  {
    category: "Cloud & Data",
    items: [
      "Pinecone",
      "Firebase Auth",
      "Cloud Firestore",
      "Google Cloud Run",
    ],
  },
  {
    category: "Backend & UI",
    items: ["FastAPI", "Flask", "Express.js", "React", "Streamlit"],
  },
  {
    category: "Tools",
    items: ["Git & GitHub"],
  },
];

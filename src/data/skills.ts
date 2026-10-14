export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Python", "C++"],
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
    ],
  },
  {
    category: "ML & Deep Learning",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "RoBERTa", "Pandas"],
  },
  { category: "Concepts", 
    items: ["Computer Vision", "NLP", "Recommender Systems"],
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
    items: ["FastAPI", "Flask", "Streamlit"],
  },
  {
    category: "Tools",
    items: ["Git & GitHub", "Jupyter Notebook"],
  },
];

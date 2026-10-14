export type Project = {
  slug: string;
  index: string;
  title: string;
  period: string;
  tagline: string;
  highlight: string;
  stack: string[];
  bullets: string[];
  note: string | null;
  image: string | null; // path under public/, e.g. /projects/personal-gemini-journal.webp
  links: { live: string | null; code: string | null; video: string | null };
};

export const projects: Project[] = [
  {
    slug: "personal-gemini-journal",
    index: "01",
    title: "Personal Gemini Journal",
    period: "September 2026",
    tagline: "Authenticated AI journaling app with contextual memory and semantic search.",
    highlight: "9 REST endpoints, every one token-verified",
    stack: [
      "Gemini API",
      "React",
      "Vite",
      "Node.js",
      "Express",
      "Firebase Auth",
      "Cloud Firestore",
      "Secret Manager",
      "Google Cloud Run",
    ],
    bullets: [
      "Wrote Firebase Auth middleware that verifies the ID token, with a revocation check, on all 9 REST endpoints. Entries live under /users/{uid}, so one user cannot read another user's data.",
      "Fetches the Gemini key from Secret Manager at runtime with a 1-hour in-memory cache. The Cloud Run service account has only 3 IAM roles and no keys sit in the repo.",
      "Built ‘Ask My Journal’, a search over past entries using Gemini embeddings plus keyword scoring. Each reply also pulls the last 3 entries as context with zero extra API calls.",
    ],
    note: "Built for the Gen AI Academy APAC ideathon.",
    image: "/projects/personal-gemini-journal.webp",
    links: {
      live: "https://journal-frontend-931033287675.us-central1.run.app",
      code: "https://github.com/OjasPal/Personal-Gemini-Journal",
      video: "https://youtu.be/dzPP3nAXzfA",
    },
  },
  {
    slug: "medical-rag-chatbot",
    index: "02",
    title: "Medical RAG Chatbot",
    period: "September 2026",
    tagline: "Retrieval-augmented medical assistant grounded in a 637-page medical encyclopedia.",
    highlight: "5,800+ chunks, top-2 retrieval in under 45 ms",
    stack: [
      "Python",
      "LangChain",
      "Groq API (gpt-oss-20b)",
      "Pinecone",
      "HuggingFace (bge-small-en-v1.5)",
      "Flask",
      "Google Cloud Run",
    ],
    bullets: [
      "Split a 637-page medical encyclopedia into 5,800+ chunks, embedded them with bge-small-en-v1.5 (384-dim) and indexed them in Pinecone. Top-2 lookups return in under 45 ms.",
      "Passed the retrieved passages to gpt-oss-20b on Groq through LangChain, with a strict prompt that keeps answers tied to the source text and blocks non-medical questions.",
      "Deployed on Cloud Run (2 GiB, 2 vCPU, 8 threads). Lazy-loading the embedding model gives sub-second server startup, so health checks pass.",
    ],
    note: null,
    image: "/projects/medical-rag-chatbot.webp",
    links: {
      live: "https://medical-chatbot-1032077414344.asia-south2.run.app",
      code: "https://github.com/OjasPal/Medical-RAG-Chatbot",
      video: null,
    },
  },
  {
    slug: "ml-dl-portfolio",
    index: "03",
    title: "ML-DL Portfolio",
    period: "October 2026",
    tagline: "Eleven models, eight ML and three deep learning, in one multi-page Streamlit app.",
    highlight: "11 models, 93.6% validation accuracy on the 46-breed classifier",
    stack: [
      "Python",
      "Streamlit",
      "scikit-learn",
      "CatBoost",
      "PyTorch",
      "TensorFlow",
      "Keras",
      "OpenCV",
    ],
    bullets: [
      "Rebuilt 11 old Jupyter notebooks (8 ML, 3 DL) as one multi-page Streamlit app. Models are saved once as joblib, .pth and .keras files and loaded with @st.cache_resource, so pages do not retrain on load.",
      "Replaced an ~8 GB precomputed similarity matrix (32,833 songs) with per-query cosine similarity, so the Spotify page fits Streamlit Community Cloud's 2.7 GB memory limit.",
      "Fine-tuned EfficientNet-B0 in two stages on 46 breeds merged from Oxford-IIIT Pet and Stanford Dogs. It reached 93.6% validation accuracy and predicts in 25 to 30 ms on Streamlit Cloud's CPU.",
    ],
    note: null,
    image: "/projects/ml-dl-portfolio.webp",
    links: {
      live: "https://ojaspal-ml-dl-portfolio.streamlit.app",
      code: "https://github.com/OjasPal/ML-DL-Portfolio",
      video: null,
    },
  },
  {
    slug: "evalai",
    index: "04",
    title: "EvalAI",
    period: "August 2026",
    tagline: "LLM human preference prediction: which of two responses would a person prefer?",
    highlight: "61.17% accuracy on a 3,900+ sample evaluation set",
    stack: [
      "Python",
      "RoBERTa",
      "FastAPI",
      "Ollama (Llama 3.2, Qwen 2.5)",
      "Streamlit",
    ],
    bullets: [
      "Fine-tuned a RoBERTa transformer on the Arena Human Preference 55K dataset to predict which LLM response humans prefer.",
      "Achieved 61.17% accuracy on a 3,900+ sample evaluation set, validated with F1-Score, ROC-AUC and confusion matrices.",
      "Orchestrated local dual-model inference via Ollama (Llama 3.2 and Qwen 2.5), served through FastAPI with a Streamlit UI.",
    ],
    note: "Runs locally via Ollama, so there is no hosted demo.",
    image: "/projects/evalai.webp",
    links: {
      live: null,
      code: "https://github.com/OjasPal/EvalAI",
      video: "https://youtu.be/BvUrBhxuUrc",
    },
  },
];

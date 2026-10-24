export interface ArchitectureNode {
  id: string;
  label: string;
  lane: string;
  responsibility: string;
  inputs?: string[];
  outputs?: string[];
  technologies: string[];
  details: string;
  sourceLink?: string;
  isTrustBoundaryGate?: boolean;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label: string;
}

export interface EngineeringDecision {
  context: string;
  choice: string;
  alternatives: string[];
  rationale: string;
  tradeOff: string;
}

export interface ProblemSolved {
  issue: string;
  rootCause: string;
  resolution: string;
}

export interface MetricItem {
  label: string;
  value: string;
  context: string;
}

export interface TechnicalConstant {
  parameter: string;
  value: string;
  scope: string;
  notes: string;
}

export interface SubProjectRow {
  index: string;
  title: string;
  domain: string;
  approach: string;
  liveUrl: string;
}

export interface CollaboratorInfo {
  name: string;
  linkedinUrl: string;
  roleNote: string;
}

export interface SourceCodeRef {
  label: string;
  url: string;
}

export interface CaseStudy {
  slug: string;
  index: string;
  title: string;
  period: string;
  domainTag: string;
  tagline: string;
  plainDescription: string;
  problemStatement: string;
  eventContext?: string;
  headlineMetrics: MetricItem[];
  links: {
    live: string | null;
    code: string | null;
    video: string | null;
  };
  image: string;
  collaborator?: CollaboratorInfo;
  whatIDid: {
    wordingNote: string;
    items: string[];
  };
  architecture: {
    summary: string;
    trustBoundaryDescription?: string;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  decisions: EngineeringDecision[];
  problemsSolved: ProblemSolved[];
  securityAndQuality: {
    summary: string;
    rules: string[];
  };
  limitations: string[];
  subProjects?: SubProjectRow[];
  appendix: {
    constants: TechnicalConstant[];
    models?: {
      primary: string;
      fallback?: string;
      role: string;
    }[];
    iamRoles?: {
      role: string;
      purpose: string;
    }[];
    endpointsSummary?: string;
    sourceReferences: SourceCodeRef[];
  };
}

export const projectOrder = [
  "personal-gemini-journal",
  "medical-rag-chatbot",
  "ml-dl-portfolio",
  "evalai",
  "hirely",
];

export const caseStudies: Record<string, CaseStudy> = {
  "personal-gemini-journal": {
    slug: "personal-gemini-journal",
    index: "01",
    title: "Personal Gemini Journal",
    period: "September 2026",
    domainTag: "Generative AI & Cloud Architecture",
    tagline:
      "A per-user AI journal where Gemini remembers earlier entries across sessions.",
    plainDescription:
      "Sign in with Google, write journal entries, and converse with Gemini regarding them. Each user's entries and memories are isolated under their own authenticated account path. The AI draws on recent entries and relevant older memories when formulating responses, with an 'Ask My Journal' feature to query past entries.",
    problemStatement:
      "Many rapidly prototyped generative AI applications ship with hardcoded credentials, client-side model calls, shared databases, and no strict authentication boundary. This project was engineered security-first with an explicit rulebook that every backend endpoint was reviewed against.",
    eventContext:
      "Built for the #AccelerateAIwithCloudRun ideathon (Google Cloud Gen AI Academy, APAC).",
    headlineMetrics: [
      {
        label: "Verified Endpoints",
        value: "9 / 9",
        context:
          "REST endpoints verified server-side with checkRevoked token validation",
      },
      {
        label: "Runtime IAM Roles",
        value: "3 Roles",
        context:
          "Granted to the Cloud Run runtime service account with no file-based keys",
      },
    ],
    links: {
      live: "https://journal-frontend-931033287675.us-central1.run.app",
      code: "https://github.com/OjasPal/Personal-Gemini-Journal",
      video: "https://youtu.be/dzPP3nAXzfA",
    },
    image: "/projects/personal-gemini-journal.webp",
    whatIDid: {
      wordingNote:
        "My role covered specifying the system, defining its security rules, deploying it on Google Cloud, and reviewing the code.",
      items: [
        "Defined the security requirements: a written rulebook of seven non-negotiable rules (server-side token verification, per-user data isolation, secrets in Secret Manager, server-side input validation, least-privilege IAM, pinned dependencies, no leaked errors) that every endpoint was reviewed against.",
        "Specified the features and architecture: the two-service Cloud Run layout, the Firebase Auth token exchange flow, and the memory ranking design.",
        "Reviewed the backend implementation, identifying outdated model identifiers and incorrect dependency versions during review cycles.",
        "Configured and managed cloud infrastructure: Google Cloud and Firebase setup, IAM permissions, Secret Manager lifecycle, Cloud Run deployments, and production runtime debugging.",
      ],
    },
    architecture: {
      summary:
        "Divided across two Cloud Run services: a static React client and an Express backend proxy. All persistent data lives in Firestore partitioned under users/{uid}/entries and users/{uid}/memories.",
      trustBoundaryDescription:
        "A strict trust boundary separates the public browser client from the backend. The client never talks directly to Firestore or Secret Manager; the backend extracts UID only from the verified cryptographic ID token.",
      nodes: [
        {
          id: "client",
          label: "React Client",
          lane: "Browser",
          responsibility:
            "Serves the single-page application interface, triggers Firebase Google authentication, and renders sanitized Markdown responses.",
          technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
          inputs: ["User journal reflections", "Query prompts"],
          outputs: ["HTTPS requests with Bearer ID token"],
          details:
            "Replaced the initial single-file prototype. Formats Gemini responses using marked and DOMPurify.",
        },
        {
          id: "auth-gate",
          label: "Auth & Rate Limit Gate",
          lane: "Backend (Cloud Run)",
          responsibility:
            "Enforces trust boundary: checks token revocation with Firebase Admin SDK, extracts UID, and executes token-bucket throttling.",
          technologies: ["Node.js", "Express", "Firebase Admin SDK"],
          inputs: ["HTTP Bearer Authorization header"],
          outputs: ["Verified UID context (users/{uid})", "401/429 status on failure"],
          details:
            "Every one of the 9 REST endpoints calls checkRevoked. In-memory token-bucket allows 10 burst requests, replenishing 1 token every 6 seconds.",
          sourceLink:
            "https://github.com/OjasPal/Personal-Gemini-Journal/blob/master/backend/server.js",
          isTrustBoundaryGate: true,
        },
        {
          id: "secret-mgr",
          label: "Secret Manager Client",
          lane: "Google Cloud Services",
          responsibility:
            "Securely serves the Gemini API key without embedding tokens in files, container images, or environment variables.",
          technologies: ["Google Cloud Secret Manager", "IAM Accessor Role"],
          inputs: ["Secret version request from authenticated backend"],
          outputs: ["API credential string"],
          details:
            "The key is retrieved over internal Google APIs and cached in backend process memory for 3,600 seconds (1 hour).",
        },
        {
          id: "memory-engine",
          label: "Context & Memory Engine",
          lane: "Backend (Cloud Run)",
          responsibility:
            "Retrieves past context by reading the last 3 journal entries and ranking up to 30 stored candidate memories.",
          technologies: ["Cosine similarity", "Keyword score ranking", "Firestore SDK"],
          inputs: ["Incoming entry", "User ID"],
          outputs: ["Context payload capped at snippet limits"],
          details:
            "Context combines the 3 most recent entries (200 char cap each) with up to 30 scored memories (350 char cap each) into an XML-delimited prompt payload.",
          sourceLink:
            "https://github.com/OjasPal/Personal-Gemini-Journal/blob/master/backend/server.js",
        },
        {
          id: "gemini-api",
          label: "Gemini Model Service",
          lane: "Google Cloud Services",
          responsibility:
            "Processes structured conversational reasoning against user journal context, with retry and model fallback.",
          technologies: ["gemini-3.6-flash (primary)", "gemini-3.5-flash-lite (fallback)"],
          inputs: ["XML-delimited prompt with untrusted text tagging"],
          outputs: ["Reflective response text", "Extracted memory candidate"],
          details:
            "Primary calls target gemini-3.6-flash. If the primary model encounters transient errors, requests automatically fall back to gemini-3.5-flash-lite.",
        },
        {
          id: "firestore",
          label: "Cloud Firestore",
          lane: "Google Cloud Services",
          responsibility:
            "Stores journal documents and memory records under per-user isolated collections.",
          technologies: ["Google Cloud Firestore", "Serverless NoSQL"],
          inputs: ["Indexed write batches under users/{uid}"],
          outputs: ["User document streams"],
          details:
            "All document access paths are hardcoded to users/{uid}/entries and users/{uid}/memories, precluding cross-tenant leakage.",
        },
      ],
      edges: [
        { from: "client", to: "auth-gate", label: "Bearer ID Token" },
        { from: "auth-gate", to: "secret-mgr", label: "Fetch Key (1h cache)" },
        { from: "auth-gate", to: "memory-engine", label: "Verified UID" },
        { from: "memory-engine", to: "firestore", label: "Read Recent + Stored" },
        { from: "memory-engine", to: "gemini-api", label: "XML-Delimited Context" },
        { from: "gemini-api", to: "firestore", label: "Save Entry & Memory" },
        { from: "auth-gate", to: "client", label: "Sanitized Response" },
      ],
    },
    decisions: [
      {
        context: "API Key Security & Client Communication",
        choice: "Dedicated Express backend proxy on Cloud Run",
        alternatives: ["Direct client-side Gemini API calls from browser"],
        rationale:
          "Direct browser calls require embedding or leaking API credentials into client JavaScript. A backend proxy acts as the single point of enforcement for token verification, rate limiting, and sanitization.",
        tradeOff:
          "Requires maintaining and paying for a containerized backend service rather than a purely static web host.",
      },
      {
        context: "Credential Storage & Retrieval",
        choice: "Google Cloud Secret Manager with IAM service account binding",
        alternatives: [".env configuration files", "Downloaded service account JSON keys"],
        rationale:
          "Keeps production keys entirely outside the git repository and container image layers. Downloading JSON keys was also restricted by organization policies.",
        tradeOff:
          "Introduces an internal API latency hop on cold startup before the in-memory cache populates.",
      },
      {
        context: "Memory & Similarity Scoring",
        choice:
          "In-process ranking of Firestore documents using cosine similarity and keyword matching",
        alternatives: ["Dedicated vector database (Pinecone, Chroma, pgvector)"],
        rationale:
          "Eliminates the cost and operational overhead of an external vector database for a small-scale prototype where personal journals contain dozens to low hundreds of entries.",
        tradeOff:
          "Does not scale to thousands of entries per user; candidate sets must be capped at 30 items.",
      },
      {
        context: "Frontend Hosting",
        choice: "Containerized deployment on Google Cloud Run",
        alternatives: ["Firebase Hosting", "Static CDN"],
        rationale:
          "The APAC Gen AI Academy ideathon rules explicitly required deployment workloads to run on Cloud Run.",
        tradeOff:
          "Slightly slower cold boot compared to static edge CDN caching.",
      },
      {
        context: "Backend Authorization Boundary",
        choice: "Firebase Admin SDK verifying user tokens in application code",
        alternatives: ["Client-direct Firestore Security Rules"],
        rationale:
          "Because the backend connects via Firebase Admin SDK (which bypasses Firestore client rules), the Express verification middleware that derives UID strictly from verified tokens serves as the true security perimeter.",
        tradeOff:
          "Security relies entirely on backend route middleware correctness rather than declarative database rules.",
      },
    ],
    problemsSolved: [
      {
        issue: "Cloud Run Build & Deployment Failures",
        rootCause:
          "The default Cloud Run compute service account lacked IAM permissions for Artifact Registry, Cloud Storage, and Logging, and the repository lacked an explicit npm start script.",
        resolution:
          "Granted the required IAM roles to the deployment service account and configured an explicit start command in package.json.",
      },
      {
        issue: "Production 401 Unauthorized Responses",
        rootCause:
          "The backend service account lacked permissions to verify Firebase Auth ID tokens against the project authentication service. Initial diagnosis incorrectly suspected client-side token generation.",
        resolution:
          "Diagnosed error logs and assigned the firebaseauth.admin role to the runtime service account.",
      },
      {
        issue: "Gemini Model Failures & Truncated API Keys",
        rootCause:
          "Encountered a deprecated model name, trial quota limits, and a corrupted Secret Manager value caused by an unintentional trailing '-n' flag during CLI creation.",
        resolution:
          "Updated the model identifier to gemini-3.6-flash, switched to a free-tier key, and recreated the Secret Manager payload cleanly.",
      },
    ],
    securityAndQuality: {
      summary:
        "The application architecture strictly separates untrusted user input from execution context, with non-negotiable verification gates on every network boundary.",
      rules: [
        "Server-side token verification: Every single one of the 9 REST endpoints verifies the Firebase ID token with checkRevoked enabled to immediately invalidate signed-out sessions.",
        "Strict path derivation: The user UID is derived exclusively from the cryptographically verified token; document paths are constructed as users/{uid}/... and never accepted from request parameters.",
        "Secret isolation: The Gemini API key is fetched directly from Secret Manager via IAM credentials, cached in memory for one hour, with no fallback to environment variables.",
        "Minimal IAM scope: The runtime service account is restricted to three targeted roles: secretmanager.secretAccessor, datastore.user, and firebaseauth.admin.",
        "Input sanitization: Incoming messages are limited to 4,000 characters (questions to 500 characters); control characters are stripped and whitespace collapsed.",
        "Rate limiting: Per-user token-bucket algorithm enforces a burst ceiling of 10 requests, refilling at 1 token every 6 seconds.",
        "Log scrubbing: The server logger explicitly purges apiKey, idToken, prompt, message, question, content, and raw exception stacks before writing to stdout.",
        "Untrusted prompt framing: Prompt structure explicitly commands the Gemini model to treat conversation history and recalled memories as untrusted user text.",
      ],
    },
    limitations: [
      "No automated end-to-end test suite; user isolation was verified through manual multi-account validation.",
      "The token-bucket rate limiter and Secret Manager key cache are held in Node.js instance memory, meaning state resets when Cloud Run spins up fresh container instances.",
      "The 'delete-all' feature executes within a single Firestore batch per collection, subject to Firestore's 500-write batch ceiling; export is currently unpaginated.",
      "XML delimiter encapsulation is best-effort against prompt injection because user text angle brackets are not escaped before string interpolation.",
    ],
    appendix: {
      constants: [
        {
          parameter: "REST Endpoints",
          value: "9",
          scope: "Backend Express Router",
          notes: "All 9 require verified Bearer ID token",
        },
        {
          parameter: "Recent Entries Context",
          value: "3 entries",
          scope: "Prompt Construction",
          notes: "Each entry snippet is capped at 200 characters",
        },
        {
          parameter: "Memory Candidate Pool",
          value: "Up to 30 memories",
          scope: "In-memory Ranking",
          notes: "Each candidate snippet is capped at 350 characters",
        },
        {
          parameter: "Journal Entry Max Length",
          value: "4,000 characters",
          scope: "Input Validation Middleware",
          notes: "Excess length rejected with 400 Bad Request",
        },
        {
          parameter: "Question Max Length",
          value: "500 characters",
          scope: "Ask My Journal Endpoint",
          notes: "Enforces concise retrieval queries",
        },
        {
          parameter: "Rate Limit Capacity",
          value: "10 tokens",
          scope: "Per-User Token Bucket",
          notes: "Burst capacity; refills 1 token every 6 seconds",
        },
        {
          parameter: "Secret Cache TTL",
          value: "3,600 seconds (1 hr)",
          scope: "Secret Manager Client",
          notes: "Held in Node.js process heap memory",
        },
        {
          parameter: "Entry Query Page Cap",
          value: "50 entries",
          scope: "Firestore GET /entries",
          notes: "Default fetch limit per request",
        },
      ],
      models: [
        {
          primary: "gemini-3.6-flash",
          fallback: "gemini-3.5-flash-lite",
          role: "Reflective dialogue formulation and memory synthesis",
        },
      ],
      iamRoles: [
        {
          role: "roles/secretmanager.secretAccessor",
          purpose: "Scoped strictly to read the Gemini API secret payload",
        },
        {
          role: "roles/datastore.user",
          purpose: "Provides read/write access to Cloud Firestore documents",
        },
        {
          role: "roles/firebaseauth.admin",
          purpose: "Allows backend verification of Firebase ID tokens and revocation state",
        },
      ],
      endpointsSummary:
        "9 endpoints covering Auth state, Journal Entries (CRUD), Memories (query, update, clear), and AI Conversation / Querying.",
      sourceReferences: [
        {
          label: "Repository Root",
          url: "https://github.com/OjasPal/Personal-Gemini-Journal",
        },
        {
          label: "backend/server.js",
          url: "https://github.com/OjasPal/Personal-Gemini-Journal/blob/master/backend/server.js",
        },
      ],
    },
  },

  "medical-rag-chatbot": {
    slug: "medical-rag-chatbot",
    index: "02",
    title: "Medical RAG Chatbot",
    period: "September 2026",
    domainTag: "Retrieval-Augmented Generation & Healthcare NLP",
    tagline:
      "A medical Q&A assistant that retrieves relevant passages from an indexed medical reference before answering.",
    plainDescription:
      "Enter health queries to search an indexed medical reference and retrieve the most relevant passages. A hosted language model formulates replies conditioned strictly on the retrieved context, politely declining off-topic questions.",
    problemStatement:
      "Large language models queried directly on clinical and medical topics frequently hallucinate without pointing to authoritative sources. Retrieval-Augmented Generation (RAG) grounds model outputs by supplying relevant reference passages at inference time without requiring expensive model retraining.",
    headlineMetrics: [
      {
        label: "Indexed Chunks",
        value: "5,860",
        context:
          "Chunks embedded (500 chars, 20 overlap) and indexed into Pinecone vector storage",
      },
      {
        label: "Retrieval Depth",
        value: "Top-2 Chunks",
        context:
          "Retrieved via 384-dimension vector embeddings per user query",
      },
      {
        label: "Server Boot & Cold Start",
        value: "~30s Cold Start",
        context:
          "Reduced from ~1 min using Cloud Run CPU boost; sub-second Gunicorn bind via lazy initialization",
      },
    ],
    links: {
      live: "https://medical-chatbot-1032077414344.asia-south2.run.app",
      code: "https://github.com/OjasPal/Medical-RAG-Chatbot",
      video: null,
    },
    image: "/projects/medical-rag-chatbot.webp",
    whatIDid: {
      wordingNote:
        "I worked on this project end to end, from the indexing pipeline and Flask endpoints to the retrieval chain, chat interface, and Cloud Run deployment.",
      items: [
        "Wrote the indexing pipeline script (store_index.py), core Flask routing, dependency requirements, and container environment configuration.",
        "Designed and reviewed the LangChain retrieval chain (app.py), the Pinecone and HuggingFace embedding helper integration (src/helper.py), the system prompt template (src/prompt.py), and the containerized Dockerfile.",
        "Integrated and tested the interactive browser chat interface (templates/chat.html) and client-side marked.js markdown rendering.",
        "Deployed the application container to Google Cloud Run and resolved production container cold-start and health-check timeout bottlenecks.",
      ],
    },
    architecture: {
      summary:
        "Composed of two discrete phases: an offline indexing pipeline that pre-computes dense vector embeddings from reference documents into Pinecone, and a live web service that executes question embedding, top-k vector retrieval, and augmented prompt generation.",
      trustBoundaryDescription:
        "The web service isolates source documents by embedding them ahead of time into a serverless vector store; incoming queries pass through prompt constraints before reaching the hosted Groq LLM.",
      nodes: [
        {
          id: "source-doc",
          label: "Source Reference PDF",
          lane: "Offline Indexing Path",
          responsibility:
            "Supplies authoritative medical reference text for chunking and embedding.",
          technologies: ["PyPDFLoader", "RecursiveCharacterTextSplitter"],
          inputs: ["Local document PDF (git-ignored)"],
          outputs: ["5,860 text chunks (500 chars, 20 char overlap)"],
          details:
            "Kept in a git-ignored data/ directory to prevent redistribution of copyrighted reference material.",
          sourceLink:
            "https://github.com/OjasPal/Medical-RAG-Chatbot/blob/main/store_index.py",
        },
        {
          id: "embed-pipeline",
          label: "Embedding Pipeline",
          lane: "Offline Indexing Path",
          responsibility:
            "Transforms extracted text chunks into dense 384-dimensional vector representations.",
          technologies: ["HuggingFace", "BAAI/bge-small-en-v1.5", "PyTorch (CPU)"],
          inputs: ["Text chunks"],
          outputs: ["384-dimensional dense vectors"],
          details:
            "Uses a compact open embedding model capable of running efficiently on CPU architecture.",
          sourceLink:
            "https://github.com/OjasPal/Medical-RAG-Chatbot/blob/main/store_index.py",
        },
        {
          id: "vector-store",
          label: "Pinecone Vector Index",
          lane: "Offline Indexing Path",
          responsibility:
            "Provides hosted persistent vector storage and cosine similarity lookups.",
          technologies: ["Pinecone Serverless", "Cosine Similarity", "AWS us-east-1"],
          inputs: ["Embedded chunk vectors + text payloads"],
          outputs: ["Top-2 nearest matching chunk texts"],
          details:
            "Stores vector embeddings and raw chunk text. Does not store source page numbers or metadata tags.",
          sourceLink:
            "https://github.com/OjasPal/Medical-RAG-Chatbot/blob/main/src/helper.py",
        },
        {
          id: "web-client",
          label: "Web Chat UI",
          lane: "Live Question Path",
          responsibility:
            "Accepts user medical inquiries and renders formatted Markdown responses in real time.",
          technologies: ["HTML5", "CSS", "JavaScript", "marked.js"],
          inputs: ["User medical query text"],
          outputs: ["POST /get payload"],
          details:
            "Browser interface communicating asynchronously with the Flask endpoint and converting Markdown into semantic HTML.",
          sourceLink:
            "https://github.com/OjasPal/Medical-RAG-Chatbot/blob/main/templates/chat.html",
        },
        {
          id: "flask-server",
          label: "Flask & Gunicorn Server",
          lane: "Live Question Path",
          responsibility:
            "Manages HTTP routing, executes lazy initialization of model connections, and orchestrates LangChain retrieval.",
          technologies: ["Python 3.10", "Flask", "Gunicorn (1 worker, 8 threads)", "Cloud Run"],
          inputs: ["Incoming question text"],
          outputs: ["Synthesized answer text"],
          details:
            "Lazy loading of embeddings inside route handlers enables Gunicorn to bind port 8080 in ~0.05 seconds, preventing Cloud Run startup timeout.",
          sourceLink:
            "https://github.com/OjasPal/Medical-RAG-Chatbot/blob/main/app.py",
          isTrustBoundaryGate: true,
        },
        {
          id: "groq-llm",
          label: "Hosted LLM Inference",
          lane: "Live Question Path",
          responsibility:
            "Synthesizes grounded clinical responses based on retrieved context and conversation history.",
          technologies: ["Groq API", "openai/gpt-oss-20b", "Temperature 0.5", "LangChain"],
          inputs: ["System prompt with top-2 passages + query"],
          outputs: ["Grounded natural language answer"],
          details:
            "System prompt instructs the model to utilize retrieved context and decline non-medical questions.",
          sourceLink:
            "https://github.com/OjasPal/Medical-RAG-Chatbot/blob/main/src/prompt.py",
        },
      ],
      edges: [
        { from: "source-doc", to: "embed-pipeline", label: "500-char chunks" },
        { from: "embed-pipeline", to: "vector-store", label: "384-dim vectors" },
        { from: "web-client", to: "flask-server", label: "POST /get" },
        { from: "flask-server", to: "vector-store", label: "Query embedding lookup" },
        { from: "vector-store", to: "flask-server", label: "Top-2 passages" },
        { from: "flask-server", to: "groq-llm", label: "Augmented prompt" },
        { from: "groq-llm", to: "web-client", label: "Grounded answer" },
      ],
    },
    decisions: [
      {
        context: "Knowledge Grounding Strategy",
        choice: "Retrieval-Augmented Generation (RAG) over model fine-tuning",
        alternatives: ["Full model fine-tuning or LoRA adaptation"],
        rationale:
          "Fine-tuning adjusts tone and style rather than ensuring factual recall. RAG allows knowledge base updates simply by re-indexing reference passages without GPU retraining costs.",
        tradeOff:
          "Inference requires multi-step orchestration (embedding + vector search + LLM generation).",
      },
      {
        context: "Server Initialization & Cloud Run Health Checks",
        choice: "Lazy instantiation of embedding model and Pinecone client inside route handler",
        alternatives: ["Global initialization at application module import time"],
        rationale:
          "Loading the heavy Hugging Face embedding model at startup delayed Gunicorn from binding port 8080 before Cloud Run container health checks timed out, producing 503 deployment errors.",
        tradeOff:
          "The very first user query absorbs the model instantiation delay rather than taking the hit at boot.",
      },
      {
        context: "Inference & Vector Hosting",
        choice: "Hosted Groq API and Pinecone Serverless",
        alternatives: ["Self-hosted Ollama and local FAISS/Chroma within container"],
        rationale:
          "Running an LLM and vector database inside Cloud Run would require expensive GPU compute and exceed container memory constraints. Hosted APIs keep the container lightweight.",
        tradeOff:
          "Introduces external network dependencies and latency across services.",
      },
      {
        context: "Intellectual Property & Repository Safety",
        choice: "Strictly git-ignoring the data/ directory containing source document PDF",
        alternatives: ["Checking source PDF into repository"],
        rationale:
          "Prevents redistributing copyrighted reference encyclopedia material in a public source repository.",
        tradeOff:
          "Requires running indexing locally with the source file before deployment.",
      },
    ],
    problemsSolved: [
      {
        issue: "Cloud Run 503 Deployment & Health Check Failures",
        rootCause:
          "Importing and loading the HuggingFace transformer model during top-level module evaluation blocked Gunicorn from binding port 8080 within the platform health-check window.",
        resolution:
          "Deferred model loading inside get_rag_chain() so Gunicorn binds port 8080 in ~0.05 seconds, allowing container checks to pass immediately.",
      },
      {
        issue: "Extended Scaled-to-Zero Container Cold Starts (~1 minute)",
        rootCause:
          "A zero-instance Cloud Run container had to spin up the container environment and compute model layers on initial request with standard CPU throttling.",
        resolution:
          "Enabled Cloud Run CPU boost (--cpu-boost), cutting container start time to approximately 30 seconds.",
      },
    ],
    securityAndQuality: {
      summary:
        "Configuration credentials are abstracted to environment variables, copyrighted assets remain excluded from source control, and system prompt boundaries guide domain relevance.",
      rules: [
        "API credential isolation: Groq and Pinecone API keys are consumed strictly via environment variables, with .env files excluded via .gitignore.",
        "Prompt-level domain boundary: The system prompt explicitly instructs the language model to answer medical questions using retrieved passages and decline non-medical questions (finance, coding, trivia).",
        "Asset compliance: The reference PDF is git-ignored and never committed to version control.",
      ],
    },
    limitations: [
      "All visitors share a single in-memory conversation session (default_user_session in app.py); clearing history or submitting questions influences sequential context across users.",
      "Answers are only partly grounded: the prompt allows general medical knowledge when passages are sparse, and passages lack page-number metadata for source citations.",
      "No clinical disclaimer is present in the UI or prompt to clarify that responses do not constitute professional medical advice.",
      "Upstream error handling is thin: Pinecone or Groq failures bubble raw exception strings with 500 status codes without retry fallbacks.",
      "The public /get endpoint has no user authentication or token-bucket rate limiting.",
      "Cross-region network latency exists between the Pinecone index (AWS us-east-1) and the Cloud Run container (GCP asia-south2).",
    ],
    appendix: {
      constants: [
        {
          parameter: "Indexed Chunks",
          value: "5,860 chunks",
          scope: "store_index.py",
          notes: "Derived from reference text splitting",
        },
        {
          parameter: "Chunk Size",
          value: "500 characters",
          scope: "Text Splitting",
          notes: "20 characters overlap between consecutive chunks",
        },
        {
          parameter: "Embedding Dimensions",
          value: "384 dimensions",
          scope: "BAAI/bge-small-en-v1.5",
          notes: "Dense floating-point vector representations",
        },
        {
          parameter: "Retrieval Depth",
          value: "Top-2 chunks",
          scope: "Pinecone Query",
          notes: "Fetched via cosine similarity",
        },
        {
          parameter: "Gunicorn Worker Config",
          value: "1 worker, 8 threads",
          scope: "Dockerfile ENTRYPOINT",
          notes: "Timeout disabled to accommodate long generations",
        },
        {
          parameter: "Cloud Run Allocation",
          value: "2 GiB RAM, 2 vCPUs",
          scope: "Cloud Run Runtime",
          notes: "Min instances 0, CPU boost active",
        },
      ],
      models: [
        {
          primary: "openai/gpt-oss-20b (via Groq API)",
          role: "Augmented dialogue generation with temperature 0.5",
        },
        {
          primary: "BAAI/bge-small-en-v1.5 (via HuggingFace)",
          role: "Dense text chunk and query vector embedding (384 dimensions)",
        },
      ],
      sourceReferences: [
        {
          label: "Repository Root",
          url: "https://github.com/OjasPal/Medical-RAG-Chatbot",
        },
        {
          label: "app.py",
          url: "https://github.com/OjasPal/Medical-RAG-Chatbot/blob/main/app.py",
        },
        {
          label: "src/helper.py",
          url: "https://github.com/OjasPal/Medical-RAG-Chatbot/blob/main/src/helper.py",
        },
        {
          label: "src/prompt.py",
          url: "https://github.com/OjasPal/Medical-RAG-Chatbot/blob/main/src/prompt.py",
        },
        {
          label: "store_index.py",
          url: "https://github.com/OjasPal/Medical-RAG-Chatbot/blob/main/store_index.py",
        },
        {
          label: "templates/chat.html",
          url: "https://github.com/OjasPal/Medical-RAG-Chatbot/blob/main/templates/chat.html",
        },
        {
          label: "Dockerfile",
          url: "https://github.com/OjasPal/Medical-RAG-Chatbot/blob/main/Dockerfile",
        },
      ],
    },
  },

  "ml-dl-portfolio": {
    slug: "ml-dl-portfolio",
    index: "03",
    title: "ML & DL Project Portfolio",
    period: "October 2026",
    domainTag: "Applied Machine Learning & Deep Learning",
    tagline:
      "Eleven machine learning and deep learning interactive demos unified in one multi-page Streamlit application.",
    plainDescription:
      "A model observatory uniting eleven predictive machine learning and deep learning applications across computer vision, natural language processing, tabular regression, and recommendation systems. Models are pre-trained and serialized, responding on request without retraining on page load.",
    problemStatement:
      "Jupyter notebooks are ideal for research and model training but difficult for non-technical stakeholders to inspect and test. This project consolidated eleven distinct machine learning workflows into a unified, interactive web application.",
    headlineMetrics: [
      {
        label: "Unified Models",
        value: "11 Demos",
        context:
          "Covering computer vision, NLP, recommendation systems, and clinical ML",
      },
      {
        label: "Classifier Accuracy",
        value: "93.6%",
        context:
          "Validation accuracy on the 46-breed pet classifier (fine-tuned EfficientNet-B0)",
      },
      {
        label: "Inference Latency",
        value: "< 100 ms",
        context:
          "Measured by author on Streamlit Cloud CPU (25 to 30 ms on Pet Breed and Face Detection)",
      },
    ],
    links: {
      live: "https://ojaspal-ml-dl-portfolio.streamlit.app",
      code: "https://github.com/OjasPal/ML-DL-Portfolio",
      video: null,
    },
    image: "/projects/ml-dl-portfolio.webp",
    whatIDid: {
      wordingNote:
        "I wrote the original notebooks for all eleven projects, and designed and deployed the Streamlit app that brings them together.",
      items: [
        "Wrote and trained the original experimental notebooks for the Movie Recommendation System, Housing Price Prediction, Spotify Song Recommendation System, Keras Handwritten Digit Recognizer, and Email Spam Detector.",
        "Designed the modular multi-page Streamlit application architecture, implementing cached resource loaders and interactive forms.",
        "Resolved deployment dependency and memory compatibility issues to launch and maintain the application on Streamlit Community Cloud.",
      ],
    },
    architecture: {
      summary:
        "An observatory architecture where a single Streamlit process routes to eleven independent model pages. Pre-trained model weights are serialized offline (joblib, .pth, .keras, OpenCV XML) and cached in container memory via st.cache_resource.",
      nodes: [
        {
          id: "notebooks",
          label: "Offline Training & Serialization",
          lane: "Model Training & Serialization",
          responsibility:
            "Trains algorithms across tabular, text, image, and matrix data, serializing final weights to disk.",
          technologies: ["scikit-learn", "CatBoost", "PyTorch", "TensorFlow / Keras", "OpenCV"],
          inputs: ["Domain datasets (TMDB, Spotify, Oxford Pet, Stanford Dogs, MNIST, etc.)"],
          outputs: ["Serialized model artifacts (.joblib, .pth, .keras, XML)"],
          details:
            "Models are pre-trained offline so the web application never incurs retraining latency at runtime.",
          sourceLink:
            "https://github.com/OjasPal/ML-DL-Portfolio/blob/main/README.md",
        },
        {
          id: "streamlit-router",
          label: "Streamlit App Runtime",
          lane: "Streamlit App Runtime",
          responsibility:
            "Renders navigation, manages cached model loading, and standardizes user inputs.",
          technologies: ["Python 3.12", "Streamlit", "st.cache_resource", "pandas"],
          inputs: ["User input parameters, file uploads, canvas strokes"],
          outputs: ["Preprocessed feature tensors"],
          details:
            "Home.py manages the overarching portal while individual pages/ handle specific feature transformations.",
          sourceLink:
            "https://github.com/OjasPal/ML-DL-Portfolio/blob/main/Home.py",
        },
        {
          id: "inference-engine",
          label: "Real-Time Inference",
          lane: "Model Inference",
          responsibility:
            "Executes forward prediction passes, times execution with time.perf_counter, and renders Plotly visualizations.",
          technologies: ["EfficientNet-B0", "ResNet-10 SSD", "Plotly", "Cosine Similarity"],
          inputs: ["Transformed input vectors"],
          outputs: ["Prediction classes, similarity scores, bounding boxes"],
          details:
            "Executes within Streamlit Community Cloud CPU limits; Spotify similarity is computed per query to bypass memory bounds.",
          sourceLink:
            "https://github.com/OjasPal/ML-DL-Portfolio/blob/main/pages/09_Pet_Breed_Classifier.py",
        },
      ],
      edges: [
        { from: "notebooks", to: "streamlit-router", label: "Cached model weights" },
        { from: "streamlit-router", to: "inference-engine", label: "Preprocessed input" },
        { from: "inference-engine", to: "streamlit-router", label: "Predictions & charts" },
      ],
    },
    decisions: [
      {
        context: "Application Delivery Framework",
        choice: "Single multi-page Streamlit application",
        alternatives: ["Eleven separate web applications", "Custom React + FastAPI stack"],
        rationale:
          "Consolidating eleven models into a single Streamlit framework vastly reduced deployment maintenance and provided a unified interface for visitors to test each project.",
        tradeOff:
          "All eleven models share one global Python runtime and container process memory.",
      },
      {
        context: "Memory Optimization for Recommendation Engine",
        choice: "On-demand per-query cosine similarity calculation",
        alternatives: ["Precomputing and loading full 32,833-song similarity matrix"],
        rationale:
          "The full precomputed similarity matrix required approximately 8 GB of storage, exceeding Streamlit Community Cloud's 2.7 GB RAM boundary. Computing similarity for the selected track on demand fits memory limits cleanly.",
        tradeOff:
          "Requires a brief calculation per recommendation request rather than instant index lookups.",
      },
      {
        context: "Model Lifecycle Management",
        choice: "Serialized weights loaded via @st.cache_resource",
        alternatives: ["Retraining or fitting models on script execution"],
        rationale:
          "Streamlit reruns entire scripts on user interaction. Caching model objects ensures predictions execute instantly without re-reading disks or refitting estimators.",
        tradeOff:
          "Initial page load incurs model deserialization time.",
      },
    ],
    problemsSolved: [
      {
        issue: "Spotify Recommendation Discrepancy on Cloud",
        rootCause:
          "The deployed feature builder omitted certain categorical features present in the original experimental notebook, triggering an unlogged fallback path.",
        resolution:
          "Rebuilt the cloud feature pipeline to mirror the notebook specification (5 encoded and 9 standardized feature columns).",
      },
      {
        issue: "Deployment Failures on Streamlit Cloud",
        rootCause:
          "Default runtime Python version was incompatible with pinned TensorFlow releases, and OpenCV required missing Linux system graphic dependencies.",
        resolution:
          "Standardized environment configuration on Python 3.12 and switched to headless OpenCV (opencv-python-headless).",
      },
      {
        issue: "File Path Resolution Errors",
        rootCause:
          "Local folder names and asset paths conflicted with cloud Linux case-sensitive directory structures.",
        resolution:
          "Standardized page directory naming into slugified conventions and added path fallback helpers.",
      },
    ],
    securityAndQuality: {
      summary:
        "Model loading routines are wrapped in defensive try-except blocks, inference latency is metered in real time, and dependencies are pinned.",
      rules: [
        "Defensive model initialization: Deserialization routines catch and report corrupted model files gracefully.",
        "Runtime telemetry: Interactive computer vision pages record inference duration with time.perf_counter.",
        "Pinned core dependencies: PyTorch, TensorFlow, scikit-learn, CatBoost, Keras, Streamlit, and OpenCV are explicitly pinned.",
      ],
    },
    limitations: [
      "Models represent exploratory academic prototypes without continuous production retraining or ground-truth drift monitoring.",
      "In the Spotify recommender, label-encoded categorical values are combined without normalization alongside standardized audio features, meaning category codes can disproportionately weight recommendations.",
      "TensorFlow and PyTorch co-exist inside a single container process, which has not undergone concurrent load testing.",
      "Automated unit and integration test suites are absent.",
    ],
    subProjects: [
      {
        index: "01",
        title: "Movie Recommendation System",
        domain: "Recommendation",
        approach: "TF-IDF vectors with cosine similarity over 50K TMDB movie titles",
        liveUrl: "https://ojaspal-ml-dl-portfolio.streamlit.app/Movie_Recommendation_System",
      },
      {
        index: "02",
        title: "Housing Price Prediction",
        domain: "Regression",
        approach: "Linear Regression on standardized features and encoded Delhi localities",
        liveUrl: "https://ojaspal-ml-dl-portfolio.streamlit.app/Housing_Price_Prediction",
      },
      {
        index: "03",
        title: "Spotify Song Recommendation System",
        domain: "Recommendation",
        approach: "Cosine similarity over encoded playlist metadata and standardized audio features",
        liveUrl: "https://ojaspal-ml-dl-portfolio.streamlit.app/Spotify_Song_Recommendation_System",
      },
      {
        index: "04",
        title: "Email Spam Detector",
        domain: "Natural Language Processing",
        approach: "NLTK stemming, TF-IDF vectorization, and Logistic Regression",
        liveUrl: "https://ojaspal-ml-dl-portfolio.streamlit.app/Email_Spam_Detector",
      },
      {
        index: "05",
        title: "Customer Churn Prediction",
        domain: "Classification",
        approach: "Logistic Regression on 19 customer account and demographic features",
        liveUrl: "https://ojaspal-ml-dl-portfolio.streamlit.app/Customer_Churn_Prediction",
      },
      {
        index: "06",
        title: "Cardiovascular Disease Prediction",
        domain: "Healthcare ML",
        approach: "Support Vector Classifier on 11 biometric and lifestyle features (70K records)",
        liveUrl: "https://ojaspal-ml-dl-portfolio.streamlit.app/Cardiovascular_Disease_Prediction",
      },
      {
        index: "07",
        title: "Heart Disease Prediction",
        domain: "Healthcare ML",
        approach: "Logistic Regression on 13 clinical biomarkers",
        liveUrl: "https://ojaspal-ml-dl-portfolio.streamlit.app/Heart_Disease_Prediction",
      },
      {
        index: "08",
        title: "Software Salary Prediction",
        domain: "Regression",
        approach: "CatBoost on a log-scale target with engineered role and location features",
        liveUrl: "https://ojaspal-ml-dl-portfolio.streamlit.app/Salary_Prediction",
      },
      {
        index: "09",
        title: "Pet Breed Classifier",
        domain: "Computer Vision",
        approach: "EfficientNet-B0 fine-tuned in two stages across 46 cat and dog breeds",
        liveUrl: "https://ojaspal-ml-dl-portfolio.streamlit.app/Pet_Breed_Classifier",
      },
      {
        index: "10",
        title: "Face Detection",
        domain: "Computer Vision",
        approach: "Pre-trained OpenCV DNN (ResNet-10 SSD) with adjustable confidence threshold",
        liveUrl: "https://ojaspal-ml-dl-portfolio.streamlit.app/Face_Detection",
      },
      {
        index: "11",
        title: "Handwritten Digit Recognizer",
        domain: "Deep Learning",
        approach: "Keras neural network on MNIST with an interactive drawing canvas",
        liveUrl: "https://ojaspal-ml-dl-portfolio.streamlit.app/Handwritten_Digit_Recognizer",
      },
    ],
    appendix: {
      constants: [
        {
          parameter: "Included Demos",
          value: "11 Projects",
          scope: "Application Catalog",
          notes: "8 Machine Learning, 3 Deep Learning",
        },
        {
          parameter: "Pet Breed Accuracy",
          value: "93.6% validation",
          scope: "Fine-tuned EfficientNet-B0",
          notes: "46 breeds (12 cat, 34 dog)",
        },
        {
          parameter: "Measured Inference",
          value: "25 to 30 ms",
          scope: "CPU Streamlit Cloud",
          notes: "Measured on Pet Breed and Face Detection",
        },
        {
          parameter: "Spotify Songs Evaluated",
          value: "32,833 tracks",
          scope: "Cosine Similarity",
          notes: "Computed on-demand per request",
        },
        {
          parameter: "Cloud RAM Limit",
          value: "2.7 GB boundary",
          scope: "Streamlit Cloud Hosting",
          notes: "Enforced avoidance of precomputed matrix",
        },
      ],
      sourceReferences: [
        {
          label: "Repository Root",
          url: "https://github.com/OjasPal/ML-DL-Portfolio",
        },
        {
          label: "Home.py",
          url: "https://github.com/OjasPal/ML-DL-Portfolio/blob/main/Home.py",
        },
        {
          label: "pages/09_Pet_Breed_Classifier.py",
          url: "https://github.com/OjasPal/ML-DL-Portfolio/blob/main/pages/09_Pet_Breed_Classifier.py",
        },
        {
          label: "pages/10_Face_Detection.py",
          url: "https://github.com/OjasPal/ML-DL-Portfolio/blob/main/pages/10_Face_Detection.py",
        },
        {
          label: "README.md",
          url: "https://github.com/OjasPal/ML-DL-Portfolio/blob/main/README.md",
        },
      ],
    },
  },

  "evalai": {
    slug: "evalai",
    index: "04",
    title: "EvalAI",
    period: "August 2026",
    domainTag: "AI Alignment & Reward Modeling",
    tagline:
      "Predicts which of two AI answers a human evaluator would prefer, with feedback collection and bias checks.",
    plainDescription:
      "Given a user prompt, the system queries two local language models (Llama 3.2 and Qwen 2.5 3B) via Ollama. A fine-tuned RoBERTa reward model scores both completions to predict human preference. Evaluators can submit feedback (A, B, or Tie) and rate responses across multiple quality dimensions.",
    problemStatement:
      "Evaluating language model output quality typically requires expensive human labeling or costly calls to proprietary frontier models. A lightweight, locally executable reward model can predict preference cheaply and reproducibly while exposing evaluation benchmarks for position and verbosity bias.",
    eventContext:
      "Built for the Smart India Hackathon 2026 (Problem Statement: Human Preference Prediction Model for LLM Responses), Team Nova.",
    collaborator: {
      name: "Prem Chand Durgapal",
      linkedinUrl: "https://linkedin.com/in/prem-chand-durgapal/",
      roleNote:
        "Project co-developed with Prem Chand Durgapal (Team Nova). Built and validated as a local evaluation laboratory.",
    },
    headlineMetrics: [
      {
        label: "Test Accuracy",
        value: "64.22%",
        context:
          "On held-out test split (~4,000 pairs, binary A/B task where 50% is chance)",
      },
      {
        label: "Architecture",
        value: "roberta-base",
        context:
          "Fine-tuned with pairwise ranking loss; best checkpoint selected on validation",
      },
      {
        label: "Evaluation Speedup",
        value: "3m 32s GPU",
        context:
          "Vs. ~27 min on CPU using Conda environment with CUDA PyTorch",
      },
    ],
    links: {
      live: null,
      code: "https://github.com/OjasPal/EvalAI",
      video: "https://youtu.be/BvUrBhxuUrc",
    },
    image: "/projects/evalai.webp",
    whatIDid: {
      wordingNote:
        "A preference-prediction (reward-model) project that predicts which of two LLM responses a human would prefer. It covers that stage, not full RLHF. I helped define the problem, architecture, and evaluation, and built and tested the pipeline locally.",
      items: [
        "Defined the problem scope, system requirements, architecture flow, and evaluation methodology.",
        "Built, debugged, and tested the data preprocessing, inference serving, and evaluation benchmarks locally in collaboration with Prem Chand Durgapal.",
        "Configured dual-model generation orchestration using local Ollama instances (Llama 3.2 and Qwen 2.5 3B) connected to a FastAPI backend and Streamlit interface.",
      ],
    },
    architecture: {
      summary:
        "An evaluation lab pipeline spanning offline data preparation from the Arena Human Preference 55K dataset, pairwise reward model training, local dual-model inference via Ollama, and feedback collection with bias evaluation.",
      nodes: [
        {
          id: "data-prep",
          label: "Data Preprocessing",
          lane: "Data Preparation",
          responsibility:
            "Extracts pairwise preferences, balances labels, and produces stratified splits.",
          technologies: ["Arena Human Preference 55K", "Pandas", "scikit-learn"],
          inputs: ["Raw pairwise comparison dataset"],
          outputs: ["Stratified 80/10/10 train, val, test splits (seed 42)"],
          details:
            "Filters ties to frame binary classification (A vs B), removes duplicates, and randomly swaps pairs to prevent position bias learning.",
          sourceLink:
            "https://github.com/OjasPal/EvalAI/blob/main/preprocess/preprocess.py",
        },
        {
          id: "reward-training",
          label: "RoBERTa Reward Model",
          lane: "Offline Model Training",
          responsibility:
            "Learns scalar quality scoring using pairwise ranking loss.",
          technologies: ["PyTorch", "HuggingFace Transformers", "roberta-base", "bf16"],
          inputs: ["Tokenized preference pairs (max 256 tokens)"],
          outputs: ["Saved reward model checkpoint (epoch 2)"],
          details:
            "Trained for 4 epochs with batch size 16. Training loss continued declining after epoch 2 while validation accuracy peaked at 64.42%, signaling epoch 2 as the optimal checkpoint.",
          sourceLink:
            "https://github.com/OjasPal/EvalAI/blob/main/README.md",
        },
        {
          id: "dual-generation",
          label: "Local Generation (Ollama)",
          lane: "Serving & Feedback",
          responsibility:
            "Generates candidate completions for prompt inputs without external API costs.",
          technologies: ["Ollama", "Llama 3.2", "Qwen 2.5 3B"],
          inputs: ["User evaluation prompt"],
          outputs: ["Response A and Response B texts"],
          details:
            "Queries local LLMs with a 120-second timeout, completely independent of cloud inference services.",
          sourceLink:
            "https://github.com/OjasPal/EvalAI/blob/main/backend/app/model_utils.py",
        },
        {
          id: "fastapi-service",
          label: "FastAPI Scoring Engine",
          lane: "Serving & Feedback",
          responsibility:
            "Hosts RoBERTa reward inference, computes pairwise winner, and logs feedback.",
          technologies: ["FastAPI", "Python", "JSONL Logging"],
          inputs: ["Candidate completion pair"],
          outputs: ["Predicted winner (A or B) + relative scores"],
          details:
            "Serves 6 API endpoints handling prediction, feedback logging, evaluation, and candidate retraining.",
          sourceLink:
            "https://github.com/OjasPal/EvalAI/blob/main/backend/evaluate.py",
          isTrustBoundaryGate: true,
        },
        {
          id: "feedback-eval",
          label: "Evaluation & Bias Suite",
          lane: "Serving & Feedback",
          responsibility:
            "Runs test evaluation, collects human ratings, and measures position and verbosity bias.",
          technologies: ["Streamlit", "Feedback Training", "scikit-learn metrics"],
          inputs: ["Human ratings across 5 quality dimensions"],
          outputs: ["Bias audit scores and retrained model candidates"],
          details:
            "Retrained candidate models are evaluated against held-out test splits before activation.",
          sourceLink:
            "https://github.com/OjasPal/EvalAI/blob/main/src/feedback_training.py",
        },
      ],
      edges: [
        { from: "data-prep", to: "reward-training", label: "80/10/10 split" },
        { from: "reward-training", to: "fastapi-service", label: "Model weights" },
        { from: "dual-generation", to: "fastapi-service", label: "Dual completions" },
        { from: "fastapi-service", to: "feedback-eval", label: "Scores & predictions" },
        { from: "feedback-eval", to: "fastapi-service", label: "Retrained candidates" },
      ],
    },
    decisions: [
      {
        context: "Preference Scoring Method",
        choice: "Dedicated fine-tuned RoBERTa reward model",
        alternatives: ["Prompting an LLM judge (e.g. GPT-4 or Claude as evaluator)"],
        rationale:
          "A small specialized reward model provides deterministic scalar scoring, requires fraction of compute, and executes entirely offline without API fees.",
        tradeOff:
          "Task is restricted to pairwise ranking and cannot generate open-ended explanatory feedback.",
      },
      {
        context: "Data Preparation & Tie Handling",
        choice: "Filtering out tie outcomes to create a balanced binary classification task",
        alternatives: ["Treating ties as a third class", "Marginal ranking loss"],
        rationale:
          "Removing ambiguous ties framed the task as a binary preference choice with an exact 50% chance baseline.",
        tradeOff:
          "The trained model is forced to choose a winner and cannot explicitly predict equivalence.",
      },
      {
        context: "Position Bias Mitigation",
        choice: "Randomly swapping response positions (A/B) during preprocessing",
        alternatives: ["Preserving original dataset ordering"],
        rationale:
          "Without positional randomization, transformer models easily latch onto positional order (preferring whichever answer appears first).",
        tradeOff:
          "Requires doubled pair verification during preprocessing.",
      },
      {
        context: "Generation Infrastructure",
        choice: "Local Ollama daemon hosting Llama 3.2 and Qwen 2.5",
        alternatives: ["Cloud-hosted API endpoints"],
        rationale:
          "Allowed the full evaluation lab to run locally on a developer workstation with zero recurring API costs.",
        tradeOff:
          "Execution speed is constrained by available workstation hardware.",
      },
    ],
    problemsSolved: [
      {
        issue: "Excessive Evaluation Runtimes on CPU (~27 minutes)",
        rootCause:
          "The baseline workstation environment executed PyTorch without CUDA bindings, forcing all tensor operations through CPU threads.",
        resolution:
          "Configured a dedicated Conda environment with CUDA-enabled PyTorch, reducing full test set evaluation to 3 minutes 32 seconds.",
      },
      {
        issue: "Constrained Hackathon Compute and Early Overfitting",
        rootCause:
          "Training loss continued to decrease across 4 epochs while validation accuracy peaked at epoch 2 and dropped thereafter.",
        resolution:
          "Selected the epoch 2 checkpoint based on validation accuracy (64.42%), securing 64.22% on the held-out test split.",
      },
    ],
    securityAndQuality: {
      summary:
        "Engineered as a local research prototype with automated backend unit tests and continuous evaluation gates on retrained weights.",
      rules: [
        "Local execution perimeter: All models and generation daemons run locally on localhost with no public attack surface.",
        "Automated unit testing: Backend includes test suites for API schemas and model utility functions (backend/tests/).",
        "Evaluation gate: Retrained model weights must pass evaluation benchmarks before activation.",
      ],
    },
    limitations: [
      "A test accuracy of 64.22% on human preference prediction is modest, reflecting the inherently subjective nature of human judgment.",
      "Ties were removed during training, so the model cannot predict indifference or equivalent quality.",
      "Inputs are truncated at 256 tokens, clipping long context windows and detailed responses.",
      "Engineered strictly as a local evaluation tool; has not been deployed to public cloud infrastructure.",
    ],
    appendix: {
      constants: [
        {
          parameter: "Test Accuracy",
          value: "64.22%",
          scope: "Held-out Test Split",
          notes: "Binary preference prediction (50% is chance)",
        },
        {
          parameter: "Validation Progression",
          value: "63.99% -> 64.42% (peak)",
          scope: "Epochs 1 and 2",
          notes: "Epoch 2 selected before overfitting",
        },
        {
          parameter: "Dataset Split",
          value: "80 / 10 / 10",
          scope: "Arena 55K",
          notes: "Stratified, seed 42",
        },
        {
          parameter: "Max Token Length",
          value: "256 tokens",
          scope: "RoBERTa Tokenizer",
          notes: "Input sequences truncated to 256 tokens",
        },
        {
          parameter: "Evaluation Benchmarks",
          value: "GPU: 3m 32s | CPU: ~27m",
          scope: "Full Test Set Evaluation",
          notes: "Measured on CUDA PyTorch vs CPU fallback",
        },
        {
          parameter: "Local Inference Timeout",
          value: "120 seconds",
          scope: "Ollama Daemon",
          notes: "Prevents hanging queries",
        },
      ],
      models: [
        {
          primary: "roberta-base (fine-tuned reward head)",
          role: "Scalar preference scoring via pairwise loss",
        },
        {
          primary: "Llama 3.2 & Qwen 2.5 3B (via Ollama)",
          role: "Dual candidate response generation",
        },
      ],
      sourceReferences: [
        {
          label: "Repository Root",
          url: "https://github.com/OjasPal/EvalAI",
        },
        {
          label: "backend/evaluate.py",
          url: "https://github.com/OjasPal/EvalAI/blob/main/backend/evaluate.py",
        },
        {
          label: "backend/app/model_utils.py",
          url: "https://github.com/OjasPal/EvalAI/blob/main/backend/app/model_utils.py",
        },
        {
          label: "preprocess/preprocess.py",
          url: "https://github.com/OjasPal/EvalAI/blob/main/preprocess/preprocess.py",
        },
        {
          label: "src/feedback_training.py",
          url: "https://github.com/OjasPal/EvalAI/blob/main/src/feedback_training.py",
        },
        {
          label: "README.md",
          url: "https://github.com/OjasPal/EvalAI/blob/main/README.md",
        },
      ],
    },
  },
  hirely: {
    slug: "hirely",
    index: "05",
    title: "Hirely",
    period: "October 2026",
    domainTag: "AI Product & Full-Stack Cloud",
    tagline:
      "An AI career copilot that discovers opportunities, scores your fit and tracks applications in one workspace.",
    plainDescription:
      "Set up a profile, discover job and career opportunities, see how well each one fits you and why, check listings with TrustCheck, get a weekly action plan, move applications through a pipeline, and ask a career assistant for guidance. Discovery uses Gemini Search with a Groq fallback, guidance uses Gemini with Groq as a backup, and sign-in uses Firebase Authentication.",
    problemStatement:
      "Job searching is spread across many sites. Judging relevance takes time, applications are easy to lose track of, and repetitive tasks interrupt the process. Hirely brings discovery, fit assessment, tracking and guidance into one workspace.",
    headlineMetrics: [
      {
        label: "Match factors",
        value: "5",
        context:
          "Weighted rule-based score: skills 45%, target role 25%, experience 15%, location 10%, interests 5%, with the reasons shown for each match",
      },
      {
        label: "Live search providers",
        value: "2",
        context:
          "Gemini Search grounding first, Groq Browser Search as the fallback, then curated data. Only direct posting URLs are kept",
      },
      {
        label: "Cloud Run services",
        value: "2",
        context:
          "Frontend (hirely) and backend (hirely-backend) in asia-south2, built with Buildpacks",
      },
    ],
    links: {
      live: "https://hirely-871878611397.asia-south2.run.app/",
      code: "https://github.com/OjasPal/Hirely",
      video: "https://youtu.be/wb7zaWtM7qE",
    },
    image: "/projects/hirely.webp",
    collaborator: {
      name: "Aryan Bhardwaj",
      linkedinUrl: "https://www.linkedin.com/in/aryan-bhardwaj28/",
      roleNote: "Co-builder, Team Zenophile",
    },
    whatIDid: {
      wordingNote:
        "I led product direction and feature decisions, set the integration requirements, and handled the Google Cloud deployment and testing.",
      items: [
        "Led product direction and feature decisions, and defined the integration requirements (live discovery, Gemini guidance, Firebase sign-in).",
        "Ran the Google Cloud deployment: two Cloud Run services built from source with Buildpacks, backend secrets in Secret Manager, region asia-south2.",
        "Tested the deployed application and resolved the deployment problems listed below.",
        "Built with Aryan Bhardwaj as part of Team Zenophile.",
      ],
    },
    architecture: {
      summary:
        "A React app signs users in with Firebase and calls a FastAPI backend that ranks opportunities, discovers them through Gemini Search with a Groq fallback, checks listing trust, plans weekly actions and generates career guidance with Gemini. Two Cloud Run services host the app.",
      nodes: [
        {
          id: "browser-app",
          label: "React App",
          lane: "Browser",
          responsibility:
            "Screens for onboarding, discovery, pipeline board, action planner, assistant and settings. An AppContext holds UI state. Profile, saved opportunities, applications and email settings are partly kept in localStorage.",
          technologies: ["React 19", "TypeScript", "Vite", "React Router"],
          details:
            "Manages client-side routing, user onboarding, opportunity filtering, application pipeline board state, and assistant interactions.",
          sourceLink:
            "https://github.com/OjasPal/Hirely/blob/main/frontend/src/context/AppContext.tsx",
        },
        {
          id: "firebase-auth",
          label: "Firebase Authentication",
          lane: "External services",
          responsibility:
            "Google and email/password sign-in in the browser; the app obtains an ID token at sign-in.",
          technologies: ["Firebase Auth", "Google Sign-In"],
          details:
            "Handles browser sign-in sessions and acquires user ID tokens for authenticated sessions.",
          sourceLink:
            "https://github.com/OjasPal/Hirely/blob/main/frontend/src/services/firebase.ts",
        },
        {
          id: "express-server",
          label: "Express Production Server",
          lane: "Frontend service",
          responsibility:
            'Serves the built app on the Cloud Run service "hirely". The file also contains a parallel set of API routes (search, recommendations, profile, tracker, discover, email, chat) backed by seeded in-memory data. The frontend calls the API base URL set at build time through VITE_API_BASE_URL, and uses the same origin when it is empty.',
          technologies: ["Express", "Node.js", "tsx"],
          details:
            "Hosts frontend static assets and fallback seeded API routes on Cloud Run.",
          sourceLink:
            "https://github.com/OjasPal/Hirely/blob/main/frontend/server.ts",
        },
        {
          id: "fastapi-api",
          label: "FastAPI Backend",
          lane: "Backend service",
          responsibility:
            'Cloud Run service "hirely-backend". Ten routers under /api (profile, search, recommendations, summary, tracker, chat, email, discover, trustcheck, planner) plus /health and /api/health routes, with CORS.',
          technologies: ["FastAPI", "Python", "Uvicorn", "CORS"],
          details:
            "Main application backend coordinating opportunity retrieval, fit scoring, trust checks, weekly planning, guidance generation, and application tracking.",
          sourceLink:
            "https://github.com/OjasPal/Hirely/blob/main/backend/app/main.py",
          isTrustBoundaryGate: true,
        },
        {
          id: "matching-service",
          label: "Match Scoring",
          lane: "Backend service",
          responsibility:
            "Weighted rule-based scoring of a profile against an opportunity. Inputs: skills, target roles, experience level, location, interests. Outputs: a score clamped to 15 to 99, score tiers at 85, 70 and 55, matched and missing skills, and plain-language reasons.",
          technologies: ["Python", "Rule-Based Scoring"],
          inputs: [
            "Skills",
            "Target roles",
            "Experience level",
            "Location",
            "Interests",
          ],
          outputs: [
            "Score (15–99)",
            "Score tiers (85, 70, 55)",
            "Matched/missing skills",
            "Plain-language reasons",
          ],
          details:
            "Evaluates candidate alignment using deterministic weighting: skills 45%, target role 25%, experience 15%, location 10%, interests 5%.",
          sourceLink:
            "https://github.com/OjasPal/Hirely/blob/main/backend/app/services/matching_service.py",
        },
        {
          id: "opportunity-search",
          label: "Opportunity Search",
          lane: "Backend service",
          responsibility:
            "Live discovery of job and internship postings. Tries Gemini Search grounding first (gemini-3.8-flash, 35 s timeout), then Groq Browser Search (openai/gpt-oss-20b, 45 s timeout). Both paths keep only links to a single posting, and Gemini results must also be cited by the search grounding. Falls back to the curated opportunity dataset when neither key is set or both calls fail.",
          technologies: [
            "Gemini Search grounding",
            "Groq Browser Search",
            "HTTP Client",
            "Curated Fallback",
          ],
          details:
            "Discovers current postings across the web with provider fallback, direct-posting URL filtering, and a curated static fallback.",
          sourceLink:
            "https://github.com/OjasPal/Hirely/blob/main/backend/app/services/opportunity_search_service.py",
        },
        {
          id: "trustcheck-service",
          label: "TrustCheck",
          lane: "Backend service",
          responsibility:
            "Legitimacy check for a listing. Analyses the domain, scans for risk indicators, reads the public posting page (localhost and private addresses are rejected) and can ask Gemini for a short explanation. Returns verified, unverified or suspicious with a score from 5 to 99, and community scam reports lower the score.",
          technologies: ["Python", "Rule-Based Scoring", "Gemini API"],
          details:
            "Gives students a transparent trust signal before they share personal details with a listing.",
          sourceLink:
            "https://github.com/OjasPal/Hirely/blob/main/backend/app/services/trustcheck_service.py",
        },
        {
          id: "action-planner",
          label: "Action Planner",
          lane: "Backend service",
          responsibility:
            "Builds a weekly plan of application tasks for a user: gathers candidate opportunities, filters and ranks them, schedules dated tasks and explains the plan. It does not call a language model. Tasks can be updated or deleted through the API.",
          technologies: ["Python", "SQLAlchemy", "Rule-Based Planning"],
          details:
            "Turns saved and recommended opportunities into a scheduled to-do list.",
          sourceLink:
            "https://github.com/OjasPal/Hirely/blob/main/backend/app/services/action_planner_service.py",
        },
        {
          id: "gemini-service",
          label: "Hirely Core Assistant",
          lane: "Backend service",
          responsibility:
            "Career chat. Tries gemini-3.8-flash, then gemini-3.5-flash-lite (15 s HTTP timeout, up to 1,000 output tokens, temperature 0.7), then Groq llama-3.3-70b-versatile (25 s timeout, 1,200 tokens, temperature 0.75). If every provider fails, the API returns an error instead of a canned reply.",
          technologies: [
            "Gemini API",
            "gemini-3.8-flash",
            "gemini-3.5-flash-lite",
            "Groq",
          ],
          details:
            "Generates contextual career advice, interview tips, and application assistance with automatic fallback to a secondary Gemini model and then Groq.",
          sourceLink:
            "https://github.com/OjasPal/Hirely/blob/main/backend/app/services/gemini_service.py",
        },
        {
          id: "email-service",
          label: "Email Service",
          lane: "Backend service",
          responsibility:
            "Welcome, opportunity and digest emails. Resend is the primary transport when configured, with SMTP as the fallback; the deployed service is configured with SMTP.",
          technologies: ["SMTP", "Resend", "Python"],
          details:
            "Dispatches user notifications, onboarding emails, and saved job digests.",
          sourceLink:
            "https://github.com/OjasPal/Hirely/blob/main/backend/app/services/email_service.py",
        },
        {
          id: "sqlite-db",
          label: "SQLite Database",
          lane: "Backend service",
          responsibility:
            "Async SQLAlchemy over aiosqlite. On Cloud Run it lives in /tmp, so it is ephemeral.",
          technologies: ["SQLite", "SQLAlchemy", "aiosqlite"],
          details:
            "Persists application state, user profiles, and tracked job statuses to /tmp/hirely.db.",
          sourceLink:
            "https://github.com/OjasPal/Hirely/blob/main/backend/app/core/database.py",
        },
        {
          id: "secret-manager",
          label: "Secret Manager",
          lane: "External services",
          responsibility:
            "Backend credentials are stored here and injected as environment variables at runtime.",
          technologies: ["Google Secret Manager", "Cloud IAM"],
          details:
            "Secures API keys and connection secrets away from source control and injects them into Cloud Run containers.",
        },
      ],
      edges: [
        { from: "browser-app", to: "firebase-auth", label: "sign in" },
        { from: "browser-app", to: "express-server", label: "loads the app" },
        {
          from: "browser-app",
          to: "fastapi-api",
          label: "API calls (base URL set at build time)",
        },
        {
          from: "fastapi-api",
          to: "matching-service",
          label: "rank opportunities",
        },
        {
          from: "fastapi-api",
          to: "opportunity-search",
          label: "discover",
        },
        {
          from: "fastapi-api",
          to: "trustcheck-service",
          label: "check listings",
        },
        {
          from: "fastapi-api",
          to: "action-planner",
          label: "weekly plan",
        },
        { from: "fastapi-api", to: "gemini-service", label: "career chat" },
        { from: "fastapi-api", to: "email-service", label: "send email" },
        { from: "fastapi-api", to: "sqlite-db", label: "read and write" },
        { from: "secret-manager", to: "fastapi-api", label: "runtime secrets" },
      ],
    },
    decisions: [
      {
        context: "Application Architecture",
        choice: "React and TypeScript frontend plus a Python FastAPI backend",
        alternatives: ["One monolithic application"],
        rationale: "Separates the interface from the backend logic.",
        tradeOff:
          "Two services to build, configure and deploy, and the frontend needs the backend URL at build time.",
      },
      {
        context: "Opportunity Discovery and Guidance Strategy",
        choice:
          "Gemini Search grounding for live discovery with Groq Browser Search as the fallback, and Gemini for generated guidance",
        alternatives: [
          "TinyFish web discovery, the first provider, replaced because its results were weak",
          "Relying on a language model alone",
        ],
        rationale:
          "Grounded search gives better live results, and filtering to direct posting URLs keeps discovery separate from response generation.",
        tradeOff:
          "Two AI providers and API keys. Curated data stands in for discovery when both are unavailable, and chat returns an error if both providers fail.",
      },
      {
        context: "Data Storage Strategy",
        choice: "SQLite with SQLAlchemy",
        alternatives: ["A managed production database"],
        rationale: "Simpler setup.",
        tradeOff:
          "Weaker durability: on Cloud Run the database lives in ephemeral /tmp storage, so data can be lost when an instance is replaced. Moving to a managed database is the planned upgrade.",
      },
      {
        context: "Deployment Packaging",
        choice:
          "Two Cloud Run services built from source with Google Cloud Buildpacks",
        alternatives: ["A Docker-based deployment"],
        rationale: "No Dockerfile to maintain.",
        tradeOff:
          "Start commands must be declared explicitly (a Procfile for the backend, tsx server.ts for the frontend), which is why tsx had to become a runtime dependency.",
      },
    ],
    problemsSolved: [
      {
        issue: "The Cloud Run frontend build failed",
        rootCause:
          "The start script runs tsx, but tsx was listed only as a development dependency and was pruned from the production build.",
        resolution: "Moved tsx into the runtime dependencies.",
      },
      {
        issue: "The hosted app could not reach the backend or sign users in",
        rootCause:
          "Localhost API URLs, and the deployed domain missing from Firebase Authentication's authorized domains.",
        resolution:
          "Supplied the deployed backend URL at build time through VITE_API_BASE_URL and authorized the Cloud Run frontend domain in Firebase.",
      },
    ],
    securityAndQuality: {
      summary:
        "What is in place today, and how the app behaves when an integration is unavailable.",
      rules: [
        "Backend credentials are stored in Google Secret Manager and injected at runtime. Frontend VITE_ values are treated as public and hold no private keys.",
        "Backend tests: 9 API tests (health, root, profile create and get, resume parsing, search, on-the-fly matching, summaries, tracker flow, discover and chat), 7 TrustCheck and Action Planner tests, plus a separate email test file.",
        "Pages fetched for summaries and TrustCheck must resolve to public hosts; localhost and private addresses are rejected.",
        "Graceful degradation: when Gemini and Groq cannot return live results, discovery falls back to curated opportunities. Chat tries Gemini, then Groq, and reports an error if both fail instead of showing a canned reply.",
      ],
    },
    limitations: [
      "Sign-in happens in the browser with Firebase. The API does not yet verify the Firebase ID token, so per-user access control is not enforced at the API layer. Server-side token verification is the next step.",
      "The browser cancels each chat request after 12 s, while the backend allows 15 s per Gemini request and 25 s for the Groq fallback, so slower replies can be cut off before they arrive.",
      "Curated sample opportunities mean not every result shown is live. Live search is written for jobs and internships, so other opportunity types are not covered by it.",
      "SQLite in /tmp and browser localStorage are not durable, account-isolated storage.",
      "The Express server and the FastAPI backend both define API routes, so the API surface is duplicated.",
      "Match scores come from hand-written weights. They are not learned from data, and their accuracy has not been evaluated.",
      "TrustCheck verdicts come from rules, domain lists and an optional Gemini explanation. They are signals, not guarantees, and their accuracy has not been evaluated.",
    ],
    appendix: {
      constants: [
        {
          parameter: "Gemini primary model",
          value: "gemini-3.8-flash",
          scope: "chat",
          notes: "as configured in source",
        },
        {
          parameter: "Gemini fallback model",
          value: "gemini-3.5-flash-lite",
          scope: "chat",
          notes: "as configured in source",
        },
        {
          parameter: "Gemini HTTP timeout",
          value: "15 s",
          scope: "per request",
          notes: "in the backend",
        },
        {
          parameter: "Gemini output limit and temperature",
          value: "1,000 tokens, 0.7",
          scope: "chat",
          notes: "in the backend",
        },
        {
          parameter: "Groq chat fallback",
          value: "llama-3.3-70b-versatile, 25 s, 1,200 tokens, 0.75",
          scope: "chat",
          notes: "used if both Gemini models fail",
        },
        {
          parameter: "Chat request timeout",
          value: "12 s",
          scope: "browser, per attempt",
          notes: "request is aborted",
        },
        {
          parameter: "Discovery search timeouts",
          value: "35 s Gemini Search, 45 s Groq Browser Search",
          scope: "backend",
          notes: "then curated data",
        },
        {
          parameter: "Discovery client retries",
          value: "1 retry (2 attempts), 8 s per attempt, 400 ms delay",
          scope: "browser",
          notes: "then falls back to curated data",
        },
        {
          parameter: "Match weights",
          value: "45 / 25 / 15 / 10 / 5",
          scope: "skills / role / experience / location / interests",
          notes: "score clamped to 15 to 99",
        },
        {
          parameter: "Match tiers",
          value: "85, 70, 55",
          scope: "score thresholds",
          notes: "tier labels not specified",
        },
        {
          parameter: "TrustCheck verdicts",
          value: "verified, unverified, suspicious",
          scope: "score 5 to 99",
          notes: "rule-based, optional Gemini explanation",
        },
        {
          parameter: "Deployment",
          value: "2 Cloud Run services, asia-south2",
          scope: "hirely and hirely-backend",
          notes: "Buildpacks, no Dockerfile",
        },
      ],
      models: [
        {
          primary: "gemini-3.8-flash",
          fallback: "gemini-3.5-flash-lite, then Groq llama-3.3-70b-versatile",
          role: "Hirely Core career assistant",
        },
        {
          primary: "gemini-3.8-flash (Search grounding)",
          fallback: "Groq openai/gpt-oss-20b (Browser Search)",
          role: "Live opportunity discovery",
        },
      ],
      endpointsSummary:
        "FastAPI mounts ten routers under /api (profile, search, recommendations, summary, tracker, chat, email, discover, trustcheck, planner) plus /health and /api/health routes.",
      sourceReferences: [
        {
          label: "frontend/src/context/AppContext.tsx",
          url: "https://github.com/OjasPal/Hirely/blob/main/frontend/src/context/AppContext.tsx",
        },
        {
          label: "frontend/src/services/firebase.ts",
          url: "https://github.com/OjasPal/Hirely/blob/main/frontend/src/services/firebase.ts",
        },
        {
          label: "frontend/server.ts",
          url: "https://github.com/OjasPal/Hirely/blob/main/frontend/server.ts",
        },
        {
          label: "backend/app/main.py",
          url: "https://github.com/OjasPal/Hirely/blob/main/backend/app/main.py",
        },
        {
          label: "backend/app/services/matching_service.py",
          url: "https://github.com/OjasPal/Hirely/blob/main/backend/app/services/matching_service.py",
        },
        {
          label: "backend/app/services/opportunity_search_service.py",
          url: "https://github.com/OjasPal/Hirely/blob/main/backend/app/services/opportunity_search_service.py",
        },
        {
          label: "backend/app/services/trustcheck_service.py",
          url: "https://github.com/OjasPal/Hirely/blob/main/backend/app/services/trustcheck_service.py",
        },
        {
          label: "backend/app/services/action_planner_service.py",
          url: "https://github.com/OjasPal/Hirely/blob/main/backend/app/services/action_planner_service.py",
        },
        {
          label: "backend/app/services/gemini_service.py",
          url: "https://github.com/OjasPal/Hirely/blob/main/backend/app/services/gemini_service.py",
        },
        {
          label: "backend/app/services/email_service.py",
          url: "https://github.com/OjasPal/Hirely/blob/main/backend/app/services/email_service.py",
        },
        {
          label: "backend/app/core/database.py",
          url: "https://github.com/OjasPal/Hirely/blob/main/backend/app/core/database.py",
        },
        {
          label: "backend/tests/test_api.py",
          url: "https://github.com/OjasPal/Hirely/blob/main/backend/tests/test_api.py",
        },
        {
          label: "backend/tests/test_trustcheck_and_planner.py",
          url: "https://github.com/OjasPal/Hirely/blob/main/backend/tests/test_trustcheck_and_planner.py",
        },
        {
          label: "backend/Procfile",
          url: "https://github.com/OjasPal/Hirely/blob/main/backend/Procfile",
        },
        {
          label: "frontend/package.json",
          url: "https://github.com/OjasPal/Hirely/blob/main/frontend/package.json",
        },
        {
          label: "README.md",
          url: "https://github.com/OjasPal/Hirely/blob/main/README.md",
        },
      ],
    },
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function hasCaseStudy(slug: string): boolean {
  return Boolean(caseStudies[slug]);
}

export function getAdjacentCaseStudies(currentSlug: string): {
  prev: CaseStudy | null;
  next: CaseStudy | null;
} {
  const currentIndex = projectOrder.indexOf(currentSlug);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prevSlug = currentIndex > 0 ? projectOrder[currentIndex - 1] : null;
  const nextSlug =
    currentIndex < projectOrder.length - 1 ? projectOrder[currentIndex + 1] : null;

  return {
    prev: prevSlug ? caseStudies[prevSlug] || null : null,
    next: nextSlug ? caseStudies[nextSlug] || null : null,
  };
}

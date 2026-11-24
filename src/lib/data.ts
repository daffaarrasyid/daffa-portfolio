export interface ExperienceItem {
  year: string;
  period: string;
  role: string;
  company: string;
  location: string;
  category?: string;
  description: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Website" | "AI/ML" | "Mobile";
  year: string;
  description: string;
  metrics?: string;
  tags: string[];
  link: string;
  github: string;
  featured: boolean;
  accentColor: string;
}

export interface AchievementItem {
  year: string;
  title: string;
  issuer: string;
  type: string;
  description: string;
}

export const PERSONAL_INFO = {
  name: "Muhammad Daffa Ar-Rasyid",
  headline: "Creative Developer & AI/Web Engineer",
  tagline: "Crafting tactile digital experiences, scalable web architectures, and intelligent machine learning solutions.",
  status: "Available for select opportunities & collaborations",
  location: "Jakarta, Indonesia (UTC+7)",
  email: "daffa.arrasyid@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://x.com",
  bioShort: "Software engineer and creative developer specializing in bridging high-performance web systems with modern machine learning pipelines.",
  bioLong: "Focused on building digital products that blend editorial precision with fluid spatial interactions. I approach software engineering with an obsession for micro-interactions, clean architecture, and the intersection where artificial intelligence meets interactive user interfaces.",
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    year: "2024",
    period: "2024 — Present",
    role: "Lead Fullstack & AI Solutions Engineer",
    company: "NeuralCraft Studio",
    location: "Jakarta, ID",
    description: "Spearheading development of enterprise AI web applications, generative model integrations, and high-performance frontend interfaces with fluid GSAP animations.",
    skills: ["Next.js", "TypeScript", "Python", "FastAPI", "PyTorch", "GSAP", "Tailwind CSS"],
  },
  {
    year: "2023",
    period: "2023 — 2024",
    role: "Frontend & Creative Developer",
    company: "Vektor Digital Works",
    location: "Remote / Hybrid",
    description: "Designed and engineered award-winning interactive client websites, headless CMS architectures, and immersive WebGL Three.js spatial experiences.",
    skills: ["React", "Three.js", "Tailwind CSS", "GSAP ScrollTrigger", "Lenis", "REST APIs"],
  },
  {
    year: "2022",
    period: "2022 — 2023",
    role: "Machine Learning Researcher & Developer",
    company: "AI Innovation Lab",
    location: "Bandung, ID",
    description: "Trained and deployed Computer Vision and NLP models for automated document classification and predictive modeling pipelines.",
    skills: ["Python", "TensorFlow", "Scikit-Learn", "OpenCV", "Docker", "Flask"],
  },
  {
    year: "2021",
    period: "2021 — 2022",
    role: "Junior Web Developer & UI Designer",
    company: "Archipelago Digital",
    location: "Jakarta, ID",
    description: "Built responsive web applications, created design systems in Figma, and contributed to open-source developer tooling.",
    skills: ["JavaScript", "HTML5/CSS3", "Vue.js", "Figma", "Git"],
  },
];

export const TECH_STACK = {
  web: [
    { name: "Next.js", level: "Advanced", desc: "App Router, SSR, Turbopack" },
    { name: "React", level: "Expert", desc: "Hooks, Concurrency, State Design" },
    { name: "TypeScript", level: "Expert", desc: "Strict Type Safety, Generics" },
    { name: "Tailwind CSS", level: "Expert", desc: "Modern Utility Design Systems" },
    { name: "GSAP", level: "Advanced", desc: "ScrollTrigger, Timelines, Morph" },
    { name: "Three.js", level: "Intermediate", desc: "WebGL, Shaders, 3D Scenes" },
    { name: "Node.js", level: "Advanced", desc: "Express, Microservices, Async I/O" },
  ],
  aiml: [
    { name: "Python", level: "Expert", desc: "NumPy, Pandas, Async Architecture" },
    { name: "PyTorch", level: "Advanced", desc: "Deep Learning, Custom Tensors" },
    { name: "TensorFlow", level: "Intermediate", desc: "Model Training & Optimization" },
    { name: "FastAPI", level: "Advanced", desc: "High-throughput AI Inference APIs" },
    { name: "Hugging Face", level: "Advanced", desc: "Transformers, LLM Fine-tuning" },
    { name: "Computer Vision", level: "Intermediate", desc: "Object Detection, OpenCV" },
  ],
  tools: [
    { name: "Docker", level: "Advanced", desc: "Containerization & Multi-stage builds" },
    { name: "Git & GitHub", level: "Expert", desc: "CI/CD Actions, Team Workflows" },
    { name: "PostgreSQL", level: "Advanced", desc: "Prisma, Complex Queries, Indexing" },
    { name: "Redis", level: "Intermediate", desc: "In-memory Caching, Pub/Sub" },
    { name: "Linux / Bash", level: "Advanced", desc: "Server Admin & Shell Scripting" },
    { name: "Figma", level: "Advanced", desc: "Design Systems & Interactive Prototypes" },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    title: "NeuroVision Studio",
    category: "AI/ML",
    year: "2024",
    description: "A real-time AI vision diagnostic suite that analyzes biomedical imagery using convolutional neural networks and explains results with saliency heatmaps.",
    metrics: "98.4% Classification Accuracy · <80ms Inference Latency",
    tags: ["PyTorch", "Next.js", "FastAPI", "Three.js", "Docker"],
    link: "https://example.com/project-1",
    github: "https://github.com",
    featured: true,
    accentColor: "#ff4d00",
  },
  {
    id: "02",
    title: "Aura Editorial E-Commerce",
    category: "Website",
    year: "2024",
    description: "Next-generation spatial packaging and luxury retail storefront with dynamic GSAP scroll-bound scene transitions and real-time cart synchronization.",
    metrics: "+42% Engagement Rate · 99/100 Lighthouse Performance",
    tags: ["Next.js", "GSAP ScrollTrigger", "Lenis", "Tailwind CSS"],
    link: "https://example.com/project-2",
    github: "https://github.com",
    featured: true,
    accentColor: "#22c55e",
  },
  {
    id: "03",
    title: "PulseFlow Mobile Suite",
    category: "Mobile",
    year: "2023",
    description: "Cross-platform biometric tracking and daily workflow optimizer featuring haptic feedback, local SQLite encryption, and cloud backup sync.",
    metrics: "15,000+ Active Users · 4.9 App Store Rating",
    tags: ["React Native", "TypeScript", "SQLite", "Tailwind"],
    link: "https://example.com/project-3",
    github: "https://github.com",
    featured: true,
    accentColor: "#3b82f6",
  },
  {
    id: "04",
    title: "OmniChat LLM Engine",
    category: "AI/ML",
    year: "2023",
    description: "Custom Retrieval-Augmented Generation (RAG) system with vectorized semantic memory, document summarization, and multi-turn contextual dialog.",
    metrics: "1M+ Tokens Processed Daily · Pinecone Vector DB",
    tags: ["Python", "LangChain", "OpenAI / HuggingFace", "FastAPI"],
    link: "https://example.com/project-4",
    github: "https://github.com",
    featured: false,
    accentColor: "#a855f7",
  },
  {
    id: "05",
    title: "Kinetix Creative Showcase",
    category: "Website",
    year: "2023",
    description: "Experimental portfolio concept exploring kinetic typography, magnetic DOM interactions, and WebGL particle vortex fields.",
    metrics: "Awwwards Honorable Mention Nominee",
    tags: ["Three.js", "GSAP", "WebGL", "Lenis Scroll"],
    link: "https://example.com/project-5",
    github: "https://github.com",
    featured: false,
    accentColor: "#eab308",
  },
  {
    id: "06",
    title: "Zenith Field Monitor",
    category: "Mobile",
    year: "2022",
    description: "Offline-first agricultural IoT sensor data visualizer with dynamic offline sync, geo-tagging, and automated alerts for field operators.",
    metrics: "Deployed across 12 Plantation Hubs",
    tags: ["Flutter / React Native", "Node.js", "MQTT", "Maps API"],
    link: "https://example.com/project-6",
    github: "https://github.com",
    featured: false,
    accentColor: "#14b8a6",
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    year: "2024",
    title: "1st Place Winner — National AI Innovation Challenge",
    issuer: "Ministry of ICT & Tech Ecosystem",
    type: "National Competition",
    description: "Awarded top honor for developing an autonomous visual intelligence system for remote agricultural pest detection.",
  },
  {
    year: "2024",
    title: "Published Researcher — Machine Learning in Healthcare",
    issuer: "Journal of Advanced Computing & Methodika",
    type: "Academic Research",
    description: "Co-authored peer-reviewed paper on deep learning optimizations for multi-spectral image segmentation.",
  },
  {
    year: "2023",
    title: "Best Creative Tech & UI Design Award",
    issuer: "South East Asia Web Festival",
    type: "Design & Development",
    description: "Recognized for outstanding micro-interactions, smooth scroll performance, and accessibility in digital packaging design.",
  },
  {
    year: "2023",
    title: "Global Finalist — Hackathon for Climate Intelligence",
    issuer: "International Green Tech Foundation",
    type: "Global Hackathon",
    description: "Ranked Top 10 globally out of 800+ teams for real-time carbon emission forecasting and geospatial analytics dashboard.",
  },
  {
    year: "2022",
    title: "TensorFlow & Cloud Certified Developer",
    issuer: "Google Developers Certification",
    type: "Professional Certification",
    description: "Demonstrated advanced competencies in building deep learning architectures, transfer learning, and model production deployment.",
  },
  {
    year: "2022",
    title: "Dean's Honor List for Academic & Tech Excellence",
    issuer: "Faculty of Computer Science & Engineering",
    type: "University Honor",
    description: "Maintained top 1% academic standing while leading the university developer student community.",
  },
];

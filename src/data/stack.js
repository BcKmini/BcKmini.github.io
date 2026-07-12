const dv = (p) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${p}`;
const si = (slug) => `https://cdn.simpleicons.org/${slug}`;
const openaiIcon = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg";

export const categories = [
  { key: "all", label: "all" },
  { key: "lang", label: "Language" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend · DB" },
  { key: "ai", label: "AI · Vision" },
  { key: "aitools", label: "AI Coding" },
  { key: "cloud", label: "Cloud · DevOps" },
  { key: "collab", label: "Collaboration" },
];

export const stack = [
  { cat: "lang", name: "Python", icon: dv("python/python-original.svg") },
  { cat: "lang", name: "Java", icon: dv("java/java-original.svg") },
  { cat: "lang", name: "TypeScript", icon: dv("typescript/typescript-original.svg") },
  { cat: "lang", name: "JavaScript", icon: dv("javascript/javascript-original.svg") },
  { cat: "lang", name: "PHP", icon: dv("php/php-original.svg") },
  { cat: "lang", name: "Solidity", icon: dv("solidity/solidity-original.svg"), invert: true },
  { cat: "lang", name: "SQL", icon: dv("azuresqldatabase/azuresqldatabase-original.svg") },

  { cat: "frontend", name: "HTML5", icon: dv("html5/html5-original.svg") },
  { cat: "frontend", name: "CSS3", icon: dv("css3/css3-original.svg") },
  { cat: "frontend", name: "React", icon: dv("react/react-original.svg") },
  { cat: "frontend", name: "Vue", icon: dv("vuejs/vuejs-original.svg") },
  { cat: "frontend", name: "Vite", icon: dv("vitejs/vitejs-original.svg") },
  { cat: "frontend", name: "Electron", icon: dv("electron/electron-original.svg") },
  { cat: "frontend", name: "Tailwind", icon: dv("tailwindcss/tailwindcss-original.svg") },

  { cat: "backend", name: "FastAPI", icon: dv("fastapi/fastapi-original.svg") },
  { cat: "backend", name: "Flask", icon: dv("flask/flask-original.svg"), invert: true },
  { cat: "backend", name: "Spring", icon: dv("spring/spring-original.svg") },
  { cat: "backend", name: "SQLAlchemy", icon: dv("sqlalchemy/sqlalchemy-original.svg"), invert: true },
  { cat: "backend", name: "MySQL", icon: dv("mysql/mysql-original.svg") },
  { cat: "backend", name: "MongoDB", icon: dv("mongodb/mongodb-original.svg") },
  { cat: "backend", name: "Redis", icon: dv("redis/redis-original.svg") },

  { cat: "ai", name: "PyTorch", icon: dv("pytorch/pytorch-original.svg") },
  { cat: "ai", name: "TensorFlow", icon: dv("tensorflow/tensorflow-original.svg") },
  { cat: "ai", name: "YOLO11", icon: si("ultralytics") },
  { cat: "ai", name: "OpenCV", icon: dv("opencv/opencv-original.svg") },
  { cat: "ai", name: "FFmpeg", icon: si("ffmpeg") },
  { cat: "ai", name: "LangChain", icon: si("langchain") },
  { cat: "ai", name: "OpenAI", icon: openaiIcon, invert: true },
  { cat: "ai", name: "Whisper", icon: openaiIcon, invert: true },

  { cat: "aitools", name: "Claude Code", icon: si("claude") },
  { cat: "aitools", name: "Codex", icon: openaiIcon, invert: true },
  { cat: "aitools", name: "Cursor", icon: si("cursor"), invert: true },
  { cat: "aitools", name: "Gemini", icon: si("googlegemini") },
  { cat: "aitools", name: "Copilot", icon: si("githubcopilot"), invert: true },

  { cat: "cloud", name: "AWS", icon: dv("amazonwebservices/amazonwebservices-original-wordmark.svg"), invert: true },
  { cat: "cloud", name: "Kubernetes", icon: dv("kubernetes/kubernetes-original.svg") },
  { cat: "cloud", name: "Docker", icon: dv("docker/docker-original.svg") },
  { cat: "cloud", name: "GitHub Actions", icon: dv("githubactions/githubactions-original.svg") },
  { cat: "cloud", name: "Linux", icon: dv("linux/linux-original.svg") },
  { cat: "cloud", name: "Git", icon: dv("git/git-original.svg") },

  { cat: "collab", name: "Figma", icon: dv("figma/figma-original.svg") },
  { cat: "collab", name: "Notion", icon: dv("notion/notion-original.svg"), invert: true },
  { cat: "collab", name: "Slack", icon: dv("slack/slack-original.svg") },
  { cat: "collab", name: "Discord", icon: si("discord"), invert: true },
];

export const stackNotes = [
  {
    cat: "cloud",
    label: "AWS",
    text: "EC2 · S3 · VPC · IAM · RDS · Lambda · ELB · Route53 · CloudFront · Auto Scaling · CodePipeline",
  },
  {
    cat: "cloud",
    label: "K8s",
    text: "Deployment · Service · Ingress · HPA · ConfigMap · Secret · PV/PVC",
  },
  {
    cat: "aitools",
    label: "Harness",
    text: "Claude Code 기반 멀티 에이전트·서브에이전트 워크플로우로 반복 작업을 자동화하고, Cursor·Copilot·Gemini·Codex를 상황에 맞게 병행하는 AI 하네스 엔지니어링을 실습하고 있습니다.",
  },
];

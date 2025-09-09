import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitFork, Eye } from "lucide-react";

type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  githubRepo: string; // "owner/repo"
  stats: { stars: number; forks: number; watchers: number };
  featured: boolean;
  status: string;
  category: string;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([
    // 🔹 Other Projects (최신순)
    {
      title: "NoteFlow",
      description:
        "An AI-powered learning platform that provides real-time speech-to-text notes, automatic summarization, and quiz generation. Graduation project currently in progress.",
      image: "📝",
      tech: ["React", "Vite", "Tailwind", "TypeScript", "FastAPI", "MySQL", "Electron", "OpenCV"],
      github: "https://github.com/KKU-NoteFlow", // 수정 필요
      demo: "https://your-noteflow-demo.vercel.app", // 수정 필요
      githubRepo: "yourusername/noteflow", // 수정 필요
      stats: { stars: 0, forks: 0, watchers: 0 },
      featured: false,
      status: "In Progress",
      category: "AI/EdTech",
    },
    {
      title: "Wildlife Observation Service",
      description:
        "A FastAPI + MySQL based system for collecting wildlife observations (photo, video, audio). Integrates Kakao Map and OpenWeather API for real-time context such as location, altitude, and weather.",
      image: "🐦",
      tech: ["FastAPI", "MySQL", "React", "Vite", "OpenWeather API", "Kakao Map API"],
      github: "https://github.com/BcKmini/Collection-bird", // 수정 필요
      demo: "https://your-wildlife-demo.vercel.app", // 수정 필요
      githubRepo: "yourusername/wildlife-observation", // 수정 필요
      stats: { stars: 0, forks: 0, watchers: 0 },
      featured: false,
      status: "Completed",
      category: "AI/Environment",
    },
    {
      title: "Integrated Medical Management Service",
      description:
        "A PHP & MySQL based platform integrating hospitals, pharmacies, and patients. Features include digital prescriptions, medical facility search (Kakao Map + Public Data), and review system.",
      image: "🏥",
      tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Kakao Map API", "Public Data API"],
      github: "https://github.com/BcKmini/Database", // 수정 필요
      demo: "https://your-medical-service-demo.vercel.app", // 수정 필요
      githubRepo: "yourusername/medical-service", // 수정 필요
      stats: { stars: 0, forks: 0, watchers: 0 },
      featured: false,
      status: "Completed",
      category: "Healthcare",
    },

    // 🔹 Featured Projects
    {
      title: "Cheonan Urban Regeneration Chatbot",
      description:
        "A custom AI chatbot service for the Cheonan Urban Regeneration Support Center. Helps citizens and visitors quickly access information such as greetings, organization, projects, directions, and announcements.",
      image: "🤖",
      tech: ["React", "FastAPI", "Redis", "LangChain", "OpenAI API"],
      github: "https://github.com/KT-TeamProject-11",
      demo: "https://cheonan-chatbot-demo.vercel.app",
      githubRepo: "bckmini/cheonan-chatbot",
      stats: { stars: 0, forks: 0, watchers: 0 },
      featured: true,
      status: "Completed",
      category: "Public Sector",
    },
    {
      title: "Video Timeline Detection Service",
      description:
        "A FastAPI-based service developed for the National Institute of Ecology. Detects roe deer in uploaded observation videos using YOLO11, marks timelines, and exports clips/data (CSV/JSON/MP4).",
      image: "🎥",
      tech: ["FastAPI", "MySQL", "YOLO11", "OpenCV", "FFmpeg"],
      github: "https://github.com/BcKmini/CCTV_Timeline",
      demo: "https://video-timeline-demo.vercel.app",
      githubRepo: "bckmini/video-timeline-service",
      stats: { stars: 0, forks: 0, watchers: 0 },
      featured: true,
      status: "Completed",
      category: "AI/Computer Vision",
    },
  ]);

  // 🔹 Fetch GitHub Stats
  useEffect(() => {
    const fetchGitHubStats = async () => {
      const updated = await Promise.all(
        projects.map(async (project) => {
          try {
            const res = await fetch(`https://api.github.com/repos/${project.githubRepo}`);
            if (!res.ok) throw new Error("GitHub API error");
            const data = await res.json();
            return {
              ...project,
              stats: {
                stars: data.stargazers_count || 0,
                forks: data.forks_count || 0,
                watchers: data.subscribers_count || 0,
              },
            };
          } catch (err) {
            console.error(`Failed to fetch stats for ${project.githubRepo}`, err);
            return project;
          }
        })
      );
      setProjects(updated);
    };

    fetchGitHubStats();
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const handleGitHubClick = (githubUrl: string) => {
    window.open(githubUrl, "_blank", "noopener,noreferrer");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-yellow-500";
      case "Planned":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing my experience in AI, full-stack development, and public sector solutions.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project) => (
            <Card
              key={project.title}
              className="overflow-hidden bg-card border-border hover:shadow-glow-primary transition-all duration-300 hover:scale-105 group"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`${getStatusColor(project.status)} text-white`}>
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

                {/* GitHub Stats */}
                <div className="flex items-center gap-4 mb-6 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{project.stats.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    <span>{project.stats.forks}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{project.stats.watchers}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleGitHubClick(project.github)}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            Other <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Card
                key={project.title}
                className="p-6 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </div>
                  <Badge className={`${getStatusColor(project.status)} text-white text-xs`}>
                    {project.status}
                  </Badge>
                </div>

                <h4 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h4>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* GitHub Stats */}
                <div className="flex items-center gap-3 mb-4 text-muted-foreground text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span>{project.stats.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3" />
                    <span>{project.stats.forks}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => handleGitHubClick(project.github)}
                  >
                    <Github className="w-3 h-3 mr-1" />
                    Code
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* GitHub Profile Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => handleGitHubClick("https://github.com/bckmini")}
          >
            <Github className="w-5 h-5 mr-2" />
            View more projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Star, GitFork, Eye } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "React와 Node.js로 구축한 풀스택 이커머스 플랫폴입니다. 사용자 인증, 결제 시스템, 관리자 대시보드를 포함합니다.",
      image: "🛒",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      // TODO: 실제 GitHub 저장소 URL로 교체하세요
      // 예시: github: "https://github.com/yourusername/ecommerce-platform",
      github: "https://github.com/yourusername/ecommerce-platform", // ← 본인의 실제 GitHub 저장소 URL로 변경
      demo: "https://your-ecommerce-demo.vercel.app", // ← 실제 배포 URL로 변경
      stats: { stars: 24, forks: 8, watchers: 12 },
      featured: true,
      status: "완료", // 상태: 완료, 진행중, 계획중
      category: "Full Stack"
    },
    {
      title: "Task Management App",
      description: "팀 협업을 위한 태스크 관리 애플리케이션입니다. 실시간 알림과 칸반 보드 기능을 제공합니다.",
      image: "📋",
      tech: ["Vue.js", "Firebase", "Tailwind CSS"],
      // TODO: 실제 GitHub 저장소 URL로 교체하세요
      github: "https://github.com/yourusername/task-manager", // ← 본인의 실제 GitHub 저장소 URL로 변경
      demo: "https://your-taskmanager-demo.vercel.app", // ← 실제 배포 URL로 변경
      stats: { stars: 15, forks: 3, watchers: 8 },
      featured: true,
      status: "진행중",
      category: "Frontend"
    },
    {
      title: "Portfolio Website", 
      description: "반응형 포트폴리오 웹사이트로 SEO 최적화와 다크모드를 지원합니다.",
      image: "💼",
      tech: ["Next.js", "TypeScript", "Framer Motion"],
      // TODO: 실제 GitHub 저장소 URL로 교체하세요
      github: "https://github.com/yourusername/portfolio", // ← 본인의 실제 GitHub 저장소 URL로 변경
      demo: "https://your-portfolio.com", // ← 실제 배포 URL로 변경
      stats: { stars: 32, forks: 12, watchers: 20 },
      featured: false,
      status: "완료",
      category: "Frontend"
    },
    {
      title: "Weather Dashboard",
      description: "실시간 날씨 정보를 제공하는 대시보드 애플리케이션입니다. 차트와 지도 시각화를 포함합니다.",
      image: "🌤️",
      tech: ["React", "Chart.js", "OpenWeather API"],
      // TODO: 실제 GitHub 저장소 URL로 교체하세요
      github: "https://github.com/yourusername/weather-dashboard", // ← 본인의 실제 GitHub 저장소 URL로 변경
      demo: "https://your-weather-app.vercel.app", // ← 실제 배포 URL로 변경
      stats: { stars: 18, forks: 6, watchers: 10 },
      featured: false,
      status: "완료",
      category: "Frontend"
    },
    {
      title: "Blog Platform",
      description: "마크다운 지원과 댓글 시스템을 갖춘 개인 블로그 플랫폼입니다.",
      image: "📝",
      tech: ["Gatsby", "GraphQL", "Netlify CMS"],
      // TODO: 실제 GitHub 저장소 URL로 교체하세요
      github: "https://github.com/yourusername/blog-platform", // ← 본인의 실제 GitHub 저장소 URL로 변경
      demo: "https://your-blog.netlify.app", // ← 실제 배포 URL로 변경
      stats: { stars: 9, forks: 2, watchers: 5 },
      featured: false,
      status: "완료",
      category: "Full Stack"
    },
    {
      title: "Chat Application",
      description: "Socket.io를 활용한 실시간 채팅 애플리케이션입니다. 파일 공유와 이모지 반응을 지원합니다.",
      image: "💬",
      tech: ["Socket.io", "Express", "React"],
      // TODO: 실제 GitHub 저장소 URL로 교체하세요
      github: "https://github.com/yourusername/chat-app", // ← 본인의 실제 GitHub 저장소 URL로 변경
      demo: "https://your-chat-app.herokuapp.com", // ← 실제 배포 URL로 변경
      stats: { stars: 21, forks: 7, watchers: 14 },
      featured: false,
      status: "진행중",
      category: "Backend"
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  // GitHub 링크 클릭 핸들러 함수
  const handleGitHubClick = (githubUrl: string) => {
    // 새 탭에서 GitHub 저장소 열기
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  // 데모 링크 클릭 핸들러 함수
  const handleDemoClick = (demoUrl: string) => {
    // 새 탭에서 라이브 데모 열기
    window.open(demoUrl, '_blank', 'noopener,noreferrer');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '완료': return 'bg-green-500';
      case '진행중': return 'bg-yellow-500';
      case '계획중': return 'bg-blue-500';
      default: return 'bg-gray-500';
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
            다양한 기술을 활용하여 개발한 프로젝트들입니다. 
            각 프로젝트는 실제 문제를 해결하기 위해 만들어졌습니다.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
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
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

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
                  {/* 
                    GitHub 링크 버튼 - 클릭 시 실제 GitHub 저장소로 이동
                    사용법: 위의 projects 배열에서 각 프로젝트의 github 필드를 
                    본인의 실제 GitHub 저장소 URL로 변경하세요
                  */}
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => handleDemoClick(project.demo)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
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
            {otherProjects.map((project, index) => (
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

                {/* GitHub Stats for smaller cards */}
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
                  {/* 
                    작은 프로젝트 카드의 버튼들도 동일하게 GitHub 링크 연결
                    handleDemoClick과 handleGitHubClick 함수 사용
                  */}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-xs"
                    onClick={() => handleDemoClick(project.demo)}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Demo
                  </Button>
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

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => handleGitHubClick('https://github.com/yourusername')} // ← 본인의 GitHub 프로필 URL로 변경
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub에서 더 많은 프로젝트 보기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;

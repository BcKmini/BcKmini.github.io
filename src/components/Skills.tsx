import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  // GitHub style skill icons using skillicons.dev
  const techStack = {
    frontend: "react,typescript,nextjs,tailwindcss,vue,javascript,html,css",
    backend: "nodejs,python,java,express,spring,django,flask",
    database: "postgresql,mongodb,mysql,redis,firebase,supabase",
    devops: "docker,aws,git,github,vercel,figma,vscode,linux"
  };

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "🎨",
      description: "Modern UI/UX with responsive design",
      iconSet: techStack.frontend,
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js", "JavaScript"],
      level: "Advanced"
    },
    {
      title: "Backend Development", 
      icon: "⚙️",
      description: "Scalable server-side solutions",
      iconSet: techStack.backend,
      skills: ["Node.js", "Python", "Java", "Express", "Spring Boot", "Django"],
      level: "Advanced"
    },
    {
      title: "Database & Storage",
      icon: "🗄️", 
      description: "Data modeling and optimization",
      iconSet: techStack.database,
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase", "Firebase"],
      level: "Intermediate"
    },
    {
      title: "DevOps & Tools",
      icon: "🛠️",
      description: "CI/CD and cloud deployment",
      iconSet: techStack.devops,
      skills: ["Docker", "AWS", "Git", "GitHub Actions", "Vercel", "Figma"],
      level: "Intermediate"
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Technical <span className="bg-gradient-primary bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            다양한 기술 스택을 활용하여 풀스택 개발부터 
            클라우드 배포까지 전반적인 개발 생명주기를 담당합니다.
          </p>
        </div>

        {/* GitHub Style Tech Stack Icons */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Tech Stack</span>
          </h3>
          <div className="flex justify-center">
            <img 
              src={`https://skillicons.dev/icons?i=${Object.values(techStack).join(',')}&perline=12`}
              alt="Tech Stack Icons"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title}
              className="p-8 bg-card border-border hover:shadow-glow-primary transition-all duration-300 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="text-4xl">{category.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {category.title}
                    </h3>
                    <Badge 
                      className={`${category.level === 'Advanced' ? 'bg-primary' : 'bg-secondary'} text-white`}
                    >
                      {category.level}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.description}
                  </p>
                </div>
              </div>
              
              {/* Skill Icons for this category */}
              <div className="mb-4 flex justify-center">
                <img 
                  src={`https://skillicons.dev/icons?i=${category.iconSet}&perline=6`}
                  alt={`${category.title} icons`}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill}
                    variant="secondary"
                    className="bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">
            새로운 기술을 배우는 것을 좋아하며, 항상 최신 트렌드를 따라갑니다
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["AI/ML", "Web3", "Mobile", "Cloud", "DevOps"].map((area) => (
              <Badge 
                key={area}
                className="bg-primary text-primary-foreground hover:shadow-glow-primary transition-all duration-200 hover:scale-110"
              >
                {area} 학습 중
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
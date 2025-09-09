import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js", "JavaScript"]
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: ["Node.js", "Python", "Java", "Express", "Spring Boot", "Django"]
    },
    {
      title: "Database",
      icon: "🗄️",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase", "Firebase"]
    },
    {
      title: "DevOps & Tools",
      icon: "🛠️",
      skills: ["Docker", "AWS", "Git", "GitHub Actions", "Vercel", "Figma"]
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title}
              className="p-6 bg-card border-border hover:shadow-glow-primary transition-all duration-300 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4 text-center">{category.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill}
                    variant="secondary"
                    className="bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
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
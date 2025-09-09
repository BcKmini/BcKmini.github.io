import { Card } from "@/components/ui/card";

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      iconSet: "html,css,js,ts,python,c",
      skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Python", "C"]
    },
    {
      title: "Frontend",
      iconSet: "react,vue,nextjs,tailwindcss",
      skills: ["React", "Vue.js", "Next.js", "Tailwind CSS"]
    },
    {
      title: "Backend",
      iconSet: "nodejs,express,django,flask",
      skills: ["Node.js", "Express", "Django", "Flask"]
    },
    {
      title: "Database",
      iconSet: "sqlite,firebase,mysql,mongodb",
      skills: ["SQLite", "Firebase", "MySQL", "MongoDB"]
    },
    {
      title: "Framework",
      iconSet: "electron,fastapi,tensorflow,pytorch",
      skills: ["Electron", "fastapi", "TensorFlow", "PyTorch"]
    },
    {
      title: "DevOps",
      iconSet: "docker,linux,aws,github,vscode,discord",
      skills: ["Docker", "Linux", "AWS", "GitHub", "VS Code", "Discord"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Technical <span className="bg-gradient-primary bg-clip-text text-transparent">Stack</span>
          </h2>
         
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title}
              className="p-8 bg-card border-border hover:shadow-glow-primary transition-all duration-300 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-6 bg-gradient-primary bg-clip-text text-transparent">
                  {category.title}
                </h3>
                
                {/* Skill Icons for this category */}
                <div className="flex justify-center mb-4">
                  <img 
                    src={`https://skillicons.dev/icons?i=${category.iconSet}&perline=3`}
                    alt={`${category.title} icons`}
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
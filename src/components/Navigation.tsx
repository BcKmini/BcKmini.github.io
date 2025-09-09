import { useEffect, useState } from "react";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "홈", icon: "🏠" },
    { id: "about", label: "소개", icon: "👋" },
    { id: "skills", label: "기술", icon: "⚡" },
    { id: "projects", label: "프로젝트", icon: "💼" },
    { id: "contact", label: "연락처", icon: "📬" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPos = window.scrollY + 100;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPos >= offsetTop && scrollPos < offsetTop + height) {
          setActiveSection(element.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-full p-3 shadow-glow-secondary">
        <div className="space-y-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`
                relative group block w-4 h-4 rounded-full transition-all duration-300
                ${activeSection === section.id 
                  ? 'bg-primary shadow-glow-primary scale-125' 
                  : 'bg-muted-foreground/30 hover:bg-primary/60 hover:scale-110'
                }
              `}
              title={section.label}
            >
              {/* Tooltip */}
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground whitespace-nowrap shadow-lg">
                  <span className="mr-2">{section.icon}</span>
                  {section.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
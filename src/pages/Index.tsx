import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import GitHubStats from "@/components/GitHubStats";
import Projects from "@/components/Projects";
import Vision from "@/components/Vision";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Skills />
      <GitHubStats />
      <Projects />
      <Vision />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Developer Portfolio. Made with ❤️ using React & Tailwind CSS
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            "Code is poetry, and every bug is a haiku waiting to be debugged." 🐛✨
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I am an aspiring researcher passionate about 
            <span className="text-primary font-semibold"> multi-modal understanding, generative AI, and robotics</span>. 
            My long-term goal is to contribute to 
            <span className="text-primary font-semibold"> human–AI symbiosis</span> through 
            interpretable, adaptive, and physically grounded intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                Research Philosophy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I believe that artificial intelligence should not only excel in benchmark 
                performance but also align with human values, adaptability, and real-world 
                applicability. My focus is on bridging 
                <span className="font-semibold"> perception and action</span> 
                by combining vision, language, and sensor fusion with generative models.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                Why CVLAB
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                CVLAB’s pioneering research in 
                <span className="font-semibold"> multi-modal understanding</span>, 
                <span className="font-semibold"> diffusion-based generative AI</span>, 
                and <span className="font-semibold">robot learning</span> 
                resonates with my vision. 
                I aim to grow as a researcher by contributing to projects on 
                <span className="font-semibold"> vision-language models, 3D understanding, 
                and AI for human–robot collaboration</span>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105">
              <div>
                <h4 className="text-lg font-semibold mb-2">🔬 Interests</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Multi-modal learning (vision, language, sensor fusion), 
                  generative AI, 3D scene understanding, and robot policy learning.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105">
              <div>
                <h4 className="text-lg font-semibold mb-2">🎯 Goal</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To develop AI systems that can perceive, reason, and act in 
                  complex real-world environments while fostering 
                  human–AI collaboration.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

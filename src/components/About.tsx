import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            열정적인 개발자로서 끊임없이 학습하고 성장하며, 
            사용자 중심의 솔루션을 만들어갑니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                개발에 대한 철학
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                좋은 코드는 단순히 작동하는 것이 아니라, 읽기 쉽고 유지보수가 가능하며 
                확장성이 있어야 한다고 믿습니다. 사용자의 니즈를 깊이 이해하고, 
                최신 기술을 활용하여 효율적이고 아름다운 솔루션을 만드는 것이 목표입니다.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                지속적인 학습
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                빠르게 변화하는 기술 트렌드에 발맞춰 새로운 도구와 프레임워크를 
                학습하며, 오픈소스 프로젝트에 기여하고 개발 커뮤니티와 
                지식을 공유하는 것을 즐깁니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3+</div>
                <div className="text-muted-foreground">년 경험</div>
              </div>
            </Card>
            
            <Card className="p-6 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">완료 프로젝트</div>
              </div>
            </Card>
            
            <Card className="p-6 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">사용 기술</div>
              </div>
            </Card>
            
            <Card className="p-6 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">열정</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
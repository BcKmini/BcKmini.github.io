import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Lightbulb, Rocket, Users, Brain, Code } from "lucide-react";

const Vision = () => {
  const visionAreas = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "AI & Machine Learning",
      description: "인공지능과 머신러닝 기술을 활용하여 지능형 웹 애플리케이션을 개발하고, 사용자 경험을 혁신적으로 개선하는 것이 목표입니다.",
      keywords: ["Deep Learning", "NLP", "Computer Vision", "AI Integration"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "Full Stack Architecture",
      description: "확장 가능한 마이크로서비스 아키텍처와 클라우드 네이티브 기술을 통해 대규모 시스템을 설계하고 구축하는 전문가가 되고자 합니다.",
      keywords: ["Microservices", "Cloud Native", "DevOps", "System Design"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Tech Leadership",
      description: "기술 팀을 이끌며 혁신적인 제품을 만들어내는 Tech Lead로 성장하여, 주니어 개발자들의 멘토 역할을 수행하고 싶습니다.",
      keywords: ["Team Leading", "Mentoring", "Product Strategy", "Innovation"],
      gradient: "from-green-500 to-teal-500"
    }
  ];

  const goals = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "단기 목표 (1-2년)",
      items: [
        "AWS 솔루션 아키텍트 자격증 취득",
        "오픈소스 프로젝트 메인테이너 되기",
        "국제 컨퍼런스 발표자로 참여",
        "AI/ML 프로젝트 실무 경험 쌓기"
      ]
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "중장기 목표 (3-5년)",
      items: [
        "글로벌 테크 기업 시니어 엔지니어",
        "기술 블로그 10만 구독자 달성",
        "스타트업 CTO 또는 공동창업",
        "대학원 진학 (컴퓨터 과학 석사)"
      ]
    }
  ];

  const researchInterests = [
    "웹 성능 최적화 및 사용자 경험",
    "분산 시스템 및 마이크로서비스",
    "프론트엔드 아키텍처 패턴",
    "개발자 도구 및 생산성",
    "클라우드 컴퓨팅 및 서버리스"
  ];

  return (
    <section className="py-20 px-4 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Vision & <span className="bg-gradient-primary bg-clip-text text-transparent">Goals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            미래 기술 트렌드를 선도하며, 사회에 긍정적인 영향을 미치는 
            혁신적인 소프트웨어 솔루션을 만들어가고자 합니다.
          </p>
        </div>

        {/* Vision Areas */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {visionAreas.map((area, index) => (
            <Card 
              key={area.title}
              className="p-8 bg-card border-border hover:shadow-glow-primary transition-all duration-500 hover:scale-105 hover:-translate-y-2 group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${area.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {area.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center group-hover:text-primary transition-colors duration-200">
                {area.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                {area.description}
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {area.keywords.map((keyword) => (
                  <Badge 
                    key={keyword}
                    className="bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Goals Timeline */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {goals.map((goalSet) => (
            <Card 
              key={goalSet.title}
              className="p-8 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-primary">
                  {goalSet.icon}
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {goalSet.title}
                </h3>
              </div>
              
              <div className="space-y-3">
                {goalSet.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Research Interests */}
        <Card className="p-8 bg-card border-border hover:shadow-glow-primary transition-all duration-300">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-primary" />
              <h3 className="text-3xl font-bold text-foreground">
                Research <span className="bg-gradient-primary bg-clip-text text-transparent">Interests</span>
              </h3>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              대학원 진학 및 연구 활동을 통해 깊이 탐구하고자 하는 분야들입니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {researchInterests.map((interest, index) => (
              <div 
                key={interest}
                className="p-4 bg-secondary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary group-hover:bg-primary-foreground rounded-full" />
                  <span className="font-medium">{interest}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            함께 혁신적인 기술로 더 나은 미래를 만들어갈 동료를 찾고 있습니다
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-primary text-primary-foreground hover:shadow-glow-primary transition-all duration-200 hover:scale-110 px-4 py-2 text-base">
              협업 제안 환영
            </Badge>
            <Badge className="bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110 px-4 py-2 text-base">
              멘토링 가능
            </Badge>
            <Badge className="bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110 px-4 py-2 text-base">
              오픈소스 기여
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, MessageCircle, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "이메일",
      value: "your.email@example.com",
      link: "mailto:your.email@example.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "전화번호",
      value: "+82 10-1234-5678",
      link: "tel:+821012345678"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "위치",
      value: "서울, 대한민국",
      link: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-8 h-8" />,
      label: "GitHub",
      link: "https://github.com/yourusername",
      color: "hover:text-gray-400"
    },
    {
      icon: <Linkedin className="w-8 h-8" />,
      label: "LinkedIn",
      link: "https://linkedin.com/in/yourusername",
      color: "hover:text-blue-400"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      label: "카카오톡",
      link: "#",
      color: "hover:text-yellow-400"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Contact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            새로운 프로젝트나 협업 기회에 대해 이야기하고 싶으시다면 
            언제든지 연락해 주세요!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                연락처 정보
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <Card 
                    key={info.label}
                    className="p-4 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105"
                  >
                    <a 
                      href={info.link}
                      className="flex items-center space-x-4 text-foreground hover:text-primary transition-colors duration-200"
                    >
                      <div className="text-primary">
                        {info.icon}
                      </div>
                      <div>
                        <div className="font-medium">{info.label}</div>
                        <div className="text-muted-foreground">{info.value}</div>
                      </div>
                    </a>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                소셜 미디어
              </h3>
              <div className="flex space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground ${social.color} transition-all duration-300 hover:scale-125 hover:shadow-glow-primary p-2 rounded-lg hover:bg-card/50`}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form or CTA */}
          <div className="space-y-8">
            <Card className="p-8 bg-card border-border hover:shadow-glow-primary transition-all duration-300">
              <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                프로젝트 문의
              </h3>
              
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-muted-foreground leading-relaxed">
                    새로운 웹 프로젝트, 협업 제안, 또는 기술적인 질문이 있으시다면 
                    아래 버튼을 통해 연락해 주세요!
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-primary transition-all duration-300 hover:shadow-glow-secondary hover:scale-105"
                    onClick={() => window.open('mailto:your.email@example.com')}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    이메일로 연락하기
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                    onClick={() => window.open('#')}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    카카오톡으로 문의
                  </Button>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <p className="text-muted-foreground">
                평일 기준 24시간 내에 답변드리겠습니다 ⚡
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
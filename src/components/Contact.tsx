import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "akkn920@naver.com",
      link: "mailto:akkn920@naver.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+82 10-2204-546",
      link: "tel:01022040546"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Bucheon, South Korea",
      link: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-8 h-8" />,
      label: "GitHub",
      link: "https://github.com/bckmini",
      color: "hover:text-gray-400"
    },
    {
      icon: <Linkedin className="w-8 h-8" />,
      label: "LinkedIn",
      link: "https://linkedin.com/in/yourusername",
      color: "hover:text-blue-400"
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Contact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            If you'd like to discuss new projects or collaboration opportunities, 
            feel free to reach out anytime!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Contact Information
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
                Social Media
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

          {/* Quick Contact */}
          <div className="space-y-8">
            <Card className="p-8 bg-card border-border hover:shadow-glow-primary transition-all duration-300">
              <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Quick Contact
              </h3>
              
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-muted-foreground leading-relaxed">
                    If you’re interested in collaboration or projects, feel free to get in touch anytime!
                  </p>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <p className="text-muted-foreground">
                {/* Optional extra footer text here */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

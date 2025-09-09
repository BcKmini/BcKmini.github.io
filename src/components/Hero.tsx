import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
import profilePhoto from "@/assets/ID_PHOTO.png";  // 🔹 프로필 사진 import

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-hero-gradient opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 animate-in fade-in duration-1000">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary shadow-glow-primary">
              <img 
                src={profilePhoto}   // 🔹 assets 안의 ID_PHOTO.png 사용
                alt="Mini Profile Photo"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Hello, 
              <span className="bg-gradient-primary bg-clip-text text-transparent block mt-2">
                I'm Kyoungmin Kim
              </span>
            </h1>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Konkuk University GLOCAL Campus
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Department of Software
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-8">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-primary transition-all duration-300 hover:shadow-glow-secondary hover:scale-105"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} 
              >
                View Projects
              </Button>

              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} 
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

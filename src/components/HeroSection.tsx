import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import cosmicHeroBg from "@/assets/cosmic-hero-bg.jpg";

const HeroSection = () => {
  const [particles, setParticles] = useState<Array<{ id: number; delay: number }>>([]);

  useEffect(() => {
    // Create floating particles
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      delay: Math.random() * 15
    }));
    setParticles(particleArray);
  }, []);

  const scrollToContactForm = () => {
    const section = document.getElementById('contact-form');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center cosmic-bg overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${cosmicHeroBg})` }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary rounded-full animate-particle opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="animate-float">
          <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight px-4">
          Создаём{" "}
          <span className="bg-gradient-cosmic bg-clip-text text-transparent">
            лендинги
          </span>
          , которые{" "}
          <br className="hidden sm:block" />
          <span className="bg-gradient-cosmic bg-clip-text text-transparent">
            запускают
          </span>{" "}
          ваш бизнес
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto px-4">
          Современные, быстрые, конверсионные сайты для вашего успеха
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <Button 
            variant="cosmic" 
            size="lg" 
            className="text-lg px-8 py-6 h-auto"
            onClick={scrollToContactForm}
          >
            Оставить заявку
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="glass" 
            size="lg"
            className="text-lg px-8 py-6 h-auto"
            onClick={() => {
              const section = document.getElementById('cases');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Посмотреть работы
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Rocket className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Rocket Lab
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors"
            >
              О нас
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Услуги
            </button>
            <button 
              onClick={() => scrollToSection('cases')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Кейсы
            </button>
            <button 
              onClick={() => scrollToSection('contacts')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Контакты
            </button>
            <Button 
              variant="cosmic" 
              size="lg"
              onClick={() => scrollToSection('contact-form')}
            >
              Оставить заявку
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                О нас
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Услуги
              </button>
              <button 
                onClick={() => scrollToSection('cases')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Кейсы
              </button>
              <button 
                onClick={() => scrollToSection('contacts')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Контакты
              </button>
              <Button 
                variant="cosmic" 
                size="lg"
                onClick={() => scrollToSection('contact-form')}
                className="w-full"
              >
                Оставить заявку
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
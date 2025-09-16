import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CasesSection from "@/components/CasesSection";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import CustomScrollbar from "@/components/CustomScrollbar";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Set document title and meta description for SEO
    document.title = "Rocket Lab – Создание лендингов под ключ в Москве | Продающие сайты";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content", 
        "Создаём продающие лендинги под ключ в Москве. Современный дизайн, SEO-оптимизация, высокая конверсия. Увеличиваем продажи до 340%. Заказать лендинг ✓"
      );
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Rocket Lab",
      "description": "Студия создания продающих лендингов",
      "url": window.location.origin,
      "telephone": "+7-993-617-26-88",
      "email": "rocketlabsite@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Москва",
        "addressCountry": "RU"
      },
      "offers": {
        "@type": "Service",
        "name": "Создание лендингов под ключ",
        "description": "Разработка продающих одностраничников с высокой конверсией"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <CustomScrollbar />
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div className={`min-h-screen transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <CasesSection />
          <AboutSection />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

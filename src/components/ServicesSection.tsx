import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Smartphone, Zap, Target, Palette, Code } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Лендинги под ключ",
    description: "Создаём продающие одностраничники с высокой конверсией и современным дизайном"
  },
  {
    icon: Smartphone,
    title: "Мобильная адаптация",
    description: "Все сайты полностью адаптированы под мобильные устройства и планшеты"
  },
  {
    icon: Zap,
    title: "Быстрая загрузка",
    description: "Оптимизируем скорость загрузки для лучшего пользовательского опыта"
  },
  {
    icon: Target,
    title: "SEO-оптимизация",
    description: "Настраиваем сайт для поисковых систем и высоких позиций в выдаче"
  },
  {
    icon: Palette,
    title: "Уникальный дизайн",
    description: "Разрабатываем индивидуальный дизайн, который выделит вас среди конкурентов"
  },
  {
    icon: Code,
    title: "Чистый код",
    description: "Используем современные технологии и пишем качественный, поддерживаемый код"
  }
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('revealed');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Наши{" "}
            <span className="bg-gradient-cosmic bg-clip-text text-transparent">
              услуги
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Комплексный подход к созданию эффективных лендингов
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="service-card reveal glass card-hover border-white/10"
              >
                <CardHeader className="text-center pb-3 sm:pb-4">
                  <div className="mx-auto mb-3 sm:mb-4 p-2 sm:p-3 rounded-full bg-gradient-cosmic w-fit">
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-semibold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground text-center">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
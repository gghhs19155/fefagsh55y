import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Lightbulb, Target } from "lucide-react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal');
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add('revealed');
              }, index * 200);
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

  const stats = [
    { icon: Users, number: "50+", label: "Довольных клиентов" },
    { icon: Award, number: "100+", label: "Успешных проектов" },
    { icon: Lightbulb, number: "5", label: "Лет опыта" },
    { icon: Target, number: "340%", label: "Средний рост конверсии" }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="reveal">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                О{" "}
                <span className="bg-gradient-cosmic bg-clip-text text-transparent">
                  нас
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6">
                Мы — команда профессионалов, которая помогает бизнесу расти через эффективные веб-решения.
              </p>
            </div>

            <div className="reveal space-y-4 sm:space-y-6">
              <div className="glass p-4 sm:p-6 rounded-lg border-white/10">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Наша миссия</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Создавать лендинги, которые не просто красиво выглядят, но и реально продают. 
                  Каждый проект для нас — это возможность запустить чей-то бизнес на новую орбиту.
                </p>
              </div>

              <div className="glass p-4 sm:p-6 rounded-lg border-white/10">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Почему выбирают нас</h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                    Индивидуальный подход к каждому проекту
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                    Современные технологии и трендовый дизайн
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                    Гарантия результата и постпроектная поддержка
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="reveal glass card-hover text-center border-white/10">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="mx-auto mb-2 sm:mb-3 lg:mb-4 p-2 sm:p-3 rounded-full bg-gradient-cosmic w-fit">
                      <IconComponent className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-primary-foreground" />
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground leading-tight">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
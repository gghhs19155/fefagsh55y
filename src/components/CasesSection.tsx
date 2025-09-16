import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

// Import case images
import swissRepairImg from "@/assets/cases/swissrepair.png";
import servisChasovImg from "@/assets/cases/servis-chasov.png";
import mebbDesignImg from "@/assets/cases/mebbdesign.png";
import arlineImg from "@/assets/cases/arline.png";
import rdkServiceImg from "@/assets/cases/rdk-service.png";
import santehnikHomeImg from "@/assets/cases/santehnik-home.png";
import gemmaImg from "@/assets/cases/gemma.png";
import notaBeneImg from "@/assets/cases/nota-bene.png";
import programiriumImg from "@/assets/cases/programirium.png";
import znatokClubImg from "@/assets/cases/znatok-club.png";
import narcissImg from "@/assets/cases/narciss.png";
import wellnessImg from "@/assets/cases/wellness.png";

const cases = [
  {
    id: 1,
    title: "Swiss Repair",
    description: "Сервисный центр швейцарских часов с онлайн-оценкой и записью на ремонт",
    image: swissRepairImg,
    category: "Ремонт часов",
    results: "+350% заявок",
    url: "https://swissrepair.ru"
  },
  {
    id: 2,
    title: "Сервис-Часов.РФ",
    description: "Профессиональный ремонт часов всех марок с гарантией качества",
    image: servisChasovImg,
    category: "Ремонт часов", 
    results: "+280% клиентов",
    url: "https://сервис-часов.рф"
  },
  {
    id: 3,
    title: "Мебь-Дизайн",
    description: "Корпусная мебель на заказ с 3D-визуализацией и быстрым изготовлением",
    image: mebbDesignImg,
    category: "Изготовление мебели",
    results: "+420% продаж",
    url: "https://mebbdesign.ru"
  },
  {
    id: 4,
    title: "Арлайн",
    description: "Эксклюзивная мебель премиум-класса с индивидуальным дизайном",
    image: arlineImg,
    category: "Изготовление мебели",
    results: "+300% заказов",
    url: "https://arline.ru"
  },
  {
    id: 5,
    title: "РДК Сервис",
    description: "Установка и ремонт душевых кабин с выездом мастера на дом",
    image: rdkServiceImg,
    category: "Сантехника",
    results: "+500% вызовов",
    url: "https://rdk-service.ru"
  },
  {
    id: 6,
    title: "Сантехник Home",
    description: "Сервис вызова мастера-сантехника с гарантией до 3 лет",
    image: santehnikHomeImg,
    category: "Сантехника",
    results: "+380% клиентов",
    url: "https://santehnik-home.ru"
  },
  {
    id: 7,
    title: "Студия Gemma",
    description: "Премиум-салон красоты с услугами маникюра и перманентного макияжа",
    image: gemmaImg,
    category: "Ногтевые студии",
    results: "+450% записей",
    url: "https://gemma.spb.ru"
  },
  {
    id: 8,
    title: "Nota Bene",
    description: "Студия красоты с полным спектром nail-услуг и современным дизайном",
    image: notaBeneImg,
    category: "Ногтевые студии",
    results: "+320% клиентов",
    url: "https://nota-bene.spb.ru"
  },
  {
    id: 9,
    title: "Программириум",
    description: "Школа программирования для детей с интерактивными онлайн-уроками",
    image: programiriumImg,
    category: "Языковые школы",
    results: "+600% учеников",
    url: "https://programirium.ru"
  },
  {
    id: 10,
    title: "Знаток",
    description: "Многопрофильный учебный центр с фундаментальными знаниями для детей",
    image: znatokClubImg,
    category: "Языковые школы",
    results: "+400% записей",
    url: "https://znatok-club.ru"
  },
  {
    id: 11,
    title: "Нарцисс",
    description: "Салон красоты с широким спектром косметологических процедур",
    image: narcissImg,
    category: "Косметология",
    results: "+380% процедур",
    url: "https://narciss.beauty"
  },
  {
    id: 12,
    title: "Велнес",
    description: "Медицинский центр с современным оборудованием и опытными специалистами",
    image: wellnessImg,
    category: "Косметология",
    results: "+520% клиентов",
    url: "https://wellness.spb.ru"
  }
];

const CasesSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % cases.length;
        if (scrollContainerRef.current) {
          const cardWidth = 400; // min-w-[400px]
          const gap = 24; // gap-6
          const scrollPosition = nextIndex * (cardWidth + gap);
          
          scrollContainerRef.current.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        }
        return nextIndex;
      });
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const scroll = (direction: 'left' | 'right') => {
    setIsAutoScrolling(false); // Stop auto-scroll when user manually navigates
    
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }

    // Resume auto-scroll after 10 seconds
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  return (
    <section id="cases" className="py-20 px-6 cosmic-bg">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Наши{" "}
            <span className="bg-gradient-cosmic bg-clip-text text-transparent">
              кейсы
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Реальные результаты наших клиентов
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant="glass"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="glass"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Cases carousel */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cases.map((caseItem) => (
              <Card 
                key={caseItem.id} 
                className="min-w-[280px] sm:min-w-[350px] md:min-w-[400px] glass group cursor-pointer border-white/10 hover:border-accent/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={caseItem.image} 
                      alt={`${caseItem.title} - ${caseItem.description}`}
                      className="h-48 w-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-white">
                      <div className="text-xs sm:text-sm font-medium mb-1">{caseItem.category}</div>
                      <div className="text-sm sm:text-lg font-bold">{caseItem.results}</div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <ExternalLink className="h-5 w-5 text-white/80" />
                    </div>
                  </div>
                  
                   <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">
                      {caseItem.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                      {caseItem.description}
                    </p>
                    <a 
                      href={caseItem.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium"
                    >
                      Перейти на сайт
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
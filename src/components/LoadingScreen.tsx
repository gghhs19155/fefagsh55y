import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showRocket, setShowRocket] = useState(false);

  useEffect(() => {
    // Show rocket after a brief delay
    const rocketTimer = setTimeout(() => setShowRocket(true), 300);

    // Simulate loading progress
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onLoadingComplete, 500); // Brief delay before hiding loading screen
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Random progress increments
      });
    }, 200);

    return () => {
      clearTimeout(rocketTimer);
      clearInterval(progressTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background cosmic-bg flex items-center justify-center">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-particle opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Rocket icon with animation */}
        <div className={`mb-8 transition-all duration-1000 ${showRocket ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <Rocket 
              className="h-16 w-16 text-primary mx-auto animate-bounce-slow"
              style={{ transform: 'rotate(-45deg)' }}
            />
            <div className="absolute inset-0 h-16 w-16 mx-auto rounded-full bg-primary/20 animate-ping"></div>
          </div>
        </div>

        {/* Logo text */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${showRocket ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            Rocket Lab
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Запускаем ваш бизнес на новую орбиту
          </p>
        </div>

        {/* Progress bar */}
        <div className={`w-80 mx-auto transition-all duration-1000 delay-500 ${showRocket ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Загрузка</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-cosmic transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
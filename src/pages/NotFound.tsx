import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Rocket } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center cosmic-bg">
      <div className="text-center">
        <div className="animate-float mb-8">
          <Rocket className="h-24 w-24 text-primary mx-auto" />
        </div>
        <h1 className="mb-4 text-6xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
          404
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Упс! Страница не найдена
        </p>
        <Button variant="cosmic" size="lg" asChild>
          <a href="/" className="inline-flex items-center gap-2">
            <Home className="h-5 w-5" />
            Вернуться на главную
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

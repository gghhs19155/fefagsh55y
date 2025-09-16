import { useEffect } from "react";

const CustomScrollbar = () => {
  useEffect(() => {
    // Inject custom scrollbar styles
    const style = document.createElement('style');
    style.textContent = `
      /* Custom scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        width: 12px;
      }

      ::-webkit-scrollbar-track {
        background: hsl(var(--secondary));
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);
        border-radius: 10px;
        border: 2px solid hsl(var(--secondary));
        transition: all 0.3s ease;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, hsl(var(--primary) / 0.8) 0%, hsl(var(--accent) / 0.8) 100%);
        box-shadow: 0 0 10px hsl(var(--primary) / 0.5);
      }

      ::-webkit-scrollbar-corner {
        background: hsl(var(--secondary));
      }

      /* Firefox scrollbar */
      html {
        scrollbar-width: thin;
        scrollbar-color: hsl(var(--primary)) hsl(var(--secondary));
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default CustomScrollbar;
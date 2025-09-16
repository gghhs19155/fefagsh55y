import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, Phone, MessageCircle, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  contactMethod: string;
  contactValue: string;
  budget: number[];
  project: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contactMethod: "whatsapp",
    contactValue: "",
    budget: [50],
    project: ""
  });

  const getBudgetLabel = (value: number) => {
    const budget = (value / 100) * 15000 + 5000; // 5000 to 20000
    return `${Math.round(budget).toLocaleString()} ₽`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.contactValue || !formData.project) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const budget = Math.round((formData.budget[0] / 100) * 15000 + 5000);
      
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.name,
            contact: formData.contactValue,
            contact_method: formData.contactMethod,
            budget: `${budget.toLocaleString()} ₽`,
            project: formData.project,
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в течение 30 минут.",
      });

      // Reset form
      setFormData({
        name: "",
        contactMethod: "whatsapp",
        contactValue: "",
        budget: [50],
        project: ""
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Ошибка отправки",
        description: "Попробуйте еще раз или свяжитесь с нами напрямую.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContactField = () => {
    const baseClasses = "bg-background/50 border-white/20 text-sm sm:text-base";
    
    if (formData.contactMethod === "whatsapp") {
      return (
        <Input
          type="tel"
          placeholder="+7 999 123 45 67"
          value={formData.contactValue}
          onChange={(e) => setFormData({...formData, contactValue: e.target.value})}
          className={baseClasses}
        />
      );
    } else if (formData.contactMethod === "telegram") {
      return (
        <Input
          type="text"
          placeholder="@username"
          value={formData.contactValue}
          onChange={(e) => setFormData({...formData, contactValue: e.target.value})}
          className={baseClasses}
        />
      );
    } else {
      return (
        <Input
          type="tel"
          placeholder="+7 999 123 45 67"
          value={formData.contactValue}
          onChange={(e) => setFormData({...formData, contactValue: e.target.value})}
          className={baseClasses}
        />
      );
    }
  };

  return (
    <section id="contact-form" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 cosmic-bg">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Оставить{" "}
            <span className="bg-gradient-cosmic bg-clip-text text-transparent">
              заявку
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground px-4">
            Расскажите о своём проекте и получите персональное предложение
          </p>
        </div>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-center">Расскажите о вашем проекте</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base text-foreground">Имя *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ваше имя"
                  className="bg-background/50 border-white/20 text-sm sm:text-base"
                />
              </div>

              {/* Contact Method */}
              <div className="space-y-3">
                <Label className="text-sm sm:text-base text-foreground">Способ связи *</Label>
                <RadioGroup
                  value={formData.contactMethod}
                  onValueChange={(value) => setFormData({...formData, contactMethod: value})}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
                >
                  <div className="flex items-center space-x-2 p-2 sm:p-3 rounded-lg border border-white/20 bg-background/30">
                    <RadioGroupItem value="whatsapp" id="whatsapp" />
                    <Label htmlFor="whatsapp" className="flex items-center space-x-2 cursor-pointer text-sm sm:text-base">
                      <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      <span>WhatsApp</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 sm:p-3 rounded-lg border border-white/20 bg-background/30">
                    <RadioGroupItem value="telegram" id="telegram" />
                    <Label htmlFor="telegram" className="flex items-center space-x-2 cursor-pointer text-sm sm:text-base">
                      <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                      <span>Telegram</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 sm:p-3 rounded-lg border border-white/20 bg-background/30">
                    <RadioGroupItem value="phone" id="phone" />
                    <Label htmlFor="phone" className="flex items-center space-x-2 cursor-pointer text-sm sm:text-base">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                      <span>Телефон</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Contact Value */}
              <div className="space-y-2">
                <Label className="text-sm sm:text-base text-foreground">
                  {formData.contactMethod === 'whatsapp' ? 'Номер WhatsApp *' :
                   formData.contactMethod === 'telegram' ? 'Ник в Telegram *' :
                   'Номер телефона *'}
                </Label>
                {renderContactField()}
              </div>

              {/* Budget Slider */}
              <div className="space-y-3 sm:space-y-4">
                <Label className="text-sm sm:text-base text-foreground">Бюджет проекта</Label>
                <div className="space-y-3">
                  <Slider
                    value={formData.budget}
                    onValueChange={(value) => setFormData({...formData, budget: value})}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                    <span>5 000 ₽</span>
                    <span className="text-primary font-medium">
                      {getBudgetLabel(formData.budget[0])}
                    </span>
                    <span>20 000 ₽</span>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <Label htmlFor="project" className="text-sm sm:text-base text-foreground">Описание проекта *</Label>
                <Textarea
                  id="project"
                  value={formData.project}
                  onChange={(e) => setFormData({...formData, project: e.target.value})}
                  placeholder="Расскажите подробнее о вашем проекте, целях и требованиях..."
                  className="bg-background/50 border-white/20 min-h-[120px] text-sm sm:text-base resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="cosmic" 
                size="lg" 
                className="w-full text-base sm:text-lg py-3 sm:py-6 h-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    Отправить заявку
                    <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;
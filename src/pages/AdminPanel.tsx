import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  Eye,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  Filter,
  Search,
  MessageCircle,
  LogOut,
  Loader2
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  contact: string;
  contact_method: string;
  budget: string | null;
  project: string;
  status: 'new' | 'in-progress' | 'completed' | 'rejected';
  created_at: string;
  updated_at: string;
}

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading) {
      if (!user || !isAdmin) {
        navigate('/login');
        return;
      }
      fetchLeads();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setLeads((data || []) as Lead[]);
    } catch (error: any) {
      console.error('Error fetching leads:', error);
      toast({
        variant: "destructive",
        title: "Ошибка загрузки",
        description: "Не удалось загрузить заявки.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error: any) {
      console.error('Error logging out:', error);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) {
        throw error;
      }

      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus as any } : lead
      ));

      toast({
        title: "Статус обновлен",
        description: "Статус заявки успешно изменен.",
      });
    } catch (error: any) {
      console.error('Error updating lead status:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось обновить статус заявки.",
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'in-progress': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новая';
      case 'in-progress': return 'В работе';
      case 'completed': return 'Завершена';
      case 'rejected': return 'Отклонена';
      default: return status;
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter(lead => lead.status === 'new').length,
    inProgressLeads: leads.filter(lead => lead.status === 'in-progress').length,
    completedLeads: leads.filter(lead => lead.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Админ-панель</h1>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                Добро пожаловать, Администратор
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Выход
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Всего заявок</CardTitle>
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{stats.totalLeads}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Новые</CardTitle>
              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{stats.newLeads}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">В работе</CardTitle>
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-orange-600">{stats.inProgressLeads}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Завершено</CardTitle>
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.completedLeads}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="leads" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="leads" className="text-xs sm:text-sm">Заявки</TabsTrigger>
            <TabsTrigger value="content" className="text-xs sm:text-sm">Контент</TabsTrigger>
            <TabsTrigger value="seo" className="text-xs sm:text-sm">SEO</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm">Настройки</TabsTrigger>
          </TabsList>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Управление заявками</CardTitle>
                
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Поиск по имени, контакту или проекту..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 text-sm"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Статус" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="new">Новые</SelectItem>
                      <SelectItem value="in-progress">В работе</SelectItem>
                      <SelectItem value="completed">Завершенные</SelectItem>
                      <SelectItem value="rejected">Отклоненные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {filteredLeads.map((lead) => (
                    <Card key={lead.id} className="border border-border/50">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                          {/* Lead Info */}
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <h3 className="font-semibold text-sm sm:text-base">{lead.name}</h3>
                              <Badge className={getStatusColor(lead.status)}>
                                {getStatusText(lead.status)}
                              </Badge>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                              <div className="flex items-center">
                                {lead.contact_method === 'whatsapp' && <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-500" />}
                                {lead.contact_method === 'telegram' && <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-blue-500" />}
                                {lead.contact_method === 'phone' && <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-orange-500" />}
                                {lead.contact_method === 'email' && <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-red-500" />}
                                {lead.contact}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                {new Date(lead.created_at).toLocaleDateString('ru-RU')}
                              </div>
                              <div className="font-medium text-primary">
                                {lead.budget || 'Не указан'}
                              </div>
                            </div>
                            
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                              {lead.project}
                            </p>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex gap-2">
                            <Select onValueChange={(value) => updateLeadStatus(lead.id, value)}>
                              <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="Статус" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">Новая</SelectItem>
                                <SelectItem value="in-progress">В работе</SelectItem>
                                <SelectItem value="completed">Завершена</SelectItem>
                                <SelectItem value="rejected">Отклонена</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredLeads.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm sm:text-base">Заявки не найдены</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Управление контентом</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="main-title" className="text-sm sm:text-base">Заголовок главной страницы</Label>
                  <Input
                    id="main-title"
                    defaultValue="Создаём лендинги, которые запускают ваш бизнес"
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-description" className="text-sm sm:text-base">Описание услуг</Label>
                  <Textarea
                    id="service-description"
                    defaultValue="Современные, быстрые, конверсионные сайты для вашего успеха"
                    className="min-h-[100px] text-sm sm:text-base"
                  />
                </div>
                <Button className="w-full sm:w-auto">Сохранить изменения</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">SEO настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="page-title" className="text-sm sm:text-base">Заголовок страницы (Title)</Label>
                  <Input
                    id="page-title"
                    defaultValue="Rocket Lab - Создание лендингов"
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-description" className="text-sm sm:text-base">Мета-описание</Label>
                  <Textarea
                    id="meta-description"
                    defaultValue="Создаём продающие лендинги для вашего бизнеса. Современный дизайн, высокая конверсия, быстрая загрузка."
                    className="min-h-[80px] text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords" className="text-sm sm:text-base">Ключевые слова</Label>
                  <Input
                    id="keywords"
                    defaultValue="лендинг, создание сайтов, веб-дизайн, разработка"
                    className="text-sm sm:text-base"
                  />
                </div>
                <Button className="w-full sm:w-auto">Сохранить SEO настройки</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Общие настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="notification-email" className="text-sm sm:text-base">Email для уведомлений</Label>
                  <Input
                    id="notification-email"
                    type="email"
                    defaultValue="rocketlabsite@gmail.com"
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone" className="text-sm sm:text-base">Контактный телефон</Label>
                  <Input
                    id="contact-phone"
                    defaultValue="79936172688"
                    className="text-sm sm:text-base"
                  />
                </div>
                <Button className="w-full sm:w-auto">Сохранить настройки</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
-- Обновим RLS политики для таблицы leads, чтобы неавторизованные пользователи могли отправлять заявки
-- а авторизованные администраторы могли их просматривать

-- Сначала удалим старые политики
DROP POLICY IF EXISTS "Authenticated users can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can update leads" ON public.leads;

-- Разрешим всем (включая неавторизованных) отправлять заявки
CREATE POLICY "Anyone can insert leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Разрешим только админам просматривать заявки
CREATE POLICY "Only admins can view leads" 
ON public.leads 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Разрешим только админам обновлять статус заявок
CREATE POLICY "Only admins can update leads" 
ON public.leads 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Запретим всем удалять заявки (для сохранности данных)
CREATE POLICY "No one can delete leads" 
ON public.leads 
FOR DELETE 
USING (false);
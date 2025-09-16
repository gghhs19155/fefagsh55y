-- Обновляем роль существующего пользователя на admin
UPDATE public.profiles 
SET role = 'admin' 
WHERE user_id = '66bbcc4f-dd44-4f73-8f12-5fe892b5f036';
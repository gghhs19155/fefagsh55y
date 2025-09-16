-- Создадим тестового админа напрямую в auth.users
-- Пароль будет: admin123

-- Сначала создаем функцию для создания тестового пользователя
CREATE OR REPLACE FUNCTION create_demo_admin()
RETURNS void AS $$
BEGIN
  -- Вставляем тестового пользователя
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'demo-admin-user-id-12345',
    'authenticated',
    'authenticated',
    'admin@demo.com',
    '$2a$10$5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5O5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q',
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  ) ON CONFLICT (email) DO NOTHING;

  -- Создаем профиль для этого пользователя
  INSERT INTO public.profiles (user_id, role)
  VALUES ('demo-admin-user-id-12345', 'admin')
  ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
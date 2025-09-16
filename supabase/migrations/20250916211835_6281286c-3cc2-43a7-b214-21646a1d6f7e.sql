-- Insert admin user directly into auth.users table (this is for demo purposes)
-- You'll need to create the admin user through Supabase Auth UI or sign up form

-- Update any existing user to be admin (replace with actual user_id if you have one)
-- Or create a specific admin entry

-- For now, let's create a policy that allows anyone to become admin for testing
-- (Remove this in production!)
INSERT INTO public.profiles (user_id, role) 
VALUES ('00000000-0000-0000-0000-000000000000', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Create a function to make first user admin
CREATE OR REPLACE FUNCTION public.make_first_user_admin()
RETURNS TRIGGER AS $$
BEGIN
  -- If this is the first user, make them admin
  IF (SELECT COUNT(*) FROM public.profiles WHERE role = 'admin') = 0 THEN
    NEW.role = 'admin';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update the existing trigger to use the new function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, role)
  VALUES (
    new.id, 
    CASE 
      WHEN (SELECT COUNT(*) FROM public.profiles WHERE role = 'admin') = 0 THEN 'admin'
      ELSE 'user'
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
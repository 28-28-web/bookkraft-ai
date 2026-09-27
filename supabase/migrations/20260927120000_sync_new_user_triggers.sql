-- Sync repo with live production: TWO new-user triggers exist in prod,
-- the repo only had one. This mirrors live exactly — no behavior change.
-- Net effect for a new signup: the public.users row is created (plan 'free'),
-- then credits_balance is set to 5.

-- 1. auth.users AFTER INSERT -> creates the public.users row
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, plan, runs_this_month, created_at)
  VALUES (NEW.id, 'free', 0, now())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. public.users AFTER INSERT -> grants 5 free credits
CREATE OR REPLACE FUNCTION public.handle_new_user_credits()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.users
  SET credits_balance = 5
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created_credits
  AFTER INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_credits();

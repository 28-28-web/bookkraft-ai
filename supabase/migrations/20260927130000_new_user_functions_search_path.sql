-- Harden the two SECURITY DEFINER new-user functions: pin search_path so a
-- malicious schema on the caller's path cannot shadow `users`/`public`.
-- Function bodies are identical to 20260927120000_sync_new_user_triggers.sql;
-- only `SET search_path = public` is added. No behavior change.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, plan, runs_this_month, created_at)
  VALUES (NEW.id, 'free', 0, now())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user_credits()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.users
  SET credits_balance = 5
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

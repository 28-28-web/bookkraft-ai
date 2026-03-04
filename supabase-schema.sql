-- BookKraft AI — Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free','starter','pro','lifetime')),
  runs_this_month INTEGER NOT NULL DEFAULT 0,
  book_type TEXT,
  writing_stage TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- History table
CREATE TABLE IF NOT EXISTS public.history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  tool_slug TEXT NOT NULL,
  inputs JSONB,
  output TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_history_user_id ON public.history(user_id);
CREATE INDEX IF NOT EXISTS idx_history_created_at ON public.history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_plan ON public.users(plan);

-- Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;

-- Users: can only see/edit own row
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE USING (auth.uid() = id);

-- History: can only see/edit own rows
CREATE POLICY "Users can view own history"
  ON public.history FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own history"
  ON public.history FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own history"
  ON public.history FOR DELETE USING (auth.uid() = user_id);

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, plan, runs_this_month)
  VALUES (NEW.id, 'free', 0)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Monthly reset function (call via pg_cron or scheduled function)
CREATE OR REPLACE FUNCTION public.reset_monthly_runs()
RETURNS void AS $$
BEGIN
  UPDATE public.users SET runs_this_month = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- BookKraft AI v8.0 — Database Migration
-- Run in Supabase SQL Editor. Safe to re-run (IF NOT EXISTS).
-- ============================================================

-- ── D1. USERS TABLE — Add new columns ──
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS credits_balance integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_credits_purchased integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS has_logic_bundle boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_full_access boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_lifetime boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS newsletter_subscribed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS formatting_goal text DEFAULT null,
  ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Remove deprecated columns
ALTER TABLE users DROP COLUMN IF EXISTS runs_this_month;
ALTER TABLE users DROP COLUMN IF EXISTS plan;
ALTER TABLE users DROP COLUMN IF EXISTS owned_tools;

-- ── D2. PROJECTS TABLE (Global Book State) ──
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text,
  author text,
  raw_html text,
  metadata jsonb,
  r2_key text,
  last_tool text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Users manage own projects'
  ) THEN
    CREATE POLICY "Users manage own projects" ON projects
      FOR ALL USING (auth.uid() = user_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);

-- ── D3. PURCHASES TABLE — Update schema ──
-- Drop old purchases table if it has the wrong schema (tool_slug based)
-- and recreate with v8.0 schema. Skip if already correct.
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'purchases' AND column_name = 'tool_slug'
  ) THEN
    DROP TABLE IF EXISTS purchases CASCADE;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  purchase_type text NOT NULL,
  paddle_order_id text,
  amount_paid numeric(10,2),
  credits_added integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'purchases' AND policyname = 'Users read own purchases'
  ) THEN
    CREATE POLICY "Users read own purchases" ON purchases
      FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;

-- ── HISTORY TABLE — Create if needed, then add new columns ──
CREATE TABLE IF NOT EXISTS history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tool_slug text NOT NULL,
  inputs jsonb,
  output text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE history ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'history' AND policyname = 'Users can view own history'
  ) THEN
    CREATE POLICY "Users can view own history" ON history
      FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'history' AND policyname = 'Users can insert own history'
  ) THEN
    CREATE POLICY "Users can insert own history" ON history
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_history_user_id ON history(user_id);
CREATE INDEX IF NOT EXISTS idx_history_created_at ON history(created_at DESC);

ALTER TABLE history
  ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS word_count integer,
  ADD COLUMN IF NOT EXISTS credits_spent integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_sample boolean DEFAULT false;

-- ── CREDIT TRANSACTIONS TABLE ──
CREATE TABLE IF NOT EXISTS credit_transactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  credits integer NOT NULL,
  tool_slug text,
  paddle_order_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'credit_transactions' AND policyname = 'Users read own credit log'
  ) THEN
    CREATE POLICY "Users read own credit log" ON credit_transactions
      FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_credit_tx_user_id ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_tx_created ON credit_transactions(created_at DESC);

-- ── D4. DEDUCT CREDITS FUNCTION ──
CREATE OR REPLACE FUNCTION deduct_credits(
  p_user_id uuid, p_cost integer, p_tool_slug text, p_history_id uuid
) RETURNS void AS $$
BEGIN
  UPDATE users SET credits_balance = credits_balance - p_cost WHERE id = p_user_id;
  INSERT INTO credit_transactions (user_id, type, credits, tool_slug)
    VALUES (p_user_id, 'spend', -p_cost, p_tool_slug);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── ADD CREDITS FUNCTION (for purchases) ──
CREATE OR REPLACE FUNCTION add_credits(
  p_user_id uuid, p_amount integer, p_paddle_order_id text
) RETURNS void AS $$
BEGIN
  UPDATE users SET
    credits_balance = credits_balance + p_amount,
    total_credits_purchased = total_credits_purchased + p_amount
  WHERE id = p_user_id;
  INSERT INTO credit_transactions (user_id, type, credits, paddle_order_id)
    VALUES (p_user_id, 'purchase', p_amount, p_paddle_order_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── UPDATE HANDLE_NEW_USER TRIGGER ──
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, credits_balance, has_logic_bundle, has_full_access, is_lifetime, is_admin)
  VALUES (NEW.id, 0, false, false, false, false)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

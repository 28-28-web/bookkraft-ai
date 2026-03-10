-- BookKraft AI — eBook Formatting Pivot — Database Migration
-- Run this in the Supabase SQL Editor

-- 1. Add new columns to the existing users table
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS owned_tools text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS has_full_access boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_lifetime boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS newsletter_subscribed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS formatting_goal text DEFAULT null;

-- 2. Drop old subscription columns (no longer needed — one-time purchase model)
ALTER TABLE users DROP COLUMN IF EXISTS runs_this_month;
ALTER TABLE users DROP COLUMN IF EXISTS plan;

-- 3. Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  tool_slug text NOT NULL,
  paddle_order_id text,
  amount_paid numeric(10,2),
  purchase_type text DEFAULT 'single',
  created_at timestamptz DEFAULT now()
);

-- 4. Enable RLS on purchases
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
CREATE POLICY "Users can read own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert purchases" ON purchases
  FOR INSERT WITH CHECK (true);

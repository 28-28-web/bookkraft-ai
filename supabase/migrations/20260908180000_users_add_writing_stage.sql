ALTER TABLE users
  ADD COLUMN IF NOT EXISTS writing_stage text DEFAULT null;

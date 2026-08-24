-- Refund handling schema additions.
-- Idempotent: ADD COLUMN IF NOT EXISTS — safe to re-run.
-- Run against production DB after deploying the refund webhook handler.

-- Idempotency gate for Paddle adjustment events.
-- NULL = purchase never refunded. Set to NOW() when the refund webhook fires.
-- The handler gates on this column (FOR UPDATE lock) so concurrent Paddle
-- deliveries of the same adjustment cannot double-deduct.
ALTER TABLE purchases
  ADD COLUMN IF NOT EXISTS refunded_at TIMESTAMPTZ;

-- Flag set when a refund is processed but the user had already spent more
-- credits from the refunded purchase than remained in their balance.
-- The handler floors credits at 0 and sets this true; a human reviews the
-- shortfall amount (recoverable from the jobs table) and decides next steps.
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS refund_review_required BOOLEAN DEFAULT false;

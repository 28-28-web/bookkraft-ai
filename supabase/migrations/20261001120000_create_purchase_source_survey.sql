-- One-question "How did you hear about BookKraft?" survey shown on /welcome
-- after a Paddle payment. One row per user: an answer or a skip, so the
-- survey is never shown twice.
--
-- Same access model as purchases/events: written ONLY from
-- /api/purchase-survey over the direct Postgres connection
-- (src/lib/db/pool.js / DATABASE_URL). RLS on, no policies, no anon or
-- authenticated path. `plan` comes from the success URL and is not proof of
-- purchase; join purchases on user_id for the real plan.

create table if not exists public.purchase_source_survey (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null unique references public.users(id) on delete cascade,
    plan        text check (plan in ('starter', 'pro', 'lifetime')),
    source      text check (source in ('google', 'ai', 'amazon_book', 'reddit_facebook', 'youtube', 'friend', 'other')),
    other_text  text check (char_length(other_text) <= 200),
    skipped     boolean not null default false,
    created_at  timestamptz not null default now(),
    check (skipped = (source is null))
);

alter table public.purchase_source_survey enable row level security;
-- No policies. Reachable only via the privileged direct connection.

-- First-party event tracking for the tool -> fix -> purchase funnel.
--
-- Written ONLY server-side over the direct Postgres connection
-- (src/lib/db/pool.js / DATABASE_URL) from /api/track and the Paddle
-- webhook — the same privileged, server-only path used by purchases and the
-- job worker. No PostgREST surface, no anon grant. RLS is enabled with no
-- policies: there is no path from the public anon key or a user session to
-- this table; the direct connection bypasses RLS as the connecting role's
-- own privilege.
--
-- PRIVACY: never store user file or manuscript content in event_data. Only
-- metadata belongs here — tool name, file size range, error counts/types.

create table if not exists public.events (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid references public.users(id) on delete set null, -- null for logged-out visitors
    session_id  text,                                                -- anonymous visitor id (client localStorage), persists across login
    event_name  text not null,
    event_data  jsonb,
    page_url    text,
    created_at  timestamptz not null default now()
);

-- Funnel queries filter/group on these columns.
create index if not exists events_event_name_idx on public.events (event_name);
create index if not exists events_user_id_idx     on public.events (user_id);
create index if not exists events_session_id_idx  on public.events (session_id);
create index if not exists events_created_at_idx  on public.events (created_at);

alter table public.events enable row level security;
-- No policies, for anon or authenticated. This table is reachable only via a
-- direct Postgres connection using privileged credentials (DATABASE_URL).
-- Do not add an anon/authenticated policy or any PostgREST-reachable path.

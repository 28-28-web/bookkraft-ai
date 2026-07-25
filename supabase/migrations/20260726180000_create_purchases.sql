-- purchases table did not exist — every Paddle webhook insert has been
-- throwing since launch, and the users.update() calls next to those
-- inserts may have been silently no-op'ing under RLS the whole time too
-- (supabase-js does not throw on an RLS-denied write).
--
-- Access model: this table is written ONLY from the Paddle webhook route,
-- which uses the direct Postgres connection (src/lib/db/pool.js /
-- DATABASE_URL) — the same privileged, server-only path already used for
-- deduct_credits and the job worker. No PostgREST surface, no anon grant,
-- no SECURITY DEFINER function. An earlier version of this migration used
-- a SECURITY DEFINER RPC granted to anon/authenticated — that was wrong:
-- anyone could call it directly via the Supabase REST API with the public
-- anon key and grant themselves Lifetime access, completely bypassing the
-- Paddle signature check that only exists in the Next.js route. Do not
-- reintroduce an anon-callable path to this table.

create table if not exists public.purchases (
    id                  uuid primary key default gen_random_uuid(),
    user_id             uuid not null references public.users(id),
    purchase_type       text not null,
    paddle_order_id     text not null,
    amount_paid         numeric(10, 2) not null default 0,
    credits_added       integer not null default 0,
    created_at          timestamptz not null default now(),
    unique (paddle_order_id) -- Paddle transaction ID — a retried webhook
                             -- delivery for the same transaction must not
                             -- be able to double-credit someone.
);

create index if not exists purchases_user_id_idx on public.purchases (user_id);

alter table public.purchases enable row level security;
-- No policies at all, for anon or authenticated. This table is reachable
-- only via a direct Postgres connection using privileged credentials
-- (DATABASE_URL), which bypasses RLS as the connecting role's own
-- privilege, not through any policy grant. There must be no path from the
-- public anon key to this table or to public.users writes tied to it.

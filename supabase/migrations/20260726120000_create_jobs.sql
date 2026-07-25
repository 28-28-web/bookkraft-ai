-- Phase 2 conversion overhaul: chunked AI job tracking.
--
-- Accessed only via a direct server-side Postgres connection (src/lib/db/pool.js),
-- never through a public anon key — so unlike the Phase 1 `leads` table, this
-- does not need RLS or a SECURITY DEFINER RPC wrapper. Placed outside
-- supabase/migrations/ since the project is moving off Supabase to
-- self-hosted Coolify Postgres this week; this table has no Supabase-specific
-- dependency either way.

create extension if not exists pgcrypto;

create table if not exists jobs (
    id                uuid primary key default gen_random_uuid(),
    user_id           uuid not null,
    tool_slug         text not null,
    status            text not null default 'queued'
                        check (status in ('queued', 'running', 'done', 'failed', 'partial')),
    total_chunks      integer not null,
    completed_chunks  integer not null default 0,
    word_count        integer not null,
    credits_reserved  integer not null,
    credits_charged   integer not null default 0,
    input_meta        jsonb not null default '{}',
    error             text,
    created_at        timestamptz not null default now(),
    updated_at        timestamptz not null default now()
);

create index if not exists jobs_user_status_idx on jobs (user_id, status, created_at);

create table if not exists job_chunks (
    id            uuid primary key default gen_random_uuid(),
    job_id        uuid not null references jobs(id) on delete cascade,
    chunk_index   integer not null,
    status        text not null default 'queued'
                    check (status in ('queued', 'running', 'done', 'failed')),
    start_offset  integer not null,
    end_offset    integer not null,
    input_text    text not null,
    result_json   jsonb,
    error         text,
    attempts      integer not null default 0,
    updated_at    timestamptz not null default now(),
    unique (job_id, chunk_index)
);

create index if not exists job_chunks_claim_idx on job_chunks (status, job_id);

-- keep updated_at fresh without relying on application code remembering to set it
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists jobs_set_updated_at on jobs;
create trigger jobs_set_updated_at
    before update on jobs
    for each row execute function set_updated_at();

drop trigger if exists job_chunks_set_updated_at on job_chunks;
create trigger job_chunks_set_updated_at
    before update on job_chunks
    for each row execute function set_updated_at();

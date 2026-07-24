-- Phase 1 conversion overhaul: leads table for free-tool results-screen capture.
--
-- This project has no service-role key configured anywhere in the codebase —
-- every Supabase call (including from API routes) runs under the public anon
-- key, governed by RLS. A plain anon INSERT/UPDATE policy on `leads` would be
-- directly callable by anyone hitting the Supabase REST API with that public
-- key, bypassing our app-level IP rate limit entirely. So the table itself
-- stays fully locked (no policies at all for anon/authenticated), and all
-- reads/writes happen through a single SECURITY DEFINER function that the
-- app calls via RPC. The function does the rate-limit check and the
-- insert-or-update in one round trip.

create table if not exists public.leads (
    id           uuid primary key default gen_random_uuid(),
    email        text not null unique,
    source_tool  text not null,
    issue_count  integer not null default 0,
    ip           text,
    user_agent   text,
    created_at   timestamptz not null default now()
);

alter table public.leads enable row level security;
-- No policies added on purpose — anon/authenticated have zero direct access.
-- All access goes through submit_lead() below.

create or replace function public.submit_lead(
    p_email text,
    p_source_tool text,
    p_issue_count integer,
    p_user_agent text,
    p_ip text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
    recent_count integer;
begin
    if p_email is null or p_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
        return jsonb_build_object('ok', false, 'error', 'invalid_email');
    end if;

    if p_ip is not null then
        select count(*) into recent_count
        from public.leads
        where ip = p_ip
          and created_at > now() - interval '1 hour';

        if recent_count >= 5 then
            return jsonb_build_object('ok', false, 'error', 'rate_limited');
        end if;
    end if;

    insert into public.leads (email, source_tool, issue_count, ip, user_agent)
    values (lower(trim(p_email)), p_source_tool, coalesce(p_issue_count, 0), p_ip, p_user_agent)
    on conflict (email) do update
        set source_tool = excluded.source_tool,
            issue_count = excluded.issue_count,
            ip = excluded.ip,
            user_agent = excluded.user_agent;

    return jsonb_build_object('ok', true);
end;
$$;

grant execute on function public.submit_lead(text, text, integer, text, text) to anon, authenticated;

-- promo_codes: holds redeemable codes (created by admins)
create table if not exists public.promo_codes (
    id          bigserial primary key,
    code        text        not null unique,
    plan        text        not null,           -- 'starter' | 'pro' | etc.
    duration_months int     not null default 2,
    max_uses    int         not null default 1,
    current_uses int        not null default 0,
    created_at  timestamptz not null default now()
);

-- user_promo_codes: audit log of who used which code
create table if not exists public.user_promo_codes (
    id          bigserial primary key,
    user_id     uuid        not null references auth.users(id) on delete cascade,
    code        text        not null,
    applied_at  timestamptz not null default now(),
    unique (user_id, code)
);

-- promo_bundle_expires_at on users: set when a promo grants logic-bundle access
alter table public.users
    add column if not exists promo_bundle_expires_at timestamptz default null;

-- ONEPAGEFIX: starter-tier access, 2 months, max 1 use per user
insert into public.promo_codes (code, plan, duration_months, max_uses, current_uses)
values ('ONEPAGEFIX', 'starter', 2, 1000, 0)
on conflict (code) do nothing;

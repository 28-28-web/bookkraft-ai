alter table public.leads add column if not exists consent_at timestamptz not null default now();

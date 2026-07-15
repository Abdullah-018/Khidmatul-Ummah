create table if not exists public.cms_state (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  receipt_no text unique not null,
  donor_name text not null,
  mobile text not null,
  email text,
  address text,
  fund text not null,
  amount numeric not null default 0,
  payment_method text,
  account_number text,
  account_holder text,
  transaction_id text,
  status text not null default 'Pending',
  admin_note text,
  created_at timestamptz not null default now()
);

alter table public.cms_state enable row level security;
alter table public.donations enable row level security;

drop policy if exists "Public can read cms state" on public.cms_state;
create policy "Public can read cms state"
on public.cms_state for select
to anon, authenticated
using (id = 'main');

drop policy if exists "Authenticated admins can write cms state" on public.cms_state;
create policy "Authenticated admins can write cms state"
on public.cms_state for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can submit donations" on public.donations;
create policy "Public can submit donations"
on public.donations for insert
to anon, authenticated
with check (true);

drop policy if exists "Authenticated admins can manage donations" on public.donations;
create policy "Authenticated admins can manage donations"
on public.donations for all
to authenticated
using (true)
with check (true);

insert into public.cms_state (id, data)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

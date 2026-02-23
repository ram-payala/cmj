-- Run this in Supabase Dashboard → SQL Editor

-- Table: users (links auth to our app data; one row per auth user)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  username text unique not null,
  full_name text,
  affiliation text,
  country text,
  created_at timestamptz default now()
);

alter table public.users enable row level security;

-- Authenticated users can insert only their own row (after signup)
create policy "Users can insert own row"
  on public.users for insert to authenticated
  with check (auth.uid() = id);

-- Users can update only their own row
create policy "Users can update own row"
  on public.users for update to authenticated
  using (auth.uid() = id);

-- Users can read only their own row
create policy "Users can read own row"
  on public.users for select to authenticated
  using (auth.uid() = id);

-- Returns email for a given username (used for login; anon can call)
create or replace function public.get_email_by_username(uname text)
returns text
language sql
security definer
set search_path = public
as $$
  select email from public.users where username = uname limit 1;
$$;

grant execute on function public.get_email_by_username(text) to anon;

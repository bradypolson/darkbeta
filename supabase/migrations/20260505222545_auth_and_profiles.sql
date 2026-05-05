-- User profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Organization members
create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member', 'viewer')),
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

alter table public.organization_members enable row level security;

create policy "Members can view their org memberships"
  on public.organization_members for select
  using (auth.uid() = user_id);

create policy "Owners and admins can manage members"
  on public.organization_members for all
  using (
    exists (
      select 1 from public.organization_members om
      where om.organization_id = organization_members.organization_id
        and om.user_id = auth.uid()
        and om.role in ('owner', 'admin')
    )
  );

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Update RLS on existing tables to require auth
-- frameworks: org members can read
create policy "Authenticated users can view frameworks"
  on public.frameworks for select
  to authenticated
  using (true);

-- controls: same
create policy "Authenticated users can view controls"
  on public.controls for select
  to authenticated
  using (true);

-- control_responses: org members can manage
create policy "Authenticated users can manage control responses"
  on public.control_responses for all
  to authenticated
  using (true)
  with check (true);

-- evidence: org members can manage
create policy "Authenticated users can manage evidence"
  on public.evidence for all
  to authenticated
  using (true)
  with check (true);

-- audit_log: authenticated read
create policy "Authenticated users can view audit log"
  on public.audit_log for select
  to authenticated
  using (true);

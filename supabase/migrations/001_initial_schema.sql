-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Organizations
create table public.organizations (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  slug        text not null unique,
  industry    text,
  employee_count integer,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Frameworks (seeded, not user-created)
create table public.frameworks (
  id              uuid primary key default uuid_generate_v4(),
  key             text not null unique,
  name            text not null,
  description     text not null default '',
  version         text,
  category        text not null default 'General',
  total_controls  integer not null default 0,
  created_at      timestamptz not null default now()
);

-- Organization–Framework assignment
create table public.organization_frameworks (
  id              uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  framework_id    uuid not null references public.frameworks(id) on delete cascade,
  status          text not null default 'active' check (status in ('active', 'inactive', 'archived')),
  assigned_at     timestamptz not null default now(),
  due_date        date,
  owner_id        uuid,
  unique (organization_id, framework_id)
);

-- Controls (seeded, not user-created)
create table public.controls (
  id          uuid primary key default uuid_generate_v4(),
  framework_id uuid not null references public.frameworks(id) on delete cascade,
  control_id  text not null,
  title       text not null,
  description text not null default '',
  category    text not null default '',
  subcategory text,
  priority    text not null default 'medium' check (priority in ('critical', 'high', 'medium', 'low')),
  guidance    text,
  created_at  timestamptz not null default now(),
  unique (framework_id, control_id)
);

-- Per-org control responses
create table public.control_responses (
  id              uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  control_id      uuid not null references public.controls(id) on delete cascade,
  status          text not null default 'not_started'
                    check (status in ('not_started', 'in_progress', 'compliant', 'non_compliant', 'not_applicable')),
  notes           text,
  owner_id        uuid,
  due_date        date,
  completed_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (organization_id, control_id)
);

-- Evidence files
create table public.evidence (
  id                   uuid primary key default uuid_generate_v4(),
  organization_id      uuid not null references public.organizations(id) on delete cascade,
  control_response_id  uuid not null references public.control_responses(id) on delete cascade,
  title                text not null,
  description          text,
  file_url             text,
  file_name            text,
  file_size            bigint,
  evidence_type        text not null default 'document'
                         check (evidence_type in ('document', 'screenshot', 'policy', 'procedure', 'other')),
  uploaded_by          uuid,
  created_at           timestamptz not null default now()
);

-- Append-only audit log
create table public.audit_log (
  id              uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id         uuid,
  action          text not null,
  resource_type   text not null,
  resource_id     uuid,
  metadata        jsonb,
  created_at      timestamptz not null default now()
);

-- Indexes
create index on public.control_responses (organization_id, control_id);
create index on public.evidence (organization_id, control_response_id);
create index on public.audit_log (organization_id, created_at desc);
create index on public.controls (framework_id);

-- Updated_at trigger helper
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger organizations_updated_at
  before update on public.organizations
  for each row execute procedure public.set_updated_at();

create trigger control_responses_updated_at
  before update on public.control_responses
  for each row execute procedure public.set_updated_at();

-- RLS (all disabled by default — enable per-table after auth is wired)
alter table public.organizations enable row level security;
alter table public.frameworks enable row level security;
alter table public.organization_frameworks enable row level security;
alter table public.controls enable row level security;
alter table public.control_responses enable row level security;
alter table public.evidence enable row level security;
alter table public.audit_log enable row level security;

-- Allow all reads while no auth is in place (will be tightened in auth step)
create policy "Allow read all" on public.frameworks for select using (true);
create policy "Allow read all" on public.controls for select using (true);

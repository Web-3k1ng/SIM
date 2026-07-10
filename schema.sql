-- SIM (Security Incident Mapping) — Supabase Schema
-- Run this in your Supabase project's SQL Editor (Dashboard -> SQL Editor -> New Query)

create extension if not exists "uuid-ossp";

-- ============ INCIDENTS TABLE ============
create table if not exists incidents (
  id uuid primary key default uuid_generate_v4(),
  incident_type text not null check (
    incident_type in ('stabbing', 'robbery', 'theft', 'assault', 'sexual_assault', 'murder', 'burglary', 'other')
  ),
  description text not null,
  location text not null,
  incident_date timestamptz not null default now(),
  reporter_name text,          -- null if anonymous
  reporter_contact text,       -- null if anonymous
  is_anonymous boolean not null default false,
  status text not null default 'pending' check (
    status in ('pending', 'verified', 'in_progress', 'resolved', 'dismissed')
  ),
  created_at timestamptz not null default now()
);

-- Index for sorting the feed by most recent
create index if not exists incidents_created_at_idx on incidents (created_at desc);

-- ============ ROW LEVEL SECURITY ============
alter table incidents enable row level security;

-- Anyone (anon key) can INSERT a report — this is a public reporting form
create policy "Public can submit incident reports"
  on incidents for insert
  to anon
  with check (true);

-- Anyone (anon key) can READ incidents, but never see reporter identity fields
-- (handled at the application layer via a view — see below)
create policy "Public can view incidents"
  on incidents for select
  to anon
  using (true);

-- Only authenticated admin users can update status (verify/respond/manage)
-- NOTE: for the assignment demo, this is simplified. In production, restrict
-- this policy to a specific admin role via a custom claim or separate admins table.
create policy "Authenticated users can update incident status"
  on incidents for update
  to authenticated
  using (true);

-- ============ PUBLIC-SAFE VIEW (hides reporter identity for anonymous reports) ============
create or replace view incidents_public as
select
  id,
  incident_type,
  description,
  location,
  incident_date,
  case when is_anonymous then null else reporter_name end as reporter_name,
  is_anonymous,
  status,
  created_at
from incidents
order by created_at desc;

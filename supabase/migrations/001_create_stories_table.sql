-- Migration: 001_create_stories_table
-- Creates the stories table with JSONB pages for branching narratives

create table if not exists public.stories (
  id               uuid        primary key default gen_random_uuid(),
  slug             text        unique not null,
  title            text        not null,
  title_es         text        not null,
  title_pt_br      text        not null,
  description      text        not null,
  description_es   text        not null,
  description_pt_br text       not null,
  theme            text        not null check (theme in ('adventure', 'fantasy', 'science', 'nature', 'mystery', 'fables')),
  characters       text[]      not null default '{}',
  age_min          integer     not null default 4,
  age_max          integer     not null default 10,
  total_pages      integer     not null,
  reading_level    text        not null default 'beginner' check (reading_level in ('beginner', 'intermediate', 'advanced')),
  cover_image      text,
  emoji            text,
  is_new           boolean     not null default true,
  is_featured      boolean     not null default false,
  download_size_mb numeric     not null default 0,
  pages            jsonb       not null default '[]'::jsonb,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Index for faster theme/level filtering
create index if not exists idx_stories_theme on public.stories (theme);
create index if not exists idx_stories_reading_level on public.stories (reading_level);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger stories_updated_at
  before update on public.stories
  for each row execute function public.set_updated_at();

-- RLS (enable in production after seeding)
-- alter table public.stories enable row level security;

-- create policy "Stories are viewable by everyone"
--   on public.stories for select
--   using (true);

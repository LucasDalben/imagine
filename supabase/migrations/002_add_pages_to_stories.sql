-- Migration: 002_add_pages_to_stories
-- Adds the JSONB pages column to an existing stories table and disables RLS for seeding

ALTER TABLE public.stories
  ADD COLUMN IF NOT EXISTS pages jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Disable RLS while seeding (re-enable in production)
ALTER TABLE public.stories DISABLE ROW LEVEL SECURITY;

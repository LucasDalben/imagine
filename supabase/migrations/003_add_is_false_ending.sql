-- Migration: 003_add_is_false_ending
-- Adds is_false_ending boolean to stories table.
-- When true, reaching any ending in the story shows the "História Incompleta" screen.

alter table public.stories
  add column if not exists is_false_ending boolean not null default false;

-- Migration: 004_add_ending_images
-- Adds image columns for the good ending and false ending screens

alter table public.stories
  add column if not exists image_good_final  text,
  add column if not exists image_false_final text;

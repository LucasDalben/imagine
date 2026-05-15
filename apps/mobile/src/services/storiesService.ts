import { supabase } from '../lib/supabase';
import {
  Story,
  StoryPage,
  StoryChoice,
  StoryTheme,
  ReadingLevel,
  MOCK_STORIES,
} from '../data/stories';

// ─── DB row types ────────────────────────────────────────────────────────────

interface StoryRow {
  id: string;
  slug: string;
  title: string;
  title_es: string;
  title_pt_br: string;
  description: string;
  description_es: string;
  description_pt_br: string;
  theme: StoryTheme;
  characters: string[];
  age_min: number;
  age_max: number;
  total_pages: number;
  reading_level: ReadingLevel;
  cover_image: string;
  emoji: string;
  is_new: boolean;
  is_featured: boolean;
  download_size_mb: number;
  story_pages: PageRow[];
}

interface PageRow {
  id: string;
  page_number: number;
  text: string;
  text_es: string;
  text_pt_br: string;
  background_image: string;
  emoji: string;
  story_choices: ChoiceRow[];
}

interface ChoiceRow {
  id: string;
  choice_key: string;
  text: string;
  text_es: string;
  text_pt_br: string;
  next_page: number | null;
  is_ending: boolean;
}

// ─── Mappers ─────────────────────────────────────────────────────────────────

function mapChoice(row: ChoiceRow): StoryChoice {
  return {
    id: row.choice_key,
    text: row.text,
    textEs: row.text_es,
    textPtBR: row.text_pt_br,
    nextPage: row.next_page,
    isEnding: row.is_ending,
  };
}

function mapPage(row: PageRow): StoryPage {
  return {
    pageNumber: row.page_number,
    text: row.text,
    textEs: row.text_es,
    textPtBR: row.text_pt_br,
    backgroundImage: row.background_image,
    emoji: row.emoji,
    choices: (row.story_choices ?? [])
      .map(mapChoice)
      .sort((a, b) => a.id.localeCompare(b.id)),
  };
}

function mapStory(row: StoryRow): Story {
  return {
    id: row.slug,
    title: row.title,
    titleEs: row.title_es,
    titlePtBR: row.title_pt_br,
    description: row.description,
    descriptionEs: row.description_es,
    descriptionPtBR: row.description_pt_br,
    theme: row.theme,
    characters: row.characters,
    ageMin: row.age_min,
    ageMax: row.age_max,
    totalPages: row.total_pages,
    readingLevel: row.reading_level,
    coverImage: row.cover_image,
    emoji: row.emoji,
    isNew: row.is_new,
    isFeatured: row.is_featured,
    downloadSizeMB: row.download_size_mb,
    pages: (row.story_pages ?? [])
      .map(mapPage)
      .sort((a, b) => a.pageNumber - b.pageNumber),
  };
}

// ─── Query helper ─────────────────────────────────────────────────────────────

const STORY_SELECT = `
  *,
  story_pages (
    *,
    story_choices (*)
  )
`;

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchAllStories(): Promise<Story[]> {
  const { data, error } = await supabase
    .from('stories')
    .select(STORY_SELECT)
    .order('slug');

  if (error) {
    console.warn('[storiesService] fetchAllStories fallback to mock:', error.message);
    return MOCK_STORIES;
  }

  return (data as StoryRow[]).map(mapStory);
}

export async function fetchStoryById(slug: string): Promise<Story | undefined> {
  const { data, error } = await supabase
    .from('stories')
    .select(STORY_SELECT)
    .eq('slug', slug)
    .single();

  if (error) {
    console.warn('[storiesService] fetchStoryById fallback to mock:', error.message);
    return MOCK_STORIES.find((s) => s.id === slug);
  }

  return mapStory(data as StoryRow);
}

export async function fetchStoriesByTheme(theme: StoryTheme): Promise<Story[]> {
  const { data, error } = await supabase
    .from('stories')
    .select(STORY_SELECT)
    .eq('theme', theme)
    .order('slug');

  if (error) {
    console.warn('[storiesService] fetchStoriesByTheme fallback to mock:', error.message);
    return MOCK_STORIES.filter((s) => s.theme === theme);
  }

  return (data as StoryRow[]).map(mapStory);
}

export async function fetchFeaturedStory(): Promise<Story> {
  const { data, error } = await supabase
    .from('stories')
    .select(STORY_SELECT)
    .eq('is_featured', true)
    .single();

  if (error || !data) {
    console.warn('[storiesService] fetchFeaturedStory fallback to mock:', error?.message);
    return MOCK_STORIES.find((s) => s.isFeatured) ?? MOCK_STORIES[0];
  }

  return mapStory(data as StoryRow);
}

export async function fetchNewStories(): Promise<Story[]> {
  const { data, error } = await supabase
    .from('stories')
    .select(STORY_SELECT)
    .eq('is_new', true)
    .order('slug');

  if (error) {
    console.warn('[storiesService] fetchNewStories fallback to mock:', error.message);
    return MOCK_STORIES.filter((s) => s.isNew);
  }

  return (data as StoryRow[]).map(mapStory);
}

export async function fetchRecommendedStories(): Promise<Story[]> {
  const { data, error } = await supabase
    .from('stories')
    .select(STORY_SELECT)
    .order('slug')
    .limit(4);

  if (error) {
    console.warn('[storiesService] fetchRecommendedStories fallback to mock:', error.message);
    return MOCK_STORIES.slice(0, 4);
  }

  return (data as StoryRow[]).map(mapStory);
}

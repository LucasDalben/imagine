import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ReadingProgress {
  storyId: string;
  currentPage: number;
  completedAt?: string;
}

interface DownloadedStory {
  storyId: string;
  downloadedAt: string;
  sizeMB: number;
}

interface ReadingState {
  progress: Record<string, ReadingProgress>;
  downloads: Record<string, DownloadedStory>;
  favorites: string[];
  updateProgress: (storyId: string, page: number) => Promise<void>;
  getProgress: (storyId: string) => ReadingProgress | undefined;
  downloadStory: (storyId: string, sizeMB: number) => Promise<void>;
  removeDownload: (storyId: string) => Promise<void>;
  isDownloaded: (storyId: string) => boolean;
  toggleFavorite: (storyId: string) => Promise<void>;
  isFavorite: (storyId: string) => boolean;
  loadAll: () => Promise<void>;
}

const PROGRESS_KEY = '@imagine_progress';
const DOWNLOADS_KEY = '@imagine_downloads';
const FAVORITES_KEY = '@imagine_favorites';

export const useReadingStore = create<ReadingState>((set, get) => ({
  progress: {},
  downloads: {},
  favorites: [],

  updateProgress: async (storyId, page) => {
    const newProgress = {
      ...get().progress,
      [storyId]: { storyId, currentPage: page },
    };
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
    set({ progress: newProgress });
  },

  getProgress: (storyId) => get().progress[storyId],

  downloadStory: async (storyId, sizeMB) => {
    const newDownloads = {
      ...get().downloads,
      [storyId]: { storyId, downloadedAt: new Date().toISOString(), sizeMB },
    };
    await AsyncStorage.setItem(DOWNLOADS_KEY, JSON.stringify(newDownloads));
    set({ downloads: newDownloads });
  },

  removeDownload: async (storyId) => {
    const newDownloads = { ...get().downloads };
    delete newDownloads[storyId];
    await AsyncStorage.setItem(DOWNLOADS_KEY, JSON.stringify(newDownloads));
    set({ downloads: newDownloads });
  },

  isDownloaded: (storyId) => !!get().downloads[storyId],

  toggleFavorite: async (storyId) => {
    const current = get().favorites;
    const updated = current.includes(storyId)
      ? current.filter((id) => id !== storyId)
      : [...current, storyId];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    set({ favorites: updated });
  },

  isFavorite: (storyId) => get().favorites.includes(storyId),

  loadAll: async () => {
    try {
      const [progressRaw, downloadsRaw, favoritesRaw] = await Promise.all([
        AsyncStorage.getItem(PROGRESS_KEY),
        AsyncStorage.getItem(DOWNLOADS_KEY),
        AsyncStorage.getItem(FAVORITES_KEY),
      ]);
      set({
        progress: progressRaw ? (JSON.parse(progressRaw) as Record<string, ReadingProgress>) : {},
        downloads: downloadsRaw ? (JSON.parse(downloadsRaw) as Record<string, DownloadedStory>) : {},
        favorites: favoritesRaw ? (JSON.parse(favoritesRaw) as string[]) : [],
      });
    } catch {
      // keep defaults
    }
  },
}));

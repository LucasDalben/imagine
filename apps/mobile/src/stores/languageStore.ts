import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n, { type LanguageCode, SUPPORTED_LANGUAGES } from '../i18n';

export type { LanguageCode };
export { SUPPORTED_LANGUAGES };

interface LanguageState {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => Promise<void>;
  loadSavedLanguage: () => Promise<void>;
}

const LANGUAGE_KEY = '@imagine_language';

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',

  setLanguage: async (lang: LanguageCode) => {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    set({ language: lang });
  },

  loadSavedLanguage: async () => {
    try {
      const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (saved) {
        const lang = saved as LanguageCode;
        await i18n.changeLanguage(lang);
        set({ language: lang });
      }
    } catch {
      // keep default
    }
  },
}));

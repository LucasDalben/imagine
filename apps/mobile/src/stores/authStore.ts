import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  avatarEmoji: string;
  subscription: 'free' | 'premium';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  createAccount: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadSession: () => Promise<void>;
  updateProfile: (updates: Partial<Pick<User, 'name' | 'avatarEmoji'>>) => Promise<void>;
}

const SESSION_KEY = '@imagine_session';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, _password: string) => {
    // Mock authentication — replace with real API call
    const user: User = {
      id: '1',
      name: email.split('@')[0] ?? 'Explorer',
      email,
      avatarEmoji: '🦁',
      subscription: 'free',
    };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  createAccount: async (name: string, email: string, _password: string) => {
    // Mock registration — replace with real API call
    const user: User = {
      id: Date.now().toString(),
      name,
      email,
      avatarEmoji: '⭐',
      subscription: 'free',
    };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    set({ user: null, isAuthenticated: false });
  },

  loadSession: async () => {
    try {
      const raw = await AsyncStorage.getItem(SESSION_KEY);
      if (raw) {
        const user = JSON.parse(raw) as User;
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  updateProfile: async (updates) => {
    const { user } = get();
    if (!user) return;
    const updated = { ...user, ...updates };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    set({ user: updated });
  },
}));

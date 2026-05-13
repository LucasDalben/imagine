import '../src/i18n';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/stores/authStore';
import { useLanguageStore } from '@/stores/languageStore';
import { useReadingStore } from '@/stores/readingStore';
import { Colors } from '@/theme';

export default function RootLayout() {
  const { loadSession, isAuthenticated, isLoading } = useAuthStore();
  const { loadSavedLanguage } = useLanguageStore();
  const { loadAll } = useReadingStore();

  useEffect(() => {
    Promise.all([loadSession(), loadSavedLanguage(), loadAll()]);
  }, []);

  if (isLoading) return null;

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="story/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="story/read/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
      </Stack>
    </>
  );
}

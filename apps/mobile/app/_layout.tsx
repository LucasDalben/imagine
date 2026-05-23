import '../src/i18n';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/stores/authStore';
import { useLanguageStore } from '@/stores/languageStore';
import { useReadingStore } from '@/stores/readingStore';
import { Colors } from '@/theme';
import { SplashIntro } from '@/components/shared/SplashIntro';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';

export default function RootLayout() {
  const { loadSession, isLoading } = useAuthStore();
  const { loadSavedLanguage } = useLanguageStore();
  const { loadAll } = useReadingStore();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    Promise.all([loadSession(), loadSavedLanguage(), loadAll()]);
  }, []);

  if (showSplash) {
    return (
      <>
        <StatusBar style="dark" />
        <SplashIntro onFinish={() => setShowSplash(false)} />
      </>
    );
  }

  if (isLoading) return null;

  return (
    <>
      <AnimatedBackground />
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
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

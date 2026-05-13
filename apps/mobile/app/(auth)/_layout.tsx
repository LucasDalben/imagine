import { Stack, Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { Colors } from '@/theme';

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="create-account" />
      <Stack.Screen name="create-account-email" />
      <Stack.Screen name="create-account-password" />
    </Stack>
  );
}

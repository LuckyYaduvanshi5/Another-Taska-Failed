import React from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';
import { ThemeProvider, useTheme } from '../src/contexts/ThemeContext';
import { useEffect } from 'react';
import { ErrorBoundary } from '../src/components/common/ErrorBoundary';

// Navigation guard component
function NavigationGuard({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      // Redirect to main app if authenticated
      router.replace('/(main)/dashboard');
    }
  }, [session, loading, segments]);

  return <>{children}</>;
}

function RootLayoutNav({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <PaperProvider theme={theme}>
      <NavigationGuard>
        <Stack screenOptions={{ headerShown: false }}>
          {children}
          <Stack.Screen 
            name="(auth)" 
            options={{ 
              headerShown: false,
              // Prevent going back to auth screens
              gestureEnabled: false 
            }} 
          />
          <Stack.Screen 
            name="(main)" 
            options={{ 
              headerShown: false,
              // Prevent going back to auth screens
              gestureEnabled: false 
            }} 
          />
        </Stack>
      </NavigationGuard>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <RootLayoutNav />
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
} 
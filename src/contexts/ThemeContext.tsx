import React, { createContext, useContext, useState, useEffect } from 'react';
import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { useAuth } from './AuthContext';
import { useDatabase } from '../hooks/useDatabase';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: typeof MD3LightTheme;
  themeType: ThemeType;
  setThemeType: (type: ThemeType) => Promise<void>;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: MD3LightTheme,
  themeType: 'system',
  setThemeType: async () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const { session } = useAuth();
  const { updateUserPreferences } = useDatabase();
  const [themeType, setThemeType] = useState<ThemeType>('system');

  const isDark =
    themeType === 'system' ? colorScheme === 'dark' : themeType === 'dark';

  const theme = isDark ? MD3DarkTheme : MD3LightTheme;

  const handleThemeChange = async (newTheme: ThemeType) => {
    setThemeType(newTheme);
    if (session?.user.id) {
      await updateUserPreferences(session.user.id, {
        theme: newTheme === 'system' ? undefined : newTheme,
      });
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        setThemeType: handleThemeChange,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 
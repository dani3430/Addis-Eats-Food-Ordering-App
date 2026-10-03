/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';

export function ThemeProvider({ children }) {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('addisEatsTheme', theme);
  }, [theme]);

  return children;
}

export const useTheme = () => ({
  theme: useAppStore((state) => state.theme),
  toggleTheme: useAppStore((state) => state.toggleTheme),
});

import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../db/database';

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    async function loadTheme() {
      try {
        const stored = await db.settings.get('theme');
        if (stored && stored.value) {
          setTheme(stored.value);
        } else {
          setTheme('dark');
        }
      } catch {
        setTheme('dark');
      }
    }
    loadTheme();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#f8fafc');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#090d16');
    }
  }, [theme]);

  const toggleTheme = async () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      await db.settings.put({
        key: 'theme',
        value: nextTheme,
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Could not persist theme to Dexie:', e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

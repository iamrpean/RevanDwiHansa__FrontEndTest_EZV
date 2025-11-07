'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';
import { Button } from '@/shared/components/ui/button';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="md"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="flex items-center gap-2"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Switch to light mode</span>
        </>
      ) : (
        <>
          <Moon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Switch to dark mode</span>
        </>
      )}
    </Button>
  );
}

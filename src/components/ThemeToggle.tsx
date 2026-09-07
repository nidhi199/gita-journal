import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ compact = false, className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light theme (Daylight)' : 'Switch to Dark theme (Contemplative Night)'}
      aria-label={isDark ? 'Switch to Light theme' : 'Switch to Dark theme'}
      className={`group relative flex items-center space-x-1.5 rounded-lg border border-zinc-700/60 bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-zinc-100 hover:border-amber-500/50 hover:bg-zinc-750 transition-all cursor-pointer shadow-xs focus:outline-hidden focus:ring-1 focus:ring-amber-500/40 ${className}`}
    >
      {isDark ? (
        <>
          <Sun className="h-3.5 w-3.5 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
          {!compact && (
            <span className="text-[11px] font-medium tracking-wide">
              Light Mode
            </span>
          )}
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5 text-indigo-400 transition-transform duration-300 group-hover:-rotate-12" />
          {!compact && (
            <span className="text-[11px] font-medium tracking-wide">
              Dark Mode
            </span>
          )}
        </>
      )}
    </button>
  );
};

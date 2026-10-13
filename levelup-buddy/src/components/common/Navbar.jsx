import React from 'react';
import { Sun, Moon, Sparkles, Flame } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar({ streakCount = 0 }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-2xl bg-[#060813]/75 border-b border-white/[0.07] light:bg-white/80 light:border-slate-200/80 safe-top shadow-lg shadow-black/20">
      <div className="max-w-md mx-auto px-4 h-15 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2.5">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-[6px] opacity-70 group-hover:opacity-100 transition duration-300" />
            <div className="relative w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-inner">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
          </div>
          <div>
            <div className="font-extrabold text-[15px] tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent light:from-slate-950 light:to-indigo-900 leading-none">
              LevelUp Buddy
            </div>
            <span className="text-[10px] font-medium text-indigo-400 light:text-indigo-600 tracking-wider uppercase">
              Small Steps. Better You.
            </span>
          </div>
        </div>

        {/* Right Actions: Streak & Theme Toggle */}
        <div className="flex items-center space-x-2">
          {streakCount > 0 && (
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm shadow-amber-500/25 animate-pulse">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{streakCount} {streakCount === 1 ? 'day' : 'days'}</span>
            </div>
          )}

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-all duration-200 border border-white/[0.08] light:bg-slate-100 light:text-slate-700 light:border-slate-300 shadow-sm active:scale-95"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300 transition-transform rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 transition-transform -rotate-12 hover:rotate-0" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

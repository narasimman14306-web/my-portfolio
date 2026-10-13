import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CalendarCheck, Zap, TrendingUp, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Routine', path: '/routine', icon: CalendarCheck },
  { label: 'Habits', path: '/habits', icon: Zap },
  { label: 'Progress', path: '/progress', icon: TrendingUp },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-2xl bg-[#060813]/85 border-t border-white/[0.08] light:bg-white/90 light:border-slate-200/90 shadow-2xl shadow-black/40">
      <div className="max-w-md mx-auto px-3 py-1.5 flex items-center justify-around safe-bottom-bar">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all duration-300 relative ${
                  isActive
                    ? 'text-indigo-400 font-bold scale-105'
                    : 'text-slate-400 hover:text-slate-200 light:text-slate-500 light:hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`relative p-1.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-tr from-indigo-600/30 via-purple-600/25 to-pink-600/20 text-indigo-400 shadow-md shadow-indigo-500/20 border border-indigo-500/30'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 shadow-sm shadow-pink-500/50 animate-pulse" />
                    )}
                  </div>
                  <span className="text-[11px] mt-1 tracking-tight font-medium">
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="w-4 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-0.5 shadow-sm shadow-indigo-500/50" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

import React from 'react';

export default function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  accentColor = 'indigo'
}) {
  const colorMap = {
    indigo: {
      badge: 'from-indigo-500/25 to-purple-500/20 text-indigo-400 border-indigo-500/35 shadow-indigo-500/20',
      glow: 'bg-indigo-500/10'
    },
    emerald: {
      badge: 'from-emerald-500/25 to-teal-500/20 text-emerald-400 border-emerald-500/35 shadow-emerald-500/20',
      glow: 'bg-emerald-500/10'
    },
    amber: {
      badge: 'from-amber-500/25 to-orange-500/20 text-amber-400 border-amber-500/35 shadow-amber-500/20',
      glow: 'bg-amber-500/10'
    },
    violet: {
      badge: 'from-purple-500/25 to-pink-500/20 text-purple-400 border-purple-500/35 shadow-purple-500/20',
      glow: 'bg-purple-500/10'
    },
    rose: {
      badge: 'from-rose-500/25 to-pink-500/20 text-rose-400 border-rose-500/35 shadow-rose-500/20',
      glow: 'bg-rose-500/10'
    }
  };

  const selectedTheme = colorMap[accentColor] || colorMap.indigo;

  return (
    <div className="glass-panel p-4.5 rounded-3xl relative overflow-hidden transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-0.5 group">
      {/* Background radial highlight */}
      <div className={`absolute -right-6 -bottom-6 w-20 h-20 rounded-full ${selectedTheme.glow} blur-xl pointer-events-none group-hover:scale-125 transition-transform`} />

      <div className="relative z-10 flex items-center justify-between mb-2.5">
        <span className="text-xs font-bold text-slate-400 light:text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl bg-gradient-to-br ${selectedTheme.badge} border shadow-sm`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="relative z-10 flex items-baseline space-x-2">
        <span className="text-2xl font-black text-white tracking-tight light:text-slate-900">
          {value}
        </span>
        {subtext && (
          <span className="text-[11px] text-slate-400 light:text-slate-500 font-medium truncate">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}

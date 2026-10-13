import React from 'react';

const CATEGORY_COLORS = {
  Morning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Work: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Learning: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
  Fitness: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Evening: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  Personal: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  Health: 'bg-green-500/15 text-green-400 border-green-500/30',
  Career: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  English: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  'Personal Growth': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  'Mental Wellness': 'bg-pink-500/15 text-pink-400 border-pink-500/30',
  Finance: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
};

const PRIORITY_COLORS = {
  high: 'bg-red-500/15 text-red-400 border-red-500/30',
  medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  low: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
};

export default function Badge({ text, variant = 'category', size = 'sm' }) {
  let colorClass = 'bg-slate-800 text-slate-300 border-slate-700';

  if (variant === 'category') {
    colorClass = CATEGORY_COLORS[text] || 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
  } else if (variant === 'priority') {
    colorClass = PRIORITY_COLORS[text?.toLowerCase()] || colorClass;
  }

  const sizeClass = size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-0.5';

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${colorClass} ${sizeClass} uppercase tracking-wider`}>
      {text}
    </span>
  );
}

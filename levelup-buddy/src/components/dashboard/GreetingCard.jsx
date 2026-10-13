import React from 'react';
import { getTimeOfDayGreeting, formatDisplayDate } from '../../utils/dateUtils';
import { getDailyQuote } from '../../utils/quotes';
import { Target, CheckCircle2, Sparkles, Quote } from 'lucide-react';

export default function GreetingCard({ summary }) {
  const greeting = getTimeOfDayGreeting();
  const todayFormatted = formatDisplayDate(new Date(), 'EEEE, MMMM d');
  const quoteObj = getDailyQuote();

  const overallPercentage = summary?.overallPercentage || 0;
  const routinesDone = summary?.routinesCompleted || 0;
  const routinesTotal = summary?.routinesTotal || 0;
  const habitsDone = summary?.habitsCompleted || 0;
  const habitsTotal = summary?.habitsTotal || 0;

  return (
    <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-[#121835]/90 via-[#0e142c]/95 to-[#1c1236]/90 border border-white/[0.1] shadow-2xl shadow-indigo-950/40 mb-4 light:from-indigo-50/90 light:via-purple-50/80 light:to-pink-50/90 light:border-indigo-100">
      {/* Decorative ambient neon glows */}
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500/25 to-pink-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-3xl pointer-events-none" />

      {/* Top row: Greeting & Date */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 light:text-indigo-600">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>{todayFormatted}</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mt-1 light:text-slate-900 drop-shadow-sm">
            {greeting}!
          </h2>
          <p className="text-xs text-slate-400 light:text-slate-500 font-medium mt-0.5">
            Consistency is your superpower today.
          </p>
        </div>

        {/* Circular Progress Ring with Glowing SVG Filter */}
        <div className="relative flex items-center justify-center w-17 h-17 shrink-0">
          <svg className="w-17 h-17 transform -rotate-90">
            <circle
              cx="34"
              cy="34"
              r="27"
              stroke="currentColor"
              strokeWidth="5"
              className="text-white/[0.08] light:text-slate-200"
              fill="transparent"
            />
            <circle
              cx="34"
              cy="34"
              r="27"
              stroke="url(#progressGrad)"
              strokeWidth="5"
              strokeDasharray={169.64}
              strokeDashoffset={169.64 - (169.64 * overallPercentage) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
              style={{ filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.5))' }}
            />
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-sm font-black text-white light:text-slate-900 tracking-tight">
              {overallPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Motivational Quote Capsule */}
      <div className="relative z-10 mt-4 p-3.5 rounded-2xl bg-black/25 border border-white/[0.08] backdrop-blur-md light:bg-white/70 light:border-indigo-100 shadow-inner">
        <div className="flex items-start space-x-2.5">
          <Quote className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 opacity-80" />
          <div className="flex-1 min-w-0">
            <p className="text-xs italic text-slate-200 light:text-slate-700 leading-relaxed font-normal">
              "{quoteObj.quote}"
            </p>
            <span className="block text-[10px] text-pink-400 light:text-pink-600 font-bold mt-1">
              — {quoteObj.author}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Breakdown Pills */}
      <div className="relative z-10 grid grid-cols-2 gap-2.5 mt-3.5 pt-3.5 border-t border-white/[0.08] light:border-slate-200">
        <div className="flex items-center space-x-2.5 p-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm light:bg-white light:border-slate-200 shadow-sm">
          <div className="p-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-[10px] text-slate-400 light:text-slate-500 font-medium">Routine Schedule</div>
            <div className="text-xs font-bold text-white light:text-slate-900 truncate">
              {routinesDone} / {routinesTotal} done
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 p-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm light:bg-white light:border-slate-200 shadow-sm">
          <div className="p-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-[10px] text-slate-400 light:text-slate-500 font-medium">Daily Habits</div>
            <div className="text-xs font-bold text-white light:text-slate-900 truncate">
              {habitsDone} / {habitsTotal} checked
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

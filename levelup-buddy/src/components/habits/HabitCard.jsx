import React from 'react';
import { Flame, Trophy, Check, Edit3, Trash2 } from 'lucide-react';
import Badge from '../common/Badge';
import { getLastNDays } from '../../utils/dateUtils';

export default function HabitCard({
  habit,
  onToggleToday,
  onEdit,
  onDelete
}) {
  const isDone = Boolean(habit.isCompletedToday);
  const currentStreak = habit.currentStreak || 0;
  const bestStreak = habit.bestStreak || 0;
  const totalCompletions = habit.totalCompletions || 0;

  // Mini 7-day history visualization
  const last7Days = getLastNDays(7);
  const historyDates = new Set(habit.completionHistory || []);

  return (
    <div
      className={`p-4 rounded-3xl glass-panel transition-all duration-300 border ${
        habit.isActive
          ? 'border-white/[0.09] hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-950/30'
          : 'border-white/[0.04] opacity-50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Color badge & Info */}
        <div className="flex items-start space-x-3.5 flex-1 min-w-0">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-transform hover:scale-105"
            style={{
              backgroundColor: `${habit.color || '#6366f1'}20`,
              borderColor: `${habit.color || '#6366f1'}50`,
              borderWidth: 1.5,
              boxShadow: `0 0 14px ${habit.color || '#6366f1'}25`
            }}
          >
            <span
              className="w-4 h-4 rounded-full shadow-sm"
              style={{ backgroundColor: habit.color || '#6366f1' }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <Badge text={habit.category} variant="category" size="xs" />
              <span className="text-[10px] text-indigo-300 light:text-indigo-600 font-semibold capitalize px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.06]">
                {habit.targetFrequency || 'Daily'}
              </span>
            </div>

            <h3 className="text-base font-extrabold text-white light:text-slate-900 tracking-tight truncate">
              {habit.name}
            </h3>

            {habit.description && (
              <p className="text-xs text-slate-400 light:text-slate-500 mt-1 line-clamp-1">
                {habit.description}
              </p>
            )}

            {/* Streak & Stats row with glowing badges */}
            <div className="flex items-center space-x-3 mt-2.5 text-xs text-slate-300 light:text-slate-600 font-bold">
              <div className="flex items-center space-x-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>{currentStreak}d streak</span>
              </div>
              <div className="flex items-center space-x-1 text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-500/20">
                <Trophy className="w-3.5 h-3.5" />
                <span>Best: {bestStreak}d</span>
              </div>
              <div className="text-slate-400 text-[11px] font-medium">
                {totalCompletions} total
              </div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex flex-col items-end space-y-2 shrink-0">
          <button
            type="button"
            onClick={() => onToggleToday(habit.id, isDone)}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 ${
              isDone
                ? 'bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-indigo-600/40 scale-105 active:scale-95'
                : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/[0.08] light:bg-slate-100 light:border-slate-300 active:scale-95'
            }`}
            aria-label={`Toggle habit ${habit.name}`}
          >
            <Check className={`w-5 h-5 stroke-[2.8] ${isDone ? 'opacity-100' : 'opacity-35'}`} />
          </button>

          <div className="flex items-center space-x-1 pt-1">
            <button
              type="button"
              onClick={() => onEdit(habit)}
              aria-label="Edit Habit"
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors light:hover:text-slate-900"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(habit)}
              aria-label="Delete Habit"
              className="p-1.5 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/15 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mini 7-day history tracker */}
      <div className="mt-3.5 pt-3 border-t border-white/[0.07] light:border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Last 7 Days Momentum
          </span>
          <div className="flex items-center space-x-1.5">
            {last7Days.map((d) => {
              const completedOnDay = historyDates.has(d.dateString);
              return (
                <div
                  key={d.dateString}
                  title={`${d.dayName} (${d.dateString}): ${completedOnDay ? 'Completed' : 'Missed'}`}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-5.5 h-5.5 rounded-xl flex items-center justify-center text-[9px] font-extrabold transition-all ${
                      completedOnDay
                        ? 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-sm shadow-indigo-500/30'
                        : d.isToday
                        ? 'bg-slate-800/90 border border-indigo-400/50 text-indigo-300 light:bg-slate-200'
                        : 'bg-white/[0.04] text-slate-600 light:bg-slate-100 light:text-slate-400 border border-white/[0.04]'
                    }`}
                  >
                    {completedOnDay ? '✓' : d.dayName.slice(0, 1)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

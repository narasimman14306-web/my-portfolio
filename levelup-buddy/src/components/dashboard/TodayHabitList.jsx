import React from 'react';
import { Check, Flame, Zap } from 'lucide-react';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';

export default function TodayHabitList({
  habits = [],
  onToggleComplete,
  onNavigateToHabits
}) {
  if (habits.length === 0) {
    return (
      <EmptyState
        title="No active habits yet"
        description="Add your daily habits to build consistency and keep up your streaks."
        actionText="Create Habit"
        onAction={onNavigateToHabits}
        icon={Zap}
      />
    );
  }

  return (
    <div className="space-y-2.5">
      {habits.map((habit) => {
        const isDone = Boolean(habit.isCompletedToday);
        const streak = habit.currentStreak || 0;

        return (
          <div
            key={habit.id}
            className={`p-3.5 rounded-2xl glass-panel transition-all duration-300 border ${
              isDone
                ? 'bg-[#0e142e]/60 border-indigo-500/30 opacity-90 light:bg-indigo-50/70 light:border-indigo-200'
                : 'hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-950/20'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              {/* Habit color pill & details */}
              <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105"
                  style={{
                    backgroundColor: `${habit.color || '#6366f1'}22`,
                    borderColor: `${habit.color || '#6366f1'}50`,
                    borderWidth: 1.5,
                    boxShadow: `0 0 12px ${habit.color || '#6366f1'}25`
                  }}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-sm"
                    style={{ backgroundColor: habit.color || '#6366f1' }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm font-bold tracking-tight truncate ${
                        isDone ? 'line-through text-slate-400 light:text-slate-400' : 'text-white light:text-slate-900'
                      }`}
                    >
                      {habit.name}
                    </span>
                    <Badge text={habit.category} variant="category" size="xs" />
                  </div>

                  {/* Streak & stats */}
                  <div className="flex items-center space-x-2.5 mt-1 text-[11px] text-slate-400 light:text-slate-500 font-medium">
                    <span className="flex items-center space-x-1 font-semibold text-amber-400">
                      <Flame className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{streak} {streak === 1 ? 'day' : 'days'}</span>
                    </span>
                    <span className="opacity-40">•</span>
                    <span>{habit.totalCompletions || 0} completions</span>
                  </div>
                </div>
              </div>

              {/* Complete button */}
              <button
                type="button"
                onClick={() => onToggleComplete(habit.id, isDone)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 shrink-0 ${
                  isDone
                    ? 'bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-indigo-600/40 scale-105 active:scale-95'
                    : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/[0.08] light:bg-slate-100 light:border-slate-300 active:scale-95'
                }`}
                aria-label={`Toggle habit ${habit.name}`}
              >
                <Check className={`w-4.5 h-4.5 stroke-[2.8] ${isDone ? 'opacity-100' : 'opacity-35'}`} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

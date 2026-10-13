import React from 'react';
import { Check, Clock, CalendarCheck } from 'lucide-react';
import Badge from '../common/Badge';
import { formatTimeDisplay } from '../../utils/dateUtils';
import EmptyState from '../common/EmptyState';

export default function TodayRoutineList({
  routines = [],
  completedIds = new Set(),
  onToggleComplete,
  onNavigateToRoutine
}) {
  if (routines.length === 0) {
    return (
      <EmptyState
        title="No routines scheduled today"
        description="Plan your day by adding routines or configuring days of the week."
        actionText="Manage Routines"
        onAction={onNavigateToRoutine}
        icon={CalendarCheck}
      />
    );
  }

  return (
    <div className="space-y-2.5">
      {routines.map((routine) => {
        const isDone = completedIds.has(routine.id);

        return (
          <div
            key={routine.id}
            className={`p-3.5 rounded-2xl glass-panel transition-all duration-300 border ${
              isDone
                ? 'bg-[#091823]/60 border-emerald-500/30 opacity-90 light:bg-emerald-50/70 light:border-emerald-200'
                : 'hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-950/20'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              {/* Checkbox with glowing rounded box */}
              <button
                type="button"
                onClick={() => onToggleComplete(routine.id, isDone)}
                className={`w-7 h-7 mt-0.5 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 ${
                  isDone
                    ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-md shadow-emerald-500/40 scale-105 active:scale-95'
                    : 'border-2 border-slate-600 hover:border-indigo-400 light:border-slate-300 active:scale-95 hover:bg-white/[0.04]'
                }`}
                aria-label={`Mark ${routine.title} as ${isDone ? 'incomplete' : 'complete'}`}
              >
                {isDone && <Check className="w-4.5 h-4.5 stroke-[3]" />}
              </button>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-bold tracking-tight truncate ${
                      isDone
                        ? 'line-through text-slate-400 light:text-slate-400'
                        : 'text-white light:text-slate-900'
                    }`}
                  >
                    {routine.title}
                  </span>
                  <Badge text={routine.category} variant="category" size="xs" />
                </div>

                {routine.description && (
                  <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5 line-clamp-1 font-normal">
                    {routine.description}
                  </p>
                )}

                <div className="flex items-center space-x-1.5 text-[11px] text-indigo-300 light:text-indigo-600 mt-2 font-semibold">
                  <div className="px-2 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-500/25 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    <span>
                      {formatTimeDisplay(routine.startTime)}
                      {routine.endTime ? ` - ${formatTimeDisplay(routine.endTime)}` : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

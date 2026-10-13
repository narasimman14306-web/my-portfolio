import React from 'react';
import { Clock, Edit3, Trash2 } from 'lucide-react';
import Badge from '../common/Badge';
import { formatTimeDisplay } from '../../utils/dateUtils';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function RoutineCard({
  routine,
  onEdit,
  onDelete,
  onToggleActive
}) {
  const days = routine.daysOfWeek || [];

  return (
    <div
      className={`p-4 rounded-3xl glass-panel transition-all duration-300 border ${
        routine.isActive
          ? 'border-white/[0.09] hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-950/30'
          : 'border-white/[0.04] opacity-50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Title, Badges, Description */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            <Badge text={routine.category} variant="category" size="xs" />
            <Badge text={routine.priority} variant="priority" size="xs" />
          </div>

          <h3 className="text-base font-extrabold text-white light:text-slate-900 tracking-tight">
            {routine.title}
          </h3>

          {routine.description && (
            <p className="text-xs text-slate-400 light:text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {routine.description}
            </p>
          )}

          {/* Time with styled capsule */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-300 light:text-slate-600 font-semibold mt-2.5">
            <div className="px-2.5 py-1 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center space-x-1.5 text-indigo-300 light:text-indigo-600">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                {formatTimeDisplay(routine.startTime)}
                {routine.endTime ? ` - ${formatTimeDisplay(routine.endTime)}` : ''}
              </span>
            </div>
          </div>

          {/* Days of week chips */}
          <div className="flex items-center space-x-1 mt-3">
            {DAY_LABELS.map((dayLabel, index) => {
              const isSelected = days.includes(index);
              return (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-lg text-[10px] font-bold flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-sm shadow-indigo-600/40'
                      : 'bg-white/[0.05] text-slate-500 light:bg-slate-100 light:text-slate-400 border border-white/[0.05]'
                  }`}
                >
                  {dayLabel}
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end space-y-2.5">
          {/* Active toggle */}
          <button
            type="button"
            onClick={() => onToggleActive(routine.id)}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 focus:outline-none ${
              routine.isActive ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-600/30' : 'bg-slate-800 light:bg-slate-300'
            }`}
            aria-label={`Toggle active state for ${routine.title}`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                routine.isActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>

          {/* Edit / Delete icons */}
          <div className="flex items-center space-x-1 pt-1">
            <button
              type="button"
              onClick={() => onEdit(routine)}
              aria-label="Edit Routine"
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors light:hover:bg-slate-100 light:hover:text-slate-800"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(routine)}
              aria-label="Delete Routine"
              className="p-1.5 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/15 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

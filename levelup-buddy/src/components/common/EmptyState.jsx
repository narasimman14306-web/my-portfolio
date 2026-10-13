import React from 'react';
import { Sparkles } from 'lucide-react';

export default function EmptyState({
  title = 'No items found',
  description = 'Get started by creating your first item.',
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  icon: Icon = Sparkles
}) {
  return (
    <div className="glass-panel rounded-3xl p-8 text-center flex flex-col items-center justify-center my-4 border border-dashed border-slate-700/70 light:border-slate-300">
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>

      <h4 className="text-base font-bold text-white mb-1.5 tracking-tight light:text-slate-900">
        {title}
      </h4>

      <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed light:text-slate-600">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full max-w-xs">
        {actionText && onAction && (
          <button
            onClick={onAction}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-transform active:scale-95"
          >
            {actionText}
          </button>
        )}

        {secondaryActionText && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 text-xs font-semibold border border-slate-700/60 transition-colors light:bg-slate-100 light:text-slate-700"
          >
            {secondaryActionText}
          </button>
        )}
      </div>
    </div>
  );
}

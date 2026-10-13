import React from 'react';
import { Droplets, Plus, Minus, Check } from 'lucide-react';

export default function WaterTrackerCard({ waterData, onAddGlass, onRemoveGlass }) {
  const glasses = waterData?.glasses || 0;
  const target = 8;
  const ml = waterData?.ml || 0;
  const percentage = Math.min(100, Math.round((glasses / target) * 100));

  return (
    <div className="glass-panel p-4 rounded-3xl relative overflow-hidden transition-all duration-300 border border-cyan-500/25 bg-gradient-to-br from-[#081829]/90 via-[#0a1626]/95 to-[#101935]/80 light:from-cyan-50/70 light:via-sky-50/60 light:to-indigo-50/70 light:border-cyan-200 shadow-xl shadow-cyan-950/20">
      {/* Background ambient halo */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Droplets className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-cyan-400 light:text-cyan-700">
              Daily Hydration
            </h4>
            <span className="text-[10px] text-slate-400 light:text-slate-600 font-medium">
              Target: 8 glasses (2,000 ml)
            </span>
          </div>
        </div>

        {/* Counter controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={onRemoveGlass}
            disabled={glasses <= 0}
            className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 text-slate-300 light:bg-slate-100 light:text-slate-700 transition-all active:scale-95"
            aria-label="Remove glass"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onAddGlass}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-600/30 transition-transform active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Glass</span>
          </button>
        </div>
      </div>

      {/* Glasses Row (8 Icons) */}
      <div className="grid grid-cols-8 gap-1.5 my-2.5">
        {Array.from({ length: 8 }).map((_, index) => {
          const isFilled = index < glasses;
          return (
            <div
              key={index}
              className={`h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isFilled
                  ? 'bg-gradient-to-t from-cyan-500 to-blue-500 text-white shadow-sm shadow-cyan-500/40 scale-105'
                  : 'bg-white/[0.05] border border-white/[0.06] text-slate-500 light:bg-slate-100 light:border-slate-200'
              }`}
              title={`Glass ${index + 1}`}
            >
              {isFilled ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Droplets className="w-3 h-3 opacity-30" />}
            </div>
          );
        })}
      </div>

      {/* Progress & ML info */}
      <div className="flex items-center justify-between text-xs font-bold pt-1.5 text-slate-300 light:text-slate-700">
        <span>
          {glasses} / {target} glasses ({percentage}%)
        </span>
        <span className="text-cyan-400 light:text-cyan-600 font-extrabold">
          {ml} ml drank
        </span>
      </div>
    </div>
  );
}

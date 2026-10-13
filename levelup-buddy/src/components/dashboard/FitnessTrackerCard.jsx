import React, { useState, useEffect } from 'react';
import { Footprints, Flame, Timer, Compass, Plus, Radio, Play, Pause } from 'lucide-react';
import { pedometerService } from '../../services/pedometerService';

export default function FitnessTrackerCard({
  fitnessData,
  onQuickAddSteps,
  onOpenLogModal
}) {
  const [isAutoTracking, setIsAutoTracking] = useState(false);
  const [liveStepsAdded, setLiveStepsAdded] = useState(0);

  const baseSteps = fitnessData?.steps || 0;
  const currentTotalSteps = baseSteps + liveStepsAdded;
  const distanceKm = parseFloat((currentTotalSteps * 0.00076).toFixed(2));
  const calories = Math.round(currentTotalSteps * 0.04);
  const durationMins = fitnessData?.durationMins || Math.round(currentTotalSteps / 100);

  // Daily target: 8,000 steps
  const targetSteps = 8000;
  const stepPercentage = Math.min(100, Math.round((currentTotalSteps / targetSteps) * 100));

  // Toggle Auto Pedometer tracking
  const toggleAutoTracking = async () => {
    if (!isAutoTracking) {
      const permitted = await pedometerService.requestPermission();
      if (permitted) {
        setIsAutoTracking(true);
        pedometerService.startTracking((newSteps) => {
          setLiveStepsAdded((prev) => prev + newSteps);
        });
      }
    } else {
      setIsAutoTracking(false);
      pedometerService.stopTracking();
    }
  };

  useEffect(() => {
    return () => {
      pedometerService.stopTracking();
    };
  }, []);

  // Simulation walk for testing when user wants to verify live stepping on PC
  const handleSimulateSteps = (count = 20) => {
    setLiveStepsAdded((prev) => prev + count);
    pedometerService.stepCount += count;
    pedometerService.scheduleDatabaseSync();
  };

  return (
    <div className="glass-panel p-4.5 rounded-3xl relative overflow-hidden transition-all duration-300 border border-emerald-500/25 bg-gradient-to-br from-[#0a1b24]/90 via-[#0e1626]/95 to-[#160d2b]/80 light:from-emerald-50/70 light:via-teal-50/60 light:to-sky-50/70 light:border-emerald-200 shadow-xl shadow-emerald-950/20">
      {/* Background ambient halo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Footprints className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 light:text-emerald-700">
              Auto Step & Distance Tracker
            </h4>
            <span className="text-[10px] text-slate-400 light:text-slate-600 font-medium">
              Counts automatically as you walk
            </span>
          </div>
        </div>

        {/* Live Auto Pedometer Toggle */}
        <button
          onClick={toggleAutoTracking}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
            isAutoTracking
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/40 animate-pulse'
              : 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 border border-white/[0.08] light:bg-slate-100 light:text-slate-700'
          }`}
        >
          {isAutoTracking ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Tracking ON</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Auto Walk</span>
            </>
          )}
        </button>
      </div>

      {/* Auto Tracking Live Status Beacon */}
      {isAutoTracking && (
        <div className="mb-3 p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 light:text-emerald-800 animate-fade-in">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-[11px]">Sensor Active: Keep phone in pocket/hand & walk!</span>
          </div>
          <button
            onClick={() => handleSimulateSteps(25)}
            className="text-[10px] bg-emerald-600/40 hover:bg-emerald-600/60 text-white font-bold px-2 py-0.5 rounded-md"
            title="Test walk step detection"
          >
            +25 Test
          </button>
        </div>
      )}

      {/* Step Count & Progress */}
      <div className="mb-3.5">
        <div className="flex items-baseline justify-between mb-1.5">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-white light:text-slate-900 tracking-tight">
              {currentTotalSteps.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              / {targetSteps.toLocaleString()} steps ({stepPercentage}%)
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-400">
            {distanceKm} km
          </span>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-black/30 border border-white/[0.08] overflow-hidden light:bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${stepPercentage}%` }}
          />
        </div>
      </div>

      {/* 3 Metric Pills */}
      <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-white/[0.08] light:border-slate-200">
        <div className="p-2 rounded-2xl bg-white/[0.04] border border-white/[0.06] light:bg-white light:border-slate-200">
          <div className="flex items-center justify-center space-x-1 text-[10px] text-slate-400 font-semibold mb-0.5">
            <Compass className="w-3 h-3 text-cyan-400" />
            <span>Distance</span>
          </div>
          <div className="text-sm font-extrabold text-white light:text-slate-900">
            {distanceKm} <span className="text-[10px] text-slate-400 font-normal">km</span>
          </div>
        </div>

        <div className="p-2 rounded-2xl bg-white/[0.04] border border-white/[0.06] light:bg-white light:border-slate-200">
          <div className="flex items-center justify-center space-x-1 text-[10px] text-slate-400 font-semibold mb-0.5">
            <Timer className="w-3 h-3 text-emerald-400" />
            <span>Duration</span>
          </div>
          <div className="text-sm font-extrabold text-white light:text-slate-900">
            {durationMins} <span className="text-[10px] text-slate-400 font-normal">mins</span>
          </div>
        </div>

        <div className="p-2 rounded-2xl bg-white/[0.04] border border-white/[0.06] light:bg-white light:border-slate-200">
          <div className="flex items-center justify-center space-x-1 text-[10px] text-slate-400 font-semibold mb-0.5">
            <Flame className="w-3 h-3 text-amber-400" />
            <span>Calories</span>
          </div>
          <div className="text-sm font-extrabold text-white light:text-slate-900">
            {calories} <span className="text-[10px] text-slate-400 font-normal">kcal</span>
          </div>
        </div>
      </div>

      {/* Manual log shortcut */}
      <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/[0.06] light:border-slate-200 text-[11px]">
        <span className="text-slate-400 font-medium">Automatic Step Sensor Ready</span>
        <button
          onClick={onOpenLogModal}
          className="text-emerald-400 light:text-emerald-700 font-bold hover:underline"
        >
          Manual Log Entry +
        </button>
      </div>
    </div>
  );
}

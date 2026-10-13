import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Footprints, Flame, Timer, Compass } from 'lucide-react';

export default function LogActivityModal({ isOpen, onClose, onSave }) {
  const [type, setType] = useState('walk'); // 'walk' | 'run'
  const [steps, setSteps] = useState('3000');
  const [distanceKm, setDistanceKm] = useState('2.3');
  const [durationMins, setDurationMins] = useState('30');

  // Auto calculate conversions
  const handleStepsChange = (val) => {
    setSteps(val);
    const num = Number(val) || 0;
    if (num > 0) {
      setDistanceKm((num * 0.00076).toFixed(2));
    }
  };

  const handleDistanceChange = (val) => {
    setDistanceKm(val);
    const num = Number(val) || 0;
    if (num > 0) {
      setSteps(Math.round(num * 1315).toString());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      type,
      steps: Number(steps) || 0,
      distanceKm: parseFloat(Number(distanceKm).toFixed(2)) || 0,
      durationMins: Number(durationMins) || 0,
      calories: Math.round((Number(steps) || 0) * (type === 'run' ? 0.06 : 0.04))
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🏃‍♂️ Log Walk or Run Session">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Activity Type Toggle */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setType('walk')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              type === 'walk'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-white/[0.05] text-slate-400 light:bg-slate-100 light:text-slate-700'
            }`}
          >
            <Footprints className="w-4 h-4" />
            <span>Walking</span>
          </button>

          <button
            type="button"
            onClick={() => setType('run')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              type === 'run'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-600/30'
                : 'bg-white/[0.05] text-slate-400 light:bg-slate-100 light:text-slate-700'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Running / Jogging</span>
          </button>
        </div>

        {/* Steps Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 light:text-slate-700 mb-1">
            Total Steps
          </label>
          <div className="relative">
            <input
              type="number"
              value={steps}
              onChange={(e) => handleStepsChange(e.target.value)}
              placeholder="e.g. 3500"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900"
            />
            <Footprints className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Distance in KM */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 light:text-slate-700 mb-1">
              Distance (Kilometers)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={distanceKm}
                onChange={(e) => handleDistanceChange(e.target.value)}
                placeholder="2.5"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900"
              />
              <Compass className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 light:text-slate-700 mb-1">
              Duration (Minutes)
            </label>
            <div className="relative">
              <input
                type="number"
                value={durationMins}
                onChange={(e) => setDurationMins(e.target.value)}
                placeholder="30"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900"
              />
              <Timer className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>

        {/* Live Calculation Preview */}
        <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 light:bg-indigo-50 light:border-indigo-200 light:text-indigo-950 flex items-center justify-around">
          <div>
            <span className="text-[10px] text-slate-400 block">Est. Distance</span>
            <span className="font-bold text-indigo-400 light:text-indigo-600 text-sm">{distanceKm || 0} km</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Calories</span>
            <span className="font-bold text-amber-400 text-sm">
              {Math.round((Number(steps) || 0) * (type === 'run' ? 0.06 : 0.04))} kcal
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 border-t border-slate-800 light:border-slate-200">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
          >
            Save Fitness Log
          </button>
        </div>
      </form>
    </Modal>
  );
}

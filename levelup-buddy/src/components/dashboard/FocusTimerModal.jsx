import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { Play, Pause, RotateCcw, Timer, Sparkles, CheckCircle2 } from 'lucide-react';
import { notificationService } from '../../services/notificationService';

export default function FocusTimerModal({ isOpen, onClose, onSaveSession }) {
  const [targetMins, setTargetMins] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [taskName, setTaskName] = useState('Deep Work & Coding');

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      notificationService.sendInstantNotification(
        '🏆 Focus Session Completed!',
        `Great discipline! You completed a ${targetMins}-minute focus session.`
      );
      if (onSaveSession) {
        onSaveSession(targetMins, taskName);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, targetMins, taskName, onSaveSession]);

  const selectPreset = (mins) => {
    setIsActive(false);
    setTargetMins(mins);
    setSecondsLeft(mins * 60);
  };

  const handleReset = () => {
    setIsActive(false);
    setSecondsLeft(targetMins * 60);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="⏱️ Focus Mode & Pomodoro Timer">
      <div className="space-y-4 text-center">
        {/* Preset Selector */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: '25m Focus', mins: 25 },
            { label: '50m Deep Work', mins: 50 },
            { label: '5m Quick Break', mins: 5 }
          ].map((preset) => (
            <button
              key={preset.mins}
              type="button"
              onClick={() => selectPreset(preset.mins)}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                targetMins === preset.mins
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-white/[0.05] text-slate-400 light:bg-slate-100 light:text-slate-700'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Task Tag */}
        <div>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Focus objective (e.g. Go Programming, Study)"
            className="w-full text-center px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900"
          />
        </div>

        {/* Big Circular Countdown Display */}
        <div className="py-6 flex flex-col items-center justify-center">
          <div className="text-5xl font-black text-white light:text-slate-900 tracking-tight font-mono drop-shadow-md">
            {formatTime(secondsLeft)}
          </div>
          <span className="text-xs text-indigo-400 light:text-indigo-600 font-semibold mt-1">
            {isActive ? 'Session in progress • Stay focused' : 'Timer paused'}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-3 pt-2 border-t border-slate-800 light:border-slate-200">
          <button
            type="button"
            onClick={handleReset}
            className="p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 light:bg-slate-100 light:text-slate-700 transition-all active:scale-95"
            aria-label="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`px-8 py-3 rounded-2xl text-white font-bold text-sm transition-all shadow-lg active:scale-95 flex items-center space-x-2 ${
              isActive
                ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-600/30'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isActive ? 'Pause' : 'Start Focus'}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

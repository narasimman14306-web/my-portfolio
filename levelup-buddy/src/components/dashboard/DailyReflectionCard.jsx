import React, { useState, useEffect } from 'react';
import { Smile, Sparkles, Check, Heart } from 'lucide-react';
import { lifeToolsService } from '../../services/lifeToolsService';

const MOODS = [
  { emoji: '😄', label: 'Great' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🥱', label: 'Tired' },
  { emoji: '😔', label: 'Stressed' }
];

export default function DailyReflectionCard() {
  const [selectedMood, setSelectedMood] = useState('😄');
  const [winNote, setWinNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadMood() {
      const data = await lifeToolsService.getTodayMood();
      if (data) {
        if (data.mood) setSelectedMood(data.mood);
        if (data.winNote) setWinNote(data.winNote);
      }
    }
    loadMood();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    await lifeToolsService.saveTodayMood(undefined, selectedMood, winNote);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="glass-panel p-4.5 rounded-3xl relative overflow-hidden transition-all duration-300 border border-pink-500/25 bg-gradient-to-br from-[#1b0a1d]/90 via-[#140e24]/95 to-[#0b1328]/80 light:from-pink-50/70 light:via-rose-50/60 light:to-purple-50/70 light:border-pink-200 shadow-xl shadow-pink-950/20">
      {/* Background ambient halo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-pink-500/15 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Heart className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-pink-400 light:text-pink-700">
              Evening Win & Mood Journal
            </h4>
            <span className="text-[10px] text-slate-400 light:text-slate-600 font-medium">
              Daily mental discipline reflection
            </span>
          </div>
        </div>

        {saved && (
          <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1 animate-fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>Saved!</span>
          </span>
        )}
      </div>

      {/* Mood Emoji Pills */}
      <div className="flex items-center justify-between mb-3 px-1">
        {MOODS.map((m) => (
          <button
            key={m.label}
            type="button"
            onClick={() => setSelectedMood(m.emoji)}
            className={`flex flex-col items-center p-2 rounded-2xl transition-all ${
              selectedMood === m.emoji
                ? 'bg-gradient-to-t from-pink-500/30 to-purple-500/20 border border-pink-500/50 scale-110 shadow-md shadow-pink-500/20'
                : 'hover:bg-white/[0.05] opacity-60 hover:opacity-100'
            }`}
          >
            <span className="text-xl">{m.emoji}</span>
            <span className="text-[9px] text-slate-400 mt-0.5 font-semibold">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Today's Win Form */}
      <form onSubmit={handleSave} className="space-y-2">
        <div className="relative">
          <input
            type="text"
            value={winNote}
            onChange={(e) => setWinNote(e.target.value)}
            placeholder="Today's #1 Win: (e.g. Completed my workout and coding session)"
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/25 border border-white/[0.08] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-pink-500 light:bg-white light:border-slate-300 light:text-slate-900"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-pink-600/30 transition-transform active:scale-95"
        >
          Save Evening Reflection
        </button>
      </form>
    </div>
  );
}

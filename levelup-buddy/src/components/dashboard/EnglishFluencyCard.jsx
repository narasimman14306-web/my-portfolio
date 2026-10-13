import React, { useState } from 'react';
import { MessageSquare, Volume2, CheckCircle2, Sparkles, ChevronRight } from 'lucide-react';
import { getDailyEnglishPhrase } from '../../utils/englishPhrases';

export default function EnglishFluencyCard() {
  const [practiced, setPracticed] = useState(false);
  const phraseObj = getDailyEnglishPhrase();

  return (
    <div className="glass-panel p-4.5 rounded-3xl relative overflow-hidden transition-all duration-300 border border-violet-500/25 bg-gradient-to-br from-[#120e2e]/90 via-[#0e122b]/95 to-[#1a0e2a]/80 light:from-violet-50/70 light:via-purple-50/60 light:to-pink-50/70 light:border-violet-200 shadow-xl shadow-purple-950/20">
      {/* Background ambient halo */}
      <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-violet-500/15 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
            <MessageSquare className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-violet-400 light:text-violet-700">
              Spoken English • Phrase of the Day
            </h4>
            <span className="text-[10px] text-slate-400 light:text-slate-600 font-medium">
              Daily conversation booster
            </span>
          </div>
        </div>

        <button
          onClick={() => setPracticed(!practiced)}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
            practiced
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
              : 'bg-white/[0.06] text-slate-300 hover:text-white border border-white/[0.08] light:bg-slate-100 light:text-slate-700'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{practiced ? 'Practiced ✓' : 'Mark Done'}</span>
        </button>
      </div>

      {/* Phrase & Meaning */}
      <div className="p-3 rounded-2xl bg-black/25 border border-white/[0.06] backdrop-blur-sm light:bg-white/80 light:border-purple-100 mb-2.5">
        <div className="flex items-baseline space-x-2 mb-1">
          <span className="text-sm font-black text-white light:text-slate-900 tracking-tight">
            "{phraseObj.phrase}"
          </span>
        </div>
        <p className="text-xs text-slate-300 light:text-slate-700 leading-relaxed font-medium">
          <strong className="text-violet-300 light:text-violet-700">Meaning:</strong> {phraseObj.meaning}
        </p>
        <p className="text-xs text-slate-400 light:text-slate-500 mt-1 italic">
          "{phraseObj.example}"
        </p>
      </div>

      {/* Speaking Challenge */}
      <div className="flex items-center space-x-2 text-[11px] text-violet-300 light:text-violet-700 font-semibold px-2">
        <Sparkles className="w-3.5 h-3.5 shrink-0 text-pink-400" />
        <span>Challenge: {phraseObj.challenge}</span>
      </div>
    </div>
  );
}

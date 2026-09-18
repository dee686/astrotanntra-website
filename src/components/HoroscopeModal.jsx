import React from 'react';
import { X, Heart, Briefcase, Activity, Sparkles, Star } from 'lucide-react';

export default function HoroscopeModal({ sign, onClose, onOpenConsultation, lang }) {
  if (!sign) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#13062c] border border-amber-500/50 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] text-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-purple-800/60 bg-gradient-to-r from-[#1c0a3c] via-[#240d4f] to-[#160630] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/80 flex items-center justify-center text-3xl shadow-gold-glow">
              <span>{sign.symbol}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300">
                  {sign.name} ({sign.sanskrit})
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-900/80 text-purple-200 border border-purple-600">
                  {sign.element} Element
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {sign.dates} • Ruled by {sign.ruler}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-cosmic-800 hover:bg-rose-500/20 border border-purple-700/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Weekly Badge & Theme */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-purple-900/40 to-amber-500/10 border border-amber-500/40 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider shadow-gold-glow">
                {lang === 'hi' ? 'साप्ताहिक राशिफल' : 'Weekly Horoscope'}
              </span>
              <span className="text-[11px] text-amber-200/90 font-medium">
                {sign.dates}
              </span>
            </div>
            {sign.weeklyTheme && (
              <span className="text-[11px] text-amber-300 font-semibold italic">
                ✦ {sign.weeklyTheme}
              </span>
            )}
          </div>

          {/* Main Weekly Forecast */}
          <div className="bg-[#1b0a38] border border-amber-500/30 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'hi' ? 'साप्ताहिक ग्रह गोचर फल (Weekly Vedic Forecast)' : 'Weekly Celestial Vedic Forecast'}</span>
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-light">
              {sign.weekly || sign.today}
            </p>
          </div>

          {/* 3 Categories: Weekly Love, Career, Health */}
          <div className="space-y-3.5">
            
            {/* Weekly Love */}
            <div className="p-4 rounded-2xl bg-[#170932] border border-pink-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-pink-400 font-bold text-xs">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Weekly Love & Relationship Outlook</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-16 bg-black/40 rounded-full h-2 overflow-hidden">
                    <div className="bg-pink-400 h-full rounded-full" style={{ width: `${sign.loveScore}%` }} />
                  </div>
                  <span className="text-[11px] font-mono text-pink-300 font-bold">{sign.loveScore}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{sign.love}</p>
            </div>

            {/* Weekly Career */}
            <div className="p-4 rounded-2xl bg-[#170932] border border-amber-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Briefcase className="w-4 h-4" />
                  <span>Weekly Career, Business & Wealth</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-16 bg-black/40 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${sign.careerScore}%` }} />
                  </div>
                  <span className="text-[11px] font-mono text-amber-300 font-bold">{sign.careerScore}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{sign.career}</p>
            </div>

            {/* Weekly Health */}
            <div className="p-4 rounded-2xl bg-[#170932] border border-emerald-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Activity className="w-4 h-4" />
                  <span>Weekly Health, Energy & Vitality</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-16 bg-black/40 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${sign.healthScore}%` }} />
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300 font-bold">{sign.healthScore}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{sign.health}</p>
            </div>

          </div>

          {/* Lucky Attributes Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#1b0a38] border border-purple-800/60 p-3 rounded-xl text-center text-xs">
              <span className="text-slate-400 block text-[10px]">Lucky Day</span>
              <strong className="text-amber-300 text-sm font-bold">{sign.luckyDay || 'Wednesday'}</strong>
            </div>
            <div className="bg-[#1b0a38] border border-purple-800/60 p-3 rounded-xl text-center text-xs">
              <span className="text-slate-400 block text-[10px]">Lucky Number</span>
              <strong className="text-amber-300 text-sm font-bold">{sign.number}</strong>
            </div>
            <div className="bg-[#1b0a38] border border-purple-800/60 p-3 rounded-xl text-center text-xs">
              <span className="text-slate-400 block text-[10px]">Lucky Color</span>
              <strong className="text-amber-300 text-xs font-bold">{sign.color}</strong>
            </div>
            <div className="bg-[#1b0a38] border border-purple-800/60 p-3 rounded-xl text-center text-xs">
              <span className="text-slate-400 block text-[10px]">Compatible Signs</span>
              <strong className="text-amber-300 text-xs font-bold">{sign.compatible}</strong>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-800/60 bg-[#160731] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenConsultation(`${sign.name} Personalized Astrology Reading`);
            }}
            className="gold-btn px-5 py-2.5 rounded-xl font-bold text-xs uppercase cursor-pointer"
          >
            Talk to Astrologer
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cosmic-800 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

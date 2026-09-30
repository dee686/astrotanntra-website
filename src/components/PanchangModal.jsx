import React from 'react';
import { X, Calendar, Sun, Moon, Sparkles, AlertCircle, ShieldAlert, Compass, Clock } from 'lucide-react';
import { TODAY_PANCHANG } from '../data/panchangData';

export default function PanchangModal({ onClose, lang }) {
  const isHi = lang === 'hi';
  const p = TODAY_PANCHANG;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#13062c] border border-amber-500/50 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] text-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-purple-800/60 bg-gradient-to-r from-[#1c0a3c] via-[#240d4f] to-[#160630] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300">
                {isHi ? 'दैनिक वैदिक पंचांग' : 'Daily Vedic Panchang'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {isHi 
                  ? `${p.dateFormattedHi || p.dateFormatted}, ${p.dayNameHi || 'सोमवार'} • विक्रम संवत ${p.samvat.vikram}` 
                  : `${p.dateFormatted}, ${p.dayName} (${p.sanskritDay}) • Vikram Samvat ${p.samvat.vikram}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-cosmic-800 hover:bg-rose-500/20 border border-purple-700/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label={isHi ? "बंद करें" : "Close"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Top 4 Core Pillars Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="bg-[#1a0a38] border border-amber-500/30 rounded-2xl p-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                {isHi ? 'तिथि' : 'Tithi'}
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-300 block leading-tight">
                {isHi ? (p.tithiHi || p.tithi) : p.tithi}
              </span>
              <span className="text-xs text-slate-400 block mt-1">
                {isHi ? (p.pakshaHi || p.paksha) : p.paksha}
              </span>
            </div>

            <div className="bg-[#1a0a38] border border-amber-500/30 rounded-2xl p-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                {isHi ? 'नक्षत्र' : 'Nakshatra'}
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-300 block leading-tight">
                {isHi ? (p.nakshatraHi || p.nakshatra) : p.nakshatra}
              </span>
              <span className="text-xs text-slate-400 block mt-1">
                {isHi ? `स्वामी: ${p.nakshatraLordHi || p.nakshatraLord}` : `Lord: ${p.nakshatraLord}`}
              </span>
            </div>

            <div className="bg-[#1a0a38] border border-amber-500/30 rounded-2xl p-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                {isHi ? 'योग' : 'Yoga'}
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-300 block leading-tight">
                {isHi ? (p.yogaHi || p.yoga) : p.yoga}
              </span>
              <span className="text-xs text-emerald-400 block mt-1">
                {isHi ? 'शुभ एवं कल्याणकारी' : 'Auspicious'}
              </span>
            </div>

            <div className="bg-[#1a0a38] border border-amber-500/30 rounded-2xl p-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                {isHi ? 'करण' : 'Karana'}
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-300 block leading-tight">
                {isHi ? (p.karanaHi || p.karana) : p.karana}
              </span>
              <span className="text-xs text-slate-400 block mt-1">
                {isHi ? 'प्रथम प्रहर' : 'First Half'}
              </span>
            </div>

          </div>

          {/* Sun & Moon Timings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Sun Card */}
            <div className="bg-gradient-to-br from-amber-950/40 to-[#180b33] border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm text-slate-300 block font-medium">
                    {isHi ? `सूर्य देव: ${p.sunSignHi || p.sunSign} में` : `Surya (Sun) in ${p.sunSign}`}
                  </span>
                  <span className="font-bold text-sm sm:text-base text-slate-100">
                    {isHi ? `सूर्योदय: ${p.sunrise} | सूर्यास्त: ${p.sunset}` : `Sunrise: ${p.sunrise} | Sunset: ${p.sunset}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Moon Card */}
            <div className="bg-gradient-to-br from-purple-950/40 to-[#180b33] border border-purple-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-purple-500/20 text-sky-300 flex items-center justify-center shrink-0">
                  <Moon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm text-slate-300 block font-medium">
                    {isHi ? `चंद्र देव: ${p.moonSignHi || p.moonSign} में` : `Chandra (Moon) in ${p.moonSign}`}
                  </span>
                  <span className="font-bold text-sm sm:text-base text-slate-100">
                    {isHi ? `चंद्रोदय: ${p.moonrise} | चंद्रास्त: ${p.moonset}` : `Moonrise: ${p.moonrise} | Moonset: ${p.moonset}`}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Shubh & Ashubh Muhurat Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Shubh Muhurat (Green/Gold) */}
            <div className="bg-[#170932] border border-emerald-500/40 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-emerald-500/20 text-emerald-400 font-cinzel font-bold text-sm sm:text-base">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{isHi ? 'शुभ मुहूर्त' : 'Shubh Muhurat (Auspicious)'}</span>
              </div>
              <div className="space-y-3">
                {p.shubhMuhurat.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs sm:text-sm">
                    <div className="flex items-center justify-between font-bold text-slate-200">
                      <span>{isHi ? (m.nameHi || m.name) : m.name}</span>
                      <span className="text-emerald-400 font-mono text-xs sm:text-sm">{m.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      {isHi ? (m.descHi || m.desc) : m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ashubh Muhurat (Red) */}
            <div className="bg-[#170932] border border-rose-500/40 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-rose-500/20 text-rose-400 font-cinzel font-bold text-sm sm:text-base">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{isHi ? 'अशुभ मुहूर्त / वर्जित समय' : 'Ashubh Muhurat (Inauspicious)'}</span>
              </div>
              <div className="space-y-3">
                {p.ashubhMuhurat.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs sm:text-sm">
                    <div className="flex items-center justify-between font-bold text-slate-200">
                      <span>{isHi ? (m.nameHi || m.name) : m.name}</span>
                      <span className="text-rose-400 font-mono text-xs sm:text-sm">{m.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      {isHi ? (m.descHi || m.desc) : m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Disha Shool & Travel Guidance */}
          <div className="bg-[#1a0a38] border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <Compass className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <strong className="text-amber-300 text-sm sm:text-base">
                  {isHi ? `दिशा शूल: ${p.dishaShoolHi || p.dishaShool}` : `Disha Shool: ${p.dishaShool}`}
                </strong>
                <p className="text-slate-200 mt-0.5 text-xs sm:text-sm">
                  {isHi ? `निवारक उपाय: ${p.remedyHi || p.remedy}` : p.remedy}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-800/60 bg-[#160731] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm uppercase cursor-pointer"
          >
            {isHi ? 'पंचांग बंद करें' : 'Close Panchang'}
          </button>
        </div>

      </div>
    </div>
  );
}

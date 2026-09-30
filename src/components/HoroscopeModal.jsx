import React from 'react';
import { X, Heart, Briefcase, Activity, Sparkles } from 'lucide-react';

export default function HoroscopeModal({ sign, onClose, onOpenConsultation, lang }) {
  if (!sign) return null;

  const isHi = lang === 'hi';

  const displayName = isHi ? `${sign.nameHi || sign.sanskrit} (${sign.sanskritHi || sign.sanskrit})` : `${sign.name} (${sign.sanskrit})`;
  const displayElement = isHi ? (sign.elementHi || `${sign.element} तत्व`) : `${sign.element} Element`;
  const displayDates = isHi ? (sign.datesHi || sign.dates) : sign.dates;
  const displayRuler = isHi ? `स्वामी: ${sign.rulerHi || sign.ruler}` : `Ruled by ${sign.ruler}`;
  const displayWeeklyTheme = isHi ? (sign.weeklyThemeHi || sign.weeklyTheme) : sign.weeklyTheme;
  const displayForecast = isHi ? (sign.weeklyHi || sign.weekly || sign.todayHi || sign.today) : (sign.weekly || sign.today);
  const displayLove = isHi ? (sign.loveHi || sign.love) : sign.love;
  const displayCareer = isHi ? (sign.careerHi || sign.career) : sign.career;
  const displayHealth = isHi ? (sign.healthHi || sign.health) : sign.health;
  const displayLuckyDay = isHi ? (sign.luckyDayHi || sign.luckyDay) : (sign.luckyDay || 'Wednesday');
  const displayColor = isHi ? (sign.colorHi || sign.color) : sign.color;
  const displayCompatible = isHi ? (sign.compatibleHi || sign.compatible) : sign.compatible;

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
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300">
                  {displayName}
                </h2>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-purple-900/80 text-purple-200 border border-purple-600">
                  {displayElement}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {displayDates} • {displayRuler}
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

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Weekly Badge & Theme */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-purple-900/40 to-amber-500/10 border border-amber-500/40 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 uppercase tracking-wider shadow-gold-glow">
                {isHi ? 'साप्ताहिक राशिफल' : 'Weekly Horoscope'}
              </span>
              <span className="text-xs sm:text-sm text-amber-200/90 font-medium">
                {displayDates}
              </span>
            </div>
            {displayWeeklyTheme && (
              <span className="text-xs sm:text-sm text-amber-300 font-semibold italic">
                ✦ {displayWeeklyTheme}
              </span>
            )}
          </div>

          {/* Main Weekly Forecast */}
          <div className="bg-[#1b0a38] border border-amber-500/30 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs sm:text-sm uppercase tracking-wider text-amber-400 font-semibold mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{isHi ? 'साप्ताहिक वैदिक ग्रह गोचर फल' : 'Weekly Celestial Vedic Forecast'}</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {displayForecast}
            </p>
          </div>

          {/* 3 Categories: Weekly Love, Career, Health */}
          <div className="space-y-3.5">
            
            {/* Weekly Love */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#170932] border border-pink-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-pink-400 font-bold text-xs sm:text-sm">
                  <Heart className="w-4 h-4 fill-current shrink-0" />
                  <span>{isHi ? 'साप्ताहिक प्रेम एवं वैवाहिक संबंध' : 'Weekly Love & Relationship Outlook'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-16 bg-black/40 rounded-full h-2 overflow-hidden">
                    <div className="bg-pink-400 h-full rounded-full" style={{ width: `${sign.loveScore}%` }} />
                  </div>
                  <span className="text-xs font-mono text-pink-300 font-bold">{sign.loveScore}%</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{displayLove}</p>
            </div>

            {/* Weekly Career */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#170932] border border-amber-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm">
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span>{isHi ? 'साप्ताहिक करियर, व्यवसाय एवं धन' : 'Weekly Career, Business & Wealth'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-16 bg-black/40 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${sign.careerScore}%` }} />
                  </div>
                  <span className="text-xs font-mono text-amber-300 font-bold">{sign.careerScore}%</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{displayCareer}</p>
            </div>

            {/* Weekly Health */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#170932] border border-emerald-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                  <Activity className="w-4 h-4 shrink-0" />
                  <span>{isHi ? 'साप्ताहिक स्वास्थ्य, ऊर्जा एवं जीवन शक्ति' : 'Weekly Health, Energy & Vitality'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-16 bg-black/40 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${sign.healthScore}%` }} />
                  </div>
                  <span className="text-xs font-mono text-emerald-300 font-bold">{sign.healthScore}%</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{displayHealth}</p>
            </div>

          </div>

          {/* Lucky Attributes Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#1b0a38] border border-purple-800/60 p-3 rounded-xl text-center">
              <span className="text-slate-400 block text-xs mb-0.5">{isHi ? 'शुभ दिन' : 'Lucky Day'}</span>
              <strong className="text-amber-300 text-sm font-bold">{displayLuckyDay}</strong>
            </div>
            <div className="bg-[#1b0a38] border border-purple-800/60 p-3 rounded-xl text-center">
              <span className="text-slate-400 block text-xs mb-0.5">{isHi ? 'शुभ अंक' : 'Lucky Number'}</span>
              <strong className="text-amber-300 text-sm sm:text-base font-bold">{sign.number}</strong>
            </div>
            <div className="bg-[#1b0a38] border border-purple-800/60 p-3 rounded-xl text-center">
              <span className="text-slate-400 block text-xs mb-0.5">{isHi ? 'शुभ रंग' : 'Lucky Color'}</span>
              <strong className="text-amber-300 text-xs sm:text-sm font-bold">{displayColor}</strong>
            </div>
            <div className="bg-[#1b0a38] border border-purple-800/60 p-3 rounded-xl text-center">
              <span className="text-slate-400 block text-xs mb-0.5">{isHi ? 'अनुकूल राशियां' : 'Compatible Signs'}</span>
              <strong className="text-amber-300 text-xs sm:text-sm font-bold">{displayCompatible}</strong>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-800/60 bg-[#160731] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              const topic = isHi 
                ? `${sign.nameHi || sign.sanskrit} व्यक्तिगत ज्योतिषीय परामर्श`
                : `${sign.name} Personalized Astrology Reading`;
              onOpenConsultation(topic);
            }}
            className="gold-btn px-5 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase cursor-pointer"
          >
            {isHi ? 'ज्योतिषी से बात करें' : 'Talk to Astrologer'}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-cosmic-800 text-slate-300 text-xs sm:text-sm font-semibold hover:text-white cursor-pointer"
          >
            {isHi ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}

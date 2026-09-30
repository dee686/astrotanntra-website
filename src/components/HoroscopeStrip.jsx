import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HOROSCOPE_DATA } from '../data/horoscopeData';

const ZODIAC_HI = {
  aries: 'मेष',
  taurus: 'वृषभ',
  gemini: 'मिथुन',
  cancer: 'कर्क',
  leo: 'सिंह',
  virgo: 'कन्या',
  libra: 'तुला',
  scorpio: 'वृश्चिक',
  sagittarius: 'धनु',
  capricorn: 'मकर',
  aquarius: 'कुम्भ',
  pisces: 'मीन'
};

export default function HoroscopeStrip({ onSelectSign, lang }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getSignBg = (id) => {
    switch(id) {
      case 'aries': return 'bg-red-50 text-red-600 border-red-300';
      case 'taurus': return 'bg-amber-50 text-amber-600 border-amber-300';
      case 'gemini': return 'bg-yellow-50 text-yellow-600 border-yellow-300';
      case 'cancer': return 'bg-lime-50 text-lime-600 border-lime-300';
      case 'leo': return 'bg-orange-50 text-orange-600 border-orange-300';
      case 'virgo': return 'bg-emerald-50 text-emerald-600 border-emerald-300';
      case 'libra': return 'bg-teal-50 text-teal-600 border-teal-300';
      case 'scorpio': return 'bg-cyan-50 text-cyan-600 border-cyan-300';
      case 'sagittarius': return 'bg-sky-50 text-sky-600 border-sky-300';
      case 'capricorn': return 'bg-indigo-50 text-indigo-600 border-indigo-300';
      case 'aquarius': return 'bg-purple-50 text-purple-600 border-purple-300';
      case 'pisces': return 'bg-rose-50 text-rose-600 border-rose-300';
      default: return 'bg-amber-50 text-amber-600 border-amber-300';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-5 relative z-20">
      <div className="bg-[#fef9f0] text-slate-900 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-amber-400/60 p-4 md:p-5">
        
        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] w-12 sm:w-24 bg-amber-600/40" />
          <h3 className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-[#4a154b] uppercase text-center">
            {lang === 'hi' ? 'आज का दैनिक राशिफल' : "TODAY'S HOROSCOPE"}
          </h3>
          <div className="h-[1px] w-12 sm:w-24 bg-amber-600/40" />
        </div>

        {/* Carousel Container: Full width, evenly distributed */}
        <div className="flex items-center justify-between w-full">
          
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-white shadow-sm border border-amber-300/80 text-amber-800 flex items-center justify-center shrink-0 hover:bg-amber-50 hover:scale-110 transition-all cursor-pointer mr-1 sm:mr-2"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Signs List: Distributed evenly across the full width */}
          <div
            ref={scrollRef}
            className="flex-1 flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto lg:overflow-x-visible scrollbar-none py-1 scroll-smooth w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {HOROSCOPE_DATA.map((sign) => {
              const styleClass = getSignBg(sign.id);
              const displayName = lang === 'hi' ? (ZODIAC_HI[sign.id] || sign.sanskrit) : sign.name;
              const subName = lang === 'hi' ? sign.name : sign.sanskrit;
              return (
                <button
                  key={sign.id}
                  onClick={() => onSelectSign(sign)}
                  className="flex-1 min-w-[70px] lg:min-w-0 flex flex-col items-center justify-center group transition-transform duration-200 hover:-translate-y-1 focus:outline-none cursor-pointer py-1 px-0.5 text-center"
                >
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 rounded-full border-2 flex items-center justify-center text-lg sm:text-xl shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all ${styleClass}`}>
                    <span className="font-serif drop-shadow-sm select-none">{sign.symbol}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 mt-1.5 tracking-tight group-hover:text-amber-800 transition-colors whitespace-nowrap">
                    {displayName}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 font-medium whitespace-nowrap leading-none mt-0.5">
                    {subName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-white shadow-sm border border-amber-300/80 text-amber-800 flex items-center justify-center shrink-0 hover:bg-amber-50 hover:scale-110 transition-all cursor-pointer ml-1 sm:ml-2"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
}

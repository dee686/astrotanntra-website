import React from 'react';
import { Calendar, Compass, Sparkles, Moon, ChevronRight, Sun, Shield } from 'lucide-react';
import { TODAY_PANCHANG } from '../data/panchangData';

export default function PanchangStrip({ onOpenPanchang, lang }) {
  const p = TODAY_PANCHANG;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-30">
      
      {/* Light Parchment Card matching the screenshot */}
      <div className="bg-[#fef9f0] text-slate-900 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.5)] border border-amber-400/60 p-4 md:p-5 transition-all">
        
        {/* Header Title */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] w-12 sm:w-24 bg-amber-600/40" />
          <h3 className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-[#4a154b] uppercase text-center">
            {lang === 'hi' ? 'आज का पंचांग विवरण' : "TODAY'S ASTROLOGY INFORMATION"}
          </h3>
          <div className="h-[1px] w-12 sm:w-24 bg-amber-600/40" />
        </div>

        {/* Content Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
          
          {/* Date */}
          <div className="flex items-center gap-3 border-r border-amber-200/80 pr-2">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-slate-900">{p.dateFormatted}</span>
              <span className="text-xs text-slate-700 font-medium">
                {lang === 'hi' ? (p.dayName === 'Monday' ? 'सोमवार' : p.dayName) : p.dayName}
              </span>
            </div>
          </div>

          {/* Nakshatra */}
          <div className="flex items-center gap-3 border-r border-amber-200/80 pr-2">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold">
                {lang === 'hi' ? 'नक्षत्र' : 'Nakshatra'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                {lang === 'hi' ? 'स्वाति (तृतीय चरण)' : p.nakshatra}
              </span>
            </div>
          </div>

          {/* Yoga */}
          <div className="flex items-center gap-3 border-r border-amber-200/80 pr-2">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold">
                {lang === 'hi' ? 'योग' : 'Yoga'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                {lang === 'hi' ? 'प्रीति योग' : p.yoga}
              </span>
            </div>
          </div>

          {/* Karana */}
          <div className="flex items-center gap-3 border-r border-amber-200/80 pr-2">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold">
                {lang === 'hi' ? 'करण' : 'Karana'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                {lang === 'hi' ? 'बालव करण' : p.karana}
              </span>
            </div>
          </div>

          {/* Moon Sign */}
          <div className="flex items-center gap-3 md:border-r border-amber-200/80 pr-2">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Moon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold">
                {lang === 'hi' ? 'चन्द्र राशि' : 'Moon Sign'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                {lang === 'hi' ? 'धनु राशि' : 'Sagittarius'}
              </span>
            </div>
          </div>

          {/* CTA Button: VIEW FULL PANCHANG > */}
          <div className="col-span-2 md:col-span-1 flex justify-center md:justify-end">
            <button
              onClick={onOpenPanchang}
              className="w-full md:w-auto bg-[#4e1b76] hover:bg-[#3b125a] text-amber-200 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>{lang === 'hi' ? 'संपूर्ण पंचांग' : 'VIEW FULL PANCHANG'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

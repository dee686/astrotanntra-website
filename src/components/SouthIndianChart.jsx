import React from 'react';
import { ZODIAC_SIGNS } from '../utils/vedicCalculations';

// South Indian Style Square Grid Chart
export default function SouthIndianChart({ planets, ascendant, chartTitle = 'Rasi Kundli (South Indian)' }) {
  // In South Indian Chart, signs have fixed positions:
  // Row 1: Pisces (12), Aries (1), Taurus (2), Gemini (3)
  // Row 2: Aquarius (11), [Courtyard], Cancer (4)
  // Row 3: Capricorn (10), [Courtyard], Leo (5)
  // Row 4: Sagittarius (9), Scorpio (8), Libra (7), Virgo (6)

  const signGrid = [
    { id: 12, row: 0, col: 0 },
    { id: 1,  row: 0, col: 1 },
    { id: 2,  row: 0, col: 2 },
    { id: 3,  row: 0, col: 3 },
    { id: 11, row: 1, col: 0 },
    { id: 4,  row: 1, col: 3 },
    { id: 10, row: 2, col: 0 },
    { id: 5,  row: 2, col: 3 },
    { id: 9,  row: 3, col: 0 },
    { id: 8,  row: 3, col: 1 },
    { id: 7,  row: 3, col: 2 },
    { id: 6,  row: 3, col: 3 }
  ];

  const ascName = typeof ascendant === 'string' ? ascendant : (ascendant?.name || ascendant?.sign || 'Aries');

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-cosmic-950/70 rounded-2xl border border-astroGold-500/30 shadow-mystic w-full max-w-[400px]">
      <div className="text-xs uppercase tracking-widest text-astroGold-400 font-cinzel mb-2 font-semibold text-center">
        {chartTitle}
      </div>

      <div className="relative w-full max-w-[380px] aspect-square grid grid-cols-4 grid-rows-4 gap-1 p-2 bg-cosmic-900 rounded-xl border border-amber-500/30">
        {/* Render 16 cells (12 signs + 4 central courtyard) */}
        {Array.from({ length: 16 }).map((_, idx) => {
          const row = Math.floor(idx / 4);
          const col = idx % 4;

          // Central courtyard (row 1,2 and col 1,2)
          if ((row === 1 || row === 2) && (col === 1 || col === 2)) {
            if (row === 1 && col === 1) {
              return (
                <div key={idx} className="col-span-2 row-span-2 flex flex-col items-center justify-center bg-cosmic-950/90 rounded-lg border border-amber-500/20 p-2 text-center select-none">
                  <span className="text-amber-300 font-cinzel font-bold text-xs sm:text-sm">ASTROTANNTRA</span>
                  <span className="text-[9px] text-amber-200/60 uppercase tracking-widest mt-1">Lagna: {ascName}</span>
                </div>
              );
            }
            return null;
          }

          const cellSign = signGrid.find(s => s.row === row && s.col === col);
          if (!cellSign) return <div key={idx} />;

          const signInfo = ZODIAC_SIGNS[cellSign.id - 1];
          const isLagna = ascName === signInfo.name;
          const occupants = planets?.filter(p => p.signIndex === cellSign.id) || [];

          return (
            <div
              key={idx}
              className={`relative flex flex-col p-1.5 rounded-lg border text-xs transition-all ${
                isLagna
                  ? 'bg-amber-950/40 border-amber-400 shadow-gold-glow'
                  : 'bg-cosmic-800/60 border-purple-800/40 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-amber-300/80 font-semibold mb-1">
                <span>{signInfo.sanskrit}</span>
                <span className="text-slate-400">{signInfo.symbol}</span>
              </div>

              {isLagna && (
                <span className="inline-block px-1 py-0.2 text-[9px] font-bold text-amber-900 bg-amber-400 rounded w-fit mb-1">
                  ASC
                </span>
              )}

              <div className="flex flex-wrap gap-1 mt-auto">
                {occupants.map(p => (
                  <span
                    key={p.code}
                    className={`text-[10px] font-bold px-1 rounded bg-black/40 ${
                      p.code === 'Asc' ? 'text-amber-300' :
                      p.code === 'Su' ? 'text-yellow-400' :
                      p.code === 'Mo' ? 'text-sky-200' :
                      p.code === 'Ma' ? 'text-rose-400' :
                      p.code === 'Me' ? 'text-emerald-400' :
                      p.code === 'Ju' ? 'text-amber-200' :
                      p.code === 'Ve' ? 'text-pink-300' :
                      p.code === 'Sa' ? 'text-indigo-300' :
                      'text-purple-300'
                    }`}
                  >
                    {p.code}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

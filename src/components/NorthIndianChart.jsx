import React from 'react';

// North Indian Style Vedic Diamond Kundli Chart
export default function NorthIndianChart({ houseOccupants, activeHouse, onSelectHouse, chartTitle = 'Lagna Kundli (North Indian Chart)' }) {
  if (!houseOccupants) return null;

  // Planet color mapping for clear Vedic visualization
  const planetColors = {
    Su: 'text-amber-400 font-bold',
    Mo: 'text-sky-200 font-bold',
    Ma: 'text-rose-400 font-bold',
    Me: 'text-emerald-400 font-bold',
    Ju: 'text-yellow-300 font-bold',
    Ve: 'text-pink-300 font-bold',
    Sa: 'text-indigo-300 font-bold',
    Ra: 'text-purple-400 font-semibold',
    Ke: 'text-stone-300 font-semibold',
    Asc: 'text-astroGold-400 font-extrabold underline',
    Jala: 'text-sky-300 font-bold',
    Agni: 'text-rose-400 font-bold',
    Vayu: 'text-indigo-300 font-bold',
    Akash: 'text-amber-300 font-bold',
    Prithvi: 'text-emerald-300 font-bold'
  };

  // House positions for coordinates in a 400x400 SVG
  const houseCenters = {
    1: { cx: 200, cy: 110, rashiX: 200, rashiY: 65 },
    2: { cx: 100, cy: 60, rashiX: 135, rashiY: 35 },
    3: { cx: 55, cy: 105, rashiX: 30, rashiY: 135 },
    4: { cx: 110, cy: 200, rashiX: 65, rashiY: 200 },
    5: { cx: 55, cy: 295, rashiX: 30, rashiY: 265 },
    6: { cx: 100, cy: 340, rashiX: 135, rashiY: 365 },
    7: { cx: 200, cy: 290, rashiX: 200, rashiY: 335 },
    8: { cx: 300, cy: 340, rashiX: 265, rashiY: 365 },
    9: { cx: 345, cy: 295, rashiX: 370, rashiY: 265 },
    10: { cx: 290, cy: 200, rashiX: 335, rashiY: 200 },
    11: { cx: 345, cy: 105, rashiX: 370, rashiY: 135 },
    12: { cx: 300, cy: 60, rashiX: 265, rashiY: 35 }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-3 bg-cosmic-950/70 rounded-2xl border border-astroGold-500/30 shadow-mystic w-full max-w-[400px]">
      <div className="text-xs uppercase tracking-widest text-astroGold-400 font-cinzel mb-2 font-semibold text-center">
        {chartTitle}
      </div>

      <div className="relative w-full max-w-[380px] aspect-square">
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="chartBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e0b3c" />
              <stop offset="50%" stopColor="#120524" />
              <stop offset="100%" stopColor="#0d031b" />
            </linearGradient>
            <linearGradient id="goldBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Chart Background Box */}
          <rect x="10" y="10" width="380" height="380" fill="url(#chartBgGrad)" stroke="url(#goldBorderGrad)" strokeWidth="3" rx="8" />

          {/* Main Diamond connecting midpoints: (200,10), (10,200), (200,390), (390,200) */}
          <polygon points="200,10 10,200 200,390 390,200" fill="none" stroke="#ca8a04" strokeWidth="2" strokeDasharray="none" />

          {/* Diagonals from corners: (10,10) to (390,390) and (10,390) to (390,10) */}
          <line x1="10" y1="10" x2="390" y2="390" stroke="#ca8a04" strokeWidth="2" />
          <line x1="10" y1="390" x2="390" y2="10" stroke="#ca8a04" strokeWidth="2" />

          {/* Inner details & house lines */}
          <line x1="10" y1="10" x2="200" y2="200" stroke="#eab308" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="390" y1="10" x2="200" y2="200" stroke="#eab308" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="10" y1="390" x2="200" y2="200" stroke="#eab308" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="390" y1="390" x2="200" y2="200" stroke="#eab308" strokeWidth="1" strokeOpacity="0.6" />

          {/* House Clickable Hit Areas & Rashi Numbers */}
          {Object.entries(houseCenters).map(([hNum, pos]) => {
            const h = parseInt(hNum, 10);
            const occ = houseOccupants[h];
            if (!occ) return null;
            const isSelected = activeHouse === h;

            return (
              <g key={h} className="cursor-pointer group" onClick={() => onSelectHouse && onSelectHouse(h)}>
                {/* Rashi / Sign number indicator */}
                <text
                  x={pos.rashiX}
                  y={pos.rashiY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-astroGold-400 font-bold text-[13px] select-none"
                >
                  {occ.signNum}
                </text>

                {/* House Number badge (subtle) */}
                <text
                  x={pos.cx}
                  y={pos.cy - 14}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-purple-300/40 text-[9px] select-none font-sans"
                >
                  H{h}
                </text>

                {/* Planets placed in this house */}
                {occ.planets && occ.planets.length > 0 ? (
                  <g>
                    {occ.planets.map((p, pIdx) => {
                      const offsetCount = occ.planets.length;
                      let yOff = 0;
                      let xOff = 0;
                      if (offsetCount === 1) {
                        yOff = 4;
                      } else if (offsetCount === 2) {
                        xOff = (pIdx === 0 ? -16 : 16);
                        yOff = 4;
                      } else {
                        xOff = (pIdx % 2 === 0 ? -16 : 16);
                        yOff = Math.floor(pIdx / 2) * 14;
                      }

                      return (
                        <text
                          key={p.code}
                          x={pos.cx + xOff}
                          y={pos.cy + yOff}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className={`text-[12px] font-bold select-none drop-shadow ${
                            p.code === 'Asc' ? 'fill-amber-300 font-extrabold' :
                            p.code === 'Su' ? 'fill-yellow-400' :
                            p.code === 'Mo' ? 'fill-sky-200' :
                            p.code === 'Ma' ? 'fill-rose-400' :
                            p.code === 'Me' ? 'fill-emerald-400' :
                            p.code === 'Ju' ? 'fill-amber-200' :
                            p.code === 'Ve' ? 'fill-pink-300' :
                            p.code === 'Sa' ? 'fill-indigo-300' :
                            'fill-purple-300'
                          }`}
                        >
                          {p.code}
                          {p.isRetro && p.name !== 'Rahu' && p.name !== 'Ketu' ? <tspan className="text-[8px] fill-rose-300">®</tspan> : null}
                        </text>
                      );
                    })}
                  </g>
                ) : (
                  <text
                    x={pos.cx}
                    y={pos.cy + 4}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-slate-600/40 text-[10px] select-none"
                  >
                    —
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-[11px] text-slate-300">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Su: Sun</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-200"></span> Mo: Moon</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400"></span> Ma: Mars</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Me: Merc</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-300"></span> Ju: Jup</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-300"></span> Ve: Ven</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-300"></span> Sa: Sat</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Ra/Ke: Nodes</span>
      </div>
    </div>
  );
}

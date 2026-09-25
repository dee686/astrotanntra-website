import React from 'react';

// North Indian Vedic Diamond Kundli Chart
// Implements exact AstroSage geometry, planetary positions, degree superscripts,
// and dual-language (Hindi, English, or Both) support.
export default function NorthIndianChart({
  houseOccupants,
  activeHouse,
  onSelectHouse,
  chartTitle = 'Lagna Chart',
  chartLang = 'en', // 'en' | 'hi' | 'both'
  showDegrees = true,
  theme = 'astrosage' // 'astrosage' (classic clean) | 'cosmic' (dark gold)
}) {
  if (!houseOccupants) return null;

  // Language mapping for planet codes
  const planetLabels = {
    Asc: { en: 'Asc', hi: 'लग्न', both: 'Asc/लग्न' },
    Su: { en: 'Su', hi: 'सू', both: 'Su/सू' },
    Mo: { en: 'Mo', hi: 'चं', both: 'Mo/चं' },
    Ma: { en: 'Ma', hi: 'मं', both: 'Ma/मं' },
    Me: { en: 'Me', hi: 'बु', both: 'Me/बु' },
    Ju: { en: 'Ju', hi: 'गु', both: 'Ju/गु' },
    Ve: { en: 'Ve', hi: 'शु', both: 'Ve/शु' },
    Sa: { en: 'Sa', hi: 'श', both: 'Sa/श' },
    Ra: { en: 'Ra', hi: 'रा', both: 'Ra/रा' },
    Ke: { en: 'Ke', hi: 'के', both: 'Ke/के' },
    Ur: { en: 'Ur', hi: 'यू', both: 'Ur/यू' },
    Ne: { en: 'Ne', hi: 'ने', both: 'Ne/ने' },
    Pl: { en: 'Pl', hi: 'प्ल', both: 'Pl/प्ल' },
    // Element codes
    Jala: { en: 'Jala', hi: 'जल', both: 'Jala/जल' },
    Agni: { en: 'Agni', hi: 'अग्नि', both: 'Agni/अग्नि' },
    Vayu: { en: 'Vayu', hi: 'वायु', both: 'Vayu/वायु' },
    Akash: { en: 'Akash', hi: 'आकाश', both: 'Akash/आकाश' },
    Prithvi: { en: 'Prithvi', hi: 'पृथ्वी', both: 'Prithvi/पृथ्वी' }
  };

  // Convert digits to Devanagari if Hindi is selected
  const toHindiDigits = (numStr) => {
    const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return String(numStr).replace(/[0-9]/g, d => devanagariDigits[d]);
  };

  // Planet color map matching AstroSage
  const getPlanetColor = (code) => {
    switch (code) {
      case 'Su': return '#ea580c'; // Red-orange
      case 'Mo': return '#0284c7'; // Soft sky blue
      case 'Ma': return '#16a34a'; // Emerald green
      case 'Me': return '#0284c7'; // Cerulean
      case 'Ju': return '#9333ea'; // Purple
      case 'Ve': return '#15803d'; // Green
      case 'Sa': return '#b91c1c'; // Dark red
      case 'Ra': return '#991b1b'; // Dark maroon red
      case 'Ke': return '#b45309'; // Ochre red
      case 'Ur': return '#dc2626'; // Red
      case 'Ne': return '#312e81'; // Deep indigo
      case 'Pl': return theme === 'astrosage' ? '#0f172a' : '#f87171'; // Dark slate or coral
      case 'Asc': return '#d97706'; // Gold
      default: return '#ca8a04';
    }
  };

  // Exact Rashi number positions positioned deep inside each shape away from borders
  const rashiPositions = {
    1: { x: 200, y: 168 },  // Deep inside House 1 (Top Diamond)
    2: { x: 112, y: 78 },   // Deep inside House 2 (Top-Left Triangle)
    3: { x: 78, y: 112 },   // Deep inside House 3 (Left-Upper Triangle)
    4: { x: 168, y: 200 },  // Deep inside House 4 (Left Diamond)
    5: { x: 78, y: 288 },   // Deep inside House 5 (Left-Lower Triangle)
    6: { x: 112, y: 322 },  // Deep inside House 6 (Bottom-Left Triangle)
    7: { x: 200, y: 232 },  // Deep inside House 7 (Bottom Diamond)
    8: { x: 288, y: 322 },  // Deep inside House 8 (Bottom-Right Triangle)
    9: { x: 322, y: 288 },  // Deep inside House 9 (Right-Lower Triangle)
    10: { x: 232, y: 200 }, // Deep inside House 10 (Right Diamond)
    11: { x: 322, y: 112 }, // Deep inside House 11 (Right-Upper Triangle)
    12: { x: 288, y: 78 }   // Deep inside House 12 (Top-Right Triangle)
  };

  // Smart planet coordinate layout per house
  const getPlanetPositions = (houseNum, count) => {
    switch (houseNum) {
      case 1: // Top Diamond
        if (count === 1) return [{ x: 200, y: 95 }];
        if (count === 2) return [{ x: 200, y: 82 }, { x: 200, y: 112 }];
        if (count === 3) return [{ x: 200, y: 72 }, { x: 200, y: 98 }, { x: 200, y: 124 }];
        return [{ x: 175, y: 85 }, { x: 225, y: 85 }, { x: 175, y: 115 }, { x: 225, y: 115 }];

      case 2: // Top-Left Triangle
        if (count === 1) return [{ x: 95, y: 48 }];
        if (count === 2) return [{ x: 75, y: 42 }, { x: 120, y: 42 }];
        if (count === 3) return [{ x: 68, y: 35 }, { x: 122, y: 35 }, { x: 95, y: 58 }];
        return [{ x: 65, y: 34 }, { x: 110, y: 34 }, { x: 65, y: 55 }, { x: 110, y: 55 }];

      case 3: // Left-Upper Triangle
        if (count === 1) return [{ x: 50, y: 98 }];
        if (count === 2) return [{ x: 50, y: 80 }, { x: 50, y: 116 }];
        if (count === 3) return [{ x: 42, y: 72 }, { x: 68, y: 98 }, { x: 42, y: 122 }];
        return [{ x: 36, y: 78 }, { x: 68, y: 78 }, { x: 36, y: 112 }, { x: 68, y: 112 }];

      case 4: // Left Diamond
        if (count === 1) return [{ x: 98, y: 200 }];
        if (count === 2) return [{ x: 98, y: 185 }, { x: 98, y: 215 }];
        if (count === 3) return [{ x: 98, y: 172 }, { x: 98, y: 200 }, { x: 98, y: 228 }];
        return [{ x: 78, y: 188 }, { x: 118, y: 188 }, { x: 78, y: 212 }, { x: 118, y: 212 }];

      case 5: // Left-Lower Triangle
        if (count === 1) return [{ x: 50, y: 300 }];
        if (count === 2) return [{ x: 50, y: 285 }, { x: 50, y: 315 }];
        if (count === 3) return [{ x: 42, y: 278 }, { x: 68, y: 302 }, { x: 42, y: 325 }];
        return [{ x: 36, y: 288 }, { x: 68, y: 288 }, { x: 36, y: 318 }, { x: 68, y: 318 }];

      case 6: // Bottom-Left Triangle
        if (count === 1) return [{ x: 95, y: 350 }];
        if (count === 2) return [{ x: 75, y: 355 }, { x: 120, y: 355 }];
        if (count === 3) return [{ x: 95, y: 340 }, { x: 70, y: 365 }, { x: 122, y: 365 }];
        return [{ x: 65, y: 344 }, { x: 110, y: 344 }, { x: 65, y: 366 }, { x: 110, y: 366 }];

      case 7: // Bottom Diamond
        if (count === 1) return [{ x: 200, y: 300 }];
        if (count === 2) return [{ x: 200, y: 285 }, { x: 200, y: 315 }];
        if (count === 3) return [{ x: 200, y: 272 }, { x: 200, y: 300 }, { x: 200, y: 328 }];
        return [{ x: 175, y: 288 }, { x: 225, y: 288 }, { x: 175, y: 312 }, { x: 225, y: 312 }];

      case 8: // Bottom-Right Triangle
        if (count === 1) return [{ x: 305, y: 350 }];
        if (count === 2) return [{ x: 280, y: 355 }, { x: 328, y: 355 }];
        if (count === 3) return [{ x: 305, y: 340 }, { x: 278, y: 365 }, { x: 330, y: 365 }];
        return [{ x: 285, y: 344 }, { x: 330, y: 344 }, { x: 285, y: 366 }, { x: 330, y: 366 }];

      case 9: // Right-Lower Triangle
        if (count === 1) return [{ x: 350, y: 300 }];
        if (count === 2) return [{ x: 350, y: 285 }, { x: 350, y: 315 }];
        if (count === 3) return [{ x: 350, y: 275 }, { x: 350, y: 298 }, { x: 350, y: 322 }];
        return [{ x: 332, y: 288 }, { x: 368, y: 288 }, { x: 332, y: 318 }, { x: 368, y: 318 }];

      case 10: // Right Diamond
        if (count === 1) return [{ x: 300, y: 200 }];
        if (count === 2) return [{ x: 300, y: 185 }, { x: 300, y: 215 }];
        if (count === 3) return [{ x: 300, y: 172 }, { x: 300, y: 200 }, { x: 300, y: 228 }];
        return [{ x: 280, y: 188 }, { x: 320, y: 188 }, { x: 280, y: 212 }, { x: 320, y: 212 }];

      case 11: // Right-Upper Triangle
        if (count === 1) return [{ x: 350, y: 100 }];
        if (count === 2) return [{ x: 350, y: 88 }, { x: 350, y: 116 }];
        if (count === 3) return [{ x: 350, y: 75 }, { x: 350, y: 100 }, { x: 350, y: 125 }];
        return [{ x: 332, y: 82 }, { x: 368, y: 82 }, { x: 332, y: 112 }, { x: 368, y: 112 }];

      case 12: // Top-Right Triangle
        if (count === 1) return [{ x: 305, y: 48 }];
        if (count === 2) return [{ x: 278, y: 38 }, { x: 328, y: 38 }];
        if (count === 3) return [{ x: 255, y: 34 }, { x: 292, y: 52 }, { x: 328, y: 34 }];
        return [{ x: 278, y: 34 }, { x: 325, y: 34 }, { x: 278, y: 56 }, { x: 325, y: 56 }];

      default:
        return [{ x: 200, y: 200 }];
    }
  };

  const isAstrosage = theme === 'astrosage';
  const strokeColor = isAstrosage ? '#f97316' : '#f59e0b';
  const rashiColor = isAstrosage ? '#2563eb' : '#fbbf24';

  return (
    <div className={`relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-300 w-full max-w-[420px] ${
      isAstrosage
        ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-amber-500/40 text-slate-800'
        : 'bg-[#12062b] shadow-mystic border-amber-500/40 text-slate-100'
    }`}>
      {/* Title Header */}
      <div className={`text-xs uppercase tracking-widest font-cinzel mb-2 font-bold text-center flex items-center justify-center gap-1.5 ${
        isAstrosage ? 'text-amber-800' : 'text-amber-300'
      }`}>
        <span>{chartTitle}</span>
      </div>

      <div className="relative w-full aspect-square max-w-[380px]">
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-sm select-none">
          {/* Chart Background Canvas */}
          <rect
            x="10"
            y="10"
            width="380"
            height="380"
            fill={isAstrosage ? '#fffcf7' : '#140830'}
            stroke={strokeColor}
            strokeWidth="2.5"
            rx="4"
          />

          {/* Main Diamond connecting midpoints: (200,10), (10,200), (200,390), (390,200) */}
          <polygon
            points="200,10 10,200 200,390 390,200"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.8"
          />

          {/* Diagonals from corners: (10,10) to (390,390) and (10,390) to (390,10) */}
          <line x1="10" y1="10" x2="390" y2="390" stroke={strokeColor} strokeWidth="1.8" />
          <line x1="10" y1="390" x2="390" y2="10" stroke={strokeColor} strokeWidth="1.8" />

          {/* 12 Houses: Rashi Numbers & Occupant Planets */}
          {Object.entries(houseOccupants).map(([hStr, occ]) => {
            const h = parseInt(hStr, 10);
            if (!occ) return null;

            const isSelected = activeHouse === h;
            const rPos = rashiPositions[h] || { x: 200, y: 200 };
            const planets = occ.planets || [];
            const pPositions = getPlanetPositions(h, planets.length);

            // Displayed Rashi digit
            const rashiDisplay = (chartLang === 'hi')
              ? toHindiDigits(occ.signNum)
              : occ.signNum;

            return (
              <g
                key={h}
                className={onSelectHouse ? "cursor-pointer" : ""}
                onClick={() => onSelectHouse && onSelectHouse(h)}
              >

                {/* Rashi / Zodiac Sign Number Indicator - strictly constant with zero hover movement */}
                <text
                  x={rPos.x}
                  y={rPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="12.5"
                  fontWeight="700"
                  fontFamily="'Cinzel', 'Noto Sans Devanagari', serif, sans-serif"
                  fill={rashiColor}
                  className="pointer-events-none select-none"
                >
                  {rashiDisplay}
                </text>

                {/* Planets placed in this house */}
                {planets.map((p, pIdx) => {
                  const pos = pPositions[pIdx] || { x: 200, y: 200 };
                  const color = getPlanetColor(p.code);

                  // Abbreviation based on selected language
                  let label = p.code;
                  if (chartLang === 'hi') {
                    label = planetLabels[p.code]?.hi || p.codeHi || p.code;
                  } else if (chartLang === 'both') {
                    label = planetLabels[p.code]?.both || `${p.code}/${p.codeHi || ''}`;
                  }

                  // Degree formatting
                  const degVal = p.degInt !== undefined
                    ? String(p.degInt).padStart(2, '0')
                    : (p.degSup || '');
                  const degDisplay = chartLang === 'hi'
                    ? toHindiDigits(degVal)
                    : degVal;

                  return (
                    <text
                      key={`${p.code}-${pIdx}`}
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontFamily="'Cinzel', 'Noto Sans Devanagari', sans-serif"
                      fontSize={chartLang === 'both' ? '10' : '12'}
                      fontWeight="bold"
                      fill={color}
                      className="filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] pointer-events-none select-none"
                    >
                      {label}
                      {/* Red Superscript Degree */}
                      {showDegrees && degDisplay && (
                        <tspan
                          fill="#dc2626"
                          fontSize="8.5"
                          fontWeight="bold"
                          dy="-4"
                          dx="1"
                        >
                          {degDisplay}
                        </tspan>
                      )}
                      {/* Retrograde Asterisk */}
                      {p.isRetro && p.name !== 'Rahu' && p.name !== 'Ketu' && (
                        <tspan
                          fill="#dc2626"
                          fontSize="9"
                          fontWeight="bold"
                          dy="0"
                          dx="0.5"
                        >
                          *
                        </tspan>
                      )}
                      {/* Combust Indicator */}
                      {p.isCombust && (
                        <tspan
                          fill="#b91c1c"
                          fontSize="7"
                          dy="-3"
                          dx="0.5"
                        >
                          (c)
                        </tspan>
                      )}
                    </text>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* AstroSage-style mini legend */}
      <div className={`flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 mt-2.5 text-[10px] font-medium ${
        isAstrosage ? 'text-slate-600' : 'text-slate-300'
      }`}>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
          <span>Su: {chartLang === 'hi' ? 'सूर्य' : 'Sun'}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-sky-500 inline-block"></span>
          <span>Mo: {chartLang === 'hi' ? 'चन्द्र' : 'Moon'}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
          <span>Ma: {chartLang === 'hi' ? 'मंगल' : 'Mars'}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-sky-600 inline-block"></span>
          <span>Me: {chartLang === 'hi' ? 'बुध' : 'Merc'}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-600 inline-block"></span>
          <span>Ju: {chartLang === 'hi' ? 'गुरु' : 'Jup'}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-700 inline-block"></span>
          <span>Ve: {chartLang === 'hi' ? 'शुक्र' : 'Ven'}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-700 inline-block"></span>
          <span>Sa: {chartLang === 'hi' ? 'शनि' : 'Sat'}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-800 inline-block"></span>
          <span>Ra/Ke: {chartLang === 'hi' ? 'राहु/केतु' : 'Nodes'}</span>
        </span>
      </div>
    </div>
  );
}

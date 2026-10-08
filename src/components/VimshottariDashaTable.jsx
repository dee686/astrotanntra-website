import React, { useState, useMemo } from 'react';
import { Clock, ArrowUp, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import {
  calculateAntardashas,
  calculatePratyantardashas,
  calculateSookshmadashas
} from '../utils/dashaCalculations';

/**
 * VimshottariDashaTable
 * Interactive 4-level Vimshottari Dasha drilldown table matching AstroSage 100%.
 * Supports:
 * - Level 1: Mahadasha (MD)
 * - Level 2: Antardasha (AD) -> chain: MD - AD (e.g. Su - Su, Su - Mo)
 * - Level 3: Pratyantardasha (PD) -> chain: MD - AD - PD (e.g. Su - Su - Su)
 * - Level 4: Sookshmadasha (SD) -> chain: MD - AD - PD - SD (e.g. Su - Su - Su - Su)
 * - LEVEL UP button to navigate backwards
 * - Real-time active dasha detection and highlighting
 * - Bilingual English / Hindi support
 */
export default function VimshottariDashaTable({ dashaData, lang = 'en', isHi = false, compact = false }) {
  // Current hierarchy level: 1 = Mahadasha, 2 = Antar, 3 = Pratyantar, 4 = Sookshma
  const [level, setLevel] = useState(1);
  const [selectedMD, setSelectedMD] = useState(null);
  const [selectedAD, setSelectedAD] = useState(null);
  const [selectedPD, setSelectedPD] = useState(null);

  // Level 1: Mahadashas from calculation engine
  const mahadashas = useMemo(() => {
    return dashaData?.timeline || [];
  }, [dashaData]);

  // Level 2: Antardashas of selected Mahadasha
  const antardashas = useMemo(() => {
    if (!selectedMD) return [];
    return calculateAntardashas(selectedMD);
  }, [selectedMD]);

  // Level 3: Pratyantardashas of selected Antardasha
  const pratyantardashas = useMemo(() => {
    if (!selectedAD) return [];
    return calculatePratyantardashas(selectedAD);
  }, [selectedAD]);

  // Level 4: Sookshmadashas of selected Pratyantardasha
  const sookshmadashas = useMemo(() => {
    if (!selectedPD) return [];
    return calculateSookshmadashas(selectedPD);
  }, [selectedPD]);

  // Determine which list to display based on current level
  const currentRows = useMemo(() => {
    if (level === 4) return sookshmadashas;
    if (level === 3) return pratyantardashas;
    if (level === 2) return antardashas;
    return mahadashas;
  }, [level, mahadashas, antardashas, pratyantardashas, sookshmadashas]);

  // Row click handler to drill down
  const handleRowClick = (item) => {
    if (level === 1) {
      setSelectedMD(item);
      setLevel(2);
    } else if (level === 2) {
      setSelectedAD(item);
      setLevel(3);
    } else if (level === 3) {
      setSelectedPD(item);
      setLevel(4);
    }
  };

  // LEVEL UP handler to go up one level
  const handleLevelUp = () => {
    if (level === 4) {
      setLevel(3);
      setSelectedPD(null);
    } else if (level === 3) {
      setLevel(2);
      setSelectedAD(null);
    } else if (level === 2) {
      setLevel(1);
      setSelectedMD(null);
    }
  };

  const levelTitles = {
    1: { en: 'Mahadasha', hi: 'महादशा' },
    2: { en: 'Antar Dasha', hi: 'अंतर्दशा' },
    3: { en: 'Pratyantar Dasha', hi: 'प्रत्यंतर्दशा' },
    4: { en: 'Sookshma Dasha', hi: 'सूक्ष्मदशा' }
  };

  const nextLevelNote = {
    1: isHi ? 'किसी भी पंक्ति पर टैप करके अंतर्दशा देखें' : 'Please tap any row to show Antar Dasha',
    2: isHi ? 'किसी भी पंक्ति पर टैप करके प्रत्यंतर्दशा देखें' : 'Please tap any row to show Pratyantar Dasha',
    3: isHi ? 'किसी भी पंक्ति पर टैप करके सूक्ष्मदशा देखें' : 'Please tap any row to show Sookshma Dasha',
    4: isHi ? 'उच्चतम सूक्ष्म स्तर पर हैं (वापस जाने के लिए LEVEL UP दबाएं)' : 'At deepest micro-level (Tap LEVEL UP to go back)'
  };

  return (
    <div className="w-full rounded-2xl bg-[#130728] border border-amber-500/40 shadow-xl overflow-hidden flex flex-col font-sans">
      
      {/* Header Bar matching AstroSage theme */}
      <div className="bg-gradient-to-r from-[#2a1352] via-[#200b41] to-[#160630] border-b border-amber-500/30 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="font-cinzel font-bold text-amber-300 text-sm sm:text-base tracking-wide">
              {isHi ? 'विंशोत्तरी दशा चक्र' : 'Vimshottari Dasha'}
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/50">
            {isHi ? levelTitles[level].hi : levelTitles[level].en} (L-{level})
          </span>
        </div>

        {/* Balance of Dasha Banner */}
        <div className="mt-2.5 p-2 sm:p-2.5 rounded-xl bg-black/40 border border-purple-800/80 text-center">
          <span className="text-[10px] sm:text-xs uppercase font-medium text-slate-300 block">
            {isHi ? 'जन्म समय दशा शेष :' : 'Balance Of Dasha :'}
          </span>
          <strong className="text-amber-300 text-xs sm:text-sm font-mono block font-bold tracking-wider mt-0.5">
            {isHi ? (dashaData?.balanceStrHi || dashaData?.balanceStr || dashaData?.balance) : (dashaData?.balanceStr || dashaData?.balance)}
          </strong>
        </div>

        {/* Breadcrumb Path when drilled down */}
        {level > 1 && (
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-300 overflow-x-auto pb-0.5 scrollbar-none font-medium">
            <button
              onClick={() => { setLevel(1); setSelectedMD(null); setSelectedAD(null); setSelectedPD(null); }}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              MD
            </button>
            <span>&gt;</span>
            <button
              onClick={() => { setLevel(2); setSelectedAD(null); setSelectedPD(null); }}
              className={level === 2 ? 'text-amber-300 font-bold' : 'text-slate-300 hover:text-white cursor-pointer'}
            >
              {selectedMD?.code}
            </button>
            {level >= 3 && (
              <>
                <span>&gt;</span>
                <button
                  onClick={() => { setLevel(3); setSelectedPD(null); }}
                  className={level === 3 ? 'text-amber-300 font-bold' : 'text-slate-300 hover:text-white cursor-pointer'}
                >
                  {selectedAD?.code}
                </button>
              </>
            )}
            {level >= 4 && (
              <>
                <span>&gt;</span>
                <span className="text-amber-300 font-bold">
                  {selectedPD?.code}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Dasha Table Rows */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#1c0c3a] text-slate-300 text-[11px] uppercase border-b border-purple-900/80">
              <th className="py-2.5 px-3 sm:px-4 font-bold text-amber-300">
                {isHi ? 'दशा स्वामी / क्रम' : 'Planet Chain'}
              </th>
              <th className="py-2.5 px-3 sm:px-4 font-bold text-amber-300 text-right">
                {isHi ? 'समाप्ति तिथि' : 'End Date'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-900/40">
            {currentRows.map((item, idx) => {
              const displayCode = isHi ? (item.codeHi || item.code) : item.code;
              const isClickable = level < 4;

              return (
                <tr
                  key={idx}
                  onClick={() => isClickable && handleRowClick(item)}
                  className={`transition-colors group ${
                    isClickable ? 'cursor-pointer hover:bg-amber-400/10' : 'cursor-default'
                  } ${
                    item.isCurrent
                      ? 'bg-amber-500/20 font-bold text-white'
                      : (idx % 2 === 0 ? 'bg-black/20' : 'bg-transparent')
                  }`}
                >
                  {/* Planet / Chain Column */}
                  <td className="py-2.5 px-3 sm:px-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                        item.isCurrent
                          ? 'bg-amber-400 text-slate-950 shadow-sm'
                          : 'bg-purple-950/80 text-amber-200 border border-purple-800/80'
                      }`}>
                        {displayCode}
                      </span>

                      {/* Full Name when on Level 1 */}
                      {level === 1 && (
                        <span className="text-slate-300 text-xs hidden sm:inline">
                          ({isHi ? (item.lordHi || item.lord) : item.lord})
                        </span>
                      )}

                      {/* Active period indicator badge */}
                      {item.isCurrent && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-1.5 py-0.2 rounded">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{isHi ? 'वर्तमान' : 'Current'}</span>
                        </span>
                      )}
                    </div>
                  </td>

                  {/* End Date Column */}
                  <td className="py-2.5 px-3 sm:px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-mono font-bold text-amber-200 text-xs sm:text-sm">
                        {item.endDate}
                      </span>
                      {isClickable && (
                        <ChevronRight className="w-3.5 h-3.5 text-purple-400 group-hover:text-amber-300 transition-colors shrink-0" />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Bar with Note & Orange LEVEL UP Button */}
      <div className="p-3 sm:p-4 bg-gradient-to-t from-[#100522] to-[#180935] border-t border-purple-900/80 flex flex-col items-center justify-center gap-2.5 text-center">
        
        {/* Instruction Note */}
        <p className="text-[11px] text-slate-400 italic">
          <strong className="text-amber-300 not-italic">Note: </strong>
          {nextLevelNote[level]}
        </p>

        {/* AstroSage-styled Orange LEVEL UP Button */}
        <button
          onClick={handleLevelUp}
          disabled={level === 1}
          className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md ${
            level > 1
              ? 'bg-[#f97316] hover:bg-[#ea580c] text-white cursor-pointer hover:shadow-orange-500/30 active:scale-95'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700 opacity-60'
          }`}
          title={level > 1 ? 'Go back up one level' : 'Currently at highest level'}
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>LEVEL UP</span>
        </button>

      </div>

    </div>
  );
}

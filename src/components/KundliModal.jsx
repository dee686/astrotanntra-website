import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Share2, 
  Sparkles, 
  ShieldAlert, 
  Clock, 
  Award, 
  Gem, 
  Heart, 
  Briefcase, 
  Activity, 
  Sun, 
  Moon, 
  Compass,
  Layers,
  ChevronRight
} from 'lucide-react';
import NorthIndianChart from './NorthIndianChart';
import SouthIndianChart from './SouthIndianChart';
import { DIVISIONAL_CHARTS_META } from '../utils/vedicCalculations';

export default function KundliModal({ kundliData, onClose, onOpenConsultation, lang }) {
  const [activeTab, setActiveTab] = useState('chart');
  const [chartType, setChartType] = useState('north'); // 'north' or 'south'
  const [selectedHouse, setSelectedHouse] = useState(1);
  const [selectedDivChart, setSelectedDivChart] = useState('D1'); // D1..D10, PANCHANG

  if (!kundliData) return null;

  const { meta, ascendant, moonDetails, sunDetails, panchangAtBirth, planets, houseOccupants, divisionalCharts, doshas, dasha, predictions, remedies } = kundliData;

  const handlePrint = () => {
    window.print();
  };

  // Get active chart data (fallback to D1 if not found)
  const currentChart = divisionalCharts?.[selectedDivChart] || {
    id: 'D1',
    name: 'Rashi',
    title: 'D-1 (Rashi Chart)',
    focus: 'Physical body, personality, general life blueprint',
    ascSign: ascendant,
    planets: planets,
    houseOccupants: houseOccupants
  };

  const houseMeanings = {
    1: 'Tanu Bhava (House of Self, Appearance, Health, Vitality, Mindset)',
    2: 'Dhana Bhava (House of Wealth, Family, Speech, Assets, Food)',
    3: 'Sahaja Bhava (House of Siblings, Courage, Communication, Short Travel)',
    4: 'Sukha Bhava (House of Mother, Domestic Bliss, Vehicles, Real Estate, Inner Peace)',
    5: 'Putra Bhava (House of Children, Intelligence, Creativity, Past Karma, Romance)',
    6: 'Ari Bhava (House of Debts, Enemies, Diseases, Service, Daily Routine)',
    7: 'Kalatra Bhava (House of Spouse, Marriage, Partnerships, Business, Public Image)',
    8: 'Randhra Bhava (House of Longevity, Transformation, Occult, Sudden Gains/Losses)',
    9: 'Dharma Bhava (House of Father, Higher Wisdom, Guru, Fortune, Long Journeys)',
    10: 'Karma Bhava (House of Profession, Status, Fame, Authority, Life Calling)',
    11: 'Labha Bhava (House of Gains, Income, Friendships, Aspirations, Elder Siblings)',
    12: 'Vyaya Bhava (House of Expenses, Foreign Lands, Liberation, Subconscious, Sleep)'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#13062c] border border-amber-500/50 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.3)] text-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-purple-800/60 bg-gradient-to-r from-[#1c0a3c] via-[#240d4f] to-[#160630] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-cinzel font-black text-xl shadow-gold-glow">
              🕉️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300">
                  {meta.name}'s Vedic Janma Kundli
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 border border-amber-400/40 text-amber-300 uppercase">
                  {meta.gender}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Born on {meta.dob} at {meta.tob} in <strong className="text-amber-200">{meta.place}</strong> (Ayanamsha: {meta.ayanamsha})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-cosmic-800 hover:bg-amber-500/20 border border-purple-700/60 text-amber-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print Kundli"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-cosmic-800 hover:bg-rose-500/20 border border-purple-700/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Quick Highlights Bar */}
        <div className="bg-[#1a093a] px-4 sm:px-6 py-2.5 border-b border-purple-900 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span className="text-slate-400">
              Ascendant (Lagna): <strong className="text-amber-300 font-semibold">{ascendant.sign} ({ascendant.sanskrit})</strong>
            </span>
            <span className="text-slate-400">
              Moon Sign (Rashi): <strong className="text-sky-300 font-semibold">{moonDetails.sign} ({moonDetails.sanskrit})</strong>
            </span>
            <span className="text-slate-400">
              Nakshatra: <strong className="text-purple-300 font-semibold">{moonDetails.nakshatra} (Pada {moonDetails.pada})</strong>
            </span>
            <span className="text-slate-400">
              Active Mahadasha: <strong className="text-emerald-300 font-semibold">{dasha.currentMahadasha}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              doshas.manglik.isManglik ? 'bg-rose-950 text-rose-300 border border-rose-600' : 'bg-emerald-950 text-emerald-300 border border-emerald-600'
            }`}>
              {doshas.manglik.intensity}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 bg-[#110526] border-b border-purple-900/60 overflow-x-auto scrollbar-none">
          {[
            { id: 'chart', label: 'Divisional Charts (D1-D10)', icon: Layers },
            { id: 'planets', label: 'Planetary Positions', icon: Sun },
            { id: 'panchangChart', label: 'Janma Panchang', icon: Compass },
            { id: 'doshas', label: 'Dosha Analysis', icon: ShieldAlert },
            { id: 'dasha', label: 'Vimshottari Dasha', icon: Clock },
            { id: 'predictions', label: 'Life Predictions', icon: Sparkles },
            { id: 'remedies', label: 'Gemstones & Remedies', icon: Gem }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'panchangChart') {
                    setActiveTab('chart');
                    setSelectedDivChart('PANCHANG');
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isActive || (tab.id === 'panchangChart' && activeTab === 'chart' && selectedDivChart === 'PANCHANG')
                    ? 'border-amber-400 text-amber-300 bg-amber-400/10 rounded-t-lg'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: DIVISIONAL CHARTS (D1 TO D10 + PANCHANG) */}
          {activeTab === 'chart' && (
            <div className="space-y-6">
              
              {/* Divisional Chart Selector Pills */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Select Divisional Chart (षोडशवर्ग D1 to D10 & Panchang)</span>
                  </span>
                  <div className="flex items-center bg-[#1e0d3f] rounded-xl p-1 border border-purple-700/60">
                    <button
                      onClick={() => setChartType('north')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                        chartType === 'north' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      North Indian (Diamond)
                    </button>
                    <button
                      onClick={() => setChartType('south')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                        chartType === 'south' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      South Indian (Box)
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {DIVISIONAL_CHARTS_META.map((metaItem) => {
                    const isSelected = selectedDivChart === metaItem.id;
                    return (
                      <button
                        key={metaItem.id}
                        onClick={() => setSelectedDivChart(metaItem.id)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-gold-glow'
                            : 'bg-[#1b0a38] text-slate-300 border-purple-800/80 hover:border-amber-400/50 hover:bg-[#230f47]'
                        }`}
                      >
                        <span className={`px-1.5 py-0.2 text-[10px] rounded font-bold ${
                          isSelected ? 'bg-black text-amber-300' : 'bg-purple-950 text-amber-300'
                        }`}>
                          {metaItem.id}
                        </span>
                        <span>{metaItem.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Chart Header & Description Banner */}
              <div className="bg-gradient-to-r from-[#240d4f] via-[#1c0a3c] to-[#160630] border border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold uppercase">
                      {currentChart.id} Chart
                    </span>
                    <h3 className="font-cinzel text-lg font-bold text-amber-300">
                      {currentChart.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    <strong className="text-amber-200">Primary Focus:</strong> {currentChart.focus}
                  </p>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-purple-800/60">
                  <span className="text-[11px] text-slate-400 block">Divisional Ascendant (Lagna)</span>
                  <strong className="text-amber-300 text-sm font-semibold">
                    {currentChart.ascSign?.name || ascendant.sign} ({currentChart.ascSign?.sanskrit || ascendant.sanskrit})
                  </strong>
                </div>
              </div>

              {/* Chart & Selected House Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                <div className="md:col-span-7 flex justify-center">
                  {chartType === 'north' ? (
                    <NorthIndianChart
                      houseOccupants={currentChart.houseOccupants}
                      activeHouse={selectedHouse}
                      onSelectHouse={(h) => setSelectedHouse(h)}
                      chartTitle={`${currentChart.name} (${currentChart.id}) - North Indian`}
                    />
                  ) : (
                    <SouthIndianChart
                      planets={currentChart.planets}
                      ascendant={currentChart.ascSign}
                      chartTitle={`${currentChart.name} (${currentChart.id}) - South Indian`}
                    />
                  )}
                </div>

                {/* House Info Card & Varga Reference */}
                <div className="md:col-span-5 space-y-4">
                  
                  <div className="bg-[#1b0a38] border border-amber-500/30 rounded-2xl p-4 shadow-md">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-800">
                      <span className="font-cinzel font-bold text-sm text-amber-300">
                        House {selectedHouse} in {currentChart.id}
                      </span>
                      <span className="text-xs font-semibold text-purple-300">
                        Sign: {currentChart.houseOccupants?.[selectedHouse]?.sign?.name} ({currentChart.houseOccupants?.[selectedHouse]?.sign?.sanskrit})
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {houseMeanings[selectedHouse]}
                    </p>

                    <div className="text-xs">
                      <span className="text-slate-400 block mb-1.5">Planets in House {selectedHouse}:</span>
                      {currentChart.houseOccupants?.[selectedHouse]?.planets && currentChart.houseOccupants[selectedHouse].planets.length > 0 ? (
                        <div className="space-y-1.5">
                          {currentChart.houseOccupants[selectedHouse].planets.map((p) => (
                            <div key={p.code} className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-purple-900/60">
                              <span className="font-bold text-amber-200">{p.name} ({p.code})</span>
                              <span className="text-[11px] text-slate-300">Sign: {p.signName || currentChart.houseOccupants[selectedHouse]?.sign?.name}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2 rounded-lg bg-black/20 text-slate-400 italic text-center">
                          No direct planetary occupants in this divisional house.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Varga Reference Directory (D1 to D10 as in uploaded image) */}
                  <div className="bg-[#180935] border border-purple-800/60 rounded-2xl p-4 text-xs">
                    <h4 className="font-cinzel font-bold text-amber-300 pb-2 mb-2 border-b border-purple-800/80 flex items-center justify-between">
                      <span>Divisional Charts Directory</span>
                      <span className="text-[10px] text-slate-400 font-normal">Click to switch</span>
                    </h4>

                    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                      {DIVISIONAL_CHARTS_META.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedDivChart(item.id)}
                          className={`w-full p-2 rounded-xl text-left flex items-start justify-between gap-2 transition-all cursor-pointer ${
                            selectedDivChart === item.id
                              ? 'bg-amber-500/20 border border-amber-400/60'
                              : 'bg-black/20 hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-amber-300">{item.id}</span>
                              <span className="font-semibold text-slate-200">{item.name}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{item.focus}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-1" />
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: PLANETARY POSITIONS */}
          {activeTab === 'planets' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-amber-300">
                  Planetary Positions & Status
                </h3>
                <p className="text-xs text-slate-400">
                  Calculated using Sidereal Lahiri Ayanamsha for your precise birth coordinates.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-purple-800/60 bg-[#170932]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#26104c] text-amber-300 font-cinzel border-b border-purple-700/60">
                      <th className="p-3">Planet</th>
                      <th className="p-3">Sign (Rashi)</th>
                      <th className="p-3">Degree</th>
                      <th className="p-3">House</th>
                      <th className="p-3">Nakshatra</th>
                      <th className="p-3">Pada</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/50">
                    {planets.map((p) => (
                      <tr key={p.name} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-bold text-slate-100 flex items-center gap-2">
                          <span>{p.name}</span>
                          {p.isRetro && p.name !== 'Rahu' && p.name !== 'Ketu' && (
                            <span className="text-[10px] px-1 py-0.2 rounded bg-rose-900 text-rose-200">Retro</span>
                          )}
                        </td>
                        <td className="p-3 text-slate-300">{p.signName} ({p.signSanskrit})</td>
                        <td className="p-3 text-amber-200 font-mono">{p.degFormatted}</td>
                        <td className="p-3 font-semibold text-slate-200">House {p.house}</td>
                        <td className="p-3 text-slate-300">{p.nakshatra}</td>
                        <td className="p-3 text-slate-300">{p.pada}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            p.dignity.includes('Exalted') ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' :
                            p.dignity.includes('Debilitated') ? 'bg-rose-950 text-rose-300 border border-rose-500' :
                            p.dignity.includes('Own') ? 'bg-amber-950 text-amber-300 border border-amber-500' :
                            'bg-purple-950 text-purple-300'
                          }`}>
                            {p.dignity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: DOSHA ANALYSIS */}
          {activeTab === 'doshas' && (
            <div className="space-y-4">
              <h3 className="font-cinzel text-lg font-bold text-amber-300">
                Major Vedic Dosha Evaluations
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Manglik Dosha */}
                <div className={`p-4 rounded-2xl border ${
                  doshas.manglik.isManglik ? 'bg-rose-950/20 border-rose-500/40' : 'bg-emerald-950/20 border-emerald-500/40'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-amber-300">Manglik Dosha</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      doshas.manglik.isManglik ? 'bg-rose-900 text-rose-200' : 'bg-emerald-900 text-emerald-200'
                    }`}>
                      {doshas.manglik.intensity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">{doshas.manglik.housesChecked}</p>
                  <p className="text-xs text-slate-400 italic">{doshas.manglik.remedy}</p>
                </div>

                {/* Kaal Sarp Dosha */}
                <div className={`p-4 rounded-2xl border ${
                  doshas.kaalSarp.hasKaalSarp ? 'bg-amber-950/20 border-amber-500/40' : 'bg-emerald-950/20 border-emerald-500/40'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-amber-300">Kaal Sarp Dosha</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      doshas.kaalSarp.hasKaalSarp ? 'bg-amber-900 text-amber-200' : 'bg-emerald-900 text-emerald-200'
                    }`}>
                      {doshas.kaalSarp.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">{doshas.kaalSarp.remedy}</p>
                </div>

                {/* Sade Sati */}
                <div className={`p-4 rounded-2xl border ${
                  doshas.sadeSati.status === 'Active' ? 'bg-purple-950/30 border-purple-500/40' : 'bg-emerald-950/20 border-emerald-500/40'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-amber-300">Shani Sade Sati</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      doshas.sadeSati.status === 'Active' ? 'bg-purple-900 text-purple-200' : 'bg-emerald-900 text-emerald-200'
                    }`}>
                      {doshas.sadeSati.status}: {doshas.sadeSati.phase}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">{doshas.sadeSati.description}</p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: VIMSHOTTARI DASHA */}
          {activeTab === 'dasha' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-amber-300">
                  Vimshottari Mahadasha Timeline (120-Year Cycle)
                </h3>
                <p className="text-xs text-slate-400">
                  Calculated based on natal Moon Nakshatra ({moonDetails.nakshatra} ruled by {moonDetails.lord}).
                </p>
              </div>

              <div className="space-y-2.5">
                {dasha.timeline.map((d, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      d.isCurrent
                        ? 'bg-amber-500/15 border-amber-400 shadow-gold-glow'
                        : 'bg-cosmic-900/60 border-purple-800/40 opacity-80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        d.isCurrent ? 'bg-amber-400 text-slate-950' : 'bg-purple-950 text-purple-300'
                      }`}>
                        {d.lord.substring(0, 2)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-200 block text-sm">
                          {d.lord} Mahadasha
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Duration: {d.durationYears} Years
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xs font-semibold text-amber-300 block">
                        {d.startYear} - {d.endYear}
                      </span>
                      {d.isCurrent && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500 text-slate-950 uppercase mt-0.5">
                          Currently Active
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PREDICTIONS */}
          {activeTab === 'predictions' && (
            <div className="space-y-4">
              <h3 className="font-cinzel text-lg font-bold text-amber-300">
                Personalized Vedic Horoscope Predictions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <Briefcase className="w-4 h-4" />
                    <h4 className="font-bold text-sm">Career & Profession</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{predictions.career}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <Award className="w-4 h-4" />
                    <h4 className="font-bold text-sm">Wealth & Financial Fortune</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{predictions.finance}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <Heart className="w-4 h-4" />
                    <h4 className="font-bold text-sm">Love, Marriage & Family</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{predictions.relationship}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <Activity className="w-4 h-4" />
                    <h4 className="font-bold text-sm">Health & Well-being</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{predictions.health}</p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 6: REMEDIES & GEMSTONES */}
          {activeTab === 'remedies' && (
            <div className="space-y-4">
              <h3 className="font-cinzel text-lg font-bold text-amber-300">
                Auspicious Gemstones, Rudraksha & Remedies
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Gemstone */}
                <div className="p-4 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <Gem className="w-4 h-4" />
                    <h4 className="font-bold text-sm">Recommended Gemstone</h4>
                  </div>
                  <div className="text-xs space-y-1 text-slate-300">
                    <div><span className="text-slate-400">Gemstone:</span> <strong className="text-amber-300">{remedies.gemstone.stone}</strong></div>
                    <div><span className="text-slate-400">How to wear:</span> {remedies.gemstone.finger}</div>
                    <div><span className="text-slate-400">Metal:</span> {remedies.gemstone.metal}</div>
                  </div>
                </div>

                {/* Rudraksha */}
                <div className="p-4 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    <h4 className="font-bold text-sm">Sacred Rudraksha</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-amber-300 block mb-1">{remedies.rudraksha}</strong>
                    Wear this sanctified bead to align planetary chakras and bring mental tranquility.
                  </p>
                </div>

                {/* Lucky Numbers & Colors */}
                <div className="p-4 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                  <h4 className="font-bold text-sm text-amber-300 mb-2">Lucky Attunements</h4>
                  <div className="text-xs space-y-1.5 text-slate-300">
                    <div><span className="text-slate-400">Lucky Numbers:</span> <strong className="text-amber-300">{remedies.luckyNumbers.join(', ')}</strong></div>
                    <div><span className="text-slate-400">Lucky Colors:</span> <strong className="text-amber-300">{remedies.luckyColors.join(', ')}</strong></div>
                  </div>
                </div>

                {/* Sacred Mantra */}
                <div className="p-4 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                  <h4 className="font-bold text-sm text-amber-300 mb-2">Daily Healing Vedic Mantra</h4>
                  <p className="text-sm font-bold text-amber-300 font-serif italic mb-1">
                    "{remedies.mantra}"
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Chant 108 times daily during morning meditation for spiritual protection.
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-800/60 bg-[#160731] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400 text-center sm:text-left">
            Have questions regarding this birth chart or divisional Vargas? Consult our Senior Vedic Acharyas.
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenConsultation(`Birth Chart Consultation (${currentChart.id} Varga)`);
              }}
              className="gold-btn px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Consult Astrologer</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-cosmic-800 hover:bg-cosmic-700 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

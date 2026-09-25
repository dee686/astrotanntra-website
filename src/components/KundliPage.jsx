import React, { useState } from 'react';
import { 
  ArrowLeft,
  Home,
  Printer, 
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
  ChevronRight,
  CheckCircle2,
  Calendar,
  MapPin,
  Globe,
  Palette
} from 'lucide-react';
import NorthIndianChart from './NorthIndianChart';
import SouthIndianChart from './SouthIndianChart';
import { DIVISIONAL_CHARTS_META } from '../utils/vedicCalculations';

export default function KundliPage({ kundliData, onGoBack, onOpenConsultation, lang = 'en' }) {
  const [activeTab, setActiveTab] = useState('chart');
  const [chartType, setChartType] = useState('north'); // 'north' or 'south'
  const [chartLang, setChartLang] = useState('both'); // 'en' | 'hi' | 'both'
  const [chartTheme, setChartTheme] = useState('astrosage'); // 'astrosage' | 'cosmic'
  const [selectedHouse, setSelectedHouse] = useState(1);
  const [selectedDivChart, setSelectedDivChart] = useState('D9'); // For the right chart

  if (!kundliData) {
    return (
      <div className="w-full min-h-[600px] flex flex-col items-center justify-center p-8 text-center bg-[#0d0322]">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-2xl mb-4">
          🕉️
        </div>
        <h2 className="text-2xl font-bold font-cinzel text-amber-300 mb-2">
          {lang === 'hi' ? 'कुण्डली डेटा उपलब्ध नहीं है' : 'No Kundli Data Available'}
        </h2>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          {lang === 'hi' 
            ? 'कृपया होम पेज पर जाकर जन्म विवरण भरें और कुण्डली बनाएं।' 
            : 'Please return to the home page, enter birth details in the form, and generate your chart.'}
        </p>
        <button
          onClick={onGoBack}
          className="gold-btn px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'hi' ? 'होम पर वापस जाएं' : 'Back to Home'}</span>
        </button>
      </div>
    );
  }

  const { 
    meta, 
    ascendant, 
    moonDetails, 
    sunDetails, 
    panchangAtBirth, 
    planets, 
    d1Chart,
    d9Chart,
    houseOccupants, 
    divisionalCharts, 
    karaks,
    avasthas,
    doshas, 
    dasha, 
    predictions, 
    remedies 
  } = kundliData;

  const handlePrint = () => {
    window.print();
  };

  // Base primary Lagna (D1) chart data
  const lagnaChartData = d1Chart || {
    id: 'D1',
    name: 'Lagna Chart',
    nameHi: 'लग्न कुण्डली',
    ascSign: ascendant,
    houseOccupants: houseOccupants
  };

  // Secondary chart data (D-9 Navamsha or selected divisional chart)
  const secondaryChartData = (selectedDivChart === 'D9' ? d9Chart : divisionalCharts?.[selectedDivChart]) || d9Chart || {
    id: 'D9',
    name: 'Navamsa Chart',
    nameHi: 'नवांश कुण्डली',
    ascSign: ascendant,
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

  // Helper for displaying bilingual labels
  const getBilingual = (en, hi) => {
    if (chartLang === 'hi') return hi || en;
    if (chartLang === 'both') return hi ? `${en} (${hi})` : en;
    return en;
  };

  return (
    <div className="w-full min-h-screen bg-[#0b031b] text-slate-100 py-6 px-3 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Breadcrumb & Action Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-purple-900/60">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <button 
              onClick={onGoBack} 
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'hi' ? 'होम' : 'Home'}</span>
            </button>
            <span>/</span>
            <span className="text-slate-400">{lang === 'hi' ? 'वैदिक ज्योतिष' : 'Vedic Astrology'}</span>
            <span>/</span>
            <span className="text-amber-300 font-semibold">
              {lang === 'hi' ? 'जन्म कुण्डली रिपोर्ट' : 'Janma Kundli Report'}
            </span>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#1a0938] hover:bg-amber-500/20 border border-purple-700/60 text-slate-200 hover:text-amber-300 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              title="Print / Save as PDF"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? 'प्रिंट / पीडीएफ' : 'Print / PDF'}</span>
            </button>

            <button
              onClick={() => onOpenConsultation?.(`Birth Chart Consultation (${meta?.name || 'Native'})`)}
              className="gold-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-gold-glow"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>{lang === 'hi' ? 'ज्योतिषी से बात करें' : 'Consult Astrologer'}</span>
            </button>
          </div>

        </div>

        {/* Kundli Identity Card */}
        <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-r from-[#1d0a3d] via-[#250e50] to-[#160630] p-5 sm:p-7 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.15)] relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-amber-500/5 blur-2xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            
            {/* Person & Birth Info */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400/30 to-purple-900/50 border border-amber-400/80 flex items-center justify-center text-amber-300 text-3xl sm:text-4xl shadow-gold-glow shrink-0">
                🕉️
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-300 tracking-wide">
                    {meta.name}'s Vedic Janma Kundli
                  </h1>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 border border-amber-400/50 text-amber-300 uppercase tracking-wider">
                    {meta.gender}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1.5 text-xs text-slate-300 mt-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Born: <strong className="text-amber-200">{meta.dob}</strong> at <strong className="text-amber-200">{meta.tob}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate max-w-xs" title={meta.place}>
                      Place: <strong className="text-amber-200">{meta.place}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-mono text-[11px] text-slate-400">
                      Coords: {meta.lat}°, {meta.lng}° ({meta.ayanamshaFormatted || meta.ayanamsha || 'Lahiri'})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2 border-t lg:border-t-0 pt-4 lg:pt-0 border-purple-800/60">
              <span className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
                doshas?.manglik?.isManglik 
                  ? 'bg-rose-950/80 text-rose-300 border-rose-500/80' 
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/80'
              }`}>
                <span>●</span>
                <span>Manglik: {doshas?.manglik?.intensity || 'Non-Manglik'}</span>
              </span>

              <span className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
                doshas?.kaalSarp?.hasKaalSarp
                  ? 'bg-amber-950/80 text-amber-300 border-amber-500/80'
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/80'
              }`}>
                <span>●</span>
                <span>Kaal Sarp: {doshas?.kaalSarp?.status || 'No Kaal Sarp Dosha'}</span>
              </span>
            </div>

          </div>

          {/* Quick Highlights Ribbon */}
          <div className="mt-5 pt-4 border-t border-purple-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-2.5 rounded-xl bg-black/30 border border-purple-900/50">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Ascendant (Lagna)</span>
              <strong className="text-amber-300 text-sm font-cinzel">
                {ascendant.sign} ({ascendant.sanskrit})
              </strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {ascendant.degFormatted} • {ascendant.nakshatra}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-black/30 border border-purple-900/50">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Moon Sign (Rashi)</span>
              <strong className="text-sky-300 text-sm font-cinzel">
                {moonDetails.sign} ({moonDetails.sanskrit})
              </strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {moonDetails.degFormatted} • {moonDetails.nakshatra}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-black/30 border border-purple-900/50">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Sun Sign (Surya)</span>
              <strong className="text-amber-400 text-sm font-cinzel">
                {sunDetails.sign} ({sunDetails.sanskrit})
              </strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {sunDetails.degFormatted} • Lord: {sunDetails.lord}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-black/30 border border-purple-900/50">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Active Mahadasha</span>
              <strong className="text-emerald-300 text-sm font-cinzel">
                {dasha.currentMahadasha}
              </strong>
              <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                {dasha.balanceStr || 'Vimshottari Cycle'}
              </span>
            </div>
          </div>

        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#120629] border border-amber-500/30 rounded-2xl overflow-x-auto scrollbar-none shadow-md">
          {[
            { id: 'chart', label: lang === 'hi' ? 'कुण्डली एवं वर्ग चार्ट (Charts)' : 'Kundli & Divisional Charts', icon: Layers },
            { id: 'planets', label: lang === 'hi' ? 'ग्रह स्थिति एवं अवस्था (Planets)' : 'Planetary Positions & Avasthas', icon: Sun },
            { id: 'panchang', label: lang === 'hi' ? 'जन्म पंचांग (Panchang)' : 'Janma Panchang', icon: Compass },
            { id: 'doshas', label: lang === 'hi' ? 'दोष विश्लेषण (Doshas)' : 'Dosha Analysis', icon: ShieldAlert },
            { id: 'dasha', label: lang === 'hi' ? 'विंशोत्तरी दशा (Dasha)' : 'Vimshottari Dasha', icon: Clock },
            { id: 'predictions', label: lang === 'hi' ? 'जीवन फलकथन (Predictions)' : 'Life Predictions', icon: Sparkles },
            { id: 'remedies', label: lang === 'hi' ? 'वैदिक उपाय एवं रत्न (Remedies)' : 'Gemstones & Remedies', icon: Gem }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-gold-glow font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: KUNDLI & DIVISIONAL CHARTS (ASTROSAGE SIDE-BY-SIDE + AUTHENTIC TABLES) */}
        {activeTab === 'chart' && (
          <div className="bg-[#120629] border border-amber-500/30 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
            
            {/* Controls Bar: Language Toggle, Theme Toggle & Chart Style Switcher */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#1b0a38] border border-purple-800/80">
              
              {/* Language Selector: English / हिन्दी / Both */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>Language / भाषा:</span>
                </span>
                <div className="inline-flex rounded-xl bg-black/40 p-1 border border-purple-700/60">
                  <button
                    onClick={() => setChartLang('en')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      chartLang === 'en'
                        ? 'bg-amber-400 text-slate-950 shadow font-extrabold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setChartLang('hi')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      chartLang === 'hi'
                        ? 'bg-amber-400 text-slate-950 shadow font-extrabold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => setChartLang('both')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      chartLang === 'both'
                        ? 'bg-amber-400 text-slate-950 shadow font-extrabold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Both (दोनों)
                  </button>
                </div>
              </div>

              {/* Theme & Style Toggles */}
              <div className="flex items-center flex-wrap gap-2.5">
                {/* Theme Selector */}
                <div className="inline-flex rounded-xl bg-black/40 p-1 border border-purple-700/60 items-center">
                  <Palette className="w-3.5 h-3.5 text-amber-400 ml-2 mr-1" />
                  <button
                    onClick={() => setChartTheme('astrosage')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      chartTheme === 'astrosage'
                        ? 'bg-amber-400 text-slate-950 shadow font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Classic (AstroSage)
                  </button>
                  <button
                    onClick={() => setChartTheme('cosmic')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      chartTheme === 'cosmic'
                        ? 'bg-amber-400 text-slate-950 shadow font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Cosmic Gold
                  </button>
                </div>

                {/* North / South Style */}
                <div className="inline-flex rounded-xl bg-black/40 p-1 border border-purple-700/60">
                  <button
                    onClick={() => setChartType('north')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      chartType === 'north' ? 'bg-amber-400 text-slate-950 shadow font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    North Indian
                  </button>
                  <button
                    onClick={() => setChartType('south')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      chartType === 'south' ? 'bg-amber-400 text-slate-950 shadow font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    South Indian
                  </button>
                </div>
              </div>

            </div>

            {/* Divisional Chart Selector Pills */}
            <div>
              <div className="flex items-center justify-between pb-2 text-xs text-slate-300">
                <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Right Chart Selector (तुलना हेतु वर्ग कुण्डली चुनें):</span>
                </span>
                <span className="text-slate-400 text-[11px]">
                  Left: <strong>Lagna (D-1)</strong> • Right: <strong>{secondaryChartData.name} ({secondaryChartData.id})</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {DIVISIONAL_CHARTS_META.map((metaItem) => {
                  const isSelected = selectedDivChart === metaItem.id;
                  return (
                    <button
                      key={metaItem.id}
                      onClick={() => setSelectedDivChart(metaItem.id)}
                      className={`px-3.5 py-1.5 rounded-xl border text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-gold-glow'
                          : 'bg-[#1b0a38] text-slate-300 border-purple-800/80 hover:border-amber-400/50 hover:bg-[#230f47]'
                      }`}
                    >
                      <span className={`px-1.5 py-0.5 text-[10px] rounded font-bold ${
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

            {/* ASTROSAGE SIDE-BY-SIDE CHARTS: LAGNA CHART (D-1) & NAVAMSA CHART (D-9) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              {/* Left Chart: Lagna Chart (D-1) */}
              <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-black/20 border border-purple-900/50 shadow-inner">
                {chartType === 'north' ? (
                  <NorthIndianChart
                    houseOccupants={lagnaChartData.houseOccupants}
                    activeHouse={selectedHouse}
                    onSelectHouse={(h) => setSelectedHouse(h)}
                    chartTitle={getBilingual('Lagna Chart', 'लग्न कुण्डली')}
                    chartLang={chartLang}
                    showDegrees={true}
                    theme={chartTheme}
                  />
                ) : (
                  <SouthIndianChart
                    planets={lagnaChartData.planets || planets}
                    ascendant={ascendant}
                    chartTitle={getBilingual('Lagna Chart', 'लग्न कुण्डली')}
                  />
                )}
              </div>

              {/* Right Chart: Navamsa Chart (D-9) or Selected Divisional Chart */}
              <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-black/20 border border-purple-900/50 shadow-inner">
                {chartType === 'north' ? (
                  <NorthIndianChart
                    houseOccupants={secondaryChartData.houseOccupants}
                    activeHouse={selectedHouse}
                    onSelectHouse={(h) => setSelectedHouse(h)}
                    chartTitle={getBilingual(
                      `${secondaryChartData.name} (${secondaryChartData.id})`,
                      `${secondaryChartData.nameHi || secondaryChartData.name} (${secondaryChartData.id})`
                    )}
                    chartLang={chartLang}
                    showDegrees={secondaryChartData.id === 'D1'}
                    theme={chartTheme}
                  />
                ) : (
                  <SouthIndianChart
                    planets={secondaryChartData.planets || planets}
                    ascendant={secondaryChartData.ascSign}
                    chartTitle={`${secondaryChartData.name} (${secondaryChartData.id})`}
                  />
                )}
              </div>

            </div>

            {/* ASTROSAGE TABLES SECTION: PLANETS TABLE & VIMSHOTTARI DASHA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
              
              {/* Planets Table (8 cols on lg) */}
              <div className="lg:col-span-8 bg-[#170933] border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-800">
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-400" />
                    <span>{getBilingual('Planetary Positions', 'ग्रह स्थिति')}</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {meta.ayanamshaFormatted || 'Lahiri Ayanamsha'}
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-purple-800/60">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#240e49] text-amber-300 font-cinzel border-b border-purple-700/60">
                        <th className="p-2.5">Planets</th>
                        <th className="p-2.5 text-center">C</th>
                        <th className="p-2.5 text-center">R</th>
                        <th className="p-2.5">Rashi</th>
                        <th className="p-2.5">Longitude</th>
                        <th className="p-2.5">Nakshatra</th>
                        <th className="p-2.5 text-center">Pada</th>
                        <th className="p-2.5">Relation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-900/50 font-mono">
                      {planets.map((p) => {
                        const isAsc = p.name === 'Ascendant';
                        return (
                          <tr key={p.name} className="hover:bg-white/5 transition-colors">
                            <td className="p-2.5 font-bold font-sans text-slate-100 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color || '#eab308' }}></span>
                              <span className={isAsc ? 'text-amber-300 font-bold' : ''}>
                                {getBilingual(p.name, p.nameHi)}
                              </span>
                            </td>
                            <td className="p-2.5 text-center font-bold text-amber-400">
                              {p.cStatus || ''}
                            </td>
                            <td className={`p-2.5 text-center font-bold ${
                              p.rStatus === 'R' ? 'text-rose-400' : p.rStatus === 'D' ? 'text-slate-200' : 'text-slate-500'
                            }`}>
                              {isAsc ? '' : (p.rStatus || '-')}
                            </td>
                            <td className="p-2.5 font-sans text-slate-200">
                              {getBilingual(p.signName, p.signHi)}
                            </td>
                            <td className="p-2.5 text-amber-200 font-bold">
                              {p.degFormatted}
                            </td>
                            <td className="p-2.5 font-sans text-slate-200">
                              {getBilingual(p.nakshatraName || p.nakshatra?.en, p.nakshatraNameHi || p.nakshatra?.hi)}
                            </td>
                            <td className="p-2.5 text-center font-sans text-slate-300">
                              {p.pada || 1}
                            </td>
                            <td className="p-2.5 font-sans">
                              {p.relation && p.relation !== '-' ? (
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block ${
                                  p.relation === 'Exalted' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' :
                                  p.relation === 'Debilitated' ? 'bg-rose-950 text-rose-300 border border-rose-500' :
                                  p.relation === 'Own' ? 'bg-amber-950 text-amber-300 border border-amber-500' :
                                  p.relation === 'Friendly' ? 'bg-sky-950 text-sky-300 border border-sky-500' :
                                  p.relation === 'Enemy' ? 'bg-red-950 text-red-300 border border-red-500' :
                                  'bg-purple-950 text-purple-300'
                                }`}>
                                  {getBilingual(p.relation, p.relationHi)}
                                </span>
                              ) : (
                                <span className="text-slate-500">-</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-2.5 text-[11px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                  <span><strong>Note:</strong> [C] - Combust</span>
                  <span>[D] - Direct</span>
                  <span>[R / *] - Retrograde</span>
                </div>
              </div>

              {/* Vimshottari Dasha Balance Card (4 cols on lg) */}
              <div className="lg:col-span-4 bg-[#170933] border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-800">
                  <h3 className="font-cinzel text-base font-bold text-amber-300 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Vimshottari Dasha</span>
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                    120-Year
                  </span>
                </div>

                {/* Balance String Banner */}
                <div className="p-3 rounded-xl bg-black/40 border border-purple-900/60 mb-3 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Balance Of Dasha at Birth
                  </span>
                  <strong className="text-amber-300 text-xs sm:text-sm font-mono mt-0.5 block">
                    {chartLang === 'hi' ? (dasha.balanceStrHi || dasha.balanceStr) : dasha.balanceStr}
                  </strong>
                </div>

                {/* Timeline Table */}
                <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
                  {dasha.timeline?.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                        item.isCurrent
                          ? 'bg-amber-500/20 border border-amber-400/80 shadow-sm'
                          : 'bg-black/20 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                          item.isCurrent ? 'bg-amber-400 text-slate-950 font-black' : 'bg-purple-950 text-amber-300'
                        }`}>
                          {item.lord.substring(0, 2)}
                        </span>
                        <span className="font-semibold text-slate-200">
                          {getBilingual(item.lord, item.lordHi)}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-amber-300 font-bold text-[11px]">
                          {item.endDate || item.endYear}
                        </span>
                        {item.isCurrent && (
                          <span className="text-[9px] block text-emerald-400 font-bold">Active</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ASTROSAGE SCREENSHOT 2 TABLES: KARAK TABLE & AVASTHA TABLE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pt-2">
              
              {/* Karak Table */}
              <div className="bg-[#170933] border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-800">
                  <h3 className="font-cinzel text-base font-bold text-amber-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>{getBilingual('Karak Table (Jaimini)', 'कारक सारणी')}</span>
                  </h3>
                  <span className="text-[10px] text-slate-400">7 Chara & Sthir Karakas</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-purple-800/60">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#240e49] text-amber-300 font-cinzel border-b border-purple-700/60">
                        <th className="p-2.5">Karak</th>
                        <th className="p-2.5">Sthir</th>
                        <th className="p-2.5 font-bold text-amber-400">Chara</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-900/50">
                      {karaks?.map((k, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="p-2.5 font-bold text-slate-200">
                            {getBilingual(k.karak, k.karakHi)}
                          </td>
                          <td className="p-2.5 text-slate-300">
                            {getBilingual(k.sthir, k.sthirHi)}
                          </td>
                          <td className="p-2.5 font-bold text-amber-300">
                            {getBilingual(k.chara, k.charaHi)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Avastha Table */}
              <div className="bg-[#170933] border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-800">
                  <h3 className="font-cinzel text-base font-bold text-amber-300 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-400" />
                    <span>{getBilingual('Avastha Table (Parashari)', 'अवस्था सारणी')}</span>
                  </h3>
                  <span className="text-[10px] text-slate-400">Jagrat • Baladi • Deeptadi</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-purple-800/60">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#240e49] text-amber-300 font-cinzel border-b border-purple-700/60">
                        <th className="p-2.5">Planets</th>
                        <th className="p-2.5">Jagrat</th>
                        <th className="p-2.5">Baladi</th>
                        <th className="p-2.5">Deeptadi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-900/50">
                      {avasthas?.map((a, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="p-2.5 font-bold text-slate-200">
                            {getBilingual(a.name, a.nameHi)}
                          </td>
                          <td className="p-2.5 text-slate-300">
                            {getBilingual(a.jagrat, a.jagratHi)}
                          </td>
                          <td className="p-2.5 text-amber-300 font-semibold">
                            {getBilingual(a.baladi, a.baladiHi)}
                          </td>
                          <td className="p-2.5 text-slate-300">
                            {getBilingual(a.deeptadi, a.deeptadiHi)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: DETAILED PLANETARY POSITIONS */}
        {activeTab === 'planets' && (
          <div className="bg-[#120629] border border-amber-500/30 rounded-3xl p-5 sm:p-7 space-y-5 shadow-xl">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-amber-300">
                Planetary Positions & Ephemeris Details
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Calculated using NASA JPL Keplerian orbital ephemeris and Chitrapaksha (Lahiri) Ayanamsha for your exact birth date, time, and coordinates.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-purple-800/60 bg-[#170932]">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#26104c] text-amber-300 font-cinzel border-b border-purple-700/60">
                    <th className="p-3.5">Planet</th>
                    <th className="p-3.5">Sign (Rashi)</th>
                    <th className="p-3.5">Degree</th>
                    <th className="p-3.5">House</th>
                    <th className="p-3.5">Nakshatra</th>
                    <th className="p-3.5">Pada</th>
                    <th className="p-3.5">Dignity / State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900/50">
                  {planets.map((p) => (
                    <tr key={p.name} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-slate-100 flex items-center gap-2">
                        <span>{getBilingual(p.name, p.nameHi)}</span>
                        {p.isRetro && p.name !== 'Rahu' && p.name !== 'Ketu' && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-900 text-rose-200 font-semibold">Retro</span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-300">{p.signName} ({p.signSanskrit})</td>
                      <td className="p-3.5 text-amber-200 font-mono font-semibold">{p.degFormatted}</td>
                      <td className="p-3.5 font-semibold text-slate-200">House {p.house}</td>
                      <td className="p-3.5 text-slate-300">{p.nakshatraName || p.nakshatra?.en}</td>
                      <td className="p-3.5 text-slate-300">{p.pada}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold inline-block ${
                          p.dignity?.includes('Exalted') ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' :
                          p.dignity?.includes('Debilitated') ? 'bg-rose-950 text-rose-300 border border-rose-500' :
                          p.dignity?.includes('Own') ? 'bg-amber-950 text-amber-300 border border-amber-500' :
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

        {/* TAB 3: JANMA PANCHANG */}
        {activeTab === 'panchang' && (
          <div className="bg-[#120629] border border-amber-500/30 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-amber-300">
                Janma Panchang (Five Cosmic Elements at Birth)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                The Pancha-Mahabhuta (Ether, Air, Fire, Water, Earth) energies presiding over the cosmos at the moment of birth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Lunar Day (Tithi)</span>
                  <h4 className="text-lg font-bold font-cinzel text-slate-100 mt-1">
                    {panchangAtBirth?.tithi || 'Chaturthi (Shukla Paksha)'}
                  </h4>
                  {panchangAtBirth?.tithiHi && (
                    <span className="text-xs text-amber-300 block">{panchangAtBirth.tithiHi}</span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Governs emotional temperament, relationships, and the subtle water element (Jala Tatva).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Birth Nakshatra</span>
                  <h4 className="text-lg font-bold font-cinzel text-slate-100 mt-1">
                    {panchangAtBirth?.nakshatra || `${moonDetails.nakshatra} (Pada ${moonDetails.pada})`}
                  </h4>
                  {panchangAtBirth?.nakshatraHi && (
                    <span className="text-xs text-amber-300 block">{panchangAtBirth.nakshatraHi}</span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Ruled by <strong className="text-amber-300">{moonDetails.lord}</strong>. Governs destiny, mental nature, and life path (Vayu Tatva).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Solar-Lunar Yoga</span>
                  <h4 className="text-lg font-bold font-cinzel text-slate-100 mt-1">
                    {panchangAtBirth?.yoga || 'Ayushman Yoga'}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Harmonizes vital life force, physical stamina, and soul vitality (Agni Tatva).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Karana (Half-Tithi)</span>
                  <h4 className="text-lg font-bold font-cinzel text-slate-100 mt-1">
                    {panchangAtBirth?.karana || 'Bava'}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Governs material deeds, professional actions, and worldly perseverance (Prithvi Tatva).
                </p>
              </div>

            </div>

            <div className="p-4 rounded-2xl bg-[#160731] border border-purple-800/60 flex items-start gap-3 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                These five Panchang pillars form the bedrock of Muhurta and Janma analysis in classical Parashari Jyotish.
              </span>
            </div>
          </div>
        )}

        {/* TAB 4: DOSHA ANALYSIS */}
        {activeTab === 'doshas' && (
          <div className="bg-[#120629] border border-amber-500/30 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-amber-300">
                Major Vedic Dosha Evaluations & Mitigations
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Authentic checks for Mangal Dosha, Kaal Sarp Yog, Shani Sade Sati, and ancestral karma.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Manglik Dosha */}
              <div className={`p-5 rounded-2xl border ${
                doshas?.manglik?.isManglik ? 'bg-rose-950/25 border-rose-500/50' : 'bg-emerald-950/25 border-emerald-500/50'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-base text-amber-300">Manglik Dosha</h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    doshas?.manglik?.isManglik ? 'bg-rose-900 text-rose-200' : 'bg-emerald-900 text-emerald-200'
                  }`}>
                    {doshas?.manglik?.intensity}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-3">{doshas?.manglik?.housesChecked || doshas?.manglik?.details}</p>
                <div className="p-3 rounded-xl bg-black/40 border border-purple-900/60 text-xs text-slate-300">
                  <strong className="text-amber-400 block mb-1">Prescribed Vedic Remedy:</strong>
                  {doshas?.manglik?.remedy}
                </div>
              </div>

              {/* Kaal Sarp Dosha */}
              <div className={`p-5 rounded-2xl border ${
                doshas?.kaalSarp?.hasKaalSarp ? 'bg-amber-950/25 border-amber-500/50' : 'bg-emerald-950/25 border-emerald-500/50'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-base text-amber-300">Kaal Sarp Dosha</h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    doshas?.kaalSarp?.hasKaalSarp ? 'bg-amber-900 text-amber-200' : 'bg-emerald-900 text-emerald-200'
                  }`}>
                    {doshas?.kaalSarp?.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-3">
                  {doshas?.kaalSarp?.details || 'Chart is free from Kaal Sarp Dosha.'}
                </p>
                <div className="p-3 rounded-xl bg-black/40 border border-purple-900/60 text-xs text-slate-300">
                  <strong className="text-amber-400 block mb-1">Spiritual Mitigation:</strong>
                  {doshas?.kaalSarp?.remedy}
                </div>
              </div>

              {/* Sade Sati */}
              <div className={`p-5 rounded-2xl border ${
                doshas?.sadeSati?.status === 'Active' ? 'bg-purple-950/35 border-purple-500/50' : 'bg-emerald-950/25 border-emerald-500/50'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-base text-amber-300">Shani Sade Sati</h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    doshas?.sadeSati?.status === 'Active' ? 'bg-purple-900 text-purple-200' : 'bg-emerald-900 text-emerald-200'
                  }`}>
                    {doshas?.sadeSati?.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-3">{doshas?.sadeSati?.description}</p>
                <div className="p-3 rounded-xl bg-black/40 border border-purple-900/60 text-xs text-slate-300">
                  <strong className="text-amber-400 block mb-1">Protective Measure:</strong>
                  Chant Hanuman Chalisa every Tuesday & Saturday evening; offer mustard oil lamp to Lord Shani.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: VIMSHOTTARI DASHA */}
        {activeTab === 'dasha' && (
          <div className="bg-[#120629] border border-amber-500/30 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-amber-300">
                Vimshottari Mahadasha Timeline (120-Year Vedic Cycle)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Calculated based on natal Moon Nakshatra ({moonDetails.nakshatra} ruled by {moonDetails.lord}).
              </p>
            </div>

            <div className="space-y-3">
              {dasha.timeline?.map((d, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-center justify-between text-xs sm:text-sm transition-all ${
                    d.isCurrent
                      ? 'bg-amber-500/15 border-amber-400 shadow-gold-glow'
                      : 'bg-[#1b0a38]/60 border-purple-800/40 hover:bg-[#1b0a38]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      d.isCurrent ? 'bg-amber-400 text-slate-950 shadow-md font-black' : 'bg-purple-950 text-purple-300 border border-purple-800'
                    }`}>
                      {d.lord.substring(0, 2)}
                    </div>
                    <div>
                      <span className="font-bold text-slate-100 block text-sm sm:text-base">
                        {d.lord} Mahadasha
                      </span>
                      <span className="text-xs text-slate-400">
                        Duration: {d.years || d.durationYears} Years
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-amber-300 block">
                      {d.startDate ? `${d.startDate} - ${d.endDate}` : `${d.startYear} - ${d.endYear}`}
                    </span>
                    {d.isCurrent && (
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-500 text-slate-950 uppercase mt-1 tracking-wider shadow">
                        Currently Active
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: LIFE PREDICTIONS */}
        {activeTab === 'predictions' && (
          <div className="bg-[#120629] border border-amber-500/30 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-amber-300">
                Personalized Vedic Horoscope Predictions
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Deep life insights synthesized from planetary bhavas, aspects, and lordships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                <div className="flex items-center gap-2.5 mb-3 text-amber-400">
                  <Briefcase className="w-5 h-5" />
                  <h4 className="font-bold text-base font-cinzel">Career & Profession</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{predictions.career}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                <div className="flex items-center gap-2.5 mb-3 text-amber-400">
                  <Award className="w-5 h-5" />
                  <h4 className="font-bold text-base font-cinzel">Wealth & Financial Fortune</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{predictions.finance}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                <div className="flex items-center gap-2.5 mb-3 text-amber-400">
                  <Heart className="w-5 h-5" />
                  <h4 className="font-bold text-base font-cinzel">Love, Marriage & Family</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{predictions.relationship}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                <div className="flex items-center gap-2.5 mb-3 text-amber-400">
                  <Activity className="w-5 h-5" />
                  <h4 className="font-bold text-base font-cinzel">Health & Well-being</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{predictions.health}</p>
              </div>

            </div>
          </div>
        )}

        {/* TAB 7: VEDIC REMEDIES */}
        {activeTab === 'remedies' && (
          <div className="bg-[#120629] border border-amber-500/30 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-amber-300">
                Auspicious Gemstones, Rudraksha & Remedies
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Classical Vedic remedial measures to enhance beneficial planetary vibrations and pacify adverse transits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Gemstone */}
              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                <div className="flex items-center gap-2.5 mb-3 text-amber-400">
                  <Gem className="w-5 h-5" />
                  <h4 className="font-bold text-base font-cinzel">Recommended Gemstone</h4>
                </div>
                <div className="text-xs sm:text-sm space-y-2 text-slate-300">
                  <div><span className="text-slate-400">Prescribed Gem:</span> <strong className="text-amber-300">{typeof remedies.gemstone === 'object' ? remedies.gemstone.stone : remedies.gemstone}</strong></div>
                  {remedies.gemstone?.finger && (
                    <div><span className="text-slate-400">Wearing Finger:</span> {remedies.gemstone.finger}</div>
                  )}
                  {remedies.gemstone?.metal && (
                    <div><span className="text-slate-400">Auspicious Metal:</span> {remedies.gemstone.metal}</div>
                  )}
                </div>
              </div>

              {/* Rudraksha */}
              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                <div className="flex items-center gap-2.5 mb-3 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                  <h4 className="font-bold text-base font-cinzel">Sacred Rudraksha</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-amber-300 block mb-1 text-sm">{remedies.rudraksha}</strong>
                  Wear this sanctified bead to align planetary chakras and bring peace, focus, and divine grace.
                </p>
              </div>

              {/* Charity & Mantras */}
              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                <h4 className="font-bold text-base font-cinzel text-amber-300 mb-3">Charity & Vedic Seva</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {remedies.charity || 'Support education and distribute sweets/grains on Fridays.'}
                </p>
              </div>

              {/* Sacred Mantra */}
              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30">
                <h4 className="font-bold text-base font-cinzel text-amber-300 mb-3">Daily Healing Vedic Mantra</h4>
                <p className="text-base font-bold text-amber-300 font-serif italic mb-2">
                  "{remedies.mantra}"
                </p>
                <p className="text-xs text-slate-400">
                  Chant 108 times daily during morning brahma muhurta for spiritual clarity and celestial protection.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Bottom Consultation CTA Banner */}
        <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-r from-[#1c093a] via-[#240d4f] to-[#14052b] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-300">
              Need Personal Guidance for this Kundli?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Our Senior Vedic Acharyas provide 1-on-1 private video and phone consultations analyzing all 16 divisional charts, dasha timing, and customized remedies.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenConsultation?.(`Birth Chart Consultation (${meta?.name || 'Native'})`)}
              className="gold-btn px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-gold-glow"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{lang === 'hi' ? 'आचार्य से बात करें' : 'Talk to Astrologer'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

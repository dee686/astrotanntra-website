import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  Briefcase, 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  Edit3, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Lock,
  Calendar,
  Languages
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  getWeeklyHoroscopeDuration, 
  getEffectiveHoroscope, 
  saveWeeklyHoroscope, 
  resetWeeklyHoroscope 
} from '../services/horoscopeService';
import { isHoroscopeEditor } from '../services/authService';
import { HOROSCOPE_DATA } from '../data/horoscopeData';

export default function HoroscopeModal({ 
  sign, 
  onClose, 
  onOpenConsultation, 
  lang = 'en', 
  user = null, 
  onOpenAuth = null 
}) {
  if (!sign) return null;

  const isHi = lang === 'hi';
  const canEdit = isHoroscopeEditor(user);

  // Dynamic real-time weekly duration
  const weeklyDuration = getWeeklyHoroscopeDuration(lang);

  // Active sign with any custom persisted edits applied
  const [currentSign, setCurrentSign] = useState(() => getEffectiveHoroscope(sign));
  const [isEditing, setIsEditing] = useState(false);
  const [editLangTab, setEditLangTab] = useState(isHi ? 'hi' : 'en');
  const [statusNotice, setStatusNotice] = useState(null);

  // Form state for editing
  const [formData, setFormData] = useState({
    weekly: '',
    weeklyHi: '',
    weeklyTheme: '',
    weeklyThemeHi: '',
    love: '',
    loveHi: '',
    loveScore: 85,
    career: '',
    careerHi: '',
    careerScore: 85,
    health: '',
    healthHi: '',
    healthScore: 85,
    luckyDay: '',
    luckyDayHi: '',
    color: '',
    colorHi: '',
    number: 9,
    compatible: '',
    compatibleHi: ''
  });

  // Keep currentSign and formData synced when sign prop or storage updates
  useEffect(() => {
    const effective = getEffectiveHoroscope(sign);
    setCurrentSign(effective);
    populateFormData(effective);
  }, [sign]);

  const populateFormData = (data) => {
    setFormData({
      weekly: data.weekly || data.today || '',
      weeklyHi: data.weeklyHi || data.todayHi || '',
      weeklyTheme: data.weeklyTheme || '',
      weeklyThemeHi: data.weeklyThemeHi || '',
      love: data.love || '',
      loveHi: data.loveHi || '',
      loveScore: data.loveScore ?? 85,
      career: data.career || '',
      careerHi: data.careerHi || '',
      careerScore: data.careerScore ?? 85,
      health: data.health || '',
      healthHi: data.healthHi || '',
      healthScore: data.healthScore ?? 85,
      luckyDay: data.luckyDay || 'Wednesday',
      luckyDayHi: data.luckyDayHi || 'बुधवार',
      color: data.color || 'Gold',
      colorHi: data.colorHi || 'सुनहरा',
      number: data.number ?? 9,
      compatible: data.compatible || '',
      compatibleHi: data.compatibleHi || ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Publish / Post Weekly Horoscope
  const handlePublish = (e) => {
    e.preventDefault();
    const result = saveWeeklyHoroscope(currentSign.id, formData, user?.email || 'Authorized Astrologer');
    if (result.success) {
      const updated = {
        ...currentSign,
        ...formData,
        isCustom: true
      };
      setCurrentSign(updated);
      setIsEditing(false);
      setStatusNotice({
        type: 'success',
        msg: isHi 
          ? 'साप्ताहिक राशिफल सफलतापूर्वक प्रकाशित और पोस्ट हो गया!' 
          : 'Weekly Horoscope successfully published and live!'
      });
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (err) {}
      setTimeout(() => setStatusNotice(null), 4000);
    }
  };

  // Revert back to original default horoscope
  const handleRevert = () => {
    const defaultSign = HOROSCOPE_DATA.find(s => s.id === currentSign.id) || currentSign;
    resetWeeklyHoroscope(currentSign.id);
    setCurrentSign(defaultSign);
    populateFormData(defaultSign);
    setIsEditing(false);
    setStatusNotice({
      type: 'info',
      msg: isHi ? 'मूल राशिफल पुनर्स्थापित किया गया।' : 'Reverted to default horoscope forecast.'
    });
    setTimeout(() => setStatusNotice(null), 4000);
  };

  // Display fields for current viewing mode
  const displayName = isHi 
    ? `${currentSign.nameHi || currentSign.sanskrit} (${currentSign.sanskritHi || currentSign.sanskrit})` 
    : `${currentSign.name} (${currentSign.sanskrit})`;
  const displayElement = isHi 
    ? (currentSign.elementHi || `${currentSign.element} तत्व`) 
    : `${currentSign.element} Element`;
  const displayDates = isHi 
    ? (currentSign.datesHi || currentSign.dates) 
    : currentSign.dates;
  const displayRuler = isHi 
    ? `स्वामी: ${currentSign.rulerHi || currentSign.ruler}` 
    : `Ruled by ${currentSign.ruler}`;
  const displayWeeklyTheme = isHi 
    ? (currentSign.weeklyThemeHi || currentSign.weeklyTheme) 
    : currentSign.weeklyTheme;
  const displayForecast = isHi 
    ? (currentSign.weeklyHi || currentSign.weekly || currentSign.todayHi || currentSign.today) 
    : (currentSign.weekly || currentSign.today);
  const displayLove = isHi 
    ? (currentSign.loveHi || currentSign.love) 
    : currentSign.love;
  const displayCareer = isHi 
    ? (currentSign.careerHi || currentSign.career) 
    : currentSign.career;
  const displayHealth = isHi 
    ? (currentSign.healthHi || currentSign.health) 
    : currentSign.health;
  const displayLuckyDay = isHi 
    ? (currentSign.luckyDayHi || currentSign.luckyDay) 
    : (currentSign.luckyDay || 'Wednesday');
  const displayColor = isHi 
    ? (currentSign.colorHi || currentSign.color) 
    : currentSign.color;
  const displayCompatible = isHi 
    ? (currentSign.compatibleHi || currentSign.compatible) 
    : currentSign.compatible;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#13062c] border border-amber-500/50 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] text-slate-100 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-purple-800/60 bg-gradient-to-r from-[#1c0a3c] via-[#240d4f] to-[#160630] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/80 flex items-center justify-center text-3xl shadow-gold-glow shrink-0">
              <span>{currentSign.symbol}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300">
                  {displayName}
                </h2>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-purple-900/80 text-purple-200 border border-purple-600">
                  {displayElement}
                </span>
                {currentSign.isCustom && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {isHi ? '✨ ज्योतिषी द्वारा पोस्टेड' : '✨ Posted by Astrologer'}
                  </span>
                )}
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

        {/* Status Notice Toast */}
        {statusNotice && (
          <div className={`px-4 py-2.5 text-xs font-medium flex items-center justify-center gap-2 ${
            statusNotice.type === 'success' 
              ? 'bg-emerald-950/80 text-emerald-200 border-b border-emerald-500/40' 
              : 'bg-purple-950/80 text-purple-200 border-b border-purple-500/40'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusNotice.msg}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Dynamic Real-Time Weekly Duration Badge & Theme */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-purple-900/40 to-amber-500/10 border border-amber-500/40 text-xs sm:text-sm">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 uppercase tracking-wider shadow-gold-glow">
                {isHi ? 'साप्ताहिक राशिफल' : 'Weekly Horoscope'}
              </span>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-amber-200 font-semibold bg-black/30 px-2.5 py-1 rounded-lg border border-amber-400/30">
                <Calendar className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>{weeklyDuration}</span>
              </div>
            </div>
            {displayWeeklyTheme && (
              <span className="text-xs sm:text-sm text-amber-300 font-semibold italic">
                ✦ {displayWeeklyTheme}
              </span>
            )}
          </div>

          {/* AUTHORIZED EDITOR CONTROLS (Only visible to the designated Editor ID) */}
          {canEdit && (
            <div className="bg-gradient-to-r from-[#210d3f] via-[#2d1154] to-[#1f0a3c] border border-amber-500/60 rounded-2xl p-3 sm:p-4 shadow-lg flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-300 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      {isHi ? 'अधिकृत ज्योतिषी संपादक' : 'Authorized Astrologer & Editor'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {isHi ? 'संपादक मोड सक्रिय' : 'Editor Active'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate max-w-xs">
                    {user?.email || 'admin@astrotanntra.com'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isEditing
                      ? 'bg-rose-900/60 text-rose-200 border border-rose-500/50 hover:bg-rose-800/80'
                      : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-gold-glow'
                  }`}
                >
                  {isEditing ? (
                    <>
                      <X className="w-3.5 h-3.5" />
                      <span>{isHi ? 'संपादन रद्द करें' : 'Cancel Edit'}</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{isHi ? 'साप्ताहिक राशिफल लिखें / संपादित करें' : 'Write & Post Horoscope'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* EDITING FORM FOR AUTHORIZED EDITOR */}
          {canEdit && isEditing ? (
            <form onSubmit={handlePublish} className="space-y-4 bg-[#180932] border border-amber-500/40 rounded-2xl p-4 sm:p-5">
              
              {/* Form Language Toggle Tabs */}
              <div className="flex items-center justify-between pb-3 border-b border-purple-800/60">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                    {isHi ? 'संपादन भाषा चुनें:' : 'Select Edit Language:'}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-[#100524] p-1 rounded-xl border border-purple-700/60">
                  <button
                    type="button"
                    onClick={() => setEditLangTab('hi')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      editLangTab === 'hi' 
                        ? 'bg-amber-500 text-slate-950 shadow-gold-glow' 
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    🇮🇳 हिन्दी (Hindi)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditLangTab('en')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      editLangTab === 'en' 
                        ? 'bg-amber-500 text-slate-950 shadow-gold-glow' 
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>

              {/* Weekly Theme Input */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  {editLangTab === 'hi' ? 'साप्ताहिक मुख्य थीम / संदेश (Hindi)' : 'Weekly Main Theme (English)'}
                </label>
                <input
                  type="text"
                  value={editLangTab === 'hi' ? formData.weeklyThemeHi : formData.weeklyTheme}
                  onChange={(e) => handleInputChange(editLangTab === 'hi' ? 'weeklyThemeHi' : 'weeklyTheme', e.target.value)}
                  placeholder={editLangTab === 'hi' ? 'उदा: साहस, निर्णायक कदम और नई शुरुआत' : 'e.g. Courage, Decisive Action & Breakthroughs'}
                  className="w-full bg-[#110526] border border-purple-700/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Weekly Main Celestial Forecast Textarea */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {editLangTab === 'hi' 
                      ? 'साप्ताहिक वैदिक ग्रह गोचर फल (मुख्य भविष्यवाणी - Hindi)' 
                      : 'Weekly Celestial Vedic Forecast (Main Prediction - English)'}
                  </span>
                </label>
                <textarea
                  rows={4}
                  value={editLangTab === 'hi' ? formData.weeklyHi : formData.weekly}
                  onChange={(e) => handleInputChange(editLangTab === 'hi' ? 'weeklyHi' : 'weekly', e.target.value)}
                  placeholder={editLangTab === 'hi' 
                    ? 'यहाँ इस सप्ताह के ग्रह गोचर और राशि फल का विस्तृत विवरण लिखें...' 
                    : 'Write the complete weekly astrological forecast and transit analysis here...'}
                  className="w-full bg-[#110526] border border-purple-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
                />
              </div>

              {/* 3 Categories: Love, Career, Health */}
              <div className="space-y-3 pt-2">
                
                {/* Love Category */}
                <div className="p-3.5 rounded-xl bg-[#130628] border border-pink-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-pink-400 font-bold text-xs">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>{editLangTab === 'hi' ? 'प्रेम एवं वैवाहिक संबंध' : 'Love & Relationship Outlook'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-pink-300 font-mono font-bold">{formData.loveScore}%</span>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={formData.loveScore}
                        onChange={(e) => handleInputChange('loveScore', parseInt(e.target.value, 10))}
                        className="w-20 accent-pink-500 cursor-pointer"
                      />
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={editLangTab === 'hi' ? formData.loveHi : formData.love}
                    onChange={(e) => handleInputChange(editLangTab === 'hi' ? 'loveHi' : 'love', e.target.value)}
                    placeholder={editLangTab === 'hi' ? 'साप्ताहिक प्रेम और दांपत्य फल लिखें...' : 'Weekly relationship forecast...'}
                    className="w-full bg-[#0b031b] border border-pink-500/30 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-400"
                  />
                </div>

                {/* Career Category */}
                <div className="p-3.5 rounded-xl bg-[#130628] border border-amber-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{editLangTab === 'hi' ? 'करियर, व्यापार एवं धन' : 'Career, Business & Wealth'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-amber-300 font-mono font-bold">{formData.careerScore}%</span>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={formData.careerScore}
                        onChange={(e) => handleInputChange('careerScore', parseInt(e.target.value, 10))}
                        className="w-20 accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={editLangTab === 'hi' ? formData.careerHi : formData.career}
                    onChange={(e) => handleInputChange(editLangTab === 'hi' ? 'careerHi' : 'career', e.target.value)}
                    placeholder={editLangTab === 'hi' ? 'साप्ताहिक करियर, पदोन्नति व आर्थिक फल लिखें...' : 'Weekly career and finance outlook...'}
                    className="w-full bg-[#0b031b] border border-amber-500/30 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Health Category */}
                <div className="p-3.5 rounded-xl bg-[#130628] border border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                      <Activity className="w-3.5 h-3.5" />
                      <span>{editLangTab === 'hi' ? 'स्वास्थ्य, ऊर्जा एवं जीवन शक्ति' : 'Health & Vitality Outlook'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-emerald-300 font-mono font-bold">{formData.healthScore}%</span>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={formData.healthScore}
                        onChange={(e) => handleInputChange('healthScore', parseInt(e.target.value, 10))}
                        className="w-20 accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={editLangTab === 'hi' ? formData.healthHi : formData.health}
                    onChange={(e) => handleInputChange(editLangTab === 'hi' ? 'healthHi' : 'health', e.target.value)}
                    placeholder={editLangTab === 'hi' ? 'साप्ताहिक स्वास्थ्य व ऊर्जा फल लिखें...' : 'Weekly health & energy advice...'}
                    className="w-full bg-[#0b031b] border border-emerald-500/30 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

              </div>

              {/* Lucky Attributes Inputs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">
                    {editLangTab === 'hi' ? 'शुभ दिन' : 'Lucky Day'}
                  </label>
                  <input
                    type="text"
                    value={editLangTab === 'hi' ? formData.luckyDayHi : formData.luckyDay}
                    onChange={(e) => handleInputChange(editLangTab === 'hi' ? 'luckyDayHi' : 'luckyDay', e.target.value)}
                    className="w-full bg-[#110526] border border-purple-700/80 rounded-lg p-2 text-xs text-amber-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">
                    {editLangTab === 'hi' ? 'शुभ अंक' : 'Lucky Number'}
                  </label>
                  <input
                    type="number"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-[#110526] border border-purple-700/80 rounded-lg p-2 text-xs text-amber-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">
                    {editLangTab === 'hi' ? 'शुभ रंग' : 'Lucky Color'}
                  </label>
                  <input
                    type="text"
                    value={editLangTab === 'hi' ? formData.colorHi : formData.color}
                    onChange={(e) => handleInputChange(editLangTab === 'hi' ? 'colorHi' : 'color', e.target.value)}
                    className="w-full bg-[#110526] border border-purple-700/80 rounded-lg p-2 text-xs text-amber-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">
                    {editLangTab === 'hi' ? 'अनुकूल राशियां' : 'Compatible Signs'}
                  </label>
                  <input
                    type="text"
                    value={editLangTab === 'hi' ? formData.compatibleHi : formData.compatible}
                    onChange={(e) => handleInputChange(editLangTab === 'hi' ? 'compatibleHi' : 'compatible', e.target.value)}
                    className="w-full bg-[#110526] border border-purple-700/80 rounded-lg p-2 text-xs text-amber-200"
                  />
                </div>
              </div>

              {/* Editor Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-purple-800/60">
                <button
                  type="button"
                  onClick={handleRevert}
                  className="px-3.5 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-900/80 border border-purple-700/60 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isHi ? 'मूल राशिफल पर लौटें' : 'Revert to Original'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl bg-cosmic-800 hover:bg-slate-700 border border-purple-700/60 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {isHi ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="gold-btn px-5 py-2 rounded-xl font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-gold-glow"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isHi ? 'साप्ताहिक राशिफल पोस्ट करें' : 'Publish & Post Horoscope'}</span>
                  </button>
                </div>
              </div>

            </form>
          ) : (
            <>
              {/* READ-ONLY VIEW (Rendered for all regular visitors, and for editor when not editing) */}
              
              {/* Main Weekly Forecast Box */}
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
                        <div className="bg-pink-400 h-full rounded-full" style={{ width: `${currentSign.loveScore || 85}%` }} />
                      </div>
                      <span className="text-xs font-mono text-pink-300 font-bold">{currentSign.loveScore || 85}%</span>
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
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: `${currentSign.careerScore || 85}%` }} />
                      </div>
                      <span className="text-xs font-mono text-amber-300 font-bold">{currentSign.careerScore || 85}%</span>
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
                        <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${currentSign.healthScore || 85}%` }} />
                      </div>
                      <span className="text-xs font-mono text-emerald-300 font-bold">{currentSign.healthScore || 85}%</span>
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
                  <strong className="text-amber-300 text-sm sm:text-base font-bold">{currentSign.number}</strong>
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

              {/* Discreet Editor Sign-In Link for unauthenticated visitors */}
              {!user && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenAuth) onOpenAuth('editor_login');
                    }}
                    className="text-[11px] text-purple-400/70 hover:text-amber-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Lock className="w-3 h-3" />
                    <span>{isHi ? 'अधिकृत ज्योतिषी संपादक लॉगिन' : 'Authorized Astrologer & Editor Sign In'}</span>
                  </button>
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-800/60 bg-[#160731] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              const topic = isHi 
                ? `${currentSign.nameHi || currentSign.sanskrit} व्यक्तिगत ज्योतिषीय परामर्श`
                : `${currentSign.name} Personalized Astrology Reading`;
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

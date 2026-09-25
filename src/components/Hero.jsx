import React, { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Headphones, 
  Star,
  ChevronDown,
  Lock
} from 'lucide-react';
import { ArmillarySphereArtwork, GaneshaArtwork } from './CelestialArtwork';
import PlaceAutocomplete from './PlaceAutocomplete';
import { resolveLocation } from '../services/geoService';
import { parseDateOfBirth, parseTimeOfBirth } from '../utils/vedicCalculations';

export default function Hero({ 
  onGenerateKundli, 
  onOpenConsultation, 
  onOpenTarot, 
  user,
  lang 
}) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [place, setPlace] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
    tz: 5.5,
    tzName: 'Asia/Kolkata'
  });
  const [gender, setGender] = useState('Male');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Time parsing & AM/PM detection
  const timeInfo = parseTimeOfBirth(tob);
  const isPM = tob ? timeInfo.hour >= 12 : false;

  const handleToggleAmPm = (target) => {
    const currentTob = tob || '04:30';
    const parsed = parseTimeOfBirth(currentTob);
    let h = parsed.hour;
    const m = String(parsed.min).padStart(2, '0');

    if (target === 'PM' && h < 12) {
      h += 12;
    } else if (target === 'AM' && h >= 12) {
      h -= 12;
    }
    setTob(`${String(h).padStart(2, '0')}:${m}`);
  };

  // Formatted date preview for clarity (e.g. "1 May 2000")
  const datePreview = dob ? (() => {
    const parsed = parseDateOfBirth(dob);
    const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthsHi = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
    const mName = lang === 'hi' ? monthsHi[parsed.month - 1] : monthsEn[parsed.month - 1];
    return `${parsed.day} ${mName} ${parsed.year}`;
  })() : null;

  // Formatted time preview for clarity (e.g. "04:30 AM (सुबह)")
  const timePreview = tob ? (() => {
    const parsed = parseTimeOfBirth(tob);
    const h12 = parsed.hour % 12 || 12;
    const pad = (n) => String(n).padStart(2, '0');
    const ampm = parsed.hour >= 12 ? 'PM' : 'AM';
    const periodHi = parsed.hour >= 12 ? 'दोपहर/शाम' : 'सुबह/प्रातः';
    const periodEn = parsed.hour >= 12 ? 'Evening/PM' : 'Morning/AM';
    return `${pad(h12)}:${pad(parsed.min)} ${ampm} (${lang === 'hi' ? periodHi : periodEn})`;
  })() : null;

  // Clear/clean form inputs every time Hero mounts (on refresh or when returning to Home page)
  useEffect(() => {
    setName('');
    setDob('');
    setTob('');
    setPlace('');
    setCoordinates({
      lat: null,
      lng: null,
      tz: 5.5,
      tzName: 'Asia/Kolkata'
    });
    setGender('Male');
  }, []);

  const handleSelectLocation = (loc) => {
    setPlace(loc.formatted);
    setCoordinates({
      lat: loc.lat,
      lng: loc.lng,
      tz: loc.tz,
      tzName: loc.tzName
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!dob) return;
    if (!tob) return;
    if (!place.trim()) return;

    setIsSubmitting(true);
    let activeCoords = { ...coordinates };

    // If coordinates are missing or user edited the text manually, live-resolve
    try {
      const resolved = await resolveLocation(place, dob);
      if (resolved && resolved.lat && resolved.lng) {
        activeCoords = resolved;
      }
    } catch (err) {
      console.warn('Geocoding resolution fallback:', err);
    } finally {
      setIsSubmitting(false);
    }

    onGenerateKundli({
      name: name.trim(),
      dob,
      tob,
      place: place.trim(),
      gender: gender || 'Male',
      lat: activeCoords.lat || 28.6139,
      lng: activeCoords.lng || 77.2090,
      tz: activeCoords.tz !== undefined ? activeCoords.tz : 5.5
    });

    // If user is already logged in, immediately clean all form fields
    if (user) {
      setName('');
      setDob('');
      setTob('');
      setPlace('');
      setCoordinates({
        lat: null,
        lng: null,
        tz: 5.5,
        tzName: 'Asia/Kolkata'
      });
      setGender('Male');
    }
  };

  return (
    <section className="relative w-full min-h-[680px] overflow-hidden cosmic-gradient-bg pt-8 pb-16 px-4 md:px-8 border-b border-amber-500/20">
      
      {/* Background Sacred Vector & Glow Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Armillary sphere on the left as in screenshot */}
        <div className="absolute -left-24 top-6 w-[420px] h-[420px] opacity-35 animate-float hidden lg:block">
          <ArmillarySphereArtwork />
        </div>

        {/* Ambient Nebula Light Cones */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-[600px] h-[550px] bg-amber-600/20 rounded-full blur-3xl" />

        {/* Star Sparkles */}
        <div className="absolute top-24 left-1/3 text-amber-200/40 text-xs">✦</div>
        <div className="absolute top-48 left-1/2 text-purple-200/50 text-sm">✧</div>
        <div className="absolute bottom-32 left-1/6 text-amber-300/40 text-xs">✦</div>
        <div className="absolute top-20 right-1/4 text-amber-200/40 text-sm">✦</div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
        
        {/* Left Column: Hero Text, CTAs, & Stats */}
        <div className="lg:col-span-7 flex flex-col items-start text-left pt-2">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>{lang === 'hi' ? 'हम भाग्य नहीं बदलते' : "WE DON'T CHANGE DESTINY"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-5 font-cinzel">
            We Change <br />
            <span className="gold-gradient-text drop-shadow-[0_4px_25px_rgba(245,158,11,0.5)]">
              Your Direction
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mb-8 leading-relaxed font-normal">
            {lang === 'hi' 
              ? 'वैदिक ज्योतिष और टैरो कार्ड्स के माध्यम से सटीक मार्गदर्शन प्राप्त करें और जीवन के हर मोड़ पर सही और आत्मविश्वासपूर्ण निर्णय लें।'
              : 'Get accurate guidance through Vedic Astrology and Tarot Reading to make confident life decisions.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12 w-full sm:w-auto">
            <button
              onClick={onOpenConsultation}
              className="gold-btn px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 w-full sm:w-auto cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>{lang === 'hi' ? 'वैदिक परामर्श बुक करें' : 'Book Vedic Consultation'}</span>
            </button>

            <button
              onClick={onOpenTarot}
              className="purple-btn px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 w-full sm:w-auto cursor-pointer shadow-md backdrop-blur-sm"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? 'टैरो रीडिंग बुक करें' : 'Book Tarot Reading'}</span>
            </button>
          </div>

          {/* Trust Badges Bar (10K+ Happy Clients, 50+ Expert Astrologers, 98% Accurate Guidance, 24/7 Support) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-purple-800/40 w-full">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-base">10K+</span>
                <span className="text-xs text-slate-300">Happy Clients</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-base">50+</span>
                <span className="text-xs text-slate-300">Expert Astrologers</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-base">98%</span>
                <span className="text-xs text-slate-300">Accurate Guidance</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-base">24/7</span>
                <span className="text-xs text-slate-300">Support Available</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: "CREATE YOUR KUNDLI" Card + Divine Ganesha Art */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          {/* Golden Ganesha & Diya artwork positioning beside/behind card on large screens */}
          <div className="absolute -right-28 -top-14 w-[340px] h-[480px] opacity-40 lg:opacity-50 pointer-events-none hidden xl:block animate-glow">
            <GaneshaArtwork />
          </div>

          {/* Form Card matching screenshot 1 */}
          <div id="kundli-form" className="w-full max-w-md bg-[#180b33]/95 backdrop-blur-xl border border-amber-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.25)] relative z-20">
            
            {/* Ornate corner flourishes */}
            <div className="absolute top-2 left-2 text-amber-400/40 text-xs">❖</div>
            <div className="absolute top-2 right-2 text-amber-400/40 text-xs">❖</div>
            <div className="absolute bottom-2 left-2 text-amber-400/40 text-xs">❖</div>
            <div className="absolute bottom-2 right-2 text-amber-400/40 text-xs">❖</div>

            <div className="text-center mb-6">
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-amber-300 drop-shadow">
                {lang === 'hi' ? 'अपनी कुण्डली बनाएं' : 'CREATE YOUR KUNDLI'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light">
                {lang === 'hi' ? 'कुछ ही पलों में अपनी व्यक्तिगत जन्म कुण्डली पाएं' : 'Get your personalized birth chart in just a few clicks'}
              </p>
            </div>

            <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
              
              {/* Full Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-300">
                  <User className="w-4 h-4 text-amber-400/80" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'hi' ? 'पूरा नाम दर्ज करें' : 'Full Name'}
                  autoComplete="off"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#231248]/80 border border-purple-600/40 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>

              {/* Date of Birth */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-300">
                  <Calendar className="w-4 h-4 text-amber-400/80" />
                </div>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="yyyy-mm-dd"
                  autoComplete="off"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#231248]/80 border border-purple-600/40 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>

              {/* Time of Birth with explicit AM / PM toggle */}
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-300">
                    <Clock className="w-4 h-4 text-amber-400/80" />
                  </div>
                  <input
                    type="time"
                    required
                    value={tob}
                    onChange={(e) => setTob(e.target.value)}
                    placeholder="--:--"
                    autoComplete="off"
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#231248]/80 border border-purple-600/40 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                </div>

                {/* AM / PM Segmented Control */}
                <div className="flex rounded-xl overflow-hidden border border-purple-600/50 bg-[#231248]/90 p-1 shrink-0 gap-1 h-[46px] items-center">
                  <button
                    type="button"
                    onClick={() => handleToggleAmPm('AM')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tob && !isPM 
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md font-extrabold' 
                        : 'text-slate-400 hover:text-amber-200'
                    }`}
                    title={lang === 'hi' ? 'सुबह / प्रातः (AM)' : 'Morning (AM)'}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleAmPm('PM')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tob && isPM 
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md font-extrabold' 
                        : 'text-slate-400 hover:text-amber-200'
                    }`}
                    title={lang === 'hi' ? 'दोपहर / शाम (PM)' : 'Evening / Afternoon (PM)'}
                  >
                    PM
                  </button>
                </div>
              </div>

              {/* Live Date & Time Preview for complete clarity */}
              {(datePreview || timePreview) && (
                <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-300">
                  {datePreview && (
                    <span className="flex items-center gap-1 font-medium">
                      <span>📅</span>
                      <span>{datePreview}</span>
                    </span>
                  )}
                  {timePreview && (
                    <span className="flex items-center gap-1 font-semibold text-amber-200">
                      <span>⏰</span>
                      <span>{timePreview}</span>
                    </span>
                  )}
                </div>
              )}

              {/* Place of Birth with Live Free Map Autocomplete */}
              <PlaceAutocomplete
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                onSelectLocation={handleSelectLocation}
                dateStr={dob}
                required
                placeholder={lang === 'hi' ? 'जन्म स्थान खोजें (उदा. दिल्ली, पटना, मुंबई)...' : 'Place of Birth (e.g. Delhi, Mumbai, Paris)...'}
              />

              {/* Gender Selector */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-300">
                  <User className="w-4 h-4 text-amber-400/80" />
                </div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#231248]/80 border border-purple-600/40 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all appearance-none cursor-pointer"
                >
                  <option value="Male" className="bg-[#170932]">{lang === 'hi' ? 'पुरुष (Male)' : 'Male'}</option>
                  <option value="Female" className="bg-[#170932]">{lang === 'hi' ? 'महिला (Female)' : 'Female'}</option>
                  <option value="Other" className="bg-[#170932]">{lang === 'hi' ? 'अन्य (Other)' : 'Other'}</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-purple-300">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* Submit CTA: ★ GENERATE KUNDLI */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 rounded-xl gold-btn font-extrabold text-base tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-gold-glow disabled:opacity-70 disabled:cursor-not-allowed group transition-all"
              >
                {user ? (
                  <Star className="w-4 h-4 fill-slate-900 text-slate-900" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-900 group-hover:scale-110 transition-transform" />
                )}
                <span>
                  {isSubmitting 
                    ? (lang === 'hi' ? 'स्थान खोज रहे हैं...' : 'LOCATING ON MAP...') 
                    : (user 
                        ? (lang === 'hi' ? '★ कुण्डली बनाएं' : '★ GENERATE KUNDLI')
                        : (lang === 'hi' ? '★ कुण्डली बनाएं (प्रीमियम)' : '★ GENERATE KUNDLI (PREMIUM)'))}
                </span>
              </button>

              {!user && (
                <div className="text-center mt-2 text-[11px] text-amber-300/80 flex items-center justify-center gap-1.5 animate-fadeIn">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    {lang === 'hi' 
                      ? 'प्रीमियम सुविधा: कुण्डली देखने के लिए लॉगिन / साइन अप आवश्यक' 
                      : 'Premium feature: Sign In or Sign Up required to view Kundli'}
                  </span>
                </div>
              )}

            </form>
          </div>

        </div>

      </div>

    </section>
  );
}

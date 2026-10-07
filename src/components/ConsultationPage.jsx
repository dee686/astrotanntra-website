import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Home, 
  Sparkles, 
  Star, 
  Phone, 
  Video, 
  MessageSquare, 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Lock, 
  Download, 
  Share2, 
  ChevronRight, 
  User, 
  Mail, 
  Tag, 
  AlertCircle 
} from 'lucide-react';
import { ASTROLOGERS } from '../data/astrologersData';
import confetti from 'canvas-confetti';

export default function ConsultationPage({ 
  initialTopic, 
  onGoBack, 
  lang = 'en', 
  user = null 
}) {
  const isHi = lang === 'hi';

  // Multi-step wizard state:
  // 1: Choose Astrologer
  // 2: Select Mode
  // 3: Select Date
  // 4: Select Time Slot
  // 5: Review & Payment
  // 6: Confirmation
  const [currentStep, setCurrentStep] = useState(1);

  // Selections
  const [selectedAstrologer, setSelectedAstrologer] = useState(ASTROLOGERS[0]);
  const [consultationMode, setConsultationMode] = useState('call'); // 'call', 'video', 'chat'
  
  // Date selection
  const today = new Date();
  const formatDateStr = (d) => d.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(formatDateStr(today));

  // Time slot selection
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM - 11:30 AM');
  
  // Client details
  const [userName, setUserName] = useState(user?.name || '');
  const [userPhone, setUserPhone] = useState(user?.phone || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [queryTopic, setQueryTopic] = useState(initialTopic || (isHi ? 'करियर, विवाह एवं जीवन मार्गदर्शन' : 'Career, Marriage & Life Guidance'));
  const [birthDetails, setBirthDetails] = useState('');

  // Payment details
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'netbanking'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [couponCode, setCouponCode] = useState('ASTROFIRST');
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponError, setCouponError] = useState('');
  const [formError, setFormError] = useState('');

  // Scroll to top on step transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Generate next 7 days for quick calendar chips
  const quickDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const dateStr = formatDateStr(d);
    const dayName = i === 0 
      ? (isHi ? 'आज' : 'Today') 
      : i === 1 
        ? (isHi ? 'कल' : 'Tomorrow') 
        : d.toLocaleDateString(isHi ? 'hi-IN' : 'en-US', { weekday: 'short' });
    const formattedDate = d.toLocaleDateString(isHi ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'short' });
    return { dateStr, dayName, formattedDate, raw: d };
  });

  // Time Slots categorized by time of day
  const slotCategories = [
    {
      id: 'morning',
      label: isHi ? 'प्रातःकालीन स्लॉट' : 'Morning Slots',
      sub: isHi ? '09:30 AM - 12:15 PM' : '09:30 AM - 12:15 PM',
      icon: '🌅',
      slots: [
        '09:30 AM - 10:00 AM',
        '10:15 AM - 10:45 AM',
        '11:00 AM - 11:30 AM',
        '11:45 AM - 12:15 PM'
      ]
    },
    {
      id: 'afternoon',
      label: isHi ? 'दोपहर स्लॉट' : 'Afternoon Slots',
      sub: isHi ? '02:00 PM - 05:00 PM' : '02:00 PM - 05:00 PM',
      icon: '☀️',
      slots: [
        '02:00 PM - 02:30 PM',
        '02:45 PM - 03:15 PM',
        '03:45 PM - 04:15 PM',
        '04:30 PM - 05:00 PM'
      ]
    },
    {
      id: 'evening',
      label: isHi ? 'सांध्य एवं रात्रि स्लॉट' : 'Evening & Night Slots',
      sub: isHi ? '06:00 PM - 09:30 PM' : '06:00 PM - 09:30 PM',
      icon: '🌙',
      slots: [
        '06:00 PM - 06:30 PM',
        '07:00 PM - 07:30 PM',
        '08:00 PM - 08:30 PM',
        '09:00 PM - 09:30 PM'
      ]
    }
  ];

  // Price calculations
  const basePrice = selectedAstrologer ? selectedAstrologer.pricePerMin * 30 : 750;
  const discountAmount = couponApplied ? 200 : 0;
  const finalPrice = Math.max(basePrice - discountAmount, 350);

  // Apply Coupon Code
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'ASTROFIRST' || clean === 'VEDIC200' || clean === 'BLESSING') {
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      setCouponError(isHi ? 'अमान्य कूपन कोड। कृपया ASTROFIRST का उपयोग करें।' : 'Invalid coupon code. Try using ASTROFIRST');
    }
  };

  // Complete Payment & finalize booking
  const handleCompletePayment = (e) => {
    e.preventDefault();
    setFormError('');

    if (!userName.trim()) {
      setFormError(isHi ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
      return;
    }
    const cleanPhone = userPhone.replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      setFormError(isHi ? 'कृपया 10-अंकीय मान्य मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsProcessingPayment(true);
    
    setTimeout(() => {
      setIsProcessingPayment(false);
      const generatedId = `ASTRO-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(generatedId);
      setCurrentStep(6);

      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 }
        });
      } catch (err) {}
    }, 1200);
  };

  // Step definition details for progress bar
  const STEPS = [
    { num: 1, title: isHi ? 'ज्योतिषी' : 'Astrologer' },
    { num: 2, title: isHi ? 'माध्यम' : 'Mode' },
    { num: 3, title: isHi ? 'तिथि' : 'Date' },
    { num: 4, title: isHi ? 'समय' : 'Slot' },
    { num: 5, title: isHi ? 'भुगतान' : 'Payment' },
    { num: 6, title: isHi ? 'पुष्टि' : 'Confirmed' }
  ];

  // Helper mode info
  const getModeInfo = (m) => {
    switch (m) {
      case 'video':
        return {
          label: isHi ? 'वीडियो कॉल' : 'Video Call',
          sub: isHi ? 'फेस-टू-फेस एचडी सत्र' : 'Face-to-Face HD',
          icon: Video,
          color: 'text-purple-400'
        };
      case 'chat':
        return {
          label: isHi ? 'लाइव चैट' : 'Live Chat',
          sub: isHi ? 'तत्काल प्रश्नोत्तर एवं उपाय' : 'Instant Q&A & Remedies',
          icon: MessageSquare,
          color: 'text-emerald-400'
        };
      case 'call':
      default:
        return {
          label: isHi ? 'ऑडियो कॉल' : 'Audio Call',
          sub: isHi ? '100% निजी एचडी वॉयस कॉल' : 'HD Voice Consultation',
          icon: Phone,
          color: 'text-amber-400'
        };
    }
  };

  const modeDetails = getModeInfo(consultationMode);

  return (
    <div className="min-h-screen bg-[#080214] text-slate-100 flex flex-col relative pb-20">
      
      {/* Background Starfield and Nebula Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 right-1/4 w-[450px] h-[450px] bg-amber-600/10 rounded-full blur-[130px]" />
      </div>

      {/* Top Header / Breadcrumb Bar */}
      <header className="sticky top-0 z-30 bg-[#0e0422]/90 backdrop-blur-md border-b border-purple-800/50 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={currentStep > 1 && currentStep < 6 ? () => setCurrentStep(prev => prev - 1) : onGoBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-700/60 text-slate-300 hover:text-amber-300 hover:border-amber-400/60 transition-all text-xs sm:text-sm font-medium cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>
                {currentStep > 1 && currentStep < 6 
                  ? (isHi ? 'पिछला चरण' : 'Previous Step') 
                  : (isHi ? 'मुख्य पृष्ठ' : 'Back to Home')}
              </span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <span className="hover:text-amber-300 cursor-pointer" onClick={onGoBack}>
                {isHi ? 'होम' : 'Home'}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-amber-300 font-semibold">
                {isHi ? 'वैदिक परामर्श बुकिंग' : 'Book Vedic Consultation'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {isHi ? 'लाइव एवं पूर्णतः गोपनीय' : 'Live & Confidential'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-10 relative z-10 flex-1 flex flex-col">
        
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? 'प्रत्यक्ष 1-on-1 वैदिक मार्गदर्शन' : 'DIRECT 1-ON-1 VEDIC GUIDANCE'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-cinzel text-white leading-tight">
            {isHi ? 'वैदिक परामर्श बुक करें' : 'Book Your Vedic Consultation'}
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto mt-2">
            {isHi 
              ? 'सत्यापित वैदिक आचार्यों एवं ज्योतिषियों से अपनी कुण्डली, करियर, प्रेम, विवाह एवं जीवन के गूढ़ रहस्यों पर सटीक मार्गदर्शन प्राप्त करें।'
              : 'Consult verified Vedic Masters & Jyotish Acharyas for personalized guidance on career, marriage, finances, and destiny.'}
          </p>
        </div>

        {/* Step-by-Step Progress Tracker */}
        <div className="mb-8 sm:mb-10 bg-[#14072f]/80 backdrop-blur-md border border-purple-800/60 rounded-2xl p-3 sm:p-5 shadow-lg">
          <div className="flex items-center justify-between relative">
            
            {/* Background connecting line */}
            <div className="absolute top-4 sm:top-5 left-4 right-4 h-0.5 bg-purple-900/80 z-0" />
            <div 
              className="absolute top-4 sm:top-5 left-4 h-0.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-400 transition-all duration-500 z-0" 
              style={{ width: `${((Math.min(currentStep, 6) - 1) / (STEPS.length - 1)) * 100}%` }}
            />

            {STEPS.map((s) => {
              const isPassed = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              const isClickable = s.num < currentStep && currentStep < 6;

              return (
                <div 
                  key={s.num} 
                  onClick={() => isClickable && setCurrentStep(s.num)}
                  className={`flex flex-col items-center relative z-10 select-none ${isClickable ? 'cursor-pointer group' : ''}`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                    isPassed 
                      ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400' 
                      : isCurrent 
                        ? 'bg-amber-400 text-slate-950 font-extrabold ring-4 ring-amber-400/40 shadow-gold-glow scale-110' 
                        : 'bg-[#1e0d42] text-slate-400 border border-purple-700/60'
                  }`}>
                    {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                  </div>
                  <span className={`text-[10px] sm:text-xs mt-2 font-medium transition-colors text-center ${
                    isCurrent 
                      ? 'text-amber-300 font-bold' 
                      : isPassed 
                        ? 'text-emerald-300' 
                        : 'text-slate-400'
                  }`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Summary Breadcrumb (shown on Steps 2, 3, 4, 5) */}
        {currentStep >= 2 && currentStep <= 5 && (
          <div className="mb-6 p-3 sm:p-4 bg-[#1b0a3c]/90 border border-amber-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              
              {/* Astrologer Badge */}
              <div 
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 bg-[#261054] px-2.5 py-1.5 rounded-xl border border-purple-700/60 cursor-pointer hover:border-amber-400/60 transition-colors"
                title={isHi ? 'ज्योतिषी बदलने के लिए क्लिक करें' : 'Click to change astrologer'}
              >
                <img 
                  src={selectedAstrologer.avatar} 
                  alt={selectedAstrologer.name} 
                  className="w-6 h-6 rounded-full object-cover border border-amber-400"
                />
                <span className="font-semibold text-slate-200 truncate max-w-[130px] sm:max-w-none">
                  {selectedAstrologer.name}
                </span>
                <span className="text-[10px] text-amber-400">★ {selectedAstrologer.rating}</span>
              </div>

              {/* Mode Badge (if chosen) */}
              {currentStep >= 3 && (
                <div 
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-1.5 bg-[#261054] px-2.5 py-1.5 rounded-xl border border-purple-700/60 cursor-pointer hover:border-amber-400/60 transition-colors"
                  title={isHi ? 'माध्यम बदलने के लिए क्लिक करें' : 'Click to change mode'}
                >
                  <modeDetails.icon className={`w-4 h-4 ${modeDetails.color}`} />
                  <span className="font-semibold text-slate-200">{modeDetails.label}</span>
                </div>
              )}

              {/* Date Badge (if chosen) */}
              {currentStep >= 4 && (
                <div 
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-1.5 bg-[#261054] px-2.5 py-1.5 rounded-xl border border-purple-700/60 cursor-pointer hover:border-amber-400/60 transition-colors"
                  title={isHi ? 'तिथि बदलने के लिए क्लिक करें' : 'Click to change date'}
                >
                  <CalendarIcon className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-slate-200">{selectedDate}</span>
                </div>
              )}

              {/* Time Slot Badge (if chosen) */}
              {currentStep >= 5 && (
                <div 
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-1.5 bg-[#261054] px-2.5 py-1.5 rounded-xl border border-purple-700/60 cursor-pointer hover:border-amber-400/60 transition-colors"
                  title={isHi ? 'समय बदलने के लिए क्लिक करें' : 'Click to change slot'}
                >
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-slate-200">{selectedSlot}</span>
                </div>
              )}

            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">{isHi ? '30 मिनट सत्र' : '30-Min Session'}</span>
              <span className="text-sm sm:text-base font-bold text-amber-300">
                ₹{finalPrice} <span className="text-xs line-through text-slate-400 font-normal">₹{basePrice}</span>
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 1: CHOOSE ASTROLOGER
        ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-800/60 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  {isHi ? 'चरण 1: अपने वैदिक ज्योतिषी चुनें' : 'Step 1: Choose Your Astrologer'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {isHi 
                    ? 'अपनी समस्या के अनुरूप अनुभवी एवं सत्यापित ज्योतिषी का चयन करें' 
                    : 'Select from our verified panel of Vedic Masters, KP Specialists, and Tarot Mystics'}
                </p>
              </div>
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 self-start sm:self-auto">
                ● {isHi ? 'सभी 4 ज्योतिषी आज ऑनलाइन उपलब्ध' : 'All 4 Astrologers Available Today'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {ASTROLOGERS.map((astro) => {
                const isSelected = selectedAstrologer.id === astro.id;
                const sessionCost = astro.pricePerMin * 30;

                return (
                  <div
                    key={astro.id}
                    onClick={() => setSelectedAstrologer(astro)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                      isSelected
                        ? 'bg-[#230d4b] border-amber-400 shadow-gold-glow scale-[1.01]'
                        : 'bg-[#150730]/90 border-purple-800/60 hover:border-amber-400/50 hover:bg-[#1a093d]'
                    }`}
                  >
                    {/* Selected Check Badge */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}

                    <div>
                      {/* Top Row: Avatar & Basic Details */}
                      <div className="flex items-start gap-4">
                        <div className="relative shrink-0">
                          <img
                            src={astro.avatar}
                            alt={astro.name}
                            className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400/80 shadow-md"
                          />
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#150730]" title="Online" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-bold text-base sm:text-lg text-slate-100 group-hover:text-amber-300 transition-colors truncate">
                              {astro.name}
                            </h3>
                          </div>
                          
                          <p className="text-xs text-amber-200/90 font-medium mt-0.5">
                            {astro.title}
                          </p>

                          <div className="flex items-center gap-3 mt-2 text-xs text-slate-300">
                            <span className="text-amber-400 font-bold flex items-center gap-1">
                              ★ {astro.rating}
                              <span className="text-slate-400 text-[10px] font-normal">({astro.reviewsCount})</span>
                            </span>
                            <span>•</span>
                            <span className="text-emerald-400 font-medium">{astro.experience}</span>
                          </div>
                        </div>
                      </div>

                      {/* Badges / Specialties */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {astro.specialties.slice(0, 3).map((spec, i) => (
                          <span 
                            key={i} 
                            className="text-[10px] px-2 py-0.5 rounded-md bg-purple-900/60 text-purple-200 border border-purple-700/50"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      {/* Languages */}
                      <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                        <span className="text-slate-400 font-medium">{isHi ? 'भाषा:' : 'Languages:'}</span>
                        <span>{astro.languages.join(', ')}</span>
                      </div>
                    </div>

                    {/* Bottom Row: Price & Action */}
                    <div className="mt-4 pt-3.5 border-t border-purple-800/40 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">{isHi ? '30 मिनट परामर्श शुल्क' : '30-Min Consultation'}</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-extrabold text-amber-300">₹{sessionCost}</span>
                          <span className="text-[11px] text-slate-400 font-normal">
                            (₹{astro.pricePerMin}/{isHi ? 'मिनट' : 'min'})
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAstrologer(astro);
                          setCurrentStep(2);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'gold-btn text-slate-950 shadow-md'
                            : 'bg-purple-900/70 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-purple-600/60'
                        }`}
                      >
                        <span>{isHi ? 'चुनें एवं आगे बढ़ें' : 'Select & Continue'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Step 1 Footer CTA */}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {isHi ? 'चयनित ज्योतिषी:' : 'Selected:'} <strong className="text-amber-300">{selectedAstrologer.name}</strong>
              </span>

              <button
                onClick={() => setCurrentStep(2)}
                className="gold-btn px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>{isHi ? 'माध्यम चुनें (अगला चरण)' : 'Choose Mode (Next Step)'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 2: SELECT CONSULTATION MODE
        ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-purple-800/60 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300 flex items-center gap-2">
                <modeDetails.icon className="w-5 h-5 text-amber-400" />
                {isHi ? 'चरण 2: परामर्श का माध्यम चुनें' : 'Step 2: Select Consultation Mode'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {isHi 
                  ? `${selectedAstrologer.name} के साथ आप किस प्रकार जुड़ना चाहते हैं?` 
                  : `Choose how you want to connect with ${selectedAstrologer.name}`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              
              {/* Mode 1: Audio Call */}
              <div
                onClick={() => setConsultationMode('call')}
                className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                  consultationMode === 'call'
                    ? 'bg-[#240d4f] border-amber-400 shadow-gold-glow scale-[1.02]'
                    : 'bg-[#150730]/90 border-purple-800/60 hover:border-amber-400/50 hover:bg-[#1a093d]'
                }`}
              >
                {consultationMode === 'call' && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-4 shadow-sm">
                    <Phone className="w-7 h-7" />
                  </div>
                  
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    {isHi ? 'सर्वाधिक लोकप्रिय' : 'Most Popular'}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-white mt-3">
                    {isHi ? 'ऑडियो कॉल' : 'Audio Call'}
                  </h3>
                  <p className="text-xs text-amber-200/90 font-medium">
                    {isHi ? 'एचडी वॉयस परामर्श' : 'HD Voice Consultation'}
                  </p>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {isHi 
                      ? '100% निजी एवं गोपनीय फोन/व्हाट्सएप ऑडियो कॉल। बिना किसी वीडियो झंझट के विस्तार से चर्चा करें।'
                      : '100% private phone consultation. High-fidelity voice, crystal-clear sound, and private discussion.'}
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isHi ? 'कॉल रिकॉर्डिंग उपलब्ध' : 'Call recording provided'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isHi ? 'किसी ऐप इंस्टॉलेशन की आवश्यकता नहीं' : 'Direct cellular / WhatsApp connect'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isHi ? '30 मिनट का संपूर्ण सत्र' : 'Full 30-minute dedicated slot'}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-800/40">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConsultationMode('call');
                      setCurrentStep(3);
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      consultationMode === 'call'
                        ? 'gold-btn text-slate-950 shadow-md'
                        : 'bg-purple-900/60 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-purple-700/60'
                    }`}
                  >
                    <span>{isHi ? 'ऑडियो कॉल चुनें ➔' : 'Select Audio Call ➔'}</span>
                  </button>
                </div>
              </div>

              {/* Mode 2: Video Call */}
              <div
                onClick={() => setConsultationMode('video')}
                className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                  consultationMode === 'video'
                    ? 'bg-[#240d4f] border-amber-400 shadow-gold-glow scale-[1.02]'
                    : 'bg-[#150730]/90 border-purple-800/60 hover:border-amber-400/50 hover:bg-[#1a093d]'
                }`}
              >
                {consultationMode === 'video' && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 mb-4 shadow-sm">
                    <Video className="w-7 h-7" />
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                    {isHi ? 'फेस-टू-फेस अनुभव' : 'Face-to-Face'}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-white mt-3">
                    {isHi ? 'वीडियो कॉल' : 'Video Call'}
                  </h3>
                  <p className="text-xs text-purple-200/90 font-medium">
                    {isHi ? 'लाइव कुण्डली स्क्रीन शेयर' : 'Live Chart Screen Sharing'}
                  </p>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {isHi 
                      ? 'ज्योतिषी के साथ आमने-सामने वीडियो सत्र। अपनी जन्म कुण्डली, ग्रह चाल एवं हस्तरेखाओं का लाइव विश्लेषण देखें।'
                      : 'Interactive face-to-face video session. Review your birth chart and planetary yogas together on screen.'}
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isHi ? 'लाइव कुण्डली विश्लेषण' : 'Live Kundli chart walkthrough'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isHi ? 'फेस व हस्तरेखा दर्शन' : 'Face reading & palm study'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isHi ? 'गूगल मीट / जूम लिंक' : 'One-click Google Meet / Zoom link'}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-800/40">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConsultationMode('video');
                      setCurrentStep(3);
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      consultationMode === 'video'
                        ? 'gold-btn text-slate-950 shadow-md'
                        : 'bg-purple-900/60 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-purple-700/60'
                    }`}
                  >
                    <span>{isHi ? 'वीडियो कॉल चुनें ➔' : 'Select Video Call ➔'}</span>
                  </button>
                </div>
              </div>

              {/* Mode 3: Live Chat */}
              <div
                onClick={() => setConsultationMode('chat')}
                className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                  consultationMode === 'chat'
                    ? 'bg-[#240d4f] border-amber-400 shadow-gold-glow scale-[1.02]'
                    : 'bg-[#150730]/90 border-purple-800/60 hover:border-amber-400/50 hover:bg-[#1a093d]'
                }`}
              >
                {consultationMode === 'chat' && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-4 shadow-sm">
                    <MessageSquare className="w-7 h-7" />
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    {isHi ? 'लिखित उपाय' : 'Written Remedies'}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-white mt-3">
                    {isHi ? 'लाइव चैट' : 'Live Chat'}
                  </h3>
                  <p className="text-xs text-emerald-200/90 font-medium">
                    {isHi ? 'तत्काल प्रश्नोत्तर व पीडीएफ' : 'Instant Q&A with Report'}
                  </p>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {isHi 
                      ? 'सुरक्षित निजी चैट रूम। अपने सभी प्रश्न पूछें तथा लिखित वैदिक उपाय एवं रत्न परामर्श सहेज कर रखें।'
                      : 'Discreet 1-on-1 private chat session. Receive detailed written astrological remedies that you can keep forever.'}
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isHi ? 'लिखित मंत्र व रत्न उपाय' : 'Written mantras & gemstone advice'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isHi ? 'चैट हिस्ट्री कभी भी पढ़ें' : 'Permanent readable transcript'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isHi ? 'पूर्णतः शांत एवं सुगम' : 'Comfortable and discreet'}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-800/40">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConsultationMode('chat');
                      setCurrentStep(3);
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      consultationMode === 'chat'
                        ? 'gold-btn text-slate-950 shadow-md'
                        : 'bg-purple-900/60 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-purple-700/60'
                    }`}
                  >
                    <span>{isHi ? 'लाइव चैट चुनें ➔' : 'Select Live Chat ➔'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Step 2 Bottom Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-purple-800/60">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl bg-purple-950 border border-purple-700/60 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isHi ? 'पिछला: ज्योतिषी बदलें' : 'Back: Change Astrologer'}</span>
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="gold-btn px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>{isHi ? 'तिथि चुनें (अगला चरण)' : 'Select Date (Next Step)'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: SELECT CONSULTATION DATE
        ========================================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-purple-800/60 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-amber-400" />
                {isHi ? 'चरण 3: परामर्श की तिथि चुनें' : 'Step 3: Select Consultation Date'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {isHi 
                  ? `${selectedAstrologer.name} के साथ परामर्श के लिए अपनी पसंदीदा तिथि का चयन करें` 
                  : `Choose the date that suits you best for your session with ${selectedAstrologer.name}`}
              </p>
            </div>

            {/* Quick 7-Day Selection Cards */}
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-3">
                {isHi ? 'आगामी 7 दिन (त्वरित चयन):' : 'Upcoming 7 Days (Quick Select):'}
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3">
                {quickDays.map((day, idx) => {
                  const isSelected = selectedDate === day.dateStr;

                  return (
                    <button
                      key={day.dateStr}
                      type="button"
                      onClick={() => {
                        setSelectedDate(day.dateStr);
                      }}
                      className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center relative ${
                        isSelected
                          ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 font-bold border-amber-300 shadow-gold-glow scale-105'
                          : 'bg-[#180935] border-purple-800/60 text-slate-200 hover:border-amber-400/50 hover:bg-[#200c45]'
                      }`}
                    >
                      <span className={`text-[11px] uppercase font-bold tracking-wider ${
                        isSelected ? 'text-slate-900' : idx === 0 ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        {day.dayName}
                      </span>
                      <span className={`text-base sm:text-lg font-extrabold mt-1 ${
                        isSelected ? 'text-slate-950' : 'text-slate-100'
                      }`}>
                        {day.formattedDate}
                      </span>
                      <span className={`text-[10px] mt-1.5 px-2 py-0.5 rounded-full font-medium ${
                        isSelected ? 'bg-slate-950/20 text-slate-900' : 'bg-emerald-500/15 text-emerald-400'
                      }`}>
                        8 {isHi ? 'स्लॉट' : 'Slots'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Date Picker */}
            <div className="p-4 sm:p-5 bg-[#170836] border border-purple-800/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label className="text-xs sm:text-sm font-bold text-slate-200 block">
                  {isHi ? 'अथवा कोई अन्य विशिष्ट तिथि चुनें:' : 'Or choose any specific custom date:'}
                </label>
                <span className="text-xs text-slate-400">
                  {isHi ? 'कैलेंडर से अपनी सुविधानुसार कोई भी आगामी तिथि चुनें' : 'Pick any upcoming date from the calendar'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  min={formatDateStr(today)}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-[#0f0422] border border-amber-400/50 text-amber-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Selected Date Indicator Card */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-amber-300">
                <CalendarIcon className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {isHi ? 'चयनित तिथि:' : 'Selected Consultation Date:'}{' '}
                  <strong className="text-white font-bold ml-1">{selectedDate}</strong>
                </span>
              </div>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {isHi ? 'स्लॉट उपलब्ध' : 'Available Slots Found'}
              </span>
            </div>

            {/* Step 3 Bottom Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-purple-800/60">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl bg-purple-950 border border-purple-700/60 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isHi ? 'पिछला: माध्यम बदलें' : 'Back: Change Mode'}</span>
              </button>

              <button
                onClick={() => setCurrentStep(4)}
                className="gold-btn px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>{isHi ? 'समय स्लॉट चुनें (अगला चरण)' : 'Select Time Slot (Next Step)'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 4: SELECT AVAILABLE TIME SLOT
        ========================================================================= */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-purple-800/60 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  {isHi ? 'चरण 4: उपलब्ध समय स्लॉट चुनें' : 'Step 4: Select Available Time Slot'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {isHi 
                    ? `${selectedDate} के लिए 30 मिनट का उपयुक्त समय चुनें (भारतीय समयानुसार - IST)` 
                    : `Pick the most convenient 30-minute slot on ${selectedDate} (IST)`}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-400/30 self-start sm:self-auto">
                <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedDate}</span>
              </div>
            </div>

            {/* Categorized Slots */}
            <div className="space-y-6">
              {slotCategories.map((cat) => (
                <div key={cat.id} className="bg-[#150730]/90 border border-purple-800/60 rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{cat.icon}</span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-100">{cat.label}</h3>
                    </div>
                    <span className="text-[11px] text-purple-300 font-medium">{cat.sub}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                    {cat.slots.map((s) => {
                      const isSelected = selectedSlot === s;

                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSlot(s)}
                          className={`py-3 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1.5 relative ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-gold-glow font-bold scale-[1.03]'
                              : 'bg-[#1e0a40] border-purple-700/60 text-slate-200 hover:border-amber-400/50 hover:bg-[#270e52]'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-emerald-400 animate-pulse'}`} />
                          <span>{s}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Slot Confirmation Bar */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {isHi ? 'चयनित समय स्लॉट:' : 'Selected Time Slot:'}{' '}
                  <strong className="text-white font-bold ml-1">{selectedSlot}</strong>
                </span>
              </div>
              <span className="text-slate-300 font-medium">
                {isHi ? 'अवधि: 30 मिनट' : 'Duration: 30 Minutes'}
              </span>
            </div>

            {/* Step 4 Bottom Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-purple-800/60">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 rounded-xl bg-purple-950 border border-purple-700/60 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isHi ? 'पिछला: तिथि बदलें' : 'Back: Change Date'}</span>
              </button>

              <button
                onClick={() => setCurrentStep(5)}
                className="gold-btn px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>{isHi ? 'भुगतान एवं समीक्षा (अगला चरण)' : 'Proceed to Payment (Next Step)'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 5: REVIEW DETAILS & PAYMENT
        ========================================================================= */}
        {currentStep === 5 && (
          <form onSubmit={handleCompletePayment} className="space-y-6 animate-fadeIn">
            <div className="border-b border-purple-800/60 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                {isHi ? 'चरण 5: विवरण समीक्षा एवं सुरक्षित भुगतान' : 'Step 5: Review Details & Secure Payment'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {isHi 
                  ? 'अपने संपर्क विवरण दर्ज करें एवं सुरक्षित भुगतान गेटवे द्वारा सत्र बुक करें' 
                  : 'Enter your contact details and complete 256-bit encrypted checkout'}
              </p>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-400/40 text-rose-300 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (8 cols): Client Details & Payment Methods */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Client Details Card */}
                <div className="bg-[#150730]/90 border border-purple-800/60 rounded-2xl p-4 sm:p-6 space-y-4">
                  <h3 className="font-bold text-sm sm:text-base text-amber-300 flex items-center gap-2 border-b border-purple-800/60 pb-2.5">
                    <User className="w-4 h-4 text-amber-400" />
                    {isHi ? 'परामर्शदाता विवरण' : 'Your Contact Details'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs text-slate-300 font-medium block mb-1">
                        {isHi ? 'पूरा नाम *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isHi ? 'उदा. राहुल शर्मा' : 'e.g. Rahul Sharma'}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-[#0e0422] border border-purple-700/60 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-medium block mb-1">
                        {isHi ? 'व्हाट्सएप मोबाइल नंबर *' : 'WhatsApp Phone Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder={isHi ? 'उदा. 9876543210' : 'e.g. 9876543210'}
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full bg-[#0e0422] border border-purple-700/60 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs text-slate-300 font-medium block mb-1">
                        {isHi ? 'ईमेल पता' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full bg-[#0e0422] border border-purple-700/60 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-medium block mb-1">
                        {isHi ? 'जन्म विवरण (वैकल्पिक)' : 'Birth Details (Optional)'}
                      </label>
                      <input
                        type="text"
                        placeholder={isHi ? 'दिनांक, समय, जन्म स्थान' : 'DOB, Time, Place'}
                        value={birthDetails}
                        onChange={(e) => setBirthDetails(e.target.value)}
                        className="w-full bg-[#0e0422] border border-purple-700/60 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">
                      {isHi ? 'परामर्श का मुख्य विषय / प्रश्न' : 'Main Concern / Consultation Topic'}
                    </label>
                    <input
                      type="text"
                      placeholder={isHi ? 'उदा. करियर में पदोन्नति या विवाह योग' : 'e.g. Career growth, marriage timing'}
                      value={queryTopic}
                      onChange={(e) => setQueryTopic(e.target.value)}
                      className="w-full bg-[#0e0422] border border-purple-700/60 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 outline-none"
                    />
                  </div>
                </div>

                {/* 2. Payment Method Selector */}
                <div className="bg-[#150730]/90 border border-purple-800/60 rounded-2xl p-4 sm:p-6 space-y-4">
                  <h3 className="font-bold text-sm sm:text-base text-amber-300 flex items-center gap-2 border-b border-purple-800/60 pb-2.5">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    {isHi ? 'सुरक्षित भुगतान विधि चुनें' : 'Select Payment Method'}
                  </h3>

                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-extrabold'
                          : 'bg-[#180935] border-purple-700/60 text-slate-200 hover:border-amber-400/50'
                      }`}
                    >
                      <QrCode className="w-5 h-5" />
                      <span>UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-extrabold'
                          : 'bg-[#180935] border-purple-700/60 text-slate-200 hover:border-amber-400/50'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>{isHi ? 'डेबिट / क्रेडिट कार्ड' : 'Card'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-3 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'netbanking'
                          ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-extrabold'
                          : 'bg-[#180935] border-purple-700/60 text-slate-200 hover:border-amber-400/50'
                      }`}
                    >
                      <Building2 className="w-5 h-5" />
                      <span>{isHi ? 'नेट बैंकिंग' : 'Net Banking'}</span>
                    </button>
                  </div>

                  {/* UPI Form */}
                  {paymentMethod === 'upi' && (
                    <div className="p-4 rounded-xl bg-[#0e0422] border border-purple-800/60 space-y-3.5">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span className="font-semibold text-amber-300">
                          {isHi ? 'स्कैन करें या UPI ID दर्ज करें' : 'Scan QR or enter UPI ID'}
                        </span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Instant Verification
                        </span>
                      </div>

                      <div className="flex items-center gap-4 p-3 bg-purple-950/60 rounded-xl border border-purple-700/50">
                        <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                          <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=astrotanntra@okhdfcbank%26pn=ASTROTANNTRA%26am=750%26cu=INR"
                            alt="Payment QR"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-slate-100 block">ASTROTANNTRA OFFICIAL UPI</span>
                          <span className="text-slate-400 font-mono text-[11px]">astrotanntra@okhdfcbank</span>
                          <span className="text-[10px] text-amber-400 block mt-1">Google Pay • PhonePe • Paytm • BHIM</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 block mb-1">
                          {isHi ? 'अपनी UPI ID दर्ज करें (वैकल्पिक):' : 'Or Enter Your UPI ID:'}
                        </label>
                        <input
                          type="text"
                          placeholder="yourname@okhdfcbank"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full bg-[#180935] border border-purple-700/60 focus:border-amber-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-100 outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Card Form */}
                  {paymentMethod === 'card' && (
                    <div className="p-4 rounded-xl bg-[#0e0422] border border-purple-800/60 space-y-3">
                      <div>
                        <label className="text-xs text-slate-300 block mb-1">{isHi ? 'कार्ड नंबर' : 'Card Number'}</label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4532 •••• •••• 8892"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-[#180935] border border-purple-700/60 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-100 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-slate-300 block mb-1">{isHi ? 'समाप्ति तिथि' : 'Expiry (MM/YY)'}</label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="12/28"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-[#180935] border border-purple-700/60 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-100 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 block mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-[#180935] border border-purple-700/60 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-100 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 block mb-1">{isHi ? 'कार्डधारक का नाम' : 'Cardholder Name'}</label>
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full bg-[#180935] border border-purple-700/60 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-100 outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Net Banking Form */}
                  {paymentMethod === 'netbanking' && (
                    <div className="p-4 rounded-xl bg-[#0e0422] border border-purple-800/60 space-y-3">
                      <label className="text-xs text-slate-300 block">{isHi ? 'अपना बैंक चुनें:' : 'Select Your Bank:'}</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full bg-[#180935] border border-purple-700/60 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 outline-none cursor-pointer"
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="State Bank of India">State Bank of India (SBI)</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                        <option value="Punjab National Bank">Punjab National Bank</option>
                      </select>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      {isHi 
                        ? 'आरबीआई एवं पीसीआई-डीएसएस प्रमाणित 256-बिट एन्क्रिप्टेड गेटवे' 
                        : 'RBI & PCI-DSS certified 256-bit encrypted checkout'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column (5 cols): Order Summary & Confirm Button */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Booking Order Summary Box */}
                <div className="bg-[#170836] border border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
                  <h3 className="font-bold text-base sm:text-lg font-cinzel text-amber-300 border-b border-purple-800/60 pb-3 flex items-center justify-between">
                    <span>{isHi ? 'बुकिंग सारांश' : 'Booking Summary'}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-sans font-semibold">
                      30 Min
                    </span>
                  </h3>

                  {/* Astrologer mini card */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-950/60 border border-purple-700/40">
                    <img
                      src={selectedAstrologer.avatar}
                      alt={selectedAstrologer.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-100 truncate">{selectedAstrologer.name}</h4>
                      <p className="text-[11px] text-amber-200 truncate">{selectedAstrologer.title}</p>
                      <span className="text-[10px] text-slate-400">★ {selectedAstrologer.rating} • {selectedAstrologer.experience}</span>
                    </div>
                  </div>

                  {/* Scheduled Details */}
                  <div className="space-y-2 text-xs py-2 border-y border-purple-800/50">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">{isHi ? 'परामर्श माध्यम:' : 'Mode:'}</span>
                      <span className="font-bold text-slate-200 flex items-center gap-1.5">
                        <modeDetails.icon className={`w-3.5 h-3.5 ${modeDetails.color}`} />
                        {modeDetails.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">{isHi ? 'निर्धारित तिथि:' : 'Date:'}</span>
                      <span className="font-bold text-slate-200">{selectedDate}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">{isHi ? 'समय स्लॉट:' : 'Time Slot:'}</span>
                      <span className="font-bold text-amber-300">{selectedSlot}</span>
                    </div>
                  </div>

                  {/* Coupon Code Input */}
                  <div>
                    <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                      {isHi ? 'कूपन कोड लागू करें:' : 'Discount Coupon Code:'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. ASTROFIRST"
                        className="flex-1 bg-[#0f0422] border border-purple-700/60 rounded-xl px-3 py-1.5 text-xs text-slate-100 outline-none uppercase font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-400 hover:text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                      >
                        {couponApplied ? (isHi ? 'लागू ✓' : 'Applied ✓') : (isHi ? 'लागू करें' : 'Apply')}
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-rose-400 mt-1">{couponError}</p>}
                    {couponApplied && (
                      <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {isHi ? '₹200 की विशेष छूट लागू कर दी गई!' : '₹200 First Consultation Discount Applied!'}
                      </p>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs pt-2">
                    <div className="flex justify-between text-slate-300">
                      <span>{isHi ? '30 मिनट परामर्श शुल्क' : '30-Min Consultation Fee'}</span>
                      <span>₹{basePrice}</span>
                    </div>

                    {couponApplied && (
                      <div className="flex justify-between text-emerald-400 font-medium">
                        <span>{isHi ? 'विशेष कूपन छूट' : 'Special Discount (ASTROFIRST)'}</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>{isHi ? 'जीएसटी एवं सेवा कर' : 'GST & Convenience'}</span>
                      <span>{isHi ? 'शामिल (₹0)' : 'Included (₹0)'}</span>
                    </div>

                    <div className="pt-2 border-t border-purple-800/60 flex justify-between items-baseline">
                      <span className="font-bold text-sm text-slate-100">{isHi ? 'कुल देय राशि' : 'Total Payable'}</span>
                      <span className="text-2xl font-extrabold text-amber-400">₹{finalPrice}</span>
                    </div>
                  </div>

                  {/* Pay & Confirm Button */}
                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="w-full gold-btn py-3.5 rounded-xl font-extrabold text-sm sm:text-base text-slate-950 flex items-center justify-center gap-2 shadow-gold-glow cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {isProcessingPayment ? (
                      <>
                        <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>{isHi ? 'भुगतान सत्यापित हो रहा है...' : 'Securing Session...'}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>{isHi ? `सुरक्षित भुगतान करें • ₹${finalPrice}` : `Pay & Confirm Booking • ₹${finalPrice}`}</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1">
                    <p className="text-[10px] text-slate-400">
                      {isHi 
                        ? '100% संतुष्टि गारंटी • यदि सत्र से संतुष्ट न हों तो 100% रिफंड' 
                        : '100% Satisfaction Guarantee • Full refund if not satisfied'}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Step 5 Bottom Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-purple-800/60">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-5 py-2.5 rounded-xl bg-purple-950 border border-purple-700/60 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isHi ? 'पिछला: समय स्लॉट बदलें' : 'Back: Change Slot'}</span>
              </button>
            </div>
          </form>
        )}

        {/* =========================================================================
            STEP 6: CONFIRMATION & RECEIPT
        ========================================================================= */}
        {currentStep === 6 && (
          <div className="max-w-2xl mx-auto w-full space-y-6 animate-fadeIn py-4">
            
            {/* Success Header Card */}
            <div className="text-center bg-[#180938] border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider border border-emerald-500/30">
                {isHi ? 'सत्र सफलतापूर्वक बुक हुआ' : 'Booking Confirmed'}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white mt-3">
                {isHi ? 'शुभकामनाएं! आपका परामर्श सत्र आरक्षित है' : 'Blessings! Your Session Is Confirmed'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto">
                {isHi 
                  ? 'बुकिंग विवरण आपके व्हाट्सएप एवं ईमेल पर भेज दिया गया है। हमारे ज्योतिषी निर्धारित समय पर आपसे सीधा संपर्क करेंगे।'
                  : 'A confirmation receipt has been sent to your WhatsApp & Email. Your astrologer will connect with you at the scheduled time.'}
              </p>

              {/* Reference ID Pill */}
              <div className="mt-5 inline-flex items-center gap-2 bg-[#0c031d] px-4 py-2 rounded-xl border border-purple-700/60 font-mono text-xs sm:text-sm text-amber-300">
                <span className="text-slate-400">{isHi ? 'बुकिंग संदर्भ संख्या:' : 'Booking Reference ID:'}</span>
                <strong>{bookingId || 'ASTRO-749281'}</strong>
              </div>
            </div>

            {/* Session Summary Card */}
            <div className="bg-[#150730]/90 border border-purple-800/60 rounded-2xl p-5 sm:p-6 space-y-4">
              <h3 className="font-bold text-sm sm:text-base text-amber-300 border-b border-purple-800/60 pb-2.5">
                {isHi ? 'सत्र का विवरण' : 'Session Details'}
              </h3>

              <div className="flex items-center gap-4 p-3.5 bg-purple-950/60 rounded-xl border border-purple-700/50">
                <img
                  src={selectedAstrologer.avatar}
                  alt={selectedAstrologer.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-white">{selectedAstrologer.name}</h4>
                  <p className="text-xs text-amber-200">{selectedAstrologer.title}</p>
                  <span className="text-[11px] text-emerald-400 font-medium">★ {selectedAstrologer.rating} • {selectedAstrologer.experience}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#0e0422] border border-purple-800/40">
                  <span className="text-slate-400 block">{isHi ? 'माध्यम' : 'Mode'}</span>
                  <span className="font-bold text-slate-100 flex items-center gap-1.5 mt-1">
                    <modeDetails.icon className={`w-3.5 h-3.5 ${modeDetails.color}`} />
                    {modeDetails.label}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#0e0422] border border-purple-800/40">
                  <span className="text-slate-400 block">{isHi ? 'तिथि' : 'Date'}</span>
                  <span className="font-bold text-slate-100 mt-1 block">{selectedDate}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#0e0422] border border-purple-800/40">
                  <span className="text-slate-400 block">{isHi ? 'समय' : 'Time Slot'}</span>
                  <span className="font-bold text-amber-300 mt-1 block">{selectedSlot}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-700/40 text-xs text-slate-300 space-y-1">
                <p>
                  <strong className="text-amber-300">{isHi ? 'ग्राहक नाम:' : 'Client Name:'}</strong> {userName}
                </p>
                <p>
                  <strong className="text-amber-300">{isHi ? 'संपर्क नंबर:' : 'Contact Phone:'}</strong> {userPhone}
                </p>
                <p>
                  <strong className="text-amber-300">{isHi ? 'परामर्श विषय:' : 'Main Topic:'}</strong> {queryTopic}
                </p>
                <p>
                  <strong className="text-emerald-400">{isHi ? 'भुगतान स्थिति:' : 'Payment Status:'}</strong> ₹{finalPrice} ({isHi ? 'सफलतापूर्वक प्राप्त' : 'Paid & Verified'})
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-purple-900/80 hover:bg-purple-800 border border-purple-600/60 text-slate-200 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>{isHi ? 'रसीद डाउनलोड / प्रिंट करें' : 'Download Booking Receipt'}</span>
              </button>

              <button
                onClick={onGoBack}
                className="flex-1 gold-btn py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 flex items-center justify-center gap-2 cursor-pointer shadow-gold-glow"
              >
                <Home className="w-4 h-4" />
                <span>{isHi ? 'होम पेज पर जाएं' : 'Return to Home Page'}</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setBookingId('');
                }}
                className="text-xs text-amber-300/80 hover:text-amber-300 underline cursor-pointer"
              >
                {isHi ? 'एक और नया परामर्श सत्र बुक करें' : 'Book another consultation session'}
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

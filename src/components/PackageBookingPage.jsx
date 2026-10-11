import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
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
  ChevronLeft,
  ChevronRight, 
  User, 
  Mail, 
  Tag, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PackageBookingPage({ 
  packageData, 
  onGoBack, 
  lang = 'en', 
  user = null 
}) {
  const isHi = lang === 'hi';

  // Fallback package data if opened without specific package
  const pkg = packageData || {
    id: 'tarot_standard',
    num: 1,
    name: 'Three Card Spread',
    nameHi: 'थ्री कार्ड स्प्रेड (अतीत, वर्तमान, भविष्य)',
    serviceType: 'tarot',
    priceInr: 101,
    cards: 3,
    desc: 'Comprehensive 3-card spread exploring past karmic causes, current crossroads, and the near future.',
    descHi: 'अतीत, वर्तमान और भविष्य की ऊर्जाओं का 3-कार्ड द्वारा त्वरित एवं सटीक विश्लेषण।',
    features: ['Past, present, future timeline', 'Identification of key obstacles', 'Predicted upcoming shift'],
    featuresHi: ['अतीत, वर्तमान, भविष्य की समयरेखा', 'प्रमुख बाधाओं की पहचान', 'निकट भविष्य में संभावित मोड़']
  };

  const isTarot = pkg.serviceType === 'tarot' || (pkg.cards !== undefined);
  const isKundli = pkg.serviceType === 'kundli' || (!isTarot);

  // Dedicated 5 Steps as requested:
  // 1: Mode (परामर्श माध्यम)
  // 2: Date (दिनांक चयन)
  // 3: Slot (समय स्लॉट)
  // 4: Payment (समीक्षा एवं भुगतान)
  // 5: Confirmed (बुकिंग पुष्टि)
  const [currentStep, setCurrentStep] = useState(1);

  // Selections
  const [consultationMode, setConsultationMode] = useState('video'); // 'video', 'call', 'chat'
  
  // Date selection
  const today = new Date();
  const formatDateStr = (d) => d.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(formatDateStr(today));

  // Interactive Visual Calendar State
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const init = new Date();
    return new Date(init.getFullYear(), init.getMonth(), 1);
  });

  // Time slot selection
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM - 11:30 AM');
  
  // Client details
  const [userName, setUserName] = useState(user?.name || '');
  const [userPhone, setUserPhone] = useState(user?.phone || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [clientNotes, setClientNotes] = useState('');

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

  // Generate next 7 days for quick date chips
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

  // Exact package pricing calculations
  const basePrice = pkg.priceInr || 501;
  const discountAmount = couponApplied 
    ? Math.min(Math.round(basePrice * 0.1), 100) 
    : 0;
  const finalPrice = Math.max(basePrice - discountAmount, 1);

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
      setFormError(isHi ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsProcessingPayment(true);

    setTimeout(() => {
      const generatedId = `AST-PKG-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(generatedId);
      setIsProcessingPayment(false);
      setCurrentStep(5); // Go to Confirmed step

      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 1200);
  };

  // 5 Step definitions for the progress stepper
  const STEPS = [
    { num: 1, title: isHi ? 'माध्यम' : 'Mode' },
    { num: 2, title: isHi ? 'तिथि' : 'Date' },
    { num: 3, title: isHi ? 'समय' : 'Slot' },
    { num: 4, title: isHi ? 'भुगतान' : 'Payment' },
    { num: 5, title: isHi ? 'पुष्टि' : 'Confirmed' }
  ];

  // Helper mode info
  const getModeInfo = (m) => {
    switch (m) {
      case 'video':
        return {
          label: isHi ? 'निजी HD वीडियो कॉल' : 'Private HD Video Call',
          sub: isHi ? 'फेस-टू-फेस लाइव कार्ड/कुण्डली विश्लेषण' : 'Face-to-Face Live Session',
          icon: Video,
          color: 'text-purple-400'
        };
      case 'chat':
        return {
          label: isHi ? 'व्हाट्सएप चैट एवं पीडीएफ रिपोर्ट' : 'WhatsApp Chat & PDF Report',
          sub: isHi ? 'वॉयस नोट्स, चर्चा एवं विस्तृत प्रतिलिपि' : 'Voice notes, chat & digital report',
          icon: MessageSquare,
          color: 'text-emerald-400'
        };
      case 'call':
      default:
        return {
          label: isHi ? 'सीधी फोन ऑडियो कॉल' : 'Direct Phone Audio Call',
          sub: isHi ? '100% निजी एवं गोपनीय वॉयस कॉल' : '100% Confidential Voice Call',
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
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={currentStep > 1 && currentStep < 5 ? () => setCurrentStep(prev => prev - 1) : onGoBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-700/60 text-slate-300 hover:text-amber-300 hover:border-amber-400/60 transition-all text-xs sm:text-sm font-medium cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>
                {currentStep > 1 && currentStep < 5 
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
                {isTarot
                  ? (isHi ? 'टैरो पैकेज बुकिंग' : 'Tarot Package Booking')
                  : (isHi ? 'कुण्डली पैकेज बुकिंग' : 'Kundli Package Booking')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {isHi ? 'प्रमाणित विशेषज्ञ • 100% गोपनीय' : 'Certified Expert • 100% Private'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-8 relative z-10 flex-1 flex flex-col">
        
        {/* Page Banner Title */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {isTarot
                ? (isHi ? 'टैरो पैकेज लाइव परामर्श' : 'TAROT READING PACKAGE BOOKING')
                : (isHi ? 'कुण्डली विश्लेषण पैकेज बुकिंग' : 'KUNDLI ANALYSIS PACKAGE BOOKING')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-white leading-tight">
            {isTarot
              ? (isHi ? 'टैरो रीडिंग लाइव सत्र बुक करें' : 'Book Your Tarot Reading Session')
              : (isHi ? 'कुण्डली विश्लेषण सत्र बुक करें' : 'Book Your Kundli Analysis Session')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-1.5">
            {isHi 
              ? 'माध्यम, तिथि एवं समय स्लॉट चुनें। हमारे प्रमाणित वरिष्ठ विशेषज्ञ के साथ अपना व्यक्तिगत सत्र सुरक्षित करें।'
              : 'Select your preferred mode, date and time slot to confirm your private 1-on-1 consultation.'}
          </p>
        </div>

        {/* Selected Package Spotlight Card */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1c093e] via-[#260e52] to-[#170632] border border-amber-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-2xl shadow-gold-glow shrink-0">
              {isTarot ? '🃏' : '🕉️'}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-900/80 text-purple-200 border border-purple-700 font-semibold uppercase tracking-wider">
                  {isTarot ? 'Astrotanntra Mystic Tarot' : 'Astrotanntra Vedic Jyotish'}
                </span>
                {pkg.cards && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold">
                    {pkg.cards} {isHi ? 'कार्ड्स' : 'Cards'}
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-1 leading-snug">
                {isHi ? (pkg.nameHi || pkg.name) : pkg.name}
              </h2>
              <span className="text-xs text-slate-300 block mt-0.5">
                {isTarot
                  ? (isHi ? 'निर्देशित: प्रमाणित वरिष्ठ टैरो ग्रैंडमास्टर' : 'Assigned: Astrotanntra Certified Senior Tarot Grandmaster')
                  : (isHi ? 'निर्देशित: प्रमाणित वरिष्ठ वैदिक ज्योतिष आचार्य' : 'Assigned: Astrotanntra Verified Senior Vedic Jyotish Acharya')}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-purple-800/60 shrink-0">
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-slate-400 block">{isHi ? 'पैकेज शुल्क' : 'Package Rate'}</span>
              <span className="text-xl sm:text-2xl font-bold text-amber-300 tabular-nums">
                ₹{basePrice.toLocaleString('en-IN')}
              </span>
            </div>
            <button
              onClick={onGoBack}
              className="px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-amber-200 border border-purple-700/80 text-xs font-semibold cursor-pointer transition-colors"
            >
              {isHi ? 'पैकेज बदलें' : 'Change Package'}
            </button>
          </div>
        </div>

        {/* 5-Step Progress Bar (No Choose Astrologer Step!) */}
        <div className="mb-8 px-2 sm:px-6">
          <div className="flex items-center justify-between relative max-w-2xl mx-auto">
            {/* Connecting Track Line */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-purple-950 border-b border-purple-800/80 -z-0" />
            <div 
              className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500 -z-0"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            />

            {STEPS.map((s) => {
              const isDone = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              return (
                <div key={s.num} className="flex flex-col items-center relative z-10 group">
                  <div
                    onClick={() => {
                      if (isDone && currentStep < 5) setCurrentStep(s.num);
                    }}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 cursor-default select-none shadow-md ${
                      isDone
                        ? 'bg-amber-400 text-slate-950 shadow-gold-glow cursor-pointer hover:scale-105'
                        : isCurrent
                        ? 'bg-gradient-to-br from-purple-700 to-purple-900 text-amber-300 border-2 border-amber-400 ring-4 ring-amber-400/20 shadow-lg'
                        : 'bg-[#180833] text-slate-400 border border-purple-800'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-semibold mt-1.5 whitespace-nowrap transition-colors ${
                    isCurrent ? 'text-amber-300 font-bold' : isDone ? 'text-slate-200' : 'text-slate-500'
                  }`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP CONTENT CONTAINER */}
        <div className="flex-1">

          {/* ================= STEP 1: SELECT MODE ================= */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
              <div className="text-center space-y-1">
                <h3 className="text-lg sm:text-xl font-bold font-cinzel text-amber-300">
                  {isHi ? 'चरण 1: परामर्श का माध्यम चुनें' : 'Step 1: Choose Your Preferred Consultation Mode'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {isHi 
                    ? 'आप अपने चयनित पैकेज के लिए किस प्रकार संवाद करना पसंद करेंगे?' 
                    : 'How would you like to connect with your assigned master for this reading?'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  {
                    id: 'video',
                    title: isHi ? 'निजी HD वीडियो कॉल' : 'Private HD Video Call',
                    subtitle: isHi ? 'फेस-टू-फेस लाइव सत्र' : 'Face-to-Face Live Session',
                    desc: isHi 
                      ? 'गूगल मीट / ज़ूम के माध्यम से आमने-सामने कार्ड स्प्रेड अथवा कुण्डली विश्लेषण।' 
                      : 'Face-to-face screen-sharing for live card pulls and in-depth chart reading.',
                    icon: Video,
                    badge: isHi ? 'अनुशंसित' : 'Recommended',
                    accent: 'border-purple-500 bg-purple-950/40 text-purple-300'
                  },
                  {
                    id: 'call',
                    title: isHi ? 'सीधी फोन ऑडियो कॉल' : 'Direct Phone Audio Call',
                    subtitle: isHi ? '100% निजी वॉयस कॉल' : '100% Private Voice Call',
                    desc: isHi 
                      ? 'हमारे वरिष्ठ विशेषज्ञ से सीधी फोन कॉल। शांत एवं सुलभ माध्यम।' 
                      : 'Direct phone call from the master. Convenient, private and crystal-clear audio.',
                    icon: Phone,
                    badge: null,
                    accent: 'border-amber-500 bg-amber-950/40 text-amber-300'
                  },
                  {
                    id: 'chat',
                    title: isHi ? 'व्हाट्सएप चैट एवं रिपोर्ट' : 'WhatsApp Chat & Report',
                    subtitle: isHi ? 'वॉयस नोट्स एवं प्रतिलिपि' : 'Voice notes & Digital PDF',
                    desc: isHi 
                      ? 'व्हाट्सएप पर वॉयस नोट्स, विस्तृत संदेश एवं रिकॉर्डेड विश्लेषण रिपोर्ट।' 
                      : 'WhatsApp chat interaction with voice notes plus full digital PDF report.',
                    icon: MessageSquare,
                    badge: null,
                    accent: 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                  }
                ].map((m) => {
                  const isSelected = consultationMode === m.id;
                  const IconComp = m.icon;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setConsultationMode(m.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#220d48] border-amber-400 shadow-[0_8px_30px_rgba(245,158,11,0.25)] ring-2 ring-amber-400/60'
                          : 'bg-[#15062e] border-purple-800/80 hover:border-amber-400/50 hover:bg-[#1a0837]'
                      }`}
                    >
                      {m.badge && (
                        <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow-md">
                          {m.badge}
                        </span>
                      )}

                      <div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${m.accent}`}>
                          <IconComp className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-white">{m.title}</h4>
                        <span className="text-xs text-amber-300 block font-medium mt-0.5">{m.subtitle}</span>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                          {m.desc}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-purple-800/60 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-medium">
                          {isSelected ? (isHi ? 'चयनित ✓' : 'Selected ✓') : (isHi ? 'चुनने के लिए क्लिक करें' : 'Click to select')}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-slate-500'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-3.5 rounded-xl gold-btn font-bold text-xs sm:text-sm tracking-wider uppercase cursor-pointer shadow-gold-glow flex items-center gap-2"
                >
                  <span>{isHi ? 'दिनांक चुनें (अगला चरण) →' : 'Continue to Select Date →'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: SELECT DATE ================= */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
              <div className="text-center space-y-1">
                <h3 className="text-lg sm:text-xl font-bold font-cinzel text-amber-300">
                  {isHi ? 'चरण 2: परामर्श की दिनांक चुनें' : 'Step 2: Choose Your Consultation Date'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {isHi 
                    ? 'सत्र के लिए आगामी सुविधाजनक तिथि चुनें।' 
                    : 'Select a convenient date for your 1-on-1 reading.'}
                </p>
              </div>

              {/* Quick Date Chips (Next 7 Days) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                {quickDays.map((qd) => {
                  const isSelected = selectedDate === qd.dateStr;
                  return (
                    <button
                      key={qd.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(qd.dateStr)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-gold-glow font-bold'
                          : 'bg-[#15062e] text-slate-300 border-purple-800/80 hover:border-amber-400/50 hover:bg-[#1f0a42]'
                      }`}
                    >
                      <span className={`text-[11px] block uppercase tracking-wider ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                        {qd.dayName}
                      </span>
                      <span className={`text-base font-bold mt-1 ${isSelected ? 'text-slate-950' : 'text-amber-300'}`}>
                        {qd.formattedDate}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Toggle Visual Calendar */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowCalendar(prev => !prev)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-amber-300 hover:text-amber-200 font-semibold cursor-pointer underline underline-offset-4"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>
                    {showCalendar 
                      ? (isHi ? 'कैलेंडर छिपाएं' : 'Hide Calendar') 
                      : (isHi ? 'पूरा कैलेंडर देखें / अन्य माह चुनें' : 'View Full Calendar / Choose another month')}
                  </span>
                </button>

                {/* Visual Month Calendar View */}
                {showCalendar && (
                  <div className="mt-4 p-5 rounded-3xl bg-[#14062c] border border-amber-500/40 shadow-2xl max-w-md mx-auto animate-fadeIn">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-sm text-amber-300">
                        {calendarMonth.toLocaleDateString(isHi ? 'hi-IN' : 'en-US', { month: 'long', year: 'numeric' })}
                      </h4>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            const prev = new Date(calendarMonth);
                            prev.setMonth(prev.getMonth() - 1);
                            if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) {
                              setCalendarMonth(prev);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-purple-950 text-slate-300 hover:text-white border border-purple-800 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const next = new Date(calendarMonth);
                            next.setMonth(next.getMonth() + 1);
                            setCalendarMonth(next);
                          }}
                          className="p-1.5 rounded-lg bg-purple-950 text-slate-300 hover:text-white border border-purple-800 cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-400 mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                        <div key={d}>{d}</div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {(() => {
                        const days = [];
                        const firstDayIndex = calendarMonth.getDay();
                        const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();

                        for (let i = 0; i < firstDayIndex; i++) {
                          days.push(<div key={`empty-${i}`} className="p-2" />);
                        }

                        for (let day = 1; day <= daysInMonth; day++) {
                          const dateObj = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
                          const dateStr = formatDateStr(dateObj);
                          const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                          const isSelected = selectedDate === dateStr;

                          days.push(
                            <button
                              key={dateStr}
                              type="button"
                              disabled={isPast}
                              onClick={() => {
                                setSelectedDate(dateStr);
                                setShowCalendar(false);
                              }}
                              className={`p-2 rounded-xl transition-all ${
                                isPast
                                  ? 'text-slate-600 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                                  : 'hover:bg-purple-900/60 text-slate-200 cursor-pointer'
                              }`}
                            >
                              {day}
                            </button>
                          );
                        }
                        return days;
                      })()}
                    </div>
                  </div>
                )}
              </div>

              {/* Selected Date Summary Card */}
              <div className="p-4 rounded-2xl bg-[#1b0a38] border border-purple-800/80 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <CalendarIcon className="w-5 h-5 text-amber-400" />
                  <span>
                    {isHi ? 'चयनित तिथि: ' : 'Selected Date: '}
                    <strong className="text-amber-300 font-bold">
                      {new Date(selectedDate + 'T00:00:00').toLocaleDateString(isHi ? 'hi-IN' : 'en-US', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </strong>
                  </span>
                </div>
                <span className="text-emerald-400 font-semibold">● {isHi ? 'स्लॉट उपलब्ध' : 'Slots Available'}</span>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 rounded-xl bg-purple-950 text-slate-300 hover:text-white border border-purple-800 text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  ← {isHi ? 'पिछला' : 'Previous'}
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-3.5 rounded-xl gold-btn font-bold text-xs sm:text-sm tracking-wider uppercase cursor-pointer shadow-gold-glow flex items-center gap-2"
                >
                  <span>{isHi ? 'समय स्लॉट चुनें (अगला चरण) →' : 'Continue to Time Slot →'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: SELECT TIME SLOT ================= */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
              <div className="text-center space-y-1">
                <h3 className="text-lg sm:text-xl font-bold font-cinzel text-amber-300">
                  {isHi ? 'चरण 3: उपयुक्त समय स्लॉट चुनें' : 'Step 3: Choose Your Time Slot'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {isHi 
                    ? `दिनांक ${selectedDate} के लिए उपलब्ध समय स्लॉट` 
                    : `Available slots for ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`}
                </p>
              </div>

              <div className="space-y-5">
                {slotCategories.map((cat) => (
                  <div key={cat.id} className="p-5 rounded-2xl bg-[#14062c] border border-purple-800/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-purple-900/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{cat.icon}</span>
                        <h4 className="font-bold text-sm text-white">{cat.label}</h4>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{cat.sub}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {cat.slots.map((slot) => {
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-3 rounded-xl border text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                              isSelected
                                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-gold-glow font-bold scale-[1.02]'
                                : 'bg-[#1f0a42] text-slate-200 border-purple-700/80 hover:border-amber-400/60 hover:bg-[#270e52]'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{slot}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-xl bg-purple-950 text-slate-300 hover:text-white border border-purple-800 text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  ← {isHi ? 'पिछला' : 'Previous'}
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-8 py-3.5 rounded-xl gold-btn font-bold text-xs sm:text-sm tracking-wider uppercase cursor-pointer shadow-gold-glow flex items-center gap-2"
                >
                  <span>{isHi ? 'भुगतान एवं समीक्षा (अगला चरण) →' : 'Continue to Review & Payment →'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: REVIEW & PAYMENT ================= */}
          {currentStep === 4 && (
            <div className="animate-fadeIn max-w-4xl mx-auto">
              <div className="text-center mb-6 space-y-1">
                <h3 className="text-lg sm:text-xl font-bold font-cinzel text-amber-300">
                  {isHi ? 'चरण 4: विवरण एवं सुरक्षित भुगतान' : 'Step 4: Contact Details & Secure Payment'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {isHi 
                    ? 'कृपया अपना संपर्क विवरण दर्ज करें और भुगतान पूरा करें।' 
                    : 'Enter your contact details and complete the payment to confirm your booking.'}
                </p>
              </div>

              <form onSubmit={handleCompletePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: Client Details + Payment Method (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  
                  {/* Client Details Form Card */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-[#14062c] border border-purple-800/80 space-y-4 shadow-xl">
                    <h4 className="font-cinzel font-bold text-base text-amber-300 flex items-center gap-2 border-b border-purple-900/80 pb-2.5">
                      <User className="w-4 h-4 text-amber-400" />
                      <span>{isHi ? 'व्यक्तिगत संपर्क विवरण' : 'Your Contact Information'}</span>
                    </h4>

                    {formError && (
                      <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                      <div>
                        <label className="block text-slate-300 mb-1 font-medium">
                          {isHi ? 'पूरा नाम *' : 'Full Name *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder={isHi ? 'उदा. राहुल शर्मा' : 'e.g. Rahul Sharma'}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-medium">
                          {isHi ? 'मोबाइल / व्हाट्सएप नंबर *' : 'WhatsApp / Mobile No *'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={userPhone}
                          onChange={(e) => setUserPhone(e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="text-xs">
                      <label className="block text-slate-300 mb-1 font-medium">
                        {isHi ? 'ईमेल पता (कैलेंडर आमंत्रण एवं रसीद हेतु)' : 'Email Address (for calendar invite & receipt)'}
                      </label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="youremail@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs sm:text-sm"
                      />
                    </div>

                    <div className="text-xs">
                      <label className="block text-slate-300 mb-1 font-medium">
                        {isTarot 
                          ? (isHi ? 'आपका मुख्य प्रश्न या जीवन का पहलू (वैकल्पिक)' : 'Your Primary Question or Focus Area (Optional)')
                          : (isHi ? 'जन्म विवरण (जन्म तिथि, समय, स्थान) अथवा प्रश्न' : 'Birth Details (DOB, Time, Place) or Specific Questions')}
                      </label>
                      <textarea
                        rows={2}
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        placeholder={isTarot 
                          ? (isHi ? 'उदा. करियर में पदोन्नति, वैवाहिक संबंध, नए व्यवसाय की संभावनाएं...' : 'e.g. Career growth, marriage alignment, financial breakthrough...')
                          : (isHi ? 'उदा. 15-अगस्त-1995, 08:30 AM, लखनऊ, उत्तर प्रदेश...' : 'e.g. 15-Aug-1995, 08:30 AM, Lucknow, UP...')}
                        className="w-full px-3.5 py-2 rounded-xl bg-purple-950/60 border border-purple-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs"
                      />
                    </div>
                  </div>

                  {/* Payment Methods Card */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-[#14062c] border border-purple-800/80 space-y-4 shadow-xl">
                    <h4 className="font-cinzel font-bold text-base text-amber-300 flex items-center gap-2 border-b border-purple-900/80 pb-2.5">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span>{isHi ? 'सुरक्षित भुगतान माध्यम' : '100% Secure Payment Method'}</span>
                    </h4>

                    {/* Method Selector Tabs */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'upi', label: 'UPI / QR', icon: QrCode },
                        { id: 'card', label: isHi ? 'डेबिट/क्रेडिट' : 'Card', icon: CreditCard },
                        { id: 'netbanking', label: isHi ? 'नेट बैंकिंग' : 'Net Banking', icon: Building2 }
                      ].map((pm) => {
                        const IconC = pm.icon;
                        const isSel = paymentMethod === pm.id;
                        return (
                          <button
                            key={pm.id}
                            type="button"
                            onClick={() => setPaymentMethod(pm.id)}
                            className={`py-2.5 px-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              isSel
                                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-bold'
                                : 'bg-purple-950/60 text-slate-300 border-purple-800 hover:bg-purple-900/60'
                            }`}
                          >
                            <IconC className="w-3.5 h-3.5" />
                            <span>{pm.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Method Specific Fields */}
                    {paymentMethod === 'upi' && (
                      <div className="space-y-3 pt-2 text-xs">
                        <div className="p-3.5 rounded-2xl bg-purple-950/50 border border-purple-800/80 flex items-center justify-between">
                          <div>
                            <span className="text-slate-300 font-semibold block">{isHi ? 'त्वरित UPI आईडी' : 'Instant UPI ID'}</span>
                            <span className="text-[11px] text-slate-400">GPay, PhonePe, Paytm, BHIM</span>
                          </div>
                          <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-400/30">
                            astrotanntra@upi
                          </span>
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1 font-medium">{isHi ? 'अपनी UPI ID दर्ज करें' : 'Enter your UPI ID'}</label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@okhdfcbank"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="space-y-3 pt-2 text-xs">
                        <div>
                          <label className="block text-slate-300 mb-1 font-medium">{isHi ? 'कार्ड नंबर' : 'Card Number'}</label>
                          <input
                            type="text"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4532 •••• •••• 8892"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-300 mb-1 font-medium">{isHi ? 'वैधता (MM/YY)' : 'Expiry (MM/YY)'}</label>
                            <input
                              type="text"
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="08/28"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-300 mb-1 font-medium">CVV</label>
                            <input
                              type="password"
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="•••"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                      <div className="space-y-2 pt-2 text-xs">
                        <label className="block text-slate-300 font-medium">{isHi ? 'अपना बैंक चुनें' : 'Select Your Bank'}</label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/80 text-white focus:outline-none focus:border-amber-400 text-xs cursor-pointer"
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

                    <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{isHi ? '256-बिट SSL एन्क्रिप्टेड सुरक्षित भुगतान गेटवे' : '256-bit SSL encrypted & RBI compliant gateway'}</span>
                    </div>
                  </div>

                </div>

                {/* Right Column: Order Summary (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="p-5 sm:p-6 rounded-3xl bg-[#160630] border border-amber-500/40 space-y-5 shadow-2xl sticky top-24">
                    <h4 className="font-cinzel font-bold text-base text-amber-300 border-b border-purple-900/80 pb-2.5 flex items-center justify-between">
                      <span>{isHi ? 'बुकिंग सारांश' : 'Booking Summary'}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                        {isHi ? 'निश्चित दर' : 'Fixed Price'}
                      </span>
                    </h4>

                    {/* Selected Package Info */}
                    <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-800 space-y-1.5 text-xs">
                      <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                        {isTarot ? 'Tarot Package' : 'Kundli Package'}
                      </span>
                      <strong className="text-sm text-white block">
                        {isHi ? (pkg.nameHi || pkg.name) : pkg.name}
                      </strong>
                      <span className="text-slate-300 block">
                        {modeDetails.label} ({modeDetails.sub})
                      </span>
                    </div>

                    {/* Selected Schedule Time */}
                    <div className="space-y-1.5 text-xs text-slate-300 border-b border-purple-800/80 pb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">{isHi ? 'दिनांक:' : 'Date:'}</span>
                        <span className="font-semibold text-white">
                          {new Date(selectedDate + 'T00:00:00').toLocaleDateString(isHi ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">{isHi ? 'समय स्लॉट:' : 'Slot:'}</span>
                        <span className="font-mono text-amber-300 font-semibold">{selectedSlot}</span>
                      </div>
                    </div>

                    {/* Coupon Code Section */}
                    <div>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder={isHi ? 'कूपन कोड' : 'Coupon Code'}
                            className="w-full pl-8 pr-3 py-2 rounded-xl bg-purple-950/80 border border-purple-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs uppercase font-mono"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="px-3.5 py-2 rounded-xl bg-purple-800 hover:bg-purple-700 text-amber-200 text-xs font-bold cursor-pointer transition-colors"
                        >
                          {isHi ? 'लागू करें' : 'Apply'}
                        </button>
                      </div>

                      {couponApplied && (
                        <span className="text-[11px] text-emerald-400 mt-1.5 block flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>{isHi ? 'कूपन ASTROFIRST सफलतापूर्वक लागू!' : 'Coupon ASTROFIRST applied!'}</span>
                        </span>
                      )}
                      {couponError && (
                        <span className="text-[11px] text-rose-400 mt-1 block">{couponError}</span>
                      )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 text-xs border-t border-purple-800/80 pt-3">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>{isHi ? 'पैकेज शुल्क:' : 'Package Rate:'}</span>
                        <span className="tabular-nums font-semibold">₹{basePrice.toLocaleString('en-IN')}</span>
                      </div>

                      {couponApplied && discountAmount > 0 && (
                        <div className="flex items-center justify-between text-emerald-400">
                          <span>{isHi ? 'कूपन छूट (ASTROFIRST):' : 'Promo Discount:'}</span>
                          <span className="tabular-nums font-bold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>{isHi ? 'जीएसटी एवं कर:' : 'GST & Platform Tax:'}</span>
                        <span className="text-emerald-400 font-semibold">{isHi ? 'समाहित (₹0)' : 'Included (₹0)'}</span>
                      </div>

                      <div className="border-t border-purple-800/80 pt-2.5 flex items-baseline justify-between">
                        <span className="font-bold text-sm text-white">{isHi ? 'कुल देय राशि:' : 'Total Payable:'}</span>
                        <span className="text-2xl font-bold text-amber-300 tabular-nums">
                          ₹{finalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Pay Button */}
                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className="w-full py-4 rounded-2xl gold-btn font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-gold-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
                    >
                      {isProcessingPayment ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>{isHi ? 'भुगतान संसाधित हो रहा है...' : 'Processing Payment...'}</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-slate-950" />
                          <span>
                            {isHi 
                              ? `₹${finalPrice.toLocaleString('en-IN')} का भुगतान करें एवं पुष्टि करें` 
                              : `Pay ₹${finalPrice.toLocaleString('en-IN')} & Confirm Booking`}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </form>
            </div>
          )}

          {/* ================= STEP 5: CONFIRMED RECEIPT ================= */}
          {currentStep === 5 && (
            <div className="animate-fadeIn max-w-2xl mx-auto space-y-6">
              
              {/* Celebration Hero Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#240d4f] via-[#1a083a] to-[#120529] border border-amber-400/80 text-center space-y-4 shadow-2xl relative overflow-hidden">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center text-3xl sm:text-4xl mx-auto shadow-lg animate-bounce">
                  ✓
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                    {isHi ? 'सत्र सफलतापूर्वक आरक्षित' : 'SESSION CONFIRMED'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white">
                    {isHi ? 'आपकी बुकिंग सफलतापूर्वक पुष्ट हो गई है!' : 'Your Consultation is Confirmed!'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                    {isHi 
                      ? `धन्यवाद ${userName}, आपका 1-on-1 सत्र सफलतापूर्वक शेड्यूल कर दिया गया है। बैठक विवरण एवं रसीद आपके मोबाइल एवं ईमेल पर भेज दी गई है।`
                      : `Thank you, ${userName}! Your private 1-on-1 reading has been booked. Meeting details and your confirmed receipt have been dispatched.`}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/80 border border-purple-700/80 text-amber-300 text-xs sm:text-sm font-mono font-bold">
                  <span>{isHi ? 'बुकिंग संदर्भ आईडी:' : 'Booking Ref ID:'}</span>
                  <span className="text-white select-all">{bookingId}</span>
                </div>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-6 rounded-3xl bg-[#14062c] border border-purple-800/80 space-y-4 text-xs sm:text-sm">
                <h4 className="font-cinzel font-bold text-sm sm:text-base text-amber-300 border-b border-purple-800/80 pb-2">
                  {isHi ? 'सत्र एवं परामर्श विवरण' : 'Consultation Receipt Details'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-xs">{isHi ? 'चयनित पैकेज' : 'Selected Package'}</span>
                    <strong className="text-white font-semibold block mt-0.5">
                      {isHi ? (pkg.nameHi || pkg.name) : pkg.name}
                    </strong>
                    <span className="text-emerald-400 text-xs font-bold block mt-0.5">
                      ₹{finalPrice.toLocaleString('en-IN')} ({isHi ? 'सफल भुगतान' : 'Paid'})
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-xs">{isHi ? 'परामर्श माध्यम' : 'Consultation Mode'}</span>
                    <strong className="text-white font-semibold block mt-0.5">{modeDetails.label}</strong>
                    <span className="text-slate-400 text-xs block mt-0.5">{modeDetails.sub}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-xs">{isHi ? 'शेड्यूल तिथि एवं समय' : 'Scheduled Date & Time'}</span>
                    <strong className="text-amber-300 font-semibold block mt-0.5">
                      {new Date(selectedDate + 'T00:00:00').toLocaleDateString(isHi ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </strong>
                    <span className="font-mono text-amber-200 text-xs block mt-0.5">{selectedSlot}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-xs">{isHi ? 'क्लाइंट संपर्क' : 'Client Contact'}</span>
                    <strong className="text-white font-semibold block mt-0.5">{userName}</strong>
                    <span className="text-slate-300 text-xs block mt-0.5">+91 {userPhone}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/60 text-xs text-slate-300 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    {isHi 
                      ? 'सत्र लिंक और रिमाइंडर आपके व्हाट्सएप नंबर पर 15 मिनट पहले सक्रिय हो जाएगा।' 
                      : 'Session link and reminder will be activated on your WhatsApp 15 minutes before the slot.'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hello Astrotanntra, I have booked ${pkg.name} (Booking ID: ${bookingId}). Please share meeting link.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isHi ? 'व्हाट्सएप पर सहायता प्राप्त करें' : 'Connect via WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-amber-200 border border-purple-700/80 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{isHi ? 'रसीद डाउनलोड / प्रिंट करें' : 'Download / Print Receipt'}</span>
                </button>

                <button
                  type="button"
                  onClick={onGoBack}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl gold-btn font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-gold-glow flex items-center justify-center transition-all"
                >
                  <span>{isHi ? 'मुख्य पृष्ठ पर लौटें' : 'Return to Home'}</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}

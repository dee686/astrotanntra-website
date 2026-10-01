import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Phone, 
  Video, 
  MessageSquare, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Lock, 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  Download, 
  Share2 
} from 'lucide-react';
import { ASTROLOGERS } from '../data/astrologersData';
import confetti from 'canvas-confetti';

export default function ConsultationModal({ initialTopic, onClose, lang }) {
  // Booking Steps: 'schedule' -> 'payment' -> 'confirmed'
  const [step, setStep] = useState('schedule'); 

  // Scheduling details
  const [selectedAstrologer, setSelectedAstrologer] = useState(ASTROLOGERS[0]);
  const [consultationMode, setConsultationMode] = useState('call'); // 'call', 'video', 'chat'
  
  // Date selection
  const today = new Date();
  const formatDateStr = (d) => d.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(formatDateStr(today));

  // Time slot selection
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM - 11:30 AM');
  
  // Client details
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [queryTopic, setQueryTopic] = useState(initialTopic || 'Career Growth & Life Direction');
  const [birthDetails, setBirthDetails] = useState('');

  // Payment details
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'netbanking', 'paylater'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [couponCode, setCouponCode] = useState('ASTROFIRST');
  const [couponApplied, setCouponApplied] = useState(true);

  const isHi = lang === 'hi';

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
      label: isHi ? 'प्रातःकालीन स्लॉट' : 'Morning Slots',
      icon: '🌅',
      slots: [
        '09:30 AM - 10:00 AM',
        '10:15 AM - 10:45 AM',
        '11:00 AM - 11:30 AM',
        '11:45 AM - 12:15 PM'
      ]
    },
    {
      label: isHi ? 'दोपहर स्लॉट' : 'Afternoon Slots',
      icon: '☀️',
      slots: [
        '02:00 PM - 02:30 PM',
        '02:45 PM - 03:15 PM',
        '03:45 PM - 04:15 PM',
        '04:30 PM - 05:00 PM'
      ]
    },
    {
      label: isHi ? 'सांध्य एवं रात्रि स्लॉट' : 'Evening & Night Slots',
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
  const basePrice = selectedAstrologer ? selectedAstrologer.pricePerMin * 30 : 1499;
  const discountAmount = couponApplied ? 300 : 0;
  const finalPrice = Math.max(basePrice - discountAmount, 499);

  // Proceed from scheduling to payment
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!userName || !userPhone || !selectedDate || !selectedSlot) {
      alert(isHi ? 'कृपया परामर्श हेतु सभी आवश्यक विवरण भरें' : 'Please fill all required consultation details');
      return;
    }
    setStep('payment');
  };

  // Complete Payment & finalize booking
  const handleCompletePayment = () => {
    setIsProcessingPayment(true);
    
    setTimeout(() => {
      setIsProcessingPayment(false);
      const generatedId = `ASTRO-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(generatedId);
      setStep('confirmed');

      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 overflow-hidden animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#13062c] border border-amber-500/50 rounded-3xl shadow-2xl text-slate-100 overflow-hidden flex flex-col h-[92vh] max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-purple-800/60 bg-gradient-to-r from-[#1c0a3c] via-[#240d4f] to-[#160630] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 shadow-gold-glow">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300">
                  {isHi ? 'वैदिक ज्योतिष परामर्श बुक करें' : 'Book Vedic Consultation'}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  {isHi ? 'लाइव एवं पूर्णतः गोपनीय' : 'Live & Confidential'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {isHi 
                  ? 'सत्यापित वैदिक आचार्यों एवं ज्योतिषियों से सीधा 1-on-1 निजी परामर्श' 
                  : 'Direct 1-on-1 private consultation with verified Vedic Masters & Jyotish Acharyas'}
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

        {/* Multi-step Progress Bar */}
        <div className="px-6 py-2.5 bg-[#170836] border-b border-purple-900/60 flex items-center justify-between text-xs sm:text-sm shrink-0">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
              step === 'schedule' ? 'bg-amber-400 text-slate-950 shadow-gold-glow' : 'bg-emerald-500 text-white'
            }`}>
              {step !== 'schedule' ? <Check className="w-3.5 h-3.5" /> : '1'}
            </span>
            <span className={step === 'schedule' ? 'font-bold text-amber-300' : 'text-slate-300'}>
              {isHi ? 'दिनांक एवं समय' : 'Select Date & Timing'}
            </span>
          </div>

          <ChevronRight className="w-4 h-4 text-purple-600" />

          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
              step === 'payment' ? 'bg-amber-400 text-slate-950 shadow-gold-glow' : step === 'confirmed' ? 'bg-emerald-500 text-white' : 'bg-purple-900/60 text-slate-400'
            }`}>
              {step === 'confirmed' ? <Check className="w-3.5 h-3.5" /> : '2'}
            </span>
            <span className={step === 'payment' ? 'font-bold text-amber-300' : 'text-slate-400'}>
              {isHi ? 'भुगतान विकल्प' : 'Payment Options'}
            </span>
          </div>

          <ChevronRight className="w-4 h-4 text-purple-600" />

          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
              step === 'confirmed' ? 'bg-emerald-500 text-white' : 'bg-purple-900/60 text-slate-400'
            }`}>
              3
            </span>
            <span className={step === 'confirmed' ? 'font-bold text-emerald-400' : 'text-slate-400'}>
              {isHi ? 'बुकिंग पुष्टि' : 'Confirmation'}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6 flex-1 fast-scroll">
          
          {/* STEP 1: SCHEDULING & CALENDAR & TIMING */}
          {step === 'schedule' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              
              {/* 1. Astrologer Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    {isHi ? '1. ज्योतिषी चुनें' : '1. Choose Astrologer'}
                  </label>
                  <span className="text-xs text-emerald-400 font-medium">
                    {isHi ? '● आज ऑनलाइन उपलब्ध' : '● Available Online Today'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ASTROLOGERS.map((astro) => (
                    <div
                      key={astro.id}
                      onClick={() => setSelectedAstrologer(astro)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                        selectedAstrologer.id === astro.id
                          ? 'bg-amber-500/15 border-amber-400 shadow-gold-glow'
                          : 'bg-[#180935] border-purple-800/60 hover:border-amber-500/40'
                      }`}
                    >
                      <img
                        src={astro.avatar}
                        alt={astro.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-amber-400/80 shrink-0 shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm sm:text-base text-slate-100 truncate">{astro.name}</h4>
                          <span className="text-xs text-amber-400 font-bold flex items-center gap-0.5">
                            ★ {astro.rating}
                          </span>
                        </div>
                        <span className="text-xs text-amber-200/80 block truncate">{astro.title}</span>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                          <span>{astro.experience}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-semibold">₹{astro.pricePerMin * 30} / 30 {isHi ? 'मिनट' : 'min'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Consultation Mode */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider block mb-2.5">
                  {isHi ? '2. परामर्श का माध्यम चुनें' : '2. Select Consultation Mode'}
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
                  <button
                    type="button"
                    onClick={() => setConsultationMode('call')}
                    className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl border flex flex-col items-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
                      consultationMode === 'call'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-gold-glow'
                        : 'bg-[#180935] border-purple-800 text-slate-300 hover:border-purple-600'
                    }`}
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    <span className="truncate">{isHi ? 'ऑडियो कॉल' : 'Audio Call'}</span>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-normal truncate max-w-full">{isHi ? 'HD वॉयस लाइन' : 'HD Voice'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationMode('video')}
                    className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl border flex flex-col items-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
                      consultationMode === 'video'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-gold-glow'
                        : 'bg-[#180935] border-purple-800 text-slate-300 hover:border-purple-600'
                    }`}
                  >
                    <Video className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    <span className="truncate">{isHi ? 'वीडियो कॉल' : 'Video Call'}</span>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-normal truncate max-w-full">{isHi ? 'फेस-टू-फेस' : 'Face-to-Face'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationMode('chat')}
                    className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl border flex flex-col items-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
                      consultationMode === 'chat'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-gold-glow'
                        : 'bg-[#180935] border-purple-800 text-slate-300 hover:border-purple-600'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    <span className="truncate">{isHi ? 'लाइव चैट' : 'Live Chat'}</span>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-normal truncate max-w-full">{isHi ? 'त्वरित प्रश्नोत्तर' : 'Instant Q&A'}</span>
                  </button>
                </div>
              </div>

              {/* 3. Interactive Calendar (Date Selection) */}
              <div className="bg-[#180935] border border-purple-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-800/60 pb-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-amber-400" />
                    <label className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider">
                      {isHi ? '3. परामर्श का दिन चुनें' : '3. Select Consultation Date'}
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{isHi ? 'अन्य दिनांक:' : 'Custom Date:'}</span>
                    <input
                      type="date"
                      min={formatDateStr(today)}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-2.5 py-1 rounded-lg bg-[#120527] border border-purple-600 text-xs text-amber-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Quick Date Chips */}
                <div className="flex gap-2 overflow-x-auto pb-1.5 sm:grid sm:grid-cols-7 scrollbar-none touch-pan-x" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {quickDays.map((day) => {
                    const isSelected = selectedDate === day.dateStr;
                    return (
                      <button
                        key={day.dateStr}
                        type="button"
                        onClick={() => setSelectedDate(day.dateStr)}
                        className={`p-2 sm:p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer shrink-0 sm:shrink min-w-[70px] sm:min-w-0 ${
                          isSelected
                            ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 border-amber-300 font-bold shadow-gold-glow scale-105'
                            : 'bg-[#1f0c43] border-purple-700/60 text-slate-200 hover:border-amber-500/50 hover:bg-[#271054]'
                        }`}
                      >
                        <span className={`text-[10px] sm:text-xs uppercase font-semibold ${isSelected ? 'text-slate-900' : 'text-amber-300/80'}`}>
                          {day.dayName}
                        </span>
                        <span className="text-xs font-bold mt-0.5 whitespace-nowrap">
                          {day.formattedDate}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs text-slate-300 flex items-center justify-between">
                  <span>{isHi ? 'चयनित दिन:' : 'Selected Date:'} <strong className="text-amber-300">{new Date(selectedDate).toLocaleDateString(isHi ? 'hi-IN' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong></span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {isHi ? '8 स्लॉट उपलब्ध' : '8 Slots Available'}
                  </span>
                </div>
              </div>

              {/* 4. Timing Slots for the Selected Date */}
              <div className="bg-[#180935] border border-purple-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-purple-800/60 pb-3">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <label className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider">
                    {isHi ? '4. उपलब्ध समय स्लॉट चुनें' : `4. Select Available Time Slot (${new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`}
                  </label>
                </div>

                <div className="space-y-4">
                  {slotCategories.map((cat, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-200/90">
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {cat.slots.map((slot) => {
                          const isSelected = selectedSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-gold-glow'
                                  : 'bg-[#14062c] border-purple-700/50 text-slate-200 hover:border-amber-400/50 hover:bg-[#1e0a41]'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-emerald-400'}`} />
                              <span>{slot.split(' - ')[0]}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800 text-xs text-slate-300 flex items-center justify-between">
                  <span>{isHi ? 'चयनित समय स्लॉट:' : 'Selected Time Slot:'} <strong className="text-amber-300">{selectedSlot}</strong> (30 {isHi ? 'मिनट' : 'Mins'})</span>
                  <span className="text-emerald-400 font-medium">{isHi ? 'सत्यापित व्यक्तिगत ध्यान' : 'Guaranteed Astrologer Attention'}</span>
                </div>
              </div>

              {/* 5. User Details & Query */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">
                    {isHi ? 'आपका पूरा नाम *' : 'Your Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={isHi ? 'उदा. राहुल शर्मा' : 'Enter your name'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180935] border border-purple-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">
                    {isHi ? 'व्हाट्सएप / मोबाइल नंबर *' : 'WhatsApp / Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+91 99930 27943"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180935] border border-purple-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">
                    {isHi ? 'ईमेल पता (अपॉइंटमेंट विवरण व रिपोर्ट हेतु)' : 'Email Address (For Appointment & PDF)'}
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180935] border border-purple-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">
                    {isHi ? 'जन्म विवरण (तिथि, समय, जन्म स्थान)' : 'Birth Details (DOB, Time, City)'}
                  </label>
                  <input
                    type="text"
                    value={birthDetails}
                    onChange={(e) => setBirthDetails(e.target.value)}
                    placeholder={isHi ? 'उदा. 15 अक्टूबर 1998, 2:30 PM, नई दिल्ली' : 'e.g. 15 Oct 1998, 2:30 PM, Tezpur'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180935] border border-purple-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-slate-300 block mb-1 font-medium">
                    {isHi ? 'आपका मुख्य प्रश्न या समस्या *' : 'Your Specific Question / Concern *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={queryTopic}
                    onChange={(e) => setQueryTopic(e.target.value)}
                    placeholder="e.g. Career switch timing, Marriage matchmaking, Business obstacles, Sade Sati"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180935] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Action Button: Proceed to Payment */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-purple-800/60">
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isHi ? '100% गोपनीय • प्रामाणिक वैदिक परंपरा' : '100% Confidential • Verified Vedic Lineage'}</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto gold-btn px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <span>{isHi ? `भुगतान हेतु आगे बढ़ें (₹${finalPrice})` : `Proceed to Payment (₹${finalPrice})`}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: PAYMENT OPTIONS & CHECKOUT */}
          {step === 'payment' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Back to details button */}
              <button
                type="button"
                onClick={() => setStep('schedule')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isHi ? '← दिनांक, समय या ज्योतिषी बदलें' : '← Edit Date, Time or Astrologer'}</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Payment Method Selection */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-cinzel text-base font-bold text-amber-300 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      {isHi ? 'भुगतान विकल्प चुनें' : 'Select Payment Option'}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {isHi ? '256-बिट सुरक्षित एन्क्रिप्शन' : '256-Bit SSL Encrypted'}
                    </span>
                  </div>

                  {/* Payment Method Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-gold-glow'
                          : 'bg-[#180935] border-purple-800 text-slate-300'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-amber-400" />
                      <span className="text-xs font-semibold">UPI / QR</span>
                      <span className="text-[10px] text-emerald-400">{isHi ? 'तत्काल' : 'Instant'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-gold-glow'
                          : 'bg-[#180935] border-purple-800 text-slate-300'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-amber-400" />
                      <span className="text-xs font-semibold">{isHi ? 'कार्ड्स' : 'Cards'}</span>
                      <span className="text-[10px] text-slate-400">{isHi ? 'डेबिट / क्रेडिट' : 'Debit / Credit'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'netbanking'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-gold-glow'
                          : 'bg-[#180935] border-purple-800 text-slate-300'
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-amber-400" />
                      <span className="text-xs font-semibold">{isHi ? 'नेट बैंकिंग' : 'Net Banking'}</span>
                      <span className="text-[10px] text-slate-400">{isHi ? 'सभी बैंक' : 'All Banks'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paylater')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'paylater'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-gold-glow'
                          : 'bg-[#180935] border-purple-800 text-slate-300'
                      }`}
                    >
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span className="text-xs font-semibold">{isHi ? 'बाद में भुगतान' : 'Pay Later'}</span>
                      <span className="text-[10px] text-emerald-400">{isHi ? 'कॉल के बाद' : 'Post-Call'}</span>
                    </button>
                  </div>

                  {/* Payment Method Detail Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#180935] border border-purple-800/80 space-y-4">
                    
                    {/* UPI Option */}
                    {paymentMethod === 'upi' && (
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#120527] p-3.5 rounded-xl border border-purple-800/60">
                          {/* Visual QR Code */}
                          <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                            <div className="w-full h-full border border-slate-900 flex flex-col items-center justify-center p-1 text-slate-900 text-center">
                              <span className="text-2xl mb-1">📱</span>
                              <span className="text-[8px] font-bold tracking-tighter uppercase">ASTROTANNTRA UPI</span>
                              <span className="text-[7px] text-slate-600 font-mono">₹{finalPrice}</span>
                            </div>
                          </div>

                          <div className="space-y-1.5 text-xs text-center sm:text-left">
                            <span className="font-bold text-amber-300 block">Scan & Pay with Any UPI App</span>
                            <p className="text-[11px] text-slate-300">
                              Use Google Pay, PhonePe, Paytm, BHIM, or any banking UPI app to scan and pay directly.
                            </p>
                            <span className="text-[10px] font-mono text-emerald-400 block">UPI ID: astrotanntra@icici</span>
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-300 block mb-1">Or Enter Your VPA / UPI ID</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="e.g. yourname@okhdfcbank"
                              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#120527] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                            />
                            <button
                              type="button"
                              onClick={handleCompletePayment}
                              disabled={isProcessingPayment}
                              className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs cursor-pointer"
                            >
                              Verify & Pay
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Card Option */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-[11px] text-slate-300 block mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4532 •••• •••• 8891"
                            maxLength={19}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#120527] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-300 block mb-1">Valid Thru (MM/YY)</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="08/28"
                              maxLength={5}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-[#120527] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-300 block mb-1">CVV</label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="•••"
                              maxLength={4}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-[#120527] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400">
                          <span>Accepted: Visa, MasterCard, RuPay, Maestro</span>
                        </div>
                      </div>
                    )}

                    {/* Net Banking Option */}
                    {paymentMethod === 'netbanking' && (
                      <div className="space-y-3">
                        <label className="text-[11px] text-slate-300 block mb-1">Select Bank</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                            <button
                              key={bank}
                              type="button"
                              onClick={() => setSelectedBank(bank)}
                              className={`p-2 rounded-xl border text-xs text-left transition-all cursor-pointer truncate ${
                                selectedBank === bank
                                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                                  : 'bg-[#120527] border-purple-700 text-slate-300 hover:border-amber-400/50'
                              }`}
                            >
                              {bank}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pay Later Option */}
                    {paymentMethod === 'paylater' && (
                      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>100% Trust Guarantee: Pay After Consultation</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          Confirm your appointment now without paying upfront. You will receive an invoice link at the end of your 30-minute private consultation session.
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Trust Footer */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Refundable if not satisfied
                    </span>
                    <span>Verified by NPCI & RBI</span>
                  </div>

                </div>

                {/* Right: Booking Summary & Price Breakdown */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-[#180935] border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-4">
                    <h3 className="font-cinzel text-base font-bold text-amber-300 border-b border-purple-800/80 pb-2">
                      {isHi ? 'अपॉइंटमेंट सारांश' : 'Appointment Summary'}
                    </h3>

                    {/* Astrologer mini card */}
                    <div className="flex items-center gap-3 bg-[#120527] p-3 rounded-xl border border-purple-800/60">
                      <img
                        src={selectedAstrologer.avatar}
                        alt={selectedAstrologer.name}
                        className="w-12 h-12 rounded-full object-cover border border-amber-400 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-white truncate">{selectedAstrologer.name}</h4>
                        <span className="text-xs text-amber-200/80 block truncate">{selectedAstrologer.title}</span>
                        <span className="text-xs text-amber-400 font-semibold">★ {selectedAstrologer.rating} {isHi ? 'सत्यापित आचार्य' : 'Verified Acharya'}</span>
                      </div>
                    </div>

                    {/* Session details */}
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between py-1 border-b border-purple-900/60">
                        <span className="text-slate-400">{isHi ? 'दिनांक:' : 'Date:'}</span>
                        <strong className="text-amber-200">{new Date(selectedDate).toLocaleDateString(isHi ? 'hi-IN' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-purple-900/60">
                        <span className="text-slate-400">{isHi ? 'समय स्लॉट:' : 'Timing Slot:'}</span>
                        <strong className="text-amber-200">{selectedSlot}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-purple-900/60">
                        <span className="text-slate-400">{isHi ? 'माध्यम:' : 'Mode:'}</span>
                        <span className="text-emerald-400 font-bold uppercase">{consultationMode} (30 {isHi ? 'मिनट' : 'Mins'})</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-purple-900/60">
                        <span className="text-slate-400">{isHi ? 'परामर्शार्थी:' : 'Client:'}</span>
                        <span className="text-slate-200 font-medium">{userName}</span>
                      </div>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="pt-2 space-y-1.5 text-xs sm:text-sm">
                      <div className="flex justify-between text-slate-300">
                        <span>{isHi ? 'परामर्श शुल्क (30 मिनट):' : 'Consultation Fee (30 mins):'}</span>
                        <span>₹{basePrice}</span>
                      </div>
                      <div className="flex justify-between text-emerald-400 text-xs">
                        <span>{isHi ? 'कुण्डली विश्लेषण:' : 'Horoscope Chart Prep:'}</span>
                        <span>{isHi ? 'निःशुल्क' : 'FREE'}</span>
                      </div>
                      {couponApplied && (
                        <div className="flex justify-between text-amber-300 text-xs">
                          <span>{isHi ? `स्वागत कूपन (${couponCode}):` : `Welcome Coupon (${couponCode}):`}</span>
                          <span>-₹{discountAmount}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-purple-800 flex justify-between items-center text-sm sm:text-base font-bold">
                        <span className="text-white font-cinzel">{isHi ? 'कुल देय राशि:' : 'Total Payable:'}</span>
                        <span className="text-amber-300 text-lg sm:text-xl">₹{finalPrice}</span>
                      </div>
                    </div>

                    {/* Complete Payment Button */}
                    <button
                      type="button"
                      onClick={handleCompletePayment}
                      disabled={isProcessingPayment}
                      className="w-full py-3.5 rounded-xl gold-btn font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-gold-glow flex items-center justify-center gap-2 mt-3 disabled:opacity-50"
                    >
                      {isProcessingPayment ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                          <span>{isHi ? 'अपॉइंटमेंट सुरक्षित किया जा रहा है...' : 'Securing Appointment...'}</span>
                        </div>
                      ) : (
                        <span>
                          {paymentMethod === 'paylater' 
                            ? (isHi ? 'बुकिंग की पुष्टि करें (कॉल के बाद भुगतान)' : 'Confirm Booking (Pay Later)') 
                            : (isHi ? `₹${finalPrice} भुगतान करें एवं पुष्टि करें` : `Pay ₹${finalPrice} & Confirm`)}
                        </span>
                      )}
                    </button>

                  </div>
                </div>

              </div>

            </div>
          )}

          {/* STEP 3: BOOKING CONFIRMED SCREEN */}
          {step === 'confirmed' && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-5 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                  {isHi ? 'बुकिंग एवं भुगतान सफल' : 'Booking & Payment Successful'}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-300">
                  {isHi ? 'परामर्श की पुष्टि हो गई!' : 'Consultation Confirmed!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                  {isHi 
                    ? <>{selectedAstrologer.name} जी के साथ आपका परामर्श <strong className="text-amber-200">{new Date(selectedDate).toLocaleDateString('hi-IN', { month: 'short', day: 'numeric' })} को {selectedSlot}</strong> हेतु सफलतापूर्वक सुरक्षित हो गया है।</>
                    : <>Your appointment with <strong className="text-amber-200">{selectedAstrologer.name}</strong> has been secured for <strong className="text-amber-200">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {selectedSlot}</strong>.</>}
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-5 rounded-2xl bg-[#1a0a38] border border-amber-500/40 text-xs sm:text-sm text-left max-w-md w-full space-y-2 shadow-2xl">
                <div className="flex justify-between items-center pb-2 border-b border-purple-800/80">
                  <span className="text-slate-400">{isHi ? 'बुकिंग संदर्भ संख्या:' : 'Booking Reference:'}</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm sm:text-base">{bookingId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{isHi ? 'ज्योतिषी:' : 'Astrologer:'}</span>
                  <strong className="text-amber-200">{selectedAstrologer.name}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{isHi ? 'परामर्श का माध्यम:' : 'Mode of Call:'}</span>
                  <strong className="text-emerald-300 uppercase">{consultationMode} (30 {isHi ? 'मिनट' : 'Mins'})</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{isHi ? 'निर्धारित समय:' : 'Scheduled Time:'}</span>
                  <span className="text-slate-100">{new Date(selectedDate).toLocaleDateString(isHi ? 'hi-IN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}, {selectedSlot}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{isHi ? 'भुगतान राशि:' : 'Amount Paid:'}</span>
                  <span className="text-amber-300 font-bold">
                    {paymentMethod === 'paylater' 
                      ? (isHi ? `कॉल के बाद देय (₹${finalPrice})` : `Pay After Call (₹${finalPrice})`) 
                      : `₹${finalPrice} (${isHi ? 'भुगतान संपन्न' : 'Paid'})`}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-purple-800/80">
                  <span className="text-slate-400">{isHi ? 'मीटिंग एक्सेस कोड:' : 'Meeting Access Code:'}</span>
                  <span className="font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded font-bold">LIVE-{bookingId.replace('ASTRO-', '')}</span>
                </div>
              </div>

              {/* Connect / Calendar Links */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/919993027943?text=Namaste%20Astrotanntra,%20I%20have%20booked%20consultation%20ID%20${bookingId}%20for%20${selectedDate}%20at%20${selectedSlot}.%20My%20name%20is%20${encodeURIComponent(userName)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isHi ? 'व्हाट्सएप पर तुरंत जुड़ें' : 'Connect on WhatsApp Now'}</span>
                </a>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl gold-btn font-bold text-xs sm:text-sm uppercase cursor-pointer shadow-gold-glow"
                >
                  {isHi ? 'संपन्न' : 'Done'}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}


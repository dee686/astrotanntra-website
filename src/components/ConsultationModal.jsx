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
  const [userName, setUserName] = useState('Ansh Mishra');
  const [userPhone, setUserPhone] = useState('+91 99930 27943');
  const [userEmail, setUserEmail] = useState('ansh@example.com');
  const [queryTopic, setQueryTopic] = useState(initialTopic || 'Career Growth & Life Direction');
  const [birthDetails, setBirthDetails] = useState('15-Oct-1998, 02:30 PM, Tezpur Assam');

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

  // Generate next 7 days for quick calendar chips
  const quickDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const dateStr = formatDateStr(d);
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    return { dateStr, dayName, formattedDate, raw: d };
  });

  // Time Slots categorized by time of day
  const slotCategories = [
    {
      label: 'Morning Slots',
      icon: '🌅',
      slots: [
        '09:30 AM - 10:00 AM',
        '10:15 AM - 10:45 AM',
        '11:00 AM - 11:30 AM',
        '11:45 AM - 12:15 PM'
      ]
    },
    {
      label: 'Afternoon Slots',
      icon: '☀️',
      slots: [
        '02:00 PM - 02:30 PM',
        '02:45 PM - 03:15 PM',
        '03:45 PM - 04:15 PM',
        '04:30 PM - 05:00 PM'
      ]
    },
    {
      label: 'Evening & Night Slots',
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
      alert('Please fill all required consultation details');
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
                  Book Vedic Consultation
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  Live & Confidential
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Direct 1-on-1 private consultation with verified Vedic Masters & Jyotish Acharyas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-cosmic-800 hover:bg-rose-500/20 border border-purple-700/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step Progress Bar */}
        <div className="px-6 py-2.5 bg-[#170836] border-b border-purple-900/60 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
              step === 'schedule' ? 'bg-amber-400 text-slate-950 shadow-gold-glow' : 'bg-emerald-500 text-white'
            }`}>
              {step !== 'schedule' ? <Check className="w-3.5 h-3.5" /> : '1'}
            </span>
            <span className={step === 'schedule' ? 'font-bold text-amber-300' : 'text-slate-300'}>
              Select Date & Timing
            </span>
          </div>

          <ChevronRight className="w-4 h-4 text-purple-600" />

          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
              step === 'payment' ? 'bg-amber-400 text-slate-950 shadow-gold-glow' : step === 'confirmed' ? 'bg-emerald-500 text-white' : 'bg-purple-900/60 text-slate-400'
            }`}>
              {step === 'confirmed' ? <Check className="w-3.5 h-3.5" /> : '2'}
            </span>
            <span className={step === 'payment' ? 'font-bold text-amber-300' : 'text-slate-400'}>
              Payment Options
            </span>
          </div>

          <ChevronRight className="w-4 h-4 text-purple-600" />

          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
              step === 'confirmed' ? 'bg-emerald-500 text-white' : 'bg-purple-900/60 text-slate-400'
            }`}>
              3
            </span>
            <span className={step === 'confirmed' ? 'font-bold text-emerald-400' : 'text-slate-400'}>
              Confirmation
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
                  <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    1. Choose Astrologer
                  </label>
                  <span className="text-[11px] text-emerald-400 font-medium">● Available Online Today</span>
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
                          <h4 className="font-bold text-sm text-slate-100 truncate">{astro.name}</h4>
                          <span className="text-xs text-amber-400 font-bold flex items-center gap-0.5">
                            ★ {astro.rating}
                          </span>
                        </div>
                        <span className="text-[11px] text-amber-200/70 block truncate">{astro.title}</span>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                          <span>{astro.experience}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-semibold">₹{astro.pricePerMin * 30} / 30 min</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              {/* 2. Consultation Mode */}
              <div>
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2.5">
                  2. Select Consultation Mode
                </label>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setConsultationMode('call')}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      consultationMode === 'call'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-gold-glow'
                        : 'bg-[#180935] border-purple-800 text-slate-300 hover:border-purple-600'
                    }`}
                  >
                    <Phone className="w-5 h-5 text-amber-400" />
                    <span>Audio Call</span>
                    <span className="text-[10px] text-slate-400 font-normal">HD Voice Line</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationMode('video')}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      consultationMode === 'video'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-gold-glow'
                        : 'bg-[#180935] border-purple-800 text-slate-300 hover:border-purple-600'
                    }`}
                  >
                    <Video className="w-5 h-5 text-amber-400" />
                    <span>Video Call</span>
                    <span className="text-[10px] text-slate-400 font-normal">Face-to-Face Kundli</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationMode('chat')}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      consultationMode === 'chat'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-gold-glow'
                        : 'bg-[#180935] border-purple-800 text-slate-300 hover:border-purple-600'
                    }`}
                  >
                    <MessageSquare className="w-5 h-5 text-amber-400" />
                    <span>Live Chat</span>
                    <span className="text-[10px] text-slate-400 font-normal">Instant Q&A Messaging</span>
                  </button>
                </div>
              </div>

              {/* 3. Interactive Calendar (Date Selection) */}
              <div className="bg-[#180935] border border-purple-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-800/60 pb-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-amber-400" />
                    <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      3. Select Consultation Date
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Custom Date:</span>
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
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                  {quickDays.map((day) => {
                    const isSelected = selectedDate === day.dateStr;
                    return (
                      <button
                        key={day.dateStr}
                        type="button"
                        onClick={() => setSelectedDate(day.dateStr)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 border-amber-300 font-bold shadow-gold-glow scale-105'
                            : 'bg-[#1f0c43] border-purple-700/60 text-slate-200 hover:border-amber-500/50 hover:bg-[#271054]'
                        }`}
                      >
                        <span className={`text-[10px] uppercase font-semibold ${isSelected ? 'text-slate-900' : 'text-amber-300/80'}`}>
                          {day.dayName}
                        </span>
                        <span className="text-xs font-bold mt-0.5">
                          {day.formattedDate}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="text-[11px] text-slate-300 flex items-center justify-between">
                  <span>Selected Date: <strong className="text-amber-300">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong></span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 8 Slots Available
                  </span>
                </div>
              </div>

              {/* 4. Timing Slots for the Selected Date */}
              <div className="bg-[#180935] border border-purple-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-purple-800/60 pb-3">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    4. Select Available Time Slot ({new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                  </label>
                </div>

                <div className="space-y-4">
                  {slotCategories.map((cat, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-200/90">
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
                              className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
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

                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>Selected Time Slot: <strong className="text-amber-300">{selectedSlot}</strong> (30 Mins)</span>
                  <span className="text-emerald-400 font-medium">Guaranteed Astrologer Attention</span>
                </div>
              </div>

              {/* 5. User Details & Query */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1 font-medium">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180935] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 block mb-1 font-medium">WhatsApp / Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+91 99930 27943"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180935] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 block mb-1 font-medium">Email Address (For Appointment & PDF)</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180935] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 block mb-1 font-medium">Birth Details (DOB, Time, City)</label>
                  <input
                    type="text"
                    value={birthDetails}
                    onChange={(e) => setBirthDetails(e.target.value)}
                    placeholder="e.g. 15 Oct 1998, 2:30 PM, Tezpur"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180935] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[11px] text-slate-300 block mb-1 font-medium">Your Specific Question / Concern *</label>
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
                  <span>100% Confidential • Verified Vedic Lineage</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto gold-btn px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <span>Proceed to Payment (₹{finalPrice})</span>
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
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Edit Date, Time or Astrologer</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Payment Method Selection */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-cinzel text-base font-bold text-amber-300 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      Select Payment Option
                    </h3>
                    <span className="text-[11px] text-slate-400">256-Bit SSL Encrypted</span>
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
                      <span className="text-xs">UPI / QR</span>
                      <span className="text-[9px] text-emerald-400">Instant</span>
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
                      <span className="text-xs">Cards</span>
                      <span className="text-[9px] text-slate-400">Debit / Credit</span>
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
                      <span className="text-xs">Net Banking</span>
                      <span className="text-[9px] text-slate-400">All Banks</span>
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
                      <span className="text-xs">Pay Later</span>
                      <span className="text-[9px] text-emerald-400">Post-Call</span>
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
                      Appointment Summary
                    </h3>

                    {/* Astrologer mini card */}
                    <div className="flex items-center gap-3 bg-[#120527] p-3 rounded-xl border border-purple-800/60">
                      <img
                        src={selectedAstrologer.avatar}
                        alt={selectedAstrologer.name}
                        className="w-12 h-12 rounded-full object-cover border border-amber-400 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-white truncate">{selectedAstrologer.name}</h4>
                        <span className="text-[10px] text-amber-200/70 block truncate">{selectedAstrologer.title}</span>
                        <span className="text-[10px] text-amber-400 font-semibold">★ {selectedAstrologer.rating} Verified Acharya</span>
                      </div>
                    </div>

                    {/* Session details */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-purple-900/60">
                        <span className="text-slate-400">Date:</span>
                        <strong className="text-amber-200">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-purple-900/60">
                        <span className="text-slate-400">Timing Slot:</span>
                        <strong className="text-amber-200">{selectedSlot}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-purple-900/60">
                        <span className="text-slate-400">Mode:</span>
                        <span className="text-emerald-400 font-bold uppercase">{consultationMode} (30 Mins)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-purple-900/60">
                        <span className="text-slate-400">Client:</span>
                        <span className="text-slate-200">{userName}</span>
                      </div>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="pt-2 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Consultation Fee (30 mins):</span>
                        <span>₹{basePrice}</span>
                      </div>
                      <div className="flex justify-between text-emerald-400 text-[11px]">
                        <span>Horoscope Chart Prep:</span>
                        <span>FREE</span>
                      </div>
                      {couponApplied && (
                        <div className="flex justify-between text-amber-300 text-[11px]">
                          <span>Welcome Coupon ({couponCode}):</span>
                          <span>-₹{discountAmount}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-purple-800 flex justify-between items-center text-sm font-bold">
                        <span className="text-white font-cinzel">Total Payable:</span>
                        <span className="text-amber-300 text-lg">₹{finalPrice}</span>
                      </div>
                    </div>

                    {/* Complete Payment Button */}
                    <button
                      type="button"
                      onClick={handleCompletePayment}
                      disabled={isProcessingPayment}
                      className="w-full py-3.5 rounded-xl gold-btn font-bold text-xs uppercase tracking-wider cursor-pointer shadow-gold-glow flex items-center justify-center gap-2 mt-3 disabled:opacity-50"
                    >
                      {isProcessingPayment ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                          <span>Securing Appointment...</span>
                        </div>
                      ) : (
                        <span>
                          {paymentMethod === 'paylater' ? 'Confirm Booking (Pay Later)' : `Pay ₹${finalPrice} & Confirm`}
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
                  Booking & Payment Successful
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-300">
                  Consultation Confirmed!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                  Your appointment with <strong className="text-amber-200">{selectedAstrologer.name}</strong> has been secured for <strong className="text-amber-200">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {selectedSlot}</strong>.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-5 rounded-2xl bg-[#1a0a38] border border-amber-500/40 text-xs text-left max-w-md w-full space-y-2 shadow-2xl">
                <div className="flex justify-between items-center pb-2 border-b border-purple-800/80">
                  <span className="text-slate-400">Booking Reference:</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">{bookingId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Astrologer:</span>
                  <strong className="text-amber-200">{selectedAstrologer.name}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Mode of Call:</span>
                  <strong className="text-emerald-300 uppercase">{consultationMode} (30 Mins)</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Scheduled Time:</span>
                  <span className="text-slate-100">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}, {selectedSlot}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Amount Paid:</span>
                  <span className="text-amber-300 font-bold">{paymentMethod === 'paylater' ? 'Pay After Call (₹' + finalPrice + ')' : '₹' + finalPrice + ' (Paid)'}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-purple-800/80">
                  <span className="text-slate-400">Meeting Access Code:</span>
                  <span className="font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded font-bold">LIVE-{bookingId.replace('ASTRO-', '')}</span>
                </div>
              </div>

              {/* Connect / Calendar Links */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/919993027943?text=Namaste%20Astrotanntra,%20I%20have%20booked%20consultation%20ID%20${bookingId}%20for%20${selectedDate}%20at%20${selectedSlot}.%20My%20name%20is%20${encodeURIComponent(userName)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect on WhatsApp Now</span>
                </a>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl gold-btn font-bold text-xs uppercase cursor-pointer shadow-gold-glow"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}


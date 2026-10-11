import React from 'react';
import { 
  Compass, 
  Heart, 
  Hand, 
  Hash, 
  Home, 
  Hourglass, 
  BookOpen, 
  Star, 
  CheckCircle, 
  Award, 
  ShieldCheck, 
  Headphones, 
  Users, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TAROT_PACKAGES } from '../data/tarotData';
import { KUNDLI_PACKAGES } from '../data/kundliPackagesData';

export default function MiddleCardsSection({
  onOpenConsultation,
  onOpenMilan,
  onOpenNumerology,
  onOpenTarotWithPackage,
  onOpenKundli,
  lang
}) {
  const isHi = lang === 'hi';

  const services = [
    {
      id: 'vedic',
      title: isHi ? 'वैदिक ज्योतिष' : 'Vedic Astrology',
      desc: isHi ? 'जीवन की सभी समस्याओं का सटीक समाधान' : 'Accurate solutions for all life problems',
      icon: Compass,
      action: () => onOpenConsultation('Vedic Astrology')
    },
    {
      id: 'milan',
      title: isHi ? 'कुण्डली मिलान' : 'Kundli Matching',
      desc: isHi ? 'सुखी वैवाहिक जीवन हेतु अष्टकूट विश्लेषण' : 'Comprehensive analysis for happy marriage',
      icon: Heart,
      action: onOpenMilan
    },
    {
      id: 'tarot',
      title: isHi ? 'टैरो कार्ड' : 'Tarot Card',
      desc: isHi ? 'भविष्य एवं जीवन दिशा हेतु दिव्य टैरो मार्गदर्शन' : 'Mystic card guidance for destiny & choices',
      icon: BookOpen,
      action: () => (onOpenTarotWithPackage ? onOpenTarotWithPackage(null) : onOpenConsultation('Tarot Card'))
    },
    {
      id: 'muhurta',
      title: isHi ? 'शुभ मुहूर्त' : 'Muhurta Consultation',
      desc: isHi ? 'महत्वपूर्ण कार्यों हेतु शुभ समय चुनें' : 'Choose the right time for important events',
      icon: Hourglass,
      action: () => onOpenConsultation('Muhurta Consultation')
    }
  ];

  const whyChoosePoints = [
    {
      title: isHi ? '10+ वर्षों का अनुभव' : '10+ Years Experience',
      desc: isHi ? 'विश्वसनीय ज्योतिषीय समाधान प्रदान करने का' : 'Of delivering trusted astrology solutions',
      icon: Award
    },
    {
      title: isHi ? 'प्रमाणित वैदिक ज्योतिषी' : 'Certified Astrologers',
      desc: isHi ? 'अनुभवी एवं सत्यापित ज्योतिष विशेषज्ञ' : 'Experienced & verified Vedic experts',
      icon: CheckCircle
    },
    {
      title: isHi ? '98% संतुष्ट ग्राहक' : '98% Client Satisfaction',
      desc: isHi ? 'देश-विदेश में हजारों प्रसन्न जातक' : 'Thousands of happy clients worldwide',
      icon: Users
    }
  ];

  return (
    <section id="services" className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-6 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        
        {/* CARD 1: KUNDLI ANALYSIS PACKAGES - ASTROTANNTRA */}
        <div className="bg-[#fef9f0] text-slate-900 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-amber-400/60 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="text-center pb-3 mb-3 border-b border-amber-200">
              <h3 className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-[#4a154b] uppercase">
                {isHi ? 'कुण्डली विश्लेषण पैकेज' : 'Kundli Analysis Packages'}
              </h3>
              <span className="text-[10px] text-amber-800 font-semibold uppercase tracking-wider block mt-0.5">
                Astrotanntra Vedic Jyotish
              </span>
            </div>

            <div className="space-y-2.5">
              {KUNDLI_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-3 rounded-xl bg-white border border-amber-200/90 hover:border-amber-400 transition-all flex flex-col justify-between shadow-sm group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="w-4 h-4 rounded-full bg-[#531e84] text-amber-300 font-bold text-[9px] flex items-center justify-center shrink-0">
                          {pkg.num}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-800 transition-colors leading-tight">
                          {isHi ? pkg.nameHi : pkg.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 pl-5.5 leading-snug">
                        {isHi ? pkg.descHi : pkg.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-amber-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block leading-none">{isHi ? 'शुल्क (INR)' : 'Rate (INR)'}</span>
                      <span className="font-bold text-sm sm:text-base text-[#8a4b08] tabular-nums">
                        ₹{pkg.priceInr.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenConsultation(`Kundli Analysis: ${pkg.name} (₹${pkg.priceInr})`)}
                      className="px-3 py-1.5 rounded-lg bg-[#531e84] hover:bg-[#3d1363] text-amber-200 font-bold text-[10px] tracking-wider uppercase transition-colors cursor-pointer shadow-sm whitespace-nowrap"
                    >
                      {isHi ? 'बुक करें' : 'BOOK NOW'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs text-amber-900">
            <span className="font-semibold">
              {isHi ? 'मुफ्त जन्मकुण्डली बनाएं?' : 'Want free natal Kundli?'}
            </span>
            <button
              onClick={onOpenKundli}
              className="text-xs font-bold text-[#531e84] hover:underline cursor-pointer"
            >
              {isHi ? 'कुण्डली बनाएं →' : 'Generate Free →'}
            </button>
          </div>
        </div>

        {/* CARD 2: TAROT READING PACKAGES - ASTROTANNTRA */}
        <div className="bg-[#fef9f0] text-slate-900 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-amber-400/60 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="text-center pb-3 mb-3 border-b border-amber-200">
              <h3 className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-[#4a154b] uppercase">
                {isHi ? 'टैरो रीडिंग पैकेज' : 'Tarot Reading Packages'}
              </h3>
              <span className="text-[10px] text-amber-800 font-semibold uppercase tracking-wider block mt-0.5">
                Astrotanntra Mystic Tarot
              </span>
            </div>

            <div className="space-y-1.5">
              {TAROT_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-white border border-amber-200/80 hover:border-amber-400 transition-all text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
                    <span className="w-4.5 h-4.5 rounded-full bg-[#531e84] text-amber-300 font-bold text-[9px] flex items-center justify-center shrink-0">
                      {pkg.num}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-slate-900 block leading-tight text-[11px] sm:text-xs">
                        {isHi ? (pkg.nameHi || pkg.name) : pkg.name}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        {pkg.cards} {isHi ? 'कार्ड्स' : 'Cards'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                    <span className="font-bold text-[#8a4b08] text-xs sm:text-[13px] tabular-nums">
                      ₹{pkg.priceInr.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => onOpenTarotWithPackage(pkg)}
                      className="px-2.5 py-1 rounded-lg bg-[#531e84] hover:bg-[#3d1363] text-amber-200 font-bold text-[10px] tracking-wider uppercase transition-colors cursor-pointer shadow-sm whitespace-nowrap"
                    >
                      {isHi ? 'बुक करें' : 'BOOK NOW'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/80 text-center">
            <span className="text-[11px] text-slate-600">
              {isHi
                ? 'तुरंत इंटरैक्टिव कार्ड चयन + व्यक्तिगत आध्यात्मिक मार्गदर्शन शामिल'
                : 'Instant interactive draw + personalized spiritual guidance included'}
            </span>
          </div>
        </div>

        {/* CARD 3: OUR SERVICES & TRUST GUARANTEE */}
        <div className="bg-[#fef9f0] text-slate-900 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-amber-400/60 p-4 sm:p-5 flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div>
            <div className="text-center pb-3 mb-3 border-b border-amber-200">
              <h3 className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-[#4a154b] uppercase">
                {isHi ? 'हमारी प्रमुख सेवाएं' : 'OUR PREMIUM SERVICES'}
              </h3>
              <span className="text-[10px] text-amber-800 font-semibold uppercase tracking-wider block mt-0.5">
                {isHi ? 'सत्यापित वैदिक ज्योतिष' : 'Verified Vedic Astrology'}
              </span>
            </div>

            {/* Quick Service Action Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {services.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="flex flex-col items-center p-2 rounded-xl border border-amber-200/90 bg-white hover:bg-amber-50 hover:border-amber-400 transition-all text-center group cursor-pointer shadow-sm"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#531e84] text-amber-300 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-tight truncate w-full">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Why Choose Us Trust Points */}
            <div className="space-y-2 pt-2 border-t border-amber-200/60">
              {whyChoosePoints.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-white/70 border border-amber-200/60 text-xs"
                  >
                    <div className="w-6 h-6 rounded-md bg-[#531e84] text-amber-300 flex items-center justify-center shrink-0">
                      <IconComponent className="w-3 h-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-slate-900 block leading-tight text-[11px] truncate">
                        {item.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center justify-center gap-2 text-xs text-amber-900 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              {isHi 
                ? '100% गोपनीय एवं सुरक्षित वैदिक परामर्श' 
                : '100% Confidential & Secure Vedic Consultations'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

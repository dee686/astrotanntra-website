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
  Sparkles 
} from 'lucide-react';
import { TAROT_PACKAGES } from '../data/tarotData';

export default function MiddleCardsSection({
  onOpenConsultation,
  onOpenMilan,
  onOpenNumerology,
  onOpenTarotWithPackage,
  onOpenKundli,
  lang
}) {
  const services = [
    {
      id: 'vedic',
      title: 'Vedic Astrology',
      desc: 'Accurate solutions for all life problems',
      icon: Compass,
      action: () => onOpenConsultation('Vedic Astrology')
    },
    {
      id: 'milan',
      title: 'Kundli Matching',
      desc: 'Comprehensive analysis for happy marriage',
      icon: Heart,
      action: onOpenMilan
    },
    {
      id: 'palm',
      title: 'Palm Reading',
      desc: 'Know your future through palm study',
      icon: Hand,
      action: () => onOpenConsultation('Palm Reading')
    },
    {
      id: 'numerology',
      title: 'Numerology',
      desc: 'Discover the power of numbers',
      icon: Hash,
      action: onOpenNumerology
    },
    {
      id: 'vastu',
      title: 'Vastu Consultation',
      desc: 'Bring harmony and positivity to life',
      icon: Home,
      action: () => onOpenConsultation('Vastu Consultation')
    },
    {
      id: 'muhurta',
      title: 'Muhurta Consultation',
      desc: 'Choose the right time for important events',
      icon: Hourglass,
      action: () => onOpenConsultation('Muhurta Consultation')
    }
  ];

  const whyChoosePoints = [
    {
      title: '10+ Years Experience',
      desc: 'Of delivering trusted astrology solutions',
      icon: Award
    },
    {
      title: 'Certified Astrologers',
      desc: 'Experienced & verified Vedic experts',
      icon: CheckCircle
    },
    {
      title: '98% Client Satisfaction',
      desc: 'Thousands of happy clients worldwide',
      icon: Users
    },
    {
      title: 'Personalized Guidance',
      desc: 'Solutions tailored to your birth chart',
      icon: Sparkles
    },
    {
      title: 'Privacy & Security',
      desc: 'Your information is 100% safe with us',
      icon: ShieldCheck
    },
    {
      title: '24/7 Support',
      desc: 'We are here for you anytime, anywhere',
      icon: Headphones
    }
  ];

  return (
    <section id="services" className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-6 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: OUR PREMIUM SERVICES */}
        <div className="bg-[#fef9f0] text-slate-900 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-amber-400/60 p-5 flex flex-col justify-between">
          <div>
            <div className="text-center pb-3 mb-4 border-b border-amber-200">
              <h3 className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-[#4a154b] uppercase">
                {lang === 'hi' ? 'हमारी प्रमुख सेवाएं' : 'OUR PREMIUM SERVICES'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {services.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-amber-200/90 bg-white hover:bg-amber-50 hover:border-amber-400 transition-all text-left group cursor-pointer shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#531e84] text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-tight">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-600 line-clamp-1 mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs text-amber-900">
            <span className="font-semibold">Need custom horoscope analysis?</span>
            <button
              onClick={() => onOpenConsultation('Custom Consultation')}
              className="text-xs font-bold text-[#531e84] hover:underline cursor-pointer"
            >
              Consult Now &rarr;
            </button>
          </div>
        </div>

        {/* CARD 2: TAROT READING PACKAGES */}
        <div className="bg-[#fef9f0] text-slate-900 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-amber-400/60 p-5 flex flex-col justify-between">
          <div>
            <div className="text-center pb-3 mb-4 border-b border-amber-200">
              <h3 className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-[#4a154b] uppercase">
                {lang === 'hi' ? 'टैरो रीडिंग पैकेज' : 'TAROT READING PACKAGES'}
              </h3>
            </div>

            <div className="space-y-2.5">
              {TAROT_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-white border border-amber-200/80 hover:border-amber-400 transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">🃏</span>
                    <div>
                      <span className="font-bold text-slate-900 block leading-tight">{pkg.name}</span>
                      <span className="text-[10px] text-slate-600 block">{pkg.cards} {pkg.cards === 1 ? 'Card' : 'Cards'} reading</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-amber-700 text-sm">
                      ${pkg.price}
                    </span>
                    <button
                      onClick={() => onOpenTarotWithPackage(pkg)}
                      className="px-2.5 py-1 rounded bg-[#531e84] hover:bg-[#3d1363] text-amber-200 font-bold text-[10px] tracking-wider uppercase transition-colors cursor-pointer shadow-sm"
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/80 text-center">
            <span className="text-[11px] text-slate-600">
              Instant interactive draw + personalized spiritual guidance included
            </span>
          </div>
        </div>

        {/* CARD 3: WHY CHOOSE ASTROTANNTRA? */}
        <div className="bg-[#fef9f0] text-slate-900 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-amber-400/60 p-5 flex flex-col justify-between">
          <div>
            <div className="text-center pb-3 mb-4 border-b border-amber-200">
              <h3 className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-[#4a154b] uppercase">
                {lang === 'hi' ? 'हमें क्यों चुनें?' : 'WHY CHOOSE ASTROTANNTRA?'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {whyChoosePoints.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2 rounded-xl bg-white border border-amber-200/70"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#531e84] text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 leading-tight">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-600 mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center justify-center gap-2 text-xs text-amber-900 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Confidential & Secure Vedic Consultations</span>
          </div>
        </div>

      </div>
    </section>
  );
}

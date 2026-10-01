import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials({ lang }) {
  const reviews = [
    {
      id: 1,
      name: lang === 'hi' ? 'राहुल शर्मा' : 'Rahul Sharma',
      role: lang === 'hi' ? 'सॉफ्टवेयर आर्किटेक्ट, बैंगलोर' : 'Software Architect, Bangalore',
      rating: 5,
      avatar: '/astrologers/pandit_rajesh.jpg',
      text: lang === 'hi'
        ? 'परामर्श अत्यंत सटीक और ज्ञानवर्धक था, जिससे मुझे सही करियर निर्णय लेने में बहुत सहायता मिली। अत्यधिक अनुशंसित!'
        : 'The consultation was incredibly accurate and helped me make the right career decision. Highly recommended!'
    },
    {
      id: 2,
      name: lang === 'hi' ? 'प्रिया वर्मा' : 'Priya Verma',
      role: lang === 'hi' ? 'फैशन डिजाइनर, मुंबई' : 'Fashion Designer, Mumbai',
      rating: 5,
      avatar: '/testimonials/priya.jpg',
      text: lang === 'hi'
        ? 'एस्ट्रोटांत्रा ने मेरे जीवन में सकारात्मक बदलाव लाया! मुझे जो मार्गदर्शन मिला वह अत्यंत स्पष्ट और व्यावहारिक था।'
        : 'Astrotanntra changed my life! The guidance I received was very clear and practical. Thank you so much!'
    },
    {
      id: 3,
      name: lang === 'hi' ? 'अमन गुप्ता' : 'Aman Gupta',
      role: lang === 'hi' ? 'उद्यमी, नई दिल्ली' : 'Entrepreneur, New Delhi',
      rating: 5,
      avatar: '/astrologers/acharya_devendra.jpg',
      text: lang === 'hi'
        ? 'टैरो और ज्योतिषीय सत्र के बाद मुझे अपने जीवन और व्यवसाय में अभूतपूर्व स्पष्टता और आत्मविश्वास मिला।'
        : 'I got clarity and confidence in my life after their tarot and astrology session. Amazing experience!'
    },
    {
      id: 4,
      name: lang === 'hi' ? 'डॉ. सुनीता राव' : 'Dr. Sunita Rao',
      role: lang === 'hi' ? 'चिकित्सा निदेशक, हैदराबाद' : 'Medical Director, Hyderabad',
      rating: 5,
      avatar: '/testimonials/sunita.jpg',
      text: lang === 'hi'
        ? 'मेरी बेटी के लिए कुण्डली मिलान का विश्लेषण बहुत गहन और प्रामाणिक था, जिससे पूरे परिवार को संतुष्टि मिली।'
        : 'The Kundli matching analysis for my daughter was thorough, scientific, and brought peace of mind to our family.'
    },
    {
      id: 5,
      name: lang === 'hi' ? 'विक्रम मल्होत्रा' : 'Vikram Malhotra',
      role: lang === 'hi' ? 'वित्तीय विश्लेषक, लंदन' : 'Finance Analyst, London',
      rating: 5,
      avatar: '/astrologers/pandit_rajesh.jpg',
      text: lang === 'hi'
        ? 'साढ़े साती के उपाय और रत्न परामर्श ने मेरी पूरी कार्यप्रणाली बदल दी। वैदिक ज्योतिष के सच्चे विद्वान।'
        : 'The Sade Sati remedies and gemstone recommendation changed my entire perspective. True masters of Vedic shastra.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1));
  };

  // For desktop/tablet, get 3 items wrapping cyclically
  const getDesktopReviews = () => {
    const start = currentIndex % reviews.length;
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(reviews[(start + i) % reviews.length]);
    }
    return items;
  };

  const desktopReviews = getDesktopReviews();
  const mobileReview = reviews[currentIndex];

  const renderCard = (rev) => (
    <div
      key={rev.id}
      className="bg-[#fef9f0] text-slate-900 rounded-2xl p-4 sm:p-5 shadow-[0_10px_25px_rgba(0,0,0,0.4)] border border-amber-300 flex flex-col justify-between transition-transform hover:-translate-y-1"
    >
      <div>
        <div className="flex items-center gap-3 sm:gap-4 mb-3">
          <img
            src={rev.avatar}
            alt={rev.name}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-amber-500 shrink-0 shadow-sm"
          />
          <div className="min-w-0">
            <div className="flex items-center text-amber-500 text-xs mb-1">
              {Array.from({ length: rev.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h4 className="font-bold text-sm text-slate-900 leading-tight truncate">{rev.name}</h4>
            <span className="text-[11px] text-slate-600 block truncate">{rev.role}</span>
          </div>
        </div>

        <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic relative">
          "{rev.text}"
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-[10px] sm:text-xs text-amber-800 font-semibold">
        <span>{lang === 'hi' ? 'सत्यापित जातक' : 'Verified Client'}</span>
        <span className="text-emerald-700 flex items-center gap-1">✓ {lang === 'hi' ? 'सत्यापित परामर्श' : 'Verified Session'}</span>
      </div>
    </div>
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-10 mb-12 relative z-20">
      
      {/* Title with ornate golden boundary */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="h-[1px] w-8 sm:w-28 bg-amber-400/50" />
        <div className="px-4 sm:px-6 py-2 rounded-full border border-amber-400/40 bg-cosmic-900/60 backdrop-blur-sm">
          <h3 className="font-cinzel font-bold text-base sm:text-xl tracking-widest text-amber-300 uppercase text-center drop-shadow">
            {lang === 'hi' ? 'हमारे ग्राहक क्या कहते हैं' : 'WHAT OUR CLIENTS SAY'}
          </h3>
        </div>
        <div className="h-[1px] w-8 sm:w-28 bg-amber-400/50" />
      </div>

      {/* Testimonials Carousel */}
      <div className="relative flex items-center">
        
        {/* Prev Arrow */}
        <button
          onClick={prevReview}
          className="absolute -left-2 sm:-left-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cosmic-900/90 border border-amber-400 text-amber-300 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer shadow-lg"
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Mobile View: Single Focused Card */}
        <div className="w-full px-5 md:hidden animate-fadeIn">
          {renderCard(mobileReview)}
        </div>

        {/* Desktop / Tablet View: 3 Review Cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full px-6">
          {desktopReviews.map((rev) => renderCard(rev))}
        </div>

        {/* Next Arrow */}
        <button
          onClick={nextReview}
          className="absolute -right-2 sm:-right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cosmic-900/90 border border-amber-400 text-amber-300 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer shadow-lg"
          aria-label="Next testimonials"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

      </div>

      {/* Dots Indicator for Mobile & Tablet */}
      <div className="flex justify-center items-center gap-1.5 mt-5">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all rounded-full cursor-pointer ${
              currentIndex === idx
                ? 'w-6 h-2 bg-amber-400 shadow-gold-glow'
                : 'w-2 h-2 bg-purple-800/80 hover:bg-amber-400/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

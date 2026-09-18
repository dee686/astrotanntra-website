import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials({ lang }) {
  const reviews = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'Software Architect, Bangalore',
      rating: 5,
      avatar: '/astrologers/pandit_rajesh.jpg',
      text: 'The consultation was incredibly accurate and helped me make the right career decision. Highly recommended!'
    },
    {
      id: 2,
      name: 'Priya Verma',
      role: 'Fashion Designer, Mumbai',
      rating: 5,
      avatar: '/testimonials/priya.jpg',
      text: 'Astrotanntra changed my life! The guidance I received was very clear and practical. Thank you so much!'
    },
    {
      id: 3,
      name: 'Aman Gupta',
      role: 'Entrepreneur, New Delhi',
      rating: 5,
      avatar: '/astrologers/acharya_devendra.jpg',
      text: 'I got clarity and confidence in my life after their tarot and astrology session. Amazing experience!'
    },
    {
      id: 4,
      name: 'Dr. Sunita Rao',
      role: 'Medical Director, Hyderabad',
      rating: 5,
      avatar: '/testimonials/sunita.jpg',
      text: 'The Kundli matching analysis for my daughter was thorough, scientific, and brought peace of mind to our family.'
    },
    {
      id: 5,
      name: 'Vikram Malhotra',
      role: 'Finance Analyst, London',
      rating: 5,
      avatar: '/astrologers/pandit_rajesh.jpg',
      text: 'The Sade Sati remedies and gemstone recommendation changed my entire perspective. True masters of Vedic shastra.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 3 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev >= reviews.length - 3 ? 0 : prev + 1));
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-10 mb-12 relative z-20">
      
      {/* Title with ornate golden boundary */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="h-[1px] w-12 sm:w-28 bg-amber-400/50" />
        <div className="px-6 py-2 rounded-full border border-amber-400/40 bg-cosmic-900/60 backdrop-blur-sm">
          <h3 className="font-cinzel font-bold text-lg sm:text-xl tracking-widest text-amber-300 uppercase text-center drop-shadow">
            {lang === 'hi' ? 'हमारे ग्राहक क्या कहते हैं' : 'WHAT OUR CLIENTS SAY'}
          </h3>
        </div>
        <div className="h-[1px] w-12 sm:w-28 bg-amber-400/50" />
      </div>

      {/* Testimonials Carousel */}
      <div className="relative flex items-center">
        
        {/* Prev Arrow */}
        <button
          onClick={prevReview}
          className="absolute -left-2 sm:-left-5 z-20 w-9 h-9 rounded-full bg-cosmic-900/90 border border-amber-400 text-amber-300 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer shadow-lg"
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
          {visibleReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#fef9f0] text-slate-900 rounded-2xl p-5 shadow-[0_10px_25px_rgba(0,0,0,0.4)] border border-amber-300 flex flex-col justify-between transition-transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-500 shrink-0 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center text-amber-500 text-xs mb-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 leading-tight">{rev.name}</h4>
                    <span className="text-[11px] text-slate-600">{rev.role}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic relative">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-[10px] text-amber-800 font-semibold">
                <span>Verified Client</span>
                <span className="text-emerald-700 flex items-center gap-1">✓ Verified Session</span>
              </div>
            </div>
          ))}
        </div>

        {/* Next Arrow */}
        <button
          onClick={nextReview}
          className="absolute -right-2 sm:-right-5 z-20 w-9 h-9 rounded-full bg-cosmic-900/90 border border-amber-400 text-amber-300 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer shadow-lg"
          aria-label="Next testimonials"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { X, BookOpen, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export default function BlogModal({ onClose, onOpenConsultation, lang }) {
  const articles = [
    {
      id: 1,
      title: 'Demystifying Shani Sade Sati: Why You Should Not Fear Saturn',
      author: 'Acharya Devendra Shastri',
      date: 'Sep 10, 2026',
      readTime: '6 min read',
      category: 'Vedic Shastra',
      image: '🪐',
      summary: 'Shani is not a tormentor but the cosmic judge (Nyayadhikari). Learn how Sade Sati purifies ego, brings lifelong discipline, and why major life achievements often occur during this transformative 7.5-year cycle.',
      tags: ['Saturn', 'Sade Sati', 'Remedies']
    },
    {
      id: 2,
      title: 'How Ashtakoot Gun Milan Works: Beyond Just The 36 Points',
      author: 'Dr. Ananya Mukherjee',
      date: 'Sep 06, 2026',
      readTime: '8 min read',
      category: 'Matrimonial Astrology',
      image: '💑',
      summary: 'Why a 28+ Gun Milan can still encounter hurdles if the 7th Lord is afflicted, and why Nadi Dosha cancellations exist in ancient texts. An in-depth guide to genuine marital compatibility.',
      tags: ['Gun Milan', 'Marriage', 'Nadi Dosha']
    },
    {
      id: 3,
      title: 'The Secret Power of Your 27 Birth Nakshatras in Career Progression',
      author: 'Pandit Rajesh Vashistha',
      date: 'Aug 28, 2026',
      readTime: '5 min read',
      category: 'Career & Wealth',
      image: '✨',
      summary: 'While your Sun and Moon signs provide broad strokes, your Nakshatra pada reveals your micro-talents, subconscious motivation, and the precise industry where you naturally achieve effortless mastery.',
      tags: ['Nakshatra', 'Career', 'Lagna']
    },
    {
      id: 4,
      title: 'Tarot vs. Vedic Astrology: How Combining Both Brings Unmatched Clarity',
      author: 'Meera Sen',
      date: 'Aug 19, 2026',
      readTime: '4 min read',
      category: 'Tarot & Intuition',
      image: '🃏',
      summary: 'Astrology charts the macro cosmic timeline, while Tarot reflects the immediate energetic vibration of this present moment. Discover how using both unlocks crystal clarity.',
      tags: ['Tarot', 'Divination', 'Intuition']
    }
  ];

  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#13062c] border border-amber-500/50 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] text-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-purple-800/60 bg-gradient-to-r from-[#1c0a3c] via-[#240d4f] to-[#160630] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300">
                ASTROTANNTRA Vedic Journal & Blog
              </h2>
              <p className="text-xs text-slate-300">
                Wisdom, astrological transits, occult secrets and spiritual guidance
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

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {selectedArticle ? (
            /* Detailed Article View */
            <div className="space-y-4 animate-fadeIn">
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-xs text-amber-400 font-semibold hover:underline flex items-center gap-1 mb-2 cursor-pointer"
              >
                &larr; Back to all articles
              </button>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-400">• {selectedArticle.date}</span>
                <span className="text-xs text-slate-400">• By {selectedArticle.author}</span>
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-300 leading-snug">
                {selectedArticle.title}
              </h3>

              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30 text-xs text-slate-200 leading-relaxed space-y-3 font-light">
                <p className="text-sm font-medium text-amber-200">{selectedArticle.summary}</p>
                <p>
                  According to the ancient sage Parashara, every celestial graha (planet) operates as a mirror to our own consciousness. When Saturn enters a transitionary sign, it asks us to shed obsolete attachments, examine our ethical foundations, and perform duty (Karma) without anxious longing for premature rewards.
                </p>
                <p>
                  In traditional Jyotish, remedies do not seek to bribe planetary deities; rather, they align human vibration with universal order. Reciting the sacred Shani Gayatri mantra, offering water at the roots of sacred peepal or banyan trees, and serving those in hardship restores spiritual equilibrium.
                </p>
                <p>
                  If you are currently feeling the heavy weight of planetary transits or searching for direction in your personal or professional life, remember that every challenge carries an equal seed of spiritual initiation and triumph.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#170932] border border-purple-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-amber-300">Need specific guidance for your chart?</h4>
                  <span className="text-[11px] text-slate-400">Consult with {selectedArticle.author} today.</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenConsultation(`Consultation after reading: ${selectedArticle.title}`);
                  }}
                  className="gold-btn px-4 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer"
                >
                  Consult Author
                </button>
              </div>
            </div>
          ) : (
            /* Articles Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="p-4 rounded-2xl bg-[#180935] border border-purple-800/60 hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-amber-300 font-bold border border-purple-800">
                        {art.category}
                      </span>
                      <span>{art.readTime}</span>
                    </div>

                    <div className="flex items-start gap-3 my-2">
                      <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">{art.image}</span>
                      <h4 className="font-cinzel font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
                        {art.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-900/60 flex items-center justify-between text-[11px] text-amber-400 font-semibold">
                    <span>By {art.author}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read More &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-800/60 bg-[#160731] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cosmic-800 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

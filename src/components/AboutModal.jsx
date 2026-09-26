import React from 'react';
import { X, Award, ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';

export default function AboutModal({ onClose, lang }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#13062c] border border-amber-500/50 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] text-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-purple-800/60 bg-gradient-to-r from-[#1c0a3c] via-[#240d4f] to-[#160630] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-400/80 shadow-gold-glow flex items-center justify-center shrink-0 bg-[#0e0422]">
              <img 
                src="/logo.png" 
                alt="ASTROTANNTRA Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300">
                About ASTROTANNTRA
              </h2>
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
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-300 leading-relaxed">
          
          <div>
            <h3 className="font-cinzel text-base font-bold text-amber-300 mb-2">
              Our Sacred Heritage & Mission
            </h3>
            <p className="mb-3">
              Founded under the guidance of traditional Vedic scholars and intuitive Tarot masters, <strong>ASTROTANNTRA</strong> bridges thousands of years of Parashari and Jaimini Vedic astrology with modern analytical precision.
            </p>
            <p>
              We believe that planetary patterns in your Janma Kundli are not rigid fetters of doom, but rather a celestial roadmap of your karmic tendencies. By knowing your true planetary strengths, auspicious muhurtas, and remedial gems, you gain the power to direct your life with clarity and spiritual courage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#1b0a38] border border-amber-500/30 text-center">
              <Award className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <h4 className="font-bold text-slate-100 text-sm mb-1">Authentic Vedic Shastra</h4>
              <p className="text-[11px] text-slate-400">Strictly grounded in Brihat Parashara Hora Shastra and Lahiri Ayanamsha.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1b0a38] border border-amber-500/30 text-center">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-slate-100 text-sm mb-1">100% Privacy & Ethics</h4>
              <p className="text-[11px] text-slate-400">No fear-mongering. Purely ethical remedies, mantras, and practical counsel.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1b0a38] border border-amber-500/30 text-center">
              <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <h4 className="font-bold text-slate-100 text-sm mb-1">Modern Digital Ease</h4>
              <p className="text-[11px] text-slate-400">Instant accurate birth charts, Gun Milan, panchang, and tarot draws.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#180935] border border-purple-800/60">
            <h4 className="font-cinzel font-bold text-sm text-amber-300 mb-1">Headquarters & Research Center</h4>
            <p className="text-slate-300">
              ASTROTANNTRA Centre for Astrological Research & Tantric Studies<br />
              New Delhi, India • Helpline: +91 99930 27943 • Email: support@astrotanntra.com
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-800/60 bg-[#160731] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs uppercase cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

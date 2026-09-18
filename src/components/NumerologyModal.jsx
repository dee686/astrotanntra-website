import React, { useState } from 'react';
import { X, Hash, Sparkles, User, Calendar } from 'lucide-react';
import { calculateLifePath, calculateDestinyNumber, NUMBER_MEANINGS } from '../utils/numerology';

export default function NumerologyModal({ onClose, onOpenConsultation, lang }) {
  const [name, setName] = useState('Ansh Mishra');
  const [dob, setDob] = useState('1998-10-15');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const lifePath = calculateLifePath(dob);
    const destiny = calculateDestinyNumber(name);
    setResult({
      lifePath,
      destiny,
      lifePathInfo: NUMBER_MEANINGS[lifePath] || NUMBER_MEANINGS[1],
      destinyInfo: NUMBER_MEANINGS[destiny] || NUMBER_MEANINGS[1]
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#13062c] border border-amber-500/50 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] text-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-purple-800/60 bg-gradient-to-r from-[#1c0a3c] via-[#240d4f] to-[#160630] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
              <Hash className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300">
                Sacred Numerology Calculator
              </h2>
              <p className="text-xs text-slate-300">
                Discover your Life Path and Destiny numbers through Pythagorean and Chaldean sacred mathematics
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
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#180935] p-4 rounded-2xl border border-purple-800/60">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Full Legal Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-amber-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#231248] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Date of Birth</label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-amber-400" />
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#231248] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="sm:col-span-2 flex justify-center pt-2">
              <button
                type="submit"
                className="gold-btn px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-gold-glow"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Calculate Numerology Blueprint</span>
              </button>
            </div>
          </form>

          {/* Result Card */}
          {result && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Life Path */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1e0d42] to-[#12062b] border border-amber-500/40 shadow-md">
                  <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold block mb-1">
                    Life Path Number
                  </span>
                  <div className="flex items-center gap-4 my-2">
                    <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-cinzel font-black text-3xl flex items-center justify-center shadow-gold-glow">
                      {result.lifePath}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">{result.lifePathInfo.title}</h4>
                      <span className="text-xs text-amber-300">Ruling Planet: {result.lifePathInfo.ruler}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">{result.lifePathInfo.desc}</p>
                </div>

                {/* Destiny */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1e0d42] to-[#12062b] border border-purple-500/40 shadow-md">
                  <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold block mb-1">
                    Destiny (Expression) Number
                  </span>
                  <div className="flex items-center gap-4 my-2">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500 text-white font-cinzel font-black text-3xl flex items-center justify-center shadow-purple-glow">
                      {result.destiny}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">{result.destinyInfo.title}</h4>
                      <span className="text-xs text-purple-300">Ruling Planet: {result.destinyInfo.ruler}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">{result.destinyInfo.desc}</p>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-800/60 bg-[#160731] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cosmic-800 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

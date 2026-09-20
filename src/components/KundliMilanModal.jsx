import React, { useState } from 'react';
import { X, Heart, Sparkles, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { calculateGunMilan } from '../utils/ashtakootMilan';
import PlaceAutocomplete from './PlaceAutocomplete';
import { resolveLocation } from '../services/geoService';

export default function KundliMilanModal({ onClose, onOpenConsultation, lang }) {
  // Default sample inputs
  const [groomName, setGroomName] = useState('Rahul Sharma');
  const [groomDob, setGroomDob] = useState('1996-05-18');
  const [groomTob, setGroomTob] = useState('11:45');
  const [groomPlace, setGroomPlace] = useState('New Delhi, India');
  const [groomCoords, setGroomCoords] = useState({ lat: 28.6139, lng: 77.2090, tz: 5.5 });

  const [brideName, setBrideName] = useState('Pooja Singh');
  const [brideDob, setBrideDob] = useState('1998-08-22');
  const [brideTob, setBrideTob] = useState('16:15');
  const [bridePlace, setBridePlace] = useState('Jaipur, Rajasthan, India');
  const [brideCoords, setBrideCoords] = useState({ lat: 26.9124, lng: 75.7873, tz: 5.5 });

  const [isCalculating, setIsCalculating] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setIsCalculating(true);
    let gCoords = { ...groomCoords };
    let bCoords = { ...brideCoords };

    try {
      const [gRes, bRes] = await Promise.all([
        resolveLocation(groomPlace, groomDob),
        resolveLocation(bridePlace, brideDob)
      ]);
      if (gRes && gRes.lat) gCoords = gRes;
      if (bRes && bRes.lat) bCoords = bRes;
    } catch (err) {
      console.warn('Geocoding for Kundli Milan:', err);
    } finally {
      setIsCalculating(false);
    }

    const res = calculateGunMilan(
      { 
        name: groomName, 
        dob: groomDob, 
        tob: groomTob, 
        place: groomPlace, 
        gender: 'Male',
        lat: gCoords.lat,
        lng: gCoords.lng,
        tz: gCoords.tz
      },
      { 
        name: brideName, 
        dob: brideDob, 
        tob: brideTob, 
        place: bridePlace, 
        gender: 'Female',
        lat: bCoords.lat,
        lng: bCoords.lng,
        tz: bCoords.tz
      }
    );
    setMatchResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#13062c] border border-amber-500/50 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] text-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-purple-800/60 bg-gradient-to-r from-[#1c0a3c] via-[#240d4f] to-[#160630] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-pink-500/20 border border-pink-400 flex items-center justify-center text-pink-300">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300">
                Kundli Milan (36 Gun Matching)
              </h2>
              <p className="text-xs text-slate-300">
                Ashtakoot Vedic matrimonial horoscope compatibility calculation
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
          
          {/* Inputs Form */}
          <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#180935] p-5 rounded-2xl border border-purple-800/60">
            
            {/* Groom Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-cinzel font-bold text-sm border-b border-purple-800 pb-1.5">
                <span>🤵 Groom's Details (वर विवरण)</span>
              </div>
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#231248] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={groomDob}
                    onChange={(e) => setGroomDob(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#231248] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Time of Birth</label>
                  <input
                    type="time"
                    required
                    value={groomTob}
                    onChange={(e) => setGroomTob(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#231248] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Birth Place (जन्म स्थान)</label>
                <PlaceAutocomplete
                  value={groomPlace}
                  onChange={(e) => setGroomPlace(e.target.value)}
                  onSelectLocation={(loc) => {
                    setGroomPlace(loc.formatted);
                    setGroomCoords({ lat: loc.lat, lng: loc.lng, tz: loc.tz });
                  }}
                  dateStr={groomDob}
                  placeholder="Groom's Birth City/Town"
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#231248] border border-purple-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Bride Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-pink-300 font-cinzel font-bold text-sm border-b border-purple-800 pb-1.5">
                <span>👰 Bride's Details (कन्या विवरण)</span>
              </div>
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#231248] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={brideDob}
                    onChange={(e) => setBrideDob(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#231248] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Time of Birth</label>
                  <input
                    type="time"
                    required
                    value={brideTob}
                    onChange={(e) => setBrideTob(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#231248] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Birth Place (जन्म स्थान)</label>
                <PlaceAutocomplete
                  value={bridePlace}
                  onChange={(e) => setBridePlace(e.target.value)}
                  onSelectLocation={(loc) => {
                    setBridePlace(loc.formatted);
                    setBrideCoords({ lat: loc.lat, lng: loc.lng, tz: loc.tz });
                  }}
                  dateStr={brideDob}
                  placeholder="Bride's Birth City/Town"
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#231248] border border-purple-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex justify-center pt-2">
              <button
                type="submit"
                disabled={isCalculating}
                className="gold-btn px-8 py-3 rounded-xl font-bold text-sm tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-gold-glow disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4 text-slate-900" />
                <span>{isCalculating ? 'Calculating Live Charts...' : 'Calculate 36 Guna Milan'}</span>
              </button>
            </div>

          </form>

          {/* Results Display */}
          {matchResult && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Score Summary Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1e0c42] to-[#2b125a] border border-amber-500/50 shadow-lg text-center">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block mb-1">
                  Gun Milan Compatibility Score
                </span>

                <div className="flex items-center justify-center gap-3 my-2">
                  <span className="text-5xl sm:text-6xl font-black font-cinzel text-amber-300 drop-shadow">
                    {matchResult.totalScore}
                  </span>
                  <span className="text-2xl sm:text-3xl font-cinzel text-slate-400">
                    / 36
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-md mx-auto bg-black/40 rounded-full h-3.5 p-0.5 border border-amber-500/30 mb-3">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${matchResult.percentage}%` }}
                  />
                </div>

                <p className={`text-base font-bold ${matchResult.statusColor} mb-2`}>
                  {matchResult.verdict}
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 border border-purple-600/40 text-xs text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{matchResult.manglikMatch}</span>
                </div>
              </div>

              {/* 8 Ashtakoot Breakdown Table */}
              <div className="overflow-x-auto rounded-2xl border border-purple-800/60 bg-[#170932]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#26104c] text-amber-300 font-cinzel border-b border-purple-700/60">
                      <th className="p-3">Koota</th>
                      <th className="p-3">Max Points</th>
                      <th className="p-3">Obtained Points</th>
                      <th className="p-3">Significance & Compatibility</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/50">
                    {matchResult.scores.map((k, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-bold text-slate-100">{k.koot} Koota</td>
                        <td className="p-3 text-slate-400">{k.max} pts</td>
                        <td className="p-3 font-bold text-amber-300 font-mono text-sm">{k.obtained} pts</td>
                        <td className="p-3 text-slate-300">{k.desc}</td>
                        <td className="p-3">
                          {k.dosha ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-600">
                              Dosha Detected
                            </span>
                          ) : k.passed ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                              Matched
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-600">
                              Average
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-800/60 bg-[#160731] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            For complex Nadi Dosha cancellation or Manglik remedies, consult our Acharya.
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenConsultation('Marriage & Kundli Milan Consultation');
              }}
              className="gold-btn px-5 py-2.5 rounded-xl font-bold text-xs uppercase cursor-pointer"
            >
              Consult Marriage Expert
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-cosmic-800 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

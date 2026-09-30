import React, { useState } from 'react';
import { X, Hash, Sparkles, User, Calendar } from 'lucide-react';
import { calculateLifePath, calculateDestinyNumber, NUMBER_MEANINGS } from '../utils/numerology';

const HI_NUM_TITLES = {
  1: { title: 'अग्रणी और जन्मजात नेता', ruler: 'सूर्य देव', desc: 'आप नेतृत्व, स्वतंत्र विचारों और आत्म-प्रेरणा के धनी हैं। आपके भीतर नई राह बनाने की अद्वितीय क्षमता है।' },
  2: { title: 'कूटनीतिज्ञ और शांतिदूत', ruler: 'चंद्र देव', desc: 'आप साझेदारी, संवेदनशीलता, अंतर्ज्ञान और सहयोग में उत्कृष्टता प्राप्त करते हैं। संबंधों में सामंजस्य स्थापित करते हैं।' },
  3: { title: 'सृजनकर्ता और प्रेरक वक्ता', ruler: 'बृहस्पति देव (गुरु)', desc: 'आप रचनात्मक अभिव्यक्ति, आशावाद और ज्ञान के प्रतीक हैं। आपकी ऊर्जा दूसरों को प्रेरित करती है।' },
  4: { title: 'कर्मठ शिल्पी और संगठक', ruler: 'राहु / शनि', desc: 'आप अनुशासन, कठोर परिश्रम और सुदृढ़ नींव के आधार स्तंभ हैं। व्यावहारिक समाधान प्रस्तुत करते हैं।' },
  5: { title: 'स्वतंत्र अन्वेषक और पथिक', ruler: 'बुध देव', desc: 'आप परिवर्तन, बहुमुखी प्रतिभा और स्वतंत्रता के प्रेमी हैं। त्वरित निर्णय और नवाचार में निपुण हैं।' },
  6: { title: 'रक्षक, मार्गदर्शक और स्नेही', ruler: 'शुक्र देव', desc: 'आप परिवार, सामाजिक दायित्व, सौंदर्य और करुणा के प्रति समर्पित हैं। शांति और सद्भाव लाते हैं।' },
  7: { title: 'अध्यात्मवादी और अनुसंधानकर्ता', ruler: 'केतु', desc: 'आप गूढ़ ज्ञान, दार्शनिक चिंतन और आत्म-अन्वेषण की ओर प्रवृत्त हैं। उच्च बुद्धि और अंतर्दृष्टि के स्वामी हैं।' },
  8: { title: 'सामर्थ्यवान और कर्मयोगी', ruler: 'शनि देव', desc: 'आप भौतिक समृद्धि, अधिकार और न्याय के प्रतीक हैं। उच्च लक्ष्यों को प्राप्त करने की असीम क्षमता रखते हैं।' },
  9: { title: 'मानवतावादी और उदार ज्ञानी', ruler: 'मंगल देव', desc: 'आप सार्वभौमिक करुणा, उच्च आदर्श और निस्वार्थ सेवा से प्रेरित हैं। व्यापक दृष्टिकोण रखते हैं।' },
  11: { title: 'मास्टर शिक्षक और अंतर्ज्ञानी', ruler: 'चंद्र / शुक्र', desc: 'आप अत्यंत संवेदनशील और दूरदर्शी हैं। आध्यात्मिक चेतना जागृत करने में अग्रणी हैं।' },
  22: { title: 'मास्टर निर्माता और युगदृष्टा', ruler: 'बुध / शनि', desc: 'आप बड़े सपनों को धरातल पर साकार करने की अद्वितीय क्षमता रखते हैं।' },
  33: { title: 'मास्टर हीलर और विश्व गुरु', ruler: 'बृहस्पति', desc: 'आप निस्वार्थ प्रेम, आत्मज्ञान और मानवता के कल्याण के प्रतीक हैं।' }
};

export default function NumerologyModal({ onClose, onOpenConsultation, lang }) {
  const isHi = lang === 'hi';
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
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
                {isHi ? 'अंक ज्योतिष कैलकुलेटर (Numerology)' : 'Sacred Numerology Calculator'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {isHi 
                  ? 'पाइथागोरस एवं कीरो वैदिक अंकशास्त्र द्वारा अपने मूलांक और भाग्यांक की गणना करें'
                  : 'Discover your Life Path and Destiny numbers through Pythagorean and Chaldean sacred mathematics'}
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

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#180935] p-5 rounded-2xl border border-purple-800/60">
            <div>
              <label className="text-xs sm:text-sm text-slate-300 block mb-1 font-medium">
                {isHi ? 'पूरा नाम (अंग्रेजी अक्षरों में)' : 'Full Legal Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-amber-400" />
                <input
                  type="text"
                  required
                  placeholder={isHi ? 'उदा. Rahul Sharma' : 'e.g., John Doe'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#231248] border border-purple-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-300 block mb-1 font-medium">
                {isHi ? 'जन्म तिथि' : 'Date of Birth'}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-3 text-amber-400" />
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#231248] border border-purple-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="sm:col-span-2 flex justify-center pt-2">
              <button
                type="submit"
                className="gold-btn px-6 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-gold-glow"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{isHi ? 'अंक ज्योतिष विश्लेषण प्राप्त करें' : 'Calculate Numerology Blueprint'}</span>
              </button>
            </div>
          </form>

          {/* Result Card */}
          {result && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Life Path */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1e0d42] to-[#12062b] border border-amber-500/40 shadow-md">
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block mb-1">
                    {isHi ? 'मूलांक / जीवन पथ अंक' : 'Life Path Number'}
                  </span>
                  <div className="flex items-center gap-4 my-2">
                    <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-cinzel font-black text-3xl flex items-center justify-center shadow-gold-glow shrink-0">
                      {result.lifePath}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-100">
                        {isHi ? (HI_NUM_TITLES[result.lifePath]?.title || result.lifePathInfo.title) : result.lifePathInfo.title}
                      </h4>
                      <span className="text-xs sm:text-sm text-amber-300">
                        {isHi 
                          ? `स्वामी ग्रह: ${HI_NUM_TITLES[result.lifePath]?.ruler || result.lifePathInfo.ruler}` 
                          : `Ruling Planet: ${result.lifePathInfo.ruler}`}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                    {isHi ? (HI_NUM_TITLES[result.lifePath]?.desc || result.lifePathInfo.desc) : result.lifePathInfo.desc}
                  </p>
                </div>

                {/* Destiny */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1e0d42] to-[#12062b] border border-purple-500/40 shadow-md">
                  <span className="text-xs uppercase tracking-widest text-purple-300 font-bold block mb-1">
                    {isHi ? 'भाग्यांक / नामांक' : 'Destiny (Expression) Number'}
                  </span>
                  <div className="flex items-center gap-4 my-2">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500 text-white font-cinzel font-black text-3xl flex items-center justify-center shadow-purple-glow shrink-0">
                      {result.destiny}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-100">
                        {isHi ? (HI_NUM_TITLES[result.destiny]?.title || result.destinyInfo.title) : result.destinyInfo.title}
                      </h4>
                      <span className="text-xs sm:text-sm text-purple-300">
                        {isHi 
                          ? `स्वामी ग्रह: ${HI_NUM_TITLES[result.destiny]?.ruler || result.destinyInfo.ruler}` 
                          : `Ruling Planet: ${result.destinyInfo.ruler}`}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                    {isHi ? (HI_NUM_TITLES[result.destiny]?.desc || result.destinyInfo.desc) : result.destinyInfo.desc}
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-800/60 bg-[#160731] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-cosmic-800 hover:bg-cosmic-700 text-slate-300 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            {isHi ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  RotateCcw, 
  Calendar, 
  CheckCircle, 
  Heart, 
  Briefcase, 
  DollarSign, 
  ShieldCheck, 
  Tag, 
  ArrowRight, 
  Clock, 
  Users 
} from 'lucide-react';
import { TAROT_DECK, TAROT_PACKAGES } from '../data/tarotData';
import confetti from 'canvas-confetti';

export default function TarotReaderModal({ initialPackage, onClose, onOpenConsultation, onOpenPackageBooking, lang }) {
  const isHi = lang === 'hi';

  // If opened directly without a package, default to 'pricing' mode to show card readings with price!
  const [selectedPkg, setSelectedPkg] = useState(
    initialPackage || TAROT_PACKAGES[0] // defaults to 3-card spread
  );
  const [activeMode, setActiveMode] = useState(initialPackage ? 'interactive' : 'pricing'); // 'pricing', 'interactive', 'booking'
  const [drawnCards, setDrawnCards] = useState([]);
  const [isRevealed, setIsRevealed] = useState({});

  // Shuffle and pick cards for interactive mode
  const handleDrawCards = (pkgToUse = selectedPkg) => {
    const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
    const count = Math.min(pkgToUse.cards || 3, TAROT_DECK.length);
    const selected = shuffled.slice(0, count);
    setDrawnCards(selected);
    setIsRevealed({});

    // Auto reveal with stagger
    const stagger = selected.length > 7 ? 250 : 500;
    selected.forEach((card, idx) => {
      setTimeout(() => {
        setIsRevealed(prev => ({ ...prev, [card.id]: true }));
        if (idx === selected.length - 1) {
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 }
            });
          } catch (e) {}
        }
      }, (idx + 1) * stagger);
    });
  };

  const handleSelectPackageForDraw = (pkg) => {
    setSelectedPkg(pkg);
    setActiveMode('interactive');
    setDrawnCards([]);
    setIsRevealed({});
  };

  const handleSelectPackageForBooking = (pkg) => {
    setSelectedPkg(pkg);
    onClose();
    if (onOpenPackageBooking) {
      onOpenPackageBooking(pkg, 'tarot');
    } else if (onOpenConsultation) {
      const topic = isHi 
        ? `टैरो परामर्श: ${pkg.name} (₹${pkg.priceInr})`
        : `Tarot Reading: ${pkg.name} (₹${pkg.priceInr})`;
      onOpenConsultation(topic);
    }
  };

  const getSpreadPositionName = (idx, pkg = selectedPkg) => {
    if (pkg.cards === 12) {
      const monthsEn = [
        'Month 1 (Jan) - New Dawn & Ambition',
        'Month 2 (Feb) - Bonds & Relationships',
        'Month 3 (Mar) - Creative Manifestation',
        'Month 4 (Apr) - Stability & Foundations',
        'Month 5 (May) - Growth & Expansion',
        'Month 6 (Jun) - Health & Inner Balance',
        'Month 7 (Jul) - Karmic Crossroads',
        'Month 8 (Aug) - Power & Career Momentum',
        'Month 9 (Sep) - Wisdom & Inner Reflection',
        'Month 10 (Oct) - Public Recognition',
        'Month 11 (Nov) - Aspirations & Synergy',
        'Month 12 (Dec) - Full-Year Fulfillment'
      ];
      const monthsHi = [
        'माह 1 (जनवरी) - नई शुरुआत एवं ऊर्जा',
        'माह 2 (फरवरी) - संबंध एवं सामंजस्य',
        'माह 3 (मार्च) - रचनात्मकता एवं अभिव्यक्ति',
        'माह 4 (अप्रैल) - स्थिरता एवं आधार',
        'माह 5 (मई) - विस्तार एवं प्रगति',
        'माह 6 (जून) - स्वास्थ्य एवं संतुलन',
        'माह 7 (जुलाई) - कर्म चक्र एवं मोड़',
        'माह 8 (अगस्त) - शक्ति एवं करियर योग',
        'माह 9 (सितंबर) - आत्ममंथन एवं ज्ञान',
        'माह 10 (अक्टूबर) - सामाजिक प्रतिष्ठा',
        'माह 11 (नवंबर) - आशाएं एवं मित्र सहयोग',
        'माह 12 (दिसंबर) - पूर्णता एवं सिद्धि'
      ];
      return isHi ? (monthsHi[idx] || `माह ${idx + 1}`) : (monthsEn[idx] || `Month ${idx + 1}`);
    }

    if (pkg.cards === 7) {
      const celticEn = [
        'Card 1: Core Present Energy',
        'Card 2: The Challenge / Crossing',
        'Card 3: Subconscious Foundation',
        'Card 4: Past Influences Fading',
        'Card 5: Conscious Goal / Crown',
        'Card 6: Near Future Horizon',
        'Card 7: Spiritual Resolution & Outcome'
      ];
      const celticHi = [
        'कार्ड 1: वर्तमान मुख्य ऊर्जा',
        'कार्ड 2: तात्कालिक चुनौती / बाधा',
        'कार्ड 3: अवचेतन आधार / मूल कारण',
        'कार्ड 4: भूतकाल का प्रभाव',
        'कार्ड 5: सचेतन लक्ष्य / उच्च दृष्टि',
        'कार्ड 6: निकट भविष्य का पथ',
        'कार्ड 7: अंतिम कर्म फल एवं समाधान'
      ];
      return isHi ? (celticHi[idx] || `कार्ड ${idx + 1}`) : (celticEn[idx] || `Card ${idx + 1}`);
    }

    if (pkg.cards === 5) {
      if (pkg.id === 'love') {
        const loveEn = [
          'Card 1: Your Heart & True Feelings',
          'Card 2: Partner’s Mind & Desires',
          'Card 3: Current Bond Dynamic',
          'Card 4: Hidden Relationship Obstacle',
          'Card 5: Love Destiny & Sacred Advice'
        ];
        const loveHi = [
          'कार्ड 1: आपकी भावनाएं एवं हृदय स्थिति',
          'कार्ड 2: साथी के विचार एवं इच्छाएं',
          'कार्ड 3: संबंध का मूल स्वरूप एवं बंधन',
          'कार्ड 4: गुप्त बाधा अथवा चुनौती',
          'कार्ड 5: प्रेम भविष्यफल एवं मार्गदर्शन'
        ];
        return isHi ? loveHi[idx] : loveEn[idx];
      }

      if (pkg.id === 'career') {
        const careerEn = [
          'Card 1: Current Career Foundation',
          'Card 2: Ambitions & True Calling',
          'Card 3: Workplace Obstacles / Competition',
          'Card 4: Upcoming Growth Opportunity',
          'Card 5: Long-Term Career Triumph'
        ];
        const careerHi = [
          'कार्ड 1: वर्तमान कार्य स्थिति एवं आधार',
          'कार्ड 2: महत्वाकांक्षाएं एवं लक्ष्य',
          'कार्ड 3: कार्यक्षेत्र की चुनौतियां / प्रतिस्पर्धा',
          'कार्ड 4: आगामी अवसर एवं उन्नति',
          'कार्ड 5: दीर्घकालिक सफलता एवं सिद्धि'
        ];
        return isHi ? careerHi[idx] : careerEn[idx];
      }

      if (pkg.id === 'finance') {
        const finEn = [
          'Card 1: Current Financial Energy',
          'Card 2: Wealth & Earning Streams',
          'Card 3: Subconscious Money Blocks / Debts',
          'Card 4: Prosperity & Investment Window',
          'Card 5: Long-Term Abundance Destiny'
        ];
        const finHi = [
          'कार्ड 1: वर्तमान वित्तीय स्थिति',
          'कार्ड 2: धन अर्जन एवं आय के स्रोत',
          'कार्ड 3: गुप्त रुकावटें / व्यय कारक',
          'कार्ड 4: निवेश योग एवं समृद्धि का अवसर',
          'कार्ड 5: दीर्घकालिक संपन्नता एवं सुरक्षा'
        ];
        return isHi ? finHi[idx] : finEn[idx];
      }
    }

    if (idx === 0) return isHi ? 'कार्ड 1: अतीत का प्रभाव एवं मूल कारण' : 'Card 1: Past Influences & Root Cause';
    if (idx === 1) return isHi ? 'कार्ड 2: वर्तमान स्थिति एवं ऊर्जा' : 'Card 2: Current Situation & Present Crossroads';
    if (idx === 2) return isHi ? 'कार्ड 3: भविष्य का परिणाम एवं समाधान' : 'Card 3: Future Outcome & Cosmic Guidance';
    return isHi ? `कार्ड ${idx + 1}` : `Card ${idx + 1}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 overflow-hidden animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#13062c] border border-amber-500/50 rounded-3xl shadow-2xl text-slate-100 overflow-hidden flex flex-col h-[92vh] max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-purple-800/60 bg-gradient-to-r from-[#1c0a3c] via-[#240d4f] to-[#160630] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shadow-gold-glow">
              🃏
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300">
                  {isHi ? 'टैरो कार्ड रीडिंग एवं दिव्य मार्गदर्शन' : 'Tarot Card Readings & Guidance'}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  {isHi ? 'पवित्र प्रतीक' : 'Sacred Archetypes'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {isHi 
                  ? 'प्रेम, करियर, धन, कर्म और भविष्य के लिए अंतर्ज्ञानी टैरो मार्गदर्शन' 
                  : 'Intuitive readings for love, career, karma, financial breakthroughs & destiny clarity'}
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

        {/* Mode Switcher Navigation */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 py-3 bg-[#170932] border-b border-purple-900/60 text-xs sm:text-sm shrink-0">
          <button
            onClick={() => setActiveMode('pricing')}
            className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'pricing'
                ? 'bg-amber-400 text-slate-950 shadow-gold-glow font-bold'
                : 'text-slate-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>{isHi ? 'कार्ड रीडिंग एवं शुल्क' : 'Card Readings & Prices'}</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('interactive');
            }}
            className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'interactive'
                ? 'bg-amber-400 text-slate-950 shadow-gold-glow font-bold'
                : 'text-slate-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isHi ? 'इंटरैक्टिव कार्ड ड्रॉ' : 'Interactive Card Draw'}</span>
          </button>

          <button
            onClick={() => setActiveMode('booking')}
            className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'booking'
                ? 'bg-amber-400 text-slate-950 shadow-gold-glow font-bold'
                : 'text-slate-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{isHi ? 'टैरो रीडर बुक करें' : 'Book 1-on-1 Reader'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 flex-1 space-y-6 fast-scroll overflow-y-auto">
          
          {/* TAB 1: CARD READINGS WITH PRICE */}
          {activeMode === 'pricing' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="text-center max-w-xl mx-auto space-y-1.5">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  {isHi ? 'अपनी स्प्रेड चुनें' : 'Choose Your Spread'}
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  {isHi ? 'टैरो कार्ड रीडिंग पैकेज एवं शुल्क' : 'Tarot Card Reading Packages & Pricing'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {isHi 
                    ? 'तुरंत इंटरैक्टिव कार्ड निकालने के लिए नीचे दिए गए पैकेज चुनें या सत्यापित टैरो ग्रैंडमास्टर के साथ 1-on-1 निजी सत्र बुक करें।' 
                    : 'Select a reading package below to draw interactive cards immediately or book a live 1-on-1 private reading with a verified Tarot Grandmaster.'}
                </p>
              </div>

              {/* Grid of Packages with Prices */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TAROT_PACKAGES.map((pkg) => {
                  const isSelected = selectedPkg.id === pkg.id;
                  const spreadLabel = pkg.cards === 1 
                    ? (isHi ? '1 कार्ड स्प्रेड' : '1 Card Spread') 
                    : (isHi ? `${pkg.cards} कार्ड स्प्रेड` : `${pkg.cards} Cards Spread`);
                  return (
                    <div
                      key={pkg.id}
                      className={`rounded-2xl p-5 border flex flex-col justify-between transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'bg-[#220d47] border-amber-400 shadow-[0_8px_30px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/60'
                          : 'bg-[#180833] border-purple-800/80 hover:border-amber-500/50 hover:bg-[#1d0b3d]'
                      }`}
                    >
                      {/* Top Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{pkg.icon || '🃏'}</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-900/80 text-purple-200 font-semibold border border-purple-700">
                            {spreadLabel}
                          </span>
                        </div>
                        {pkg.badge && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-400/40 uppercase tracking-wider">
                            {pkg.badge}
                          </span>
                        )}
                      </div>

                      {/* Title & Desc */}
                      <div className="mb-4">
                        <h4 className="font-cinzel font-bold text-base sm:text-lg text-slate-100 group-hover:text-amber-300 transition-colors">
                          {isHi ? (pkg.nameHi || pkg.name) : pkg.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed font-light">
                          {isHi ? (pkg.descHi || pkg.desc) : pkg.desc}
                        </p>
                      </div>

                      {/* Features */}
                      {pkg.features && (
                        <div className="space-y-1.5 mb-5 pt-3 border-t border-purple-800/60 text-xs sm:text-sm">
                          {((isHi && pkg.featuresHi) ? pkg.featuresHi : pkg.features).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-slate-300">
                              <span className="text-amber-400">✦</span>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Pricing Block & Buttons */}
                      <div className="pt-3 border-t border-purple-800/80 space-y-3">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-xs sm:text-sm text-slate-400">{isHi ? 'शुल्क: ' : 'Price: '}</span>
                            <span className="text-2xl font-bold font-cinzel text-amber-300">
                              ₹{pkg.priceInr ? pkg.priceInr.toLocaleString('en-IN') : pkg.price * 80}
                            </span>
                          </div>
                          <span className="text-xs text-amber-400/90 font-medium px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-700/50">
                            {pkg.cards} {isHi ? 'कार्ड्स' : 'Cards'}
                          </span>
                        </div>

                        {/* Dual Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                          <button
                            type="button"
                            onClick={() => handleSelectPackageForDraw(pkg)}
                            className="py-2.5 px-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-amber-200 border border-purple-700/80 font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isHi ? 'कार्ड निकालें' : 'Draw Cards'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSelectPackageForBooking(pkg)}
                            className="py-2.5 px-2 rounded-xl gold-btn font-bold transition-all cursor-pointer text-center uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-1"
                          >
                            <span>{isHi ? 'लाइव बुक करें' : 'Book Live'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Trust Footer Bar */}
              <div className="p-4 rounded-2xl bg-[#180935] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    {isHi 
                      ? 'सभी रीडिंग पवित्र शुचिता एवं प्रामाणिक वैदिक मार्गदर्शन मानकों के अनुरूप की जाती हैं।' 
                      : 'All readings conducted with consecration and ethical Vedic guidance standards.'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-amber-300/90 font-medium">
                  <span>{isHi ? '● 100% गोपनीय' : '● 100% Private'}</span>
                  <span>{isHi ? '● ऑडियो / वीडियो' : '● Audio / Video'}</span>
                  <span>{isHi ? '● पीडीएफ रिपोर्ट शामिल' : '● PDF Report Included'}</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: INTERACTIVE CARD DRAW */}
          {activeMode === 'interactive' && (
            <div className="space-y-6 text-center animate-fadeIn">
              
              <div className="flex items-center justify-between border-b border-purple-900/60 pb-3 flex-wrap gap-2">
                <div className="text-left">
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">
                    {isHi ? 'वर्तमान रीडिंग' : 'Current Reading'}
                  </span>
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-amber-300">
                    {selectedPkg.name} ({selectedPkg.cards} {selectedPkg.cards === 1 ? (isHi ? 'कार्ड' : 'Card') : (isHi ? 'कार्ड्स' : 'Cards')})
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveMode('pricing')}
                    className="px-3 py-1.5 rounded-lg bg-purple-900/50 hover:bg-purple-800 text-xs sm:text-sm text-amber-200 border border-purple-700 cursor-pointer"
                  >
                    {isHi ? 'स्प्रेड बदलें / शुल्क देखें' : 'Change Spread / View Prices'}
                  </button>

                  <button
                    onClick={() => handleSelectPackageForBooking(selectedPkg)}
                    className="px-3.5 py-1.5 rounded-lg gold-btn text-xs sm:text-sm font-bold uppercase cursor-pointer"
                  >
                    {isHi ? `लाइव बुक करें (₹${selectedPkg.priceInr || selectedPkg.price * 80})` : `Book Live (₹${selectedPkg.priceInr || selectedPkg.price * 80})`}
                  </button>
                </div>
              </div>

              {drawnCards.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center">
                  <div className="w-24 h-36 rounded-2xl bg-gradient-to-br from-amber-600 via-purple-900 to-indigo-950 border-2 border-amber-400/80 shadow-2xl flex items-center justify-center text-3xl mb-6 animate-pulseGlow">
                    🔮
                  </div>

                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-300 mb-2">
                    {isHi ? 'अपने प्रश्न और मन की भावना पर ध्यान केंद्रित करें' : 'Focus on Your Intention & Question'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                    {isHi 
                      ? 'अपनी आंखें बंद करें, तीन गहरी सांसें लें, और जीवन के उस पहलू पर ध्यान लगाएं जिसमें आप मार्गदर्शन चाहते हैं। पवित्र प्रतीक आपकी ऊर्जा का प्रतिबिंब हैं।' 
                      : 'Close your eyes, take three deep breaths, and focus on the aspect of life you desire guidance for. The sacred archetypes reflect your energetic frequency.'}
                  </p>

                  <button
                    onClick={() => handleDrawCards(selectedPkg)}
                    className="gold-btn px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-gold-glow"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>
                      {isHi 
                        ? `डेक शफल करें और ${selectedPkg.cards} कार्ड निकालें` 
                        : `Shuffle Deck & Draw ${selectedPkg.cards} ${selectedPkg.cards === 1 ? 'Card' : 'Cards'}`}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  
                  {/* Cards Display Container */}
                  <div className="flex flex-wrap justify-center gap-y-10 gap-x-4 sm:gap-x-6 max-w-5xl mx-auto">
                    {drawnCards.map((card, idx) => {
                      const revealed = isRevealed[card.id];
                      const isMulti = drawnCards.length > 7;
                      return (
                        <div key={card.id} className="flex flex-col items-center">
                          <span className={`text-xs uppercase tracking-wider text-amber-300 font-bold mb-3 text-center min-h-[48px] flex items-center justify-center px-3 py-1.5 rounded-xl bg-purple-950/90 border border-purple-800/80 shadow-md ${
                            isMulti ? 'max-w-[190px] text-[10px] sm:text-[11px]' : 'max-w-[240px]'
                          }`}>
                            {getSpreadPositionName(idx)}
                          </span>

                          {/* 3D Flip Card Container */}
                          <div
                            onClick={() => setIsRevealed(prev => ({ ...prev, [card.id]: !prev[card.id] }))}
                            className={`${
                              isMulti
                                ? 'w-40 h-64 sm:w-44 sm:h-72 md:w-48 md:h-76'
                                : 'w-52 h-80 sm:w-60 sm:h-92'
                            } perspective-1000 cursor-pointer group select-none`}
                          >
                            <div className={`relative w-full h-full duration-700 transform-style-3d transition-transform rounded-2xl shadow-2xl ${
                              revealed ? 'rotate-y-180' : ''
                            }`}>
                              
                              {/* Card Back */}
                              <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-[#2a0e5c] via-[#1b073e] to-[#0d0322] border-2 border-amber-400/80 p-3 sm:p-3.5 flex flex-col items-center justify-center shadow-lg overflow-hidden">
                                <div className="w-full h-full rounded-xl border border-amber-400/30 flex flex-col items-center justify-center p-2 bg-cosmic-950/60">
                                  <div className="text-3xl sm:text-4xl mb-2 animate-spin" style={{ animationDuration: '20s' }}>☸️</div>
                                  <span className="font-cinzel text-xs text-amber-300 tracking-widest uppercase">ASTROTANNTRA</span>
                                  <span className="text-[10px] text-slate-400 mt-2">{isHi ? 'क्लिक करके कार्ड पलटें' : 'Click to Reveal'}</span>
                                </div>
                              </div>

                              {/* Card Front */}
                              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-b from-[#1c0a3a] via-[#14062c] to-[#0b031c] border-2 border-amber-400 p-3.5 sm:p-4.5 flex flex-col justify-between shadow-2xl text-left overflow-hidden">
                                <div>
                                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-amber-300 font-mono mb-1">
                                    <span>{card.number}</span>
                                    <span className="font-sans text-[10px] sm:text-[11px] font-semibold">{isHi ? (card.elementHi || card.element) : card.element}</span>
                                  </div>
                                  <div className="text-center my-1.5 sm:my-2">
                                    <span className="text-3xl sm:text-4xl filter drop-shadow">{card.image}</span>
                                    <h4 className="font-cinzel font-bold text-xs sm:text-sm md:text-base text-amber-300 mt-1 leading-snug">
                                      {isHi ? (card.nameHi || card.name) : card.name}
                                    </h4>
                                    <span className="text-[10px] sm:text-xs text-purple-300 block mt-0.5">
                                      {isHi ? (card.arcanaHi || card.arcana) : card.arcana}
                                    </span>
                                  </div>
                                </div>

                                <div className="space-y-1 border-t border-purple-800/80 pt-1.5 text-xs">
                                  <div className="flex flex-wrap gap-1 justify-center">
                                    {((isHi && card.keywordsHi) ? card.keywordsHi : card.keywords).slice(0, 3).map((kw, kIdx) => (
                                      <span key={kIdx} className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-purple-900/80 text-amber-200 border border-purple-700/50 leading-tight">
                                        {kw}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Interpretations List */}
                  <div className="space-y-4 text-left">
                    {drawnCards.map((card, idx) => (
                      <div key={card.id} className="bg-[#1b0a38] border border-amber-500/30 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center justify-between border-b border-purple-800/80 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{card.image}</span>
                            <h4 className="font-cinzel font-bold text-base text-amber-300">
                              {getSpreadPositionName(idx)}: {isHi ? (card.nameHi || card.name) : card.name}
                            </h4>
                          </div>
                          <span className="text-xs text-slate-400">
                            {isHi ? 'सीधा फल (Upright)' : 'Upright Meaning'}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                          {isHi ? (card.uprightHi || card.upright) : card.upright}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-pink-950/30 border border-pink-500/30">
                            <span className="font-bold text-pink-300 block mb-1 flex items-center gap-1 text-xs">
                              <Heart className="w-3.5 h-3.5" /> {isHi ? 'प्रेम एवं संबंध' : 'Love Insight'}
                            </span>
                            <span className="text-slate-300 text-xs leading-tight block">
                              {isHi ? (card.loveHi || card.love) : card.love}
                            </span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30">
                            <span className="font-bold text-amber-300 block mb-1 flex items-center gap-1 text-xs">
                              <Briefcase className="w-3.5 h-3.5" /> {isHi ? 'करियर एवं व्यापार' : 'Career Insight'}
                            </span>
                            <span className="text-slate-300 text-xs leading-tight block">
                              {isHi ? (card.careerHi || card.career) : card.career}
                            </span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                            <span className="font-bold text-emerald-300 block mb-1 flex items-center gap-1 text-xs">
                              <DollarSign className="w-3.5 h-3.5" /> {isHi ? 'धन एवं संपदा' : 'Financial Path'}
                            </span>
                            <span className="text-slate-300 text-xs leading-tight block">
                              {isHi ? (card.financeHi || card.finance) : card.finance}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Draw Again CTA */}
                  <div className="flex justify-center gap-3 pt-2 flex-wrap">
                    <button
                      onClick={() => handleDrawCards(selectedPkg)}
                      className="px-6 py-2.5 rounded-xl bg-cosmic-800 hover:bg-cosmic-700 text-amber-300 border border-amber-400/40 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{isHi ? 'नई स्प्रेड निकालें' : 'Draw New Spread'}</span>
                    </button>

                    <button
                      onClick={() => handleSelectPackageForBooking(selectedPkg)}
                      className="px-6 py-2.5 rounded-xl gold-btn font-bold text-xs sm:text-sm uppercase cursor-pointer shadow-gold-glow flex items-center gap-2"
                    >
                      <span>{isHi ? 'ग्रैंडमास्टर से परामर्श बुक करें' : 'Book Consultation with Grandmaster'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 3: BOOK LIVE 1-ON-1 SESSION */}
          {activeMode === 'booking' && (
            <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
              <div className="p-6 rounded-3xl bg-[#1b0a38] border border-amber-500/40 space-y-5 shadow-2xl">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                    {isHi ? 'सीधा निजी सत्र' : 'Direct Private Session'}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                    {isHi ? 'लाइव 1-on-1 वीडियो टैरो परामर्श बुक करें' : 'Book Live 1-on-1 Video Tarot Consultation'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    {isHi 
                      ? 'गहन व्यक्तिगत अंतर्ज्ञान, पूर्व जन्म के कर्म विश्लेषण और प्रामाणिक आध्यात्मिक मार्गदर्शन के लिए अनुभवी टैरो ग्रैंडमास्टर से आमने-सामने जुड़ें।' 
                      : 'Connect face-to-face with an experienced Tarot Grandmaster for deep personalized intuition, past-life karma analysis, and time-tested spiritual guidance.'}
                  </p>
                </div>

                {/* Selected Package Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-2xl bg-[#241049] border border-purple-800 space-y-1">
                    <span className="text-slate-400 block text-xs">{isHi ? 'चयनित रीडिंग पैकेज' : 'Selected Reading Package'}</span>
                    <strong className="text-amber-300 text-sm sm:text-base block">{selectedPkg.name}</strong>
                    <span className="text-emerald-400 font-bold text-base block">
                      ₹{selectedPkg.priceInr ? selectedPkg.priceInr.toLocaleString('en-IN') : selectedPkg.price * 80}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#241049] border border-purple-800 space-y-1">
                    <span className="text-slate-400 block text-xs">{isHi ? 'सत्र प्रारूप एवं अवधि' : 'Session Format & Duration'}</span>
                    <strong className="text-white text-sm sm:text-base block">{isHi ? '30 मिनट निजी HD वीडियो / कॉल' : '30 Mins Private HD Video / Call'}</strong>
                    <span className="text-slate-300 text-xs block">{isHi ? 'वैदिक उपाय एवं प्रतिलिपि शामिल' : 'Includes remedies & recorded transcript'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/80 text-xs sm:text-sm text-slate-300 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>{isHi ? 'सत्र में आपको क्या प्राप्त होगा:' : "What You'll Receive in Your Reading:"}</span>
                  </div>
                  <ul className="space-y-1 text-xs sm:text-sm list-disc list-inside text-slate-300">
                    <li>{isHi ? 'आपके सामने लाइव निकाली गई अनुकूलित कार्ड स्प्रेड' : 'Real-time customized card spreads pulled live in front of you'}</li>
                    <li>{isHi ? 'प्रेम, वित्त, करियर बदलाव और बाधाओं का विस्तृत विश्लेषण' : 'Detailed breakdown of love, finance, career transitions & obstacles'}</li>
                    <li>{isHi ? 'जीवन को सही दिशा देने हेतु वैदिक उपाय और क्रिस्टल मार्गदर्शन' : 'Vedic remedies, crystal advice, and spiritual guidance to shift direction'}</li>
                    <li>{isHi ? '30 मिनट की अवधि में असीमित प्रश्न पूछने की पूर्ण स्वतंत्रता' : 'Full flexibility to ask unlimited follow-up questions during your 30 mins'}</li>
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectPackageForBooking(selectedPkg)}
                  className="w-full py-3.5 rounded-xl gold-btn font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <span>{isHi ? 'दिनांक एवं समय स्लॉट चुनें →' : 'Select Date & Timing Slot →'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-800/60 bg-[#160731] flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-400 hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isHi ? '100% गोपनीय • सत्यापित एस्ट्रोतंत्र ग्रैंडमास्टर्स' : '100% Confidential • Verified Astrotanntra Grandmasters'}</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-cosmic-800 hover:bg-cosmic-700 text-slate-300 text-xs sm:text-sm font-semibold cursor-pointer ml-auto transition-colors"
          >
            {isHi ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}

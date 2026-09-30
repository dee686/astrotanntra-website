import React, { useState } from 'react';
import { X, BookOpen, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export default function BlogModal({ onClose, onOpenConsultation, lang }) {
  const isHi = lang === 'hi';

  const articles = [
    {
      id: 1,
      title: isHi ? 'शनि साढ़े साती का रहस्य: शनि देव से भयभीत क्यों न हों' : 'Demystifying Shani Sade Sati: Why You Should Not Fear Saturn',
      author: isHi ? 'आचार्य देवेन्द्र शास्त्री' : 'Acharya Devendra Shastri',
      date: isHi ? '10 सितंबर, 2026' : 'Sep 10, 2026',
      readTime: isHi ? '6 मिनट का पठन' : '6 min read',
      category: isHi ? 'वैदिक शास्त्र' : 'Vedic Shastra',
      image: '🪐',
      summary: isHi 
        ? 'शनि देव कोई कष्टदाता ग्रह नहीं बल्कि ब्रह्मांड के न्यायाधिकारी हैं। जानें कैसे साढ़े साती हमारे अहंकार को शुद्ध करती है और जीवन में अनुशासन लाती है।'
        : 'Shani is not a tormentor but the cosmic judge (Nyayadhikari). Learn how Sade Sati purifies ego, brings lifelong discipline, and why major life achievements often occur during this transformative 7.5-year cycle.',
      content: isHi ? [
        'महर्षि पाराशर के अनुसार, प्रत्येक आकाशीय ग्रह हमारी स्वयं की चेतना का दर्पण है। जब शनि किसी राशि में गोचर करते हैं, तो वे हमें व्यर्थ के मोह और अहंकार को त्यागने, अपने नैतिक आधार को मजबूत करने और कर्म को फल की चिंता किए बिना निष्ठापूर्वक करने की सीख देते हैं।',
        'वैदिक ज्योतिष में उपाय किसी ग्रह को प्रसन्न करने या रिश्वत देने के लिए नहीं होते, बल्कि वे मानव की ऊर्जा को ब्रह्मांडीय नियमों के अनुरूप ढालते हैं। पावन शनि गायत्री मंत्र का जप, पीपल के वृक्ष की सेवा, और निर्धन व असहाय लोगों की सहायता से आध्यात्मिक संतुलन और शांति प्राप्त होती है।',
        'यदि आप वर्तमान समय में ग्रहों के गोचर का दबाव महसूस कर रहे हैं या जीवन में नई दिशा की तलाश में हैं, तो स्मरण रखें कि प्रत्येक चुनौती अपने साथ आध्यात्मिक उत्थान और सफलता का बीज लेकर आती है।'
      ] : [
        'According to the ancient sage Parashara, every celestial graha (planet) operates as a mirror to our own consciousness. When Saturn enters a transitionary sign, it asks us to shed obsolete attachments, examine our ethical foundations, and perform duty (Karma) without anxious longing for premature rewards.',
        'In traditional Jyotish, remedies do not seek to bribe planetary deities; rather, they align human vibration with universal order. Reciting the sacred Shani Gayatri mantra, offering water at the roots of sacred peepal or banyan trees, and serving those in hardship restores spiritual equilibrium.',
        'If you are currently feeling the heavy weight of planetary transits or searching for direction in your personal or professional life, remember that every challenge carries an equal seed of spiritual initiation and triumph.'
      ]
    },
    {
      id: 2,
      title: isHi ? 'अष्टकूट गुण मिलान की सच्चाई: केवल 36 गुणों से परे' : 'How Ashtakoot Gun Milan Works: Beyond Just The 36 Points',
      author: isHi ? 'डॉ. अनन्या मुखर्जी' : 'Dr. Ananya Mukherjee',
      date: isHi ? '06 सितंबर, 2026' : 'Sep 06, 2026',
      readTime: isHi ? '8 मिनट का पठन' : '8 min read',
      category: isHi ? 'वैवाहिक ज्योतिष' : 'Matrimonial Astrology',
      image: '💑',
      summary: isHi
        ? 'क्यों 28 से अधिक गुण मिलने पर भी यदि सप्तम भाव पीड़ित हो तो वैवाहिक जीवन में अड़चनें आ सकती हैं, और प्राचीन शास्त्रों में नाड़ी दोष के परिहार क्या हैं।'
        : 'Why a 28+ Gun Milan can still encounter hurdles if the 7th Lord is afflicted, and why Nadi Dosha cancellations exist in ancient texts. An in-depth guide to genuine marital compatibility.',
      content: isHi ? [
        'विवाह केवल दो व्यक्तियों का नहीं बल्कि दो परिवारों और उनकी ऊर्जा का मिलन है। अष्टकूट पद्धति में वर्ण, वश्य, तारा, योनि, ग्रहमैत्री, गण, भकूट और नाड़ी का सूक्ष्म विश्लेषण किया जाता है।',
        'अक्सर लोग केवल कुल अंकों पर ध्यान देते हैं, परंतु कुंडली में गुरु और शुक्र की स्थिति, नवमांश (D9) चक्र और सप्तमेश की स्थिति वैवाहिक सुख को निर्धारित करने में निर्णायक भूमिका निभाते हैं।',
        'यदि आपकी कुंडली में कोई दोष या मतभेद दिखाई दे रहा हो, तो सही समय पर वैदिक परामर्श और शांतिकर्म से दांपत्य जीवन को प्रेममय और स्थायी बनाया जा सकता है।'
      ] : [
        'Marriage is the sacred union of two distinct souls and cosmic vibrations. The Ashtakoot system assesses Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi in meticulous detail.',
        'People often look solely at the final score, but the disposition of Jupiter, Venus, the 7th house lord, and the Navamsha (D9) chart play an equally decisive role in long-term matrimonial fulfillment.',
        'With knowledgeable Vedic guidance and authentic remedial harmonization, potential planetary discords can be resolved into lasting mutual companionship.'
      ]
    },
    {
      id: 3,
      title: isHi ? 'करियर और समृद्धि में 27 जन्म नक्षत्रों का गुप्त प्रभाव' : 'The Secret Power of Your 27 Birth Nakshatras in Career Progression',
      author: isHi ? 'पंडित राजेश वशिष्ठ' : 'Pandit Rajesh Vashistha',
      date: isHi ? '28 अगस्त, 2026' : 'Aug 28, 2026',
      readTime: isHi ? '5 मिनट का पठन' : '5 min read',
      category: isHi ? 'करियर एवं धन' : 'Career & Wealth',
      image: '✨',
      summary: isHi
        ? 'सूर्य और चंद्र राशियां तो व्यापक रूपरेखा दर्शाती हैं, परंतु आपका जन्म नक्षत्र पद आपकी सूक्ष्म प्रतिभा, अवचेतन प्रेरणा और सफलता का वास्तविक क्षेत्र प्रकट करता है।'
        : 'While your Sun and Moon signs provide broad strokes, your Nakshatra pada reveals your micro-talents, subconscious motivation, and the precise industry where you naturally achieve effortless mastery.',
      content: isHi ? [
        'वैदिक खगोल विज्ञान में 27 नक्षत्र हमारे कर्म और स्वभाव के सबसे सटीक संकेतक हैं। प्रत्येक नक्षत्र के चार चरण होते हैं, जो एक विशिष्ट ऊर्जा का प्रतिनिधित्व करते हैं।',
        'उदाहरण के लिए, अश्विनी नक्षत्र के जातक नवाचार और गति में अग्रणी होते हैं, जबकि रोहिणी नक्षत्र के जातक कला, सौंदर्य और संपदा सृजन में उत्कृष्टता प्राप्त करते हैं।',
        'अपने नक्षत्र स्वामी के मंत्र और ऊर्जा के साथ तालमेल बिठाने से व्यापार और नौकरी में अप्रत्याशित सफलता के द्वार खुलते हैं।'
      ] : [
        'In classical Vedic astronomy, the 27 Nakshatras (lunar mansions) are the supreme indicators of karmic blueprint and intrinsic temperament.',
        'For instance, Ashwini natives excel in rapid initiation and medicine, while Rohini brings extraordinary grace in fine arts, commerce, and creative enterprise.',
        'Aligning your daily habits and professional endeavors with your Nakshatra deity unlocks intuitive mastery and effortless abundance.'
      ]
    },
    {
      id: 4,
      title: isHi ? 'टैरो बनाम वैदिक ज्योतिष: दोनों का संगम कैसे लाता है अभूतपूर्व स्पष्टता' : 'Tarot vs. Vedic Astrology: How Combining Both Brings Unmatched Clarity',
      author: isHi ? 'मीरा सेन' : 'Meera Sen',
      date: isHi ? '19 अगस्त, 2026' : 'Aug 19, 2026',
      readTime: isHi ? '4 मिनट का पठन' : '4 min read',
      category: isHi ? 'टैरो एवं अंतर्ज्ञान' : 'Tarot & Intuition',
      image: '🃏',
      summary: isHi
        ? 'वैदिक ज्योतिष जीवन की वृहद ब्रह्मांडीय समयरेखा का नक्शा खींचता है, जबकि टैरो इस वर्तमान क्षण की तात्कालिक ऊर्जा का दर्पण प्रस्तुत करता है।'
        : 'Astrology charts the macro cosmic timeline, while Tarot reflects the immediate energetic vibration of this present moment. Discover how using both unlocks crystal clarity.',
      content: isHi ? [
        'कुंडली हमें बताती है कि जीवन की नदियां किस दिशा में बह रही हैं और कौन सी दशा सक्रिय है। वहीं, टैरो कार्ड उस समय आपके मन की वर्तमान स्थिति और तात्कालिक विकल्पों की ऊर्जा को उजागर करते हैं।',
        'जब इन दोनों प्राचीन विद्याओं को एक साथ प्रयोग किया जाता है, तो जातक को न केवल अपने भविष्य का ज्ञान होता है, बल्कि वर्तमान में सही निर्णय लेने का आत्मविश्वास भी प्राप्त होता है।',
        'चाहे करियर का असमंजस हो या रिश्ते का द्वंद्व, यह समग्र दृष्टिकोण आपको पूर्ण मानसिक शांति प्रदान करता है।'
      ] : [
        'A Janma Kundli maps the overarching seasonal river of your destiny and active dashas. In complementary harmony, Tarot cards reflect the energetic crosscurrents of your immediate psychological state right now.',
        'By integrating both systems, seekers receive not only macro directional foresight but also granular clarity on urgent dilemmas.',
        'This holistic fusion empowers you to take aligned action with serenity, clarity, and supreme confidence.'
      ]
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
                {isHi ? 'एस्ट्रोतंत्र वैदिक लेख एवं ब्लॉग' : 'ASTROTANNTRA Vedic Journal & Blog'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {isHi ? 'ज्ञान, ग्रह गोचर, तंत्र रहस्य एवं आध्यात्मिक मार्गदर्शन' : 'Wisdom, astrological transits, occult secrets and spiritual guidance'}
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
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {selectedArticle ? (
            /* Detailed Article View */
            <div className="space-y-4 animate-fadeIn">
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-xs sm:text-sm text-amber-400 font-semibold hover:underline flex items-center gap-1 mb-2 cursor-pointer"
              >
                &larr; {isHi ? 'सभी लेखों पर वापस जाएं' : 'Back to all articles'}
              </button>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  {selectedArticle.category}
                </span>
                <span className="text-xs sm:text-sm text-slate-400">• {selectedArticle.date}</span>
                <span className="text-xs sm:text-sm text-slate-400">• {isHi ? `लेखक: ${selectedArticle.author}` : `By ${selectedArticle.author}`}</span>
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-300 leading-snug">
                {selectedArticle.title}
              </h3>

              <div className="p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30 text-sm text-slate-200 leading-relaxed space-y-3 font-normal">
                <p className="text-base font-medium text-amber-200">{selectedArticle.summary}</p>
                {selectedArticle.content && selectedArticle.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#170932] border border-purple-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-sm text-amber-300">
                    {isHi ? 'अपनी कुंडली के लिए व्यक्तिगत मार्गदर्शन चाहिए?' : 'Need specific guidance for your chart?'}
                  </h4>
                  <span className="text-xs text-slate-400">
                    {isHi ? `${selectedArticle.author} जी से आज ही परामर्श लें।` : `Consult with ${selectedArticle.author} today.`}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenConsultation(isHi ? `परामर्श: ${selectedArticle.title}` : `Consultation after reading: ${selectedArticle.title}`);
                  }}
                  className="gold-btn px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase cursor-pointer whitespace-nowrap"
                >
                  {isHi ? 'ज्योतिषी से परामर्श लें' : 'Consult Author'}
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
                  className="p-5 rounded-2xl bg-[#180935] border border-purple-800/60 hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="px-2.5 py-0.5 rounded bg-purple-950 text-amber-300 font-bold border border-purple-800 text-xs">
                        {art.category}
                      </span>
                      <span>{art.readTime}</span>
                    </div>

                    <div className="flex items-start gap-3 my-2">
                      <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">{art.image}</span>
                      <h4 className="font-cinzel font-bold text-base text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
                        {art.title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-900/60 flex items-center justify-between text-xs text-amber-400 font-semibold">
                    <span>{isHi ? `द्वारा: ${art.author}` : `By ${art.author}`}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {isHi ? 'पूरा पढ़ें →' : 'Read More →'}
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
            className="px-5 py-2.5 rounded-xl bg-cosmic-800 hover:bg-cosmic-700 text-slate-300 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            {isHi ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}

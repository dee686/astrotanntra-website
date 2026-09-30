import React from 'react';
import { X, Award, ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';

export default function AboutModal({ onClose, lang }) {
  const isHi = lang === 'hi';

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
                {isHi ? 'एस्ट्रोतंत्र (ASTROTANNTRA) के बारे में' : 'About ASTROTANNTRA'}
              </h2>
              <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
                {isHi ? '"भाग्य नहीं, दिशा बदलते हैं हम"' : '"Bhagya nhi, disha badalte hain hum"'}
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
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-sm text-slate-200 leading-relaxed font-normal">
          
          <div>
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-amber-300 mb-2">
              {isHi ? 'हमारी पावन परंपरा एवं उद्देश्य' : 'Our Sacred Heritage & Mission'}
            </h3>
            <p className="mb-3">
              {isHi 
                ? <>पारंपरिक वैदिक विद्वानों और अंतर्ज्ञानी टैरो आचार्यों के मार्गदर्शन में स्थापित, <strong>ASTROTANNTRA</strong> सहस्राब्दियों पुरानी पाराशरी और जैमिनी वैदिक ज्योतिष को आधुनिक विश्लेषणात्मक सटीकता के साथ प्रस्तुत करता है।</>
                : <>Founded under the guidance of traditional Vedic scholars and intuitive Tarot masters, <strong>ASTROTANNTRA</strong> bridges thousands of years of Parashari and Jaimini Vedic astrology with modern analytical precision.</>
              }
            </p>
            <p>
              {isHi 
                ? 'हमारा विश्वास है कि आपकी जन्म कुंडली में ग्रहों की स्थिति कोई अटल बंधन नहीं है, बल्कि यह आपके कर्मों और जीवन यात्रा का एक दिव्य मार्गचित्र है। अपने ग्रहों के वास्तविक बल, शुभ मुहूर्त और वैदिक उपायों को जानकर आप अपने जीवन को स्पष्टता और आध्यात्मिक साहस के साथ सही दिशा दे सकते हैं।'
                : 'We believe that planetary patterns in your Janma Kundli are not rigid fetters of doom, but rather a celestial roadmap of your karmic tendencies. By knowing your true planetary strengths, auspicious muhurtas, and remedial gems, you gain the power to direct your life with clarity and spiritual courage.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30 text-center">
              <Award className="w-7 h-7 text-amber-400 mx-auto mb-2" />
              <h4 className="font-bold text-slate-100 text-sm sm:text-base mb-1">
                {isHi ? 'प्रामाणिक वैदिक शास्त्र' : 'Authentic Vedic Shastra'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isHi ? 'वृहत् पाराशर होरा शास्त्र और लाहिड़ी अयनांश के नियमों पर पूर्णतः आधारित।' : 'Strictly grounded in Brihat Parashara Hora Shastra and Lahiri Ayanamsha.'}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30 text-center">
              <ShieldCheck className="w-7 h-7 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-slate-100 text-sm sm:text-base mb-1">
                {isHi ? '100% शुचिता एवं गोपनीयता' : '100% Privacy & Ethics'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isHi ? 'भय-मुक्त परामर्श। केवल सकारात्मक एवं प्रामाणिक वैदिक उपाय, मंत्र और नैतिक मार्गदर्शन।' : 'No fear-mongering. Purely ethical remedies, mantras, and practical counsel.'}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#1b0a38] border border-amber-500/30 text-center">
              <Sparkles className="w-7 h-7 text-purple-400 mx-auto mb-2" />
              <h4 className="font-bold text-slate-100 text-sm sm:text-base mb-1">
                {isHi ? 'आधुनिक डिजिटल सुगमता' : 'Modern Digital Ease'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isHi ? 'त्वरित एवं सटीक जन्म कुंडली, अष्टकूट गुण मिलान, दैनिक पंचांग और टैरो परामर्श।' : 'Instant accurate birth charts, Gun Milan, panchang, and tarot draws.'}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#180935] border border-purple-800/60">
            <h4 className="font-cinzel font-bold text-sm sm:text-base text-amber-300 mb-1">
              {isHi ? 'मुख्यालय एवं शोध केंद्र' : 'Headquarters & Research Center'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isHi 
                ? <>एस्ट्रोतंत्र वैदिक शोध एवं तंत्र अध्ययन केंद्र<br />नई दिल्ली, भारत • हेल्पलाइन: +91 99930 27943 • ईमेल: support@astrotanntra.com</>
                : <>ASTROTANNTRA Centre for Astrological Research & Tantric Studies<br />New Delhi, India • Helpline: +91 99930 27943 • Email: support@astrotanntra.com</>
              }
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-800/60 bg-[#160731] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm uppercase cursor-pointer"
          >
            {isHi ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}

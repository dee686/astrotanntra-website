import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Footer({
  onOpenKundli,
  onOpenAbout,
  onOpenBlog,
  onOpenConsultation,
  onOpenTarot,
  onOpenHoroscope,
  lang
}) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#120527] border-t border-amber-500/30 text-slate-300 pt-12 pb-8 px-4 md:px-8 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        
        {/* Col 1: Brand Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-purple-800 p-0.5 shadow-gold-glow flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-full bg-[#0d0421] flex items-center justify-center">
                <span className="font-cinzel font-black text-amber-300 text-lg">A</span>
              </div>
            </div>
            <div>
              <h4 className="font-cinzel font-bold text-lg text-amber-300 tracking-wider">
                ASTROTANNTRA
              </h4>
              <span className="text-[10px] text-amber-200/70 block -mt-1 uppercase tracking-widest">
                We Don't Change Destiny, We Change Direction
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Guiding you towards a better tomorrow with the power of Vedic Astrology and Tarot Reading.
          </p>

          <div className="text-[11px] text-amber-300/80 font-medium">
            ✦ ISO Certified Astrological Research Centre
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-cinzel font-bold text-sm text-amber-300 uppercase tracking-wider mb-4 pb-1 border-b border-purple-800/60 inline-block">
            QUICK LINKS
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a href="#" className="hover:text-amber-300 transition-colors">› Home</a>
            <button onClick={onOpenKundli} className="text-left hover:text-amber-300 transition-colors">› Kundli</button>
            <button onClick={onOpenAbout} className="text-left hover:text-amber-300 transition-colors">› About Us</button>
            <button onClick={onOpenTarot} className="text-left hover:text-amber-300 transition-colors">› Tarot</button>
            <a href="#services" className="hover:text-amber-300 transition-colors">› Services</a>
            <button onClick={onOpenBlog} className="text-left hover:text-amber-300 transition-colors">› Blog</button>
            <button onClick={onOpenHoroscope} className="text-left hover:text-amber-300 transition-colors">› Horoscope</button>
            <button onClick={onOpenConsultation} className="text-left hover:text-amber-300 transition-colors">› Contact</button>
          </div>
        </div>

        {/* Col 3: Contact Us */}
        <div>
          <h4 className="font-cinzel font-bold text-sm text-amber-300 uppercase tracking-wider mb-4 pb-1 border-b border-purple-800/60 inline-block">
            CONTACT US
          </h4>
          <div className="space-y-3 text-xs">
            <a href="tel:+919993027943" className="flex items-center gap-2.5 hover:text-amber-300 transition-colors">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>+91 99930 27943</span>
            </a>
            <a href="mailto:support@astrotanntra.com" className="flex items-center gap-2.5 hover:text-amber-300 transition-colors">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>support@astrotanntra.com</span>
            </a>
            <div className="flex items-center gap-2.5 text-slate-400">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>New Delhi, India</span>
            </div>
          </div>
        </div>

        {/* Col 4: Follow Us & Newsletter */}
        <div>
          <h4 className="font-cinzel font-bold text-sm text-amber-300 uppercase tracking-wider mb-4 pb-1 border-b border-purple-800/60 inline-block">
            FOLLOW US
          </h4>
          
          {/* Social Icons */}
          <div className="flex items-center gap-2.5 mb-5">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/19s1gHQuzG/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md hover:shadow-blue-500/40 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/astrotanntra?utm_source=qr&stkn=dXQxZDM3eGd0dHBy"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md hover:shadow-pink-500/40 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@astrotanntra?si=H0YgRDHH9zRir3iz"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md hover:shadow-red-500/40 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          <span className="text-[11px] text-slate-400 block mb-2 font-medium">
            Subscribe to our newsletter
          </span>

          <form onSubmit={handleSubscribe} className="flex items-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-lg bg-cosmic-950 border border-purple-700/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-r-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {subscribed && (
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Subscribed to daily astrological transits!</span>
            </div>
          )}
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-purple-900/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
        <span>© {new Date().getFullYear()} ASTROTANNTRA. All Rights Reserved.</span>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-amber-300">Privacy Policy</a>
          <a href="#" className="hover:text-amber-300">Terms of Service</a>
          <a href="#" className="hover:text-amber-300">Vedic Disclaimer</a>
        </div>
      </div>
    </footer>
  );
}

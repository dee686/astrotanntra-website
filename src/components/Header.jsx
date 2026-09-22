import React, { useState } from 'react';
import { Globe, User, Menu, X, Sparkles, Moon } from 'lucide-react';

export default function Header({ 
  onGoHome,
  onOpenKundli, 
  onOpenMilan, 
  onOpenHoroscope, 
  onOpenPanchang, 
  onOpenTarot, 
  onOpenConsultation, 
  onOpenAuth, 
  onOpenAbout,
  onOpenBlog,
  lang, 
  setLang 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0421]/95 backdrop-blur-md border-b border-amber-500/20 px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); onGoHome?.(); }} 
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-purple-900 p-0.5 shadow-gold-glow flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-[#0e0422] flex items-center justify-center">
              <span className="font-cinzel font-black text-amber-300 text-lg tracking-tighter">A</span>
            </div>
            <span className="absolute -top-1 -right-1 text-amber-400 text-xs animate-ping">✦</span>
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-lg md:text-xl font-bold tracking-[0.18em] text-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
              ASTROTANNTRA
            </span>
            <span className="text-[9px] uppercase tracking-widest text-amber-200/60 font-sans hidden sm:inline">
              Vedic Astrology & Guidance
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-200">
          <button 
            onClick={onGoHome}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            {lang === 'hi' ? 'होम' : 'Home'}
          </button>
          <button 
            onClick={onOpenAbout}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            {lang === 'hi' ? 'हमारे बारे में' : 'About'}
          </button>
          <button 
            onClick={onOpenBlog}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            {lang === 'hi' ? 'ब्लॉग' : 'Blog'}
          </button>
        </nav>

        {/* Language Selector & Login Button */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative flex items-center bg-cosmic-900/90 border border-amber-500/30 rounded-lg px-2.5 py-1.5 text-xs text-amber-200">
            <Globe className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-amber-200 outline-none cursor-pointer pr-1"
            >
              <option value="en" className="bg-[#12072b] text-slate-100">English</option>
              <option value="hi" className="bg-[#12072b] text-slate-100">हिन्दी (Hindi)</option>
            </select>
          </div>

          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/40 text-amber-300 hover:bg-amber-500/15 hover:border-amber-400 transition-all text-sm font-medium"
          >
            <User className="w-4 h-4 text-amber-400" />
            <span>{lang === 'hi' ? 'लॉगिन' : 'Login'}</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenAuth}
            className="p-2 text-amber-300 hover:bg-white/5 rounded-lg"
          >
            <User className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-amber-300 hover:bg-white/5 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-amber-500/20 flex flex-col gap-3 pb-2 animate-fadeIn">
          <button 
            onClick={() => { onGoHome?.(); setMobileMenuOpen(false); }}
            className="text-left py-2 px-3 rounded-lg hover:bg-amber-500/10 text-slate-200 font-medium cursor-pointer"
          >
            {lang === 'hi' ? 'होम' : 'Home'}
          </button>
          <button 
            onClick={() => { onOpenAbout(); setMobileMenuOpen(false); }}
            className="text-left py-2 px-3 rounded-lg hover:bg-amber-500/10 text-slate-200 font-medium cursor-pointer"
          >
            {lang === 'hi' ? 'हमारे बारे में' : 'About'}
          </button>
          <button 
            onClick={() => { onOpenBlog(); setMobileMenuOpen(false); }}
            className="text-left py-2 px-3 rounded-lg hover:bg-amber-500/10 text-slate-200 font-medium cursor-pointer"
          >
            {lang === 'hi' ? 'ब्लॉग' : 'Blog'}
          </button>
          <div className="pt-2 border-t border-purple-800/40 flex items-center justify-between px-2">
            <span className="text-xs text-slate-400">Language:</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setLang('en')}
                className={`text-xs px-2.5 py-1 rounded ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-cosmic-800 text-slate-300'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLang('hi')}
                className={`text-xs px-2.5 py-1 rounded ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-cosmic-800 text-slate-300'}`}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

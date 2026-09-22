import React, { useState, useRef, useEffect } from 'react';
import { Globe, User, Menu, X, Sparkles, LogOut, ChevronDown, CheckCircle2 } from 'lucide-react';

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
  user,
  onLogout,
  lang, 
  setLang 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'V';
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

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

        {/* Language Selector & User Profile / Login Button */}
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

          {user ? (
            /* Logged In User Pill with Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-[#1e0a3c] border border-amber-400/50 hover:border-amber-400 text-slate-100 transition-all shadow-md cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-950 text-xs shadow-sm">
                  {getInitials(user.name)}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-amber-300 max-w-[110px] truncate leading-tight">
                    {user.name || 'Vedic Seeker'}
                  </span>
                  <span className="text-[9px] text-emerald-400 flex items-center gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 transition-transform" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#14062c] border border-amber-500/40 shadow-[0_15px_45px_rgba(0,0,0,0.85)] p-3 text-xs text-slate-200 animate-fadeIn z-50">
                  <div className="p-2 border-b border-purple-800/60 pb-3 mb-2">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-0.5">
                      {lang === 'hi' ? 'लॉगिन खाता' : 'Signed In As'}
                    </div>
                    <div className="font-bold text-amber-300 text-sm truncate">
                      {user.name}
                    </div>
                    {user.email && (
                      <div className="text-slate-400 text-[11px] truncate">{user.email}</div>
                    )}
                    {user.phone && (
                      <div className="text-slate-400 text-[11px] truncate">{user.phone}</div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="px-2 py-1.5 rounded-lg bg-purple-950/40 text-[11px] text-amber-200/80 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{lang === 'hi' ? 'वैदिक प्रीमियम सत्र सक्रिय' : 'Vedic Session Active'}</span>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout?.();
                      }}
                      className="w-full mt-2 flex items-center gap-2 px-3 py-2 rounded-xl text-rose-300 hover:bg-rose-500/20 transition-colors font-semibold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>{lang === 'hi' ? 'साइन आउट (Sign Out)' : 'Sign Out'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Guest State: Login Button */
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/40 text-amber-300 hover:bg-amber-500/15 hover:border-amber-400 transition-all text-sm font-medium cursor-pointer"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? 'लॉगिन' : 'Login'}</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle & User Avatar */}
        <div className="flex items-center gap-2 md:hidden">
          {user ? (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-950 text-xs border border-amber-300/50"
            >
              {getInitials(user.name)}
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-2 text-amber-300 hover:bg-white/5 rounded-lg"
              aria-label="Login"
            >
              <User className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-amber-300 hover:bg-white/5 rounded-lg cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-amber-500/20 flex flex-col gap-3 pb-2 animate-fadeIn">
          {/* If Logged In, Display Profile in Mobile Drawer */}
          {user && (
            <div className="p-3 rounded-2xl bg-[#1a0c35] border border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-950 text-xs">
                  {getInitials(user.name)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-amber-300 truncate">{user.name}</span>
                  <span className="text-[10px] text-slate-400 truncate">{user.email || user.phone}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout?.();
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs flex items-center gap-1 font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'लॉगआउट' : 'Sign Out'}</span>
              </button>
            </div>
          )}

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

          {!user && (
            <button
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="py-2.5 px-4 rounded-xl gold-btn font-bold text-xs uppercase tracking-wider text-center cursor-pointer my-1"
            >
              {lang === 'hi' ? 'लॉगिन करें' : 'Login / Sign Up'}
            </button>
          )}

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

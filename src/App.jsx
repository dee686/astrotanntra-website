import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PanchangStrip from './components/PanchangStrip';
import HoroscopeStrip from './components/HoroscopeStrip';
import MiddleCardsSection from './components/MiddleCardsSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Modals
import KundliModal from './components/KundliModal';
import KundliPage from './components/KundliPage';
import KundliMilanModal from './components/KundliMilanModal';
import PanchangModal from './components/PanchangModal';
import HoroscopeModal from './components/HoroscopeModal';
import TarotReaderModal from './components/TarotReaderModal';
import ConsultationModal from './components/ConsultationModal';
import NumerologyModal from './components/NumerologyModal';
import AuthModal from './components/AuthModal';
import AboutModal from './components/AboutModal';
import BlogModal from './components/BlogModal';
import { getActiveUser, setActiveUser } from './services/authService';

// Vedic Calculations
import { calculateKundli } from './utils/vedicCalculations';
import { HOROSCOPE_DATA } from './data/horoscopeData';
import confetti from 'canvas-confetti';

export default function App() {
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState(() => getActiveUser());
  const userRef = useRef(user);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Active page state: 'home' | 'kundli'
  const [currentPage, setCurrentPage] = useState('home');

  // Modals state
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const [kundliData, setKundliData] = useState(null);
  const kundliDataRef = useRef(null);

  // Stored pending Kundli data when an unauthenticated user submits the form
  const [pendingKundliData, setPendingKundliData] = useState(null);
  const pendingKundliDataRef = useRef(null);
  const [authReason, setAuthReason] = useState(null);

  const [formNotice, setFormNotice] = useState(null);
  const noticeTimeoutRef = useRef(null);

  const triggerNotice = (msg) => {
    if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    setFormNotice(msg);
    noticeTimeoutRef.current = setTimeout(() => {
      setFormNotice(null);
    }, 4500);
  };

  const [isMilanOpen, setIsMilanOpen] = useState(false);
  const [isPanchangOpen, setIsPanchangOpen] = useState(false);
  const [isHoroscopeOpen, setIsHoroscopeOpen] = useState(false);
  const [selectedSign, setSelectedSign] = useState(HOROSCOPE_DATA[0]);

  const [isTarotOpen, setIsTarotOpen] = useState(false);
  const [selectedTarotPkg, setSelectedTarotPkg] = useState(null);

  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState('');

  const [isNumerologyOpen, setIsNumerologyOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  // Initialize and sync with browser history
  useEffect(() => {
    // Every time the page is refreshed, reset session and require user to submit form
    try {
      sessionStorage.removeItem('astrotanntra_kundli');
    } catch (e) {}

    setKundliData(null);
    kundliDataRef.current = null;
    setCurrentPage('home');

    // Ensure initial URL is clean root '/'
    window.history.replaceState({ page: 'home' }, '', window.location.pathname);

    // Handle browser Back and Forward navigation buttons
    const handlePopState = (event) => {
      const hash = window.location.hash;
      const state = event?.state;

      if (hash === '#kundli' || state?.page === 'kundli') {
        // Disallow forward navigation to Kundli page if user is not logged in
        if (!userRef.current) {
          window.history.replaceState({ page: 'home' }, '', window.location.pathname);
          setCurrentPage('home');
          setAuthReason('premium_kundli');
          setIsAuthOpen(true);
          triggerNotice(
            lang === 'hi'
              ? 'कुण्डली निर्माण एक प्रीमियम सुविधा है। कृपया पहले लॉगिन या साइन अप करें।'
              : 'Generating Kundli is a premium feature. Please Sign In or Sign Up first.'
          );
          return;
        }

        // Disallow forward navigation to Kundli page if user has not filled details and clicked Generate Kundli
        if (!kundliDataRef.current) {
          window.history.replaceState({ page: 'home' }, '', window.location.pathname);
          setCurrentPage('home');
          triggerNotice(
            lang === 'hi'
              ? 'कृपया पहले जन्म विवरण भरें और "कुण्डली बनाएं" पर क्लिक करें।'
              : 'Please fill in your birth details and click "Generate Kundli" first.'
          );
          const el = document.getElementById('kundli-form');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
        setCurrentPage('kundli');
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
      if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    };
  }, [lang]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    userRef.current = userData;

    // If there was a pending Kundli calculation waiting for login, calculate and display immediately
    if (pendingKundliDataRef.current) {
      const dataToCompute = pendingKundliDataRef.current;
      pendingKundliDataRef.current = null;
      setPendingKundliData(null);
      setAuthReason(null);

      const computed = calculateKundli(dataToCompute);
      kundliDataRef.current = computed;
      setKundliData(computed);

      setCurrentPage('kundli');
      if (window.location.hash !== '#kundli') {
        window.history.pushState({ page: 'kundli' }, '', '#kundli');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      } catch (e) {}
    }
  };

  const handleLogout = () => {
    setActiveUser(null);
    setUser(null);
    userRef.current = null;
    kundliDataRef.current = null;
    setKundliData(null);
    pendingKundliDataRef.current = null;
    setPendingKundliData(null);
    setCurrentPage('home');
  };

  const handleGoHome = () => {
    if (currentPage !== 'home' || window.location.hash === '#kundli') {
      window.history.pushState({ page: 'home' }, '', window.location.pathname + window.location.search);
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenKundliPage = () => {
    if (!userRef.current) {
      setAuthReason('premium_kundli');
      setIsAuthOpen(true);
      triggerNotice(
        lang === 'hi'
          ? 'कुण्डली देखना एक प्रीमियम सुविधा है। कृपया पहले लॉगिन या साइन अप करें।'
          : 'Viewing Kundli is a premium feature. Please Sign In or Sign Up first.'
      );
      return;
    }

    if (!kundliDataRef.current) {
      triggerNotice(
        lang === 'hi'
          ? 'कृपया पहले जन्म विवरण भरें और "कुण्डली बनाएं" पर क्लिक करें।'
          : 'Please fill in your birth details and click "Generate Kundli" first.'
      );
      const el = document.getElementById('kundli-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setCurrentPage('kundli');
    if (window.location.hash !== '#kundli') {
      window.history.pushState({ page: 'kundli' }, '', '#kundli');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateKundli = (formData) => {
    if (!userRef.current) {
      // Premium feature guard: prompt user to login/signup and preserve their entered details
      pendingKundliDataRef.current = formData;
      setPendingKundliData(formData);
      setAuthReason('premium_kundli');
      setIsAuthOpen(true);
      triggerNotice(
        lang === 'hi'
          ? 'कुण्डली निर्माण एक प्रीमियम सुविधा है। सम्पूर्ण कुण्डली देखने के लिए कृपया लॉगिन या साइन अप करें।'
          : 'Generating Kundli is a premium feature. Please Sign In or Sign Up to view your chart.'
      );
      return;
    }

    const computed = calculateKundli(formData);
    kundliDataRef.current = computed;
    setKundliData(computed);

    setCurrentPage('kundli');
    if (window.location.hash !== '#kundli') {
      window.history.pushState({ page: 'kundli' }, '', '#kundli');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
    } catch (e) {}
  };

  const handleOpenTarotWithPackage = (pkg) => {
    setSelectedTarotPkg(pkg);
    setIsTarotOpen(true);
  };

  const handleOpenConsultationWithTopic = (topic) => {
    setConsultationTopic(topic || 'General Vedic Consultation');
    setIsConsultationOpen(true);
  };

  const handleSelectSign = (sign) => {
    setSelectedSign(sign);
    setIsHoroscopeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b031b] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* Top Header */}
      <Header
        onGoHome={handleGoHome}
        onOpenKundli={handleOpenKundliPage}
        onOpenMilan={() => setIsMilanOpen(true)}
        onOpenHoroscope={() => { setSelectedSign(HOROSCOPE_DATA[0]); setIsHoroscopeOpen(true); }}
        onOpenPanchang={() => setIsPanchangOpen(true)}
        onOpenTarot={() => { setSelectedTarotPkg(null); setIsTarotOpen(true); }}
        onOpenConsultation={() => handleOpenConsultationWithTopic('Vedic Astrology Consultation')}
        onOpenAuth={() => { setAuthReason(null); setIsAuthOpen(true); }}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenBlog={() => setIsBlogOpen(true)}
        user={user}
        onLogout={handleLogout}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content: Dedicated Full Kundli Page OR Home Landing View */}
      {currentPage === 'kundli' ? (
        <main className="flex-1 flex flex-col">
          <KundliPage
            kundliData={kundliData}
            onGoBack={handleGoHome}
            onOpenConsultation={handleOpenConsultationWithTopic}
            lang={lang}
          />
        </main>
      ) : (
        <main className="flex-1 flex flex-col">
          {/* Main Hero Section with "CREATE YOUR KUNDLI" Form Card */}
          <Hero
            key={currentPage}
            user={user}
            onGenerateKundli={handleGenerateKundli}
            onOpenConsultation={() => handleOpenConsultationWithTopic('Vedic Astrology Consultation')}
            onOpenTarot={() => { setSelectedTarotPkg(null); setIsTarotOpen(true); }}
            lang={lang}
          />

          {/* Today's Astrology Information (Panchang Bar) */}
          <PanchangStrip
            onOpenPanchang={() => setIsPanchangOpen(true)}
            lang={lang}
          />

          {/* Today's Horoscope Carousel (12 Zodiac Signs) */}
          <HoroscopeStrip
            onSelectSign={handleSelectSign}
            lang={lang}
          />

          {/* 3 Middle Cards: Premium Services, Tarot Packages, Why Choose Us */}
          <MiddleCardsSection
            onOpenConsultation={handleOpenConsultationWithTopic}
            onOpenMilan={() => setIsMilanOpen(true)}
            onOpenNumerology={() => setIsNumerologyOpen(true)}
            onOpenTarotWithPackage={handleOpenTarotWithPackage}
            onOpenKundli={handleOpenKundliPage}
            lang={lang}
          />

          {/* What Our Clients Say (Testimonials) */}
          <Testimonials lang={lang} />
        </main>
      )}

      {/* Footer */}
      <Footer
        onGoHome={handleGoHome}
        onOpenKundli={handleOpenKundliPage}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenBlog={() => setIsBlogOpen(true)}
        onOpenConsultation={() => handleOpenConsultationWithTopic('Customer Support & Inquiries')}
        onOpenTarot={() => { setSelectedTarotPkg(null); setIsTarotOpen(true); }}
        onOpenHoroscope={() => { setSelectedSign(HOROSCOPE_DATA[0]); setIsHoroscopeOpen(true); }}
        lang={lang}
      />

      {/* Floating WhatsApp Action Button & Live Help Drawer */}
      <WhatsAppButton />

      {/* Floating Notice Toast */}
      {formNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1e0a3c]/95 border-2 border-amber-400 text-amber-200 px-5 py-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.4)] flex items-center gap-3 animate-fadeIn backdrop-blur-md max-w-md w-[90%] sm:w-auto">
          <span className="text-amber-400 text-base shrink-0">✦</span>
          <span className="text-xs sm:text-sm font-semibold">{formNotice}</span>
          <button
            onClick={() => setFormNotice(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-auto cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ALL MODALS (Kundli is now a dedicated full page, not a popup modal) */}

      {isMilanOpen && (
        <KundliMilanModal
          onClose={() => setIsMilanOpen(false)}
          onOpenConsultation={handleOpenConsultationWithTopic}
          lang={lang}
        />
      )}

      {isPanchangOpen && (
        <PanchangModal
          onClose={() => setIsPanchangOpen(false)}
          lang={lang}
        />
      )}

      {isHoroscopeOpen && (
        <HoroscopeModal
          sign={selectedSign}
          onClose={() => setIsHoroscopeOpen(false)}
          onOpenConsultation={handleOpenConsultationWithTopic}
          lang={lang}
        />
      )}

      {isTarotOpen && (
        <TarotReaderModal
          initialPackage={selectedTarotPkg}
          onClose={() => setIsTarotOpen(false)}
          onOpenConsultation={handleOpenConsultationWithTopic}
          lang={lang}
        />
      )}

      {isConsultationOpen && (
        <ConsultationModal
          initialTopic={consultationTopic}
          onClose={() => setIsConsultationOpen(false)}
          lang={lang}
        />
      )}

      {isNumerologyOpen && (
        <NumerologyModal
          onClose={() => setIsNumerologyOpen(false)}
          onOpenConsultation={handleOpenConsultationWithTopic}
          lang={lang}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          authReason={authReason}
          onClose={() => {
            setIsAuthOpen(false);
            setAuthReason(null);
          }}
          onLoginSuccess={handleLoginSuccess}
          lang={lang}
        />
      )}

      {isAboutOpen && (
        <AboutModal
          onClose={() => setIsAboutOpen(false)}
          lang={lang}
        />
      )}

      {isBlogOpen && (
        <BlogModal
          onClose={() => setIsBlogOpen(false)}
          onOpenConsultation={handleOpenConsultationWithTopic}
          lang={lang}
        />
      )}

    </div>
  );
}

import React, { useState, useEffect } from 'react';
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

// Vedic Calculations
import { calculateKundli } from './utils/vedicCalculations';
import { HOROSCOPE_DATA } from './data/horoscopeData';
import confetti from 'canvas-confetti';

export default function App() {
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState(null);

  // Active page state: 'home' | 'kundli'
  const [currentPage, setCurrentPage] = useState('home');

  // Modals state
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const [kundliData, setKundliData] = useState(null);

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

  // Initialize with sample/cached Kundli and sync with browser history
  useEffect(() => {
    let initialKundli = null;
    try {
      const saved = sessionStorage.getItem('astrotanntra_kundli');
      if (saved) {
        initialKundli = JSON.parse(saved);
      }
    } catch (e) {}

    if (!initialKundli && window.location.hash === '#kundli') {
      // If directly accessing #kundli without prior generation, provide clean placeholder
      initialKundli = calculateKundli({
        name: 'Vedic Native',
        dob: '2000-01-01',
        tob: '12:00',
        place: 'New Delhi, India',
        gender: 'Male',
        lat: 28.6139,
        lng: 77.2090,
        tz: 5.5
      });
    }
    setKundliData(initialKundli);

    // Sync initial state with URL hash
    if (window.location.hash === '#kundli') {
      setCurrentPage('kundli');
      window.history.replaceState({ page: 'kundli' }, '', '#kundli');
    } else {
      window.history.replaceState({ page: 'home' }, '', window.location.pathname + window.location.search);
    }

    // Handle browser Back and Forward navigation buttons
    const handlePopState = (event) => {
      const hash = window.location.hash;
      const state = event?.state;

      if (hash === '#kundli' || state?.page === 'kundli') {
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
    };
  }, []);

  const handleGoHome = () => {
    if (currentPage !== 'home' || window.location.hash === '#kundli') {
      window.history.pushState({ page: 'home' }, '', window.location.pathname + window.location.search);
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenKundliPage = () => {
    setCurrentPage('kundli');
    if (window.location.hash !== '#kundli') {
      window.history.pushState({ page: 'kundli' }, '', '#kundli');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateKundli = (formData) => {
    const computed = calculateKundli(formData);
    setKundliData(computed);
    try {
      sessionStorage.setItem('astrotanntra_kundli', JSON.stringify(computed));
    } catch (e) {}

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
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenBlog={() => setIsBlogOpen(true)}
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
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={(userData) => setUser(userData)}
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

# 🕉️ Astrotanntra — Vedic Astrology & Tarot Platform

<div align="center">

![Astrotanntra Banner](https://img.shields.io/badge/ASTROTANNTRA-Vedic%20Astrology%20%26%20Tarot-gold?style=for-the-badge&logo=astronomy)

**"We Don't Change Destiny, We Change Your Direction"**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.4.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zero External APIs](https://img.shields.io/badge/Astrology_API-100%25_In--House_Math-4CAF50?style=flat-square)](#-astronomical-calculation-engine)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[**Live Demo**](https://dee686.github.io/astrotanntra-website/) • [**Technical Documentation**](PROJECT_DOCUMENTATION.md) • [**Report Bug**](https://github.com/dee686/astrotanntra-website/issues)

</div>

---

## 📖 Overview

**Astrotanntra** is a modern, high-performance web platform for Vedic Astrology (*Parashara Jyotish*) and Tarot Divination. Designed with a luxury cosmic theme, royal dual typography (*Cinzel* & *Outfit*), and responsive layouts, it provides users with instantaneous, mathematically precise astrological calculations and consultation booking workflows.

Unlike standard astrology websites that rely on costly, rate-limited third-party APIs, **Astrotanntra's core astronomical and astrological engines run 100% locally in pure JavaScript** — calculating Julian Day numbers, Lahiri Ayanamsha, planetary longitudes, rising Ascendants (Lagna), D1 to D10 divisional charts, and Ashtakoot 36-point marriage compatibility on the client side with zero latency.

---

## ✨ Key Features

### 🌌 1. Real-Time Kundli Generator & D1–D10 Charts
- **Comprehensive Ephemeris**: Calculates real-time positions for Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu using Indian sidereal coordinates (*Nirayana* system with Chitra Paksha / Lahiri Ayanamsha).
- **Dual Visual Styles**: Interactive SVG North Indian (*Diamond*) and South Indian (*Box*) chart visualizers.
- **Divisional Charts (Vargas)**:
  - **D1 (Rashi)**: Fundamental birth chart
  - **D2 (Hora)**: Wealth & resources
  - **D3 (Drekkana)**: Courage, energy & siblings
  - **D4 (Chaturthamsa)**: Fixed assets, home & fortune
  - **D7 (Saptamsa)**: Children, progeny & creative legacy
  - **D9 (Navamsha)**: Marriage, dharma & soul destiny
  - **D10 (Dashamsha)**: Career, profession & public standing
- **Vimshottari Mahadasha**: 120-year planetary timeline calculated from Moon's nakshatra longitude.
- **Dosha Analysis**: Manglik Dosha severity (houses 1, 4, 7, 8, 12) with cancellation conditions, and Saturn's 7.5-year Sade Sati phase tracker.
- **Research Guide**: Includes download access to a complete 12-page research PDF reference guide on D1 to D10 chart calculations.

### 💑 2. Ashtakoot Kundli Milan (36-Guna Matchmaking)
- Evaluates classical 8-fold marriage compatibility (*Ashtakoota*):
  - **Varna** (1 pt), **Vashya** (2 pts), **Tara** (3 pts), **Yoni** (4 pts), **Graha Maitri** (5 pts), **Gana** (6 pts), **Bhakoot** (7 pts), and **Nadi** (8 pts).
- Flags critical doshas (**Nadi Dosha** and **Bhakoot Dosha**) and generates a comprehensive marital verdict.

### 📅 3. Book Vedic Consultation (Calendar, Slots & Checkout)
- **Verified Indian Astrologers**: Choose from experienced Acharyas and Vedic scholars (Acharya Devendra Shastri, Dr. Ananya Mukherjee, Pandit Rajesh Vashistha, Meera Sen) with authentic Indian portraits, ratings, and rates.
- **Session Modes**: Audio Call, Video Consultation, or Live Chat.
- **Interactive Scheduling**: Dynamic calendar date selector and categorized time slots (Morning: 09:30 AM–11:45 AM, Afternoon: 02:00 PM–04:30 PM, Evening: 06:00 PM–09:00 PM).
- **Multi-Method Payment Checkout**:
  - **UPI / Dynamic QR Code**: Astrotanntra UPI QR code, instant one-tap buttons for Google Pay, PhonePe, Paytm, and BHIM, plus VPA ID verification.
  - **Credit / Debit Cards**: Secure card details form.
  - **Net Banking**: Instant selection for major Indian banks (HDFC, ICICI, SBI, Axis, Kotak, PNB).
  - **Pay After Consultation**: 100% satisfaction guarantee to pay post-session.
  - **Coupon Engine**: Apply promo codes (e.g. `ASTROFIRST` for ₹200 off).
- **Instant Booking Confirmation**: Booking Reference ID (`ASTRO-XXXXXX`), Meeting PIN, confetti celebration, and direct WhatsApp connect.

### 🔮 4. Tarot Card Reading & Pricing (Interactive 3D Deck)
- **7 Transparent Reading Packages**:
  - One Card Guidance: ₹499 / $6
  - Three Card Spread (Past, Present, Future): ₹999 / $12
  - Love & Relationship Spread: ₹1,499 / $18
  - Career & Business Destiny: ₹1,499 / $18
  - Wealth & Financial Growth: ₹1,499 / $18
  - Celtic Cross Deep Soul Spread: ₹1,999 / $24
  - Annual 12-Month Year Ahead Forecast: ₹2,499 / $30
- **Interactive 3D Deck**: Real-time shuffle animation, click-to-draw cards, and smooth 3D flip effects revealing upright/reversed meanings, keywords, and specific insights for Love, Career, and Finance.

### 🌅 5. Daily Vedic Panchang
- Interactive Panchang ribbon and deep modal detailing **Tithi**, **Vaar**, **Nakshatra**, **Yoga**, **Karana**, Sunrise, Sunset, auspicious **Abhijit Muhurta**, and inauspicious **Rahu Kaal** periods.

### ♈ 6. 12 Rashi Horoscope Forecasts
- Interactive Zodiac ribbon with celestial glyphs, Sanskrit names, ruling elements, ruling planets, and weekly predictions across Love, Career, Health, and Finance.

### 🔢 7. Life Path & Name Numerology
- Calculates **Mulank** (Driver Number), **Bhagyank** (Conductor Number), and **Chaldean Name Number** with personality breakdowns, gemstone recommendations, and partner compatibility.

### 💬 8. Live Astrologer WhatsApp Desk
- Floating WhatsApp support desk at the bottom-right with an active pulse status, quick-query selection, and direct routing to senior astrologers at `+91 99930 27943`.

### 🌐 9. Full Multilingual Support
- Instant toggle between **English** and **Hindi (हिन्दी)** across the entire interface without page reloads.

---

## 🛠️ Technology Stack

| Layer | Tool / Library | Version | Description |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^18.3.1` | Component-based UI with hooks (`useState`, `useEffect`, `useMemo`) |
| **DOM Renderer** | React DOM | `^18.3.1` | High-efficiency virtual DOM rendering |
| **Build & Dev Tool** | Vite | `^6.4.3` | Ultra-fast build tool with Hot Module Replacement (HMR) |
| **Styling** | Tailwind CSS | `^3.4.17` | Utility-first responsive styling with custom cosmic theme |
| **CSS Processing** | PostCSS / Autoprefixer | `^8.4.49` / `^10.4.20` | Cross-browser CSS post-processing pipeline |
| **Iconography** | Lucide React | `^1.16.0` | Lightweight SVG icons |
| **Visual Effects** | Canvas Confetti | `^1.9.4` | Particle celebration animations |
| **Typography** | Google Fonts | CDN | Sacred serif (`Cinzel`) and clean modern sans-serif (`Outfit`) |
| **Astrology Calculations** | Custom ES6 Math | Native | Pure client-side astronomical algorithms (Julian Day, Ayanamsha, Lagna, D1–D10) |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (Version `18.0.0` or higher, Node 20+ LTS recommended)
- [npm](https://www.npmjs.com/) (Version `9.0.0` or higher)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dee686/astrotanntra-website.git
   cd astrotanntra-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The compiled, production-ready static assets will be output to the `dist/` directory.

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 📁 Repository Structure

```
astrotanntra-website/
├── .gitignore                     # Git ignore rules (node_modules, keys, builds)
├── index.html                     # HTML5 root mounting shell & typography fonts
├── package.json                   # Project dependencies and build scripts
├── package-lock.json              # Dependency lockfile
├── postcss.config.js              # PostCSS plugins configuration
├── tailwind.config.js             # Tailwind theme colors, fonts & keyframe animations
├── vite.config.js                 # Vite configuration with relative base './'
├── PROJECT_DOCUMENTATION.md       # Comprehensive 500-line technical architecture doc
├── Vedic_Divisional_Charts...pdf  # 12-page research reference guide on D1 to D10 charts
│
├── public/                        # Static assets served from root URL
│   ├── astrologers/               # High-definition portraits of Indian Astrologers
│   └── testimonials/              # Client feedback portraits
│
└── src/
    ├── main.jsx                   # Application bootstrap entry point
    ├── App.jsx                    # Central state coordinator & modal manager
    ├── index.css                  # Global styles, cosmic themes, and GPU scroll
    │
    ├── components/                # Presentation Components & Interactive Modals
    │   ├── Header.jsx             # Navigation bar & language switcher
    │   ├── Hero.jsx               # Hero section with birth data entry form
    │   ├── CelestialArtwork.jsx   # Vector armillary spheres and sacred motifs
    │   ├── PanchangStrip.jsx      # Daily Hindu calendar summary ribbon
    │   ├── HoroscopeStrip.jsx     # 12 Zodiac Rashi carousel ribbon
    │   ├── MiddleCardsSection.jsx # Services cards & Tarot package tier grid
    │   ├── Testimonials.jsx       # Customer review carousel with Indian avatars
    │   ├── Footer.jsx             # Footer with brand credentials & social links
    │   ├── WhatsAppButton.jsx     # Floating WhatsApp desk with live chat popover
    │   ├── KundliModal.jsx        # Complete Kundli viewer (Charts, Dasha, Doshas)
    │   ├── NorthIndianChart.jsx   # SVG diamond-style North Indian chart renderer
    │   ├── SouthIndianChart.jsx   # SVG square-style South Indian chart renderer
    │   ├── KundliMilanModal.jsx   # Ashtakoot 36-point marriage matchmaking modal
    │   ├── ConsultationModal.jsx  # Booking system with calendar, slots & checkout
    │   ├── TarotReaderModal.jsx   # Tarot divination (Packages, 3D draw & booking)
    │   ├── HoroscopeModal.jsx     # Full 12 Rashi weekly horoscope guide
    │   ├── PanchangModal.jsx      # Comprehensive daily Hindu calendar details
    │   ├── NumerologyModal.jsx    # Mulank, Bhagyank & Name numerology engine
    │   ├── AuthModal.jsx          # Client authentication & registration modal
    │   ├── AboutModal.jsx         # Astrotanntra lineage & Acharya background
    │   └── BlogModal.jsx          # Vedic astrology articles & case studies
    │
    ├── utils/                     # Mathematical & Astrological Calculation Engines
    │   ├── vedicCalculations.js   # Julian Day, Lagna, D1-D10, Dasha, Manglik, Sade Sati
    │   ├── ashtakootMilan.js      # 8 Kootas & 36 Gunas scoring algorithms
    │   └── numerology.js          # Digital root reduction & Chaldean name alphabet
    │
    └── data/                      # Static Catalogs & Structured Datasets
        ├── astrologersData.js     # Verified Indian astrologer profiles & rates
        ├── tarotData.js           # 78 Tarot cards & priced reading packages
        ├── horoscopeData.js       # 12 Zodiac signs with weekly predictions
        ├── panchangData.js        # Vedic calendar calculations and muhurtas
        ├── citiesData.js          # 50+ major cities with lat/lng & timezones
        └── blogData.js            # Editorial articles on astrological sciences
```

> 📘 **For deep file-by-file input/output specifications, read [`PROJECT_DOCUMENTATION.md`](PROJECT_DOCUMENTATION.md).**

---

## 🧮 Astronomical Calculation Engine

Astrotanntra operates completely autonomously without any external commercial astrology APIs. The mathematical engines in `src/utils/` perform:
1. **Gregorian to Julian Day Conversion**: Accurately computes fractional Julian Day numbers taking geographical time zones into account.
2. **Lahiri Ayanamsha (Chitra Paksha)**: Determines the exact angular difference between the Western tropical and Vedic sidereal zodiacs.
3. **Ascendant (Lagna) Computation**: Derives Greenwich Mean Sidereal Time (GMST) and Local Sidereal Time (LST) from the user's longitude and time to calculate the exact rising degree on the Eastern horizon.
4. **Vedic Divisional Charts (D1 to D10)**: Uses classical Parashara mathematical formulas to project planetary coordinates into fine divisional segments (D1 Rashi, D2 Hora, D3 Drekkana, D4 Chaturthamsa, D7 Saptamsa, D9 Navamsha, and D10 Dashamsha).
5. **Vimshottari Dasha Engine**: Identifies birth nakshatra and computes the 120-year cycle balances.
6. **Ashtakoot Guna Milan**: Implements the 8 traditional kootas out of 36 points with Nadi/Bhakoot dosha evaluation.

---

## 🚢 Deployment

The project builds standard, static HTML/CSS/JS assets with relative paths (`base: './'`), making deployment effortless across any platform:

### Deploy to GitHub Pages
1. Build the production files:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` directory to your `gh-pages` branch.

### Deploy to Vercel or Netlify
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Deploy Inside WordPress
Because `vite.config.js` uses relative asset links, you can:
- Upload the contents of `dist/` into any WordPress folder (e.g., `wp-content/uploads/astrotanntra/`).
- Embed directly into any WordPress page using an iframe:
  ```html
  <iframe src="/path-to-dist/index.html" style="width:100%; height:100vh; border:none;"></iframe>
  ```

---

## 📞 Support & Inquiries

- **WhatsApp Desk**: [+91 99930 27943](https://wa.me/919993027943)
- **Consultation Email**: `contact@astrotanntra.com`
- **GitHub Repository**: [https://github.com/dee686/astrotanntra-website](https://github.com/dee686/astrotanntra-website)

---

<div align="center">

Made with 🕉️ by Astrotanntra • Dedicated to Ancient Vedic Wisdom & Modern Web Engineering

</div>

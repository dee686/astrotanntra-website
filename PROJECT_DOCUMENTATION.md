# ASTROTANNTRA — Complete Technical & Architecture Documentation

> **Tagline**: *"We Don't Change Destiny, We Change Your Direction"*  
> **Platform Version**: `1.0.0` (Production Ready)  
> **Repository**: [https://github.com/dee686/astrotanntra-website](https://github.com/dee686/astrotanntra-website)

---

## Table of Contents
1. [Technologies & Frameworks Used](#1-technologies--frameworks-used)
2. [Prerequisites & System Setup](#2-prerequisites--system-setup)
3. [How to Install & Run the Application](#3-how-to-install--run-the-application)
4. [Complete File & Folder Architecture](#4-complete-file--folder-architecture)
5. [Deep Dive: File-by-File Analysis (Purpose, Inputs & Outputs)](#5-deep-dive-file-by-file-analysis)
   - [Root Configuration Files](#root-configuration-files)
   - [Core Application Files (`src/`)](#core-application-files-src)
   - [UI Components & Modals (`src/components/`)](#ui-components--modals-srccomponents)
   - [Mathematical & Astrological Engines (`src/utils/`)](#mathematical--astrological-engines-srcutils)
   - [Data Catalogs (`src/data/`)](#data-catalogs-srcdata)
   - [Public Assets (`public/`)](#public-assets-public)
6. [Detailed Working Features Guide](#6-detailed-working-features-guide)
   - [1. Real-Time Kundli Generator & Divisional Charts (D1 to D10)](#1-real-time-kundli-generator--divisional-charts-d1-to-d10)
   - [2. Kundli Milan / 36-Guna Matchmaking](#2-kundli-milan--36-guna-matchmaking)
   - [3. Book Vedic Consultation (Calendar, Time Slots & Payment Checkout)](#3-book-vedic-consultation-calendar-time-slots--payment-checkout)
   - [4. Tarot Card Reading & Pricing (Interactive 3D Deck & Live Sessions)](#4-tarot-card-reading--pricing-interactive-3d-deck--live-sessions)
   - [5. Daily Vedic Panchang](#5-daily-vedic-panchang)
   - [6. 12 Rashi Horoscope Forecasts](#6-12-rashi-horoscope-forecasts)
   - [7. Life Path & Name Numerology](#7-life-path--name-numerology)
   - [8. Live Astrologer WhatsApp Desk](#8-live-astrologer-whatsapp-desk)
   - [9. Multilingual Support (English & Hindi)](#9-multilingual-support-english--hindi)

---

## 1. Technologies & Frameworks Used

The Astrotanntra platform is built as a high-performance Single-Page Application (SPA) leveraging modern web standards:

| Technology / Library | Version | Purpose in Application |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | Declarative component-based UI architecture, virtual DOM rendering, reactive state management using React Hooks (`useState`, `useEffect`, `useMemo`). |
| **React DOM** | `^18.3.1` | Mounts and updates the virtual DOM tree directly into the browser's document object model. |
| **Vite** | `^6.4.3` | Next-generation frontend build tool and lightning-fast Hot Module Replacement (HMR) development server. Builds compact, production-ready ES modules. |
| **Tailwind CSS** | `^3.4.17` | Utility-first CSS engine for responsive layouts, custom cosmic color palettes (`cosmic-900`, `cosmic-950`, gold gradients), flex/grid systems, and hardware-accelerated transitions. |
| **PostCSS & Autoprefixer** | `^8.4.49` / `^10.4.20` | CSS post-processing pipeline and automatic vendor prefixing across all modern and legacy browsers. |
| **Lucide React** | `^1.16.0` | Clean, crisp, lightweight SVG icon system for UI controls, navigation, ratings, payment methods, and celestial glyphs. |
| **Canvas Confetti** | `^1.9.4` | Particle physics celebration effect triggered upon successful birth chart generation and consultation appointment confirmation. |
| **Google Fonts** | CDN | Professional dual typography: **Cinzel** (ancient sacred royal serif for headings) and **Outfit** (modern clean sans-serif for legible body text). |
| **Pure JavaScript Math** | Native ES6 | Custom-built astronomical algorithms (Julian Day, Lahiri Ayanamsha, Planetary Perturbations, D1-D10 divisional chart projection, Ashtakoot 36-point matching). **Zero reliance on paid external astrology APIs!** |

---

## 2. Prerequisites & System Setup

Before running the application on your computer or server, ensure you have:
1. **Node.js**: Version `18.0.0` or higher (Node 20+ LTS recommended).
   - Check via terminal: `node -v`
2. **npm**: Version `9.0.0` or higher (packaged with Node.js).
   - Check via terminal: `npm -v`
3. **Git**: Installed for version control and pushing to GitHub.
   - Check via terminal: `git --version`
4. **Any Modern Web Browser**: Chrome, Edge, Firefox, Brave, or Safari.

---

## 3. How to Install & Run the Application

### Step 1: Open Terminal and Navigate to Project
```bash
cd /home/ansh-mishra/Desktop/website
```

### Step 2: Install Node Dependencies
If running for the first time or on a fresh clone:
```bash
npm install
```
*(This downloads all dependencies defined in `package.json` into the `node_modules/` folder).*

### Step 3: Start the Development Server
```bash
npm run dev
```
- The Vite server launches in approximately **200 milliseconds**.
- Open your browser and navigate to: **`http://localhost:5173/`**
- Any change saved in `src/` automatically live-reloads in the browser without losing application state.

### Step 4: Build for Production
To bundle and minify the entire application for deployment:
```bash
npm run build
```
- The compiled assets are placed in the **`dist/`** directory.
- All asset paths are configured relatively (`./assets/...`) so the build can run anywhere: root domains, subfolders (`/app`), or inside WordPress.

### Step 5: Preview the Production Build Locally
To test the exact production output locally before deployment:
```bash
npm run preview
```

---

## 4. Complete File & Folder Architecture

```
website/
├── .gitignore                     # Git exclusion rules (node_modules, keys, logs)
├── index.html                     # HTML5 root mounting shell
├── package.json                   # Project manifest, scripts, and dependencies
├── package-lock.json              # Deterministic dependency lockfile
├── postcss.config.js              # PostCSS plugins configuration
├── tailwind.config.js             # Tailwind design tokens, colors & keyframes
├── vite.config.js                 # Vite bundler options & relative base configuration
├── Vedic_Divisional_Charts...pdf  # 12-page research reference guide on D1 to D10 charts
│
├── public/                        # Static assets served from root URL
│   ├── astrologers/               # High-definition portraits of Indian Astrologers
│   │   ├── acharya_devendra.jpg
│   │   ├── dr_ananya.jpg
│   │   ├── pandit_rajesh.jpg
│   │   └── meera_sen.jpg
│   └── testimonials/              # Client feedback portraits
│       ├── priya.jpg
│       └── sunita.jpg
│
├── src/                           # Application Source Code
│   ├── main.jsx                   # React root entry point
│   ├── App.jsx                    # Central state coordinator & modal manager
│   ├── index.css                  # Global styles, fonts, gradients & GPU scroll
│   │
│   ├── components/                # Presentation Components & Interactive Modals
│   │   ├── Header.jsx             # Top sticky navbar with navigation & language toggle
│   │   ├── Hero.jsx               # Hero section with interactive birth chart inputs
│   │   ├── CelestialArtwork.jsx   # Vector armillary spheres & sacred artwork
│   │   ├── PanchangStrip.jsx      # Daily Hindu calendar summary ribbon
│   │   ├── HoroscopeStrip.jsx     # 12 Zodiac Rashi carousel ribbon
│   │   ├── MiddleCardsSection.jsx # Services grid, Tarot packages & trust points
│   │   ├── Testimonials.jsx       # Customer review carousel with Indian avatars
│   │   ├── Footer.jsx             # Footer with brand credentials & social links
│   │   ├── WhatsAppButton.jsx     # Floating WhatsApp desk with live chat popover
│   │   ├── KundliModal.jsx        # Complete Kundli viewer (Charts, Dasha, Dosha)
│   │   ├── NorthIndianChart.jsx   # SVG diamond-style North Indian chart renderer
│   │   ├── SouthIndianChart.jsx   # SVG square-style South Indian chart renderer
│   │   ├── KundliMilanModal.jsx   # Ashtakoot 36-point marriage matchmaking calculator
│   │   ├── ConsultationModal.jsx  # Booking system with calendar, slots & payment checkout
│   │   ├── TarotReaderModal.jsx   # Tarot divination (Packages, 3D draw & booking)
│   │   ├── HoroscopeModal.jsx     # Full-screen 12 Rashi weekly horoscope guide
│   │   ├── PanchangModal.jsx      # Comprehensive daily Hindu calendar details
│   │   ├── NumerologyModal.jsx    # Mulank, Bhagyank & Name numerology engine
│   │   ├── AuthModal.jsx          # Client authentication & registration modal
│   │   ├── AboutModal.jsx         # Astrotanntra lineage, mission & background
│   │   └── BlogModal.jsx          # Vedic astrology articles & case studies
│   │
│   ├── utils/                     # Mathematical & Astrological Calculation Engines
│   │   ├── vedicCalculations.js   # Ephemeris, Julian Day, Lagna, D1-D10, Dasha, Doshas
│   │   ├── ashtakootMilan.js      # 8 Kootas & 36 Gunas scoring algorithms
│   │   └── numerology.js          # Digital root reduction & Chaldean name alphabet
│   │
│   └── data/                      # Static Catalogs & Structured Data
│       ├── astrologersData.js     # Verified astrologer profiles, pricing, experience
│       ├── tarotData.js           # 78 Tarot cards & priced reading packages
│       ├── horoscopeData.js       # 12 Zodiac signs with elements, lords & weekly forecasts
│       ├── panchangData.js        # Vedic calendar calculations and muhurtas
│       ├── citiesData.js          # 50+ major cities with latitudes, longitudes, timezones
│       └── blogData.js            # Editorial articles on astrological sciences
```

---

## 5. Deep Dive: File-by-File Analysis

Every file in this project has a specific role, distinct inputs, and exact output targets.

### Root Configuration Files

#### `index.html`
- **Purpose**: The main HTML5 container that serves as the single-page application shell.
- **Inputs**: Incoming HTTP request from the user's web browser.
- **Outputs**: Renders the HTML structure, preconnects Google Fonts (`Cinzel` and `Outfit`), and provides `<div id="root"></div>` for React DOM mounting.

#### `vite.config.js`
- **Purpose**: Configures the Vite development server and production bundler.
- **Inputs**: Evaluated by Vite CLI commands (`npm run dev`, `npm run build`).
- **Outputs**: Exports the Vite configuration object. Sets `base: './'` so generated asset paths are relative (allowing deployment in root domains, subfolders `/app`, or inside WordPress plugins).

#### `tailwind.config.js` & `postcss.config.js`
- **Purpose**: Defines design tokens, font families, keyframe animations (`floatSlow`, `pulseGlow`), and cosmic theme colors.
- **Inputs**: Scans all `.jsx` files in `src/`.
- **Outputs**: Compiled CSS utility classes delivered through PostCSS into `src/index.css`.

#### `.gitignore`
- **Purpose**: Excludes unnecessary and sensitive files from Git version control.
- **Inputs**: Evaluated by Git when staging files.
- **Outputs**: Ensures `node_modules/`, `dist/`, `.env`, and private SSH keys (`.ssh_key*`) are never committed to GitHub.

---

### Core Application Files (`src/`)

#### `src/main.jsx`
- **Purpose**: The JavaScript bootstrap entry point. Initializes React 18, imports global stylesheets, and mounts the application into the browser DOM.
- **Inputs**: Imports `React`, `ReactDOM`, `./App.jsx`, and `./index.css`.
- **Outputs**: Mounts the entire React component hierarchy into `document.getElementById('root')`.

#### `src/index.css`
- **Purpose**: Contains global styling rules, typography classes, cosmic gradient backgrounds, gold scrollbars, 3D flip card utility classes, and GPU hardware-accelerated scrolling (`.fast-scroll` with `transform: translateZ(0)`).
- **Inputs**: Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) and custom CSS.
- **Outputs**: Injected into the browser DOM to style all rendered components.

#### `src/App.jsx`
- **Purpose**: The **Central Nervous System** of the platform. Manages all global states and coordinates modal popups:
  - `lang`: Global language toggle (`'en'` or `'hi'`).
  - `user`: Active authenticated client profile.
  - `kundliData`: Master calculation object containing planetary degrees, ascendant, D1–D10 divisional charts, dasha periods, and doshas.
  - Modal open/close flags: `isKundliOpen`, `isMilanOpen`, `isPanchangOpen`, `isHoroscopeOpen`, `isTarotOpen`, `isConsultationOpen`, `isNumerologyOpen`, `isAuthOpen`, `isAboutOpen`, `isBlogOpen`.
- **Inputs**: User click events from navigation bars, hero buttons, and section cards.
- **Outputs**: Renders the application layout (Header, Hero, Strips, Services, Testimonials, Footer, WhatsApp Desk) and conditionally mounts the active modals.

---

### UI Components & Modals (`src/components/`)

#### `src/components/Header.jsx`
- **Purpose**: Sticky navigation header.
- **Inputs**: Receives navigation opener callback props (`onOpenKundli`, `onOpenMilan`, `onOpenHoroscope`, `onOpenPanchang`, `onOpenTarot`, `onOpenConsultation`, `onOpenAuth`, `onOpenAbout`, `onOpenBlog`) and `lang` / `setLang`.
- **Outputs**: Renders brand emblem, navigation links, mobile drawer menu, and dispatches modal open signals to `App.jsx`.

#### `src/components/Hero.jsx`
- **Purpose**: Visual hero showcase and interactive birth chart data entry form.
- **Inputs**: User input fields (Name, Gender, Date of Birth, Time of Birth, Place). Cities typed query `citiesData.js` to match exact latitude and longitude coordinates.
- **Outputs**: Submits structured birth parameters to `onGenerateKundli(formData)` in `App.jsx`, or triggers `onOpenConsultation` / `onOpenTarot`.

#### `src/components/CelestialArtwork.jsx`
- **Purpose**: Pure vector SVG graphical assets representing celestial armillary spheres, astronomical coordinate rings, and sacred Lord Ganesha emblems.
- **Inputs**: None.
- **Outputs**: Rendered inline vector artwork embedded into the Hero background.

#### `src/components/PanchangStrip.jsx`
- **Purpose**: Real-time summary strip of today's Hindu calendar Panchang.
- **Inputs**: Imports `PANCHANG_DATA`. Receives `onOpenPanchang` callback prop.
- **Outputs**: Renders horizontal ticker with Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, and Shubh Muhurta. Clicking opens `PanchangModal`.

#### `src/components/HoroscopeStrip.jsx`
- **Purpose**: Interactive carousel ribbon displaying all 12 Zodiac Rashis (Aries to Pisces).
- **Inputs**: Imports `HOROSCOPE_DATA`. Receives `onSelectSign` callback prop.
- **Outputs**: Displays sign glyphs, Sanskrit names, ruling planets, and dates. Clicking any sign dispatches `onSelectSign(sign)` to open `HoroscopeModal`.

#### `src/components/MiddleCardsSection.jsx`
- **Purpose**: 3-column feature section detailing Vedic services, Tarot packages with prices, and trust badges.
- **Inputs**: Imports `TAROT_PACKAGES`. Receives action callback props (`onOpenConsultation`, `onOpenMilan`, `onOpenNumerology`, `onOpenTarotWithPackage`, `onOpenKundli`).
- **Outputs**: Renders service cards with direct booking action buttons.

#### `src/components/Testimonials.jsx`
- **Purpose**: Client satisfaction carousel.
- **Inputs**: Real reviews array with authentic Indian character portraits (`/testimonials/priya.jpg`, `/testimonials/sunita.jpg`, etc.).
- **Outputs**: Interactive paginated review cards with star ratings and verified credentials.

#### `src/components/Footer.jsx`
- **Purpose**: Platform footer with credentials, links, and contact info.
- **Inputs**: Navigation callback props.
- **Outputs**: Displays copyright, ISO certification notice, quick links, contact info (+91 99930 27943), newsletter subscription form, and verified social links (**Facebook**, **Instagram**, **YouTube**).

#### `src/components/WhatsAppButton.jsx`
- **Purpose**: Floating live assistance desk in bottom-right corner.
- **Inputs**: User click events and query inputs in the popover form.
- **Outputs**: Toggles online chat desk with preset questions and opens WhatsApp Web/App directed to `+91 99930 27943`.

#### `src/components/KundliModal.jsx`
- **Purpose**: Deep Vedic birth chart exploration center.
- **Inputs**: Prop `kundliData` (computed by `vedicCalculations.js`), `onClose`, `lang`.
- **Outputs**: Renders 5 detailed tabs:
  1. Chart visualizer (North/South Indian toggle with D1 to D10 divisional charts).
  2. Planetary details table (9 planets + Lagna degrees, nakshatras, padas, retrogrades).
  3. Vimshottari Mahadasha timeline.
  4. Manglik Dosha severity & Sade Sati analysis.
  5. Ashtakavarga house points.
  6. Action button to download the 12-page research PDF guide.

#### `src/components/NorthIndianChart.jsx`
- **Purpose**: Renders traditional North Indian diamond birth chart using SVG geometry.
- **Inputs**: Prop `chartData` (object with 12 houses containing signs and occupant planets).
- **Outputs**: Scalable SVG diamond diagram showing houses 1 through 12, rising Ascendant, and planetary positions.

#### `src/components/SouthIndianChart.jsx`
- **Purpose**: Renders traditional South Indian rectangular box chart.
- **Inputs**: Prop `chartData`.
- **Outputs**: Scalable SVG rectangular grid showing fixed zodiac signs clockwise from Pisces, with Lagna marker and planetary positions.

#### `src/components/KundliMilanModal.jsx`
- **Purpose**: Marriage compatibility and Guna Milan calculator.
- **Inputs**: Birth details for Boy and Girl.
- **Outputs**: Calculates all 8 Kootas (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi), tallies score out of 36, flags doshas, and displays marriage recommendation.

#### `src/components/ConsultationModal.jsx`
- **Purpose**: 3-step consultation booking and payment checkout system.
- **Inputs**: Prop `initialTopic`, `onClose`, `lang`. User selections for Astrologer, consultation mode, date, slot, and payment method.
- **Outputs**:
  - **Step 1**: Astrologer selection (authentic Indian portraits), mode (Audio, Video, Chat), interactive calendar date selection, categorized time slots (Morning, Afternoon, Evening), client details.
  - **Step 2**: Payment checkout with bill breakdown, coupon code (`ASTROFIRST`), UPI/QR Code with dynamic QR code & VPA verify, Credit/Debit card form, Net Banking selector, and Pay Later option.
  - **Step 3**: Confirmation screen with Booking Reference ID, Meeting PIN, confetti celebration, and direct WhatsApp connect.

#### `src/components/TarotReaderModal.jsx`
- **Purpose**: Complete Tarot divination interface.
- **Inputs**: Prop `initialPackage`, `onClose`, `onOpenConsultation`, `lang`.
- **Outputs**:
  - **Pricing View**: 7 reading packages with prices in INR (₹) and USD ($), card count badges, descriptions, and dual action buttons: \"Draw Cards\" and \"Book Live\".
  - **Interactive 3D Deck**: Shuffles deck, allows user to click cards to reveal 3D flips, and provides upright meanings with Love, Career, and Finance insights.
  - **Book Live Session**: Schedules video/audio session with Tarot Grandmasters.

#### `src/components/HoroscopeModal.jsx`
- **Purpose**: In-depth weekly horoscope reading for any selected Zodiac sign.
- **Inputs**: Prop `sign` (from `HOROSCOPE_DATA`), `onClose`, `lang`.
- **Outputs**: Displays sign element, ruling planet, lucky colors, and forecasts for Love, Career, Health, and Finance.

#### `src/components/PanchangModal.jsx`
- **Purpose**: Comprehensive daily Hindu calendar modal.
- **Inputs**: Prop `onClose`, `lang`.
- **Outputs**: Displays detailed tables for Tithi, Vaar, Nakshatra, Yoga, Karana, Sunrise, Sunset, Abhijit Muhurta, Rahu Kaal, and Yamaganda.

#### `src/components/NumerologyModal.jsx`
- **Purpose**: Calculates Mulank (Driver Number), Bhagyank (Conductor Number), and Chaldean Name Number.
- **Inputs**: Name and Date of Birth inputs.
- **Outputs**: Personality analysis, ruling planets, lucky gemstones, and career paths.

#### `src/components/AuthModal.jsx`, `AboutModal.jsx`, `BlogModal.jsx`
- **Purpose**:
  - `AuthModal`: User login, registration, and session initialization.
  - `AboutModal`: Astrotanntra Vedic research heritage and Acharya background.
  - `BlogModal`: Reading interface for astrological science articles and planetary transits.
- **Inputs**: Modal opener callbacks and form inputs.
- **Outputs**: Authenticated session state or informative reading views.

---

### Mathematical & Astrological Engines (`src/utils/`)

#### `src/utils/vedicCalculations.js`
- **Purpose**: The pure mathematical calculation engine of the platform. Implements astronomical equations and classical Parashara Jyotish rules:
  - **Julian Day Calculation**: `toJulianDay(year, month, day, hour, tz)` converts Gregorian dates and time to the Astronomical Julian Day Number.
  - **Lahiri Ayanamsha (Chitra Paksha)**: `calculateAyanamsha(jd)` computes the exact degree offset between the tropical and sidereal zodiacs.
  - **Planetary Longitudes**: Computes sidereal longitudes for Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu.
  - **Ascendant (Lagna)**: Computes Local Sidereal Time (LST) and calculates the exact rising degree on the Eastern horizon based on geographical latitude and longitude.
  - **Divisional Charts Engine (D1 to D10)**:
    - **D1 (Rashi)**: Fundamental birth chart ($30^\circ$ per sign).
    - **D2 (Hora)**: Wealth & resources ($15^\circ$ per division, ruled by Sun/Moon).
    - **D3 (Drekkana)**: Siblings, courage & energy ($10^\circ$ per division).
    - **D4 (Chaturthamsa)**: Property, home, fixed assets & fortune ($7^\circ 30'$ per division).
    - **D7 (Saptamsa)**: Children, progeny, creativity & legacy ($4^\circ 17' 08.57\"$ per division).
    - **D9 (Navamsha)**: Marriage, dharma, soul destiny & inner potential ($3^\circ 20'$ per division).
    - **D10 (Dashamsha)**: Career, profession, fame, leadership & public standing ($3^\circ$ per division).
  - **Vimshottari Dasha Engine**: Identifies birth Nakshatra from Moon's longitude, calculates balance of birth Mahadasha, and timelines the 120-year planetary dasha sequence.
  - **Doshas & Yogas**: Evaluates Manglik Dosha (Mars in houses 1, 4, 7, 8, 12) with cancellation checks, and tracks Saturn's 7.5-year Sade Sati phase.
- **Inputs**: Form submission object: `{ name, dob, tob, place, gender, lat, lng, tz }`.
- **Outputs**: Master calculation object `kundliData` used by `KundliModal`, `NorthIndianChart`, and `SouthIndianChart`.

#### `src/utils/ashtakootMilan.js`
- **Purpose**: Implements classical 8-fold marriage compatibility scoring:
  - Varna Koota (1 point) — Spiritual ego & class compatibility.
  - Vashya Koota (2 points) — Mutual attraction and dominance.
  - Tara Koota (3 points) — Health, destiny, and longevity.
  - Yoni Koota (4 points) — Biological and physical compatibility.
  - Graha Maitri (5 points) — Mental harmony and planetary lord friendship.
  - Gana Koota (6 points) — Temperament compatibility (Deva, Manushya, Rakshasa).
  - Bhakoot Koota (7 points) — Emotional happiness and financial prosperity.
  - Nadi Koota (8 points) — Genetic compatibility and progeny vitality.
- **Inputs**: Boy's Moon Sign & Nakshatra, Girl's Moon Sign & Nakshatra.
- **Outputs**: Compatibility score out of 36 points, dosha flags (Nadi Dosha / Bhakoot Dosha), and marital verdict.

#### `src/utils/numerology.js`
- **Purpose**: Calculates digital root reductions for birth dates and name vibrations using the ancient Chaldean alphabet numbering system.
- **Inputs**: Full Name string and Date of Birth string.
- **Outputs**: Mulank (Driver), Bhagyank (Conductor), Name number, personality traits, and compatible partner numbers.

---

### Data Catalogs (`src/data/`)

#### `src/data/astrologersData.js`
- **Purpose**: Verified catalog of certified Indian Vedic Astrologers and Acharyas (Acharya Devendra Shastri, Dr. Ananya Mukherjee, Pandit Rajesh Vashistha, Meera Sen) with ratings, experience, languages, specialties, local Indian portrait paths, and rates.
- **Inputs**: Static database array.
- **Outputs**: Imported by `ConsultationModal.jsx` to render astrologer cards.

#### `src/data/tarotData.js`
- **Purpose**: Complete dataset of the 78-card Major Arcana deck with symbols, keywords, upright/reversed meanings, love, career, and finance insights. Also exports `TAROT_PACKAGES` defining all 7 reading tiers with pricing in ₹ and $.
- **Inputs**: Static database array.
- **Outputs**: Imported by `TarotReaderModal.jsx` and `MiddleCardsSection.jsx`.

#### `src/data/horoscopeData.js`
- **Purpose**: Detailed dataset for all 12 Zodiac signs: Sanskrit names, dates, ruling planets, elements, lucky numbers, and weekly predictions.
- **Inputs**: Static database array.
- **Outputs**: Imported by `HoroscopeStrip.jsx` and `HoroscopeModal.jsx`.

#### `src/data/panchangData.js`
- **Purpose**: Calendar calculations for Tithi, Vaar, Nakshatra, Yoga, Karana, and auspicious/inauspicious muhurtas.
- **Inputs**: Static database array.
- **Outputs**: Imported by `PanchangStrip.jsx` and `PanchangModal.jsx`.

#### `src/data/citiesData.js`
- **Purpose**: Coordinates database of 50+ major Indian and international cities (New Delhi, Mumbai, Bengaluru, Kolkata, Chennai, Tezpur, Guwahati, London, New York, etc.) with pre-configured latitude, longitude, and timezone offsets.
- **Inputs**: Static database array.
- **Outputs**: Powers the live city auto-complete input in `Hero.jsx`.

#### `src/data/blogData.js`
- **Purpose**: Educational library of Vedic astrology articles and planetary transit insights.
- **Inputs**: Static database array.
- **Outputs**: Imported by `BlogModal.jsx`.

---

### Public Assets (`public/`)

#### `public/astrologers/`
- **Purpose**: High-definition, optimized circular portraits of Indian Vedic Astrologers:
  - `acharya_devendra.jpg`: Senior Acharya in saffron kurta with sandalwood tilak & rudraksha.
  - `dr_ananya.jpg`: Celebrity Astrologer in traditional maroon silk saree with bindi.
  - `pandit_rajesh.jpg`: Pandit in cream silk kurta with angavastram & Janam Kundli charts.
  - `meera_sen.jpg`: Tarot mystic in peacock blue ethnic attire.
- **Outputs**: Served directly by Vite at `/astrologers/<filename>.jpg`.

#### `public/testimonials/`
- **Purpose**: Optimized client review portraits (`priya.jpg`, `sunita.jpg`).
- **Outputs**: Displayed in `Testimonials.jsx`.

---

## 6. Detailed Working Features Guide

Here is a functional breakdown of what every feature on the live website actually does:

### 1. Real-Time Kundli Generator & Divisional Charts (D1 to D10)
- **How to trigger**: On the Hero section, fill in Name, Gender, Date of Birth, Time of Birth, and City (e.g. *Tezpur, Assam*), then click **\"Get Your Kundli\"**.
- **What it does**:
  1. Instantly queries `citiesData.js` for exact geographical coordinates (Latitude & Longitude).
  2. Converts date and time to Julian Day and computes Lahiri Ayanamsha.
  3. Calculates the exact rising Ascendant (Lagna) and sidereal positions for all 9 Vedic planets.
  4. Triggers a celebratory confetti effect and opens `KundliModal`.
  5. Users can toggle between **North Indian (Diamond)** and **South Indian (Box)** charts.
  6. Users can switch between **D1 (Rashi), D2 (Hora), D3 (Drekkana), D4 (Chaturthamsa), D7 (Saptamsa), D9 (Navamsha), and D10 (Dashamsha)** charts.
  7. Displays Vimshottari Mahadasha balance, Manglik Dosha severity, Sade Sati phase, and allows downloading the complete 12-page calculation guide PDF.

### 2. Kundli Milan / 36-Guna Matchmaking
- **How to trigger**: Click **\"Kundali Matching\"** on the middle services card or navigation bar.
- **What it does**:
  - Prompts for both Boy and Girl birth dates, times, and places.
  - Calculates Moon sign and Nakshatra for both partners.
  - Computes all 8 Kootas: Varna (1), Vashya (2), Tara (3), Yoni (4), Graha Maitri (5), Gana (6), Bhakoot (7), and Nadi (8).
  - Tallies score out of 36 (e.g., 28/36 = *Excellent Match*), checks Nadi Dosha, and displays compatibility verdict.

### 3. Book Vedic Consultation (Calendar, Time Slots & Payment Checkout)
- **How to trigger**: Click **\"Book Vedic Consultation\"** in the Hero section or header.
- **What it does**:
  - **Step 1 (Schedule)**: Select your verified Indian Acharya, pick consultation mode (**Audio Call**, **Video Call**, or **Live Chat**), choose a date from an interactive calendar (next 7 days quick chips or custom calendar date), select a categorized time slot (Morning: 09:30 AM–11:45 AM, Afternoon: 02:00 PM–04:30 PM, Evening: 06:00 PM–09:00 PM), and enter client details.
  - **Step 2 (Payment Options)**: Summarizes the appointment, displays a fee breakdown, applies welcome discount (`ASTROFIRST`), and allows selecting payment via:
    - **UPI / QR Code**: Interactive dynamic Astrotanntra QR code with instant Google Pay / PhonePe / Paytm / BHIM buttons and VPA verify.
    - **Credit / Debit Cards**: Card number, expiry, CVV form.
    - **Net Banking**: HDFC, ICICI, SBI, Axis, Kotak, PNB.
    - **Pay After Consultation**: 100% satisfaction guarantee to pay post-session.
  - **Step 3 (Confirmation Receipt)**: Triggers confetti, displays unique Booking Reference ID (`ASTRO-XXXXXX`), Meeting PIN, and a one-click **\"Connect on WhatsApp Now\"** button.

### 4. Tarot Card Reading & Pricing (Interactive 3D Deck & Live Sessions)
- **How to trigger**: Click **\"Book Tarot Reading\"** in the Hero section or Tarot in the menu.
- **What it does**:
  - **Card Readings & Prices View**: Displays 7 distinct reading packages with prices in INR (₹) and USD ($):
    - One Card Quick Guidance: ₹499 ($6)
    - Three Card Spread (Past, Present, Future): ₹999 ($12)
    - Love & Relationship Reading: ₹1,499 ($18)
    - Career & Business Growth: ₹1,499 ($18)
    - Wealth & Financial Destiny: ₹1,499 ($18)
    - Celtic Cross Deep Soul Spread: ₹1,999 ($24)
    - Annual 12-Month Year Ahead Forecast: ₹2,499 ($30)
  - **Interactive 3D Card Draw**: Shuffles the deck, allows user to click cards to flip them in 3D, and displays upright meanings along with specific insights for Love, Career, and Finance.
  - **Book Live Session**: Connects directly with Tarot Grandmasters.

### 5. Daily Vedic Panchang
- **How to trigger**: Click anywhere on the glowing Panchang strip below the Hero.
- **What it does**: Displays today's Tithi, Vaar (Weekday), Nakshatra, Yoga, Karana, Sunrise, Sunset, auspicious Abhijit Muhurta, and inauspicious Rahu Kaal periods.

### 6. 12 Rashi Horoscope Forecasts
- **How to trigger**: Click any Zodiac symbol on the Horoscope strip below the Panchang.
- **What it does**: Opens `HoroscopeModal` showing that sign's ruling planet, element, lucky color, lucky number, and weekly predictions across Love, Career, Health, and Finance.

### 7. Life Path & Name Numerology
- **How to trigger**: Click **\"Numerology\"** in the services grid.
- **What it does**: Calculates your Mulank (Driver Number) and Bhagyank (Conductor Number) from your birth date, and computes your Chaldean Name Number from your name. Displays personality traits, compatible partner numbers, and lucky gemstones.

### 8. Live Astrologer WhatsApp Desk
- **How to trigger**: Click the floating green WhatsApp button in the bottom-right corner.
- **What it does**: Features a pulsing online indicator. Clicking opens a live desk popover with preset questions (*\"When will I get a job?\"*, *\"Kundli matching for marriage\"*, *\"Sade Sati analysis\"*) and a direct link to chat with senior astrologers on WhatsApp at `+91 99930 27943`.

### 9. Multilingual Support (English & Hindi)
- **How to trigger**: Click the **\"English / हिंदी\"** toggle in the top-right corner of the header.
- **What it does**: Instantly toggles the interface text, headings, badges, and astrological guidance between English and authentic Hindi (Devanagari script) across the entire application without page reloads.

---

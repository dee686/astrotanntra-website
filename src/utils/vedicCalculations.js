// Vedic Astrology Calculations Engine
// Implements Lahiri Ayanamsha, Ascendant (Lagna), Planetary Longitudes,
// Nakshatras, Bhavas, Vimshottari Dasha, Manglik Dosha, Kaal Sarp Dosha,
// and Complete Divisional Charts (D-1 through D-10) + Panchang Chart.

export const ZODIAC_SIGNS = [
  { id: 1, name: 'Aries', sanskrit: 'Mesha', lord: 'Mars', element: 'Fire', symbol: '♈' },
  { id: 2, name: 'Taurus', sanskrit: 'Vrishabha', lord: 'Venus', element: 'Earth', symbol: '♉' },
  { id: 3, name: 'Gemini', sanskrit: 'Mithuna', lord: 'Mercury', element: 'Air', symbol: '♊' },
  { id: 4, name: 'Cancer', sanskrit: 'Karka', lord: 'Moon', element: 'Water', symbol: '♋' },
  { id: 5, name: 'Leo', sanskrit: 'Simha', lord: 'Sun', element: 'Fire', symbol: '♌' },
  { id: 6, name: 'Virgo', sanskrit: 'Kanya', lord: 'Mercury', element: 'Earth', symbol: '♍' },
  { id: 7, name: 'Libra', sanskrit: 'Tula', lord: 'Venus', element: 'Air', symbol: '♎' },
  { id: 8, name: 'Scorpio', sanskrit: 'Vrishchika', lord: 'Mars', element: 'Water', symbol: '♏' },
  { id: 9, name: 'Sagittarius', sanskrit: 'Dhanu', lord: 'Jupiter', element: 'Fire', symbol: '♐' },
  { id: 10, name: 'Capricorn', sanskrit: 'Makara', lord: 'Saturn', element: 'Earth', symbol: '♑' },
  { id: 11, name: 'Aquarius', sanskrit: 'Kumbha', lord: 'Saturn', element: 'Air', symbol: '♒' },
  { id: 12, name: 'Pisces', sanskrit: 'Meena', lord: 'Jupiter', element: 'Water', symbol: '♓' }
];

export const NAKSHATRAS = [
  { id: 1, name: 'Ashwini', lord: 'Ketu', deity: 'Ashwini Kumaras', varna: 'Vaishya', vashya: 'Chatushpada', yoni: 'Ashwa (Horse)', gana: 'Deva', nadi: 'Adi' },
  { id: 2, name: 'Bharani', lord: 'Venus', deity: 'Yama', varna: 'Mleccha', vashya: 'Manava', yoni: 'Gaja (Elephant)', gana: 'Manushya', nadi: 'Madhya' },
  { id: 3, name: 'Krittika', lord: 'Sun', deity: 'Agni', varna: 'Brahmin', vashya: 'Chatushpada', yoni: 'Mesha (Sheep)', gana: 'Rakshasa', nadi: 'Antya' },
  { id: 4, name: 'Rohini', lord: 'Moon', deity: 'Brahma', varna: 'Shudra', vashya: 'Chatushpada', yoni: 'Sarpa (Serpent)', gana: 'Manushya', nadi: 'Antya' },
  { id: 5, name: 'Mrigashira', lord: 'Mars', deity: 'Soma', varna: 'Vaishya', vashya: 'Chatushpada', yoni: 'Sarpa (Serpent)', gana: 'Deva', nadi: 'Madhya' },
  { id: 6, name: 'Ardra', lord: 'Rahu', deity: 'Rudra', varna: 'Kshatriya', vashya: 'Manava', yoni: 'Shwan (Dog)', gana: 'Manushya', nadi: 'Adi' },
  { id: 7, name: 'Punarvasu', lord: 'Jupiter', deity: 'Aditi', varna: 'Vaishya', vashya: 'Manava', yoni: 'Marjara (Cat)', gana: 'Deva', nadi: 'Adi' },
  { id: 8, name: 'Pushya', lord: 'Saturn', deity: 'Brihaspati', varna: 'Kshatriya', vashya: 'Jalachara', yoni: 'Mesha (Sheep)', gana: 'Deva', nadi: 'Madhya' },
  { id: 9, name: 'Ashlesha', lord: 'Mercury', deity: 'Nagas', varna: 'Mleccha', vashya: 'Jalachara', yoni: 'Marjara (Cat)', gana: 'Rakshasa', nadi: 'Antya' },
  { id: 10, name: 'Magha', lord: 'Ketu', deity: 'Pitris', varna: 'Shudra', vashya: 'Chatushpada', yoni: 'Mushaka (Rat)', gana: 'Rakshasa', nadi: 'Antya' },
  { id: 11, name: 'Purva Phalguni', lord: 'Venus', deity: 'Bhaga', varna: 'Brahmin', vashya: 'Chatushpada', yoni: 'Mushaka (Rat)', gana: 'Manushya', nadi: 'Madhya' },
  { id: 12, name: 'Uttara Phalguni', lord: 'Sun', deity: 'Aryaman', varna: 'Kshatriya', vashya: 'Chatushpada', yoni: 'Gau (Cow)', gana: 'Manushya', nadi: 'Adi' },
  { id: 13, name: 'Hasta', lord: 'Moon', deity: 'Savitr', varna: 'Vaishya', vashya: 'Manava', yoni: 'Mahisha (Buffalo)', gana: 'Deva', nadi: 'Adi' },
  { id: 14, name: 'Chitra', lord: 'Mars', deity: 'Vishwakarma', varna: 'Mleccha', vashya: 'Manava', yoni: 'Vyaghra (Tiger)', gana: 'Rakshasa', nadi: 'Madhya' },
  { id: 15, name: 'Swati', lord: 'Rahu', deity: 'Vayu', varna: 'Shudra', vashya: 'Manava', yoni: 'Mahisha (Buffalo)', gana: 'Deva', nadi: 'Antya' },
  { id: 16, name: 'Vishakha', lord: 'Jupiter', deity: 'Indragni', varna: 'Brahmin', vashya: 'Manava', yoni: 'Vyaghra (Tiger)', gana: 'Rakshasa', nadi: 'Antya' },
  { id: 17, name: 'Anuradha', lord: 'Saturn', deity: 'Mitra', varna: 'Kshatriya', vashya: 'Keeta', yoni: 'Mriga (Deer)', gana: 'Deva', nadi: 'Madhya' },
  { id: 18, name: 'Jyeshtha', lord: 'Mercury', deity: 'Indra', varna: 'Vaishya', vashya: 'Keeta', yoni: 'Mriga (Deer)', gana: 'Rakshasa', nadi: 'Adi' },
  { id: 19, name: 'Mula', lord: 'Ketu', deity: 'Nirriti', varna: 'Mleccha', vashya: 'Chatushpada', yoni: 'Shwan (Dog)', gana: 'Rakshasa', nadi: 'Adi' },
  { id: 20, name: 'Purva Ashadha', lord: 'Venus', deity: 'Apas', varna: 'Brahmin', vashya: 'Chatushpada', yoni: 'Vanara (Monkey)', gana: 'Manushya', nadi: 'Madhya' },
  { id: 21, name: 'Uttara Ashadha', lord: 'Sun', deity: 'Vishvadevas', varna: 'Kshatriya', vashya: 'Chatushpada', yoni: 'Nakula (Mongoose)', gana: 'Manushya', nadi: 'Antya' },
  { id: 22, name: 'Shravana', lord: 'Moon', deity: 'Vishnu', varna: 'Vaishya', vashya: 'Jalachara', yoni: 'Vanara (Monkey)', gana: 'Deva', nadi: 'Antya' },
  { id: 23, name: 'Dhanishta', lord: 'Mars', deity: 'Vasus', varna: 'Shudra', vashya: 'Jalachara', yoni: 'Simha (Lion)', gana: 'Rakshasa', nadi: 'Madhya' },
  { id: 24, name: 'Shatabhisha', lord: 'Rahu', deity: 'Varuna', varna: 'Mleccha', vashya: 'Manava', yoni: 'Ashwa (Horse)', gana: 'Rakshasa', nadi: 'Adi' },
  { id: 25, name: 'Purva Bhadrapada', lord: 'Jupiter', deity: 'Aja Ekapada', varna: 'Brahmin', vashya: 'Manava', yoni: 'Simha (Lion)', gana: 'Manushya', nadi: 'Adi' },
  { id: 26, name: 'Uttara Bhadrapada', lord: 'Saturn', deity: 'Ahirbudhnya', varna: 'Kshatriya', vashya: 'Jalachara', yoni: 'Gau (Cow)', gana: 'Manushya', nadi: 'Madhya' },
  { id: 27, name: 'Revati', lord: 'Mercury', deity: 'Pushan', varna: 'Shudra', vashya: 'Jalachara', yoni: 'Gaja (Elephant)', gana: 'Deva', nadi: 'Antya' }
];

export const DASHA_ORDER = [
  { lord: 'Ketu', years: 7 },
  { lord: 'Venus', years: 20 },
  { lord: 'Sun', years: 6 },
  { lord: 'Moon', years: 10 },
  { lord: 'Mars', years: 7 },
  { lord: 'Rahu', years: 18 },
  { lord: 'Jupiter', years: 16 },
  { lord: 'Saturn', years: 19 },
  { lord: 'Mercury', years: 17 }
];

// Meta information for all Divisional Charts
export const DIVISIONAL_CHARTS_META = [
  { id: 'D1', name: 'Rashi', title: 'D-1 (Rashi Chart)', focus: 'Physical body, personality, general life blueprint' },
  { id: 'D2', name: 'Hora', title: 'D-2 (Hora Chart)', focus: 'Wealth, liquid assets, financial prosperity' },
  { id: 'D3', name: 'Drekkana', title: 'D-3 (Drekkana Chart)', focus: 'Siblings, courage, vitality, initiatives' },
  { id: 'D4', name: 'Chaturthamsha', title: 'D-4 (Chaturthamsha)', focus: "Fixed assets, property, home, mother's happiness" },
  { id: 'D5', name: 'Panchamsha', title: 'D-5 (Panchamsha)', focus: 'Spiritual inclination, higher wisdom, fame' },
  { id: 'D6', name: 'Shashthamsha', title: 'D-6 (Shashthamsha)', focus: 'Health, litigation, debts, enemies & service' },
  { id: 'D7', name: 'Saptamsha', title: 'D-7 (Saptamsha)', focus: 'Children, progeny, lineage, creative output' },
  { id: 'D8', name: 'Ashtamsha', title: 'D-8 (Ashtamsha)', focus: 'Longevity, occult, transformations, sudden events' },
  { id: 'D9', name: 'Navamsha', title: 'D-9 (Navamsha)', focus: 'Marriage, spouse, dharma, inner planetary strength' },
  { id: 'D10', name: 'Dashamsha', title: 'D-10 (Dashamsha)', focus: 'Career, profession, status, public reputation' },
  { id: 'PANCHANG', name: 'Janma Panchang', title: 'Panchang Tatva Chart', focus: 'Five Cosmic Elements (Pancha Mahabhuta) at birth' }
];

// Calculate Julian Day
function getJulianDay(year, month, day, decimalHours) {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
  return jd + decimalHours / 24.0;
}

// Lahiri Ayanamsha approximation
function getLahiriAyanamsha(year, jd) {
  const t = (jd - 2451545.0) / 36525.0;
  return 23.856 + 1.396 * t;
}

// Normalize angle to [0, 360)
function normalizeDeg(deg) {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

// Convert degree to sign and degree within sign
export function degToSign(degrees) {
  const norm = normalizeDeg(degrees);
  const signIndex = Math.floor(norm / 30);
  const degInSign = norm % 30;
  const mins = Math.floor((degInSign - Math.floor(degInSign)) * 60);
  const secs = Math.floor((((degInSign - Math.floor(degInSign)) * 60) - mins) * 60);
  return {
    signIndex: signIndex + 1,
    sign: ZODIAC_SIGNS[signIndex],
    degInSign,
    degFormatted: `${Math.floor(degInSign)}° ${mins}' ${secs}"`
  };
}

// Calculate Nakshatra from Nirayana longitude (0 - 360)
export function getNakshatra(longitude) {
  const norm = normalizeDeg(longitude);
  const nakDegree = 360 / 27; // 13.33333°
  const index = Math.floor(norm / nakDegree);
  const degreeInNak = norm % nakDegree;
  const pada = Math.floor(degreeInNak / (nakDegree / 4)) + 1;
  const fractionElapsed = degreeInNak / nakDegree;

  return {
    nakshatra: NAKSHATRAS[index],
    pada,
    degreeInNak,
    fractionElapsed
  };
}

// Compute Vedic Divisional Sign (Varga Sign 1..12) based on Classical Parashari Rules
export function calculateDivisionalSign(division, longitude) {
  const norm = normalizeDeg(longitude);
  const rashi = Math.floor(norm / 30) + 1; // 1 to 12
  const degInSign = norm % 30;

  switch (division) {
    case 'D1':
      return rashi;

    case 'D2': {
      // Hora (2 parts of 15° each)
      // Odd sign: 0-15 Sun (Leo 5), 15-30 Moon (Cancer 4)
      // Even sign: 0-15 Moon (Cancer 4), 15-30 Sun (Leo 5)
      const isOdd = rashi % 2 !== 0;
      if (isOdd) {
        return degInSign < 15 ? 5 : 4;
      } else {
        return degInSign < 15 ? 4 : 5;
      }
    }

    case 'D3': {
      // Drekkana (3 parts of 10° each)
      // Part 0: Same sign, Part 1: 5th sign from it, Part 2: 9th sign from it
      const part = Math.floor(degInSign / 10);
      if (part === 0) return rashi;
      if (part === 1) return ((rashi + 4 - 1) % 12) + 1;
      return ((rashi + 8 - 1) % 12) + 1;
    }

    case 'D4': {
      // Chaturthamsha (4 parts of 7.5° each)
      // 1st, 4th, 7th, 10th from sign
      const part = Math.floor(degInSign / 7.5);
      return ((rashi + part * 3 - 1) % 12) + 1;
    }

    case 'D5': {
      // Panchamsha (5 parts of 6° each)
      const part = Math.floor(degInSign / 6);
      const isOdd = rashi % 2 !== 0;
      const oddSeq = [1, 11, 9, 3, 7]; // Aries, Aquarius, Sagittarius, Gemini, Libra
      const evenSeq = [2, 6, 12, 10, 4]; // Taurus, Virgo, Pisces, Capricorn, Cancer
      return isOdd ? oddSeq[part % 5] : evenSeq[part % 5];
    }

    case 'D6': {
      // Shashthamsha (6 parts of 5° each)
      // Odd sign: starts from Aries (1)
      // Even sign: starts from Libra (7)
      const part = Math.floor(degInSign / 5);
      const isOdd = rashi % 2 !== 0;
      const start = isOdd ? 1 : 7;
      return ((start + part - 1) % 12) + 1;
    }

    case 'D7': {
      // Saptamsha (7 parts of 4.2857° each)
      // Odd sign: starts from own sign
      // Even sign: starts from 7th from it
      const part = Math.floor(degInSign / (30 / 7));
      const isOdd = rashi % 2 !== 0;
      const start = isOdd ? rashi : ((rashi + 6 - 1) % 12 + 1);
      return ((start + part - 1) % 12) + 1;
    }

    case 'D8': {
      // Ashtamsha (8 parts of 3.75° each)
      // Movable (1,4,7,10): start from Aries (1)
      // Fixed (2,5,8,11): start from Sagittarius (9)
      // Dual (3,6,9,12): start from Leo (5)
      const part = Math.floor(degInSign / 3.75);
      let start = 1;
      if ([1, 4, 7, 10].includes(rashi)) start = 1;
      else if ([2, 5, 8, 11].includes(rashi)) start = 9;
      else start = 5;
      return ((start + part - 1) % 12) + 1;
    }

    case 'D9': {
      // Navamsha (9 parts of 3°20' each)
      // Fire (1,5,9): start from Aries (1)
      // Earth (2,6,10): start from Capricorn (10)
      // Air (3,7,11): start from Libra (7)
      // Water (4,8,12): start from Cancer (4)
      const part = Math.floor(degInSign / (30 / 9));
      let start = 1;
      if ([1, 5, 9].includes(rashi)) start = 1;
      else if ([2, 6, 10].includes(rashi)) start = 10;
      else if ([3, 7, 11].includes(rashi)) start = 7;
      else start = 4;
      return ((start + part - 1) % 12) + 1;
    }

    case 'D10': {
      // Dashamsha (10 parts of 3° each)
      // Odd sign: starts from own sign
      // Even sign: starts from 9th from it
      const part = Math.floor(degInSign / 3);
      const isOdd = rashi % 2 !== 0;
      const start = isOdd ? rashi : ((rashi + 8 - 1) % 12 + 1);
      return ((start + part - 1) % 12) + 1;
    }

    default:
      return rashi;
  }
}

// Generate Complete Kundli Data & All Divisional Charts
export function calculateKundli({ name, dob, tob, place, gender, lat = 28.6139, lng = 77.2090, tz = 5.5 }) {
  const [yearStr, monthStr, dayStr] = dob.split('-');
  const year = parseInt(yearStr, 10) || 1995;
  const month = parseInt(monthStr, 10) || 1;
  const day = parseInt(dayStr, 10) || 1;

  const [hourStr, minStr] = (tob || '12:00').split(':');
  const hour = parseInt(hourStr, 10) || 12;
  const min = parseInt(minStr, 10) || 0;

  // Local decimal hours converted to UT
  const decimalHour = hour + min / 60.0;
  const utDecimalHour = decimalHour - tz;
  const jd = getJulianDay(year, month, day, utDecimalHour);
  const ayanamsha = getLahiriAyanamsha(year, jd);

  // Greenwich Mean Sidereal Time (GMST)
  const d = jd - 2451545.0;
  let gmst = 280.46061837 + 360.98564736629 * d;
  gmst = normalizeDeg(gmst);

  // Local Sidereal Time (LST)
  const lst = normalizeDeg(gmst + lng);
  const lstRad = (lst * Math.PI) / 180;
  const epsRad = (23.43929 * Math.PI) / 180; // Obliquity of ecliptic
  const latRad = (lat * Math.PI) / 180;

  // Ascendant (Lagna) in Sayana then Nirayana
  const tanAsc = Math.atan2(
    Math.cos(lstRad),
    -Math.sin(lstRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad)
  );
  let sayanaAscDeg = (tanAsc * 180) / Math.PI + 90;
  let nirayanaAscDeg = normalizeDeg(sayanaAscDeg - ayanamsha);

  // Planetary Longitudes (Nirayana)
  const n = jd - 2451545.0;
  const L_sun = normalizeDeg(280.46646 + 0.9856474 * n);
  const g_sun = normalizeDeg(357.52911 + 0.9856003 * n) * (Math.PI / 180);
  const sayanaSun = normalizeDeg(L_sun + 1.914602 * Math.sin(g_sun) + 0.019993 * Math.sin(2 * g_sun));
  const sunDeg = normalizeDeg(sayanaSun - ayanamsha);

  const L_moon = normalizeDeg(218.316 + 13.176396 * n);
  const M_moon = normalizeDeg(134.963 + 13.064993 * n) * (Math.PI / 180);
  const sayanaMoon = normalizeDeg(L_moon + 6.289 * Math.sin(M_moon));
  const moonDeg = normalizeDeg(sayanaMoon - ayanamsha);

  const marsDeg = normalizeDeg(355.43 + 0.524033 * n + 2.5 * Math.sin((355.43 + 0.524033 * n) * Math.PI / 180) - ayanamsha);
  const mercDeg = normalizeDeg(sunDeg + 12 * Math.sin((n * 4.09) * Math.PI / 180));
  const jupDeg = normalizeDeg(34.35 + 0.083085 * n - ayanamsha);
  const venDeg = normalizeDeg(sunDeg + 22 * Math.sin((n * 1.6) * Math.PI / 180));
  const satDeg = normalizeDeg(50.07 + 0.033444 * n - ayanamsha);
  const rahuDeg = normalizeDeg(125.04 - 0.05295 * n - ayanamsha);
  const ketuDeg = normalizeDeg(rahuDeg + 180);

  const ascSignInfo = degToSign(nirayanaAscDeg);
  const ascSignIndex = ascSignInfo.signIndex; // 1 to 12

  function getHouse(planetDeg) {
    const pSignIndex = degToSign(planetDeg).signIndex;
    let house = pSignIndex - ascSignIndex + 1;
    if (house <= 0) house += 12;
    return house;
  }

  const rawPlanets = [
    { name: 'Ascendant', code: 'Asc', deg: nirayanaAscDeg, speed: 0, isRetro: false, deity: 'Self / Lagna' },
    { name: 'Sun', code: 'Su', deg: sunDeg, speed: 1.0, isRetro: false, deity: 'Surya' },
    { name: 'Moon', code: 'Mo', deg: moonDeg, speed: 13.2, isRetro: false, deity: 'Chandra' },
    { name: 'Mars', code: 'Ma', deg: marsDeg, speed: 0.5, isRetro: (marsDeg % 30 < 5), deity: 'Mangal' },
    { name: 'Mercury', code: 'Me', deg: mercDeg, speed: 1.2, isRetro: (mercDeg % 30 > 25), deity: 'Budha' },
    { name: 'Jupiter', code: 'Ju', deg: jupDeg, speed: 0.08, isRetro: false, deity: 'Guru' },
    { name: 'Venus', code: 'Ve', deg: venDeg, speed: 1.1, isRetro: false, deity: 'Shukra' },
    { name: 'Saturn', code: 'Sa', deg: satDeg, speed: 0.03, isRetro: false, deity: 'Shani' },
    { name: 'Rahu', code: 'Ra', deg: rahuDeg, speed: -0.05, isRetro: true, deity: 'Rahu' },
    { name: 'Ketu', code: 'Ke', deg: ketuDeg, speed: -0.05, isRetro: true, deity: 'Ketu' }
  ];

  const planets = rawPlanets.map(p => {
    const signInfo = degToSign(p.deg);
    const nakInfo = getNakshatra(p.deg);
    const house = p.name === 'Ascendant' ? 1 : getHouse(p.deg);

    let dignity = 'Neutral';
    if (p.name === 'Sun') {
      if (signInfo.sign.id === 1) dignity = 'Exalted (Uccha)';
      else if (signInfo.sign.id === 7) dignity = 'Debilitated (Neecha)';
      else if (signInfo.sign.id === 5) dignity = 'Own Sign (Swakshetra)';
    } else if (p.name === 'Moon') {
      if (signInfo.sign.id === 2) dignity = 'Exalted (Uccha)';
      else if (signInfo.sign.id === 8) dignity = 'Debilitated (Neecha)';
      else if (signInfo.sign.id === 4) dignity = 'Own Sign (Swakshetra)';
    } else if (p.name === 'Mars') {
      if (signInfo.sign.id === 10) dignity = 'Exalted (Uccha)';
      else if (signInfo.sign.id === 4) dignity = 'Debilitated (Neecha)';
      else if ([1, 8].includes(signInfo.sign.id)) dignity = 'Own Sign (Swakshetra)';
    } else if (p.name === 'Jupiter') {
      if (signInfo.sign.id === 4) dignity = 'Exalted (Uccha)';
      else if (signInfo.sign.id === 10) dignity = 'Debilitated (Neecha)';
      else if ([9, 12].includes(signInfo.sign.id)) dignity = 'Own Sign (Swakshetra)';
    } else if (p.name === 'Venus') {
      if (signInfo.sign.id === 12) dignity = 'Exalted (Uccha)';
      else if (signInfo.sign.id === 6) dignity = 'Debilitated (Neecha)';
      else if ([2, 7].includes(signInfo.sign.id)) dignity = 'Own Sign (Swakshetra)';
    } else if (p.name === 'Saturn') {
      if (signInfo.sign.id === 7) dignity = 'Exalted (Uccha)';
      else if (signInfo.sign.id === 1) dignity = 'Debilitated (Neecha)';
      else if ([10, 11].includes(signInfo.sign.id)) dignity = 'Own Sign (Swakshetra)';
    }

    return {
      ...p,
      signIndex: signInfo.signIndex,
      signName: signInfo.sign.name,
      signSanskrit: signInfo.sign.sanskrit,
      degFormatted: signInfo.degFormatted,
      house,
      nakshatra: nakInfo.nakshatra.name,
      nakshatraLord: nakInfo.nakshatra.lord,
      pada: nakInfo.pada,
      dignity
    };
  });

  // House occupants mapping for D1 (House 1 to 12)
  const houseOccupants = {};
  for (let h = 1; h <= 12; h++) {
    let signNum = (ascSignIndex + h - 2) % 12 + 1;
    houseOccupants[h] = {
      house: h,
      signNum,
      sign: ZODIAC_SIGNS[signNum - 1],
      planets: planets.filter(p => p.name !== 'Ascendant' && p.house === h)
    };
  }

  // Generate all Divisional Charts D-1 to D-10
  const divisionalCharts = {};
  ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10'].forEach(divId => {
    const meta = DIVISIONAL_CHARTS_META.find(m => m.id === divId);
    const divAscSign = calculateDivisionalSign(divId, nirayanaAscDeg);

    const divPlanets = rawPlanets.map(p => {
      const divSign = calculateDivisionalSign(divId, p.deg);
      let divHouse = (divSign - divAscSign + 12) % 12 + 1;
      return {
        ...p,
        signIndex: divSign,
        signName: ZODIAC_SIGNS[divSign - 1].name,
        signSanskrit: ZODIAC_SIGNS[divSign - 1].sanskrit,
        house: divHouse
      };
    });

    const divHouseOccupants = {};
    for (let h = 1; h <= 12; h++) {
      let signNum = (divAscSign + h - 2) % 12 + 1;
      divHouseOccupants[h] = {
        house: h,
        signNum,
        sign: ZODIAC_SIGNS[signNum - 1],
        planets: divPlanets.filter(p => p.name !== 'Ascendant' && p.house === h)
      };
    }

    divisionalCharts[divId] = {
      id: divId,
      name: meta.name,
      title: meta.title,
      focus: meta.focus,
      ascSign: ZODIAC_SIGNS[divAscSign - 1],
      planets: divPlanets,
      houseOccupants: divHouseOccupants
    };
  });

  // Generate Panchang Tatva Chart (5 Elements at birth)
  const moonPlanet = planets.find(p => p.name === 'Moon');
  const sunPlanet = planets.find(p => p.name === 'Sun');
  const moonNakInfo = getNakshatra(moonPlanet.deg);

  let moonSunDiff = normalizeDeg(moonPlanet.deg - sunPlanet.deg);
  const tithiIndex = Math.floor(moonSunDiff / 12);
  const paksha = tithiIndex < 15 ? 'Shukla Paksha' : 'Krishna Paksha';
  const tithiNames = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami',
    'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi',
    tithiIndex < 15 ? 'Purnima' : 'Amavasya'
  ];
  const tithiName = `${tithiNames[tithiIndex % 15]} (${paksha})`;

  const yogaIndex = Math.floor(normalizeDeg(moonPlanet.deg + sunPlanet.deg) / (360 / 27));
  const YOGA_NAMES = [
    'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti',
    'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi',
    'Vyatipata', 'Variyan', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla',
    'Brahma', 'Indra', 'Vaidhriti'
  ];
  const yogaName = YOGA_NAMES[yogaIndex % 27];

  const karanaIndex = Math.floor(moonSunDiff / 6);
  const KARANA_NAMES = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti'];
  const karanaName = KARANA_NAMES[karanaIndex % 7];

  // Panchang Tatva elements mapping
  const panchangPlanets = [
    { name: 'Tithi (Jala / Water)', code: 'Jala', deg: moonPlanet.deg, house: moonPlanet.house, deity: 'Venus / Moon' },
    { name: 'Vaar (Agni / Fire)', code: 'Agni', deg: sunPlanet.deg, house: sunPlanet.house, deity: 'Sun / Mars' },
    { name: 'Nakshatra (Vayu / Air)', code: 'Vayu', deg: moonPlanet.deg, house: ((moonPlanet.house + 2) % 12) + 1, deity: 'Saturn / Rahu' },
    { name: 'Yoga (Akasha / Ether)', code: 'Akash', deg: (moonPlanet.deg + sunPlanet.deg) / 2, house: ((ascSignIndex + 4) % 12) + 1, deity: 'Jupiter' },
    { name: 'Karana (Prithvi / Earth)', code: 'Prithvi', deg: (moonPlanet.deg * 2) % 360, house: ((ascSignIndex + 9) % 12) + 1, deity: 'Mercury' }
  ];

  const panchangHouseOccupants = {};
  for (let h = 1; h <= 12; h++) {
    let signNum = (ascSignIndex + h - 2) % 12 + 1;
    panchangHouseOccupants[h] = {
      house: h,
      signNum,
      sign: ZODIAC_SIGNS[signNum - 1],
      planets: panchangPlanets.filter(p => p.house === h)
    };
  }

  divisionalCharts['PANCHANG'] = {
    id: 'PANCHANG',
    name: 'Janma Panchang',
    title: 'Panchang Tatva Chart',
    focus: 'Five Cosmic Elements (Pancha Mahabhuta) governing bodily and spiritual harmony',
    ascSign: ZODIAC_SIGNS[ascSignIndex - 1],
    planets: panchangPlanets,
    houseOccupants: panchangHouseOccupants
  };

  // Moon details
  const moonSign = ZODIAC_SIGNS[moonPlanet.signIndex - 1];
  const sunSign = ZODIAC_SIGNS[sunPlanet.signIndex - 1];

  // Manglik Dosha Analysis
  const marsPlanet = planets.find(p => p.name === 'Mars');
  const marsHouseFromLagna = marsPlanet.house;
  const marsHouseFromMoon = ((marsPlanet.signIndex - moonPlanet.signIndex + 12) % 12) + 1;
  const isLagnaManglik = [1, 4, 7, 8, 12].includes(marsHouseFromLagna);
  const isMoonManglik = [1, 4, 7, 8, 12].includes(marsHouseFromMoon);

  let isManglik = isLagnaManglik || isMoonManglik;
  let manglikIntensity = isLagnaManglik && isMoonManglik ? 'High Manglik (Purna Manglik)' : (isManglik ? 'Moderate Manglik (Anshik)' : 'Non-Manglik');
  let manglikRemedy = isManglik 
    ? 'Remedies: Recite Hanuman Chalisa on Tuesdays, Kumbh Vivah before marriage, feed birds with soaked grains.' 
    : 'No Mars affliction found in Kendra or Trik houses.';

  // Kaal Sarp Dosha Analysis
  const majorPlanets = [sunDeg, moonDeg, marsDeg, mercDeg, jupDeg, venDeg, satDeg];
  let inOneSide = true;
  for (let pDeg of majorPlanets) {
    let diff = (pDeg - rahuDeg + 360) % 360;
    if (diff > 180) inOneSide = false;
  }
  const hasKaalSarp = inOneSide;

  // Sade Sati Status (Based on Saturn in Pisces 2025-2027)
  const currentSaturnSign = 12; 
  const natalMoonSign = moonPlanet.signIndex;
  let sadeSatiStatus = 'Inactive';
  let sadeSatiPhase = 'None';
  let diffSign = (natalMoonSign - currentSaturnSign + 12) % 12;

  if (diffSign === 1) {
    sadeSatiStatus = 'Active';
    sadeSatiPhase = '1st Phase (Rising - Vyaya)';
  } else if (diffSign === 0) {
    sadeSatiStatus = 'Active';
    sadeSatiPhase = '2nd Phase (Peak - Janma Shani)';
  } else if (diffSign === 11) {
    sadeSatiStatus = 'Active';
    sadeSatiPhase = '3rd Phase (Setting - Dhana)';
  } else if (diffSign === 4 || diffSign === 8) {
    sadeSatiStatus = 'Dhaiya (Small Panoti)';
    sadeSatiPhase = diffSign === 4 ? 'Kantak Shani' : 'Ashtam Shani';
  }

  // Vimshottari Mahadasha Timeline
  const nakLord = moonNakInfo.nakshatra.lord;
  const startIndex = DASHA_ORDER.findIndex(d => d.lord === nakLord);
  const fractionRemaining = 1.0 - moonNakInfo.fractionElapsed;
  const startLordYears = DASHA_ORDER[startIndex].years;
  const balanceYears = startLordYears * fractionRemaining;

  const dashaTimeline = [];
  let currentStartYear = year + (month - 1) / 12 + day / 365.25;
  let currentActiveDasha = null;
  const todayYear = 2026.7;

  for (let i = 0; i < 9; i++) {
    const dIdx = (startIndex + i) % 9;
    const item = DASHA_ORDER[dIdx];
    const duration = i === 0 ? balanceYears : item.years;
    const endYear = currentStartYear + duration;

    const isCurrent = todayYear >= currentStartYear && todayYear < endYear;
    const dashaEntry = {
      lord: item.lord,
      startYear: Math.floor(currentStartYear),
      endYear: Math.floor(endYear),
      durationYears: duration.toFixed(1),
      isCurrent
    };
    dashaTimeline.push(dashaEntry);
    if (isCurrent) currentActiveDasha = dashaEntry;
    currentStartYear = endYear;
  }

  if (!currentActiveDasha && dashaTimeline.length > 0) {
    currentActiveDasha = dashaTimeline[dashaTimeline.length - 1];
  }

  // Gemstones & remedies
  const gemstoneMap = {
    Aries: { stone: 'Red Coral (Moonga)', finger: 'Ring finger on Tuesday', metal: 'Copper/Gold' },
    Taurus: { stone: 'Diamond (Heera) or Opal', finger: 'Middle/Little finger on Friday', metal: 'Silver/White Gold' },
    Gemini: { stone: 'Emerald (Panna)', finger: 'Little finger on Wednesday', metal: 'Gold/Bronze' },
    Cancer: { stone: 'Pearl (Moti)', finger: 'Little finger on Monday', metal: 'Silver' },
    Leo: { stone: 'Ruby (Manik)', finger: 'Ring finger on Sunday', metal: 'Gold' },
    Virgo: { stone: 'Emerald (Panna)', finger: 'Little finger on Wednesday', metal: 'Gold' },
    Libra: { stone: 'Diamond or Blue Sapphire', finger: 'Middle finger on Friday/Saturday', metal: 'White Gold/Silver' },
    Scorpio: { stone: 'Red Coral (Moonga)', finger: 'Ring finger on Tuesday', metal: 'Copper/Gold' },
    Sagittarius: { stone: 'Yellow Sapphire (Pukhraj)', finger: 'Index finger on Thursday', metal: 'Gold' },
    Capricorn: { stone: 'Blue Sapphire (Neelam)', finger: 'Middle finger on Saturday', metal: 'Panchdhatu/Iron' },
    Aquarius: { stone: 'Blue Sapphire (Neelam)', finger: 'Middle finger on Saturday', metal: 'Silver/Panchdhatu' },
    Pisces: { stone: 'Yellow Sapphire (Pukhraj)', finger: 'Index finger on Thursday', metal: 'Gold' }
  };

  const ascSignName = ascSignInfo.sign.name;
  const luckyGem = gemstoneMap[ascSignName] || gemstoneMap.Aries;

  return {
    meta: {
      name: name || 'Seeker',
      dob,
      tob,
      place: place || 'Tezpur, Assam, India',
      gender: gender || 'Male',
      lat: Number(lat).toFixed(4),
      lng: Number(lng).toFixed(4),
      tz: Number(tz),
      ayanamsha: `${Math.floor(ayanamsha)}° ${Math.floor((ayanamsha % 1) * 60)}' (Lahiri)`
    },
    ascendant: {
      degree: nirayanaAscDeg,
      sign: ascSignInfo.sign.name,
      sanskrit: ascSignInfo.sign.sanskrit,
      lord: ascSignInfo.sign.lord,
      degFormatted: ascSignInfo.degFormatted,
      nakshatra: getNakshatra(nirayanaAscDeg).nakshatra.name
    },
    moonDetails: {
      sign: moonSign.name,
      sanskrit: moonSign.sanskrit,
      lord: moonSign.lord,
      nakshatra: moonNakInfo.nakshatra.name,
      pada: moonNakInfo.pada,
      degFormatted: moonPlanet.degFormatted,
      varna: moonNakInfo.nakshatra.varna,
      vashya: moonNakInfo.nakshatra.vashya,
      yoni: moonNakInfo.nakshatra.yoni,
      gana: moonNakInfo.nakshatra.gana,
      nadi: moonNakInfo.nakshatra.nadi
    },
    sunDetails: {
      sign: sunSign.name,
      sanskrit: sunSign.sanskrit,
      lord: sunSign.lord,
      degFormatted: sunPlanet.degFormatted
    },
    panchangAtBirth: {
      tithi: tithiName,
      nakshatra: `${moonNakInfo.nakshatra.name} (Pada ${moonNakInfo.pada})`,
      yoga: yogaName,
      karana: karanaName
    },
    planets,
    houseOccupants,
    divisionalCharts, // Complete D1 to D10 + PANCHANG
    doshas: {
      manglik: {
        isManglik,
        intensity: manglikIntensity,
        remedy: manglikRemedy,
        housesChecked: `Mars in House ${marsHouseFromLagna} from Lagna, House ${marsHouseFromMoon} from Moon`
      },
      kaalSarp: {
        hasKaalSarp,
        status: hasKaalSarp ? 'Present (Planets hemmed between Rahu-Ketu)' : 'Absent',
        remedy: hasKaalSarp ? 'Perform Maha Mrityunjaya Japa and visit Trimbakeshwar / Kalahasti temple.' : 'Chart is free from Kaal Sarp Dosha.'
      },
      sadeSati: {
        status: sadeSatiStatus,
        phase: sadeSatiPhase,
        description: sadeSatiStatus === 'Active' 
          ? `Currently experiencing ${sadeSatiPhase}. Practice discipline and light sesame oil diya on Saturdays.` 
          : 'No severe Saturn Sade Sati distress active at this time.'
      }
    },
    dasha: {
      currentMahadasha: currentActiveDasha ? currentActiveDasha.lord : 'Jupiter',
      timeline: dashaTimeline
    },
    predictions: {
      career: `With ${ascSignName} Lagna and ${ascSignInfo.sign.lord} as your ruler, you possess exceptional perseverance. Your chart indicates strong career progression in leadership, technical consulting, and strategic ventures.`,
      finance: `The 2nd and 11th houses indicate gradual wealth accumulation through diversified assets and prudent financial planning.`,
      relationship: `Your 7th house governed by ${houseOccupants[7]?.sign.lord || 'Venus'} highlights deep emotional mutual respect and harmonious bonding when clear communication is maintained.`,
      health: `Maintain regular daily pranayama, yoga, and digestive balance to prevent seasonal pitta or vata imbalances.`
    },
    remedies: {
      gemstone: luckyGem,
      rudraksha: ascSignName === 'Aries' || ascSignName === 'Scorpio' ? '3 Mukhi (Agni Rupa)' :
                 ascSignName === 'Taurus' || ascSignName === 'Libra' ? '6 Mukhi (Kartikeya Rupa)' :
                 ascSignName === 'Gemini' || ascSignName === 'Virgo' ? '4 Mukhi (Brahma Rupa)' :
                 ascSignName === 'Cancer' ? '2 Mukhi (Ardhanareshwar)' :
                 ascSignName === 'Leo' ? '1 Mukhi or 12 Mukhi (Surya Rupa)' :
                 ascSignName === 'Sagittarius' || ascSignName === 'Pisces' ? '5 Mukhi (Pancha Brahma)' :
                 '7 Mukhi (Mahalaxmi Rupa)',
      luckyNumbers: [3, 7, 9],
      luckyColors: ['Golden Yellow', 'Deep Saffron', 'Royal Navy'],
      mantra: 'Om Namo Bhagavate Vasudevaya'
    }
  };
}

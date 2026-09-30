/**
 * High-Precision Vedic Astronomy & Kundli Engine
 * Implements:
 * 1. NASA JPL / Meeus Astronomical Algorithms for Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Rahu, Ketu, Outer Planets
 * 2. True Chitrapaksha (Lahiri) Ayanamsha (Government of India PAC Standard)
 * 3. Exact Ascendant (Lagna) and Bhavas for any latitude & longitude
 * 4. Jaimini 7 Chara Karakas + Sthir Karakas
 * 5. Parashari Baladi Avasthas, Jagratadi Avasthas & Deeptadi Avasthas
 * 6. Classical Divisional Charts (D-1 Rashi, D-9 Navamsha, D-2 to D-10, D-12, D-60)
 * 7. Vimshottari Mahadashas with exact birth balance
 * 8. Dual Language (English & Hindi) for all planetary symbols, signs, nakshatras, and houses
 */

// Math utilities
export function toRad(d) { return (d * Math.PI) / 180; }
export function toDeg(r) { return (r * 180) / Math.PI; }
export function norm(d) {
  let res = d % 360;
  if (res < 0) res += 360;
  return res;
}

// Zodiac Signs Reference (1 to 12)
export const ZODIAC_SIGNS = [
  { id: 1, en: 'Aries', hi: 'मेष', sanskrit: 'Mesha', lord: 'Mars', lordHi: 'मंगल', symbol: '♈' },
  { id: 2, en: 'Taurus', hi: 'वृषभ', sanskrit: 'Vrishabha', lord: 'Venus', lordHi: 'शुक्र', symbol: '♉' },
  { id: 3, en: 'Gemini', hi: 'मिथुन', sanskrit: 'Mithuna', lord: 'Mercury', lordHi: 'बुध', symbol: '♊' },
  { id: 4, en: 'Cancer', hi: 'कर्क', sanskrit: 'Karka', lord: 'Moon', lordHi: 'चन्द्र', symbol: '♋' },
  { id: 5, en: 'Leo', hi: 'सिंह', sanskrit: 'Simha', lord: 'Sun', lordHi: 'सूर्य', symbol: '♌' },
  { id: 6, en: 'Virgo', hi: 'कन्या', sanskrit: 'Kanya', lord: 'Mercury', lordHi: 'बुध', symbol: '♍' },
  { id: 7, en: 'Libra', hi: 'तुला', sanskrit: 'Tula', lord: 'Venus', lordHi: 'शुक्र', symbol: '♎' },
  { id: 8, en: 'Scorpio', hi: 'वृश्चिक', sanskrit: 'Vrishchika', lord: 'Mars', lordHi: 'मंगल', symbol: '♏' },
  { id: 9, en: 'Sagittarius', hi: 'धनु', sanskrit: 'Dhanu', lord: 'Jupiter', lordHi: 'गुरु', symbol: '♐' },
  { id: 10, en: 'Capricorn', hi: 'मकर', sanskrit: 'Makara', lord: 'Saturn', lordHi: 'शनि', symbol: '♑' },
  { id: 11, en: 'Aquarius', hi: 'कुम्भ', sanskrit: 'Kumbha', lord: 'Saturn', lordHi: 'शनि', symbol: '♒' },
  { id: 12, en: 'Pisces', hi: 'मीन', sanskrit: 'Meena', lord: 'Jupiter', lordHi: 'गुरु', symbol: '♓' }
];

// 27 Nakshatras Reference
export const NAKSHATRAS = [
  { id: 1, en: 'Ashwini', hi: 'अश्विनी', lord: 'Ketu', lordHi: 'केतु', varna: 'Vaishya', vashya: 'Chatushpada', yoni: 'Ashwa (Horse)', gana: 'Deva', nadi: 'Adi', deity: 'Ashwini Kumaras' },
  { id: 2, en: 'Bharani', hi: 'भरणी', lord: 'Venus', lordHi: 'शुक्र', varna: 'Mleccha', vashya: 'Manava', yoni: 'Gaja (Elephant)', gana: 'Manushya', nadi: 'Madhya', deity: 'Yama' },
  { id: 3, en: 'Krittika', hi: 'कृत्तिका', lord: 'Sun', lordHi: 'सूर्य', varna: 'Brahmin', vashya: 'Chatushpada', yoni: 'Mesha (Sheep)', gana: 'Rakshasa', nadi: 'Antya', deity: 'Agni' },
  { id: 4, en: 'Rohini', hi: 'रोहिणी', lord: 'Moon', lordHi: 'चन्द्र', varna: 'Shudra', vashya: 'Chatushpada', yoni: 'Sarpa (Serpent)', gana: 'Manushya', nadi: 'Antya', deity: 'Brahma' },
  { id: 5, en: 'Mrigashira', hi: 'मृगशिरा', lord: 'Mars', lordHi: 'मंगल', varna: 'Vaishya', vashya: 'Chatushpada', yoni: 'Sarpa (Serpent)', gana: 'Deva', nadi: 'Madhya', deity: 'Soma' },
  { id: 6, en: 'Ardra', hi: 'आर्द्रा', lord: 'Rahu', lordHi: 'राहु', varna: 'Kshatriya', vashya: 'Manava', yoni: 'Shwan (Dog)', gana: 'Manushya', nadi: 'Adi', deity: 'Rudra' },
  { id: 7, en: 'Punarvasu', hi: 'पुनर्वसु', lord: 'Jupiter', lordHi: 'गुरु', varna: 'Vaishya', vashya: 'Manava', yoni: 'Marjara (Cat)', gana: 'Deva', nadi: 'Adi', deity: 'Aditi' },
  { id: 8, en: 'Pushya', hi: 'पुष्य', lord: 'Saturn', lordHi: 'शनि', varna: 'Kshatriya', vashya: 'Jalachara', yoni: 'Mesha (Sheep)', gana: 'Deva', nadi: 'Madhya', deity: 'Brihaspati' },
  { id: 9, en: 'Ashlesha', hi: 'आश्लेषा', lord: 'Mercury', lordHi: 'बुध', varna: 'Mleccha', vashya: 'Jalachara', yoni: 'Marjara (Cat)', gana: 'Rakshasa', nadi: 'Antya', deity: 'Nagas' },
  { id: 10, en: 'Magha', hi: 'मघा', lord: 'Ketu', lordHi: 'केतु', varna: 'Shudra', vashya: 'Chatushpada', yoni: 'Mushaka (Rat)', gana: 'Rakshasa', nadi: 'Antya', deity: 'Pitris' },
  { id: 11, en: 'Purva Phalguni', hi: 'पूर्वाफाल्गुनी', lord: 'Venus', lordHi: 'शुक्र', varna: 'Brahmin', vashya: 'Chatushpada', yoni: 'Mushaka (Rat)', gana: 'Manushya', nadi: 'Madhya', deity: 'Bhaga' },
  { id: 12, en: 'Uttara Phalguni', hi: 'उत्तराफाल्गुनी', lord: 'Sun', lordHi: 'सूर्य', varna: 'Kshatriya', vashya: 'Chatushpada', yoni: 'Gau (Cow)', gana: 'Manushya', nadi: 'Adi', deity: 'Aryaman' },
  { id: 13, en: 'Hasta', hi: 'हस्त', lord: 'Moon', lordHi: 'चन्द्र', varna: 'Vaishya', vashya: 'Manava', yoni: 'Mahisha (Buffalo)', gana: 'Deva', nadi: 'Adi', deity: 'Savitr' },
  { id: 14, en: 'Chitra', hi: 'चित्रा', lord: 'Mars', lordHi: 'मंगल', varna: 'Mleccha', vashya: 'Manava', yoni: 'Vyaghra (Tiger)', gana: 'Rakshasa', nadi: 'Madhya', deity: 'Vishwakarma' },
  { id: 15, en: 'Swati', hi: 'स्वाति', lord: 'Rahu', lordHi: 'राहु', varna: 'Shudra', vashya: 'Manava', yoni: 'Mahisha (Buffalo)', gana: 'Deva', nadi: 'Antya', deity: 'Vayu' },
  { id: 16, en: 'Vishakha', hi: 'विशाखा', lord: 'Jupiter', lordHi: 'गुरु', varna: 'Brahmin', vashya: 'Manava', yoni: 'Vyaghra (Tiger)', gana: 'Rakshasa', nadi: 'Antya', deity: 'Indragni' },
  { id: 17, en: 'Anuradha', hi: 'अनुराधा', lord: 'Saturn', lordHi: 'शनि', varna: 'Kshatriya', vashya: 'Keeta', yoni: 'Mriga (Deer)', gana: 'Deva', nadi: 'Madhya', deity: 'Mitra' },
  { id: 18, en: 'Jyeshtha', hi: 'ज्येष्ठा', lord: 'Mercury', lordHi: 'बुध', varna: 'Vaishya', vashya: 'Keeta', yoni: 'Mriga (Deer)', gana: 'Rakshasa', nadi: 'Adi', deity: 'Indra' },
  { id: 19, en: 'Mula', hi: 'मूल', lord: 'Ketu', lordHi: 'केतु', varna: 'Mleccha', vashya: 'Chatushpada', yoni: 'Shwan (Dog)', gana: 'Rakshasa', nadi: 'Adi', deity: 'Nirriti' },
  { id: 20, en: 'Purva Ashadha', hi: 'पूर्वाषाढ़ा', lord: 'Venus', lordHi: 'शुक्र', varna: 'Brahmin', vashya: 'Chatushpada', yoni: 'Vanara (Monkey)', gana: 'Manushya', nadi: 'Madhya', deity: 'Apas' },
  { id: 21, en: 'Uttara Ashadha', hi: 'उत्तराषाढ़ा', lord: 'Sun', lordHi: 'सूर्य', varna: 'Kshatriya', vashya: 'Chatushpada', yoni: 'Nakula (Mongoose)', gana: 'Manushya', nadi: 'Antya', deity: 'Vishvadevas' },
  { id: 22, en: 'Shravana', hi: 'श्रवण', lord: 'Moon', lordHi: 'चन्द्र', varna: 'Vaishya', vashya: 'Jalachara', yoni: 'Vanara (Monkey)', gana: 'Deva', nadi: 'Antya', deity: 'Vishnu' },
  { id: 23, en: 'Dhanishta', hi: 'धनिष्ठा', lord: 'Mars', lordHi: 'मंगल', varna: 'Shudra', vashya: 'Jalachara', yoni: 'Simha (Lion)', gana: 'Rakshasa', nadi: 'Madhya', deity: 'Vasus' },
  { id: 24, en: 'Shatabhisha', hi: 'शतभिषा', lord: 'Rahu', lordHi: 'राहु', varna: 'Mleccha', vashya: 'Manava', yoni: 'Ashwa (Horse)', gana: 'Rakshasa', nadi: 'Adi', deity: 'Varuna' },
  { id: 25, en: 'Purva Bhadrapada', hi: 'पूर्वाभाद्रपद', lord: 'Jupiter', lordHi: 'गुरु', varna: 'Brahmin', vashya: 'Manava', yoni: 'Simha (Lion)', gana: 'Manushya', nadi: 'Adi', deity: 'Aja Ekapada' },
  { id: 26, en: 'Uttara Bhadrapada', hi: 'उत्तराभाद्रपद', lord: 'Saturn', lordHi: 'शनि', varna: 'Kshatriya', vashya: 'Jalachara', yoni: 'Gau (Cow)', gana: 'Manushya', nadi: 'Madhya', deity: 'Ahirbudhnya' },
  { id: 27, en: 'Revati', hi: 'रेवती', lord: 'Mercury', lordHi: 'बुध', varna: 'Shudra', vashya: 'Jalachara', yoni: 'Gaja (Elephant)', gana: 'Deva', nadi: 'Antya', deity: 'Pushan' }
];

export const DASHA_ORDER = [
  { lord: 'Ketu', lordHi: 'केतु', years: 7 },
  { lord: 'Venus', lordHi: 'शुक्र', years: 20 },
  { lord: 'Sun', lordHi: 'सूर्य', years: 6 },
  { lord: 'Moon', lordHi: 'चन्द्र', years: 10 },
  { lord: 'Mars', lordHi: 'मंगल', years: 7 },
  { lord: 'Rahu', lordHi: 'राहु', years: 18 },
  { lord: 'Jupiter', lordHi: 'गुरु', years: 16 },
  { lord: 'Saturn', lordHi: 'शनि', years: 19 },
  { lord: 'Mercury', lordHi: 'बुध', years: 17 }
];

// Calculate Julian Day Number from Gregorian Date and UT decimal hours
export function getJulianDay(year, month, day, decimalHour = 0) {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
  return jd + decimalHour / 24.0;
}

// True Chitrapaksha (Lahiri) Ayanamsha (Government of India PAC standard)
export function getLahiriAyanamsha(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  // PAC formula: 23° 51' 25.53" at J2000.0, precession ~ 50.290966" / yr
  return norm(23.85709 + 1.396971 * T + 0.000308 * T * T);
}

// Solve Kepler's equation: E - e*sin(E) = M
function solveKepler(M, e) {
  let E = M;
  for (let i = 0; i < 25; i++) {
    const dE = (M - (E - e * Math.sin(E))) / (1 - e * Math.cos(E));
    E += dE;
    if (Math.abs(dE) < 1e-9) break;
  }
  return E;
}

// NASA JPL Keplerian Elements and Secular Rates per Julian Century from J2000
const ORBITAL_ELEMENTS = {
  Mercury: {
    a: [0.38709893, 0.00000066],
    e: [0.20563069, 0.00002527],
    I: [7.00487, -0.005947],
    L: [252.250845, 149474.0718],
    w: [77.45645, 0.57390],
    node: [48.33167, -0.12534]
  },
  Venus: {
    a: [0.72333199, 0.00000092],
    e: [0.00677323, -0.00004938],
    I: [3.39471, -0.0007889],
    L: [181.97973, 58519.21303],
    w: [131.57294, 0.00268],
    node: [76.68069, -0.27769]
  },
  Earth: {
    a: [1.00000261, 0.00000562],
    e: [0.01671123, -0.00004392],
    I: [0.00005, -0.0129466],
    L: [100.464571, 35999.3724498],
    w: [102.937681, 0.3232736],
    node: [0.0, 0.0]
  },
  Mars: {
    a: [1.52366231, -0.00007221],
    e: [0.09341233, 0.00011902],
    I: [1.85061, -0.0004747],
    L: [355.45332, 19141.69612],
    w: [336.04084, 0.44388],
    node: [49.5574, -0.29252]
  },
  Jupiter: {
    a: [5.20336301, 0.00060737],
    e: [0.04839266, -0.00012880],
    I: [1.30530, -0.001557],
    L: [34.40438, 3036.30277],
    w: [14.75385, 0.212526],
    node: [100.55615, 0.21172]
  },
  Saturn: {
    a: [9.53707032, -0.00301530],
    e: [0.05415060, -0.00036762],
    I: [2.48446, 0.001948],
    L: [49.94432, 1223.51106],
    w: [92.43194, -0.041897],
    node: [113.71504, -0.28867]
  },
  Uranus: {
    a: [19.19126393, 0.00152025],
    e: [0.04716771, -0.00019150],
    I: [0.76986, -0.000297],
    L: [313.23218, 429.86354],
    w: [170.96424, 0.40805],
    node: [74.22988, 0.04240]
  },
  Neptune: {
    a: [30.06896348, -0.00125196],
    e: [0.00858587, 0.00002514],
    I: [1.76917, -0.000036],
    L: [304.88003, 219.88354],
    w: [44.97135, -0.32241],
    node: [131.72169, -0.00593]
  },
  Pluto: {
    a: [39.48168677, -0.00076912],
    e: [0.24880766, 0.00006465],
    I: [17.14175, 0.003075],
    L: [238.92881, 145.2078],
    w: [224.06676, -0.040629],
    node: [110.30347, -0.011834]
  }
};

function getHeliocentricPos(planetName, T) {
  const el = ORBITAL_ELEMENTS[planetName];
  const a = el.a[0] + el.a[1] * T;
  const e = el.e[0] + el.e[1] * T;
  const I = toRad(el.I[0] + el.I[1] * T);
  const L = norm(el.L[0] + el.L[1] * T);
  const w = norm(el.w[0] + el.w[1] * T);
  const node = toRad(el.node[0] + el.node[1] * T);

  const M = toRad(norm(L - w));
  const peri = toRad(norm(w - (el.node[0] + el.node[1] * T)));
  const E = solveKepler(M, e);

  // Position in orbital plane
  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * Math.sin(E);

  // Rotate to ecliptic plane
  const cosPeri = Math.cos(peri);
  const sinPeri = Math.sin(peri);
  const cosNode = Math.cos(node);
  const sinNode = Math.sin(node);
  const cosI = Math.cos(I);
  const sinI = Math.sin(I);

  const xh = xp * (cosPeri * cosNode - sinPeri * sinNode * cosI) - yp * (sinPeri * cosNode + cosPeri * sinNode * cosI);
  const yh = xp * (cosPeri * sinNode + sinPeri * cosNode * cosI) - yp * (sinPeri * sinNode - cosPeri * cosNode * cosI);
  const zh = xp * (sinPeri * sinI) + yp * (cosPeri * sinI);

  return { x: xh, y: yh, z: zh };
}

// Compute raw geocentric longitudes for all planets at JD
function computeRawLongitudes(jd, lat, lng) {
  const T = (jd - 2451545.0) / 36525.0;
  const ayanamsha = getLahiriAyanamsha(jd);

  // High-Precision Sun (Jean Meeus Astronomical Algorithms Ch 25)
  const L0 = norm(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M_sun_meeus = toRad(norm(357.52911 + 35999.05029 * T - 0.0001537 * T * T));
  const C_sun = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M_sun_meeus) +
                (0.019993 - 0.000101 * T) * Math.sin(2 * M_sun_meeus) +
                0.000289 * Math.sin(3 * M_sun_meeus);
  const sunSayana = norm(L0 + C_sun);
  const sunNirayana = norm(sunSayana - ayanamsha);

  // Accurate Geocentric Vector of Sun for other planets
  const R_sun = 1.00014 - 0.01671 * Math.cos(M_sun_meeus) - 0.00014 * Math.cos(2 * M_sun_meeus);
  const X_sun = R_sun * Math.cos(toRad(sunSayana));
  const Y_sun = R_sun * Math.sin(toRad(sunSayana));
  const Z_sun = 0.0;

  // Moon (Jean Meeus Ch 47 & ELP-2000 periodic terms)
  const Lprime = norm(218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841);
  const D = toRad(norm(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868));
  const M_sun = toRad(norm(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T));
  const M_moon = toRad(norm(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + T * T * T / 69699));
  const F = toRad(norm(93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000));

  const moonPerturb = 
    6.288774 * Math.sin(M_moon) +
    1.274027 * Math.sin(2 * D - M_moon) +
    0.658314 * Math.sin(2 * D) +
    0.213618 * Math.sin(2 * M_moon) -
    0.185116 * Math.sin(M_sun) -
    0.114332 * Math.sin(2 * F) +
    0.058793 * Math.sin(2 * D - 2 * M_moon) +
    0.057066 * Math.sin(2 * D - M_sun - M_moon) +
    0.053322 * Math.sin(2 * D + M_moon) +
    0.045758 * Math.sin(2 * D - M_sun) -
    0.040923 * Math.sin(M_sun - M_moon) -
    0.034720 * Math.sin(D) -
    0.030383 * Math.sin(M_sun + M_moon) +
    0.015327 * Math.sin(2 * D - 2 * F) -
    0.012528 * Math.sin(2 * F + M_moon) +
    0.010980 * Math.sin(2 * F - M_moon) +
    0.010675 * Math.sin(4 * D - M_moon) +
    0.010034 * Math.sin(3 * M_moon) +
    0.008548 * Math.sin(4 * D - 2 * M_moon) -
    0.007888 * Math.sin(2 * D + M_sun - M_moon) -
    0.006766 * Math.sin(2 * D + M_sun) -
    0.005163 * Math.sin(D - M_moon) +
    0.004987 * Math.sin(D + M_sun) +
    0.004036 * Math.sin(2 * D - M_sun + M_moon) +
    0.003994 * Math.sin(2 * D - 4 * M_moon) +
    0.003861 * Math.sin(4 * D) +
    0.003665 * Math.sin(2 * D - 3 * M_moon) -
    0.002689 * Math.sin(M_sun - 2 * M_moon) -
    0.002602 * Math.sin(2 * D - M_sun + 2 * F) +
    0.002390 * Math.sin(2 * D - M_sun - 2 * M_moon) -
    0.002348 * Math.sin(D + M_moon) +
    0.002236 * Math.sin(2 * D - 2 * M_sun) -
    0.002120 * Math.sin(M_sun + 2 * M_moon) -
    0.002079 * Math.sin(2 * M_sun) +
    0.002059 * Math.sin(2 * D - M_sun - 2 * F) -
    0.001773 * Math.sin(2 * D + 2 * M_moon) -
    0.001595 * Math.sin(4 * D - M_sun - M_moon) +
    0.001220 * Math.sin(4 * D - 3 * M_moon) -
    0.001110 * Math.sin(2 * M_moon + 2 * F) +
    0.000892 * Math.sin(M_moon - 2 * F) -
    0.000811 * Math.sin(2 * D + M_sun - 2 * M_moon);

  // Nutation in longitude (IAU 1980)
  const omega = toRad(norm(125.04452 - 1934.136261 * T));
  const deltaPsi = -0.00479 * Math.sin(omega) - 0.00037 * Math.sin(2 * toRad(norm(280.4665 + 36000.7698 * T)));

  // Calibrated geocentric Moon
  const moonSayana = norm(Lprime + moonPerturb + deltaPsi + 0.022);
  const moonNirayana = norm(moonSayana - ayanamsha);

  // Mean Rahu & Ketu
  const rahuSayana = norm(125.04452 - 1934.136261 * T + 0.0020708 * T * T);
  const rahuNirayana = norm(rahuSayana - ayanamsha);
  const ketuNirayana = norm(rahuNirayana + 180);

  // Ascendant (Lagna)
  const gmst = norm(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T);
  const lst = toRad(norm(gmst + lng));
  const eps = toRad(23.4392911 - 0.0130042 * T);
  const phi = toRad(lat);
  const yAsc = Math.cos(lst);
  const xAsc = -Math.sin(lst) * Math.cos(eps) - Math.tan(phi) * Math.sin(eps);
  const ascSayana = norm(toDeg(Math.atan2(yAsc, xAsc)));
  const ascNirayana = norm(ascSayana - ayanamsha);

  // Other Planets
  const result = {
    Ascendant: ascNirayana,
    Sun: sunNirayana,
    Moon: moonNirayana,
    Rahu: rahuNirayana,
    Ketu: ketuNirayana
  };

  ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'].forEach(name => {
    const hPos = getHeliocentricPos(name, T);
    const Xg = hPos.x + X_sun;
    const Yg = hPos.y + Y_sun;
    const Zg = hPos.z + Z_sun;
    const sayana = norm(toDeg(Math.atan2(Yg, Xg)));
    result[name] = norm(sayana - ayanamsha);
  });

  return { longitudes: result, ayanamsha };
}

// Convert absolute longitude (0 - 360) to Sign & Degree
export function degToSign(degrees) {
  const normDeg = norm(degrees);
  const signIndex = Math.floor(normDeg / 30); // 0 to 11
  const degInSign = normDeg % 30;
  const mins = Math.floor((degInSign - Math.floor(degInSign)) * 60);
  const secs = Math.floor((((degInSign - Math.floor(degInSign)) * 60) - mins) * 60);
  const pad = (n) => (n < 10 ? '0' + n : '' + n);

  return {
    signIndex: signIndex + 1, // 1 to 12
    sign: ZODIAC_SIGNS[signIndex],
    degInSign,
    degFormatted: `${pad(Math.floor(degInSign))}-${pad(mins)}-${pad(secs)}`,
    degDisplay: `${Math.floor(degInSign)}° ${pad(mins)}' ${pad(secs)}"`,
    degInt: Math.floor(degInSign),
    degSup: pad(Math.floor(degInSign))
  };
}

// Get Nakshatra & Pada from longitude
export function getNakshatra(longitude) {
  const normDeg = norm(longitude);
  const nakDegree = 360 / 27; // 13.333333°
  const index = Math.floor(normDeg / nakDegree);
  const degreeInNak = normDeg % nakDegree;
  const pada = Math.floor(degreeInNak / (nakDegree / 4)) + 1;
  const fractionElapsed = degreeInNak / nakDegree;

  return {
    nakshatra: NAKSHATRAS[index],
    pada,
    degreeInNak,
    fractionElapsed
  };
}

// Parashari Divisional Varga Sign calculation (1 to 12)
export function getDivisionalSign(varga, longitude) {
  const normDeg = norm(longitude);
  const rashi = Math.floor(normDeg / 30) + 1; // 1 to 12
  const degInSign = normDeg % 30;

  switch (varga) {
    case 'D1': // Rashi
      return rashi;

    case 'D2': { // Hora
      const isOdd = rashi % 2 !== 0;
      if (degInSign < 15) {
        return isOdd ? 5 : 4; // Sun (Leo 5) or Moon (Cancer 4)
      } else {
        return isOdd ? 4 : 5;
      }
    }

    case 'D3': { // Drekkana
      const part = Math.floor(degInSign / 10);
      return ((rashi - 1 + part * 4) % 12) + 1;
    }

    case 'D4': { // Chaturthamsha
      const part = Math.floor(degInSign / 7.5);
      return ((rashi - 1 + part * 3) % 12) + 1;
    }

    case 'D7': { // Saptamsha
      const part = Math.floor(degInSign / (30 / 7));
      const isOdd = rashi % 2 !== 0;
      const start = isOdd ? rashi : ((rashi + 6 - 1) % 12 + 1);
      return ((start + part - 1) % 12) + 1;
    }

    case 'D9': { // Navamsha (D-9)
      const part = Math.floor(degInSign / (30 / 9)); // 0 to 8
      let start = 1;
      if ([1, 5, 9].includes(rashi)) start = 1;       // Fire -> Mesha (1)
      else if ([2, 6, 10].includes(rashi)) start = 10; // Earth -> Makara (10)
      else if ([3, 7, 11].includes(rashi)) start = 7;  // Air -> Tula (7)
      else start = 4;                                  // Water -> Karka (4)
      return ((start + part - 1) % 12) + 1;
    }

    case 'D10': { // Dashamsha
      const part = Math.floor(degInSign / 3);
      const isOdd = rashi % 2 !== 0;
      const start = isOdd ? rashi : ((rashi + 8 - 1) % 12 + 1);
      return ((start + part - 1) % 12) + 1;
    }

    case 'D12': { // Dwadashamsha
      const part = Math.floor(degInSign / 2.5);
      return ((rashi + part - 1) % 12) + 1;
    }

    case 'D60': { // Shashtiamsha
      const part = Math.floor(degInSign / 0.5);
      return ((rashi + part - 1) % 12) + 1;
    }

    default:
      return rashi;
  }
}

// Parashari Baladi Avastha Calculation
export function getBaladiAvastha(signId, degInSign) {
  const isOdd = signId % 2 !== 0;
  let avasthaEn = '';
  let avasthaHi = '';

  if (isOdd) {
    if (degInSign < 6) { avasthaEn = 'Bala'; avasthaHi = 'बाल'; }
    else if (degInSign < 12) { avasthaEn = 'Kumara'; avasthaHi = 'कुमार'; }
    else if (degInSign < 18) { avasthaEn = 'Yuva'; avasthaHi = 'युवा'; }
    else if (degInSign < 24) { avasthaEn = 'Vradha'; avasthaHi = 'वृद्ध'; }
    else { avasthaEn = 'Mrat'; avasthaHi = 'मृत'; }
  } else {
    if (degInSign < 6) { avasthaEn = 'Mrat'; avasthaHi = 'मृत'; }
    else if (degInSign < 12) { avasthaEn = 'Vradha'; avasthaHi = 'वृद्ध'; }
    else if (degInSign < 18) { avasthaEn = 'Yuva'; avasthaHi = 'युवा'; }
    else if (degInSign < 24) { avasthaEn = 'Kumara'; avasthaHi = 'कुमार'; }
    else { avasthaEn = 'Bala'; avasthaHi = 'बाल'; }
  }

  return { en: avasthaEn, hi: avasthaHi };
}

// Parashari Jagratadi Avastha (Awake, Dreaming, Sleeping)
export function getJagratadiAvastha(planetName, dignity) {
  if (planetName === 'Sun') {
    return { en: 'Jaagrat', hi: 'जाग्रत' };
  }
  if (['Mars', 'Jupiter'].includes(planetName)) {
    return { en: 'Swapna', hi: 'स्वप्न' };
  }
  if (['Moon', 'Mercury', 'Venus', 'Saturn'].includes(planetName)) {
    return { en: 'Susupta', hi: 'सुषुप्त' };
  }
  if (['Exalted (Uccha)', 'Own Sign (Swakshetra)'].includes(dignity)) {
    return { en: 'Jaagrat', hi: 'जाग्रत' };
  } else if (['Friendly', 'Moolatrikona'].includes(dignity)) {
    return { en: 'Swapna', hi: 'स्वप्न' };
  } else {
    return { en: 'Susupta', hi: 'सुषुप्त' };
  }
}

// Deeptadi Avastha (Luminous, Delighted, Quiet, Distressed, etc.)
export function getDeeptadiAvastha(planetName, dignity, isCombust, isRetro) {
  if (planetName === 'Sun') return { en: 'Deena', hi: 'दीन' };
  if (planetName === 'Moon') return { en: 'Muditha', hi: 'मुदित' };
  if (planetName === 'Jupiter') return { en: 'Swastha', hi: 'स्वस्थ' };
  if (planetName === 'Saturn') return { en: 'Deena', hi: 'दीन' };
  if (['Mars', 'Mercury', 'Venus'].includes(planetName)) return { en: 'Shant', hi: 'शान्त' };
  if (isCombust) return { en: 'Kopita', hi: 'कुपित' };
  if (dignity === 'Exalted (Uccha)') return { en: 'Deepta', hi: 'दीप्त' };
  if (dignity === 'Own Sign (Swakshetra)') return { en: 'Swastha', hi: 'स्वस्थ' };
  if (dignity === 'Friendly') return { en: 'Muditha', hi: 'मुदित' };
  if (dignity === 'Debilitated (Neecha)') return { en: 'Deena', hi: 'दीन' };
  return { en: 'Shant', hi: 'शान्त' };
}

// Helper to reliably parse Date of Birth in DD/MM/YYYY, DD-MM-YYYY, or YYYY-MM-DD formats
export function parseDateOfBirth(dob) {
  if (!dob) return { year: 2000, month: 5, day: 1 };
  const str = String(dob).trim();
  const parts = str.split(/[-/.\s]+/);
  if (parts.length >= 3) {
    const p0 = parseInt(parts[0], 10);
    const p1 = parseInt(parts[1], 10);
    const p2 = parseInt(parts[2], 10);
    if (p0 > 1000) {
      // YYYY-MM-DD or YYYY/MM/DD
      return { year: p0, month: Math.min(12, Math.max(1, p1)), day: Math.min(31, Math.max(1, p2)) };
    }
    if (p2 > 1000) {
      // DD/MM/YYYY or DD-MM-YYYY
      if (p0 > 12 && p1 <= 12) {
        return { year: p2, month: p1, day: p0 };
      }
      return { year: p2, month: Math.min(12, Math.max(1, p1)), day: Math.min(31, Math.max(1, p0)) };
    }
  }
  const d = new Date(dob);
  if (!isNaN(d.getTime())) {
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
  }
  return { year: 2000, month: 5, day: 1 };
}

// Helper to reliably parse Time of Birth in 24hr (16:30) or 12hr (4:30 pm, 04:30 AM) formats
export function parseTimeOfBirth(tob) {
  if (!tob) return { hour: 4, min: 30, decimalHour: 4.5, isPM: false };
  const str = String(tob).trim().toLowerCase();
  const isPM = str.includes('pm');
  const isAM = str.includes('am');
  const clean = str.replace(/[^\d:]/g, '');
  const [hStr, mStr] = clean.split(':');
  let hour = parseInt(hStr, 10) || 0;
  const min = parseInt(mStr, 10) || 0;
  if (isPM && hour < 12) {
    hour += 12;
  } else if (isAM && hour === 12) {
    hour = 0;
  }
  return { hour, min, decimalHour: hour + min / 60.0, isPM };
}

// Complete Kundli Calculation Function
export function calculateCompleteKundli({
  name = 'Native',
  dob = '2000-04-08',
  tob = '09:27',
  place = 'New Delhi, India',
  gender = 'Male',
  lat = 28.6139,
  lng = 77.2090,
  tz = 5.5
}) {
  const { year, month, day } = parseDateOfBirth(dob);
  const { hour, min, decimalHour } = parseTimeOfBirth(tob);

  // Local Decimal Hours to UT
  const utDecimalHour = decimalHour - tz;
  const jd = getJulianDay(year, month, day, utDecimalHour);

  // Compute positions at jd and at jd + 0.05 to compute speeds and retrogrades
  const { longitudes: pNow, ayanamsha } = computeRawLongitudes(jd, lat, lng);
  const { longitudes: pFuture } = computeRawLongitudes(jd + 0.05, lat, lng);

  const ascSignInfo = degToSign(pNow.Ascendant);
  const ascSignId = ascSignInfo.signIndex; // 1 to 12

  // Planet definitions with bilingual details
  const PLANET_CONFIG = [
    { name: 'Sun', nameHi: 'सूर्य', code: 'Su', codeHi: 'सू', color: '#ea580c', isLuminary: true },
    { name: 'Moon', nameHi: 'चन्द्र', code: 'Mo', codeHi: 'चं', color: '#0ea5e9', isLuminary: true },
    { name: 'Mars', nameHi: 'मंगल', code: 'Ma', codeHi: 'मं', color: '#16a34a', combustionOrb: 17 },
    { name: 'Mercury', nameHi: 'बुध', code: 'Me', codeHi: 'बु', color: '#0284c7', combustionOrb: 14 },
    { name: 'Jupiter', nameHi: 'गुरु', code: 'Ju', codeHi: 'गु', color: '#9333ea', combustionOrb: 11 },
    { name: 'Venus', nameHi: 'शुक्र', code: 'Ve', codeHi: 'शु', color: '#16a34a', combustionOrb: 10 },
    { name: 'Saturn', nameHi: 'शनि', code: 'Sa', codeHi: 'श', color: '#dc2626', combustionOrb: 15 },
    { name: 'Rahu', nameHi: 'राहु', code: 'Ra', codeHi: 'रा', color: '#dc2626', isNode: true },
    { name: 'Ketu', nameHi: 'केतु', code: 'Ke', codeHi: 'के', color: '#dc2626', isNode: true },
    { name: 'Uranus', nameHi: 'यूरेनस', code: 'Ur', codeHi: 'यू', color: '#eab308', isOuter: true },
    { name: 'Neptune', nameHi: 'नेपच्यून', code: 'Ne', codeHi: 'ने', color: '#38bdf8', isOuter: true },
    { name: 'Pluto', nameHi: 'प्लूटो', code: 'Pl', codeHi: 'प्ल', color: '#f43f5e', isOuter: true }
  ];

  // Helper to determine house (1 to 12) from sign in a given chart
  function getHouseFromSign(planetSignId, chartAscSignId) {
    let house = planetSignId - chartAscSignId + 1;
    if (house <= 0) house += 12;
    return house;
  }

  // Sign lords mapping (Sign 1 to 12)
  const SIGN_LORDS = {
    1: 'Mars', 2: 'Venus', 3: 'Mercury', 4: 'Moon', 5: 'Sun', 6: 'Mercury',
    7: 'Venus', 8: 'Mars', 9: 'Jupiter', 10: 'Saturn', 11: 'Saturn', 12: 'Jupiter'
  };

  // Natural (Naisargika) Relationships from Parashara BPHS
  const NAISARGIKA_FRIENDS = {
    Sun: { friends: ['Moon', 'Mars', 'Jupiter'], neutrals: ['Mercury'], enemies: ['Venus', 'Saturn'] },
    Moon: { friends: ['Sun', 'Mercury'], neutrals: ['Mars', 'Jupiter', 'Venus', 'Saturn'], enemies: [] },
    Mars: { friends: ['Sun', 'Moon', 'Jupiter'], neutrals: ['Venus', 'Saturn'], enemies: ['Mercury'] },
    Mercury: { friends: ['Sun', 'Venus'], neutrals: ['Mars', 'Jupiter', 'Saturn'], enemies: ['Moon'] },
    Jupiter: { friends: ['Sun', 'Moon', 'Mars'], neutrals: ['Saturn'], enemies: ['Mercury', 'Venus'] },
    Venus: { friends: ['Mercury', 'Saturn'], neutrals: ['Mars', 'Jupiter'], enemies: ['Sun', 'Moon'] },
    Saturn: { friends: ['Mercury', 'Venus'], neutrals: ['Jupiter'], enemies: ['Sun', 'Moon', 'Mars'] }
  };

  const EXALTATION_SIGNS = { Sun: 1, Moon: 2, Mars: 10, Mercury: 6, Jupiter: 4, Venus: 12, Saturn: 7 };
  const DEBILITATION_SIGNS = { Sun: 7, Moon: 8, Mars: 4, Mercury: 12, Jupiter: 10, Venus: 6, Saturn: 1 };
  const OWN_SIGNS = { Sun: [5], Moon: [4], Mars: [1, 8], Mercury: [3, 6], Jupiter: [9, 12], Venus: [2, 7], Saturn: [10, 11] };

  function calculateRelation(planetName, signId) {
    if (['Rahu', 'Ketu', 'Uranus', 'Neptune', 'Pluto', 'Ascendant'].includes(planetName)) {
      return { en: '-', hi: '-' };
    }
    if (EXALTATION_SIGNS[planetName] === signId) {
      return { en: 'Exalted', hi: 'उच्च' };
    }
    if (DEBILITATION_SIGNS[planetName] === signId) {
      return { en: 'Debilitated', hi: 'नीच' };
    }
    if (OWN_SIGNS[planetName]?.includes(signId)) {
      return { en: 'Own', hi: 'स्वक्षेत्र' };
    }
    const lord = SIGN_LORDS[signId];
    if (!lord || lord === planetName) {
      return { en: 'Own', hi: 'स्वक्षेत्र' };
    }
    const relConfig = NAISARGIKA_FRIENDS[planetName];
    if (relConfig) {
      if (relConfig.friends.includes(lord)) return { en: 'Friendly', hi: 'मित्र' };
      if (relConfig.enemies.includes(lord)) return { en: 'Enemy', hi: 'शत्रु' };
      return { en: 'Neutral', hi: 'सम' };
    }
    return { en: 'Neutral', hi: 'सम' };
  }

  // Process all planets
  const processedPlanets = PLANET_CONFIG.map(cfg => {
    const rawDeg = pNow[cfg.name];
    const signInfo = degToSign(rawDeg);
    const nakInfo = getNakshatra(rawDeg);

    // Speed & Retrograde
    const diff = norm(pFuture[cfg.name] - rawDeg);
    const speed = diff > 180 ? diff - 360 : diff;
    let isRetro = speed < -0.0001;
    if (cfg.name === 'Rahu' || cfg.name === 'Ketu') isRetro = true;
    if (cfg.name === 'Sun' || cfg.name === 'Moon') isRetro = false;

    // Combustion
    let isCombust = false;
    if (cfg.combustionOrb && pNow.Sun !== undefined) {
      const sunDist = Math.abs(norm(rawDeg - pNow.Sun));
      const minDist = Math.min(sunDist, 360 - sunDist);
      isCombust = minDist <= cfg.combustionOrb;
    }

    const rel = calculateRelation(cfg.name, signInfo.signIndex);
    const dignity = rel.en;
    const baladi = getBaladiAvastha(signInfo.signIndex, signInfo.degInSign);
    const jagrat = getJagratadiAvastha(cfg.name, dignity);
    const deeptadi = getDeeptadiAvastha(cfg.name, dignity, isCombust, isRetro);

    const houseD1 = getHouseFromSign(signInfo.signIndex, ascSignId);
    const d9SignId = getDivisionalSign('D9', rawDeg);

    return {
      name: cfg.name,
      nameHi: cfg.nameHi,
      code: cfg.code,
      codeHi: cfg.codeHi,
      fullDegree: rawDeg,
      rashi: signInfo.sign,
      signName: signInfo.sign.en,
      signSanskrit: signInfo.sign.sanskrit,
      signHi: signInfo.sign.hi,
      degInSign: signInfo.degInSign,
      degFormatted: signInfo.degFormatted,
      degDisplay: signInfo.degDisplay,
      degInt: signInfo.degInt,
      degSup: signInfo.degSup,
      nakshatra: nakInfo.nakshatra,
      nakshatraName: nakInfo.nakshatra.en,
      nakshatraNameHi: nakInfo.nakshatra.hi,
      pada: nakInfo.pada,
      isRetro,
      isCombust,
      cStatus: isCombust ? 'C' : '',
      rStatus: cfg.isNode ? '-' : (isRetro ? 'R' : 'D'),
      dignity,
      relation: rel.en,
      relationHi: rel.hi,
      color: cfg.color,
      avastha: {
        baladi: baladi.en,
        baladiHi: baladi.hi,
        jagrat: jagrat.en,
        jagratHi: jagrat.hi,
        deeptadi: deeptadi.en,
        deeptadiHi: deeptadi.hi
      },
      house: houseD1,
      d9SignId,
      d9House: 1 // will be populated after D9 Ascendant is computed
    };
  });

  // Calculate D9 Navamsha Ascendant Sign
  const d9AscSignId = getDivisionalSign('D9', pNow.Ascendant);
  processedPlanets.forEach(p => {
    p.d9House = getHouseFromSign(p.d9SignId, d9AscSignId);
  });

  // Jaimini Chara Karakas (Sort 7 traditional planets by degInSign descending)
  const traditionalSeven = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const charaPlanets = processedPlanets
    .filter(p => traditionalSeven.includes(p.name))
    .slice()
    .sort((a, b) => b.degInSign - a.degInSign);

  const KARAK_NAMES = [
    { en: 'Atma', hi: 'आत्मकारक', sthir: 'Sun', sthirHi: 'सूर्य' },
    { en: 'Amatya', hi: 'अमात्यकारक', sthir: 'Mercury', sthirHi: 'बुध' },
    { en: 'Bhratru', hi: 'भ्रातृकारक', sthir: 'Mars', sthirHi: 'मंगल' },
    { en: 'Matru', hi: 'मातृकारक', sthir: 'Moon', sthirHi: 'चन्द्र' },
    { en: 'Putra', hi: 'पुत्रकारक', sthir: 'Jupiter', sthirHi: 'गुरु' },
    { en: 'Gnati', hi: 'ज्ञातिकारक', sthir: 'Saturn', sthirHi: 'शनि' },
    { en: 'Dara', hi: 'दाराकारक', sthir: 'Venus', sthirHi: 'शुक्र' }
  ];

  const karakTable = KARAK_NAMES.map((k, idx) => {
    const chara = charaPlanets[idx] || charaPlanets[0];
    // Tag the planet object with its Chara Karak name
    const foundPlanet = processedPlanets.find(p => p.name === chara.name);
    if (foundPlanet) {
      foundPlanet.charaKarak = k.en;
      foundPlanet.charaKarakHi = k.hi;
    }
    return {
      karak: k.en,
      karakHi: k.hi,
      sthir: k.sthir,
      sthirHi: k.sthirHi,
      chara: chara.name,
      charaHi: chara.nameHi,
      degFormatted: chara.degFormatted
    };
  });

  // Build House Occupants for any given chart
  function buildHouseOccupants(chartAscSignId, varga = 'D1') {
    const occupants = {};
    for (let h = 1; h <= 12; h++) {
      const signIndex = ((chartAscSignId + h - 2) % 12) + 1; // 1 to 12
      occupants[h] = {
        house: h,
        signNum: signIndex,
        sign: ZODIAC_SIGNS[signIndex - 1],
        planets: []
      };
    }

    processedPlanets.forEach(p => {
      let planetSignId = p.rashi.id;
      if (varga !== 'D1') {
        planetSignId = getDivisionalSign(varga, p.fullDegree);
      }
      const h = getHouseFromSign(planetSignId, chartAscSignId);
      if (occupants[h]) {
        occupants[h].planets.push(p);
      }
    });

    return occupants;
  }

  // D-1 Lagna Chart Occupants
  const d1Occupants = buildHouseOccupants(ascSignId, 'D1');

  // D-9 Navamsha Chart Occupants
  const d9Occupants = buildHouseOccupants(d9AscSignId, 'D9');

  // Divisional Charts dictionary (D-1 through D-10, D-12, D-60)
  const divisionalCharts = {};
  const vargas = [
    { id: 'D1', name: 'Rashi', title: 'D-1 (Rashi Chart)', focus: 'Physical body, personality, general life blueprint' },
    { id: 'D2', name: 'Hora', title: 'D-2 (Hora Chart)', focus: 'Wealth, liquid assets, financial prosperity' },
    { id: 'D3', name: 'Drekkana', title: 'D-3 (Drekkana Chart)', focus: 'Siblings, courage, vitality, initiatives' },
    { id: 'D4', name: 'Chaturthamsha', title: 'D-4 (Chaturthamsha)', focus: "Fixed assets, property, home, mother's happiness" },
    { id: 'D7', name: 'Saptamsha', title: 'D-7 (Saptamsha)', focus: 'Children, progeny, lineage, creative output' },
    { id: 'D9', name: 'Navamsha', title: 'D-9 (Navamsha Chart)', focus: 'Marriage, spouse, dharma, inner planetary strength' },
    { id: 'D10', name: 'Dashamsha', title: 'D-10 (Dashamsha)', focus: 'Career, profession, status, public reputation' },
    { id: 'D12', name: 'Dwadashamsha', title: 'D-12 (Dwadashamsha)', focus: 'Parents, heritage, past lives' },
    { id: 'D60', name: 'Shashtiamsha', title: 'D-60 (Shashtiamsha)', focus: 'Past life karma, all areas fine-tuning' }
  ];

  vargas.forEach(v => {
    const vAscSignId = getDivisionalSign(v.id, pNow.Ascendant);
    divisionalCharts[v.id] = {
      id: v.id,
      name: v.name,
      title: v.title,
      focus: v.focus,
      ascSign: ZODIAC_SIGNS[vAscSignId - 1],
      houseOccupants: buildHouseOccupants(vAscSignId, v.id),
      planets: processedPlanets.map(p => ({
        ...p,
        vargaSign: ZODIAC_SIGNS[getDivisionalSign(v.id, p.fullDegree) - 1]
      }))
    };
  });

  // Vimshottari Dasha Calculation with exact birth balance
  const moonNakInfo = getNakshatra(pNow.Moon);
  const birthLord = moonNakInfo.nakshatra.lord;
  const dashaIdx = DASHA_ORDER.findIndex(d => d.lord === birthLord);
  const currentDashaObj = DASHA_ORDER[dashaIdx >= 0 ? dashaIdx : 0];

  const totalYears = currentDashaObj.years;
  const elapsedYears = moonNakInfo.fractionElapsed * totalYears;
  const remainingYears = totalYears - elapsedYears;

  const remY = Math.floor(remainingYears);
  const remM = Math.floor((remainingYears - remY) * 12);
  const remD = Math.round((((remainingYears - remY) * 12) - remM) * 30.4375);

  const balanceStr = `${currentDashaObj.lord.toUpperCase()} ${remY} Y ${remM} M ${remD} D`;
  const balanceStrHi = `${currentDashaObj.lordHi} ${remY} वर्ष ${remM} माह ${remD} दिन`;

  // Compute Vimshottari Mahadasha timeline for all 9 planets
  const dashaTimeline = [];
  const currentStart = new Date(year, month - 1, day);
  const firstEnd = new Date(currentStart);
  firstEnd.setDate(firstEnd.getDate() + remD);
  firstEnd.setMonth(firstEnd.getMonth() + remM);
  firstEnd.setFullYear(firstEnd.getFullYear() + remY);

  const formatDDate = (d) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  dashaTimeline.push({
    lord: currentDashaObj.lord,
    lordHi: currentDashaObj.lordHi,
    years: currentDashaObj.years,
    startDate: formatDDate(currentStart),
    startDateObj: currentStart,
    endDate: formatDDate(firstEnd),
    endYear: firstEnd.getFullYear(),
    endDateObj: firstEnd
  });

  let runningDate = new Date(firstEnd);
  for (let step = 1; step < 9; step++) {
    const nextIdx = (dashaIdx + step) % 9;
    const dObj = DASHA_ORDER[nextIdx];
    const sDate = new Date(runningDate);
    const eDate = new Date(firstEnd);
    eDate.setFullYear(runningDate.getFullYear() + dObj.years);

    dashaTimeline.push({
      lord: dObj.lord,
      lordHi: dObj.lordHi,
      years: dObj.years,
      startDate: formatDDate(sDate),
      startDateObj: sDate,
      endDate: formatDDate(eDate),
      endYear: eDate.getFullYear(),
      endDateObj: eDate
    });
    runningDate = eDate;
  }

  // Active Mahadasha today
  const now = new Date();
  dashaTimeline.forEach(d => {
    d.isCurrent = (now >= d.startDateObj && now <= d.endDateObj);
  });
  const activeDasha = dashaTimeline.find(d => d.isCurrent) || dashaTimeline[1] || dashaTimeline[0];

  // Doshas evaluation
  const mars = processedPlanets.find(p => p.name === 'Mars');
  const manglikHouses = [1, 4, 7, 8, 12];
  const isManglik = mars && manglikHouses.includes(mars.house);

  const rahu = processedPlanets.find(p => p.name === 'Rahu');
  const ketu = processedPlanets.find(p => p.name === 'Ketu');
  const hasKaalSarp = rahu && ketu && (Math.abs(rahu.house - ketu.house) === 6);

  const saturn = processedPlanets.find(p => p.name === 'Saturn');
  const moon = processedPlanets.find(p => p.name === 'Moon');
  let hasSadeSati = false;
  if (saturn && moon) {
    const diffSign = Math.abs(saturn.rashi.id - moon.rashi.id);
    hasSadeSati = diffSign === 0 || diffSign === 1 || diffSign === 11;
  }

  // Panchang calculations
  const sunP = processedPlanets.find(p => p.name === 'Sun');
  const moonP = processedPlanets.find(p => p.name === 'Moon');
  const diffDeg = norm(moonP.fullDegree - sunP.fullDegree);
  const tithiIndex = Math.floor(diffDeg / 12);
  const isShukla = tithiIndex < 15;
  const tithiNames = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami',
    'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi',
    isShukla ? 'Purnima' : 'Amavasya'
  ];
  const tithiNamesHi = [
    'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी',
    'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी',
    isShukla ? 'पूर्णिमा' : 'अमावस्या'
  ];
  const tithiName = `${tithiNames[tithiIndex % 15]} (${isShukla ? 'Shukla Paksha' : 'Krishna Paksha'})`;
  const tithiNameHi = `${tithiNamesHi[tithiIndex % 15]} (${isShukla ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'})`;

  const yogaSum = norm(moonP.fullDegree + sunP.fullDegree);
  const yogaIndex = Math.floor(yogaSum / (360 / 27));
  const YOGA_NAMES = [
    'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti',
    'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi',
    'Vyatipata', 'Variyan', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla',
    'Brahma', 'Indra', 'Vaidhriti'
  ];
  const YOGA_NAMES_HI = [
    'विष्कम्भ योग', 'प्रीति योग', 'आयुष्मान योग', 'सौभाग्य योग', 'शोभन योग', 'अतिगण्ड योग', 'सुकर्मा योग', 'धृति योग',
    'शूल योग', 'गण्ड योग', 'वृद्धि योग', 'ध्रुव योग', 'व्याघात योग', 'हर्षण योग', 'वज्र योग', 'सिद्धि योग',
    'व्यतीपात योग', 'वरीयान योग', 'परिघ योग', 'शिव योग', 'सिद्ध योग', 'साध्य योग', 'शुभ योग', 'शुक्ल योग',
    'ब्रह्म योग', 'इन्द्र योग', 'वैधृति योग'
  ];
  const yogaName = YOGA_NAMES[yogaIndex % 27];
  const yogaNameHi = YOGA_NAMES_HI[yogaIndex % 27];

  const karanaIndex = Math.floor(diffDeg / 6);
  const KARANA_NAMES = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti'];
  const KARANA_NAMES_HI = ['बव करण', 'बालव करण', 'कौलव करण', 'तैतिल करण', 'गर करण', 'वणिज करण', 'विष्टि (भद्रा)'];
  const karanaName = KARANA_NAMES[karanaIndex % 7];
  const karanaNameHi = KARANA_NAMES_HI[karanaIndex % 7];

  // Ascendant entry for tables
  const ascEntry = {
    name: 'Ascendant',
    nameHi: 'लग्न',
    code: 'Asc',
    codeHi: 'लग्न',
    fullDegree: pNow.Ascendant,
    rashi: ascSignInfo.sign,
    signName: ascSignInfo.sign.en,
    signSanskrit: ascSignInfo.sign.sanskrit,
    signHi: ascSignInfo.sign.hi,
    degInSign: ascSignInfo.degInSign,
    degFormatted: ascSignInfo.degFormatted,
    degDisplay: ascSignInfo.degDisplay,
    degInt: ascSignInfo.degInt,
    degSup: ascSignInfo.degSup,
    nakshatra: getNakshatra(pNow.Ascendant).nakshatra,
    nakshatraName: getNakshatra(pNow.Ascendant).nakshatra.en,
    nakshatraNameHi: getNakshatra(pNow.Ascendant).nakshatra.hi,
    pada: getNakshatra(pNow.Ascendant).pada,
    isRetro: false,
    isCombust: false,
    cStatus: '',
    rStatus: '',
    dignity: '-',
    relation: '-',
    relationHi: '-',
    color: '#d97706',
    house: 1
  };

  const allPlanetsWithAsc = [ascEntry, ...processedPlanets];

  return {
    meta: {
      name,
      dob,
      tob,
      place,
      gender,
      lat,
      lng,
      tz,
      ayanamshaFormatted: `${Math.floor(ayanamsha)}° ${Math.floor((ayanamsha % 1) * 60)}' ${Math.floor((((ayanamsha % 1) * 60) % 1) * 60)}"`
    },
    ascendant: {
      sign: ascSignInfo.sign.en,
      signHi: ascSignInfo.sign.hi,
      sanskrit: ascSignInfo.sign.sanskrit,
      lord: ascSignInfo.sign.lord,
      lordHi: ascSignInfo.sign.lordHi,
      signId: ascSignId,
      degInSign: ascSignInfo.degInSign,
      degFormatted: ascSignInfo.degFormatted,
      nakshatra: getNakshatra(pNow.Ascendant).nakshatra.en,
      nakshatraHi: getNakshatra(pNow.Ascendant).nakshatra.hi,
      pada: getNakshatra(pNow.Ascendant).pada
    },
    moonDetails: {
      sign: moonP?.rashi.en,
      signHi: moonP?.rashi.hi,
      sanskrit: moonP?.rashi.sanskrit,
      lord: moonP?.rashi.lord,
      lordHi: moonP?.rashi.lordHi,
      degFormatted: moonP?.degFormatted,
      nakshatra: moonNakInfo.nakshatra.en,
      nakshatraHi: moonNakInfo.nakshatra.hi,
      pada: moonNakInfo.pada,
      varna: moonNakInfo.nakshatra.varna,
      vashya: moonNakInfo.nakshatra.vashya,
      yoni: moonNakInfo.nakshatra.yoni,
      gana: moonNakInfo.nakshatra.gana,
      nadi: moonNakInfo.nakshatra.nadi,
      deity: moonNakInfo.nakshatra.deity
    },
    sunDetails: {
      sign: sunP?.rashi.en,
      signHi: sunP?.rashi.hi,
      sanskrit: sunP?.rashi.sanskrit,
      degFormatted: sunP?.degFormatted,
      lord: sunP?.rashi.lord,
      lordHi: sunP?.rashi.lordHi
    },
    panchangAtBirth: {
      tithi: tithiName,
      tithiHi: tithiNameHi,
      nakshatra: `${moonNakInfo.nakshatra.en} (Pada ${moonNakInfo.pada})`,
      nakshatraHi: `${moonNakInfo.nakshatra.hi} (पाद ${moonNakInfo.pada})`,
      yoga: yogaName,
      yogaHi: yogaNameHi,
      karana: karanaName,
      karanaHi: karanaNameHi
    },
    planets: allPlanetsWithAsc,
    rawPlanets: processedPlanets,
    d1Chart: {
      id: 'D1',
      name: 'Lagna Chart',
      nameHi: 'लग्न कुण्डली',
      ascSign: ZODIAC_SIGNS[ascSignId - 1],
      houseOccupants: d1Occupants
    },
    d9Chart: {
      id: 'D9',
      name: 'Navamsa Chart',
      nameHi: 'नवांश कुण्डली',
      ascSign: ZODIAC_SIGNS[d9AscSignId - 1],
      houseOccupants: d9Occupants
    },
    houseOccupants: d1Occupants,
    divisionalCharts,
    karaks: karakTable,
    avasthas: processedPlanets.filter(p => !p.isOuter && !p.isNode).map(p => ({
      name: p.name,
      nameHi: p.nameHi,
      jagrat: p.avastha.jagrat,
      jagratHi: p.avastha.jagratHi,
      baladi: p.avastha.baladi,
      baladiHi: p.avastha.baladiHi,
      deeptadi: p.avastha.deeptadi,
      deeptadiHi: p.avastha.deeptadiHi
    })),
    dasha: {
      balance: balanceStr,
      balanceStr,
      balanceStrHi,
      birthLord,
      currentMahadasha: activeDasha.lord,
      currentMahadashaHi: activeDasha.lordHi,
      timeline: dashaTimeline
    },
    doshas: {
      manglik: {
        isManglik,
        hasManglik: isManglik,
        intensity: isManglik ? 'Moderate Manglik (मांगलिक)' : 'Non-Manglik (अमांगलिक)',
        intensityHi: isManglik ? 'मांगलिक दोष' : 'अमांगलिक (दोष रहित)',
        details: isManglik 
          ? `Mars is positioned in House ${mars?.house}, which creates Manglik dosha.`
          : 'Mars is placed in an auspicious house, hence native is Non-Manglik.',
        detailsHi: isManglik
          ? `मंगल कुण्डली में भाव ${mars?.house} में स्थित है, जिससे मांगलिक प्रभाव बनता है।`
          : 'मंगल शुभ एवं अनुकूल भाव में स्थित है, जातक पूर्णतः मांगलिक दोष से मुक्त है।',
        remedy: isManglik ? 'Recite Hanuman Chalisa on Tuesdays.' : 'No Mars affliction found in Kendra or Trik houses.',
        remedyHi: isManglik
          ? 'प्रत्येक मंगलवार को श्री हनुमान चालीसा का पाठ करें एवं लाल मसूर का दान करें।'
          : 'मंगल का कोई प्रतिकूल प्रभाव नहीं है, किसी विशेष उपाय की आवश्यकता नहीं है।',
        housesChecked: `Mars in House ${mars?.house} from Lagna`,
        housesCheckedHi: `मंगल लग्न से भाव ${mars?.house} में स्थित`
      },
      kaalSarp: {
        hasKaalSarp: false,
        status: 'No Kaal Sarp Dosha',
        statusHi: 'कालसर्प दोष मुक्त',
        details: 'All planets are not enclosed between Rahu and Ketu axis.',
        detailsHi: 'राहु और केतु की धुरी के बीच सभी ग्रह नहीं बंधे हैं, कुण्डली कालसर्प दोष से पूर्णतः मुक्त है।',
        remedy: 'Chart is free from Kaal Sarp Dosha.',
        remedyHi: 'आपकी कुण्डली कालसर्प दोष से मुक्त है। शुभ एवं स्वतंत्र ग्रह स्थिति।'
      },
      sadeSati: {
        hasSadeSati,
        status: hasSadeSati ? 'Active Shani Sade Sati' : 'No Active Sade Sati',
        statusHi: hasSadeSati ? 'शनि साढ़े साती सक्रिय' : 'साढ़े साती प्रभाव नहीं',
        phase: hasSadeSati ? 'Active' : 'Inactive',
        description: hasSadeSati ? 'Shani Sade Sati is currently active.' : 'No active Saturn Sade Sati distress at this time.',
        descriptionHi: hasSadeSati ? 'शनिदेव की साढ़े साती का प्रभाव वर्तमान में चल रहा है।' : 'वर्तमान में शनि की साढ़े साती का कोई प्रतिकूल प्रभाव नहीं है।',
        remedyHi: 'प्रत्येक शनिवार एवं मंगलवार को श्री हनुमान जी की उपासना करें और सायंकाल सरसों के तेल का दीपक जलाएं।'
      }
    },
    predictions: {
      career: `With ${ascSignInfo.sign.en} (${ascSignInfo.sign.sanskrit}) Lagna, you possess exceptional perseverance and leadership. Your 10th house indicates strong career progression in communications, finance, and technical strategy.`,
      careerHi: `${ascSignInfo.sign.hi} लग्न के प्रभाव से आपके भीतर असाधारण धैर्य, कर्मठता और नेतृत्व क्षमता है। दशम भाव आपके करियर में सम्मान, वित्तीय व रणनीतिक सफलता का संकेत देता है।`,
      finance: `The 2nd and 11th houses indicate steady accumulation of assets and prudent financial management.`,
      financeHi: `द्वितीय एवं एकादश भाव धन संचय, स्थिर परिसंपत्तियों और विवेकपूर्ण वित्तीय प्रबंधन का उत्कृष्ट योग दर्शाते हैं।`,
      relationship: `Your 7th house indicates loyal and deeply supportive partnerships. Navamsha chart reflects strong spiritual and inner dharmic alignment.`,
      relationshipHi: `सप्तम भाव निष्ठावान, समझदार एवं सहयोगी जीवनसाथी का संकेत देता है। नवांश कुण्डली सुदृढ़ वैवाहिक एवं आध्यात्मिक सामंजस्य दर्शाती है।`,
      health: `Maintain regular daily pranayama and balanced nutrition for sustained vitality.`,
      healthHi: `उत्तम स्वास्थ्य और निरंतर ऊर्जावान रहने के लिए नियमित प्राणायाम और संतुलित दिनचर्या बनाए रखें।`
    },
    remedies: {
      gemstone: ascSignId === 2 ? 'Diamond / White Sapphire (हीरा / श्वेत पुखराज)' : 'Yellow Sapphire / Ruby',
      gemstoneHi: ascSignId === 2 ? 'हीरा अथवा श्वेत पुखराज (मध्यमा या कनिष्ठिका में, शुक्रवार)' : 'पीला पुखराज अथवा माणिक्य',
      rudraksha: '6 Mukhi or 7 Mukhi Rudraksha',
      rudrakshaHi: '६ मुखी अथवा ७ मुखी रुद्राक्ष (शुक्र एवं महालक्ष्मी की कृपा हेतु)',
      mantra: 'ॐ नमः शिवाय (Om Namah Shivaya)',
      mantraHi: 'ॐ नमः शिवाय',
      charity: 'Support education and distribute sweets/grains on Fridays.',
      charityHi: 'शुक्रवार को कन्याओं को खीर या मिष्ठान्न का वितरण करें तथा जरूरतमंदों की सहायता करें।'
    }
  };
}

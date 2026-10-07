// Vedic Astrology Calculations Engine
// High-Precision Bridge to astronomyEngine (NASA JPL / Meeus + True Chitrapaksha Lahiri Ayanamsha)

import {
  calculateCompleteKundli,
  ZODIAC_SIGNS,
  NAKSHATRAS,
  DASHA_ORDER,
  parseDateOfBirth,
  parseTimeOfBirth,
  getJulianDay,
  getLahiriAyanamsha,
  degToSign,
  getNakshatra,
  getDivisionalSign,
  norm,
  toDeg,
  toRad
} from './astronomyEngine.js';

export {
  ZODIAC_SIGNS,
  NAKSHATRAS,
  DASHA_ORDER,
  parseDateOfBirth,
  parseTimeOfBirth,
  getJulianDay,
  getLahiriAyanamsha,
  degToSign,
  getNakshatra,
  getDivisionalSign,
  norm,
  toDeg,
  toRad
};

// Meta information for all Divisional & Special Charts
export const DIVISIONAL_CHARTS_META = [
  { id: 'D1', name: 'Rashi (D1)', nameHi: 'लग्न (D1)', title: 'D-1 (Lagna / Rashi Chart)', focus: 'Physical body, personality, core life blueprint' },
  { id: 'D9', name: 'Navamsha (D9)', nameHi: 'नवांश (D9)', title: 'D-9 (Navamsha Chart)', focus: 'Marriage, spouse, dharma, inner planetary strength' },
  { id: 'D10', name: 'Dashamsha (D10)', nameHi: 'दशमांश (D10)', title: 'D-10 (Dashamsha)', focus: 'Career, profession, status, public reputation' },
  { id: 'PANCHANG', name: 'Panchang', nameHi: 'पंचांग चक्र', title: 'Janma Panchang Tatva Chart', focus: 'Five Cosmic Elements (Pancha Mahabhuta) at birth' },
  { id: 'GOCHAR', name: 'Gochar', nameHi: 'गोचर (ग्रह गोचर)', title: 'Gochar (Live Transit Overlay Chart)', focus: 'Real-time planetary transits active in the sky today' },
  { id: 'BHAV_CHALIT', name: 'Bhav Chalit', nameHi: 'भाव चलित', title: 'Bhav Chalit (Equal Bhava Cusp Chart)', focus: 'Actual physical house cusps and shifted planetary placements' },
  { id: 'D2', name: 'Hora (D2)', nameHi: 'होरा (D2)', title: 'D-2 (Hora Chart)', focus: 'Wealth, liquid assets, financial prosperity' },
  { id: 'D3', name: 'Drekkana (D3)', nameHi: 'द्रेष्काण (D3)', title: 'D-3 (Drekkana Chart)', focus: 'Siblings, courage, vitality, initiatives' },
  { id: 'D4', name: 'Chaturthamsha (D4)', nameHi: 'चतुर्थांश (D4)', title: 'D-4 (Chaturthamsha)', focus: "Fixed assets, property, home, mother's happiness" },
  { id: 'D5', name: 'Panchamsha (D5)', nameHi: 'पंचमांश (D5)', title: 'D-5 (Panchamsha)', focus: 'Spiritual inclination, higher wisdom, fame' },
  { id: 'D6', name: 'Shashthamsha (D6)', nameHi: 'षष्ठांश (D6)', title: 'D-6 (Shashthamsha)', focus: 'Health, litigation, debts, enemies & service' },
  { id: 'D7', name: 'Saptamsha (D7)', nameHi: 'सप्तांश (D7)', title: 'D-7 (Saptamsha)', focus: 'Children, progeny, lineage, creative output' },
  { id: 'D8', name: 'Ashtamsha (D8)', nameHi: 'अष्टमांश (D8)', title: 'D-8 (Ashtamsha)', focus: 'Longevity, occult, transformations, sudden events' },
  { id: 'D12', name: 'Dwadashamsha (D12)', nameHi: 'द्वादशांश (D12)', title: 'D-12 (Dwadashamsha)', focus: 'Parents, ancestral lineage, past lives' },
  { id: 'D60', name: 'Shashtiamsha (D60)', nameHi: 'षष्ट्यंश (D60)', title: 'D-60 (Shashtiamsha)', focus: 'Past life karma, all matters fine-tuning' }
];

export function calculateDivisionalSign(vargaId, degree) {
  return getDivisionalSign(vargaId, degree);
}

/**
 * High-Precision Kundli Calculator
 * Seamlessly interfaces with all components, providing accurate NASA JPL ephemeris positions,
 * true Lahiri Ayanamsha, side-by-side Lagna & Navamsa charts, Jaimini Karakas, and Parashari Avasthas.
 */
export function calculateKundli(params) {
  return calculateCompleteKundli(params);
}

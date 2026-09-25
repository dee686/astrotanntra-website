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
  { id: 'D12', name: 'Dwadashamsha', title: 'D-12 (Dwadashamsha)', focus: 'Parents, ancestral lineage, past lives' },
  { id: 'D60', name: 'Shashtiamsha', title: 'D-60 (Shashtiamsha)', focus: 'All matters, fine-tuning of destiny, deep karma' },
  { id: 'PANCHANG', name: 'Janma Panchang', title: 'Panchang Tatva Chart', focus: 'Five Cosmic Elements (Pancha Mahabhuta) at birth' }
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

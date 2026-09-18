// Numerology Engine (Pythagorean & Chaldean)
// Calculates Life Path Number, Destiny Number, Soul Urge Number

export function calculateLifePath(dob) {
  if (!dob) return 1;
  const digits = dob.replace(/[^0-9]/g, '');
  let sum = 0;
  for (let ch of digits) {
    sum += parseInt(ch, 10);
  }
  return reduceToSingleDigit(sum);
}

export function calculateDestinyNumber(fullName) {
  if (!fullName) return 1;
  const charValues = {
    A: 1, I: 1, J: 1, Q: 1, Y: 1,
    B: 2, K: 2, R: 2,
    C: 3, G: 3, L: 3, S: 3,
    D: 4, M: 4, T: 4,
    E: 5, H: 5, N: 5, X: 5,
    U: 6, V: 6, W: 6,
    O: 7, Z: 7,
    F: 8, P: 8
  };
  let sum = 0;
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  for (let ch of cleanName) {
    sum += charValues[ch] || 0;
  }
  return reduceToSingleDigit(sum);
}

function reduceToSingleDigit(num) {
  // Check master numbers 11, 22, 33
  if (num === 11 || num === 22 || num === 33) return num;
  while (num > 9) {
    let s = 0;
    for (let c of String(num)) {
      s += parseInt(c, 10);
    }
    num = s;
    if (num === 11 || num === 22 || num === 33) return num;
  }
  return num;
}

export const NUMBER_MEANINGS = {
  1: {
    title: 'The Pioneer & Leader',
    ruler: 'Sun',
    traits: ['Independent', 'Ambitious', 'Courageous', 'Self-Motivated'],
    desc: 'You are destined for creative individuality, trailblazing leadership, and confident executive decision making.'
  },
  2: {
    title: 'The Diplomat & Peacemaker',
    ruler: 'Moon',
    traits: ['Empathetic', 'Intuitive', 'Cooperative', 'Harmonious'],
    desc: 'You thrive in partnerships, mediation, deep emotional wisdom, and bringing graceful peace to conflict.'
  },
  3: {
    title: 'The Creative Communicator',
    ruler: 'Jupiter',
    traits: ['Expressive', 'Charismatic', 'Artistic', 'Optimistic'],
    desc: 'Your natural verbal and artistic gifts inspire others. You bring lighthearted optimism, wisdom, and joy.'
  },
  4: {
    title: 'The Master Builder',
    ruler: 'Rahu / Uranus',
    traits: ['Disciplined', 'Methodical', 'Trustworthy', 'Grounded'],
    desc: 'You establish strong enduring structures, practical systems, and reliable stability through steadfast hard work.'
  },
  5: {
    title: 'The Dynamic Explorer',
    ruler: 'Mercury',
    traits: ['Adventurous', 'Adaptable', 'Versatile', 'Free-Spirited'],
    desc: 'You crave intellectual freedom, diverse experiences, travel, and inspiring positive transformation in society.'
  },
  6: {
    title: 'The Nurturing Guardian',
    ruler: 'Venus',
    traits: ['Loving', 'Responsible', 'Aesthetic', 'Protective'],
    desc: 'Your soul is centered around family, unconditional compassion, service, and creating beauty in your community.'
  },
  7: {
    title: 'The Mystic Seeker',
    ruler: 'Ketu / Neptune',
    traits: ['Philosophical', 'Analytical', 'Intuitive', 'Spiritual'],
    desc: 'You possess a deep quest for universal truth, esoteric knowledge, research, meditation, and spiritual enlightenment.'
  },
  8: {
    title: 'The Powerhouse & Achiever',
    ruler: 'Saturn',
    traits: ['Authoritative', 'Abundant', 'Resilient', 'Strategic'],
    desc: 'You master material and financial stewardship, executive influence, karmic balance, and large-scale enterprises.'
  },
  9: {
    title: 'The Universal Humanitarian',
    ruler: 'Mars',
    traits: ['Compassionate', 'Generous', 'Wise', 'Visionary'],
    desc: 'You embody selfless humanitarian service, universal empathy, artistic inspiration, and spiritual completion.'
  },
  11: {
    title: 'Master Number 11: The Illuminated Seer',
    ruler: 'Higher Spiritual Vibration',
    traits: ['Psychic Intuition', 'Inspirational', 'Visionary', 'Spiritual Teacher'],
    desc: 'A rare master vibration of heightened psychic intuition, illumination, and bridging spiritual realms.'
  },
  22: {
    title: 'Master Number 22: The Master Architect',
    ruler: 'Divine Construction',
    traits: ['Visionary Execution', 'Grand Scale', 'Pragmatic Genius', 'Global Impact'],
    desc: 'You hold the power to turn grand spiritual ideals into concrete, world-changing infrastructure.'
  },
  33: {
    title: 'Master Number 33: The Master Healer',
    ruler: 'Universal Compassion',
    traits: ['Divine Love', 'Selfless Devotion', 'Spiritual Upliftment', 'Cosmic Teacher'],
    desc: 'The highest avatar of unconditional divine love, profound spiritual guidance, and healing mankind.'
  }
};

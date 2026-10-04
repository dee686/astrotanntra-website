/**
 * ASTROTANNTRA - Weekly Horoscope Service
 * Provides dynamic real-time weekly duration calculation and custom horoscope persistence.
 * Allows authorized astrologer/editor to write and publish custom weekly horoscopes.
 */

const STORAGE_KEY = 'astrotanntra_weekly_horoscopes';

/**
 * Calculate dynamic real-time weekly duration (Monday to Sunday)
 * @param {string} lang - 'en' | 'hi'
 * @param {Date} [targetDate] - reference date (defaults to current date)
 * @returns {string} formatted date range, e.g. "Oct 5 – Oct 11, 2026" or "5 – 11 अक्टूबर, 2026"
 */
export function getWeeklyHoroscopeDuration(lang = 'en', targetDate = new Date()) {
  const d = new Date(targetDate);
  const day = d.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Calculate Monday of the current active week
  // If Sunday (0), it is day 7 of the Mon-Sun week
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const year = monday.getFullYear();
  const endYear = sunday.getFullYear();

  const monthNamesEn = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const monthNamesHi = [
    'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
  ];

  const startMonthEn = monthNamesEn[monday.getMonth()];
  const endMonthEn = monthNamesEn[sunday.getMonth()];
  const startMonthHi = monthNamesHi[monday.getMonth()];
  const endMonthHi = monthNamesHi[sunday.getMonth()];

  const startDay = monday.getDate();
  const endDay = sunday.getDate();

  if (lang === 'hi') {
    if (monday.getMonth() === sunday.getMonth()) {
      return `${startDay} – ${endDay} ${startMonthHi}, ${year}`;
    } else if (year === endYear) {
      return `${startDay} ${startMonthHi} – ${endDay} ${endMonthHi}, ${year}`;
    } else {
      return `${startDay} ${startMonthHi} ${year} – ${endDay} ${endMonthHi} ${endYear}`;
    }
  } else {
    if (monday.getMonth() === sunday.getMonth()) {
      return `${startMonthEn} ${startDay} – ${endDay}, ${year}`;
    } else if (year === endYear) {
      return `${startMonthEn} ${startDay} – ${endMonthEn} ${endDay}, ${year}`;
    } else {
      return `${startMonthEn} ${startDay}, ${year} – ${endMonthEn} ${endDay}, ${endYear}`;
    }
  }
}

/**
 * Retrieve all custom stored horoscopes from localStorage
 */
export function getCustomHoroscopes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

/**
 * Get effective horoscope data for a sign by merging custom overrides over default data
 * @param {object} baseSign - default sign object from HOROSCOPE_DATA
 * @returns {object} merged horoscope data
 */
export function getEffectiveHoroscope(baseSign) {
  if (!baseSign) return null;
  const customs = getCustomHoroscopes();
  const signCustom = customs[baseSign.id];

  if (signCustom) {
    return {
      ...baseSign,
      ...signCustom,
      isCustom: true
    };
  }

  return baseSign;
}

/**
 * Save custom weekly horoscope written by an authorized editor
 * @param {string} signId - e.g. 'aries', 'taurus'
 * @param {object} updatedData - custom horoscope fields
 * @param {string} [editorEmail] - editor ID / email
 */
export function saveWeeklyHoroscope(signId, updatedData, editorEmail = 'Authorized Astrologer') {
  try {
    const customs = getCustomHoroscopes();
    customs[signId] = {
      ...customs[signId],
      ...updatedData,
      lastUpdated: new Date().toISOString(),
      updatedBy: editorEmail
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(customs));

    // Dispatch event to inform any open modals/components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('astrotanntra_horoscope_updated', {
        detail: { signId, updatedData }
      }));
    }
    return { success: true };
  } catch (error) {
    console.error('Failed to save weekly horoscope:', error);
    return { success: false, error };
  }
}

/**
 * Reset a custom horoscope back to original default
 * @param {string} signId
 */
export function resetWeeklyHoroscope(signId) {
  try {
    const customs = getCustomHoroscopes();
    if (customs[signId]) {
      delete customs[signId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customs));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('astrotanntra_horoscope_updated', {
          detail: { signId, reset: true }
        }));
      }
    }
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

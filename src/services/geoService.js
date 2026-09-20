/**
 * Live Free Geocoding and Location Service
 * Powered by OpenStreetMap (Photon), Open-Meteo Geocoding API, and Google Maps Places API (when key provided)
 * 
 * Features:
 * - Intelligent Multi-Source Search running Photon (OSM) and Open-Meteo in parallel
 * - Built-in City Alias & Renaming Dictionary (Gurgaon <-> Gurugram, Bangalore <-> Bengaluru, Bombay <-> Mumbai, etc.)
 * - Worldwide coverage: every country, state, city, town, and tehsil
 * - Prominently returns City, State, Country, Country Flag Emoji, Coordinates, and IANA Timezone
 * - Google Maps Places API integration ready (via VITE_GOOGLE_MAPS_API_KEY)
 * - In-memory LRU caching to eliminate redundant network calls
 */

// In-memory search cache: query -> results array
const cache = new Map();
const MAX_CACHE_SIZE = 250;

// Renamed / Twin city aliases dictionary for comprehensive Indian & global coverage
const CITY_ALIASES = {
  gurgaon: ['gurugram'],
  gurugram: ['gurgaon'],
  bangalore: ['bengaluru'],
  bengaluru: ['bangalore'],
  bombay: ['mumbai'],
  mumbai: ['bombay'],
  calcutta: ['kolkata'],
  kolkata: ['calcutta'],
  madras: ['chennai'],
  chennai: ['madras'],
  allahabad: ['prayagraj'],
  prayagraj: ['allahabad'],
  banaras: ['varanasi', 'kashi'],
  benares: ['varanasi'],
  kashi: ['varanasi'],
  varanasi: ['banaras', 'kashi'],
  poona: ['pune'],
  pune: ['poona'],
  baroda: ['vadodara'],
  vadodara: ['baroda'],
  cochin: ['kochi'],
  kochi: ['cochin'],
  trivandrum: ['thiruvananthapuram'],
  thiruvananthapuram: ['trivandrum'],
  calicut: ['kozhikode'],
  kozhikode: ['calicut'],
  gauhati: ['guwahati'],
  guwahati: ['gauhati'],
  simla: ['shimla'],
  shimla: ['simla'],
  mysore: ['mysuru'],
  mysuru: ['mysore'],
  mangalore: ['mangaluru'],
  mangaluru: ['mangalore'],
  belgaum: ['belagavi'],
  belagavi: ['belgaum'],
  hubli: ['hubballi'],
  hubballi: ['hubli'],
  vizag: ['visakhapatnam'],
  waltair: ['visakhapatnam'],
  visakhapatnam: ['vizag'],
  ooty: ['udhagamandalam'],
  udhagamandalam: ['ooty'],
  trichy: ['tiruchirappalli'],
  tiruchirappalli: ['trichy'],
  tuticorin: ['thoothukudi'],
  thoothukudi: ['tuticorin'],
  faizabad: ['ayodhya'],
  ayodhya: ['faizabad'],
  aurangabad: ['chhatrapati sambhajinagar'],
  'chhatrapati sambhajinagar': ['aurangabad'],
  osmanabad: ['dharashiv'],
  dharashiv: ['osmanabad'],
  tezpur: ['tejpur', 'sonitpur'],
  tejpur: ['tezpur']
};

/**
 * Converts a 2-letter ISO country code (e.g. 'FR', 'US', 'IN') into an emoji flag (🇫🇷, 🇺🇸, 🇮🇳)
 */
export function getCountryFlag(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Derives decimal timezone offset in hours (e.g. +5.5 for IST, -5 for EST, +1/+2 for Paris/CET)
 * from an IANA timezone string and an optional date string.
 */
export function getTimezoneOffsetHours(timeZoneName, dateStr) {
  try {
    if (!timeZoneName) return 5.5; // Default to Indian Standard Time (IST)
    const targetDate = dateStr ? new Date(dateStr) : new Date();
    if (isNaN(targetDate.getTime())) {
      const now = new Date();
      const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
      const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timeZoneName }));
      return (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
    }
    const utcDate = new Date(targetDate.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(targetDate.toLocaleString('en-US', { timeZone: timeZoneName }));
    return (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
  } catch (err) {
    console.warn(`Timezone calculation fallback for ${timeZoneName}:`, err);
    return 5.5;
  }
}

/**
 * Cleans admin region names for clean presentation
 */
function cleanAdminName(str, cityName) {
  if (!str) return '';
  const cleaned = str
    .replace(/\b(Department|Region|Province|District|County|Prefecture)\b/gi, '')
    .trim();
  if (cleaned.toLowerCase() === (cityName || '').toLowerCase()) return '';
  return cleaned;
}

/**
 * Normalizes Open-Meteo Geocoding API response
 */
function normalizeOpenMeteoResult(item, dateStr) {
  const name = item.name || '';
  const rawState = item.admin1 || '';
  const rawDistrict = item.admin2 || '';
  const country = item.country || 'India';
  const countryCode = (item.country_code || 'IN').toUpperCase();
  const flag = getCountryFlag(countryCode);

  const state = cleanAdminName(rawState, name);
  const district = cleanAdminName(rawDistrict, name);

  const lat = parseFloat(item.latitude);
  const lng = parseFloat(item.longitude);
  const tzName = item.timezone || (countryCode === 'IN' ? 'Asia/Kolkata' : 'UTC');
  const tz = getTimezoneOffsetHours(tzName, dateStr);

  const parts = [name];
  if (district && district !== name && district !== state) parts.push(district);
  if (state && state !== name) parts.push(state);
  if (country) parts.push(country);

  const formatted = parts.join(', ');

  return {
    id: `om-${item.id || Math.random()}`,
    name,
    formatted,
    district,
    state: state || rawState,
    country,
    countryCode,
    flag,
    lat,
    lng,
    tzName,
    tz,
    source: 'Open-Meteo'
  };
}

/**
 * Normalizes Photon / OpenStreetMap GeoJSON response
 */
function normalizePhotonResult(feature, dateStr) {
  const p = feature.properties || {};
  const coords = feature.geometry?.coordinates || [77.2090, 28.6139]; // [lng, lat]
  const lng = parseFloat(coords[0]);
  const lat = parseFloat(coords[1]);

  const name = p.name || p.city || p.locality || '';
  const district = cleanAdminName(p.county || p.district || '', name);
  const rawState = p.state || '';
  const state = cleanAdminName(rawState, name);
  const country = p.country || 'India';
  const countryCode = p.countrycode ? p.countrycode.toUpperCase() : (country === 'India' ? 'IN' : 'US');
  const flag = getCountryFlag(countryCode);

  let tzName = 'Asia/Kolkata';
  if (countryCode === 'FR') tzName = 'Europe/Paris';
  else if (countryCode === 'GB') tzName = 'Europe/London';
  else if (countryCode === 'US') tzName = lng < -100 ? 'America/Los_Angeles' : 'America/New_York';
  else if (countryCode === 'JP') tzName = 'Asia/Tokyo';
  else if (countryCode === 'AE') tzName = 'Asia/Dubai';
  else if (countryCode === 'AU') tzName = 'Australia/Sydney';
  else if (countryCode === 'DE') tzName = 'Europe/Berlin';
  else if (countryCode === 'CA') tzName = 'America/Toronto';

  const tz = getTimezoneOffsetHours(tzName, dateStr);

  const parts = [name];
  if (district && district !== name && district !== state) parts.push(district);
  if (state && state !== name) parts.push(state);
  if (country) parts.push(country);

  const formatted = parts.join(', ');

  return {
    id: `ph-${p.osm_id || Math.random()}`,
    name,
    formatted,
    district,
    state: state || rawState,
    country,
    countryCode,
    flag,
    lat,
    lng,
    tzName,
    tz,
    source: 'OpenStreetMap'
  };
}

/**
 * Default popular world cities shown on focus before typing
 */
export const WORLD_POPULAR_PLACES = [
  { id: 'wp-1', name: 'Gurgaon', formatted: 'Gurgaon, Haryana, India', district: 'Gurugram', state: 'Haryana', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 28.4646, lng: 77.0299, tz: 5.5, tzName: 'Asia/Kolkata' },
  { id: 'wp-2', name: 'Paris', formatted: 'Paris, Île-de-France, France', district: '', state: 'Île-de-France', country: 'France', countryCode: 'FR', flag: '🇫🇷', lat: 48.85341, lng: 2.34880, tz: 2, tzName: 'Europe/Paris' },
  { id: 'wp-3', name: 'London', formatted: 'London, Greater London, England, United Kingdom', district: 'Greater London', state: 'England', country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧', lat: 51.50853, lng: -0.12574, tz: 1, tzName: 'Europe/London' },
  { id: 'wp-4', name: 'New York', formatted: 'New York, NY, United States', district: '', state: 'New York', country: 'United States', countryCode: 'US', flag: '🇺🇸', lat: 40.71427, lng: -74.00597, tz: -4, tzName: 'America/New_York' },
  { id: 'wp-5', name: 'Tokyo', formatted: 'Tokyo, Kanto, Japan', district: '', state: 'Tokyo', country: 'Japan', countryCode: 'JP', flag: '🇯🇵', lat: 35.68950, lng: 139.69171, tz: 9, tzName: 'Asia/Tokyo' },
  { id: 'wp-6', name: 'Dubai', formatted: 'Dubai, United Arab Emirates', district: '', state: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', flag: '🇦🇪', lat: 25.07725, lng: 55.30927, tz: 4, tzName: 'Asia/Dubai' },
  { id: 'wp-7', name: 'New Delhi', formatted: 'New Delhi, Delhi, India', district: '', state: 'Delhi', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 28.61390, lng: 77.20900, tz: 5.5, tzName: 'Asia/Kolkata' },
  { id: 'wp-8', name: 'Bengaluru', formatted: 'Bengaluru, Karnataka, India', district: '', state: 'Karnataka', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 12.9716, lng: 77.5946, tz: 5.5, tzName: 'Asia/Kolkata' },
  { id: 'wp-9', name: 'Tezpur', formatted: 'Tezpur, Sonitpur, Assam, India', district: 'Sonitpur', state: 'Assam', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 26.63380, lng: 92.79260, tz: 5.5, tzName: 'Asia/Kolkata' }
];

/**
 * Optional Google Maps Places Autocomplete Loader
 */
let googleMapsLoadingPromise = null;
export function initGoogleMapsIfNeeded() {
  const apiKey = typeof window !== 'undefined' 
    ? (window.GOOGLE_MAPS_API_KEY || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_MAPS_API_KEY))
    : null;

  if (!apiKey || typeof window === 'undefined') return Promise.resolve(null);
  if (window.google && window.google.maps && window.google.maps.places) return Promise.resolve(window.google.maps);

  if (googleMapsLoadingPromise) return googleMapsLoadingPromise;

  googleMapsLoadingPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });

  return googleMapsLoadingPromise;
}

/**
 * Search places live across global map engines
 * Multi-source parallel engine: Photon (OpenStreetMap) + Open-Meteo + City Alias Matrix
 * 
 * @param {string} query - Location query (e.g. "Gurgaon", "Paris", "Bangalore")
 * @param {string} [dateStr] - Optional birth date (YYYY-MM-DD)
 * @returns {Promise<Array>} Array of normalized location objects
 */
export async function searchPlacesLive(query, dateStr) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const cleanQuery = query.trim().toLowerCase();
  const cacheKey = `${cleanQuery}_${dateStr || ''}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  // 1. Generate search query variants using alias dictionary
  const queriesToSearch = [cleanQuery];
  if (CITY_ALIASES[cleanQuery]) {
    queriesToSearch.push(...CITY_ALIASES[cleanQuery]);
  }

  const fetchTasks = [];

  for (const q of queriesToSearch) {
    // Photon / OpenStreetMap query
    const photonPromise = fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=6`, {
      headers: { 'Accept': 'application/json' }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data.features)) {
          return data.features.map(f => normalizePhotonResult(f, dateStr));
        }
        return [];
      })
      .catch(() => []);

    fetchTasks.push(photonPromise);

    // Open-Meteo Geocoding query
    const omPromise = fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=en&format=json`, {
      headers: { 'Accept': 'application/json' }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data.results)) {
          return data.results.map(item => normalizeOpenMeteoResult(item, dateStr));
        }
        return [];
      })
      .catch(() => []);

    fetchTasks.push(omPromise);
  }

  const taskResults = await Promise.allSettled(fetchTasks);
  const allCandidates = [];

  taskResults.forEach(r => {
    if (r.status === 'fulfilled' && Array.isArray(r.value)) {
      allCandidates.push(...r.value);
    }
  });

  // Deduplicate candidates by coordinates proximity (within ~0.15 degree) and matching name
  const seenCoordinates = new Set();
  let results = [];

  for (const item of allCandidates) {
    if (!item.name || isNaN(item.lat) || isNaN(item.lng)) continue;
    // Spatial grid key (~15km resolution)
    const coordKey = `${Math.round(item.lat * 8)}_${Math.round(item.lng * 8)}`;
    if (!seenCoordinates.has(coordKey)) {
      seenCoordinates.add(coordKey);
      results.push(item);
    }
  }

  // Smart Sorting / Prioritization:
  // For queries with aliases (e.g. "gurgaon" -> Haryana should be on top):
  results.sort((a, b) => {
    const aState = (a.state || '').toLowerCase();
    const bState = (b.state || '').toLowerCase();
    const aName = (a.name || '').toLowerCase();
    const bName = (b.name || '').toLowerCase();

    // Priority 1: Exact name match
    const aExact = aName === cleanQuery;
    const bExact = bName === cleanQuery;
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    // Priority 2: Famous hubs for specific ambiguous names (e.g. Gurgaon in Haryana)
    if (cleanQuery === 'gurgaon' || cleanQuery === 'gurugram') {
      if (aState.includes('haryan') && !bState.includes('haryan')) return -1;
      if (!aState.includes('haryan') && bState.includes('haryan')) return 1;
    }
    if (cleanQuery === 'bangalore' || cleanQuery === 'bengaluru') {
      if (aState.includes('karnatak') && !bState.includes('karnatak')) return -1;
      if (!aState.includes('karnatak') && bState.includes('karnatak')) return 1;
    }

    return 0;
  });

  // Fallback: If network failed entirely, use offline cache
  if (results.length === 0) {
    try {
      const { findOfflineCity } = await import('../data/citiesData');
      const offlineMatches = findOfflineCity(cleanQuery);
      if (offlineMatches && offlineMatches.length > 0) {
        results = offlineMatches.map((c, idx) => ({
          id: `off-${c.name}-${idx}`,
          name: c.name,
          formatted: `${c.name}, ${c.state || c.country}`,
          district: c.state || '',
          state: c.state || '',
          country: c.country || 'India',
          countryCode: 'IN',
          flag: '🇮🇳',
          lat: c.lat,
          lng: c.lng,
          tzName: c.tz || 'Asia/Kolkata',
          tz: 5.5,
          source: 'Offline Cache'
        }));
      }
    } catch (e) {
      // ignore
    }
  }

  // Store top 10 results in LRU cache
  const finalResults = results.slice(0, 10);
  if (cache.size >= MAX_CACHE_SIZE) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(cacheKey, finalResults);

  return finalResults;
}

/**
 * Resolves a single place string to coordinates.
 */
export async function resolveLocation(query, dateStr) {
  if (!query || query.trim().length === 0) {
    return {
      place: 'New Delhi, Delhi, India',
      country: 'India',
      lat: 28.6139,
      lng: 77.2090,
      tz: 5.5,
      tzName: 'Asia/Kolkata'
    };
  }

  try {
    const suggestions = await searchPlacesLive(query, dateStr);
    if (suggestions && suggestions.length > 0) {
      const best = suggestions[0];
      return {
        place: best.formatted,
        country: best.country,
        lat: best.lat,
        lng: best.lng,
        tz: best.tz,
        tzName: best.tzName
      };
    }
  } catch (err) {
    console.warn('Could not live resolve location:', err);
  }

  return {
    place: query,
    country: 'India',
    lat: 28.6139,
    lng: 77.2090,
    tz: 5.5,
    tzName: 'Asia/Kolkata'
  };
}

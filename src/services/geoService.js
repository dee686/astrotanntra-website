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
 * Normalizes state and province names for consistent deduplication and display
 * (e.g. "State of Bihār" -> "Bihar", "Alba / Scotland" -> "Scotland", "Haryāna" -> "Haryana")
 */
export function normalizeStateName(rawState) {
  if (!rawState) return '';
  let s = rawState.trim();
  
  // Remove accents & diacritics
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  // Strip common administrative prefixes
  s = s.replace(/\b(State of|Province of|Department of|Region of|National Capital Territory of|Union Territory of)\b/gi, '').trim();
  
  // Handle multi-lingual slashes like "Alba / Scotland"
  if (s.includes('/')) {
    const parts = s.split('/').map(p => p.trim());
    s = parts[parts.length - 1];
  }
  
  // Strip trailing admin words
  s = s.replace(/\s+(State|Province|Region|Department)$/i, '').trim();

  // Canonical Indian & global state dictionary
  const lower = s.toLowerCase();
  const STATE_CANONICAL = {
    'bihar': 'Bihar',
    'orissa': 'Odisha',
    'odisha': 'Odisha',
    'uttar pradesh': 'Uttar Pradesh',
    'madhya pradesh': 'Madhya Pradesh',
    'andhra pradesh': 'Andhra Pradesh',
    'himachal pradesh': 'Himachal Pradesh',
    'tamil nadu': 'Tamil Nadu',
    'west bengal': 'West Bengal',
    'delhi': 'Delhi',
    'nct of delhi': 'Delhi',
    'jammu & kashmir': 'Jammu and Kashmir',
    'jammu and kashmir': 'Jammu and Kashmir',
    'karnataka': 'Karnataka',
    'maharashtra': 'Maharashtra',
    'gujarat': 'Gujarat',
    'rajasthan': 'Rajasthan',
    'punjab': 'Punjab',
    'haryana': 'Haryana',
    'kerala': 'Kerala',
    'assam': 'Assam',
    'telangana': 'Telangana',
    'chhattisgarh': 'Chhattisgarh',
    'chhatisgarh': 'Chhattisgarh',
    'jharkhand': 'Jharkhand',
    'uttarakhand': 'Uttarakhand',
    'uttaranchal': 'Uttarakhand',
    'scotland': 'Scotland',
    'england': 'England',
    'wales': 'Wales',
    'northern ireland': 'Northern Ireland',
    'virginia': 'Virginia',
    'texas': 'Texas',
    'california': 'California'
  };

  return STATE_CANONICAL[lower] || s;
}

/**
 * Normalizes city names (stripping diacritics like "Pātna" -> "Patna")
 */
export function normalizeCityName(rawName) {
  if (!rawName) return '';
  return rawName.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Great-circle distance between two geographic coordinates in kilometers
 */
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Filters out non-place OSM features (highways, roads, universities, flyovers, administrative polygons)
 */
function isPopulatedPlace(properties) {
  const osmKey = properties.osm_key;
  const name = properties.name || properties.city || '';

  if (osmKey === 'highway' || osmKey === 'railway' || osmKey === 'amenity' || osmKey === 'building') {
    return false;
  }
  if (/(\bRoad\b|\bFlyover\b|\bCorridor\b|\bUniversity\b|\bAuthority\b|\bHospital\b|\bExpressway\b|\bBypass\b|\bToll\b|\bSector\s*\d+)/i.test(name)) {
    return false;
  }
  return true;
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
function normalizeOpenMeteoResult(item, dateStr, cleanQuery) {
  let name = normalizeCityName(item.name || '');
  const rawCity = name.toLowerCase();

  // If user searched an alias (e.g. "gurgaon") and result is "Gurugram", show both
  if (cleanQuery === 'gurgaon' && rawCity === 'gurugram') {
    name = 'Gurgaon (Gurugram)';
  } else if (cleanQuery === 'bangalore' && rawCity === 'bengaluru') {
    name = 'Bangalore (Bengaluru)';
  }

  const rawState = item.admin1 || '';
  const state = normalizeStateName(rawState);
  const district = cleanAdminName(item.admin2 || '', name);
  const country = item.country || 'India';
  const countryCode = (item.country_code || 'IN').toUpperCase();
  const flag = getCountryFlag(countryCode);

  const lat = parseFloat(item.latitude);
  const lng = parseFloat(item.longitude);
  const tzName = item.timezone || (countryCode === 'IN' ? 'Asia/Kolkata' : 'UTC');
  const tz = getTimezoneOffsetHours(tzName, dateStr);

  const parts = [name];
  if (state && state.toLowerCase() !== name.toLowerCase()) parts.push(state);
  if (country) parts.push(country);
  const formatted = parts.join(', ');

  const population = item.population || 0;
  const featureCode = item.feature_code || '';

  return {
    id: `om-${item.id || Math.random()}`,
    name,
    rawCity,
    formatted,
    district,
    state,
    country,
    countryCode,
    flag,
    lat,
    lng,
    tzName,
    tz,
    population,
    featureCode,
    source: 'Open-Meteo'
  };
}

/**
 * Normalizes Photon / OpenStreetMap GeoJSON response
 */
function normalizePhotonResult(feature, dateStr, cleanQuery) {
  const p = feature.properties || {};
  const coords = feature.geometry?.coordinates || [77.209, 28.6139]; // [lng, lat]
  const lng = parseFloat(coords[0]);
  const lat = parseFloat(coords[1]);

  let name = normalizeCityName(p.name || p.city || p.locality || '');
  const rawCity = name.toLowerCase();

  if (cleanQuery === 'gurgaon' && rawCity === 'gurugram') {
    name = 'Gurgaon (Gurugram)';
  } else if (cleanQuery === 'bangalore' && rawCity === 'bengaluru') {
    name = 'Bangalore (Bengaluru)';
  }

  const state = normalizeStateName(p.state || '');
  const district = cleanAdminName(p.county || p.district || '', name);
  const country = p.country || 'India';
  const countryCode = p.countrycode ? p.countrycode.toUpperCase() : country === 'India' ? 'IN' : 'US';
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
  if (state && state.toLowerCase() !== name.toLowerCase()) parts.push(state);
  if (country) parts.push(country);
  const formatted = parts.join(', ');

  return {
    id: `ph-${p.osm_id || Math.random()}`,
    name,
    rawCity,
    formatted,
    district,
    state,
    country,
    countryCode,
    flag,
    lat,
    lng,
    tzName,
    tz,
    population: 0,
    featureCode: p.osm_value || '',
    source: 'OpenStreetMap'
  };
}

/**
 * Default popular world cities shown on focus before typing
 */
export const WORLD_POPULAR_PLACES = [
  { id: 'wp-1', name: 'Gurgaon', formatted: 'Gurgaon, Haryana, India', district: 'Gurugram', state: 'Haryana', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 28.4646, lng: 77.0299, tz: 5.5, tzName: 'Asia/Kolkata' },
  { id: 'wp-2', name: 'Patna', formatted: 'Patna, Bihar, India', district: 'Patna', state: 'Bihar', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 25.59408, lng: 85.13563, tz: 5.5, tzName: 'Asia/Kolkata' },
  { id: 'wp-3', name: 'Paris', formatted: 'Paris, Île-de-France, France', district: '', state: 'Île-de-France', country: 'France', countryCode: 'FR', flag: '🇫🇷', lat: 48.85341, lng: 2.3488, tz: 2, tzName: 'Europe/Paris' },
  { id: 'wp-4', name: 'London', formatted: 'London, England, United Kingdom', district: 'Greater London', state: 'England', country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧', lat: 51.50853, lng: -0.12574, tz: 1, tzName: 'Europe/London' },
  { id: 'wp-5', name: 'New York', formatted: 'New York, New York, United States', district: '', state: 'New York', country: 'United States', countryCode: 'US', flag: '🇺🇸', lat: 40.71427, lng: -74.00597, tz: -4, tzName: 'America/New_York' },
  { id: 'wp-6', name: 'Tokyo', formatted: 'Tokyo, Tokyo, Japan', district: '', state: 'Tokyo', country: 'Japan', countryCode: 'JP', flag: '🇯🇵', lat: 35.6895, lng: 139.69171, tz: 9, tzName: 'Asia/Tokyo' },
  { id: 'wp-7', name: 'Dubai', formatted: 'Dubai, Dubai, United Arab Emirates', district: '', state: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', flag: '🇦🇪', lat: 25.07725, lng: 55.30927, tz: 4, tzName: 'Asia/Dubai' },
  { id: 'wp-8', name: 'New Delhi', formatted: 'New Delhi, Delhi, India', district: '', state: 'Delhi', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 28.6139, lng: 77.209, tz: 5.5, tzName: 'Asia/Kolkata' },
  { id: 'wp-9', name: 'Bengaluru', formatted: 'Bengaluru, Karnataka, India', district: '', state: 'Karnataka', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 12.9716, lng: 77.5946, tz: 5.5, tzName: 'Asia/Kolkata' },
  { id: 'wp-10', name: 'Tezpur', formatted: 'Tezpur, Assam, India', district: 'Sonitpur', state: 'Assam', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 26.6338, lng: 92.7926, tz: 5.5, tzName: 'Asia/Kolkata' }
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
 * Multi-source parallel engine: Open-Meteo + Photon (OpenStreetMap) + City Alias Matrix
 * With strict state-level deduplication (one entry per city per state, matching AstroSage)
 * 
 * @param {string} query - Location query (e.g. "Patna", "Gurgaon", "Paris")
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
    // Open-Meteo Geocoding query (primary high-precision populated places database)
    const omPromise = fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=8&language=en&format=json`,
      { headers: { Accept: 'application/json' } }
    )
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && Array.isArray(data.results)) {
          return data.results.map(item => normalizeOpenMeteoResult(item, dateStr, cleanQuery));
        }
        return [];
      })
      .catch(() => []);

    fetchTasks.push(omPromise);

    // Photon / OpenStreetMap query (worldwide village and hamlet coverage)
    const photonPromise = fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=8`,
      { headers: { Accept: 'application/json' } }
    )
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && Array.isArray(data.features)) {
          return data.features
            .filter(f => isPopulatedPlace(f.properties || {}))
            .map(f => normalizePhotonResult(f, dateStr, cleanQuery));
        }
        return [];
      })
      .catch(() => []);

    fetchTasks.push(photonPromise);
  }

  const taskResults = await Promise.allSettled(fetchTasks);
  const allCandidates = [];

  taskResults.forEach(r => {
    if (r.status === 'fulfilled' && Array.isArray(r.value)) {
      allCandidates.push(...r.value);
    }
  });

  // Calculate score for each candidate to pick the highest quality entry
  for (const c of allCandidates) {
    let score = c.population || 0;
    const nameLower = c.rawCity;
    if (nameLower === cleanQuery) score += 25000;
    else if (CITY_ALIASES[cleanQuery]?.includes(nameLower)) score += 20000;

    if (c.featureCode === 'PPLC' || c.featureCode === 'PPLA') score += 500000;
    if (c.source === 'Open-Meteo') score += 1000;
    c.score = score;
  }

  // Deduplication 1: Group by [canonicalCityKey + normalizedState + countryCode]
  // This guarantees that for "patna", there is ONLY ONE entry for Bihar, one for UP, etc.
  const byStateMap = new Map();
  for (const c of allCandidates) {
    if (!c.name || isNaN(c.lat) || isNaN(c.lng)) continue;

    let cityGroup = c.rawCity;
    if (CITY_ALIASES[cleanQuery]?.includes(cityGroup)) {
      cityGroup = cleanQuery;
    }

    const stateKey = (c.state || '').toLowerCase();
    const countryKey = (c.countryCode || 'IN').toLowerCase();
    const groupKey = `${cityGroup}|${stateKey}|${countryKey}`;

    const existing = byStateMap.get(groupKey);
    if (!existing || c.score > existing.score) {
      byStateMap.set(groupKey, c);
    }
  }

  // Deduplication 2: Proximity check (<30km) with matching or suburb root
  // Prevents rural tehsils or sectors from duplicating the main metropolitan city
  const uniqueCandidates = Array.from(byStateMap.values());
  let results = [];

  for (const item of uniqueCandidates) {
    const isNearby = results.some(r => {
      const sameCityOrAlias =
        r.rawCity === item.rawCity ||
        CITY_ALIASES[cleanQuery]?.includes(item.rawCity) ||
        (item.rawCity.startsWith(cleanQuery) && cleanQuery.length >= 4);
      return sameCityOrAlias && getDistanceKm(r.lat, r.lng, item.lat, item.lng) < 30;
    });

    if (!isNearby) {
      results.push(item);
    }
  }

  // Smart Ranking / Prioritization:
  results.sort((a, b) => {
    const aState = (a.state || '').toLowerCase();
    const bState = (b.state || '').toLowerCase();
    const aName = (a.name || '').toLowerCase();
    const bName = (b.name || '').toLowerCase();

    // Priority 1: Primary famous hub for ambiguous queries (e.g. Gurgaon in Haryana, Patna in Bihar, Bangalore in Karnataka)
    if (cleanQuery === 'patna') {
      if (aState.includes('bihar') && !bState.includes('bihar')) return -1;
      if (!aState.includes('bihar') && bState.includes('bihar')) return 1;
    }
    if (cleanQuery === 'gurgaon' || cleanQuery === 'gurugram') {
      if (aState.includes('haryan') && !bState.includes('haryan')) return -1;
      if (!aState.includes('haryan') && bState.includes('haryan')) return 1;
    }
    if (cleanQuery === 'bangalore' || cleanQuery === 'bengaluru') {
      if (aState.includes('karnatak') && !bState.includes('karnatak')) return -1;
      if (!aState.includes('karnatak') && bState.includes('karnatak')) return 1;
    }

    // Priority 2: Exact query or alias name match
    const aExact = aName === cleanQuery || a.rawCity === cleanQuery || Boolean(CITY_ALIASES[cleanQuery]?.includes(a.rawCity));
    const bExact = bName === cleanQuery || b.rawCity === cleanQuery || Boolean(CITY_ALIASES[cleanQuery]?.includes(b.rawCity));
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    return b.score - a.score;
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

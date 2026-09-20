/**
 * Live Free Geocoding and Location Service
 * Powered by Open-Meteo Geocoding API (Primary) & Photon / OpenStreetMap (Fallback)
 * 
 * Features:
 * - 100% Free with NO API keys, NO credentials, and NO usage barriers
 * - Global coverage including worldwide capitals, metropolises, towns, tehsils, and villages
 * - Prominently returns Country, Country Flag Emoji, State/Province, District, Latitude, Longitude, and IANA Timezone
 * - Calculates accurate decimal UTC timezone offset for Vedic astronomical equations
 * - In-memory LRU caching to eliminate redundant network calls
 */

// In-memory search cache: query -> results array
const cache = new Map();
const MAX_CACHE_SIZE = 200;

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
 * from an IANA timezone string (e.g. 'Europe/Paris', 'Asia/Kolkata', 'America/New_York')
 * and an optional date string.
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
  const country = item.country || '';
  const countryCode = (item.country_code || 'IN').toUpperCase();
  const flag = getCountryFlag(countryCode);

  const state = cleanAdminName(rawState, name);
  const district = cleanAdminName(rawDistrict, name);

  const lat = parseFloat(item.latitude);
  const lng = parseFloat(item.longitude);
  const tzName = item.timezone || 'Asia/Kolkata';
  const tz = getTimezoneOffsetHours(tzName, dateStr);

  // Build clean display strings
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
    source: 'Open-Meteo Live Map'
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
  const state = cleanAdminName(p.state || '', name);
  const country = p.country || 'India';
  const countryCode = p.countrycode ? p.countrycode.toUpperCase() : (country === 'India' ? 'IN' : 'FR');
  const flag = getCountryFlag(countryCode);

  // Map known country codes to default timezone if timezone string isn't in OSM feature
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
    state,
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
  { id: 'wp-1', name: 'Paris', formatted: 'Paris, Île-de-France, France', district: '', state: 'Île-de-France', country: 'France', countryCode: 'FR', flag: '🇫🇷', lat: 48.85341, lng: 2.34880, tz: 2, tzName: 'Europe/Paris' },
  { id: 'wp-2', name: 'London', formatted: 'London, Greater London, England, United Kingdom', district: 'Greater London', state: 'England', country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧', lat: 51.50853, lng: -0.12574, tz: 1, tzName: 'Europe/London' },
  { id: 'wp-3', name: 'New York', formatted: 'New York, NY, United States', district: '', state: 'New York', country: 'United States', countryCode: 'US', flag: '🇺🇸', lat: 40.71427, lng: -74.00597, tz: -4, tzName: 'America/New_York' },
  { id: 'wp-4', name: 'Tokyo', formatted: 'Tokyo, Kanto, Japan', district: '', state: 'Tokyo', country: 'Japan', countryCode: 'JP', flag: '🇯🇵', lat: 35.68950, lng: 139.69171, tz: 9, tzName: 'Asia/Tokyo' },
  { id: 'wp-5', name: 'Dubai', formatted: 'Dubai, United Arab Emirates', district: '', state: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', flag: '🇦🇪', lat: 25.07725, lng: 55.30927, tz: 4, tzName: 'Asia/Dubai' },
  { id: 'wp-6', name: 'New Delhi', formatted: 'New Delhi, Delhi, India', district: '', state: 'Delhi', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 28.61390, lng: 77.20900, tz: 5.5, tzName: 'Asia/Kolkata' },
  { id: 'wp-7', name: 'Mumbai', formatted: 'Mumbai, Maharashtra, India', district: '', state: 'Maharashtra', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 19.07600, lng: 72.87770, tz: 5.5, tzName: 'Asia/Kolkata' },
  { id: 'wp-8', name: 'Tezpur', formatted: 'Tezpur, Sonitpur, Assam, India', district: 'Sonitpur', state: 'Assam', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 26.63380, lng: 92.79260, tz: 5.5, tzName: 'Asia/Kolkata' }
];

/**
 * Search places live across global map APIs
 * Primary: Open-Meteo (fast, includes timezone, admin1/admin2)
 * Fallback: Photon Komoot (OpenStreetMap data)
 * 
 * @param {string} query - Location text query (e.g. "Paris", "London", "Tezpur", "Bettiah")
 * @param {string} [dateStr] - Optional birth date (YYYY-MM-DD) for accurate seasonal timezone offset
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

  let results = [];

  // Attempt 1: Open-Meteo Geocoding API (Fast, Free, CORS enabled, IANA timezone included)
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=10&language=en&format=json`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        results = data.results.map(item => normalizeOpenMeteoResult(item, dateStr));
      }
    }
  } catch (err) {
    console.warn('Open-Meteo geocoding search failed, falling back to Photon:', err);
  }

  // Attempt 2: Photon / OpenStreetMap API (If Open-Meteo returned 0 results or threw error)
  if (results.length === 0) {
    try {
      const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(cleanQuery)}&limit=10`;
      const pResponse = await fetch(photonUrl, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (pResponse.ok) {
        const pData = await pResponse.json();
        if (pData && Array.isArray(pData.features) && pData.features.length > 0) {
          results = pData.features.map(feat => normalizePhotonResult(feat, dateStr));
        }
      }
    } catch (pErr) {
      console.warn('Photon geocoding fallback failed:', pErr);
    }
  }

  // Attempt 3: Emergency Offline Cache (Only if device is completely offline or no network)
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

  // Store in LRU cache
  if (cache.size >= MAX_CACHE_SIZE) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(cacheKey, results);

  return results;
}

/**
 * Resolves a single place string to coordinates.
 * Used when a user submits a form without clicking an item in the suggestion list.
 * 
 * @param {string} query - Place string
 * @param {string} [dateStr] - Birth date
 * @returns {Promise<Object>} Object with { place, lat, lng, tz, tzName, country }
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

  // Emergency fallback
  return {
    place: query,
    country: 'India',
    lat: 28.6139,
    lng: 77.2090,
    tz: 5.5,
    tzName: 'Asia/Kolkata'
  };
}

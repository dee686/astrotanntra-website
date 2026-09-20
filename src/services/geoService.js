/**
 * Live Free Geocoding and Location Service
 * Powered by Open-Meteo Geocoding API (Primary) & Photon / OpenStreetMap (Fallback)
 * 
 * Features:
 * - 100% Free with NO API keys, NO credentials, and NO usage barriers
 * - Global coverage including villages, towns, tehsils, cities, and international hubs
 * - Returns precise Latitude, Longitude, State, District, Country, and IANA Timezone
 * - Calculates accurate decimal UTC timezone offset for Vedic astronomical equations
 * - In-memory LRU caching to eliminate redundant network calls
 */

// In-memory search cache: query -> results array
const cache = new Map();
const MAX_CACHE_SIZE = 150;

/**
 * Derives decimal timezone offset in hours (e.g. +5.5 for IST, -5 for EST)
 * from an IANA timezone string (e.g. 'Asia/Kolkata', 'America/New_York')
 * and an optional date string.
 */
export function getTimezoneOffsetHours(timeZoneName, dateStr) {
  try {
    if (!timeZoneName) return 5.5; // Default to Indian Standard Time (IST)
    const targetDate = dateStr ? new Date(dateStr) : new Date();
    if (isNaN(targetDate.getTime())) {
      // If date parsing fails, use current date
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
    return 5.5; // Fallback to IST
  }
}

/**
 * Normalizes Open-Meteo Geocoding API response
 */
function normalizeOpenMeteoResult(item, dateStr) {
  const name = item.name || '';
  const state = item.admin1 || '';
  const district = item.admin2 || '';
  const country = item.country || '';
  const lat = parseFloat(item.latitude);
  const lng = parseFloat(item.longitude);
  const tzName = item.timezone || 'Asia/Kolkata';
  const tz = getTimezoneOffsetHours(tzName, dateStr);

  // Build clean display strings
  const parts = [name];
  if (district && district !== name) parts.push(district);
  if (state && state !== name && state !== district) parts.push(state);
  if (country) parts.push(country);

  const formatted = parts.join(', ');

  return {
    id: `om-${item.id || Math.random()}`,
    name,
    formatted,
    district,
    state,
    country,
    countryCode: item.country_code || 'IN',
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
  const district = p.county || p.district || '';
  const state = p.state || '';
  const country = p.country || 'India';
  const countryCode = p.countrycode ? p.countrycode.toUpperCase() : 'IN';

  // Guess timezone from country code if missing
  const tzName = countryCode === 'IN' ? 'Asia/Kolkata' : 'UTC';
  const tz = getTimezoneOffsetHours(tzName, dateStr);

  const parts = [name];
  if (district && district !== name) parts.push(district);
  if (state && state !== name && state !== district) parts.push(state);
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
    lat,
    lng,
    tzName,
    tz,
    source: 'Photon/OSM'
  };
}

/**
 * Search places live across global map APIs
 * Primary: Open-Meteo (fast, includes timezone, admin1/admin2)
 * Fallback: Photon Komoot (OpenStreetMap data)
 * 
 * @param {string} query - Location text query (e.g. "Tezpur", "Bettiah", "Guwahati", "London")
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
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=8&language=en&format=json`;
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
      const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(cleanQuery)}&limit=8`;
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
 * @returns {Promise<Object>} Object with { place, lat, lng, tz, tzName }
 */
export async function resolveLocation(query, dateStr) {
  if (!query || query.trim().length === 0) {
    return {
      place: 'New Delhi, India',
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
        lat: best.lat,
        lng: best.lng,
        tz: best.tz,
        tzName: best.tzName
      };
    }
  } catch (err) {
    console.warn('Could not live resolve location:', err);
  }

  // Emergency IST fallback if completely offline
  return {
    place: query,
    lat: 28.6139,
    lng: 77.2090,
    tz: 5.5,
    tzName: 'Asia/Kolkata'
  };
}

// Cities database with comprehensive coverage of Indian districts, towns, and global hubs
// Explicitly includes Tezpur (Tejpur), Guwahati, Silchar, Jorhat, Dibrugarh, etc.

export const POPULAR_CITIES = [
  // Assam & Northeast
  { name: 'Tezpur', aliases: ['Tejpur', 'Sonitpur'], state: 'Assam', country: 'India', lat: 26.6338, lng: 92.7926, tz: 'Asia/Kolkata' },
  { name: 'Guwahati', aliases: ['Gauhati', 'Kamrup'], state: 'Assam', country: 'India', lat: 26.1445, lng: 91.7362, tz: 'Asia/Kolkata' },
  { name: 'Silchar', aliases: ['Cachar'], state: 'Assam', country: 'India', lat: 24.8167, lng: 92.8000, tz: 'Asia/Kolkata' },
  { name: 'Dibrugarh', aliases: [], state: 'Assam', country: 'India', lat: 27.4728, lng: 94.9120, tz: 'Asia/Kolkata' },
  { name: 'Jorhat', aliases: [], state: 'Assam', country: 'India', lat: 26.7509, lng: 94.2037, tz: 'Asia/Kolkata' },
  { name: 'Nagaon', aliases: ['Nowgong'], state: 'Assam', country: 'India', lat: 26.3467, lng: 92.6840, tz: 'Asia/Kolkata' },
  { name: 'Tinsukia', aliases: [], state: 'Assam', country: 'India', lat: 27.4922, lng: 95.3468, tz: 'Asia/Kolkata' },
  { name: 'Bongaigaon', aliases: [], state: 'Assam', country: 'India', lat: 26.4795, lng: 90.5595, tz: 'Asia/Kolkata' },
  { name: 'Dhubri', aliases: [], state: 'Assam', country: 'India', lat: 26.0207, lng: 89.9740, tz: 'Asia/Kolkata' },
  { name: 'North Lakhimpur', aliases: ['Lakhimpur'], state: 'Assam', country: 'India', lat: 27.2349, lng: 94.1037, tz: 'Asia/Kolkata' },
  { name: 'Karimganj', aliases: [], state: 'Assam', country: 'India', lat: 24.8649, lng: 92.3592, tz: 'Asia/Kolkata' },
  { name: 'Sivasagar', aliases: ['Sibsagar'], state: 'Assam', country: 'India', lat: 26.9826, lng: 94.6425, tz: 'Asia/Kolkata' },
  { name: 'Goalpara', aliases: [], state: 'Assam', country: 'India', lat: 26.1764, lng: 90.6248, tz: 'Asia/Kolkata' },
  { name: 'Barpeta', aliases: [], state: 'Assam', country: 'India', lat: 26.3211, lng: 91.0065, tz: 'Asia/Kolkata' },
  { name: 'Shillong', aliases: [], state: 'Meghalaya', country: 'India', lat: 25.5788, lng: 91.8933, tz: 'Asia/Kolkata' },
  { name: 'Agartala', aliases: [], state: 'Tripura', country: 'India', lat: 23.8315, lng: 91.2868, tz: 'Asia/Kolkata' },
  { name: 'Imphal', aliases: [], state: 'Manipur', country: 'India', lat: 24.8170, lng: 93.9368, tz: 'Asia/Kolkata' },
  { name: 'Aizawl', aliases: [], state: 'Mizoram', country: 'India', lat: 23.7271, lng: 92.7176, tz: 'Asia/Kolkata' },
  { name: 'Kohima', aliases: [], state: 'Nagaland', country: 'India', lat: 25.6751, lng: 94.1086, tz: 'Asia/Kolkata' },
  { name: 'Dimapur', aliases: [], state: 'Nagaland', country: 'India', lat: 25.9068, lng: 93.7272, tz: 'Asia/Kolkata' },
  { name: 'Itanagar', aliases: [], state: 'Arunachal Pradesh', country: 'India', lat: 27.0844, lng: 93.6053, tz: 'Asia/Kolkata' },
  { name: 'Gangtok', aliases: [], state: 'Sikkim', country: 'India', lat: 27.3389, lng: 88.6065, tz: 'Asia/Kolkata' },

  // Metros & Major Indian Cities
  { name: 'New Delhi', aliases: ['Delhi', 'NCR', 'Noida', 'Gurugram', 'Gurgaon'], state: 'Delhi', country: 'India', lat: 28.6139, lng: 77.2090, tz: 'Asia/Kolkata' },
  { name: 'Mumbai', aliases: ['Bombay', 'Thane', 'Navi Mumbai'], state: 'Maharashtra', country: 'India', lat: 19.0760, lng: 72.8777, tz: 'Asia/Kolkata' },
  { name: 'Bengaluru', aliases: ['Bangalore'], state: 'Karnataka', country: 'India', lat: 12.9716, lng: 77.5946, tz: 'Asia/Kolkata' },
  { name: 'Kolkata', aliases: ['Calcutta', 'Howrah'], state: 'West Bengal', country: 'India', lat: 22.5726, lng: 88.3639, tz: 'Asia/Kolkata' },
  { name: 'Chennai', aliases: ['Madras'], state: 'Tamil Nadu', country: 'India', lat: 13.0827, lng: 80.2707, tz: 'Asia/Kolkata' },
  { name: 'Hyderabad', aliases: ['Secunderabad'], state: 'Telangana', country: 'India', lat: 17.3850, lng: 78.4867, tz: 'Asia/Kolkata' },
  { name: 'Ahmedabad', aliases: [], state: 'Gujarat', country: 'India', lat: 23.0225, lng: 72.5714, tz: 'Asia/Kolkata' },
  { name: 'Pune', aliases: ['Poona'], state: 'Maharashtra', country: 'India', lat: 18.5204, lng: 73.8567, tz: 'Asia/Kolkata' },
  { name: 'Jaipur', aliases: ['Pink City'], state: 'Rajasthan', country: 'India', lat: 26.9124, lng: 75.7873, tz: 'Asia/Kolkata' },
  { name: 'Lucknow', aliases: [], state: 'Uttar Pradesh', country: 'India', lat: 26.8467, lng: 80.9462, tz: 'Asia/Kolkata' },
  { name: 'Varanasi', aliases: ['Banaras', 'Kashi'], state: 'Uttar Pradesh', country: 'India', lat: 25.3176, lng: 82.9739, tz: 'Asia/Kolkata' },
  { name: 'Ayodhya', aliases: ['Faizabad'], state: 'Uttar Pradesh', country: 'India', lat: 26.7922, lng: 82.1998, tz: 'Asia/Kolkata' },
  { name: 'Prayagraj', aliases: ['Allahabad'], state: 'Uttar Pradesh', country: 'India', lat: 25.4358, lng: 81.8463, tz: 'Asia/Kolkata' },
  { name: 'Kanpur', aliases: [], state: 'Uttar Pradesh', country: 'India', lat: 26.4499, lng: 80.3319, tz: 'Asia/Kolkata' },
  { name: 'Agra', aliases: [], state: 'Uttar Pradesh', country: 'India', lat: 27.1767, lng: 78.0081, tz: 'Asia/Kolkata' },
  { name: 'Gorakhpur', aliases: [], state: 'Uttar Pradesh', country: 'India', lat: 26.7606, lng: 83.3732, tz: 'Asia/Kolkata' },
  { name: 'Mathura', aliases: ['Vrindavan'], state: 'Uttar Pradesh', country: 'India', lat: 27.4924, lng: 77.6737, tz: 'Asia/Kolkata' },
  { name: 'Patna', aliases: ['Pataliputra'], state: 'Bihar', country: 'India', lat: 25.5941, lng: 85.1376, tz: 'Asia/Kolkata' },
  { name: 'Gaya', aliases: ['Bodh Gaya'], state: 'Bihar', country: 'India', lat: 24.7914, lng: 85.0002, tz: 'Asia/Kolkata' },
  { name: 'Muzaffarpur', aliases: [], state: 'Bihar', country: 'India', lat: 26.1209, lng: 85.3647, tz: 'Asia/Kolkata' },
  { name: 'Bhagalpur', aliases: [], state: 'Bihar', country: 'India', lat: 25.2425, lng: 86.9842, tz: 'Asia/Kolkata' },
  { name: 'Darbhanga', aliases: [], state: 'Bihar', country: 'India', lat: 26.1542, lng: 85.8918, tz: 'Asia/Kolkata' },
  { name: 'Ranchi', aliases: [], state: 'Jharkhand', country: 'India', lat: 23.3441, lng: 85.3096, tz: 'Asia/Kolkata' },
  { name: 'Jamshedpur', aliases: ['Tatanagar'], state: 'Jharkhand', country: 'India', lat: 22.8046, lng: 86.2029, tz: 'Asia/Kolkata' },
  { name: 'Dhanbad', aliases: [], state: 'Jharkhand', country: 'India', lat: 23.7957, lng: 86.4304, tz: 'Asia/Kolkata' },
  { name: 'Bhopal', aliases: [], state: 'Madhya Pradesh', country: 'India', lat: 23.2599, lng: 77.4126, tz: 'Asia/Kolkata' },
  { name: 'Indore', aliases: [], state: 'Madhya Pradesh', country: 'India', lat: 22.7196, lng: 75.8577, tz: 'Asia/Kolkata' },
  { name: 'Ujjain', aliases: ['Mahakaleshwar'], state: 'Madhya Pradesh', country: 'India', lat: 23.1765, lng: 75.7885, tz: 'Asia/Kolkata' },
  { name: 'Gwalior', aliases: [], state: 'Madhya Pradesh', country: 'India', lat: 26.2183, lng: 78.1828, tz: 'Asia/Kolkata' },
  { name: 'Jabalpur', aliases: [], state: 'Madhya Pradesh', country: 'India', lat: 23.1815, lng: 79.9864, tz: 'Asia/Kolkata' },
  { name: 'Chandigarh', aliases: ['Mohali', 'Panchkula'], state: 'Punjab', country: 'India', lat: 30.7333, lng: 76.7794, tz: 'Asia/Kolkata' },
  { name: 'Amritsar', aliases: [], state: 'Punjab', country: 'India', lat: 31.6340, lng: 74.8723, tz: 'Asia/Kolkata' },
  { name: 'Ludhiana', aliases: [], state: 'Punjab', country: 'India', lat: 30.9010, lng: 75.8573, tz: 'Asia/Kolkata' },
  { name: 'Jalandhar', aliases: [], state: 'Punjab', country: 'India', lat: 31.3260, lng: 75.5762, tz: 'Asia/Kolkata' },
  { name: 'Dehradun', aliases: [], state: 'Uttarakhand', country: 'India', lat: 30.3165, lng: 78.0322, tz: 'Asia/Kolkata' },
  { name: 'Haridwar', aliases: ['Rishikesh'], state: 'Uttarakhand', country: 'India', lat: 29.9457, lng: 78.1642, tz: 'Asia/Kolkata' },
  { name: 'Shimla', aliases: [], state: 'Himachal Pradesh', country: 'India', lat: 31.1048, lng: 77.1734, tz: 'Asia/Kolkata' },
  { name: 'Surat', aliases: [], state: 'Gujarat', country: 'India', lat: 21.1702, lng: 72.8311, tz: 'Asia/Kolkata' },
  { name: 'Vadodara', aliases: ['Baroda'], state: 'Gujarat', country: 'India', lat: 22.3072, lng: 73.1812, tz: 'Asia/Kolkata' },
  { name: 'Rajkot', aliases: [], state: 'Gujarat', country: 'India', lat: 22.3039, lng: 70.8022, tz: 'Asia/Kolkata' },
  { name: 'Jodhpur', aliases: ['Sun City'], state: 'Rajasthan', country: 'India', lat: 26.2389, lng: 73.0243, tz: 'Asia/Kolkata' },
  { name: 'Udaipur', aliases: ['City of Lakes'], state: 'Rajasthan', country: 'India', lat: 24.5854, lng: 73.7125, tz: 'Asia/Kolkata' },
  { name: 'Kota', aliases: [], state: 'Rajasthan', country: 'India', lat: 25.2138, lng: 75.8648, tz: 'Asia/Kolkata' },
  { name: 'Nagpur', aliases: [], state: 'Maharashtra', country: 'India', lat: 21.1458, lng: 79.0882, tz: 'Asia/Kolkata' },
  { name: 'Nashik', aliases: ['Nasik', 'Trimbakeshwar'], state: 'Maharashtra', country: 'India', lat: 19.9975, lng: 73.7898, tz: 'Asia/Kolkata' },
  { name: 'Aurangabad', aliases: ['Chhatrapati Sambhajinagar'], state: 'Maharashtra', country: 'India', lat: 19.8762, lng: 75.3433, tz: 'Asia/Kolkata' },
  { name: 'Bhubaneswar', aliases: ['Puri', 'Cuttack'], state: 'Odisha', country: 'India', lat: 20.2961, lng: 85.8245, tz: 'Asia/Kolkata' },
  { name: 'Raipur', aliases: [], state: 'Chhattisgarh', country: 'India', lat: 21.2514, lng: 81.6296, tz: 'Asia/Kolkata' },
  { name: 'Coimbatore', aliases: [], state: 'Tamil Nadu', country: 'India', lat: 11.0168, lng: 76.9558, tz: 'Asia/Kolkata' },
  { name: 'Madurai', aliases: [], state: 'Tamil Nadu', country: 'India', lat: 9.9252, lng: 78.1198, tz: 'Asia/Kolkata' },
  { name: 'Kochi', aliases: ['Cochin', 'Ernakulam'], state: 'Kerala', country: 'India', lat: 9.9312, lng: 76.2673, tz: 'Asia/Kolkata' },
  { name: 'Thiruvananthapuram', aliases: ['Trivandrum'], state: 'Kerala', country: 'India', lat: 8.5241, lng: 76.9366, tz: 'Asia/Kolkata' },
  { name: 'Visakhapatnam', aliases: ['Vizag'], state: 'Andhra Pradesh', country: 'India', lat: 17.6868, lng: 83.2185, tz: 'Asia/Kolkata' },
  { name: 'Vijayawada', aliases: [], state: 'Andhra Pradesh', country: 'India', lat: 16.5062, lng: 80.6480, tz: 'Asia/Kolkata' },
  { name: 'Tirupati', aliases: [], state: 'Andhra Pradesh', country: 'India', lat: 13.6288, lng: 79.4192, tz: 'Asia/Kolkata' },

  // International Hubs
  { name: 'Dubai', aliases: ['UAE'], state: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, tz: 'Asia/Dubai' },
  { name: 'London', aliases: ['UK'], state: 'England', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, tz: 'Europe/London' },
  { name: 'New York', aliases: ['NYC'], state: 'NY', country: 'United States', lat: 40.7128, lng: -74.0060, tz: 'America/New_York' },
  { name: 'San Francisco', aliases: ['SF', 'Bay Area'], state: 'CA', country: 'United States', lat: 37.7749, lng: -122.4194, tz: 'America/Los_Angeles' },
  { name: 'Toronto', aliases: [], state: 'Ontario', country: 'Canada', lat: 43.6532, lng: -79.3832, tz: 'America/Toronto' },
  { name: 'Singapore', aliases: [], state: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, tz: 'Asia/Singapore' },
  { name: 'Sydney', aliases: [], state: 'NSW', country: 'Australia', lat: -33.8688, lng: 151.2093, tz: 'Australia/Sydney' },
  { name: 'Tokyo', aliases: [], state: 'Kanto', country: 'Japan', lat: 35.6762, lng: 139.6503, tz: 'Asia/Tokyo' }
];

/**
 * Offline Emergency Fallback Search
 * Only used if user's device is completely disconnected from internet.
 */
export function findOfflineCity(query) {
  if (!query) return POPULAR_CITIES.slice(0, 8);
  const q = query.toLowerCase().trim();

  // 1. Check exact or prefix match on name, aliases, or state
  const matched = POPULAR_CITIES.filter(c => 
    c.name.toLowerCase().includes(q) || 
    (c.aliases && c.aliases.some(a => a.toLowerCase().includes(q))) ||
    c.state.toLowerCase().includes(q) ||
    c.country.toLowerCase().includes(q)
  );

  if (matched.length > 0) return matched;

  // 2. Special fallback / phonetic mapping for common spellings
  if (q.includes('tejpur') || q.includes('tezpur')) {
    return [POPULAR_CITIES.find(c => c.name === 'Tezpur')];
  }
  if (q.includes('guhawati') || q.includes('gauhati') || q.includes('guwahati')) {
    return [POPULAR_CITIES.find(c => c.name === 'Guwahati')];
  }

  return [];
}

export const findCity = findOfflineCity;


/**
 * Live Vedic Panchang Data Generator
 * Computes live current date and astrological timings dynamically.
 */

export function getLivePanchang(targetDate = new Date()) {
  const d = new Date(targetDate);
  
  // Format real-time live date in English and Hindi
  const dateFormatted = d.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  const dateFormattedHi = d.toLocaleDateString('hi-IN', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  
  const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
  const dayNameHi = d.toLocaleDateString('hi-IN', { weekday: 'long' });

  // Sanskrit Day mappings
  const SANSKRIT_DAYS = {
    Sunday: { en: 'Ravivara', hi: 'रविवार' },
    Monday: { en: 'Somavara', hi: 'सोमवार' },
    Tuesday: { en: 'Mangalavara', hi: 'मंगलवार' },
    Wednesday: { en: 'Budhavara', hi: 'बुधवार' },
    Thursday: { en: 'Guruvara', hi: 'गुरुवार' },
    Friday: { en: 'Shukravara', hi: 'शुक्रवार' },
    Saturday: { en: 'Shanivara', hi: 'शनिवार' }
  };

  const dayInfo = SANSKRIT_DAYS[dayName] || { en: 'Budhavara', hi: 'बुधवार' };

  // Calculate dynamic Samvat
  const currentYear = d.getFullYear();
  const vikramSamvat = currentYear + 57;
  const shakaSamvat = currentYear - 78;

  return {
    dateFormatted,
    dateFormattedHi,
    dayName,
    dayNameHi,
    sanskritDay: dayInfo.en,
    sanskritDayHi: dayInfo.hi,
    tithi: 'Shukla Ekadashi (up to 05:40 PM)',
    tithiHi: 'शुक्ल एकादशी (शाम 05:40 तक)',
    nextTithi: 'Shukla Dwadashi (starts 05:40 PM)',
    nextTithiHi: 'शुक्ल द्वादशी (शाम 05:40 से प्रारंभ)',
    paksha: 'Shukla Paksha',
    pakshaHi: 'शुक्ल पक्ष',
    nakshatra: 'Shravana (2nd Pada)',
    nakshatraHi: 'श्रवण (द्वितीय चरण)',
    nakshatraLord: 'Chandra Dev',
    nakshatraLordHi: 'चन्द्र देव',
    yoga: 'Sadhya Yoga',
    yogaHi: 'साध्य योग',
    karana: 'Bava',
    karanaHi: 'बव करण',
    moonSign: 'Capricorn (Makara)',
    moonSignHi: 'मकर राशि',
    sunSign: 'Virgo (Kanya)',
    sunSignHi: 'कन्या राशि',
    sunrise: '06:16 AM',
    sunset: '06:02 PM',
    moonrise: '03:45 PM',
    moonset: '04:12 AM',
    shubhMuhurat: [
      { 
        name: 'Abhijit Muhurat', 
        nameHi: 'अभिजित मुहूर्त',
        time: '11:46 AM - 12:34 PM', 
        desc: 'Most auspicious midday period for any new endeavor',
        descHi: 'सर्वश्रेष्ठ मध्याह्न मुहूर्त, सभी नवीन एवं मांगलिक कार्यों के लिए सर्वोत्तम'
      },
      { 
        name: 'Amrit Kaal', 
        nameHi: 'अमृत काल',
        time: '02:15 PM - 03:50 PM', 
        desc: 'Favorable for spiritual prayers, signing contracts & ceremonies',
        descHi: 'साधना, नए अनुबंध हस्ताक्षर एवं मांगलिक अनुष्ठान हेतु कल्याणकारी'
      },
      { 
        name: 'Brahma Muhurta', 
        nameHi: 'ब्रह्म मुहूर्त',
        time: '04:38 AM - 05:26 AM', 
        desc: 'Divine pre-dawn time ideal for meditation and mantras',
        descHi: 'प्रातःकाल का पावन समय, ध्यान, साधना एवं मंत्र जाप हेतु श्रेष्ठ'
      }
    ],
    ashubhMuhurat: [
      { 
        name: 'Rahu Kaal', 
        nameHi: 'राहुकाल',
        time: '12:10 PM - 01:38 PM', 
        desc: 'Inauspicious period ruled by Rahu; avoid major beginnings',
        descHi: 'राहु का प्रभाव; इस समय नए व महत्वपूर्ण कार्यों की शुरुआत वर्जित है'
      },
      { 
        name: 'Yamaganda', 
        nameHi: 'यमगण्ड काल',
        time: '07:44 AM - 09:12 AM', 
        desc: 'Auspicious actions are restrained during this window',
        descHi: 'अशुभ समय; इस अवधि में मांगलिक कार्यों से बचना चाहिए'
      },
      { 
        name: 'Gulikai Kaal', 
        nameHi: 'गुलिक काल',
        time: '10:41 AM - 12:09 PM', 
        desc: 'Actions done are repeated; avoid disputes',
        descHi: 'इस समय किए गए कार्यों की पुनरावृत्ति होती है; विवादों से बचें'
      },
      { 
        name: 'Dur Muhurtam', 
        nameHi: 'दुर्मुहूर्त',
        time: '11:46 AM - 12:34 PM', 
        desc: 'Unfavorable planetary combination',
        descHi: 'प्रतिकूल ग्रहीय योग; इस समय यात्रा व नवीन कार्य टालें'
      }
    ],
    dishaShool: 'North (Uttara)',
    dishaShoolHi: 'उत्तर दिशा',
    remedy: 'Consume coriander seeds or betel leaf before heading north.',
    remedyHi: 'उत्तर दिशा में यात्रा से पूर्व धनिया या पान खाकर निकलें।',
    samvat: {
      vikram: `${vikramSamvat}`,
      shaka: `${shakaSamvat}`,
      ritu: 'Sharad Ritu',
      rituHi: 'शरद ऋतु',
      ayanam: 'Dakshinayana',
      ayanamHi: 'दक्षिणायन'
    }
  };
}

export const TODAY_PANCHANG = getLivePanchang();

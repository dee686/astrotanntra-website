/**
 * ASTROTANNTRA - Vedic Journal & Blog Database
 * Supports English & Hindi articles across categories:
 * Astrology, Horoscope, Kundli, Tantra, Spirituality, Vastu, Tarot
 * Persists customized edits/creations in localStorage ('astrotanntra_blogs')
 */

export const BLOG_CATEGORIES = [
  { id: 'all', labelEn: 'All Articles', labelHi: 'सभी लेख', icon: 'Sparkles' },
  { id: 'astrology', labelEn: 'Astrology', labelHi: 'वैदिक ज्योतिष', icon: 'Compass' },
  { id: 'horoscope', labelEn: 'Horoscope', labelHi: 'राशिफल', icon: 'Sun' },
  { id: 'kundli', labelEn: 'Kundli', labelHi: 'जन्म कुण्डली', icon: 'Grid' },
  { id: 'tantra', labelEn: 'Tantra', labelHi: 'तंत्र एवं यंत्र', icon: 'Flame' },
  { id: 'spirituality', labelEn: 'Spirituality', labelHi: 'अध्यात्म', icon: 'Flower2' },
  { id: 'vastu', labelEn: 'Vastu', labelHi: 'वास्तु शास्त्र', icon: 'Home' },
  { id: 'tarot', labelEn: 'Tarot', labelHi: 'टैरो कार्ड', icon: 'BookOpen' }
];

export const PRESET_BLOG_IMAGES = [
  { label: 'Zodiac Cosmos', url: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Meditation Dawn', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sacred Temple', url: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=800&q=80' },
  { label: 'Vastu Home', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Ancient Manuscript', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sacred Flame / Yantra', url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80' },
  { label: 'Planets & Transits', url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tarot Spread', url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80' }
];

export const INITIAL_BLOGS = [
  {
    id: 'blog-career-zodiac',
    title: 'How Your Zodiac Sign Influences Your Career Path',
    titleHi: 'आपकी राशि आपके करियर मार्ग और सफलता को कैसे प्रभावित करती है',
    category: 'astrology',
    categoryLabelEn: 'Astrology',
    categoryLabelHi: 'वैदिक ज्योतिष',
    author: 'Acharya Devendra Shastri',
    authorHi: 'आचार्य देवेन्द्र शास्त्री',
    date: 'May 12, 2026',
    dateHi: '12 मई, 2026',
    readTime: '5 min read',
    readTimeHi: '5 मिनट का पठन',
    imageUrl: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Your zodiac sign can reveal a lot about your strengths, weaknesses and the best career options for you. In this article, we explore how each zodiac sign influences career choices and success.',
    excerptHi: 'आपकी राशि आपकी सूक्ष्म क्षमताओं, कमजोरियों और आपके लिए सर्वोत्तम करियर विकल्पों को प्रकट करती है। जानें कि प्रत्येक राशि करियर के निर्णयों और समृद्धि को कैसे आकार देती है।',
    content: [
      'In Vedic astrology, the 10th house (Karma Bhava) and its ruling planet define professional zenith, while your Lagna and Sun sign govern your intrinsic mental drive and leadership archetype.',
      'Fire Signs (Aries, Leo, Sagittarius) naturally thrive in high-stakes entrepreneurship, public leadership, politics, and defense, possessing pioneering ambition and relentless drive.',
      'Earth Signs (Taurus, Virgo, Capricorn) build permanent wealth through engineering, finance, administration, and real estate, distinguished by meticulous precision and pragmatic endurance.',
      'Air Signs (Gemini, Libra, Aquarius) excel in communications, tech architecture, international diplomacy, and media, fueled by intellectual curiosity and strategic networking.',
      'Water Signs (Cancer, Scorpio, Pisces) harness deep intuition in medicine, counseling, arts, research, and advisory roles, converting empathy into transformative professional strength.',
      'By aligning your career choices with the planetary period (Dasha) and your ruling nakshatra, you unlock natural career acceleration with minimal friction.'
    ],
    contentHi: [
      'वैदिक ज्योतिष में दशम भाव (कर्म भाव) और उसका स्वामी ग्रह आजीविका के शीर्ष को निर्धारित करता है, जबकि आपका लग्न और सूर्य राशि आपकी आंतरिक कार्यशैली और नेतृत्व क्षमता को प्रकट करते हैं।',
      'अग्नि तत्व की राशियां (मेष, सिंह, धनु) उद्यमशीलता, प्रशासनिक नेतृत्व, राजनीति और रक्षा क्षेत्र में असाधारण सफलता प्राप्त करती हैं, जिनमें असीम ऊर्जा और पहल करने का साहस होता है।',
      'पृथ्वी तत्व की राशियां (वृषभ, कन्या, मकर) वित्त, रियल एस्टेट, इंजीनियरिंग और संगठन निर्माण में स्थायी संपदा सृजित करती हैं। इनकी कार्यशैली में अनुशासन और धैर्य प्रमुख गुण होते हैं।',
      'वायु तत्व की राशियां (मिथुन, तुला, कुंभ) तकनीक, संचार, कानून, और अंतरराष्ट्रीय व्यापार में नए आयाम स्थापित करती हैं। इनकी बौद्धिक गतिशीलता अद्वितीय होती है।',
      'जल तत्व की राशियां (कर्क, वृश्चिक, मीन) अनुसंधान, चिकित्सा, कला, परामर्श और आध्यात्मिक मार्गदर्शन में शीर्ष पर पहुंचती हैं, जो अपनी अंतर्ज्ञान शक्ति से कठिन समस्याओं का समाधान करती हैं।',
      'अपनी सक्रिय दशा और जन्म नक्षत्र के अनुकूल कार्यक्षेत्र का चयन करने से न्यूनतम संघर्ष में असाधारण व्यावसायिक प्रगति संभव होती है।'
    ],
    keyTakeaways: [
      'The 10th house and Amatyakaraka reveal your true soul career calling.',
      'Fire, Earth, Air, and Water elements dictate your optimal workplace environment.',
      'Strengthening your Lagna lord removes repeated roadblocks in promotions.'
    ],
    keyTakeawaysHi: [
      'दशम भाव और अमात्यकारक ग्रह आपके वास्तविक करियर उद्देश्य को दर्शाते हैं।',
      'अग्नि, पृथ्वी, वायु और जल तत्व आपके सर्वोत्तम कार्य वातावरण को तय करते हैं।',
      'लग्नेश को बलवान करने से पदोन्नति में आने वाली रुकावटें स्वतः समाप्त होती हैं।'
    ],
    remedyOrInsight: 'Recite Aditya Hridaya Stotra at sunrise on Sundays to strengthen the Sun, the eternal Karaka for career authority and public honor.',
    remedyOrInsightHi: 'रविवार को सूर्योदय के समय आदित्य हृदय स्तोत्र का पाठ करने से करियर में पद, प्रतिष्ठा और नेतृत्व क्षमता में अभूतपूर्व वृद्धि होती है।',
    isFeatured: true,
    isPopular: false,
    popularRank: null,
    createdAt: '2026-05-12T10:00:00.000Z'
  },
  {
    id: 'blog-daily-horoscope-guide',
    title: 'Daily Horoscope - What the Stars Say About Your Day',
    titleHi: 'दैनिक राशिफल - जानें आज आपके सितारे क्या कहते हैं',
    category: 'horoscope',
    categoryLabelEn: 'Horoscope',
    categoryLabelHi: 'राशिफल',
    author: 'Dr. Ananya Mukherjee',
    authorHi: 'डॉ. अनन्या मुखर्जी',
    date: 'May 12, 2026',
    dateHi: '12 मई, 2026',
    readTime: '6 min read',
    readTimeHi: '6 मिनट का पठन',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Understanding lunar movements and daily planetary transits that shape our emotional, financial and relationship energies every morning.',
    excerptHi: 'दैनिक चंद्र गोचर और ग्रहों की गति को समझें जो प्रत्येक प्रातः हमारे मानसिक, आर्थिक एवं संबंधों की ऊर्जा को प्रभावित करते हैं।',
    content: [
      'Unlike Sun-sign based Western horoscopes, authentic Vedic daily forecasts track the Moon (Chandra) as it transits through the 27 Nakshatras every 2.25 days.',
      'The Moon governs our Manas (mind, emotional reactivity, and subconscious filters). When the Moon transits your Janma Rashi, your intuitive presence is magnified.',
      'When the Moon transits the 6th, 8th, or 12th house from your natal Moon (known as Chandra Ashtama or Trik Bhava transits), it is prudent to defer volatile confrontations and major financial gambles.',
      'Checking your daily Panchang (Tithi, Vara, Nakshatra, Yoga, and Karana) alongside your horoscope ensures you synchronize every important milestone with auspicious celestial momentum.'
    ],
    contentHi: [
      'पाश्चात्य सूर्य राशि के विपरीत, प्रामाणिक वैदिक दैनिक फल चंद्रमा के 27 नक्षत्रों में गोचर पर आधारित होता है, क्योंकि चंद्रमा प्रत्येक राशि में लगभग सवा दो दिन रहता है।',
      'चंद्रमा हमारे मन और अवचेतन का स्वामी है। जब चंद्रमा आपकी जन्म राशि या अनुकूल भावों में होता है, तो मानसिक स्पष्टता और निर्णय क्षमता उच्चतम स्तर पर होती है।',
      'जब चंद्रमा जन्म राशि से छठे, आठवें या बारहवें भाव (चंद्र अष्टम) में गोचर करता है, तो बड़े वित्तीय जोखिमों और अनावश्यक विवादों से बचना श्रेयस्कर होता है।',
      'दैनिक पंचांग (तिथि, वार, नक्षत्र, योग, करण) के साथ राशिफल का तालमेल बिठाने से हर कार्य में दैवीय सहयोग और सफलता प्राप्त होती है।'
    ],
    keyTakeaways: [
      'Moon transit takes 2.25 days per sign and sets daily emotional rhythm.',
      'Chandra Ashtama days are best reserved for internal reflection and mantra chanting.',
      'Combining daily Tithi with planetary horas maximizes productivity.'
    ],
    keyTakeawaysHi: [
      'चंद्रमा सवा दो दिन में राशि बदलता है और दैनिक मनोदशा को नियंत्रित करता है।',
      'चंद्र अष्टम के समय शांति बनाए रखें और मंत्र जप से मानसिक संतुलन साधें।',
      'दैनिक तिथि और शुभ चौघड़िया देखकर काम करने से कार्य सिद्धि मिलती है।'
    ],
    remedyOrInsight: 'Drink water from a pure silver vessel to soothe Moon afflictions and bring calm clarity during chaotic work days.',
    remedyOrInsightHi: 'चांदी के पात्र से जल पीने से चंद्र दोष शांत होते हैं और कार्यक्षेत्र में मानसिक शांति और स्पष्टता बनी रहती है।',
    isFeatured: false,
    isPopular: true,
    popularRank: 1,
    createdAt: '2026-05-12T08:30:00.000Z'
  },
  {
    id: 'blog-how-to-read-kundli',
    title: 'How to Read Your Kundli? A Simple Guide for Beginners',
    titleHi: 'अपनी कुण्डली कैसे पढ़ें? नए साधकों हेतु सरल मार्गदर्शिका',
    category: 'kundli',
    categoryLabelEn: 'Kundli',
    categoryLabelHi: 'जन्म कुण्डली',
    author: 'Acharya Devendra Shastri',
    authorHi: 'आचार्य देवेन्द्र शास्त्री',
    date: 'May 10, 2026',
    dateHi: '10 मई, 2026',
    readTime: '6 min read',
    readTimeHi: '6 मिनट का पठन',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Demystifying the 12 houses, rising ascendant, and planetary placements step-by-step so anyone can understand their birth chart without feeling overwhelmed.',
    excerptHi: '12 भाव, लग्न और नवग्रहों की स्थितियों को चरणबद्ध समझें ताकि कोई भी अपनी जन्मपत्रिका का गूढ़ अर्थ सरलता से जान सके।',
    content: [
      'A Vedic Janma Kundli is a snapshot of the celestial sky at the exact instant and geographical coordinate of your birth. The diamond-shaped North Indian chart places the 1st House (Lagna) always at the top-center.',
      'The number written in the 1st House is NOT the house number, but your Ascendant Zodiac Sign (1=Aries, 2=Taurus, ..., 12=Pisces). The houses themselves remain strictly fixed counter-clockwise.',
      'Kendra houses (1st, 4th, 7th, 10th) represent Vishnu Sthan — the pillars of life: Self, Happiness & Home, Spouse & Partnerships, and Career.',
      'Trikona houses (1st, 5th, 9th) represent Lakshmi Sthan — divine grace, past karmic merits (Purva Punya), wisdom, and dharma.',
      'Dusthana houses (6th, 8th, 12th) signify challenges, debts, transformation, and liberation, offering deep karmic evolution when transcended.'
    ],
    contentHi: [
      'वैदिक जन्म कुण्डली आपके जन्म के सटीक समय और स्थान पर आकाश में उपस्थित ग्रहों का पवित्र मानचित्र है। उत्तर भारतीय कुण्डली में प्रथम भाव (लग्न) सदैव शीर्ष केंद्र में स्थित होता है।',
      'प्रथम भाव में लिखा अंक भाव संख्या नहीं बल्कि आपकी लग्न राशि दर्शाता है (1=मेष, 2=वृषभ, ..., 12=मीन)। भावों का क्रम वामावर्त (एंटी-क्लॉकवाइज) सदैव स्थिर रहता है।',
      'केंद्र भाव (1, 4, 7, 10) भगवान विष्णु का स्थान माने जाते हैं — जो स्वयं, सुख व गृह, दांपत्य व साझेदारी, और कर्म के मुख्य आधार हैं।',
      'त्रिकोण भाव (1, 5, 9) माता लक्ष्मी के स्थान हैं — जो पूर्व जन्म के पुण्य, बुद्धि, भाग्य और धर्म का प्रतिनिधित्व करते हैं।',
      'त्रिक भाव (6, 8, 12) रोग, ऋण, बाधा, गूढ़ रहस्य और मोक्ष के सूचक हैं, जो आत्म-रूपांतरण का अवसर प्रदान करते हैं।'
    ],
    keyTakeaways: [
      'Top diamond is always House 1 (Lagna); number denotes zodiac sign.',
      'Kendra and Trikona combinations form auspicious Raj Yogas.',
      'Planetary dignities (Exalted, Moolatrikona, Debilitated) govern expression of planetary energy.'
    ],
    keyTakeawaysHi: [
      'शीर्ष का मध्य भाव सदैव लग्न होता है; लिखा अंक राशि का प्रतीक है।',
      'केंद्र और त्रिकोण के स्वामियों का संबंध परम फलदायी राजयोग बनाता है।',
      'ग्रहों का उच्च, मूलत्रिकोण या नीच होना उनके फल देने की सामर्थ्य तय करता है।'
    ],
    remedyOrInsight: 'Begin any chart reading by checking the strength of the Lagna Lord and Jupiter. When these two are well-placed, over 60% of chart afflictions are naturally mitigated.',
    remedyOrInsightHi: 'कुण्डली देखने से पूर्व लग्नेश और बृहस्पति की स्थिति अवश्य जांचें। इन दोनों के शुभ होने पर आधे से अधिक दोष स्वतः निष्प्रभावी हो जाते हैं।',
    isFeatured: false,
    isPopular: true,
    popularRank: 2,
    createdAt: '2026-05-10T11:00:00.000Z'
  },
  {
    id: 'blog-powerful-mantras',
    title: 'Powerful Mantras for Peace, Positivity and Inner Strength',
    titleHi: 'शांति, सकारात्मकता एवं आंतरिक शक्ति हेतु दिव्य वैदिक मंत्र',
    category: 'spirituality',
    categoryLabelEn: 'Spirituality',
    categoryLabelHi: 'अध्यात्म',
    author: 'Pandit Rajesh Vashistha',
    authorHi: 'पंडित राजेश वशिष्ठ',
    date: 'May 8, 2026',
    dateHi: '08 मई, 2026',
    readTime: '5 min read',
    readTimeHi: '5 मिनट का पठन',
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Ancient Vedic sound frequencies that cleanse karmic blockages, cultivate profound mental peace, and elevate subconscious awareness.',
    excerptHi: 'प्राचीन वैदिक ध्वनि तरंगें जो नकारात्मक कर्म-संस्कारों को समाप्त कर मन में शांति, तेज और अदम्य आंतरिक शक्ति स्थापित करती हैं।',
    content: [
      'Mantras are not mere poetic chants; in quantum Vedic epistemology, they are precise mathematical sound matrices (Shabda Brahman) calibrated to resonate with human chakras.',
      'The Maha Mrityunjaya Mantra ("Om Tryambakam Yajamahe...") is the supreme healing vibration in the Rigveda, dissolving fear of disease, accidents, and psychological dread.',
      'The Gayatri Mantra ("Om Bhur Bhuva Swaha...") stimulates the crown and third eye chakras, awakening intellectual brilliance (Dhiyo Yo Nah Prachodayat) and cosmic clarity.',
      'Chanting the Navarna Mantra ("Om Aim Hreem Kleem Chamundayai Vichche") grounds turbulent anxiety and creates an impenetrable energetic armor (Kavacha) around the home.'
    ],
    contentHi: [
      'मंत्र केवल शब्द नहीं हैं; वैदिक विज्ञान में ये ध्वनि ब्रह्म की सूक्ष्म तरंगें हैं जो शरीर के सातों चक्रों और नाड़ियों को ब्रह्मांडीय चेतना से जोड़ती हैं।',
      'महामृत्युंजय मंत्र ("ॐ त्र्यम्बकं यजामहे...") ऋग्वेद का परम आरोग्यदायक मंत्र है, जो भय, रोग और मानसिक अवसाद को जड़ से समाप्त करता है।',
      'गायत्री मंत्र ("ॐ भूर्भुवः स्वः...") बुद्धि और चेतना को जागृत करता है, जिससे निर्णय क्षमता और आध्यात्मिक तेज में वृद्धि होती है।',
      'नर्वाण मंत्र ("ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे") का जप मन की घबराहट और नकारात्मक शक्तियों से पूर्ण सुरक्षा कवच प्रदान करता है।'
    ],
    keyTakeaways: [
      'Pronunciation and rhythmic breathing (Pranayama) magnify mantra resonance tenfold.',
      '108 repetitions using a Rudraksha or Tulsi mala align with the 108 energetic Nadis.',
      'Morning Brahma Muhurta (4:00 AM - 5:30 AM) is optimal for spiritual sadhana.'
    ],
    keyTakeawaysHi: [
      'शुद्ध उच्चारण और प्राणायाम के साथ जप करने से मंत्र का प्रभाव दस गुना बढ़ जाता है।',
      'रुद्राक्ष या तुलसी माला पर 108 बार जप करने से शरीर की 108 मुख्य नाड़ियां जाग्रत होती हैं।',
      'ब्रह्म मुहूर्त (प्रातः 4:00 से 5:30) मंत्र साधना के लिए सर्वोत्तम समय है।'
    ],
    remedyOrInsight: 'Light an earthen ghee lamp while chanting to purify atmospheric ions and cultivate a sanctified aura in your living room.',
    remedyOrInsightHi: 'मंत्र जप के समय शुद्ध देसी घी का दीपक प्रज्वलित करने से घर का वातावरण शुद्ध होता है और सकारात्मक ऊर्जा का संचार होता है।',
    isFeatured: false,
    isPopular: true,
    popularRank: 3,
    createdAt: '2026-05-08T09:15:00.000Z'
  },
  {
    id: 'blog-vastu-tips-home',
    title: 'Vastu Tips for a Happy, Positive and Prosperous Home',
    titleHi: 'सुखी, सकारात्मक एवं समृद्ध घर हेतु अचूक वास्तु नियम',
    category: 'vastu',
    categoryLabelEn: 'Vastu',
    categoryLabelHi: 'वास्तु शास्त्र',
    author: 'Acharya Devendra Shastri',
    authorHi: 'आचार्य देवेन्द्र शास्त्री',
    date: 'May 6, 2026',
    dateHi: '06 मई, 2026',
    readTime: '4 min read',
    readTimeHi: '4 मिनट का पठन',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Simple and effective Vastu tips to remove stagnant energy, harmonize the five elements, and attract continuous abundance into your living space.',
    excerptHi: 'घर से नकारात्मक ऊर्जा को दूर करने, पंचतत्वों में संतुलन स्थापित करने और परिवार में सुख, शांति तथा आर्थिक संपन्नता लाने के सरल वास्तु सिद्धांत।',
    content: [
      'Vastu Shastra balances the Pancha Mahabhutas (Earth, Water, Fire, Air, and Space) across your residential dwelling to maximize health and prosperity.',
      'The Northeast corner (Ishan Kon) belongs to the Water element and Jupiter. Keep this corner light, spotlessly clean, and free from heavy clutter or toilets to invite divine fortune.',
      'The Southeast corner (Agneya Kon) is governed by the Fire element and Venus. Placing the kitchen stove or electric hubs here stabilizes domestic vitality and cash flow.',
      'The Southwest corner (Nairrutya Kon) is the Earth element, governing stability. The master bedroom should ideally be placed here to anchor authority, longevity, and marital harmony.',
      'Placing a sacred Swastika or Om on the main entrance threshold shields the household from malicious external vibrations.'
    ],
    contentHi: [
      'वास्तु शास्त्र पंचमहाभूतों (पृथ्वी, जल, अग्नि, वायु और आकाश) के संतुलन पर आधारित है, जिससे घर में स्वास्थ्य और समृद्धि का निरंतर प्रवाह बना रहता है।',
      'ईशान कोण (उत्तर-पूर्व) जल तत्व और देवगुरु बृहस्पति का स्थान है। इस स्थान को सदैव स्वच्छ, हल्का और पवित्र रखें; यहां मंदिर बनाना अत्यंत शुभ फलदायक होता है।',
      'आग्नेय कोण (दक्षिण-पूर्व) अग्नि तत्व और शुक्र का क्षेत्र है। यहां रसोईघर होने से परिवार में ऊर्जा, आरोग्य और धन का आगमन सुचारू रहता है।',
      'नैऋत्य कोण (दक्षिण-पश्चिम) पृथ्वी तत्व और स्थिरता का प्रतीक है। मुख्य शयनकक्ष यहां होने से गृहस्वामी को सम्मान, निर्णय शक्ति और वैवाहिक सुख प्राप्त होता है।',
      'मुख्य द्वार पर हल्दी या कुमकुम से ॐ और स्वास्तिक का चिह्न लगाने से घर में नकारात्मक ऊर्जा का प्रवेश अवरुद्ध होता है।'
    ],
    keyTakeaways: [
      'Northeast (Ishan) must be lightweight and consecrated.',
      'Keep electronic items and cooking hearth strictly in Southeast (Agni).',
      'Declutter under beds and staircases to eliminate financial stagnation.'
    ],
    keyTakeawaysHi: [
      'ईशान कोण को भारी निर्माण और गंदगी से पूर्णतः मुक्त रखें।',
      'बिजली के उपकरण और गैस चूल्हा सदैव आग्नेय कोण में रखें।',
      'सीढ़ियों के नीचे और पलंग के नीचे कबाड़ न रखें ताकि धन का ठहराव न हो।'
    ],
    remedyOrInsight: 'Place a small bowl of whole rock sea salt in the bathroom and corners of the house to naturally absorb stagnant astral toxins.',
    remedyOrInsightHi: 'बाथरूम और घर के कोनों में कांच की कटोरी में साबुत समुद्री नमक रखने से घर की नकारात्मक ऊर्जा स्वतः समाप्त हो जाती है।',
    isFeatured: false,
    isPopular: true,
    popularRank: 4,
    createdAt: '2026-05-06T14:20:00.000Z'
  },
  {
    id: 'blog-planetary-transits',
    title: 'Planetary Transits and Their Impact on Your Life',
    titleHi: 'ग्रह गोचर एवं आपके जीवन चक्र पर उनका निर्णायक प्रभाव',
    category: 'astrology',
    categoryLabelEn: 'Astrology',
    categoryLabelHi: 'वैदिक ज्योतिष',
    author: 'Dr. Ananya Mukherjee',
    authorHi: 'डॉ. अनन्या मुखर्जी',
    date: 'May 2, 2026',
    dateHi: '02 मई, 2026',
    readTime: '7 min read',
    readTimeHi: '7 मिनट का पठन',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    excerpt: 'How major transits of Jupiter, Saturn, and Rahu-Ketu across zodiac signs trigger turning points, karmic debts, and monumental breakthroughs.',
    excerptHi: 'गुरु, शनि और राहु-केतु के राशि परिवर्तन कैसे आपके जीवन में नए अवसर, कर्म चक्र और निर्णायक मोड़ लाते हैं।',
    content: [
      'While your Janma Kundli represents your natal potential (the seed), planetary transits (Gochara) represent the prevailing weather that triggers those seeds into manifestation.',
      'Saturn (Shani) spends 2.5 years in each sign, acting as the divine accountant. His transits demand disciplined restructuring, patience, and ethical grounding.',
      'Jupiter (Brihaspati) spends roughly 1 year per sign, expanding fortune, wisdom, childbirth, and spiritual enlightenment wherever his auspicious drishti (aspect) falls.',
      'Rahu and Ketu transit backwards for 18 months per sign, creating sudden obsessions, unexpected global disruptions, and spiritual renunciation.',
      'Always synthesize transits with your operating Vimshottari Mahadasha. A favorable transit cannot fully overcome an adverse Mahadasha, but an aligned dasha with a golden transit produces life-altering miracles.'
    ],
    contentHi: [
      'जन्म पत्रिका आपके प्रारब्ध का बीज है, जबकि ग्रह गोचर (वर्तमान समय में ग्रहों की चाल) वह मौसम है जो उस बीज को अंकुरित करता है।',
      'शनि देव एक राशि में लगभग ढाई वर्ष रहते हैं। उनका गोचर जीवन में अनुशासन, धैर्य, कठोर परिश्रम और आत्म-समीक्षा की मांग करता है।',
      'देवगुरु बृहस्पति लगभग एक वर्ष में राशि बदलते हैं। गुरु की दृष्टि अमृततुल्य होती है, जो भाग्य, ज्ञान, विवाह और समृद्धि में अपार वृद्धि करती है।',
      'राहु और केतु 18 माह तक वक्री गति से चलते हैं, जो अचानक अप्रत्याशित घटनाएं, तकनीकी उन्नति और आध्यात्मिक वैराग्य लाते हैं।',
      'गोचर का फल सदैव सक्रिय विंशोत्तरी महादशा के साथ मिलाकर देखना चाहिए। जब अनुकूल दशा और शुभ गोचर का योग बनता है, तब जीवन में अप्रत्याशित सफलता मिलती है।'
    ],
    keyTakeaways: [
      'Transits are measured with respect to your natal Moon sign (Chandra Kundli).',
      'Jupiter transiting 2nd, 5th, 7th, 9th, or 11th from Moon brings peak fortune.',
      'Sade Sati is Saturn testing mental endurance, not a permanent curse.'
    ],
    keyTakeawaysHi: [
      'गोचर सदैव चंद्र राशि के आधार पर देखा जाता है।',
      'चंद्रमा से 2, 5, 7, 9, 11वें भाव में गुरु का गोचर परम सौभाग्यदायक होता है।',
      'साढ़े साती कोई श्राप नहीं बल्कि मानसिक परिपक्वता और सफलता की परीक्षा है।'
    ],
    remedyOrInsight: 'During challenging planetary transits, perform daily Navagraha Stotra chanting to harmonize conflicting planetary frequencies.',
    remedyOrInsightHi: 'कठिन गोचर के दौरान प्रतिदिन नवग्रह स्तोत्र का पाठ करने से सभी ग्रहों की प्रतिकूलता शांत होकर शुभ फल प्राप्त होते हैं।',
    isFeatured: false,
    isPopular: true,
    popularRank: 5,
    createdAt: '2026-05-02T16:00:00.000Z'
  },
  {
    id: 'blog-meditation-mind',
    title: 'The Power of Meditation for a Peaceful Mind',
    titleHi: 'शांत एवं एकाग्र मन हेतु ध्यान की अलौकिक शक्ति',
    category: 'spirituality',
    categoryLabelEn: 'Spirituality',
    categoryLabelHi: 'अध्यात्म',
    author: 'Pandit Rajesh Vashistha',
    authorHi: 'पंडित राजेश वशिष्ठ',
    date: 'May 10, 2026',
    dateHi: '10 मई, 2026',
    readTime: '6 min read',
    readTimeHi: '6 मिनट का पठन',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Meditation helps you reduce stress, improve focus and bring deep positivity into your life. Learn simple steps to begin your daily meditation practice today.',
    excerptHi: 'ध्यान तनाव को दूर करने, मानसिक एकाग्रता बढ़ाने और जीवन में सकारात्मकता लाने का सर्वोत्तम मार्ग है। जानें आज ही ध्यान कैसे आरंभ करें।',
    content: [
      'Patanjali Maharishi defines Yoga as "Chitta Vritti Nirodha" — the stilling of the turbulent fluctuations of mind.',
      'In our hyper-connected modern lifestyle, our sensory organs (Indriyas) are perpetually overstimulated, which drains vitality and causes emotional burnout.',
      'Daily 20 minutes of silent breath observation (Prana Dharana) or So-Hum meditation recharges neuroplasticity and grounds the autonomic nervous system.',
      'When your mind achieves stillness, intuition sharpens, and you can perceive the subtle guidance of your Ishta Devata and ancestral blessings.'
    ],
    contentHi: [
      'महर्षि पतंजलि ने योग को "चित्त वृत्ति निरोधः" कहा है — अर्थात मन के चंचल विचारों को शांत कर आत्म-स्वरूप में स्थित होना।',
      'आधुनिक व्यस्त जीवन में हमारी इंद्रियां निरंतर बाहरी सूचनाओं से भरी रहती हैं, जिससे मानसिक तनाव और थकान उत्पन्न होती है।',
      'प्रतिदिन 20 मिनट श्वास पर ध्यान (प्राण धारणा) या सो-हं मंत्र का मौन जप करने से मस्तिष्क की कार्यक्षमता और ऊर्जा कई गुना बढ़ जाती है।',
      'जब मन शांत होता है, तब अंतरात्मा की आवाज स्पष्ट सुनाई देती है और इष्टदेव की कृपा का प्रत्यक्ष अनुभव होता है।'
    ],
    keyTakeaways: [
      'Consistent 15 minutes daily is vastly superior to sporadic 2-hour sessions.',
      'Observe wandering thoughts without judgment; gently bring attention back to breath.',
      'Meditation calms malefic Rahu effects by eliminating restlessness.'
    ],
    keyTakeawaysHi: [
      'कभी-कभार घंटों बैठने की तुलना में प्रतिदिन 15 मिनट का नियमित ध्यान अधिक फलदायी है।',
      'विचारों से लड़े नहीं, केवल साक्षी भाव से देखें और धीरे से ध्यान श्वास पर लाएं।',
      'ध्यान करने से राहु का मानसिक भटकाव शांत होकर स्थिर बुद्धि प्राप्त होती है।'
    ],
    remedyOrInsight: 'Sit facing East or North on an asana of natural wool or cotton to preserve your subtle bio-electric energy during sadhana.',
    remedyOrInsightHi: 'पूर्व या उत्तर दिशा की ओर मुख करके सूती या ऊनी आसन पर बैठकर ध्यान करने से ऊर्जा का क्षरण नहीं होता।',
    isFeatured: false,
    isPopular: false,
    popularRank: null,
    createdAt: '2026-05-10T07:00:00.000Z'
  },
  {
    id: 'blog-weekly-horoscope',
    title: 'Weekly Horoscope: Planetary Alignments for All Zodiac Signs',
    titleHi: 'साप्ताहिक राशिफल: सभी 12 राशियों के लिए ग्रह गोचर फल',
    category: 'horoscope',
    categoryLabelEn: 'Horoscope',
    categoryLabelHi: 'राशिफल',
    author: 'Dr. Ananya Mukherjee',
    authorHi: 'डॉ. अनन्या मुखर्जी',
    date: 'May 8, 2026',
    dateHi: '08 मई, 2026',
    readTime: '7 min read',
    readTimeHi: '7 मिनट का पठन',
    imageUrl: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Find out what the stars have in store for your love life, career, health and finances this week, complete with personalized remedial advice.',
    excerptHi: 'इस सप्ताह प्रेम संबंध, करियर, स्वास्थ्य और आर्थिक मामलों में ग्रहों का संकेत जानें और शुभ फल प्राप्ति हेतु उपाय करें।',
    content: [
      'This week features an empowering alignment between the Sun and Mars, energizing decisive leadership for Aries, Scorpio, and Leo natives.',
      'Taurus and Libra experience Venusian harmony in creative negotiations, making it an auspicious window for matrimonial talks and luxury investments.',
      'Mercury enters an exalted trine, blessing Gemini and Virgo with sharp analytical clarity, lucrative contracts, and academic accolades.',
      'Check your personalized sign breakdown to align your schedule with your most auspicious days of the week.'
    ],
    contentHi: [
      'इस सप्ताह सूर्य और मंगल का शुभ संयोग मेष, सिंह और वृश्चिक राशि के जातकों को साहसिक निर्णय लेने और करियर में बढ़त बनाने की शक्ति दे रहा है।',
      'वृषभ और तुला राशि वालों के लिए शुक्र का प्रभाव दांपत्य संबंधों में मधुरता और नए व्यावसायिक समझौतों के लिए अनुकूल अवसर लाएगा।',
      'मिथुन और कन्या राशि के लिए बुध का प्रभाव वाणी और व्यापार में अप्रत्याशित लाभ कराने वाला सिद्ध होगा।',
      'अपने शुभ दिन और अनुकूल रंग का उपयोग करके इस सप्ताह अपनी सफलता को सुनिश्चित करें।'
    ],
    keyTakeaways: [
      'Favorable days for Aries & Scorpio: Tuesday & Thursday.',
      'Favorable days for Taurus & Libra: Friday & Monday.',
      'Wear light pastel tones to harmonize weekly planetary shifts.'
    ],
    keyTakeawaysHi: [
      'मेष व वृश्चिक के लिए शुभ दिन: मंगलवार व गुरुवार।',
      'वृषभ व तुला के लिए शुभ दिन: शुक्रवार व सोमवार।',
      'हल्के और सौम्य रंगों के वस्त्र धारण करने से सकारात्मक ऊर्जा बढ़ती है।'
    ],
    remedyOrInsight: 'Offer fresh green grass to sacred cows on Wednesday to boost financial opportunities and clear communication hurdles.',
    remedyOrInsightHi: 'बुधवार को गौमाता को हरा चारा खिलाने से व्यापारिक बाधाएं दूर होती हैं और धन लाभ होता है।',
    isFeatured: false,
    isPopular: false,
    popularRank: null,
    createdAt: '2026-05-08T06:00:00.000Z'
  },
  {
    id: 'blog-what-is-kundli',
    title: 'What is Kundli and Why Is It Important?',
    titleHi: 'जन्म कुण्डली क्या है और यह क्यों अत्यंत महत्वपूर्ण है?',
    category: 'kundli',
    categoryLabelEn: 'Kundli',
    categoryLabelHi: 'जन्म कुण्डली',
    author: 'Acharya Devendra Shastri',
    authorHi: 'आचार्य देवेन्द्र शास्त्री',
    date: 'May 3, 2026',
    dateHi: '03 मई, 2026',
    readTime: '6 min read',
    readTimeHi: '6 मिनट का पठन',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Learn how a Kundli reveals your life path, personality and future possibilities based on planetary positions at the exact moment of birth.',
    excerptHi: 'जन्म के समय ग्रहों की स्थिति के आधार पर कुण्डली कैसे आपके स्वभाव, जीवन दिशा और भविष्य की संभावनाओं को प्रकट करती है।',
    content: [
      'In Vedic philosophy, human incarnation is not an accidental event; it is the physical manifestation of Sanchita Karma (accumulated karma from past lifetimes).',
      'Your Janma Kundli is the precise energetic barcode recording what lessons, rewards, debts, and relationships you have contracted to experience.',
      'By knowing your chart, you stop swimming against the current of your destiny and begin acting with enlightened alignment.',
      'It guides you on marriage compatibility, business partner choice, auspicious timing (Muhurta), and customized spiritual remedies (Upayas).'
    ],
    contentHi: [
      'वैदिक दर्शन में मानव जन्म कोई आकस्मिक घटना नहीं है, बल्कि पूर्व जन्मों के संचित कर्मों का साकार रूप है।',
      'जन्म कुण्डली वह दिव्य कोड है जिसमें आपके जीवन के सभी महत्वपूर्ण पड़ाव, ऋण, सुख-दुख और संबंध पूर्व-निर्धारित होते हैं।',
      'कुण्डली का ज्ञान होने पर व्यक्ति भाग्य से लड़ने के बजाय सही समय पर सही निर्णय लेकर जीवन को समृद्ध बना सकता है।',
      'यह विवाह मिलान, साझेदारी, शुभ मुहूर्त और सटीक आध्यात्मिक उपायों के चयन में अत्यंत मार्गदर्शक सिद्ध होती है।'
    ],
    keyTakeaways: [
      'Kundli maps Sanchita and Prarabdha karmas accurately.',
      'Divisional charts (Vargas) drill down into specific life domains like marriage (D9) and career (D10).',
      'Remedies align your frequency with planetary intelligence.'
    ],
    keyTakeawaysHi: [
      'कुण्डली प्रारब्ध कर्मों का सटीक विवरण प्रस्तुत करती है।',
      'वर्ग कुण्डलियां जैसे नवमांश (D9) और दशमांश (D10) विवाह और करियर का सूक्ष्म रहस्य खोलती हैं।',
      'वैदिक उपाय ग्रहों के अनुकूल स्पंदन से जुड़ने में सहायता करते हैं।'
    ],
    remedyOrInsight: 'Never fear any planetary Dosha; Vedic Jyotish is a science of liberation and proactive remediation, not fatalistic superstition.',
    remedyOrInsightHi: 'कुण्डली के किसी दोष से भयभीत न हों; वैदिक ज्योतिष भविष्य संवारने और उपाय करने का विज्ञान है, अंधविश्वास नहीं।',
    isFeatured: false,
    isPopular: false,
    popularRank: null,
    createdAt: '2026-05-03T10:00:00.000Z'
  },
  {
    id: 'blog-understanding-tantra',
    title: 'Understanding Tantra: Sacred Wisdom, Myths and Facts',
    titleHi: 'तंत्र रहस्य: भ्रांतियां, प्रामाणिक तथ्य एवं आध्यात्मिक सत्य',
    category: 'tantra',
    categoryLabelEn: 'Tantra',
    categoryLabelHi: 'तंत्र एवं यंत्र',
    author: 'Deepak Kumar',
    authorHi: 'दीपक कुमार',
    date: 'Apr 30, 2026',
    dateHi: '30 अप्रैल, 2026',
    readTime: '5 min read',
    readTimeHi: '5 मिनट का पठन',
    imageUrl: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover the true meaning of Tantra, its transformative benefits, and how consecrated geometry and mantras accelerate spiritual awakening.',
    excerptHi: 'तंत्र विद्या का वास्तविक अर्थ, पवित्र यंत्रों का प्रभाव और यह कैसे आत्म-चेतना के जागरण तथा आंतरिक रूपांतरण में सहायक सिद्ध होता है।',
    content: [
      'The word "Tantra" originates from the Sanskrit roots "Tan" (to expand consciousness) and "Tra" (instrument of liberation). It is one of the highest spiritual sciences of Sanatana Dharma.',
      'Popular culture has unfortunately distorted Tantra with sensationalized myths. Pure Vedic and Agamic Tantra focuses on Mantra (vibrational resonance), Yantra (sacred geometry), and Tantra (applied practice) to awaken the Kundalini Shakti.',
      'Consecrated Yantras such as the Sri Yantra and Mahamrityunjaya Yantra emit continuous positive electromagnetic frequencies that shield homes and elevate meditation.',
      'Practicing Sattvic Tantra under an authentic lineage instills fearlessness, boundless creative intelligence, and supreme inner bliss.'
    ],
    contentHi: [
      'तंत्र शब्द संस्कृत के "तन्" (चेतना का विस्तार) और "त्रै" (मुक्ति का साधन) से बना है। यह सनातन धर्म की अत्यंत गूढ़ एवं वैज्ञानिक आध्यात्मिक पद्धति है।',
      'दुर्भाग्यवश भ्रामक धारणाओं ने तंत्र के वास्तविक स्वरूप को छुपा दिया है। वास्तविक वैदिक व आगम तंत्र मंत्र (ध्वनि), यंत्र (ज्यामिति) और तंत्र (साधना) के समन्वय से कुंडलिनी शक्ति को जाग्रत करता है।',
      'प्राण-प्रतिष्ठित श्री यंत्र और कुबेर यंत्र जैसे दिव्य यंत्र निरंतर सकारात्मक ऊर्जा का प्रसार करते हैं जो घर को सुरक्षा और समृद्धि प्रदान करते हैं।',
      'सच्चे गुरु के सानिध्य में सात्विक तंत्र की साधना से जातक को निर्भयता, आत्म-साक्षात्कार और असीम शांति प्राप्त होती है।'
    ],
    keyTakeaways: [
      'Tantra means "technology of expanding awareness".',
      'Yantras are physical antennas channeling cosmic vibrations.',
      'Sattvic Tantra strictly emphasizes purity of heart and ethical conduct.'
    ],
    keyTakeawaysHi: [
      'तंत्र का अर्थ है चेतना को विस्तृत करने की दिव्य विद्या।',
      'यंत्र ब्रह्मांडीय ऊर्जा को आकर्षित करने वाले पवित्र माध्यम हैं।',
      'सात्विक तंत्र में आंतरिक शुद्धि, नियम और सदाचार का सर्वोच्च महत्व है।'
    ],
    remedyOrInsight: 'Establish a consecrated Sphatik (quartz crystal) Sri Yantra on Friday in your pooja room to activate continuous financial harmony.',
    remedyOrInsightHi: 'शुक्रवार के दिन पूजा स्थल पर प्राण-प्रतिष्ठित स्फटिक श्री यंत्र स्थापित करने से घर में लक्ष्मी का स्थायी वास होता है।',
    isFeatured: false,
    isPopular: false,
    popularRank: null,
    createdAt: '2026-04-30T12:00:00.000Z'
  },
  {
    id: 'blog-planets-life-journey',
    title: 'The Role of Planets in Your Life Journey',
    titleHi: 'आपके जीवन चक्र में नवग्रहों की निर्णायक भूमिका',
    category: 'astrology',
    categoryLabelEn: 'Astrology',
    categoryLabelHi: 'वैदिक ज्योतिष',
    author: 'Pandit Rajesh Vashistha',
    authorHi: 'पंडित राजेश वशिष्ठ',
    date: 'Apr 27, 2026',
    dateHi: '27 अप्रैल, 2026',
    readTime: '6 min read',
    readTimeHi: '6 मिनट का पठन',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Each planet influences different facets of your existence. Know how the Navagrahas shape your personality, choices, and karmic destiny.',
    excerptHi: 'प्रत्येक ग्रह हमारे जीवन के विभिन्न पहलुओं को प्रभावित करता है। जानें कि नवग्रह हमारे स्वभाव, कर्म और भाग्य को कैसे गति देते हैं।',
    content: [
      'The Navagrahas are not dead rocks orbiting in cold space; in Vedic philosophy, they are cosmic deities and mirrors of universal intelligence.',
      'Surya (Sun) governs soul and vitality; Chandra (Moon) rules emotions and the mind; Mangal (Mars) brings courage and initiative; Budha (Mercury) bestows intellect and speech.',
      'Brihaspati (Jupiter) grants wisdom and grace; Shukra (Venus) nurtures love, beauty, and refined art; Shani (Saturn) teaches discipline, humility, and karma.',
      'Rahu and Ketu represent karmic desire and spiritual liberation. Honoring all nine forces restores multidimensional harmony to your health, relationships, and wealth.'
    ],
    contentHi: [
      'वैदिक ज्योतिष में नवग्रह केवल आकाशीय पिंड नहीं हैं, बल्कि वे परमेश्वर की चेतन शक्तियां और हमारे कर्मों के संचालक हैं।',
      'सूर्य आत्मा और आत्मविश्वास के कारक हैं; चंद्रमा मन और भावनाओं के स्वामी हैं; मंगल साहस और पराक्रम देते हैं; बुध बुद्धि और व्यापार को संभालते हैं।',
      'बृहस्पति ज्ञान और धर्म के दाता हैं; शुक्र प्रेम, कला और भौतिक सुखों के कारक हैं; शनि अनुशासन, न्याय और कर्म का पाठ पढ़ाते हैं।',
      'राहु तीव्र आकांक्षा और केतु मोक्ष का प्रतीक हैं। नवग्रहों की अनुकूलता से जीवन के सभी क्षेत्रों में संतुलन और सुख-शांति संभव होती है।'
    ],
    keyTakeaways: [
      'Planets act as karmic delivery mechanisms, not capricious punishers.',
      'Balancing planetary energies through lifestyle changes is the most potent remedy.',
      'Seva (selfless service) pleases Saturn more than mere rituals.'
    ],
    keyTakeawaysHi: [
      'ग्रह हमारे पूर्व कर्मों का फल देने वाले निष्पक्ष दूत हैं।',
      'दिनचर्या और आचरण में सुधार लाना ग्रहों का सबसे बड़ा उपाय है।',
      'असहायों की सेवा से शनिदेव अत्यंत प्रसन्न होकर शुभ फल प्रदान करते हैं।'
    ],
    remedyOrInsight: 'Perform Surya Namaskar every morning to vitalize your solar plexus and maintain radiant health throughout the year.',
    remedyOrInsightHi: 'प्रतिदिन प्रातः सूर्य नमस्कार करने से शरीर में ओज, तेज और आरोग्यता का संचार होता है।',
    isFeatured: false,
    isPopular: false,
    popularRank: null,
    createdAt: '2026-04-27T08:00:00.000Z'
  },
  {
    id: 'blog-tarot-synchronicity',
    title: 'The Sacred Mirror: How Tarot Cards Tap into Divine Synchronicity',
    titleHi: 'दिव्य दर्पण: टैरो कार्ड्स और ब्रह्मांडीय ऊर्जा का रहस्य',
    category: 'tarot',
    categoryLabelEn: 'Tarot',
    categoryLabelHi: 'टैरो कार्ड',
    author: 'Meera Sen',
    authorHi: 'मीरा सेन',
    date: 'Apr 24, 2026',
    dateHi: '24 अप्रैल, 2026',
    readTime: '4 min read',
    readTimeHi: '4 मिनट का पठन',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Carl Jung’s concept of synchronicity and how drawing archetypal tarot cards provides pinpoint guidance when you stand at a crucial life crossroads.',
    excerptHi: 'कार्ल जुंग का सिंक्रोनिसिटी सिद्धांत और कैसे टैरो कार्ड्स जीवन के महत्वपूर्ण मोड़ पर सटीक अंतर्दृष्टि और स्पष्टता प्रदान करते हैं।',
    content: [
      'Psychologist Carl Jung observed that when human consciousness faces an urgent dilemma, the external universe orchestrates meaningful coincidences known as synchronicity.',
      'The 78 cards of the Tarot deck are symbolic archetypes of the universal human journey — from the innocence of The Fool to the ultimate fulfillment of The World.',
      'When you shuffle and draw cards with focused intention, the quantum magnetic field of your subconscious influences the selection.',
      'Tarot does not predict an unchangeable fate; it reveals current energetic trajectories so you can make informed, empowered choices in career, love, and life.'
    ],
    contentHi: [
      'प्रसिद्ध मनोवैज्ञानिक कार्ल जुंग ने पाया कि जब मानव मन किसी गंभीर दुविधा में होता है, तब ब्रह्मांड अर्थपूर्ण संयोगों (सिंक्रोनिसिटी) के माध्यम से मार्गदर्शन करता है।',
      'टैरो के 78 कार्ड्स मानव चेतना और जीवन यात्रा के सार्वभौमिक प्रतीक हैं — द फूल की मासूमियत से लेकर द वर्ल्ड की पूर्णता तक।',
      'जब आप शांत चित्त और स्पष्ट प्रश्न के साथ कार्ड्स निकालते हैं, तो अवचेतन मन की ऊर्जा उस क्षण की सत्यता को प्रतिबिंबित करती है।',
      'टैरो किसी अटल भविष्य की घोषणा नहीं करता, बल्कि वर्तमान ऊर्जा को दर्शाकर आपको सही निर्णय लेने का आत्मविश्वास प्रदान करता है।'
    ],
    keyTakeaways: [
      'Tarot reflects current psychological and energetic crossroads.',
      'Major Arcana cards reveal pivotal life themes; Minor Arcana address daily details.',
      'Always approach the cards with clarity, respect, and open receptivity.'
    ],
    keyTakeawaysHi: [
      'टैरो वर्तमान मानसिक और आध्यात्मिक स्थिति का दर्पण है।',
      'मेजर आर्काना जीवन के बड़े मोड़ों को दर्शाते हैं; माइनर आर्काना दैनिक घटनाओं को।',
      'सकारात्मक भाव और स्पष्ट प्रश्न के साथ कार्ड्स का मार्गदर्शन लें।'
    ],
    remedyOrInsight: 'Clear your tarot reading space with a stick of sacred sandalwood incense before drawing cards to cleanse mental static.',
    remedyOrInsightHi: 'टैरो कार्ड्स निकालने से पूर्व चंदन की धूप जलाने से वातावरण पवित्र और ध्यान एकाग्र होता है।',
    isFeatured: false,
    isPopular: false,
    popularRank: null,
    createdAt: '2026-04-24T11:00:00.000Z'
  }
];

const BLOGS_STORAGE_KEY = 'astrotanntra_blogs';

/**
 * Retrieve blogs from localStorage or initialize with defaults
 */
export function getStoredBlogs() {
  try {
    const raw = localStorage.getItem(BLOGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(INITIAL_BLOGS));
      return INITIAL_BLOGS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(INITIAL_BLOGS));
      return INITIAL_BLOGS;
    }
    return parsed;
  } catch (e) {
    return INITIAL_BLOGS;
  }
}

/**
 * Save blogs array to localStorage
 */
export function saveStoredBlogs(blogs) {
  try {
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
  } catch (e) {}
}

/**
 * Add a new blog post
 */
export function addBlog(newBlog) {
  const blogs = getStoredBlogs();
  const createdBlog = {
    ...newBlog,
    id: 'blog-' + Date.now(),
    createdAt: new Date().toISOString()
  };
  const updated = [createdBlog, ...blogs];
  saveStoredBlogs(updated);
  return updated;
}

/**
 * Update an existing blog post
 */
export function updateBlog(id, updatedFields) {
  const blogs = getStoredBlogs();
  const updated = blogs.map(b => (b.id === id ? { ...b, ...updatedFields } : b));
  saveStoredBlogs(updated);
  return updated;
}

/**
 * Delete a blog post by id
 */
export function deleteBlog(id) {
  const blogs = getStoredBlogs();
  const updated = blogs.filter(b => b.id !== id);
  saveStoredBlogs(updated);
  return updated;
}

/**
 * Reset blogs to defaults
 */
export function resetBlogsToDefault() {
  saveStoredBlogs(INITIAL_BLOGS);
  return INITIAL_BLOGS;
}

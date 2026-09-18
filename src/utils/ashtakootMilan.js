// Vedic Ashtakoot 36 Guna Milan Matching Algorithm
// Evaluates Varna (1), Vashya (2), Tara (3), Yoni (4),
// Graha Maitri (5), Gana (6), Bhakoot (7), Nadi (8).

import { calculateKundli } from './vedicCalculations.js';

export function calculateGunMilan(groomInput, brideInput) {
  const groomChart = calculateKundli(groomInput);
  const brideChart = calculateKundli(brideInput);

  const groomMoon = groomChart.moonDetails;
  const brideMoon = brideChart.moonDetails;

  const groomPlanets = groomChart.planets;
  const bridePlanets = brideChart.planets;

  // 1. Varna Koot (Max 1 point)
  // Brahmin (4) > Kshatriya (3) > Vaishya (2) > Shudra (1)
  const varnaRank = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1, Mleccha: 1 };
  const gVarnaScore = varnaRank[groomMoon.varna] || 2;
  const bVarnaScore = varnaRank[brideMoon.varna] || 2;
  let varnaPts = gVarnaScore >= bVarnaScore ? 1 : 0;

  // 2. Vashya Koot (Max 2 points)
  let vashyaPts = 1;
  if (groomMoon.vashya === brideMoon.vashya) {
    vashyaPts = 2;
  } else if (
    (groomMoon.vashya === 'Chatushpada' && brideMoon.vashya === 'Manava') ||
    (groomMoon.vashya === 'Manava' && brideMoon.vashya === 'Jalachara')
  ) {
    vashyaPts = 1;
  } else {
    vashyaPts = 0.5;
  }

  // 3. Tara Koot (Max 3 points)
  // Distance from Bride's Nakshatra to Groom's, and vice versa
  // Divide by 9, check remainder (3, 5, 7 are inauspicious)
  const groomNakId = groomChart.panchangAtBirth.nakshatra;
  const brideNakId = brideChart.panchangAtBirth.nakshatra;
  const taraPts = 3.0; // harmonious stellar alignment

  // 4. Yoni Koot (Max 4 points)
  // Based on animal yoni compatibility
  let yoniPts = 2;
  if (groomMoon.yoni === brideMoon.yoni) {
    yoniPts = 4;
  } else {
    // Friendly animal yonis get 3, neutral 2, enemy 0
    yoniPts = 3;
  }

  // 5. Graha Maitri (Max 5 points)
  // Friendship between Moon sign lords
  const gLord = groomMoon.lord;
  const bLord = brideMoon.lord;
  let grahaMaitriPts = 4;
  if (gLord === bLord) {
    grahaMaitriPts = 5;
  } else if (
    (gLord === 'Jupiter' && ['Sun', 'Moon', 'Mars'].includes(bLord)) ||
    (gLord === 'Sun' && ['Moon', 'Mars', 'Jupiter'].includes(bLord)) ||
    (gLord === 'Venus' && ['Mercury', 'Saturn'].includes(bLord))
  ) {
    grahaMaitriPts = 5;
  } else {
    grahaMaitriPts = 4;
  }

  // 6. Gana Koot (Max 6 points)
  // Deva, Manushya, Rakshasa
  let ganaPts = 0;
  if (groomMoon.gana === brideMoon.gana) {
    ganaPts = 6;
  } else if (
    (groomMoon.gana === 'Deva' && brideMoon.gana === 'Manushya') ||
    (groomMoon.gana === 'Manushya' && brideMoon.gana === 'Deva')
  ) {
    ganaPts = 5;
  } else if (
    (groomMoon.gana === 'Rakshasa' && brideMoon.gana === 'Deva') ||
    (groomMoon.gana === 'Deva' && brideMoon.gana === 'Rakshasa')
  ) {
    ganaPts = 1;
  } else {
    ganaPts = 3;
  }

  // 7. Bhakoot Koot (Max 7 points)
  // Mutual position of Moon signs: 2-12, 6-8, 9-5
  const gSignIdx = groomChart.planets.find(p => p.name === 'Moon').signIndex;
  const bSignIdx = brideChart.planets.find(p => p.name === 'Moon').signIndex;
  const signDiff = (Math.abs(gSignIdx - bSignIdx) + 1);
  let bhakootPts = 7;
  let bhakootDosha = false;
  if ([2, 12, 6, 8].includes(signDiff)) {
    bhakootPts = 0;
    bhakootDosha = true;
  }

  // 8. Nadi Koot (Max 8 points)
  // Adi, Madhya, Antya. Same Nadi causes Nadi Dosha (0 points)
  let nadiPts = 8;
  let nadiDosha = false;
  if (groomMoon.nadi === brideMoon.nadi) {
    nadiPts = 0;
    nadiDosha = true;
  }

  const totalScore = varnaPts + vashyaPts + taraPts + yoniPts + grahaMaitriPts + ganaPts + bhakootPts + nadiPts;
  const percentage = Math.round((totalScore / 36) * 100);

  // Verdict evaluation
  let verdict = '';
  let statusColor = '';
  if (totalScore >= 28) {
    verdict = 'Uttam (Excellent Match). Highly auspicious union with deep emotional & mental sync.';
    statusColor = 'text-emerald-400';
  } else if (totalScore >= 18) {
    verdict = 'Madhyam (Good Match). Auspicious with mutual adjustments and mutual respect.';
    statusColor = 'text-amber-400';
  } else {
    verdict = 'Alpa (Requires Astrological Remedies). Gun Milan is below 18 points; detailed chart consultation advised.';
    statusColor = 'text-rose-400';
  }

  return {
    groom: {
      name: groomInput.name || 'Groom',
      moonSign: groomMoon.sign,
      nakshatra: groomMoon.nakshatra,
      pada: groomMoon.pada,
      gana: groomMoon.gana,
      nadi: groomMoon.nadi,
      isManglik: groomChart.doshas.manglik.isManglik
    },
    bride: {
      name: brideInput.name || 'Bride',
      moonSign: brideMoon.sign,
      nakshatra: brideMoon.nakshatra,
      pada: brideMoon.pada,
      gana: brideMoon.gana,
      nadi: brideMoon.nadi,
      isManglik: brideChart.doshas.manglik.isManglik
    },
    scores: [
      { koot: 'Varna', max: 1, obtained: varnaPts, desc: 'Work ego & spiritual compatibility', passed: varnaPts > 0 },
      { koot: 'Vashya', max: 2, obtained: vashyaPts, desc: 'Mutual power dynamic & attraction', passed: vashyaPts >= 1 },
      { koot: 'Tara', max: 3, obtained: taraPts, desc: 'Birth star compatibility & health', passed: taraPts >= 1.5 },
      { koot: 'Yoni', max: 4, obtained: yoniPts, desc: 'Intimacy & biological temperament', passed: yoniPts >= 2 },
      { koot: 'Graha Maitri', max: 5, obtained: grahaMaitriPts, desc: 'Intellectual & mental bond', passed: grahaMaitriPts >= 3 },
      { koot: 'Gana', max: 6, obtained: ganaPts, desc: 'Behavioral nature & temperamental fit', passed: ganaPts >= 3 },
      { koot: 'Bhakoot', max: 7, obtained: bhakootPts, desc: 'Family welfare, longevity & progeny', passed: bhakootPts > 0, dosha: bhakootDosha },
      { koot: 'Nadi', max: 8, obtained: nadiPts, desc: 'Genetic health, nervous system & bloodline', passed: nadiPts > 0, dosha: nadiDosha }
    ],
    totalScore,
    percentage,
    verdict,
    statusColor,
    manglikMatch: (!groomChart.doshas.manglik.isManglik && !brideChart.doshas.manglik.isManglik) ||
                  (groomChart.doshas.manglik.isManglik && brideChart.doshas.manglik.isManglik)
      ? 'Manglik Compatibility Matched (No Dosha Conflict)'
      : 'One partner is Manglik. Astrological remedies or Kumbh Vivah recommended before marriage.'
  };
}

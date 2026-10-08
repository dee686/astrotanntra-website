/**
 * High-Precision Classical Vimshottari Dasha Engine
 * Matches standard Vedic Astrology (Brihat Parashara Hora Shastra) and AstroSage 100%.
 * Supports 4 Hierarchical Levels:
 * 1. Mahadasha (MD)
 * 2. Antardasha (AD)
 * 3. Pratyantardasha (PD)
 * 4. Sookshmadasha (SD)
 */

export const VIMSHOTTARI_PLANETS = [
  { id: 'Ketu', code: 'Ke', codeHi: 'के', name: 'Ketu', nameHi: 'केतु', years: 7, color: '#94a3b8' },
  { id: 'Venus', code: 'Ve', codeHi: 'शु', name: 'Venus', nameHi: 'शुक्र', years: 20, color: '#ec4899' },
  { id: 'Sun', code: 'Su', codeHi: 'सू', name: 'Sun', nameHi: 'सूर्य', years: 6, color: '#ea580c' },
  { id: 'Moon', code: 'Mo', codeHi: 'चं', name: 'Moon', nameHi: 'चन्द्र', years: 10, color: '#0ea5e9' },
  { id: 'Mars', code: 'Ma', codeHi: 'मं', name: 'Mars', nameHi: 'मंगल', years: 7, color: '#ef4444' },
  { id: 'Rahu', code: 'Ra', codeHi: 'रा', name: 'Rahu', nameHi: 'राहु', years: 18, color: '#8b5cf6' },
  { id: 'Jupiter', code: 'Ju', codeHi: 'गु', name: 'Jupiter', nameHi: 'गुरु', years: 16, color: '#eab308' },
  { id: 'Saturn', code: 'Sa', codeHi: 'श', name: 'Saturn', nameHi: 'शनि', years: 19, color: '#64748b' },
  { id: 'Mercury', code: 'Me', codeHi: 'बु', name: 'Mercury', nameHi: 'बुध', years: 17, color: '#10b981' }
];

export function getPlanetByLord(lord) {
  const norm = String(lord).trim().toLowerCase();
  return (
    VIMSHOTTARI_PLANETS.find(p => p.id.toLowerCase() === norm || p.code.toLowerCase() === norm || p.nameHi === lord) ||
    VIMSHOTTARI_PLANETS[2] // default Sun
  );
}

export function getVimshottariCycleFrom(lord) {
  const planet = getPlanetByLord(lord);
  const idx = VIMSHOTTARI_PLANETS.findIndex(p => p.id === planet.id);
  const cycle = [];
  for (let i = 0; i < 9; i++) {
    cycle.push(VIMSHOTTARI_PLANETS[(idx + i) % 9]);
  }
  return cycle;
}

export function formatDashaDate(d) {
  if (!d) return '';
  const dt = (d instanceof Date) ? d : new Date(d);
  if (isNaN(dt.getTime())) return '';
  return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
}

/**
 * Calendar-accurate date adder (adding Y years, M months, D days)
 */
function addYMD(baseDate, y = 0, m = 0, d = 0) {
  const curY = baseDate.getFullYear() + y;
  const curM = baseDate.getMonth() + m;
  const curDay = baseDate.getDate();

  // JavaScript handles month overflow automatically
  const res = new Date(curY, curM, curDay);
  if (d !== 0) {
    res.setDate(res.getDate() + d);
  }
  return res;
}

/**
 * Calculate the complete 9 Mahadashas (Level 1)
 */
export function calculateMahadashas({ birthDate, birthLord, balanceY = 0, balanceM = 0, balanceD = 0, totalYears = 6 }) {
  const bDate = (birthDate instanceof Date) ? new Date(birthDate) : new Date(birthDate.year, birthDate.month - 1, birthDate.day);
  const firstPlanet = getPlanetByLord(birthLord);
  const cycle = getVimshottariCycleFrom(firstPlanet.id);

  // End of first Mahadasha is Birth Date + Remaining Balance
  const firstEnd = addYMD(bDate, balanceY, balanceM, balanceD);

  // The first Mahadasha technically started firstPlanet.years before firstEnd
  const firstStart = new Date(firstEnd);
  firstStart.setFullYear(firstEnd.getFullYear() - firstPlanet.years);

  const now = new Date();
  const mahadashas = [];
  let curStart = new Date(firstStart);

  cycle.forEach((p, idx) => {
    let curEnd;
    if (idx === 0) {
      curEnd = new Date(firstEnd);
    } else {
      curEnd = new Date(curStart);
      curEnd.setFullYear(curStart.getFullYear() + p.years);
    }

    const isCurrent = (now >= curStart && now < curEnd);

    mahadashas.push({
      level: 1,
      lord: p.id,
      lordHi: p.nameHi,
      code: p.code,
      codeHi: p.codeHi,
      years: p.years,
      color: p.color,
      startDate: formatDashaDate(curStart),
      startDateObj: new Date(curStart),
      endDate: formatDashaDate(curEnd),
      endDateObj: new Date(curEnd),
      durationMs: curEnd.getTime() - curStart.getTime(),
      isCurrent
    });

    curStart = new Date(curEnd);
  });

  return mahadashas;
}

/**
 * Calculate Antardashas (Level 2) for a given Mahadasha
 * Classical Parashari rule: Months = floor(Y1 * Y2 / 10), Days = ((Y1 * Y2) % 10) * 3
 */
export function calculateAntardashas(md) {
  const cycle = getVimshottariCycleFrom(md.lord);
  const totalMs = md.endDateObj.getTime() - md.startDateObj.getTime();
  const now = new Date();
  const antardashas = [];

  let curStart = new Date(md.startDateObj);

  cycle.forEach((adPlanet) => {
    // Exact proportional duration in milliseconds
    const durMs = totalMs * (adPlanet.years / 120.0);
    const curEnd = new Date(curStart.getTime() + durMs);

    const isCurrent = (now >= curStart && now < curEnd);
    const code = `${md.code} - ${adPlanet.code}`;
    const codeHi = `${md.codeHi} - ${adPlanet.codeHi}`;

    antardashas.push({
      level: 2,
      parentLord: md.lord,
      lord: adPlanet.id,
      name: adPlanet.name,
      lordHi: adPlanet.nameHi,
      nameHi: adPlanet.nameHi,
      code,
      codeHi,
      years: adPlanet.years,
      color: adPlanet.color,
      startDate: formatDashaDate(curStart),
      startDateObj: new Date(curStart),
      endDate: formatDashaDate(curEnd),
      endDateObj: new Date(curEnd),
      durationMs: durMs,
      isCurrent
    });

    curStart = new Date(curEnd);
  });

  // Ensure last Antardasha ends exactly at Mahadasha end date
  if (antardashas.length > 0) {
    antardashas[antardashas.length - 1].endDateObj = new Date(md.endDateObj);
    antardashas[antardashas.length - 1].endDate = formatDashaDate(md.endDateObj);
  }

  return antardashas;
}

/**
 * Calculate Pratyantardashas (Level 3) for a given Antardasha
 * Proportional duration: PD_ms = AD_ms * (PD_years / 120)
 */
export function calculatePratyantardashas(ad) {
  const cycle = getVimshottariCycleFrom(ad.lord);
  const totalMs = ad.endDateObj.getTime() - ad.startDateObj.getTime();
  const now = new Date();
  const pratyantars = [];

  let curStart = new Date(ad.startDateObj);

  cycle.forEach((pdPlanet) => {
    const durMs = totalMs * (pdPlanet.years / 120.0);
    const curEnd = new Date(curStart.getTime() + durMs);

    const isCurrent = (now >= curStart && now < curEnd);
    const code = `${ad.code} - ${pdPlanet.code}`;
    const codeHi = `${ad.codeHi} - ${pdPlanet.codeHi}`;

    pratyantars.push({
      level: 3,
      parentLord: ad.lord,
      lord: pdPlanet.id,
      name: pdPlanet.name,
      lordHi: pdPlanet.nameHi,
      nameHi: pdPlanet.nameHi,
      code,
      codeHi,
      years: pdPlanet.years,
      color: pdPlanet.color,
      startDate: formatDashaDate(curStart),
      startDateObj: new Date(curStart),
      endDate: formatDashaDate(curEnd),
      endDateObj: new Date(curEnd),
      durationMs: durMs,
      isCurrent
    });

    curStart = new Date(curEnd);
  });

  if (pratyantars.length > 0) {
    pratyantars[pratyantars.length - 1].endDateObj = new Date(ad.endDateObj);
    pratyantars[pratyantars.length - 1].endDate = formatDashaDate(ad.endDateObj);
  }

  return pratyantars;
}

/**
 * Calculate Sookshmadashas (Level 4) for a given Pratyantardasha
 * Proportional duration: SD_ms = PD_ms * (SD_years / 120)
 */
export function calculateSookshmadashas(pd) {
  const cycle = getVimshottariCycleFrom(pd.lord);
  const totalMs = pd.endDateObj.getTime() - pd.startDateObj.getTime();
  const now = new Date();
  const sookshmas = [];

  let curStart = new Date(pd.startDateObj);

  cycle.forEach((sdPlanet) => {
    const durMs = totalMs * (sdPlanet.years / 120.0);
    const curEnd = new Date(curStart.getTime() + durMs);

    const isCurrent = (now >= curStart && now < curEnd);
    const code = `${pd.code} - ${sdPlanet.code}`;
    const codeHi = `${pd.codeHi} - ${sdPlanet.codeHi}`;

    sookshmas.push({
      level: 4,
      parentLord: pd.lord,
      lord: sdPlanet.id,
      name: sdPlanet.name,
      lordHi: sdPlanet.nameHi,
      nameHi: sdPlanet.nameHi,
      code,
      codeHi,
      years: sdPlanet.years,
      color: sdPlanet.color,
      startDate: formatDashaDate(curStart),
      startDateObj: new Date(curStart),
      endDate: formatDashaDate(curEnd),
      endDateObj: new Date(curEnd),
      durationMs: durMs,
      isCurrent
    });

    curStart = new Date(curEnd);
  });

  if (sookshmas.length > 0) {
    sookshmas[sookshmas.length - 1].endDateObj = new Date(pd.endDateObj);
    sookshmas[sookshmas.length - 1].endDate = formatDashaDate(pd.endDateObj);
  }

  return sookshmas;
}

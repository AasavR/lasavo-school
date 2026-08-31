// Chaldean & Pythagorean Numerology Engine with Lo Shu Grid & Remedies

// Chaldean Letter Values Matrix
const CHALDEAN_MAP = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

// Pythagorean Letter Values Matrix
const PYTHAGOREAN_MAP = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

const PLANET_INFO = {
  1: { planet: 'Sun (Surya)', element: 'Fire', color: 'Gold / Orange', day: 'Sunday', gemstone: 'Ruby / Red Garnet', nature: 'Leadership, Ambition, Authority & Willpower' },
  2: { planet: 'Moon (Chandra)', element: 'Water', color: 'Pearl White / Silver', day: 'Monday', gemstone: 'Pearl / Moonstone', nature: 'Intuition, Emotion, Creativity & Peace' },
  3: { planet: 'Jupiter (Guru)', element: 'Ether', color: 'Yellow / Saffron', day: 'Thursday', gemstone: 'Yellow Sapphire', nature: 'Knowledge, Fortune, Wisdom & Wealth' },
  4: { planet: 'Rahu (North Node)', element: 'Air', color: 'Electric Blue / Smokey', day: 'Saturday', gemstone: 'Hessonite (Gomed)', nature: 'Unconventional Growth, Fame, Technology & Drive' },
  5: { planet: 'Mercury (Budh)', element: 'Earth', color: 'Emerald Green', day: 'Wednesday', gemstone: 'Emerald (Panna)', nature: 'Communication, Business, Agility & Speed' },
  6: { planet: 'Venus (Shukra)', element: 'Water', color: 'Bright White / Diamond', day: 'Friday', gemstone: 'Diamond / White Sapphire', nature: 'Luxury, Attraction, Relationships & Arts' },
  7: { planet: 'Ketu (South Node)', element: 'Ether', color: 'Light Green / Grey', day: 'Tuesday', gemstone: 'Cat\'s Eye (Lahsuniya)', nature: 'Research, Intuition, Spirituality & Healing' },
  8: { planet: 'Saturn (Shani)', element: 'Earth', color: 'Dark Blue / Black', day: 'Saturday', gemstone: 'Blue Sapphire (Neelam)', nature: 'Discipline, Hard Work, Karma & Endurance' },
  9: { planet: 'Mars (Mangal)', element: 'Fire', color: 'Deep Coral / Red', day: 'Tuesday', gemstone: 'Red Coral (Moonga)', nature: 'Courage, Energy, Passion & Protection' }
};

export function reduceToSingleDigit(num) {
  let current = Math.abs(num);
  while (current > 9) {
    let sum = 0;
    let str = current.toString();
    for (let char of str) {
      sum += parseInt(char, 10);
    }
    current = sum;
  }
  return current;
}

export function sumDigits(str) {
  let sum = 0;
  for (let char of str) {
    if (/\d/.test(char)) {
      sum += parseInt(char, 10);
    }
  }
  return sum;
}

export function calculateNumerology(fullName = '', dob = '1995-05-15', mobile = '') {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const dobClean = dob.replace(/[^0-9]/g, ''); // e.g. 19950515 or 15051995

  // 1. Driver Number (Mulank) = Day of Birth reduced to 1-9
  let dayVal = 1;
  let monthVal = 1;
  let yearVal = 1995;

  if (dob) {
    const parts = dob.split('-');
    if (parts.length === 3) {
      yearVal = parseInt(parts[0], 10);
      monthVal = parseInt(parts[1], 10);
      dayVal = parseInt(parts[2], 10);
    }
  }

  const driverNumber = reduceToSingleDigit(dayVal);

  // 2. Conductor Number (Bhagyank) = Total sum of all DOB digits
  const totalDobSum = sumDigits(`${dayVal}${monthVal}${yearVal}`);
  const conductorNumber = reduceToSingleDigit(totalDobSum);

  // 3. Chaldean Name Calculation
  let chaldeanCompound = 0;
  let chaldeanLetterBreakdown = [];
  for (let char of cleanName) {
    const val = CHALDEAN_MAP[char] || 0;
    chaldeanCompound += val;
    chaldeanLetterBreakdown.push({ letter: char, value: val });
  }
  const chaldeanNameNumber = reduceToSingleDigit(chaldeanCompound);

  // 4. Pythagorean Name Calculation
  let pythagoreanCompound = 0;
  for (let char of cleanName) {
    pythagoreanCompound += (PYTHAGOREAN_MAP[char] || 0);
  }
  const pythagoreanNameNumber = reduceToSingleDigit(pythagoreanCompound);

  // 5. Mobile Number Calculation
  let mobileSum = sumDigits(mobile);
  let mobileSingleDigit = reduceToSingleDigit(mobileSum);

  // 6. Lo Shu Grid Construction (3x3 grid)
  // Grid layout:
  // [4, 9, 2]
  // [3, 5, 7]
  // [8, 1, 6]
  const loShuLayout = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6]
  ];

  // Count occurrences of digits 1-9 in DOB string (formatted DDMMYYYY)
  const fullDobStr = `${dayVal < 10 ? '0' + dayVal : dayVal}${monthVal < 10 ? '0' + monthVal : monthVal}${yearVal}`;
  const counts = {};
  for (let d = 1; d <= 9; d++) counts[d] = 0;
  for (let char of fullDobStr) {
    const digit = parseInt(char, 10);
    if (digit >= 1 && digit <= 9) {
      counts[digit] = (counts[digit] || 0) + 1;
    }
  }

  const presentNumbers = [];
  const missingNumbers = [];
  for (let d = 1; d <= 9; d++) {
    if (counts[d] > 0) {
      presentNumbers.push(d);
    } else {
      missingNumbers.push(d);
    }
  }

  // 7. Lo Shu Remedies for missing numbers
  const REMEDIES_MAP = {
    1: 'Wear a Rudraksha or Gold chain; keep a Sun Yantra to boost leadership.',
    2: 'Wear Moonstone or Silver ring; drink water in silver glass for emotional calm.',
    3: 'Keep a Yellow Aventurine or Wooden coaster; respect elders to boost Jupiter.',
    4: 'Wear a Green Aventurine or keep a Wooden Rahu Pyramid for stability.',
    5: 'Wear a Green Emerald or Crystal Bracelet for central balance & communication.',
    6: 'Wear a Silver/Metal Watch or Diamond/Zircon ring to attract Venus luxury.',
    7: 'Wear a Cat\'s Eye or keep a Silver Ketu coin for intuition & research power.',
    8: 'Donate to charity on Saturdays; keep a Blue Sapphire or Crystal globe for discipline.',
    9: 'Wear Red Coral or Red wrist thread; practice meditation for courage without aggression.'
  };

  const missingRemedies = missingNumbers.map(n => ({
    number: n,
    planet: PLANET_INFO[n]?.planet || '',
    remedy: REMEDIES_MAP[n]
  }));

  // 8. Compatibility Matrix
  const FRIENDLY_MAP = {
    1: [1, 2, 3, 5, 9],
    2: [1, 3, 5],
    3: [1, 2, 3, 5, 7, 9],
    4: [1, 5, 6, 7],
    5: [1, 2, 3, 5, 6],
    6: [4, 5, 6, 7],
    7: [3, 4, 6],
    8: [5, 6],
    9: [1, 3, 9]
  };

  const ENEMY_MAP = {
    1: [8],
    2: [8, 4, 9],
    3: [6],
    4: [2, 8, 9],
    5: [],
    6: [3],
    7: [],
    8: [1, 2, 4],
    9: [2, 4]
  };

  const friendlyNumbers = FRIENDLY_MAP[driverNumber] || [1, 5, 6];
  const enemyNumbers = ENEMY_MAP[driverNumber] || [8];

  const isNameHarmonious = friendlyNumbers.includes(chaldeanNameNumber);

  return {
    fullName,
    dob,
    cleanName,
    driverNumber,
    conductorNumber,
    driverInfo: PLANET_INFO[driverNumber] || PLANET_INFO[1],
    conductorInfo: PLANET_INFO[conductorNumber] || PLANET_INFO[1],
    chaldeanCompound,
    chaldeanNameNumber,
    chaldeanInfo: PLANET_INFO[chaldeanNameNumber] || PLANET_INFO[1],
    chaldeanLetterBreakdown,
    pythagoreanCompound,
    pythagoreanNameNumber,
    mobileSum,
    mobileSingleDigit,
    loShuLayout,
    loShuCounts: counts,
    presentNumbers,
    missingNumbers,
    missingRemedies,
    friendlyNumbers,
    enemyNumbers,
    isNameHarmonious
  };
}

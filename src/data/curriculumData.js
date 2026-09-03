export const BOARDS = [
  { id: 'CBSE', name: 'CBSE', fullName: 'Central Board of Secondary Education', badge: 'NCERT Aligned' },
  { id: 'ICSE', name: 'ICSE / CISCE', fullName: 'Indian Certificate of Secondary Education', badge: 'CISCE Standard' }
];

export const GRADES = [
  { id: 'class-1', name: 'Class 1', category: 'Primary (1-5)' },
  { id: 'class-2', name: 'Class 2', category: 'Primary (1-5)' },
  { id: 'class-3', name: 'Class 3', category: 'Primary (1-5)' },
  { id: 'class-4', name: 'Class 4', category: 'Primary (1-5)' },
  { id: 'class-5', name: 'Class 5', category: 'Primary (1-5)' },
  { id: 'class-6', name: 'Class 6', category: 'Middle (6-8)' },
  { id: 'class-7', name: 'Class 7', category: 'Middle (6-8)' },
  { id: 'class-8', name: 'Class 8', category: 'Middle (6-8)' },
  { id: 'class-9', name: 'Class 9', category: 'Secondary (9-10)' },
  { id: 'class-10', name: 'Class 10', category: 'Secondary (9-10)' },
  { id: 'class-11', name: 'Class 11', category: 'Sr. Secondary (11-12)' },
  { id: 'class-12', name: 'Class 12', category: 'Sr. Secondary (11-12)' }
];

// Daily 6-Class 1-Hour Timetable Schedule per day
export const DAILY_6_CLASS_SCHEDULE = [
  { classNumber: 1, timeSlot: '09:00 AM - 10:00 AM', subject: 'Mathematics & Logic', teacherId: 'ananya', icon: '📐', duration: '60 mins', chapterTitle: 'Chapter 1: Real Numbers & Euclid Lemma' },
  { classNumber: 2, timeSlot: '10:15 AM - 11:15 AM', subject: 'Physics & Space Science', teacherId: 'priya', icon: '⚡', duration: '60 mins', chapterTitle: 'Chapter 10: Light Refraction & Optics' },
  { classNumber: 3, timeSlot: '11:30 AM - 12:30 PM', subject: 'Chemistry & Reactions', teacherId: 'rajesh', icon: '🧪', duration: '60 mins', chapterTitle: 'Chapter 1: Chemical Reactions & Equations' },
  { classNumber: 4, timeSlot: '01:30 PM - 02:30 PM', subject: 'English Literature & Grammar', teacherId: 'kavya', icon: '📚', duration: '60 mins', chapterTitle: 'Chapter 1: Prose, Poetry & Tenses' },
  { classNumber: 5, timeSlot: '02:45 PM - 03:45 PM', subject: 'Social Science & History', teacherId: 'kavya', icon: '🏛️', duration: '60 mins', chapterTitle: 'Chapter 1: Rise of Nationalism & Civics' },
  { classNumber: 6, timeSlot: '04:00 PM - 05:00 PM', subject: 'Computer Science & AI Tech', teacherId: 'rajesh', icon: '💻', duration: '60 mins', chapterTitle: 'Chapter 1: Python Basics & AI Logic' }
];

// 4 Distinguished Teachers: 3 Women + 1 Man, each with unique realistic voice characteristics
export const TEACHERS_MAP = {
  ananya: {
    id: 'ananya',
    name: 'Dr. Ananya Sharma',
    gender: 'female',
    title: 'Ph.D. Applied Mathematics (IIT Bombay)',
    subject: 'Mathematics & Logic',
    avatarBg: 'from-amber-500/20 via-orange-500/10 to-rose-600/20',
    accentColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    btnColor: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    voicePitch: 1.12,
    voiceRate: 0.92,
    voiceStyle: 'Warm, articulate, encouraging female tone'
  },
  priya: {
    id: 'priya',
    name: 'Prof. Priya Iyer',
    gender: 'female',
    title: 'Senior Quantum Physicist & Researcher',
    subject: 'Physics & Space Science',
    avatarBg: 'from-cyan-500/20 via-indigo-500/10 to-blue-600/20',
    accentColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
    btnColor: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500',
    image: 'https://images.unsplash.com/photo-1580894732413-80d8f075d9fb?auto=format&fit=crop&w=600&q=80',
    voicePitch: 1.05,
    voiceRate: 0.95,
    voiceStyle: 'Inspiring, clear, authoritative female voice'
  },
  kavya: {
    id: 'kavya',
    name: 'Kavya Deshmukh',
    gender: 'female',
    title: 'Linguistic Specialist & Bestselling Author',
    subject: 'English Literature & Humanities',
    avatarBg: 'from-purple-500/20 via-pink-500/10 to-rose-600/20',
    accentColor: 'text-purple-400',
    badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
    btnColor: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    voicePitch: 1.18,
    voiceRate: 0.90,
    voiceStyle: 'Melodic, expressive, polished female voice'
  },
  rajesh: {
    id: 'rajesh',
    name: 'Dr. Rajesh Verma',
    gender: 'male',
    title: 'M.Sc. Chemistry & CS Lead (IISc Bangalore)',
    subject: 'Chemistry, CS & AI',
    avatarBg: 'from-emerald-500/20 via-teal-500/10 to-green-600/20',
    accentColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    btnColor: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    voicePitch: 0.82,
    voiceRate: 0.95,
    voiceStyle: 'Deep, resonant, patient male voice'
  }
};

export const TEACHERS_LIST = Object.values(TEACHERS_MAP);

export const SAMPLE_CURRICULUM = {
  'class-10': {
    CBSE: [
      {
        id: 'c10-m-math',
        subjectName: 'Mathematics',
        code: 'CBSE-10-M01',
        teacherId: 'ananya',
        icon: '📐',
        chapters: [
          {
            id: 'ch-real-numbers',
            title: 'Chapter 1: Real Numbers & Euclid Lemma',
            summary: 'Fundamental Theorem of Arithmetic, Irrational numbers proof (√2, √3), and Euclid Division.',
            duration: '60 mins',
            ncertRef: 'NCERT Mathematics Class 10 - Chapter 1',
            chalkboardKeypoints: [
              'Theorem: Fundamental Theorem of Arithmetic',
              'Every composite number = product of primes uniquely',
              'Proof by Contradiction: Prove √5 is irrational',
              'HCF(a,b) × LCM(a,b) = a × b'
            ],
            stimulusQuestion: {
              prompt: 'If HCF of 12 and 18 is 6, what is their LCM?',
              expectedAnswer: '36',
              hint: 'Use the formula: HCF × LCM = Product of two numbers (12 × 18 = 216).',
              explanation: 'Spot on! HCF × LCM = 12 × 18 = 216. So LCM = 216 / 6 = 36.'
            }
          },
          {
            id: 'ch-polynomials',
            title: 'Chapter 2: Polynomials & Zeroes',
            summary: 'Geometrical meaning of zeroes, relationship between zeroes and coefficients of quadratic polynomials.',
            duration: '60 mins',
            ncertRef: 'NCERT Mathematics Class 10 - Chapter 2',
            chalkboardKeypoints: [
              'Quadratic Form: ax² + bx + c',
              'Sum of zeroes (α + β) = -b/a',
              'Product of zeroes (α × β) = c/a'
            ],
            stimulusQuestion: {
              prompt: 'What is the sum of zeroes of x² - 5x + 6?',
              expectedAnswer: '5',
              hint: 'α + β = -b/a, where b = -5 and a = 1.',
              explanation: 'Exact! α + β = -(-5)/1 = 5.'
            }
          }
        ]
      },
      {
        id: 'c10-m-phy',
        subjectName: 'Physics',
        code: 'CBSE-10-P01',
        teacherId: 'priya',
        icon: '⚡',
        chapters: [
          {
            id: 'ch-light-optics',
            title: 'Chapter 10: Light Refraction & Spherical Mirrors',
            summary: 'Snell Law, refractive index, convex & concave lens ray diagrams, and lens formula.',
            duration: '60 mins',
            ncertRef: 'NCERT Science Class 10 - Chapter 10',
            chalkboardKeypoints: [
              'Snell Law: n1 sin(θ1) = n2 sin(θ2)',
              'Mirror Formula: 1/f = 1/v + 1/u',
              'Lens Formula: 1/f = 1/v - 1/u',
              'Power of lens P = 1/f (in meters)'
            ],
            stimulusQuestion: {
              prompt: 'What is the unit of Power of a Lens?',
              expectedAnswer: 'diopter',
              hint: 'It starts with D.',
              explanation: 'Correct! Power of a lens is measured in Diopters (D).'
            }
          }
        ]
      },
      {
        id: 'c10-m-chem',
        subjectName: 'Chemistry',
        code: 'CBSE-10-C01',
        teacherId: 'rajesh',
        icon: '🧪',
        chapters: [
          {
            id: 'ch-chem-reactions',
            title: 'Chapter 1: Chemical Reactions & Equations',
            summary: 'Balancing chemical equations, combination, decomposition, displacement, and redox reactions.',
            duration: '60 mins',
            ncertRef: 'NCERT Science Class 10 - Chapter 1',
            chalkboardKeypoints: [
              'Law of Conservation of Mass: Total mass reactants = Total mass products',
              'Decomposition: AB → A + B',
              'Exothermic vs Endothermic reactions'
            ],
            stimulusQuestion: {
              prompt: 'What happens to energy in an Exothermic reaction: absorbed or released?',
              expectedAnswer: 'released',
              hint: 'Exo means exit or release.',
              explanation: 'Correct! Exothermic reactions release energy into the surroundings.'
            }
          }
        ]
      },
      {
        id: 'c10-m-eng',
        subjectName: 'English Literature',
        code: 'CBSE-10-E01',
        teacherId: 'kavya',
        icon: '📚',
        chapters: [
          {
            id: 'ch-english-poetry',
            title: 'Chapter 1: Poetic Devices & Prose',
            summary: 'Analysis of Metaphor, Simile, Alliteration, and Critical Essay Writing.',
            duration: '60 mins',
            ncertRef: 'NCERT English First Flight Class 10',
            chalkboardKeypoints: [
              'Metaphor: Direct comparison without using like or as',
              'Simile: Comparison using like or as',
              'Alliteration: Repetition of initial consonant sounds'
            ],
            stimulusQuestion: {
              prompt: 'In "He is a shining star", is this a Metaphor or a Simile?',
              expectedAnswer: 'Metaphor',
              hint: 'Notice it does not use "like" or "as".',
              explanation: 'Spot on! It directly compares the person to a star without "like" or "as", making it a Metaphor.'
            }
          }
        ]
      }
    ]
  }
};

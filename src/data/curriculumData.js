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
            duration: '45 mins',
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
            duration: '50 mins',
            ncertRef: 'NCERT Mathematics Class 10 - Chapter 2',
            chalkboardKeypoints: [
              'General Form: ax² + bx + c = 0',
              'Sum of Zeroes (α + β) = -b/a',
              'Product of Zeroes (α · β) = c/a',
              'Parabola intersects X-axis at real zeroes'
            ],
            stimulusQuestion: {
              prompt: 'For the quadratic polynomial x² - 5x + 6, what is the sum of its zeroes (α + β)?',
              expectedAnswer: '5',
              hint: 'Recall that α + β = -b/a where a=1 and b=-5.',
              explanation: 'Correct! α + β = -(-5)/1 = 5. The zeroes are 2 and 3.'
            }
          }
        ]
      },
      {
        id: 'c10-m-phy',
        subjectName: 'Physics (Science)',
        code: 'CBSE-10-P01',
        teacherId: 'priya',
        icon: '⚡',
        chapters: [
          {
            id: 'ch-light-reflection',
            title: 'Chapter 10: Light - Reflection & Refraction',
            summary: 'Laws of reflection, spherical mirrors (concave/convex), mirror formula (1/f = 1/v + 1/u), and refractive index.',
            duration: '50 mins',
            ncertRef: 'NCERT Science Class 10 - Chapter 10',
            chalkboardKeypoints: [
              'Mirror Formula: 1/f = 1/v + 1/u',
              'Magnification m = -v/u = h\'/h',
              'Snell\'s Law: n1 sin(i) = n2 sin(r)',
              'Concave Mirror creates Real & Inverted images for u > f'
            ],
            stimulusQuestion: {
              prompt: 'When light passes from air into water, does its speed increase or decrease?',
              expectedAnswer: 'decrease',
              hint: 'Water is optically denser than air.',
              explanation: 'Correct! Water is optically denser than air, so light slows down and bends towards the normal.'
            }
          }
        ]
      },
      {
        id: 'c10-m-chem',
        subjectName: 'Chemistry & Computer Science',
        code: 'CBSE-10-CS01',
        teacherId: 'rajesh',
        icon: '🧪',
        chapters: [
          {
            id: 'ch-python-basics',
            title: 'Chapter 1: Python & Reactions',
            summary: 'Chemical reaction balancing and Python data structures.',
            duration: '40 mins',
            ncertRef: 'NCERT Science & IT Class 10',
            chalkboardKeypoints: [
              'Chemical Equation Balancing: Law of Conservation of Mass',
              'Python Data Types: Lists, Dictionaries, Functions',
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
            duration: '45 mins',
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

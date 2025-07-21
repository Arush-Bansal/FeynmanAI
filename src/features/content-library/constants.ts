interface TopicContent {
  keyPoints: string[];
  concepts: string;
}

interface ExamContent { 
  [key: string]: TopicContent;
}

interface SubjectContent {
  [key: string]: ExamContent;
}

// Export just the exam categories for use in client components
export const EXAM_CATEGORIES = ['JEE', 'NEET', 'UPSC'] as const;

export const TOPIC_CONTENT : Record<string, SubjectContent> = {
  'JEE': {
    'Physics': {
      'Mechanics & Motion': {
        keyPoints: [
          'Newton\'s Laws of Motion',
          'Kinematics equations',
          'Forces and their types',
          'Work, Energy, and Power',
          'Momentum and Conservation',
          'Circular Motion',
          'Gravitation',
          'Simple Harmonic Motion'
        ],
        concepts: 'Mechanics deals with the motion of objects and the forces that cause this motion. It includes understanding how objects move, what causes their motion, and how to predict their behavior using mathematical principles.'
      },
      'Electromagnetic Induction': {
        keyPoints: [
          'Faraday\'s Law of Induction',
          'Lenz\'s Law',
          'Magnetic Flux',
          'EMF and Induced Current',
          'Self and Mutual Induction',
          'AC Generators',
          'Transformers',
          'Eddy Currents'
        ],
        concepts: 'Electromagnetic induction is the process of generating electric current in a conductor by changing the magnetic field around it. This principle is fundamental to electricity generation and many electrical devices.'
      },
    },
    'Chemistry': {
      'Organic Chemistry Reactions': {
        keyPoints: [
          'Substitution Reactions',
          'Addition Reactions',
          'Elimination Reactions',
          'Oxidation and Reduction',
          'Nucleophilic and Electrophilic',
          'Reaction Mechanisms',
          'Stereochemistry',
          'Functional Group Transformations'
        ],
        concepts: 'Organic chemistry reactions involve the transformation of carbon-based compounds. Understanding reaction mechanisms, electron flow, and molecular structure is crucial for predicting and controlling chemical transformations.'
      },
      'Chemical Bonding': {
        keyPoints: [
          'Ionic Bonding',
          'Covalent Bonding',
          'Metallic Bonding',
          'VSEPR Theory',
          'Hybridization',
          'Molecular Orbital Theory',
          'Intermolecular Forces',
          'Bond Energy and Length'
        ],
        concepts: 'Chemical bonding explains how atoms combine to form molecules and compounds. Understanding bonding helps predict molecular properties and chemical behavior.'
      },
    },
    'Mathematics': {
      'Calculus & Integration': {
        keyPoints: [
          'Limits and Continuity',
          'Differentiation Rules',
          'Applications of Derivatives',
          'Integration Techniques',
          'Definite and Indefinite Integrals',
          'Area and Volume',
          'Differential Equations',
          'Series and Sequences'
        ],
        concepts: 'Calculus is the mathematics of change and motion. It provides tools for analyzing rates of change, finding areas and volumes, and solving problems involving continuous change.'
      },
    },
  },
  'NEET': {
    'Physics': {
      'NEET Physics Topic 1': {
        keyPoints: [
          'NEET Physics Key Point 1',
          'NEET Physics Key Point 2',
        ],
        concepts: 'Concepts for NEET Physics Topic 1.'
      },
    },
    'Chemistry': {
      'NEET Chemistry Topic 1': {
        keyPoints: [
          'NEET Chemistry Key Point 1',
          'NEET Chemistry Key Point 2',
        ],
        concepts: 'Concepts for NEET Chemistry Topic 1.'
      },
    },
    'Biology': {
      'Human Physiology': {
        keyPoints: [
          'Digestive System',
          'Circulatory System',
          'Respiratory System',
          'Nervous System',
          'Endocrine System',
          'Excretory System',
          'Reproductive System',
          'Musculoskeletal System'
        ],
        concepts: 'Human physiology studies how the body\'s organ systems work together to maintain homeostasis and support life processes.'
      },
      'Cell Biology': {
        keyPoints: [
          'Cell Structure',
          'Cell Organelles',
          'Cell Membrane',
          'Cell Division',
          'Cell Communication',
          'Cellular Respiration',
          'Photosynthesis',
          'Cell Cycle'
        ],
        concepts: 'Cell biology examines the structure and function of cells, the basic units of life, and their role in biological processes.'
      },
    },
  },
} as const;

// Generate PREDEFINED_TOPICS from TOPIC_CONTENT to avoid duplication
const predefinedTopicsData: Record<string, Record<string, string[]>> = {};
for (const exam in TOPIC_CONTENT) {
  predefinedTopicsData[exam] = {};
  for (const subject in TOPIC_CONTENT[exam as keyof typeof TOPIC_CONTENT]) {
    predefinedTopicsData[exam][subject] = Object.keys(TOPIC_CONTENT[exam as keyof typeof TOPIC_CONTENT][subject as keyof typeof TOPIC_CONTENT[keyof typeof TOPIC_CONTENT]]);
  }
}


export const PREDEFINED_TOPICS = Object.values(TOPIC_CONTENT).flatMap(exam => 
  Object.values(exam).flatMap(subject => 
    Object.values(subject).map((topic) => topic.keyPoints)
  )
);
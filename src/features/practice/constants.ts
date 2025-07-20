export const SUGGESTED_TOPICS = [
  'Photosynthesis', 
  'Black Holes', 
  'Democracy', 
  'DNA Replication', 
  'Climate Change'
] as const;

export const PREDEFINED_TOPICS = {
  'JEE': {
    'Physics': [
      'Mechanics & Motion',
      'Electromagnetic Induction',
    ],
    'Chemistry': [
      'Organic Chemistry Reactions',
      'Chemical Bonding',
    ],
    'Mathematics': [
      'Calculus & Integration',
    ],
  },
  'NEET': {
    'Physics': [
      'NEET Physics Topic 1',
    ],
    'Chemistry': [
      'NEET Chemistry Topic 1',
    ],
    'Biology': [
      'Human Physiology',
      'Cell Biology',
    ],
  },
} as const;

export const TOPIC_CONTENT = {
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
      'Wave Optics': {
        keyPoints: [
          'Wave Nature of Light',
          'Interference Patterns',
          'Diffraction',
          'Polarization',
          'Young\'s Double Slit',
          'Single Slit Diffraction',
          'Diffraction Grating',
          'Optical Instruments'
        ],
        concepts: 'Wave optics explains light behavior using wave properties like interference, diffraction, and polarization. It\'s essential for understanding optical phenomena and instrument design.'
      },
      'Thermodynamics': {
        keyPoints: [
          'Laws of Thermodynamics',
          'Heat and Temperature',
          'Work and Energy',
          'Entropy',
          'Enthalpy',
          'Heat Engines',
          'Carnot Cycle',
          'Phase Transitions'
        ],
        concepts: 'Thermodynamics studies energy transformations and the relationships between heat, work, and energy. It governs all natural processes and engineering applications.'
      },
      'Electrostatics': {
        keyPoints: [
          'Coulomb\'s Law',
          'Electric Field',
          'Electric Potential',
          'Gauss\'s Law',
          'Capacitance',
          'Dielectrics',
          'Electric Flux',
          'Applications'
        ],
        concepts: 'Electrostatics deals with electric charges at rest and their interactions. It forms the foundation for understanding electricity and electromagnetic phenomena.'
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
      'Coordination Chemistry': {
        keyPoints: [
          'Coordination Compounds',
          'Ligands and Complexes',
          'Coordination Number',
          'Crystal Field Theory',
          'Valence Bond Theory',
          'Isomerism',
          'Magnetic Properties',
          'Applications'
        ],
        concepts: 'Coordination chemistry studies metal complexes and their properties. It\'s crucial for understanding catalysis, materials science, and biological systems.'
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
      'Vector Algebra': {
        keyPoints: [
          'Vector Operations',
          'Dot and Cross Products',
          'Vector Components',
          'Vector Fields',
          'Line Integrals',
          'Surface Integrals',
          'Divergence and Curl',
          'Applications in Physics'
        ],
        concepts: 'Vector algebra provides mathematical tools for describing quantities with both magnitude and direction, essential in physics and engineering applications.'
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
      'NEET Physics Topic 2': {
        keyPoints: [
          'NEET Physics Key Point 3',
          'NEET Physics Key Point 4',
        ],
        concepts: 'Concepts for NEET Physics Topic 2.'
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
      'NEET Chemistry Topic 2': {
        keyPoints: [
          'NEET Chemistry Key Point 3',
          'NEET Chemistry Key Point 4',
        ],
        concepts: 'Concepts for NEET Chemistry Topic 2.'
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
      'Genetics & Inheritance': {
        keyPoints: [
          'Mendelian Genetics',
          'Chromosomes and Genes',
          'DNA Structure',
          'Gene Expression',
          'Genetic Disorders',
          'Population Genetics',
          'Evolutionary Genetics',
          'Genetic Engineering'
        ],
        concepts: 'Genetics studies how traits are inherited and how genetic information is passed from generation to generation.'
      },
      'Ecology & Environment': {
        keyPoints: [
          'Ecosystems',
          'Population Dynamics',
          'Community Ecology',
          'Biodiversity',
          'Environmental Issues',
          'Conservation',
          'Climate Change',
          'Sustainable Development'
        ],
        concepts: 'Ecology studies interactions between organisms and their environment, while environmental science addresses human impact on natural systems.'
      },
      'Plant Anatomy': {
        keyPoints: [
          'Plant Tissues',
          'Root Structure',
          'Stem Structure',
          'Leaf Structure',
          'Flower Structure',
          'Plant Growth',
          'Transport Systems',
          'Reproduction'
        ],
        concepts: 'Plant anatomy examines the internal structure of plants and how different tissues and organs function to support plant life.'
      },
      'Biochemistry': {
        keyPoints: [
          'Biomolecules',
          'Enzymes',
          'Metabolism',
          'Cellular Respiration',
          'Photosynthesis',
          'Hormones',
          'Vitamins',
          'Molecular Biology'
        ],
        concepts: 'Biochemistry studies the chemical processes within living organisms and the molecular basis of biological functions.'
      },
      'Evolution': {
        keyPoints: [
          'Natural Selection',
          'Adaptation',
          'Speciation',
          'Fossil Record',
          'Molecular Evolution',
          'Human Evolution',
          'Evolutionary Mechanisms',
          'Evidence for Evolution'
        ],
        concepts: 'Evolution explains how species change over time through natural selection and other mechanisms, leading to biodiversity.'
      },
      'Microbiology': {
        keyPoints: [
          'Bacteria',
          'Viruses',
          'Fungi',
          'Protozoa',
          'Microbial Growth',
          'Pathogenesis',
          'Immunity',
          'Antibiotics'
        ],
        concepts: 'Microbiology studies microorganisms and their effects on other living organisms and the environment.'
      },
      'Immunology': {
        keyPoints: [
          'Immune System',
          'Innate Immunity',
          'Adaptive Immunity',
          'Antibodies',
          'Vaccination',
          'Autoimmunity',
          'Allergies',
          'Immunodeficiency'
        ],
        concepts: 'Immunology studies how the body defends itself against pathogens and maintains immune homeostasis.'
      },
      'Neurobiology': {
        keyPoints: [
          'Neuron Structure',
          'Action Potential',
          'Synaptic Transmission',
          'Brain Structure',
          'Sensory Systems',
          'Motor Systems',
          'Learning and Memory',
          'Neurological Disorders'
        ],
        concepts: 'Neurobiology examines the nervous system\'s structure and function, including how neurons communicate and process information.'
      },
    },
  },
  'UPSC': {
    'General Studies': {
      'Indian Constitution': {
        keyPoints: [
          'Preamble',
          'Fundamental Rights',
          'Directive Principles',
          'Fundamental Duties',
          'Parliamentary System',
          'Federal Structure',
          'Judiciary',
          'Constitutional Amendments'
        ],
        concepts: 'The Indian Constitution is the supreme law of India, establishing the framework for governance and protecting citizens\' rights.'
      },
      'Indian Economy': {
        keyPoints: [
          'Economic Planning',
          'Agriculture Sector',
          'Industrial Policy',
          'Financial Sector',
          'Fiscal Policy',
          'Monetary Policy',
          'Foreign Trade',
          'Economic Reforms'
        ],
        concepts: 'Indian economy encompasses the country\'s economic structure, policies, and development strategies.'
      },
      'Geography of India': {
        keyPoints: [
          'Physical Features',
          'Climate and Vegetation',
          'Natural Resources',
          'Agriculture',
          'Industries',
          'Transportation',
          'Population',
          'Environmental Issues'
        ],
        concepts: 'Indian geography studies the country\'s physical and human characteristics, including landforms, climate, and human activities.'
      },
      'Modern Indian History': {
        keyPoints: [
          'British Rule',
          'Freedom Movement',
          'Partition',
          'Independence',
          'Post-Independence',
          'Social Reform',
          'Economic Development',
          'Foreign Policy'
        ],
        concepts: 'Modern Indian history covers the period from British colonial rule through independence and the development of modern India.'
      },
      'International Relations': {
        keyPoints: [
          'Foreign Policy',
          'Bilateral Relations',
          'Multilateral Organizations',
          'Global Issues',
          'Diplomacy',
          'Trade Relations',
          'Security Issues',
          'Development Cooperation'
        ],
        concepts: 'International relations examines India\'s interactions with other countries and participation in global affairs.'
      },
      'Environmental Issues': {
        keyPoints: [
          'Climate Change',
          'Pollution',
          'Biodiversity Loss',
          'Deforestation',
          'Water Scarcity',
          'Waste Management',
          'Renewable Energy',
          'Environmental Laws'
        ],
        concepts: 'Environmental issues address challenges related to natural resource conservation and sustainable development.'
      },
      'Science & Technology': {
        keyPoints: [
          'Space Technology',
          'Nuclear Technology',
          'Information Technology',
          'Biotechnology',
          'Defense Technology',
          'Agricultural Technology',
          'Medical Technology',
          'Digital India'
        ],
        concepts: 'Science and technology development is crucial for India\'s progress and global competitiveness.'
      },
      'Social Issues': {
        keyPoints: [
          'Poverty',
          'Education',
          'Healthcare',
          'Gender Issues',
          'Caste System',
          'Communalism',
          'Regionalism',
          'Social Justice'
        ],
        concepts: 'Social issues address challenges related to equality, justice, and inclusive development in Indian society.'
      },
      'Governance & Polity': {
        keyPoints: [
          'Democratic Institutions',
          'Electoral System',
          'Political Parties',
          'Public Administration',
          'Local Governance',
          'Civil Services',
          'Accountability',
          'Transparency'
        ],
        concepts: 'Governance and polity examine how India\'s democratic system functions and how public administration works.'
      },
      'Agriculture & Rural Development': {
        keyPoints: [
          'Agricultural Policy',
          'Land Reforms',
          'Green Revolution',
          'Rural Infrastructure',
          'Agricultural Marketing',
          'Rural Employment',
          'Agricultural Technology',
          'Rural Finance'
        ],
        concepts: 'Agriculture and rural development focus on improving agricultural productivity and rural living standards.'
      },
    },
  },
} as const;

export const MOCK_ANALYSIS_TEMPLATE = (topic: string) => `## Great explanation of ${topic}! \n\n### ✅ **Strengths:**\n- Clear conceptual understanding\n- Good use of examples  \n- Logical flow of ideas\n\n### 🔄 **Areas to improve:**\n- Could elaborate more on the underlying principles\n- Consider adding real-world applications\n- Try to explain it even more simply\n\n### 💡 **Tip:** \nRemember the Feynman Technique - if you can\'t explain it simply, you don\'t understand it well enough!\n\n**Keep practicing and you\'ll master this topic! 🚀**`;
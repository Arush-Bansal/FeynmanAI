import 'dotenv/config';
import dbConnect from './dbConnect';
import { createExam } from './data/exams';
import { createSubject } from './data/subjects';
import { createTopic } from './data/topics';
import { createSubtopic } from './data/subtopics';
import { Exam, IExam } from './models/Exam';
import { ISubject } from './models/Subject';
import { ITopic } from './models/Topic';
import { ISubtopic } from './models/Subtopic';

// Exam data for JEE and NEET
const examData = [
  {
    name: 'JEE',
    code: 'JEE',
    description: 'Engineering Entrance',
    icon: '/images/jee-icon.svg',
    gradient: 'from-blue-700 to-blue-900',
  },
  {
    name: 'NEET',
    code: 'NEET',
    description: 'Medical Entrance',
    icon: '/images/neet-icon.svg',
    gradient: 'from-green-700 to-green-900',
  },
];

// Subject data for JEE
const jeeSubjects = [
  {
    name: 'Physics',
    code: 'PHYSICS',
    description: 'Study of matter, energy, and their interactions',
  },
  {
    name: 'Chemistry',
    code: 'CHEMISTRY',
    description: 'Study of substances and their properties',
  },
  {
    name: 'Mathematics',
    code: 'MATHEMATICS',
    description: 'Study of numbers, quantities, and shapes',
  },
];

// Subject data for NEET
const neetSubjects = [
  {
    name: 'Physics',
    code: 'PHYSICS',
    description: 'Study of matter, energy, and their interactions',
  },
  {
    name: 'Chemistry',
    code: 'CHEMISTRY',
    description: 'Study of substances and their properties',
  },
  {
    name: 'Biology',
    code: 'BIOLOGY',
    description: 'Study of living organisms and life processes',
  },
];

// Topic data for JEE subjects
const jeeTopics = {
  PHYSICS: [
    { name: 'Mechanics', code: 'MECHANICS', description: 'Study of motion and forces' },
    { name: 'Thermodynamics', code: 'THERMODYNAMICS', description: 'Study of heat and energy' },
    { name: 'Electromagnetism', code: 'ELECTROMAGNETISM', description: 'Study of electric and magnetic fields' },
    { name: 'Optics', code: 'OPTICS', description: 'Study of light and its properties' },
    { name: 'Modern Physics', code: 'MODERN_PHYSICS', description: 'Study of quantum mechanics and relativity' },
  ],
  CHEMISTRY: [
    { name: 'Physical Chemistry', code: 'PHYSICAL_CHEMISTRY', description: 'Study of physical principles in chemistry' },
    { name: 'Organic Chemistry', code: 'ORGANIC_CHEMISTRY', description: 'Study of carbon compounds' },
    { name: 'Inorganic Chemistry', code: 'INORGANIC_CHEMISTRY', description: 'Study of non-carbon compounds' },
    { name: 'Analytical Chemistry', code: 'ANALYTICAL_CHEMISTRY', description: 'Study of chemical analysis methods' },
    { name: 'Coordination Chemistry', code: 'COORDINATION_CHEMISTRY', description: 'Study of complex compounds' },
  ],
  MATHEMATICS: [
    { name: 'Algebra', code: 'ALGEBRA', description: 'Study of mathematical symbols and rules' },
    { name: 'Calculus', code: 'CALCULUS', description: 'Study of continuous change' },
    { name: 'Geometry', code: 'GEOMETRY', description: 'Study of shapes and spatial relationships' },
    { name: 'Trigonometry', code: 'TRIGONOMETRY', description: 'Study of triangles and angles' },
    { name: 'Statistics', code: 'STATISTICS', description: 'Study of data collection and analysis' },
  ],
};

// Topic data for NEET subjects
const neetTopics = {
  PHYSICS: [
    { name: 'Mechanics', code: 'MECHANICS', description: 'Study of motion and forces' },
    { name: 'Thermodynamics', code: 'THERMODYNAMICS', description: 'Study of heat and energy' },
    { name: 'Electromagnetism', code: 'ELECTROMAGNETISM', description: 'Study of electric and magnetic fields' },
    { name: 'Optics', code: 'OPTICS', description: 'Study of light and its properties' },
    { name: 'Modern Physics', code: 'MODERN_PHYSICS', description: 'Study of quantum mechanics and relativity' },
  ],
  CHEMISTRY: [
    { name: 'Physical Chemistry', code: 'PHYSICAL_CHEMISTRY', description: 'Study of physical principles in chemistry' },
    { name: 'Organic Chemistry', code: 'ORGANIC_CHEMISTRY', description: 'Study of carbon compounds' },
    { name: 'Inorganic Chemistry', code: 'INORGANIC_CHEMISTRY', description: 'Study of non-carbon compounds' },
    { name: 'Analytical Chemistry', code: 'ANALYTICAL_CHEMISTRY', description: 'Study of chemical analysis methods' },
    { name: 'Coordination Chemistry', code: 'COORDINATION_CHEMISTRY', description: 'Study of complex compounds' },
  ],
  BIOLOGY: [
    { name: 'Botany', code: 'BOTANY', description: 'Study of plants and plant life' },
    { name: 'Zoology', code: 'ZOOLOGY', description: 'Study of animals and animal life' },
    { name: 'Cell Biology', code: 'CELL_BIOLOGY', description: 'Study of cell structure and function' },
    { name: 'Genetics', code: 'GENETICS', description: 'Study of heredity and variation' },
    { name: 'Ecology', code: 'ECOLOGY', description: 'Study of organisms and their environment' },
  ],
};

// Subtopic data for JEE topics with nested structure
const jeeSubtopics = {
  MECHANICS: [
    { name: 'Kinematics', code: 'KINEMATICS', description: 'Study of motion without considering forces' },
    { name: 'Dynamics', code: 'DYNAMICS', description: 'Study of motion with forces' },
    { name: 'Work and Energy', code: 'WORK_ENERGY', description: 'Study of work, energy, and power' },
    { name: 'Momentum', code: 'MOMENTUM', description: 'Study of linear and angular momentum' },
    { name: 'Gravitation', code: 'GRAVITATION', description: 'Study of gravitational forces' },
  ],
  // Nested subtopics under Kinematics
  KINEMATICS: [
    { name: 'Linear Motion', code: 'LINEAR_MOTION', description: 'Motion in a straight line' },
    { name: 'Circular Motion', code: 'CIRCULAR_MOTION', description: 'Motion along a circular path' },
    { name: 'Projectile Motion', code: 'PROJECTILE_MOTION', description: 'Motion under gravity' },
    { name: 'Relative Motion', code: 'RELATIVE_MOTION', description: 'Motion from different reference frames' },
    { name: 'Kinematic Equations', code: 'KINEMATIC_EQUATIONS', description: 'Mathematical equations of motion' },
  ],
  // Nested subtopics under Linear Motion
  LINEAR_MOTION: [
    { name: 'Uniform Motion', code: 'UNIFORM_MOTION', description: 'Constant velocity motion' },
    { name: 'Accelerated Motion', code: 'ACCELERATED_MOTION', description: 'Motion with changing velocity' },
    { name: 'Free Fall', code: 'FREE_FALL', description: 'Motion under gravity only' },
  ],
  // Nested subtopics under Circular Motion
  CIRCULAR_MOTION: [
    { name: 'Uniform Circular Motion', code: 'UNIFORM_CIRCULAR_MOTION', description: 'Constant speed circular motion' },
    { name: 'Non-Uniform Circular Motion', code: 'NON_UNIFORM_CIRCULAR_MOTION', description: 'Variable speed circular motion' },
    { name: 'Banking of Roads', code: 'BANKING_OF_ROADS', description: 'Curved road banking' },
  ],
  // Nested subtopics under Dynamics
  DYNAMICS: [
    { name: 'Newton\'s Laws', code: 'NEWTONS_LAWS', description: 'Fundamental laws of motion' },
    { name: 'Friction', code: 'FRICTION', description: 'Resistance to motion' },
    { name: 'Centripetal Force', code: 'CENTRIPETAL_FORCE', description: 'Force for circular motion' },
    { name: 'Tension', code: 'TENSION', description: 'Force in strings and ropes' },
    { name: 'Normal Force', code: 'NORMAL_FORCE', description: 'Contact force perpendicular to surface' },
  ],
  // Nested subtopics under Newton's Laws
  NEWTONS_LAWS: [
    { name: 'First Law (Inertia)', code: 'NEWTONS_FIRST_LAW', description: 'Law of inertia' },
    { name: 'Second Law (F = ma)', code: 'NEWTONS_SECOND_LAW', description: 'Force equals mass times acceleration' },
    { name: 'Third Law (Action-Reaction)', code: 'NEWTONS_THIRD_LAW', description: 'Equal and opposite forces' },
  ],
  // Nested subtopics under Work and Energy
  WORK_ENERGY: [
    { name: 'Work Done', code: 'WORK_DONE', description: 'Energy transferred by force' },
    { name: 'Kinetic Energy', code: 'KINETIC_ENERGY', description: 'Energy of motion' },
    { name: 'Potential Energy', code: 'POTENTIAL_ENERGY', description: 'Stored energy' },
    { name: 'Conservation of Energy', code: 'ENERGY_CONSERVATION', description: 'Total energy remains constant' },
    { name: 'Power', code: 'POWER', description: 'Rate of doing work' },
  ],
  // Nested subtopics under Momentum
  MOMENTUM: [
    { name: 'Linear Momentum', code: 'LINEAR_MOMENTUM', description: 'Product of mass and velocity' },
    { name: 'Conservation of Momentum', code: 'MOMENTUM_CONSERVATION', description: 'Momentum remains constant' },
    { name: 'Impulse', code: 'IMPULSE', description: 'Change in momentum' },
    { name: 'Collisions', code: 'COLLISIONS', description: 'Interaction between objects' },
    { name: 'Angular Momentum', code: 'ANGULAR_MOMENTUM', description: 'Rotational momentum' },
  ],
  // Nested subtopics under Gravitation
  GRAVITATION: [
    { name: 'Universal Law of Gravitation', code: 'UNIVERSAL_GRAVITATION', description: 'Newton\'s law of gravity' },
    { name: 'Gravitational Field', code: 'GRAVITATIONAL_FIELD', description: 'Space around massive objects' },
    { name: 'Gravitational Potential', code: 'GRAVITATIONAL_POTENTIAL', description: 'Potential energy in gravity' },
    { name: 'Satellite Motion', code: 'SATELLITE_MOTION', description: 'Orbital motion' },
    { name: 'Escape Velocity', code: 'ESCAPE_VELOCITY', description: 'Speed to escape gravity' },
  ],
  THERMODYNAMICS: [
    { name: 'Laws of Thermodynamics', code: 'THERMODYNAMICS_LAWS', description: 'Fundamental laws of thermodynamics' },
    { name: 'Heat Transfer', code: 'HEAT_TRANSFER', description: 'Study of heat conduction, convection, and radiation' },
    { name: 'Thermal Properties', code: 'THERMAL_PROPERTIES', description: 'Study of thermal expansion and specific heat' },
    { name: 'Gas Laws', code: 'GAS_LAWS', description: 'Study of pressure, volume, and temperature relationships' },
    { name: 'Entropy', code: 'ENTROPY', description: 'Study of disorder and energy distribution' },
  ],
  ELECTROMAGNETISM: [
    { name: 'Electric Field', code: 'ELECTRIC_FIELD', description: 'Study of electric charges and fields' },
    { name: 'Magnetic Field', code: 'MAGNETIC_FIELD', description: 'Study of magnetic forces and fields' },
    { name: 'Electromagnetic Induction', code: 'ELECTROMAGNETIC_INDUCTION', description: 'Study of changing magnetic fields' },
    { name: 'AC Circuits', code: 'AC_CIRCUITS', description: 'Study of alternating current circuits' },
    { name: 'Electromagnetic Waves', code: 'ELECTROMAGNETIC_WAVES', description: 'Study of light and radio waves' },
  ],
  PHYSICAL_CHEMISTRY: [
    { name: 'Atomic Structure', code: 'ATOMIC_STRUCTURE', description: 'Study of atom composition and properties' },
    { name: 'Chemical Bonding', code: 'CHEMICAL_BONDING', description: 'Study of how atoms combine' },
    { name: 'Chemical Kinetics', code: 'CHEMICAL_KINETICS', description: 'Study of reaction rates' },
    { name: 'Chemical Equilibrium', code: 'CHEMICAL_EQUILIBRIUM', description: 'Study of reversible reactions' },
    { name: 'Thermochemistry', code: 'THERMOCHEMISTRY', description: 'Study of heat in chemical reactions' },
  ],
  ORGANIC_CHEMISTRY: [
    { name: 'Hydrocarbons', code: 'HYDROCARBONS', description: 'Study of compounds containing only carbon and hydrogen' },
    { name: 'Alcohols and Ethers', code: 'ALCOHOLS_ETHERS', description: 'Study of oxygen-containing compounds' },
    { name: 'Aldehydes and Ketones', code: 'ALDEHYDES_KETONES', description: 'Study of carbonyl compounds' },
    { name: 'Carboxylic Acids', code: 'CARBOXYLIC_ACIDS', description: 'Study of organic acids' },
    { name: 'Amines', code: 'AMINES', description: 'Study of nitrogen-containing compounds' },
  ],
  ALGEBRA: [
    { name: 'Linear Equations', code: 'LINEAR_EQUATIONS', description: 'Study of first-degree equations' },
    { name: 'Quadratic Equations', code: 'QUADRATIC_EQUATIONS', description: 'Study of second-degree equations' },
    { name: 'Matrices', code: 'MATRICES', description: 'Study of rectangular arrays of numbers' },
    { name: 'Determinants', code: 'DETERMINANTS', description: 'Study of matrix properties' },
    { name: 'Complex Numbers', code: 'COMPLEX_NUMBERS', description: 'Study of numbers with imaginary parts' },
  ],
  CALCULUS: [
    { name: 'Limits', code: 'LIMITS', description: 'Study of function behavior near points' },
    { name: 'Differentiation', code: 'DIFFERENTIATION', description: 'Study of rates of change' },
    { name: 'Integration', code: 'INTEGRATION', description: 'Study of accumulation of change' },
    { name: 'Applications of Derivatives', code: 'APPLICATIONS_DERIVATIVES', description: 'Real-world uses of differentiation' },
    { name: 'Applications of Integrals', code: 'APPLICATIONS_INTEGRALS', description: 'Real-world uses of integration' },
  ],
};

// Subtopic data for NEET topics with nested structure
const neetSubtopics = {
  MECHANICS: [
    { name: 'Kinematics', code: 'KINEMATICS', description: 'Study of motion without considering forces' },
    { name: 'Dynamics', code: 'DYNAMICS', description: 'Study of motion with forces' },
    { name: 'Work and Energy', code: 'WORK_ENERGY', description: 'Study of work, energy, and power' },
    { name: 'Momentum', code: 'MOMENTUM', description: 'Study of linear and angular momentum' },
    { name: 'Gravitation', code: 'GRAVITATION', description: 'Study of gravitational forces' },
  ],
  // Nested subtopics under Kinematics (same as JEE)
  KINEMATICS: [
    { name: 'Linear Motion', code: 'LINEAR_MOTION', description: 'Motion in a straight line' },
    { name: 'Circular Motion', code: 'CIRCULAR_MOTION', description: 'Motion along a circular path' },
    { name: 'Projectile Motion', code: 'PROJECTILE_MOTION', description: 'Motion under gravity' },
    { name: 'Relative Motion', code: 'RELATIVE_MOTION', description: 'Motion from different reference frames' },
    { name: 'Kinematic Equations', code: 'KINEMATIC_EQUATIONS', description: 'Mathematical equations of motion' },
  ],
  // Nested subtopics under Linear Motion
  LINEAR_MOTION: [
    { name: 'Uniform Motion', code: 'UNIFORM_MOTION', description: 'Constant velocity motion' },
    { name: 'Accelerated Motion', code: 'ACCELERATED_MOTION', description: 'Motion with changing velocity' },
    { name: 'Free Fall', code: 'FREE_FALL', description: 'Motion under gravity only' },
  ],
  // Nested subtopics under Circular Motion
  CIRCULAR_MOTION: [
    { name: 'Uniform Circular Motion', code: 'UNIFORM_CIRCULAR_MOTION', description: 'Constant speed circular motion' },
    { name: 'Non-Uniform Circular Motion', code: 'NON_UNIFORM_CIRCULAR_MOTION', description: 'Variable speed circular motion' },
    { name: 'Banking of Roads', code: 'BANKING_OF_ROADS', description: 'Curved road banking' },
  ],
  // Nested subtopics under Dynamics
  DYNAMICS: [
    { name: 'Newton\'s Laws', code: 'NEWTONS_LAWS', description: 'Fundamental laws of motion' },
    { name: 'Friction', code: 'FRICTION', description: 'Resistance to motion' },
    { name: 'Centripetal Force', code: 'CENTRIPETAL_FORCE', description: 'Force for circular motion' },
    { name: 'Tension', code: 'TENSION', description: 'Force in strings and ropes' },
    { name: 'Normal Force', code: 'NORMAL_FORCE', description: 'Contact force perpendicular to surface' },
  ],
  // Nested subtopics under Newton's Laws
  NEWTONS_LAWS: [
    { name: 'First Law (Inertia)', code: 'NEWTONS_FIRST_LAW', description: 'Law of inertia' },
    { name: 'Second Law (F = ma)', code: 'NEWTONS_SECOND_LAW', description: 'Force equals mass times acceleration' },
    { name: 'Third Law (Action-Reaction)', code: 'NEWTONS_THIRD_LAW', description: 'Equal and opposite forces' },
  ],
  THERMODYNAMICS: [
    { name: 'Laws of Thermodynamics', code: 'THERMODYNAMICS_LAWS', description: 'Fundamental laws of thermodynamics' },
    { name: 'Heat Transfer', code: 'HEAT_TRANSFER', description: 'Study of heat conduction, convection, and radiation' },
    { name: 'Thermal Properties', code: 'THERMAL_PROPERTIES', description: 'Study of thermal expansion and specific heat' },
    { name: 'Gas Laws', code: 'GAS_LAWS', description: 'Study of pressure, volume, and temperature relationships' },
    { name: 'Entropy', code: 'ENTROPY', description: 'Study of disorder and energy distribution' },
  ],
  PHYSICAL_CHEMISTRY: [
    { name: 'Atomic Structure', code: 'ATOMIC_STRUCTURE', description: 'Study of atom composition and properties' },
    { name: 'Chemical Bonding', code: 'CHEMICAL_BONDING', description: 'Study of how atoms combine' },
    { name: 'Chemical Kinetics', code: 'CHEMICAL_KINETICS', description: 'Study of reaction rates' },
    { name: 'Chemical Equilibrium', code: 'CHEMICAL_EQUILIBRIUM', description: 'Study of reversible reactions' },
    { name: 'Thermochemistry', code: 'THERMOCHEMISTRY', description: 'Study of heat in chemical reactions' },
  ],
  ORGANIC_CHEMISTRY: [
    { name: 'Hydrocarbons', code: 'HYDROCARBONS', description: 'Study of compounds containing only carbon and hydrogen' },
    { name: 'Alcohols and Ethers', code: 'ALCOHOLS_ETHERS', description: 'Study of oxygen-containing compounds' },
    { name: 'Aldehydes and Ketones', code: 'ALDEHYDES_KETONES', description: 'Study of carbonyl compounds' },
    { name: 'Carboxylic Acids', code: 'CARBOXYLIC_ACIDS', description: 'Study of organic acids' },
    { name: 'Amines', code: 'AMINES', description: 'Study of nitrogen-containing compounds' },
  ],
  BOTANY: [
    { name: 'Plant Anatomy', code: 'PLANT_ANATOMY', description: 'Study of plant structure and organization' },
    { name: 'Plant Physiology', code: 'PLANT_PHYSIOLOGY', description: 'Study of plant functions and processes' },
    { name: 'Plant Taxonomy', code: 'PLANT_TAXONOMY', description: 'Study of plant classification' },
    { name: 'Plant Reproduction', code: 'PLANT_REPRODUCTION', description: 'Study of plant reproductive systems' },
    { name: 'Plant Ecology', code: 'PLANT_ECOLOGY', description: 'Study of plants and their environment' },
  ],
  ZOOLOGY: [
    { name: 'Animal Diversity', code: 'ANIMAL_DIVERSITY', description: 'Study of different animal groups' },
    { name: 'Animal Physiology', code: 'ANIMAL_PHYSIOLOGY', description: 'Study of animal body functions' },
    { name: 'Animal Behavior', code: 'ANIMAL_BEHAVIOR', description: 'Study of animal actions and responses' },
    { name: 'Animal Reproduction', code: 'ANIMAL_REPRODUCTION', description: 'Study of animal reproductive systems' },
    { name: 'Animal Ecology', code: 'ANIMAL_ECOLOGY', description: 'Study of animals and their environment' },
  ],
  CELL_BIOLOGY: [
    { name: 'Cell Structure', code: 'CELL_STRUCTURE', description: 'Study of cell components and organization' },
    { name: 'Cell Division', code: 'CELL_DIVISION', description: 'Study of mitosis and meiosis' },
    { name: 'Cell Transport', code: 'CELL_TRANSPORT', description: 'Study of movement across cell membranes' },
    { name: 'Cell Metabolism', code: 'CELL_METABOLISM', description: 'Study of cellular chemical reactions' },
    { name: 'Cell Communication', code: 'CELL_COMMUNICATION', description: 'Study of cell signaling mechanisms' },
  ],
  GENETICS: [
    { name: 'Mendelian Genetics', code: 'MENDELIAN_GENETICS', description: 'Study of inheritance patterns' },
    { name: 'Molecular Genetics', code: 'MOLECULAR_GENETICS', description: 'Study of DNA and gene expression' },
    { name: 'Population Genetics', code: 'POPULATION_GENETICS', description: 'Study of genetic variation in populations' },
    { name: 'Genetic Disorders', code: 'GENETIC_DISORDERS', description: 'Study of inherited diseases' },
    { name: 'Genetic Engineering', code: 'GENETIC_ENGINEERING', description: 'Study of DNA manipulation' },
  ],
};

export async function seedJeeNeetContent() {
  try {
    await dbConnect();
    console.log('🌱 Seeding JEE and NEET exams with comprehensive content...');

    // Create exams
    const createdExams: { [key: string]: IExam } = {};
    
    for (const exam of examData) {
      try {
        const createdExam = await createExam(exam);
        createdExams[exam.code] = createdExam;
        console.log(`✅ Created exam: ${exam.name}`);
      } catch (error: unknown) {
        const err = error as { code?: number };
        if (err.code === 11000) {
          console.log(`⏭️  Exam ${exam.name} already exists, fetching...`);
          const existingExam = await Exam.findOne({ code: exam.code });
          if (existingExam) {
            createdExams[exam.code] = existingExam;
          }
        } else {
          console.error(`❌ Error creating exam ${exam.name}:`, error);
          return;
        }
      }
    }

    // Create subjects for JEE
    const jeeSubjectsCreated: { [key: string]: ISubject } = {};
    for (const subject of jeeSubjects) {
      try {
        const createdSubject = await createSubject({
          ...subject,
          exam: createdExams['JEE']._id,
        });
        jeeSubjectsCreated[subject.code] = createdSubject;
        console.log(`✅ Created JEE subject: ${subject.name}`);
      } catch (error: unknown) {
        const err = error as { code?: number };
        if (err.code === 11000) {
          console.log(`⏭️  JEE subject ${subject.name} already exists, skipping...`);
        } else {
          console.error(`❌ Error creating JEE subject ${subject.name}:`, error);
        }
      }
    }

    // Create subjects for NEET
    const neetSubjectsCreated: { [key: string]: ISubject } = {};
    for (const subject of neetSubjects) {
      try {
        const createdSubject = await createSubject({
          ...subject,
          exam: createdExams['NEET']._id,
        });
        neetSubjectsCreated[subject.code] = createdSubject;
        console.log(`✅ Created NEET subject: ${subject.name}`);
      } catch (error: unknown) {
        const err = error as { code?: number };
        if (err.code === 11000) {
          console.log(`⏭️  NEET subject ${subject.name} already exists, skipping...`);
        } else {
          console.error(`❌ Error creating NEET subject ${subject.name}:`, error);
        }
      }
    }

    // Create topics for JEE
    const jeeTopicsCreated: { [key: string]: ITopic } = {};
    for (const [subjectCode, topics] of Object.entries(jeeTopics)) {
      const subject = jeeSubjectsCreated[subjectCode];
      if (subject) {
        for (const topic of topics) {
          try {
            const createdTopic = await createTopic({
              ...topic,
              subject: subject._id,
            });
            jeeTopicsCreated[topic.code] = createdTopic;
            console.log(`✅ Created JEE topic: ${topic.name}`);
          } catch (error: unknown) {
            const err = error as { code?: number };
            if (err.code === 11000) {
              console.log(`⏭️  JEE topic ${topic.name} already exists, skipping...`);
            } else {
              console.error(`❌ Error creating JEE topic ${topic.name}:`, error);
            }
          }
        }
      }
    }

    // Create topics for NEET
    const neetTopicsCreated: { [key: string]: ITopic } = {};
    for (const [subjectCode, topics] of Object.entries(neetTopics)) {
      const subject = neetSubjectsCreated[subjectCode];
      if (subject) {
        for (const topic of topics) {
          try {
            const createdTopic = await createTopic({
              ...topic,
              subject: subject._id,
            });
            neetTopicsCreated[topic.code] = createdTopic;
            console.log(`✅ Created NEET topic: ${topic.name}`);
          } catch (error: unknown) {
            const err = error as { code?: number };
            if (err.code === 11000) {
              console.log(`⏭️  NEET topic ${topic.name} already exists, skipping...`);
            } else {
              console.error(`❌ Error creating NEET topic ${topic.name}:`, error);
            }
          }
        }
      }
    }

    // Create subtopics for JEE with nested structure
    const createdSubtopics: { [key: string]: ISubtopic } = {};
    
    // First pass: Create all first-level subtopics (children of topics)
    for (const [topicCode, subtopics] of Object.entries(jeeSubtopics)) {
      const topic = jeeTopicsCreated[topicCode];
      if (topic) {
        for (const subtopic of subtopics) {
          try {
            const createdSubtopic = await createSubtopic({
              ...subtopic,
              topic: topic._id,
            });
            createdSubtopics[subtopic.code] = createdSubtopic;
            console.log(`✅ Created JEE first-level subtopic: ${subtopic.name}`);
          } catch (error: unknown) {
            const err = error as { code?: number };
            if (err.code === 11000) {
              console.log(`⏭️  JEE first-level subtopic ${subtopic.name} already exists, skipping...`);
            } else {
              console.error(`❌ Error creating JEE first-level subtopic ${subtopic.name}:`, error);
            }
          }
        }
      }
    }
    
    // Second pass: Create nested subtopics (children of subtopics)
    for (const [parentCode, subtopics] of Object.entries(jeeSubtopics)) {
      // Skip topics (only process subtopics that have children)
      if (!jeeTopicsCreated[parentCode]) {
        const parentSubtopic = createdSubtopics[parentCode];
        if (parentSubtopic) {
          for (const subtopic of subtopics) {
            try {
              await createSubtopic({
                ...subtopic,
                topic: parentSubtopic.topic, // Same topic as parent
                parentSubtopic: parentSubtopic._id,
              });
              console.log(`✅ Created JEE nested subtopic: ${subtopic.name} under ${parentCode}`);
            } catch (error: unknown) {
              const err = error as { code?: number };
              if (err.code === 11000) {
                console.log(`⏭️  JEE nested subtopic ${subtopic.name} already exists, skipping...`);
              } else {
                console.error(`❌ Error creating JEE nested subtopic ${subtopic.name}:`, error);
              }
            }
          }
        }
      }
    }

    // Create subtopics for NEET with nested structure
    const createdNeetSubtopics: { [key: string]: ISubtopic } = {};
    
    // First pass: Create all first-level subtopics (children of topics)
    for (const [topicCode, subtopics] of Object.entries(neetSubtopics)) {
      const topic = neetTopicsCreated[topicCode];
      if (topic) {
        for (const subtopic of subtopics) {
          try {
            const createdSubtopic = await createSubtopic({
              ...subtopic,
              topic: topic._id,
            });
            createdNeetSubtopics[subtopic.code] = createdSubtopic;
            console.log(`✅ Created NEET first-level subtopic: ${subtopic.name}`);
          } catch (error: unknown) {
            const err = error as { code?: number };
            if (err.code === 11000) {
              console.log(`⏭️  NEET first-level subtopic ${subtopic.name} already exists, skipping...`);
            } else {
              console.error(`❌ Error creating NEET first-level subtopic ${subtopic.name}:`, error);
            }
          }
        }
      }
    }
    
    // Second pass: Create nested subtopics (children of subtopics)
    for (const [parentCode, subtopics] of Object.entries(neetSubtopics)) {
      // Skip topics (only process subtopics that have children)
      if (!neetTopicsCreated[parentCode]) {
        const parentSubtopic = createdNeetSubtopics[parentCode];
        if (parentSubtopic) {
          for (const subtopic of subtopics) {
            try {
              await createSubtopic({
                ...subtopic,
                topic: parentSubtopic.topic, // Same topic as parent
                parentSubtopic: parentSubtopic._id,
              });
              console.log(`✅ Created NEET nested subtopic: ${subtopic.name} under ${parentCode}`);
            } catch (error: unknown) {
              const err = error as { code?: number };
              if (err.code === 11000) {
                console.log(`⏭️  NEET nested subtopic ${subtopic.name} already exists, skipping...`);
              } else {
                console.error(`❌ Error creating NEET nested subtopic ${subtopic.name}:`, error);
              }
            }
          }
        }
      }
    }

    console.log('✅ JEE and NEET content seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding JEE and NEET content:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedJeeNeetContent()
    .then(() => {
      console.log('🎉 JEE and NEET content seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 JEE and NEET content seeding failed:', error);
      process.exit(1);
    });
} 
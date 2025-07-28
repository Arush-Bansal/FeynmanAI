import 'dotenv/config';
import dbConnect from './dbConnect';
import { createExam } from './data/exams';
import { createSubject } from './data/subjects';
import { createTopic } from './data/topics';
import { createSubtopic } from './data/subtopics';
import { Exam, IExam } from './models/Exam';
import { ISubject } from './models/Subject';
import { ITopic } from './models/Topic';

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

// Subtopic data for JEE topics
const jeeSubtopics = {
  MECHANICS: [
    { name: 'Kinematics', code: 'KINEMATICS', description: 'Study of motion without considering forces' },
    { name: 'Dynamics', code: 'DYNAMICS', description: 'Study of motion with forces' },
    { name: 'Work and Energy', code: 'WORK_ENERGY', description: 'Study of work, energy, and power' },
    { name: 'Momentum', code: 'MOMENTUM', description: 'Study of linear and angular momentum' },
    { name: 'Gravitation', code: 'GRAVITATION', description: 'Study of gravitational forces' },
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

// Subtopic data for NEET topics
const neetSubtopics = {
  MECHANICS: [
    { name: 'Kinematics', code: 'KINEMATICS', description: 'Study of motion without considering forces' },
    { name: 'Dynamics', code: 'DYNAMICS', description: 'Study of motion with forces' },
    { name: 'Work and Energy', code: 'WORK_ENERGY', description: 'Study of work, energy, and power' },
    { name: 'Momentum', code: 'MOMENTUM', description: 'Study of linear and angular momentum' },
    { name: 'Gravitation', code: 'GRAVITATION', description: 'Study of gravitational forces' },
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

    // Create subtopics for JEE
    for (const [topicCode, subtopics] of Object.entries(jeeSubtopics)) {
      const topic = jeeTopicsCreated[topicCode];
      if (topic) {
        for (const subtopic of subtopics) {
          try {
            await createSubtopic({
              ...subtopic,
              topic: topic._id,
            });
            console.log(`✅ Created JEE subtopic: ${subtopic.name}`);
          } catch (error: unknown) {
            const err = error as { code?: number };
            if (err.code === 11000) {
              console.log(`⏭️  JEE subtopic ${subtopic.name} already exists, skipping...`);
            } else {
              console.error(`❌ Error creating JEE subtopic ${subtopic.name}:`, error);
            }
          }
        }
      }
    }

    // Create subtopics for NEET
    for (const [topicCode, subtopics] of Object.entries(neetSubtopics)) {
      const topic = neetTopicsCreated[topicCode];
      if (topic) {
        for (const subtopic of subtopics) {
          try {
            await createSubtopic({
              ...subtopic,
              topic: topic._id,
            });
            console.log(`✅ Created NEET subtopic: ${subtopic.name}`);
          } catch (error: unknown) {
            const err = error as { code?: number };
            if (err.code === 11000) {
              console.log(`⏭️  NEET subtopic ${subtopic.name} already exists, skipping...`);
            } else {
              console.error(`❌ Error creating NEET subtopic ${subtopic.name}:`, error);
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
import 'dotenv/config';
import dbConnect from './dbConnect';
import { createSubject } from './data/subjects';
import { createTopic } from './data/topics';
import { createSubtopic } from './data/subtopics';
import { Exam, IExam } from './models/Exam';
import { ISubject } from './models/Subject';
import { ITopic } from './models/Topic';
import { ISubtopic } from './models/Subtopic';

// Subject data - shared between JEE and NEET where applicable
const subjects = {
  PHYSICS: {
    name: 'Physics',
    code: 'PHYSICS',
    description: 'Study of matter, energy, and their interactions',
  },
  CHEMISTRY: {
    name: 'Chemistry',
    code: 'CHEMISTRY',
    description: 'Study of substances and their properties',
  },
  MATHEMATICS: {
    name: 'Mathematics',
    code: 'MATHEMATICS',
    description: 'Study of numbers, quantities, and shapes',
  },
  BIOLOGY: {
    name: 'Biology',
    code: 'BIOLOGY',
    description: 'Study of living organisms and life processes',
  },
};

// Topic data - shared between JEE and NEET where applicable
const topics = {
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
  BIOLOGY: [
    { name: 'Botany', code: 'BOTANY', description: 'Study of plants and plant life' },
    { name: 'Zoology', code: 'ZOOLOGY', description: 'Study of animals and animal life' },
    { name: 'Cell Biology', code: 'CELL_BIOLOGY', description: 'Study of cells and their functions' },
    { name: 'Genetics', code: 'GENETICS', description: 'Study of heredity and variation' },
    { name: 'Ecology', code: 'ECOLOGY', description: 'Study of organisms and their environment' },
  ],
};

// Subtopic data - shared between JEE and NEET where applicable
const subtopics = {
  // Physics subtopics
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
  OPTICS: [
    { name: 'Geometric Optics', code: 'GEOMETRIC_OPTICS', description: 'Study of light rays and reflection/refraction' },
    { name: 'Wave Optics', code: 'WAVE_OPTICS', description: 'Study of light as waves' },
    { name: 'Interference', code: 'INTERFERENCE', description: 'Study of wave interference patterns' },
    { name: 'Diffraction', code: 'DIFFRACTION', description: 'Study of light bending around obstacles' },
    { name: 'Polarization', code: 'POLARIZATION', description: 'Study of light wave orientation' },
  ],
  MODERN_PHYSICS: [
    { name: 'Photoelectric Effect', code: 'PHOTOELECTRIC_EFFECT', description: 'Study of light-matter interaction' },
    { name: 'Atomic Structure', code: 'ATOMIC_STRUCTURE_PHYSICS', description: 'Study of atom composition and energy levels' },
    { name: 'Nuclear Physics', code: 'NUCLEAR_PHYSICS', description: 'Study of atomic nuclei and radioactivity' },
    { name: 'Relativity', code: 'RELATIVITY', description: 'Study of space-time and mass-energy' },
    { name: 'Quantum Mechanics', code: 'QUANTUM_MECHANICS', description: 'Study of matter at atomic scale' },
  ],
  
  // Chemistry subtopics
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
  INORGANIC_CHEMISTRY: [
    { name: 'Periodic Table', code: 'PERIODIC_TABLE', description: 'Study of element organization and properties' },
    { name: 'Chemical Bonding', code: 'INORGANIC_BONDING', description: 'Study of ionic and covalent bonds' },
    { name: 'Coordination Compounds', code: 'COORDINATION_COMPOUNDS', description: 'Study of complex metal compounds' },
    { name: 'Acids and Bases', code: 'ACIDS_BASES', description: 'Study of acid-base reactions' },
    { name: 'Redox Reactions', code: 'REDOX_REACTIONS', description: 'Study of oxidation-reduction reactions' },
  ],
  ANALYTICAL_CHEMISTRY: [
    { name: 'Qualitative Analysis', code: 'QUALITATIVE_ANALYSIS', description: 'Study of identifying chemical species' },
    { name: 'Quantitative Analysis', code: 'QUANTITATIVE_ANALYSIS', description: 'Study of measuring chemical amounts' },
    { name: 'Titration', code: 'TITRATION', description: 'Study of volumetric analysis' },
    { name: 'Gravimetric Analysis', code: 'GRAVIMETRIC_ANALYSIS', description: 'Study of mass-based analysis' },
    { name: 'Instrumental Analysis', code: 'INSTRUMENTAL_ANALYSIS', description: 'Study of modern analytical techniques' },
  ],
  COORDINATION_CHEMISTRY: [
    { name: 'Coordination Compounds', code: 'COORDINATION_COMPOUNDS_CHEM', description: 'Study of metal-ligand complexes' },
    { name: 'Crystal Field Theory', code: 'CRYSTAL_FIELD_THEORY', description: 'Study of d-orbital splitting' },
    { name: 'Valence Bond Theory', code: 'VALENCE_BOND_THEORY', description: 'Study of chemical bonding in complexes' },
    { name: 'Isomerism', code: 'ISOMERISM', description: 'Study of different forms of same compound' },
    { name: 'Applications', code: 'COORDINATION_APPLICATIONS', description: 'Real-world applications of complexes' },
  ],
  
  // Mathematics subtopics
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
  GEOMETRY: [
    { name: 'Coordinate Geometry', code: 'COORDINATE_GEOMETRY', description: 'Study of geometric figures using coordinates' },
    { name: 'Conic Sections', code: 'CONIC_SECTIONS', description: 'Study of circles, ellipses, parabolas, hyperbolas' },
    { name: '3D Geometry', code: '3D_GEOMETRY', description: 'Study of three-dimensional shapes' },
    { name: 'Vectors', code: 'VECTORS', description: 'Study of directed quantities' },
    { name: 'Lines and Planes', code: 'LINES_PLANES', description: 'Study of linear and planar geometry' },
  ],
  TRIGONOMETRY: [
    { name: 'Trigonometric Functions', code: 'TRIG_FUNCTIONS', description: 'Study of sine, cosine, tangent functions' },
    { name: 'Trigonometric Identities', code: 'TRIG_IDENTITIES', description: 'Study of trigonometric relationships' },
    { name: 'Trigonometric Equations', code: 'TRIG_EQUATIONS', description: 'Study of equations involving trig functions' },
    { name: 'Inverse Trigonometric Functions', code: 'INVERSE_TRIG', description: 'Study of arcsin, arccos, arctan' },
    { name: 'Applications of Trigonometry', code: 'TRIG_APPLICATIONS', description: 'Real-world uses of trigonometry' },
  ],
  STATISTICS: [
    { name: 'Descriptive Statistics', code: 'DESCRIPTIVE_STATS', description: 'Study of data summarization' },
    { name: 'Probability', code: 'PROBABILITY', description: 'Study of chance and likelihood' },
    { name: 'Random Variables', code: 'RANDOM_VARIABLES', description: 'Study of variable outcomes' },
    { name: 'Probability Distributions', code: 'PROBABILITY_DISTRIBUTIONS', description: 'Study of probability patterns' },
    { name: 'Hypothesis Testing', code: 'HYPOTHESIS_TESTING', description: 'Study of statistical inference' },
  ],
  
  // Biology subtopics
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
  ECOLOGY: [
    { name: 'Population Ecology', code: 'POPULATION_ECOLOGY', description: 'Study of population dynamics' },
    { name: 'Community Ecology', code: 'COMMUNITY_ECOLOGY', description: 'Study of species interactions' },
    { name: 'Ecosystem Ecology', code: 'ECOSYSTEM_ECOLOGY', description: 'Study of energy and nutrient flow' },
    { name: 'Conservation Biology', code: 'CONSERVATION_BIOLOGY', description: 'Study of biodiversity protection' },
    { name: 'Environmental Biology', code: 'ENVIRONMENTAL_BIOLOGY', description: 'Study of human impact on environment' },
  ],
};

export async function seedJeeNeetContent() {
  try {
    await dbConnect();
    console.log('🌱 Seeding JEE and NEET content...');

    // Get existing exams
    const jeeExam = await Exam.findOne({ code: 'JEE' });
    const neetExam = await Exam.findOne({ code: 'NEET' });
    
    if (!jeeExam || !neetExam) {
      throw new Error('JEE and NEET exams must be created first. Please run seed-exams.ts');
    }

    const createdExams = { JEE: jeeExam, NEET: neetExam };

    // Define exam-subject mappings
    const examSubjects = {
      JEE: ['PHYSICS', 'CHEMISTRY', 'MATHEMATICS'],
      NEET: ['PHYSICS', 'CHEMISTRY', 'BIOLOGY'],
    };

    // Create subjects for each exam
    const createdSubjects: { [examCode: string]: { [subjectCode: string]: ISubject } } = {
      JEE: {},
      NEET: {},
    };

    for (const [examCode, subjectCodes] of Object.entries(examSubjects)) {
      for (const subjectCode of subjectCodes) {
        const subjectData = subjects[subjectCode as keyof typeof subjects];
        if (!subjectData) continue;

        try {
          const createdSubject = await createSubject({
            ...subjectData,
            exam: createdExams[examCode as keyof typeof createdExams]._id,
          });
          createdSubjects[examCode][subjectCode] = createdSubject;
          console.log(`✅ Created ${examCode} subject: ${subjectData.name}`);
        } catch (error: unknown) {
          const err = error as { code?: number };
          if (err.code === 11000) {
            console.log(`⏭️  ${examCode} subject ${subjectData.name} already exists, skipping...`);
          } else {
            console.error(`❌ Error creating ${examCode} subject ${subjectData.name}:`, error);
          }
        }
      }
    }

    // Create topics for each exam
    const createdTopics: { [examCode: string]: { [topicCode: string]: ITopic } } = {
      JEE: {},
      NEET: {},
    };

    for (const [examCode, subjectCodes] of Object.entries(examSubjects)) {
      for (const subjectCode of subjectCodes) {
        const subject = createdSubjects[examCode][subjectCode];
        if (!subject) continue;

        const topicList = topics[subjectCode as keyof typeof topics];
        if (!topicList) continue;

        for (const topic of topicList) {
          try {
            const createdTopic = await createTopic({
              ...topic,
              subject: subject._id,
            });
            createdTopics[examCode][topic.code] = createdTopic;
            console.log(`✅ Created ${examCode} topic: ${topic.name}`);
          } catch (error: unknown) {
            const err = error as { code?: number };
            if (err.code === 11000) {
              console.log(`⏭️  ${examCode} topic ${topic.name} already exists, skipping...`);
            } else {
              console.error(`❌ Error creating ${examCode} topic ${topic.name}:`, error);
            }
          }
        }
      }
    }

    // Create subtopics for each exam
    for (const [examCode, subjectCodes] of Object.entries(examSubjects)) {
      for (const subjectCode of subjectCodes) {
        const topicList = topics[subjectCode as keyof typeof topics];
        if (!topicList) continue;

        for (const topic of topicList) {
          const subtopicList = subtopics[topic.code as keyof typeof subtopics];
          if (!subtopicList) continue;

          for (const subtopic of subtopicList) {
            try {
              await createSubtopic({
                ...subtopic,
                topic: createdTopics[examCode][topic.code]._id,
              });
              console.log(`✅ Created ${examCode} subtopic: ${subtopic.name}`);
            } catch (error: unknown) {
              const err = error as { code?: number };
              if (err.code === 11000) {
                console.log(`⏭️  ${examCode} subtopic ${subtopic.name} already exists, skipping...`);
              } else {
                console.error(`❌ Error creating ${examCode} subtopic ${subtopic.name}:`, error);
              }
            }
          }
        }
      }
    }

    console.log('✅ JEE and NEET content seeding completed');
  } catch (error) {
    console.error('❌ Error seeding JEE and NEET content:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedJeeNeetContent()
    .then(() => {
      console.log('🎉 Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
} 
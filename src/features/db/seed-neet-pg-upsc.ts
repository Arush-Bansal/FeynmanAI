import 'dotenv/config';
import dbConnect from './dbConnect';
import { createExam } from './data/exams';
import { createSubject } from './data/subjects';
import { createTopic } from './data/topics';
import { createSubtopic } from './data/subtopics';
import { Exam, IExam } from './models/Exam';
import { ISubject } from './models/Subject';
import { ITopic } from './models/Topic';

// Exam data for NEET PG and UPSC
const examData = [
  {
    name: 'NEET PG',
    code: 'NEET_PG',
    description: 'Post Graduate Medical Entrance',
    icon: '/images/neet-icon.svg',
    gradient: 'from-purple-700 to-purple-900',
  },
  {
    name: 'UPSC',
    code: 'UPSC',
    description: 'Civil Services Examination',
    icon: '/images/upsc-icon.svg',
    gradient: 'from-orange-700 to-orange-900',
  },
];

// Subject data for NEET PG
const neetPgSubjects = [
  {
    name: 'Anatomy',
    code: 'ANATOMY',
    description: 'Study of human body structure and organization',
  },
  {
    name: 'Physiology',
    code: 'PHYSIOLOGY',
    description: 'Study of how the human body functions',
  },
  {
    name: 'Biochemistry',
    code: 'BIOCHEMISTRY',
    description: 'Study of chemical processes in living organisms',
  },
  {
    name: 'Pathology',
    code: 'PATHOLOGY',
    description: 'Study of diseases and their causes',
  },
  {
    name: 'Pharmacology',
    code: 'PHARMACOLOGY',
    description: 'Study of drugs and their effects on the body',
  },
];

// Subject data for UPSC
const upscSubjects = [
  {
    name: 'General Studies',
    code: 'GENERAL_STUDIES',
    description: 'Comprehensive study of current affairs and general knowledge',
  },
  {
    name: 'Indian Polity',
    code: 'INDIAN_POLITY',
    description: 'Study of Indian Constitution and governance',
  },
  {
    name: 'Geography',
    code: 'GEOGRAPHY',
    description: 'Study of physical and human geography',
  },
  {
    name: 'History',
    code: 'HISTORY',
    description: 'Study of Indian and world history',
  },
  {
    name: 'Economics',
    code: 'ECONOMICS',
    description: 'Study of economic principles and policies',
  },
];

// Topic data for NEET PG subjects
const neetPgTopics = {
  ANATOMY: [
    { name: 'Gross Anatomy', code: 'GROSS_ANATOMY', description: 'Study of visible structures of the body' },
    { name: 'Histology', code: 'HISTOLOGY', description: 'Study of microscopic anatomy' },
    { name: 'Embryology', code: 'EMBRYOLOGY', description: 'Study of development from fertilization to birth' },
  ],
  PHYSIOLOGY: [
    { name: 'Cardiovascular Physiology', code: 'CARDIOVASCULAR_PHYSIOLOGY', description: 'Study of heart and blood vessels' },
    { name: 'Respiratory Physiology', code: 'RESPIRATORY_PHYSIOLOGY', description: 'Study of breathing and gas exchange' },
    { name: 'Neurophysiology', code: 'NEUROPHYSIOLOGY', description: 'Study of nervous system function' },
  ],
  BIOCHEMISTRY: [
    { name: 'Metabolism', code: 'METABOLISM', description: 'Study of biochemical reactions in cells' },
    { name: 'Molecular Biology', code: 'MOLECULAR_BIOLOGY', description: 'Study of biological molecules' },
    { name: 'Enzymology', code: 'ENZYMOLOGY', description: 'Study of enzymes and their functions' },
  ],
  PATHOLOGY: [
    { name: 'General Pathology', code: 'GENERAL_PATHOLOGY', description: 'Study of disease mechanisms' },
    { name: 'Systemic Pathology', code: 'SYSTEMIC_PATHOLOGY', description: 'Study of diseases by organ system' },
    { name: 'Clinical Pathology', code: 'CLINICAL_PATHOLOGY', description: 'Study of laboratory diagnosis' },
  ],
  PHARMACOLOGY: [
    { name: 'Pharmacokinetics', code: 'PHARMACOKINETICS', description: 'Study of drug absorption and metabolism' },
    { name: 'Pharmacodynamics', code: 'PHARMACODYNAMICS', description: 'Study of drug effects on the body' },
    { name: 'Clinical Pharmacology', code: 'CLINICAL_PHARMACOLOGY', description: 'Study of drug use in patients' },
  ],
};

// Topic data for UPSC subjects
const upscTopics = {
  GENERAL_STUDIES: [
    { name: 'Current Affairs', code: 'CURRENT_AFFAIRS', description: 'Recent events and developments' },
    { name: 'Environment', code: 'ENVIRONMENT', description: 'Environmental issues and policies' },
    { name: 'Science and Technology', code: 'SCIENCE_TECHNOLOGY', description: 'Scientific developments and innovations' },
  ],
  INDIAN_POLITY: [
    { name: 'Constitution', code: 'CONSTITUTION', description: 'Indian Constitution and its features' },
    { name: 'Parliament', code: 'PARLIAMENT', description: 'Legislative structure and functioning' },
    { name: 'Judiciary', code: 'JUDICIARY', description: 'Court system and legal framework' },
  ],
  GEOGRAPHY: [
    { name: 'Physical Geography', code: 'PHYSICAL_GEOGRAPHY', description: 'Natural features and processes' },
    { name: 'Human Geography', code: 'HUMAN_GEOGRAPHY', description: 'Human settlements and activities' },
    { name: 'Economic Geography', code: 'ECONOMIC_GEOGRAPHY', description: 'Resource distribution and economic activities' },
  ],
  HISTORY: [
    { name: 'Ancient History', code: 'ANCIENT_HISTORY', description: 'Early civilizations and empires' },
    { name: 'Medieval History', code: 'MEDIEVAL_HISTORY', description: 'Middle ages and kingdoms' },
    { name: 'Modern History', code: 'MODERN_HISTORY', description: 'Colonial period and independence movement' },
  ],
  ECONOMICS: [
    { name: 'Macroeconomics', code: 'MACROECONOMICS', description: 'National and global economic systems' },
    { name: 'Microeconomics', code: 'MICROECONOMICS', description: 'Individual and firm economic behavior' },
    { name: 'Indian Economy', code: 'INDIAN_ECONOMY', description: 'Economic policies and development' },
  ],
};

// Subtopic data for NEET PG topics
const neetPgSubtopics = {
  GROSS_ANATOMY: [
    { name: 'Head and Neck', code: 'HEAD_NECK', description: 'Anatomy of head and neck region' },
    { name: 'Thorax', code: 'THORAX', description: 'Anatomy of chest region' },
    { name: 'Abdomen', code: 'ABDOMEN', description: 'Anatomy of abdominal region' },
  ],
  HISTOLOGY: [
    { name: 'Epithelial Tissue', code: 'EPITHELIAL_TISSUE', description: 'Study of epithelial cells and tissues' },
    { name: 'Connective Tissue', code: 'CONNECTIVE_TISSUE', description: 'Study of connective tissue types' },
    { name: 'Muscle Tissue', code: 'MUSCLE_TISSUE', description: 'Study of muscle cell types' },
  ],
  CARDIOVASCULAR_PHYSIOLOGY: [
    { name: 'Cardiac Cycle', code: 'CARDIAC_CYCLE', description: 'Heart contraction and relaxation phases' },
    { name: 'Blood Pressure', code: 'BLOOD_PRESSURE', description: 'Regulation of blood pressure' },
    { name: 'Circulation', code: 'CIRCULATION', description: 'Blood flow through the body' },
  ],
  METABOLISM: [
    { name: 'Carbohydrate Metabolism', code: 'CARBOHYDRATE_METABOLISM', description: 'Glucose breakdown and synthesis' },
    { name: 'Lipid Metabolism', code: 'LIPID_METABOLISM', description: 'Fat breakdown and synthesis' },
    { name: 'Protein Metabolism', code: 'PROTEIN_METABOLISM', description: 'Amino acid metabolism' },
  ],
  GENERAL_PATHOLOGY: [
    { name: 'Cell Injury', code: 'CELL_INJURY', description: 'Mechanisms of cell damage' },
    { name: 'Inflammation', code: 'INFLAMMATION', description: 'Inflammatory response mechanisms' },
    { name: 'Tissue Repair', code: 'TISSUE_REPAIR', description: 'Healing and regeneration processes' },
  ],
};

// Subtopic data for UPSC topics
const upscSubtopics = {
  CURRENT_AFFAIRS: [
    { name: 'National News', code: 'NATIONAL_NEWS', description: 'Important national developments' },
    { name: 'International Relations', code: 'INTERNATIONAL_RELATIONS', description: 'Global political developments' },
    { name: 'Government Schemes', code: 'GOVERNMENT_SCHEMES', description: 'New government initiatives' },
  ],
  CONSTITUTION: [
    { name: 'Fundamental Rights', code: 'FUNDAMENTAL_RIGHTS', description: 'Basic rights guaranteed by Constitution' },
    { name: 'Directive Principles', code: 'DIRECTIVE_PRINCIPLES', description: 'Guidelines for government policies' },
    { name: 'Constitutional Amendments', code: 'CONSTITUTIONAL_AMENDMENTS', description: 'Changes to the Constitution' },
  ],
  PHYSICAL_GEOGRAPHY: [
    { name: 'Climate', code: 'CLIMATE', description: 'Weather patterns and climate zones' },
    { name: 'Landforms', code: 'LANDFORMS', description: 'Natural features of the Earth' },
    { name: 'Water Bodies', code: 'WATER_BODIES', description: 'Oceans, rivers, and lakes' },
  ],
  ANCIENT_HISTORY: [
    { name: 'Indus Valley Civilization', code: 'INDUS_VALLEY', description: 'Early urban civilization' },
    { name: 'Vedic Period', code: 'VEDIC_PERIOD', description: 'Early Indian society and culture' },
    { name: 'Mauryan Empire', code: 'MAURYAN_EMPIRE', description: 'First major Indian empire' },
  ],
  MACROECONOMICS: [
    { name: 'GDP and Growth', code: 'GDP_GROWTH', description: 'Economic output and development' },
    { name: 'Inflation', code: 'INFLATION', description: 'Price level changes' },
    { name: 'Monetary Policy', code: 'MONETARY_POLICY', description: 'Central bank policies' },
  ],
};

export async function seedNeetPgUpsc() {
  try {
    await dbConnect();
    console.log('🌱 Seeding NEET PG and UPSC exams with content...');

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

    // Create subjects for NEET PG
    const neetPgSubjectsCreated: { [key: string]: ISubject } = {};
    for (const subject of neetPgSubjects) {
      try {
        const createdSubject = await createSubject({
          ...subject,
          exam: createdExams['NEET_PG']._id,
        });
        neetPgSubjectsCreated[subject.code] = createdSubject;
        console.log(`✅ Created NEET PG subject: ${subject.name}`);
      } catch (error: unknown) {
        const err = error as { code?: number };
        if (err.code === 11000) {
          console.log(`⏭️  NEET PG subject ${subject.name} already exists, skipping...`);
        } else {
          console.error(`❌ Error creating NEET PG subject ${subject.name}:`, error);
        }
      }
    }

    // Create subjects for UPSC
    const upscSubjectsCreated: { [key: string]: ISubject } = {};
    for (const subject of upscSubjects) {
      try {
        const createdSubject = await createSubject({
          ...subject,
          exam: createdExams['UPSC']._id,
        });
        upscSubjectsCreated[subject.code] = createdSubject;
        console.log(`✅ Created UPSC subject: ${subject.name}`);
      } catch (error: unknown) {
        const err = error as { code?: number };
        if (err.code === 11000) {
          console.log(`⏭️  UPSC subject ${subject.name} already exists, skipping...`);
        } else {
          console.error(`❌ Error creating UPSC subject ${subject.name}:`, error);
        }
      }
    }

    // Create topics for NEET PG
    const neetPgTopicsCreated: { [key: string]: ITopic } = {};
    for (const [subjectCode, topics] of Object.entries(neetPgTopics)) {
      const subject = neetPgSubjectsCreated[subjectCode];
      if (subject) {
        for (const topic of topics) {
          try {
            const createdTopic = await createTopic({
              ...topic,
              subject: subject._id,
            });
            neetPgTopicsCreated[topic.code] = createdTopic;
            console.log(`✅ Created NEET PG topic: ${topic.name}`);
          } catch (error: unknown) {
            const err = error as { code?: number };
            if (err.code === 11000) {
              console.log(`⏭️  NEET PG topic ${topic.name} already exists, skipping...`);
            } else {
              console.error(`❌ Error creating NEET PG topic ${topic.name}:`, error);
            }
          }
        }
      }
    }

    // Create topics for UPSC
    const upscTopicsCreated: { [key: string]: ITopic } = {};
    for (const [subjectCode, topics] of Object.entries(upscTopics)) {
      const subject = upscSubjectsCreated[subjectCode];
      if (subject) {
        for (const topic of topics) {
          try {
            const createdTopic = await createTopic({
              ...topic,
              subject: subject._id,
            });
            upscTopicsCreated[topic.code] = createdTopic;
            console.log(`✅ Created UPSC topic: ${topic.name}`);
          } catch (error: unknown) {
            const err = error as { code?: number };
            if (err.code === 11000) {
              console.log(`⏭️  UPSC topic ${topic.name} already exists, skipping...`);
            } else {
              console.error(`❌ Error creating UPSC topic ${topic.name}:`, error);
            }
          }
        }
      }
    }

    // Create subtopics for NEET PG
    for (const [topicCode, subtopics] of Object.entries(neetPgSubtopics)) {
      const topic = neetPgTopicsCreated[topicCode];
      if (topic) {
        for (const subtopic of subtopics) {
          try {
            await createSubtopic({
              ...subtopic,
              topic: topic._id,
            });
            console.log(`✅ Created NEET PG subtopic: ${subtopic.name}`);
          } catch (error: unknown) {
            const err = error as { code?: number };
            if (err.code === 11000) {
              console.log(`⏭️  NEET PG subtopic ${subtopic.name} already exists, skipping...`);
            } else {
              console.error(`❌ Error creating NEET PG subtopic ${subtopic.name}:`, error);
            }
          }
        }
      }
    }

    // Create subtopics for UPSC
    for (const [topicCode, subtopics] of Object.entries(upscSubtopics)) {
      const topic = upscTopicsCreated[topicCode];
      if (topic) {
        for (const subtopic of subtopics) {
          try {
            await createSubtopic({
              ...subtopic,
              topic: topic._id,
            });
            console.log(`✅ Created UPSC subtopic: ${subtopic.name}`);
          } catch (error: unknown) {
            const err = error as { code?: number };
            if (err.code === 11000) {
              console.log(`⏭️  UPSC subtopic ${subtopic.name} already exists, skipping...`);
            } else {
              console.error(`❌ Error creating UPSC subtopic ${subtopic.name}:`, error);
            }
          }
        }
      }
    }

    console.log('✅ NEET PG and UPSC seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding NEET PG and UPSC:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedNeetPgUpsc()
    .then(() => {
      console.log('🎉 NEET PG and UPSC seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 NEET PG and UPSC seeding failed:', error);
      process.exit(1);
    });
} 
import 'dotenv/config';
import dbConnect from './dbConnect';
import { createExam } from './data/exams';

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

export async function seedExams() {
  try {
    await dbConnect();
    console.log('🌱 Seeding exams...');

    for (const exam of examData) {
      try {
        await createExam(exam);
        console.log(`✅ Created exam: ${exam.name}`);
              } catch (error: unknown) {
          const err = error as { code?: number };
          if (err.code === 11000) {
          console.log(`⏭️  Exam ${exam.name} already exists, skipping...`);
        } else {
          console.error(`❌ Error creating exam ${exam.name}:`, error);
        }
      }
    }

    console.log('✅ Exam seeding completed');
  } catch (error) {
    console.error('❌ Error seeding exams:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedExams()
    .then(() => {
      console.log('🎉 Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
} 
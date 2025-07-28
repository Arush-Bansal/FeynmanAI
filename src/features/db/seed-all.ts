import 'dotenv/config';
import { seedExams } from './seed-exams';
import { seedNeetPgUpsc } from './seed-neet-pg-upsc';
import { seedJeeNeetContent } from './seed-jee-neet-content';

export async function seedAll() {
  try {
    console.log('🚀 Starting comprehensive database seeding...\n');

    // Seed basic exams (JEE, NEET)
    console.log('📚 Step 1: Seeding basic exams (JEE, NEET)...');
    await seedExams();
    console.log('✅ Basic exams seeded successfully!\n');

    // Seed JEE and NEET content
    console.log('📚 Step 2: Seeding JEE and NEET content...');
    await seedJeeNeetContent();
    console.log('✅ JEE and NEET content seeded successfully!\n');

    // Seed NEET PG and UPSC exams
    console.log('📚 Step 3: Seeding NEET PG and UPSC exams...');
    await seedNeetPgUpsc();
    console.log('✅ NEET PG and UPSC exams seeded successfully!\n');

    console.log('🎉 All seeding operations completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   • JEE exam with 3 subjects, 15 topics, and 25 subtopics');
    console.log('   • NEET exam with 3 subjects, 15 topics, and 25 subtopics');
    console.log('   • NEET PG exam with 5 subjects, 15 topics, and 15 subtopics');
    console.log('   • UPSC exam with 5 subjects, 15 topics, and 15 subtopics');
    console.log('   • Total: 4 exams with comprehensive content structure');
  } catch (error) {
    console.error('❌ Error during comprehensive seeding:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedAll()
    .then(() => {
      console.log('\n🎊 Database seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Database seeding failed:', error);
      process.exit(1);
    });
} 
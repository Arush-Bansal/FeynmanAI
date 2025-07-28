'use server';

import dbConnect from './dbConnect';
import { getExamCategories } from './services/contentService';

// Server action for database initialization
export async function initializeDatabaseAction() {
  try {
    console.log('🔌 Initializing database connection via server action...');
    await dbConnect();
    console.log('✅ Database initialized successfully via server action');
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to initialize database via server action:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Server action for validating exam categories
export async function validateExamCategory(examCode: string): Promise<boolean> {
  try {
    await dbConnect();
    const examCategories = await getExamCategories();
    return examCategories.includes(examCode);
  } catch (error) {
    console.error('❌ Failed to validate exam category:', error);
    return false;
  }
} 
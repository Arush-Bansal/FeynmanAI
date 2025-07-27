import dbConnect from '@/features/db/dbConnect';

// Initialize database connection on app startup
export async function initializeDatabase() {
  try {
    await dbConnect();
    console.log('🚀 App started - Database connection initialized');
  } catch (error) {
    console.error('❌ Failed to initialize database connection:', error);
  }
}

// Call the initialization function
initializeDatabase(); 
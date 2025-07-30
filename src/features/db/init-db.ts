import dbConnect from './dbConnect';

// Initialize database connection on app startup
export async function initializeDatabase() {
  try {
    console.log('🔌 Initializing database connection...');
    await dbConnect();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    throw error;
  }
}

// For server-side initialization
export async function ensureDatabaseConnection() {
  try {
    await dbConnect();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
} 
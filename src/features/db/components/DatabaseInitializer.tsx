import { initializeDatabaseAction } from '@/features/db/server-init';

// Server component to initialize database
export async function DatabaseInitializer() {
  // Initialize database on server side
  await initializeDatabaseAction();
  
  return null; // This component doesn't render anything
} 
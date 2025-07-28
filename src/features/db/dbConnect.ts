import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Define the cache interface
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend global to include mongoose cache (Node.js only)
declare global {
  var mongoose: MongooseCache | undefined;
}

// Use globalThis for Edge Runtime compatibility
const globalThis = (typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {}) as typeof global & { mongoose?: MongooseCache };
const cached: MongooseCache = globalThis.mongoose || { conn: null, promise: null };

if (!globalThis.mongoose) {
  globalThis.mongoose = cached;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Database connected successfully');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Check database connection status
export function getConnectionStatus() {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  return {
    readyState: mongoose.connection.readyState,
    status: states[mongoose.connection.readyState as keyof typeof states] || 'unknown',
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name
  };
}

// Graceful shutdown function
export async function dbDisconnect() {
  try {
    if (mongoose.connection.readyState !== 0) {
      console.log('🔄 Disconnecting from database...');
      await mongoose.disconnect();
      console.log('✅ Database disconnected successfully');
    }
  } catch (error) {
    console.error('❌ Error disconnecting from database:', error);
  }
}

// Handle process termination signals (Node.js only)
const gracefulShutdown = async (signal: string) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  
  try {
    await dbDisconnect();
    console.log('✅ Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during graceful shutdown:', error);
    process.exit(1);
  }
};

// Register shutdown handlers (Node.js only)
if (typeof process !== 'undefined' && typeof window === 'undefined') {
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  
  // Handle uncaught exceptions
  process.on('uncaughtException', async (error) => {
    console.error('❌ Uncaught Exception:', error);
    await dbDisconnect();
    process.exit(1);
  });
  
  // Handle unhandled promise rejections
  process.on('unhandledRejection', async (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    await dbDisconnect();
    process.exit(1);
  });
}

export default dbConnect;

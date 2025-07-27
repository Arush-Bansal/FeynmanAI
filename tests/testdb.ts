#!/usr/bin/env node
import 'dotenv/config';
import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('Error: MONGO_URI environment variable is not set.');
  console.error('Please create a .env file with your MongoDB connection string.');
  console.error('Example: MONGO_URI=mongodb://localhost:27017/your-database');
  process.exit(1);
}

mongoose.connect(mongoUri).then(() => {
  console.log("Connected to MongoDB!");
  process.exit();
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error.message);
  process.exit(1);
});

import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProgress extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  concept: mongoose.Types.ObjectId;
  subtopic: mongoose.Types.ObjectId;
  topic: mongoose.Types.ObjectId;
  subject: mongoose.Types.ObjectId;
  exam: mongoose.Types.ObjectId;
  totalSessions: number;
  totalTime: number;
  averageScore: number;
  bestScore: number;
  lastPracticed: Date;
  masteryLevel: 'NOVICE' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  weakAreas: string[];
  strongAreas: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserProgressSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    concept: {
      type: Schema.Types.ObjectId,
      ref: 'Concept',
      required: true,
    },
    subtopic: {
      type: Schema.Types.ObjectId,
      ref: 'Subtopic',
      required: true,
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    exam: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
    totalSessions: {
      type: Number,
      default: 0,
    },
    totalTime: {
      type: Number,
      default: 0,
    },
    averageScore: {
      type: Number,
      default: 0,
    },
    bestScore: {
      type: Number,
      default: 0,
    },
    lastPracticed: {
      type: Date,
      default: Date.now,
    },
    masteryLevel: {
      type: String,
      enum: ['NOVICE', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'],
      default: 'NOVICE',
    },
    weakAreas: [String],
    strongAreas: [String],
  },
  { timestamps: true }
);

// Compound index for efficient queries
UserProgressSchema.index({ user: 1, concept: 1, subtopic: 1, topic: 1, subject: 1, exam: 1 }, { unique: true });

export const UserProgress = mongoose.models.UserProgress || mongoose.model<IUserProgress>('UserProgress', UserProgressSchema); 
import mongoose, { Schema, Document } from 'mongoose';

export interface IPracticeSession extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  concept: mongoose.Types.ObjectId;
  subtopic: mongoose.Types.ObjectId;
  topic: mongoose.Types.ObjectId;
  subject: mongoose.Types.ObjectId;
  exam: mongoose.Types.ObjectId;
  transcript: string;
  duration: number;
  analysis: {
    coveredTopics: string[];
    missedTopics: string[];
    detailedAnalysis: string;
    sideQuestions: string[];
    similarTopics: string[];
    overallScore: number;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  startedAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PracticeSessionSchema: Schema = new Schema(
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
    transcript: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    analysis: {
      coveredTopics: [String],
      missedTopics: [String],
      detailedAnalysis: String,
      sideQuestions: [String],
      similarTopics: [String],
      overallScore: {
        type: Number,
        min: 0,
        max: 100,
      },
      strengths: [String],
      weaknesses: [String],
      recommendations: [String],
    },
    status: {
      type: String,
      enum: ['IN_PROGRESS', 'COMPLETED', 'ABANDONED'],
      default: 'IN_PROGRESS',
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const PracticeSession = mongoose.models.PracticeSession || mongoose.model<IPracticeSession>('PracticeSession', PracticeSessionSchema); 
import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalytics extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  date: Date;
  sessionsCompleted: number;
  totalTime: number;
  averageScore: number;
  topicsPracticed: mongoose.Types.ObjectId[];
  examsPracticed: mongoose.Types.ObjectId[];
  subjectsPracticed: mongoose.Types.ObjectId[];
  improvementAreas: string[];
  strengths: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AnalyticsSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    sessionsCompleted: {
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
    topicsPracticed: [{
      type: Schema.Types.ObjectId,
      ref: 'Topic',
    }],
    examsPracticed: [{
      type: Schema.Types.ObjectId,
      ref: 'Exam',
    }],
    subjectsPracticed: [{
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    }],
    improvementAreas: [String],
    strengths: [String],
  },
  { timestamps: true }
);

// Compound index for efficient queries
AnalyticsSchema.index({ user: 1, date: 1 }, { unique: true });

export const Analytics = mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema); 
import mongoose, { Schema, Document } from 'mongoose';

export interface IConfidenceToken extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  entityType: 'EXAM' | 'SUBJECT' | 'TOPIC' | 'SUBTOPIC' | 'CONCEPT' | 'CUSTOM_SUBTOPIC' | 'CUSTOM_CONCEPT';
  entityId: mongoose.Types.ObjectId;
  confidenceLevel: number;
  practiceCount: number;
  masteryLevel: 'NOVICE' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  notes: string;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ConfidenceTokenSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    entityType: {
      type: String,
      enum: ['EXAM', 'SUBJECT', 'TOPIC', 'SUBTOPIC', 'CONCEPT', 'CUSTOM_SUBTOPIC', 'CUSTOM_CONCEPT'],
      required: true,
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    confidenceLevel: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    practiceCount: {
      type: Number,
      default: 0,
    },
    masteryLevel: {
      type: String,
      enum: ['NOVICE', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'],
      default: 'NOVICE',
    },
    notes: {
      type: String,
      default: '',
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index for efficient queries
ConfidenceTokenSchema.index({ user: 1, entityType: 1, entityId: 1 }, { unique: true });

export const ConfidenceToken = mongoose.models.ConfidenceToken || mongoose.model<IConfidenceToken>('ConfidenceToken', ConfidenceTokenSchema); 
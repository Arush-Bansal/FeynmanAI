import mongoose, { Schema, Document } from 'mongoose';

export interface IConcept extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  code: string;
  description: string;
  subtopic: mongoose.Types.ObjectId;
  keyPoints: string[];
  concepts: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const ConceptSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subtopic: {
      type: Schema.Types.ObjectId,
      ref: 'Subtopic',
      required: true,
    },
    keyPoints: [{
      type: String,
      required: true,
    }],
    concepts: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
      default: 'INTERMEDIATE',
    },
    estimatedTime: {
      type: Number,
      default: 10, // 10 minutes
    },
  },
  { timestamps: true }
);

export const Concept = mongoose.models.Concept || mongoose.model<IConcept>('Concept', ConceptSchema); 
import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomConcept extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  code: string;
  description: string;
  parentSubtopic: mongoose.Types.ObjectId;
  keyPoints: string[];
  concepts: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedTime: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CustomConceptSchema: Schema = new Schema(
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
    parentSubtopic: {
      type: Schema.Types.ObjectId,
      ref: 'CustomSubtopic',
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
      default: 10,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const CustomConcept = mongoose.models.CustomConcept || mongoose.model<ICustomConcept>('CustomConcept', CustomConceptSchema);
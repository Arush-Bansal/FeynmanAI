import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IFeynmanAnalysis extends Document {
  user: IUser['_id'];
  topic: string;
  exam: string;
  subject: string;
  keyPoints?: string[];
  transcript: string;
  analysis: object;
  createdAt: Date;
  updatedAt: Date;
}

const FeynmanAnalysisSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    exam: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    keyPoints: {
      type: [String],
    },
    transcript: {
      type: String,
      required: true,
    },
    analysis: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.FeynmanAnalysis || mongoose.model<IFeynmanAnalysis>('FeynmanAnalysis', FeynmanAnalysisSchema);

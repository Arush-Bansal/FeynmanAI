import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  code: string;
  description: string;
  icon: string;
  gradient: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    gradient: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Exam = mongoose.models.Exam || mongoose.model<IExam>('Exam', ExamSchema);
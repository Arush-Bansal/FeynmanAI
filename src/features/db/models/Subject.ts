import mongoose, { Schema, Document } from 'mongoose';

export interface ISubject extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  code: string;
  description: string;
  exam: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SubjectSchema: Schema = new Schema(
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
    exam: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
  },
  { timestamps: true }
);

export const Subject = mongoose.models.Subject || mongoose.model<ISubject>('Subject', SubjectSchema);
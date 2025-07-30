import mongoose, { Schema, Document } from 'mongoose';

export interface ISubtopic extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  code: string;
  description: string;
  topic: mongoose.Types.ObjectId;
  parentSubtopic?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SubtopicSchema: Schema = new Schema(
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
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    parentSubtopic: {
      type: Schema.Types.ObjectId,
      ref: 'Subtopic',
    },
  },
  { timestamps: true }
);

export const Subtopic = mongoose.models.Subtopic || mongoose.model<ISubtopic>('Subtopic', SubtopicSchema);
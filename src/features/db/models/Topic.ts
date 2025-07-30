import mongoose, { Schema, Document } from 'mongoose';

export interface ITopic extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  code: string;
  description: string;
  subject: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema: Schema = new Schema(
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
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
  },
  { timestamps: true }
);

export const Topic = mongoose.models.Topic || mongoose.model<ITopic>('Topic', TopicSchema); 
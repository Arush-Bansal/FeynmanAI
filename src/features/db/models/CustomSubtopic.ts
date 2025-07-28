import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomSubtopic extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  code: string;
  description: string;
  parentEntity: {
    type: 'EXAM' | 'SUBJECT' | 'TOPIC' | 'SUBTOPIC';
    id: mongoose.Types.ObjectId;
  };
  parentSubtopic?: mongoose.Types.ObjectId;
  concepts: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CustomSubtopicSchema: Schema = new Schema(
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
    parentEntity: {
      type: {
        type: String,
        enum: ['EXAM', 'SUBJECT', 'TOPIC', 'SUBTOPIC'],
        required: true,
      },
      id: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    },
    parentSubtopic: {
      type: Schema.Types.ObjectId,
      ref: 'CustomSubtopic',
    },
    concepts: [{
      type: Schema.Types.ObjectId,
      ref: 'CustomConcept',
    }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const CustomSubtopic = mongoose.models.CustomSubtopic || mongoose.model<ICustomSubtopic>('CustomSubtopic', CustomSubtopicSchema);